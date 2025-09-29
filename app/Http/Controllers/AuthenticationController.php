<?php

namespace App\Http\Controllers;

use App\Http\Requests\SignInRequest;
use App\Http\Resources\AuthenticatedUserResource;
use App\Models\RequestToUpdate;
use App\Models\User;
use App\Services\AuditTrailService;
use App\Services\PasswordService;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;
use PragmaRX\Google2FA\Google2FA;

/**
 * @group Auth
 */
class AuthenticationController extends Controller
{
    protected $auditTrail;

    protected $passwordService;

    public function __construct(AuditTrailService $auditTrail, PasswordService $passwordService)
    {
        $this->auditTrail = $auditTrail;
        $this->passwordService = $passwordService;
    }

    public function store(SignInRequest $request)
    {
        $email = $request->email;
        $user = User::where('email', $email)->first();

        /**
         * handle if user not found
         */
        if ($user === null) {
            $this->auditTrail->logFailedLoginAction($request->email);
            throw ValidationException::withMessages([
                'email' => ['Incorrect email or password.'],
            ]);
        }

        if ($user) {
            $this->handleBlockedUser($user);
        }

        if (! $user->is_active) {
            $this->handleInactiveUser();
        }

        if (! EnsureFrontendRequestsAreStateful::fromFrontend($request)) {
            return $this->generateAPIToken($request);
        }

        try {
            $request->authenticate();
            $this->handleSuccessLogin($user);
        } catch (ValidationException $e) {
            $this->handleFailedLogin($user, $e, $request);
        }

        $request->session()->forget('is_reset_password_pending');
        if ($user->is_reset_password_pending) {
            $request->session()->put('is_reset_password_pending', true);
            $token = Password::createToken($user);

            if ($token) {
                return api_response()->success([
                    'requires_reset_password' => true,
                    'token' => $token,
                    'email' => $email,
                ]);
            }

            return api_response()->success([
                'requires_reset_password' => true,
            ]);
        }

        $request->session()->forget('mfa_pending');
        if ($user->is_use_mfa && $user->is_mfa_enabled) {
            $request->session()->put('mfa_pending', true);

            return api_response()->success([
                'requires_mfa' => true,
            ]);
        }

        $request->session()->regenerate();
        $this->auditTrail->logUserAuthAction('login');

        $previous = $request->session()->get('url.intended');

        return api_response()->success([
            'intended' => $previous,
        ]);
    }

    /**
     * Authenticated User
     */
    public function show(Request $request)
    {
        $user = $request->user();

        return api_response()->success(AuthenticatedUserResource::make($user));
    }

    /**
     * Sign Out
     */
    public function destroy(Request $request)
    {
        if (! EnsureFrontendRequestsAreStateful::fromFrontend($request)) {
            $request
                ->user()
                ->currentAccessToken()
                ->delete();
        } else {
            $guard = 'web';
            Auth::guard($guard)->logout();

            $request->session()->invalidate();
            $request->session()->regenerate();
        }

        $this->auditTrail->logUserAuthAction('logout');

        return api_response()->success();
    }

    protected function generateAPIToken($request)
    {
        $query = User::query();

        $user = $query->where('email', $request->email)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['Incorrect email or password.'],
            ]);
        }

        return api_response()->success([
            'token' => $user->createToken(now())->plainTextToken,
        ]);
    }

    protected function handleFailedLogin($user, $error, $request)
    {
        $this->auditTrail->logFailedLoginAction($request->email);
        if ($user) {
            $maxAttempts = 3;
            $user->increment('failed_login_counts');

            if ($user->failed_login_counts >= $maxAttempts) {
                if (! $user->blocked_at && $user->is_active) {
                    $user->update(['blocked_at' => now(), 'is_active' => false]);

                    RequestToUpdate::create([
                        'user_id' => $user->id,
                        'action' => ('block_user'),
                    ]);
                }

                throw ValidationException::withMessages([
                    'email' => [
                        'Too many failed login attempts. This account has been permanently blocked.',
                    ],
                ]);
            }
        }

        throw $error;
    }

    protected function handleSuccessLogin($user)
    {
        if ($user->failed_login_counts > 0) {
            $user->update(['failed_login_counts' => 0]);
        }
    }

    protected function handleBlockedUser($user)
    {
        if ($user && $user->blocked_at) {
            throw ValidationException::withMessages([
                'email' => [
                    'Too many failed login attempts. This account has been permanently blocked.',
                ],
            ]);
        }
    }

    protected function handleInactiveUser()
    {
        throw ValidationException::withMessages([
            'email' => ['Your account has been deactivated.'],
        ]);
    }

    public function forgot_password(FormRequest $request)
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        $user = User::where('email', $request->email)->first();
        if (!$user){
            return api_response()->error(['Email tidak terdaftar.' => Password::PASSWORD_RESET], 400,'Email tidak terdaftar.');
        }

        // check MFA first if user enabling MFA
        if ($user->is_use_mfa && $user->is_mfa_enabled) {
            $request->session()->put('mfa_pending', true);

            return api_response()->success([
                'requires_mfa' => true,
            ]);
        }

        $status = Password::sendResetLink(
            $request->only('email')
        );

        $user->update(['is_reset_password_pending' => true]);
        $this->auditTrail->logUserResetPasswordAction(null, null, $user->email);

        if ($status == Password::RESET_LINK_SENT || $status === Password::RESET_THROTTLED) {
            return api_response()->success();
        }

        return api_response()->error(['error' => $status], 400, 'Error');
    }

    public function reset_password(FormRequest $request)
    {
        $data = $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => ['required'],
            'password_confirmation' => ['required'],
        ]);

        $user = User::where('email', $request->email)->first();
        $this->passwordService->validate($user->id, $data['password'], $data['password_confirmation']);

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user) use ($request) {
                $user->forceFill([
                    'password' => $request->password,
                    'remember_token' => Str::random(60),
                    'latest_updated_password' => now(),
                ])->save();

                event(new PasswordReset($user));
            }
        );

        if ($status == Password::PASSWORD_RESET) {
            $this->passwordService->storePasswordHistory($user->id, $data['password']);
            $user->update(['is_reset_password_pending' => false]);

            return api_response()->success();
        }

        if ($status == Password::INVALID_TOKEN) {
            return api_response()->error(['Error'], 400, 'Token Expired!');
        }

        return api_response()->error(['Error'], 400);
    }

    public function generate_qr_mfa(Request $request)
    {
        /** @var User $user */
        $user = Auth::user(); // Get authenticated user

        if (! $user) {
            return apiResponse(
                Response::HTTP_UNAUTHORIZED,
                'Unauthorized user'
            );
        }
        // Generate a unique secret for the user
        $google2fa = new Google2FA;

        if (! $user->mfa_secret_key) {
            $secret = $google2fa->generateSecretKey();

            // Save the secret to the user's profile
            $user->mfa_secret_key = $secret;
            $user->save();
        }

        // Generate a QR code URL
        $data = $google2fa->getQRCodeUrl(
            env('APP_NAME'),    // App Name
            $user->email,            // User's email
            $user->mfa_secret_key    // Generated Secret
        );

        return apiResponse(
            Response::HTTP_OK,
            'QR code generated successfully',
            JsonResource::make(['url' => $data])
        );
    }

    public function verify_mfa(Request $request)
    {
        $request->validate([
            'otp' => 'required|numeric',
        ]);

        /** @var User $user */
        $user = Auth::user();
        $google2fa = new Google2FA;

        $otp = $request->input('otp'); // OTP entered by the user

        // Validate the OTP
        $isValid = $google2fa->verifyKey($user->mfa_secret_key, $otp);

        if ($isValid) {
            $user->is_mfa_enabled = true; // Enable MFA
            $user->save();

            return response()->json(['message' => 'MFA successfully enabled!']);
        } else {
            return api_response()->error(['otp' => 'Invalid OTP'], 400, 'MFA Verification Failed');
        }
    }

    public function verify_login_mfa(Request $request)
    {
        $request->validate([
            'otp' => 'required|numeric',
        ]);

        /** @var User $user */
        $user = Auth::user();

        if (!$user) {
            return api_response()->error(['Unauthorized'], 401);
        }

        $google2fa = new Google2FA;
        $isValid = $google2fa->verifyKey($user->mfa_secret_key, $request->otp);

        if ($isValid) {
            $request->session()->regenerate();
            $request->session()->forget('mfa_pending');
            $this->auditTrail->logUserAuthAction('login');

            $previous = $request->session()->get('url.intended');

            return api_response()->success([
                'intended' => $previous,
            ]);
        } else {
            return api_response()->error(['otp' => 'Invalid OTP'], 400, 'MFA Verification Failed');
        }
    }

    public function verify_forgot_password_mfa(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'otp' => 'required|numeric',
        ]);

        $user = User::where('email', $request->email)->first();
        if (!$user) {
            return api_response()->error(['Unauthorized'], 401);
        }

        $google2fa = new Google2FA;
        $isValid = $google2fa->verifyKey($user->mfa_secret_key, $request->otp);

        if ($isValid) {
            $status = Password::sendResetLink(
                $request->only('email')
            );

            $user->update(['is_reset_password_pending' => true]);
            $this->auditTrail->logUserResetPasswordAction(null, null, $user->email);

            if ($status == Password::RESET_LINK_SENT || $status === Password::RESET_THROTTLED) {
                return api_response()->success();
            }
        } else {
            return api_response()->error(['otp' => 'Invalid OTP'], 400, 'MFA Verification Failed');
        }
    }

    public function unbind_mfa(int $id)
    {
        $user = User::findOrFail($id);

        if ($user->is_mfa_enabled) {
            $user->mfa_secret_key = null;
            $user->is_mfa_enabled = false;
            $user->save();
        }

        return response()->json(['message' => 'MFA successfully unbinded!']);
    }
}
