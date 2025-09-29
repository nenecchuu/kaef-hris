<?php

namespace App\Http\Controllers;

use App\Http\Requests\SettingPasswordComplexity\StoreRequest;
use App\Http\Resources\SettingPasswordComplexityResource;
use App\Jobs\SendResetPasswordEmail;
use App\Models\SettingPasswordComplexity;
use App\Models\User;
use App\Services\AuditTrailService;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Password;

/**
 * @group Setting Password Complexity
 *
 * APIs for Setting Password Complexity module
 */
class SettingPasswordComplexityController extends Controller
{
    protected $auditTrail;

    public function __construct(AuditTrailService $auditTrail)
    {
        $this->auditTrail = $auditTrail;
    }

    /**
     * Get password complexity setting
     */
    public function get()
    {
        $data = SettingPasswordComplexity::firstOrCreate();

        return apiResponse(
            Response::HTTP_OK,
            'Get password complexity setting',
            SettingPasswordComplexityResource::make($data)
        );
    }

    public function update(StoreRequest $request)
    {
        $data = $request->validated();

        $setting = SettingPasswordComplexity::first();
        $setting->update(array_filter($data, fn ($value) => $value !== null));
        $this->auditTrail->logPasswordComplexityUpdateAction($setting);

        if (isset($data['reset_password']) && $data['reset_password']) {
            $this->sendResetPasswordEmailToAllUser();
        }

        return apiResponse(
            Response::HTTP_OK,
            'Update password complexity setting successful',
            SettingPasswordComplexityResource::make($setting)
        );
    }

    // TODO: Probably need to move this fx
    protected function sendResetPasswordEmailToAllUser()
    {
        $userIds = User::where('is_active', 1)->select('id')->pluck('id')->toArray();

        // Dispatch the job to the queue
        SendResetPasswordEmail::dispatch(auth()->user(), $userIds);
    }
}
