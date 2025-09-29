<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Laravel\Passport\Http\Controllers\AuthorizationController;
// use Illuminate\Validation\Validator;
// use Laravel\Passport\Contracts\AuthorizationViewResponse;
use Illuminate\Http\Request;
use Psr\Http\Message\ServerRequestInterface;
use Laravel\Passport\ClientRepository;
use Laravel\Passport\TokenRepository;
use League\OAuth2\Server\AuthorizationServer;
use Illuminate\Contracts\Auth\StatefulGuard;
use Laravel\Passport\Contracts\AuthorizationViewResponse;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use PragmaRX\Google2FA\Google2FA;
use App\Models\MasterApplicationUser;

class OAuthController extends AuthorizationController
{
    public function __construct(
        AuthorizationServer $server,
        StatefulGuard $guard,
        AuthorizationViewResponse $response
    ) {
        $this->server = $server;
        $this->guard = $guard;
        /**
         * extending passport authorization view
         * there's problem when publishing passport views
         * published views are not used even if it's already published
         * so we need to force extend the view here
         */
        $this->response = new ($response::class)('views.vendor.passport.authorize');
    }

    /**
     * Authorize a client to access the user's account.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function authorize(
        ServerRequestInterface $psrRequest,
        Request $request,
        ClientRepository $clients,
        TokenRepository $tokens
    ) {
        $validator = Validator::make($request->all(), [
            'client_id' => 'required',
            'response_type' => 'required',
            'state' => 'required',
        ]);

        if ($validator->fails()) {
            return abort(400, implode(", ", Arr::dot($validator->errors()->toArray())));
        }

        $authRequest = $this->withErrorHandling(function () use ($psrRequest) {
            return $this->server->validateAuthorizationRequest($psrRequest);
        });


        if ($this->guard->guest()) {
            $this->promptForLogin($request);
        }

        if (
            $request->get('prompt') === 'login' &&
            !$request->session()->get('promptedForLogin', false)
        ) {
            $this->guard->logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();

            return $this->promptForLogin($request);
        }

        $request->session()->forget('promptedForLogin');

        $scopes = $this->parseScopes($authRequest);
        $user = $this->guard->user();

        //check mfa
        if ($user->is_use_mfa && !$user->is_mfa_enabled) {
            $request->session()->put('authQuery', $psrRequest->getQueryParams());
            return redirect('oauth/mfa-bind');
        }

        $client = $clients->find($authRequest->getClient()->getIdentifier());
        
        if(!MasterApplicationUser::where('user_id', $user->id)->where('master_application_id', $client->id)->exists()) {
            return abort(403, 'You are disabled from accessing this application.');
        }

        if (
            $request->get('prompt') !== 'consent' &&
            ($client->skipsAuthorization() || $this->hasValidToken($tokens, $user, $client, $scopes))
        ) {
            return $this->approveRequest($authRequest, $user);
        }

        if ($request->get('prompt') === 'none') {
            return $this->approveRequest($authRequest, $user);
        }

        $request->session()->put('authToken', $authToken = Str::random());
        $request->session()->put('authRequest', $authRequest);

        return $this->response->withParameters([
            'client' => $client,
            'user' => $user,
            'scopes' => $scopes,
            'request' => $request,
            'authToken' => $authToken,
        ]);
    }

    public function user(Request $request)
    {
        return response()->json([
            'message' => 'success',
            'data' => $request->user(),
        ]);
    }

    public function mfabind(Request $request)
    {
        $user = $request->user();
        // Generate a unique secret for the user
        $google2fa = new Google2FA;

        if (! $user->mfa_secret_key) {
            $secret = $google2fa->generateSecretKey();

            // Save the secret to the user's profile
            $user->mfa_secret_key = $secret;
            $user->save();
        }

        // Generate a QR code URL
        $qrCodeUrl = $google2fa->getQRCodeUrl(
            env('APP_NAME'),    // App Name
            $user->email,            // User's email
            $user->mfa_secret_key    // Generated Secret
        );


        return view('views.vendor.passport.mfa-bind', [
            'qrCodeUrl' => $qrCodeUrl,
            'secret' => $user->mfa_secret,
        ]);
    }


    public function mfaconfirm(Request $request)
    {
        $user = $request->user();

        $request->validate([
            'otp' => 'required|digits:6',
        ]);

        $google2fa = new Google2FA;

        $otp = $request->input('otp');
        // Validate the OTP
        $isValid = $google2fa->verifyKey($user->mfa_secret_key, $otp);
        if (!$isValid) {
            return back()->withErrors(['otp' => 'Invalid OTP']);
        }
        $user->is_mfa_enabled = true;
        $user->save();

        $request->session()->put('mfa_success', true);
        $query = session()->pull('authQuery', []);
        return redirect()->route('authorizations.authorize', $query);
    }

    public function logout(Request $request)
    {
	$user = auth('api')->user();
	if (!$user) return response()->json(auth('api'));
	$user->forceLogout();
	$user->token()->revoke();
	Auth::guard('web')->setUser($user);
	Auth::guard('web')->logout();
	session()->flush();

	return response()->json([
            'message' => 'success',
            'data' => null,
	]);
    }
}
