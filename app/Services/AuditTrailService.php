<?php

namespace App\Services;

use App\Models\AuditTrail;
use App\Models\SettingPasswordComplexity;
use App\Models\User;
use App\Models\JobPosition;
use App\Models\Division;
use App\Models\MasterApplication;

class AuditTrailService
{
    public function logUserWriteAction(User $user, string $action)
    {
        if (auth()->user()) {
            $changes = [];

            if ($action === 'create') {
                $changes = $user->getAttributes();
            } else if ($action === 'update') {
                $ignoreKey = ['latest_updated_password'];

                foreach ($user->getDirty() as $key => $newValue) {
                    if(in_array($key, $ignoreKey)) {
                        continue;
                    }

                    if($key == 'password') {
                        AuditTrail::create([
                            'action' => "password_update",
                            'domain' => 'user',
                            'affected_row_id' => $user->id,
                            'affected_row_name' => $user->name,
                            'performed_by_id' => auth()->user()->id,
                            'performed_by_name' => auth()->user()->name,
                            'changes' => null,
                        ]);

                        continue;
                    }

                    $oldValue = $user->getOriginal($key);
                    if ($newValue == $oldValue) {
                        continue;
                    }

                    $changes[$key]['old'] = $oldValue;
                    $changes[$key]['new'] = $newValue;

                    if($key == 'job_position_id') {
                        $oldJobPosition = JobPosition::where('id', $oldValue)->first();
                        $newJobPosition = JobPosition::where('id', $newValue)->first();

                        $changes['job_position_name']['old'] = $oldJobPosition ? $oldJobPosition->name : '-';
                        $changes['job_position_name']['new'] = $newJobPosition ? $newJobPosition->name : '-';
                    } else if($key == 'division_id') {
                        $oldDivision = Division::where('id', $oldValue)->first();
                        $newDivision = Division::where('id', $newValue)->first();

                        $changes['division_name']['old'] = $oldDivision ? $oldDivision->name : '-';
                        $changes['division_name']['new'] = $newDivision ? $newDivision->name : '-';
                    } else if($key == 'team_lead_id') {
                        $oldTeamLead = User::where('id', $oldValue)->first();
                        $newTeamLead = User::where('id', $newValue)->first();

                        $changes['team_lead_name']['old'] = $oldTeamLead ? $oldTeamLead->name : '-';
                        $changes['team_lead_name']['new'] = $newTeamLead ? $newTeamLead->name : '-';
                    } else if($key == 'head_division_id') {
                        $oldHeadDivision = User::where('id', $oldValue)->first();
                        $oldHeadDivision = User::where('id', $newValue)->first();

                        $changes['head_division_name']['old'] = $oldHeadDivision ? $oldHeadDivision->name : '-';
                        $changes['head_division_name']['new'] = $oldHeadDivision ? $oldHeadDivision->name : '-';
                    }
                }
            }

            if (!empty($changes)) {
                return AuditTrail::create([
                    'action' => $action,
                    'domain' => 'user',
                    'affected_row_id' => $user->id,
                    'affected_row_name' => $user->name,
                    'performed_by_id' => auth()->user()->id,
                    'performed_by_name' => auth()->user()->name,
                    'changes' => json_encode($changes),
                ]);
            }
        }
    }

    public function logUserMasterApplicationAction(User $user, $newMasterApplicationIds)
    {
        $beforeIds = $user->master_applications()->pluck('oauth_clients.id')->all();

        if(array_diff($beforeIds, $newMasterApplicationIds) || array_diff($newMasterApplicationIds, $beforeIds)) {
            $changes['master_application_id']['old'] = implode(",", $beforeIds);
            $changes['master_application_id']['new'] = implode(",", $newMasterApplicationIds);

            $changes['master_application_name']['old'] = implode(",", MasterApplication::whereIn('id', $beforeIds)->pluck('name')->toArray());
            $changes['master_application_name']['new'] = implode(",", MasterApplication::whereIn('id', $newMasterApplicationIds)->pluck('name')->toArray());

            return AuditTrail::create([
                'action' => 'master_application_update',
                'domain' => 'user',
                'affected_row_id' => $user->id,
                'affected_row_name' => $user->name,
                'performed_by_id' => auth()->user()->id,
                'performed_by_name' => auth()->user()->name,
                'changes' => json_encode($changes),
            ]);
        }
    }

    public function logUserResetPasswordAction(?User $performedUser, ?User $affectedUser, string $affectedEmail)
    {
        if(!$affectedUser && isset($affectedEmail) && !empty($affectedEmail)) {
            return AuditTrail::create([
                'action' => 'reset_password',
                'domain' => 'user',
                'description' => "{$affectedEmail} initiated a password reset for their own profile ",
            ]);
        }

        return AuditTrail::create([
            'action' => "reset_password",
            'domain' => 'user',
            'affected_row_id' => $affectedUser->id,
            'affected_row_name' => $affectedUser->name,
            'performed_by_id' => $performedUser->id,
            'performed_by_name' => $performedUser->name,
            'changes' => null,
        ]);
    }

    public function logUserAuthAction(string $action)
    {
        return AuditTrail::create([
            'action' => $action,
            'domain' => 'auth',
            'affected_domain_id' => auth()->user()->name,
            'affected_domain_name' => auth()->user()->name,
            'performed_by_id' => auth()->user()->id,
            'performed_by_name' => auth()->user()->name,
        ]);
    }

    public function logPasswordComplexityUpdateAction(SettingPasswordComplexity $passwordComplexity)
    {
        $changes = [];

        foreach ($passwordComplexity->getChanges() as $key => $newValue) {
            $oldValue = $passwordComplexity->getOriginal($key);
            $changes[$key]['old'] = $oldValue;
            $changes[$key]['new'] = $newValue;
        }

        return AuditTrail::create([
            'action' => 'update',
            'domain' => 'password_complexity',
            'affected_domain_id' => auth()->user()->name,
            'affected_domain_name' => auth()->user()->name,
            'performed_by_id' => auth()->user()->id,
            'performed_by_name' => auth()->user()->name,
            'changes' => json_encode($changes),
        ]);
    }

    public function logFailedLoginAction(string $username)
    {
        $ip = request()->header('X-Forwarded-For') ?? request()->ip();

        return AuditTrail::create([
            'action' => 'login_failed',
            'domain' => 'auth',
            'description' => "{$username} has made a failed login attempt from ".$ip,
        ]);
    }
}
