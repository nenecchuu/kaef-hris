<?php

namespace App\Repositories;

use App\Models\Division;
use App\Models\JobPosition;
use App\Models\MasterApplication;
use App\Models\RequestToUpdate;
use App\Models\Role;
use App\Models\User;
use App\Services\AuditTrailService;
use App\Traits\RepositoryTrait;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class UserRepository extends Repository
{
    use RepositoryTrait;

    protected $query;
    protected $auditTrail;

    public function __construct(
        AuditTrailService $auditTrail
    )
    {
        $this->query = User::query();
        $this->auditTrail = $auditTrail;
    }

    public function fetchList(array $filter)
    {
        $search = $filter['search'] ?? '';
        $sortColumn = $filter['sort_column'] ?? 'users.created_at';
        $sortOrder = $filter['sort_order'] ?? 'desc';

        $this->query
            ->select([
                'users.*',
                'job_positions.name as job_position_name',
                'divisions.name as division_name',
            ])
            ->leftJoin(
                'divisions',
                'users.division_id',
                '=',
                'divisions.id'
            )
            ->leftJoin('job_positions', 'users.job_position_id', '=', 'job_positions.id');

        if (isset($filter['is_active'])) {
            $this->query->where('is_active', $filter['is_active']);
        }

        if (isset($filter['is_blocked']) && $filter['is_blocked']) {
            $this->query->whereNotNull('blocked_at');
        } else {
            $this->query->whereNull('blocked_at');
        }

        if (isset($filter['division_id'])) {
            $this->query->where('division_id', $filter['division_id']);
        }

        if (isset($filter['job_position_id'])) {
            $this->query->where('job_position_id', $filter['job_position_id']);
        }

        $this->query->where(
            fn ($query) => $query->where('users.name', 'LIKE', "%{$search}%")
                ->orWhere('email', 'LIKE', "%{$search}%")
                ->orWhere('phone', 'LIKE', "%{$search}%")
        )
            ->orderBy($sortColumn, $sortOrder);

        return $this;
    }

    public function store($input)
    {
        try {
            $this->beginTransaction();

            $input['password'] = $input['password'] ?? Str::random(60);
            $input['avatar_path'] = $input['image'];

            if (isset($input['job_position_id']) && $input['job_position_id']) {
                $jp = JobPosition::find($input['job_position_id']);
                $input['is_team_lead'] = $jp->is_team_lead;
                $input['is_head_division'] = $jp->is_head_division;
            } else {
                $input['is_team_lead'] = false;
                $input['is_head_division'] = false;
            }

            if ($input['is_team_lead'] || $input['is_head_division']) {
                $input['team_lead_id'] = false;
            }

            if ($input['is_head_division']) {
                $input['head_division_id'] = false;
            }

            $errors = $this->checkInputForError($input);

            if ($errors && count($errors)) {
                throw ValidationException::withMessages($errors);
            }

            $user = User::create(array_filter($input, fn ($value) => $value !== null));

            if (isset($input['master_application_ids']) && is_array($input['master_application_ids'])) {
                $user->master_applications()->sync($input['master_application_ids']);
            }

            $role = Role::where('is_default', $input['is_administrator'])->first('id');
            $user->roles()->sync([$role->id]);

            Password::sendResetLink(['email' => $user->email]);

            $this->auditTrail->logUserWriteAction($user, 'create');

            RequestToUpdate::create([
                'user_id' => $user->id,
                'action' => ('new_user'),
            ]);

            $this->commitTransaction();

            return $user;
        } catch (\Exception $e) {
            $this->rollbackTransaction();

            throw $e;
        }
    }

    public function entryRelatedData()
    {
        $divisions = Division::select('id', 'name')->get();
        $jobPositions = JobPosition::select('id', 'name', 'is_team_lead', 'is_head_division')->get();
        $masterApplications = MasterApplication::select('id', 'name')->get();
        $teamLeads = User::select('id', 'name', 'division_id')->where('is_team_lead', true)->where('is_active', true)->get();
        $headDivisions = User::select('id', 'name', 'division_id')->where('is_head_division', true)->where('is_active', true)->get();

        return [
            'divisions' => $divisions,
            'job_positions' => $jobPositions,
            'team_leads' => $teamLeads,
            'head_divisions' => $headDivisions,
            'master_applications' => $masterApplications,
        ];
    }

    public function findByID(int $id)
    {
        $user = $this->query
            ->select()
            ->with(['division:id,name', 'job_position:id,name', 'team_lead:id,name', 'head_division:id,name'])
            ->where('id', $id)
            ->firstOrFail();
        $user['master_application_ids'] = $user->master_applications()->pluck('id')->toArray();

        return $user;
    }

    public function update(int $id, array $input)
    {
        try {
            $this->beginTransaction();

            $user = User::findOrFail($id);

            if ($input['is_email_blacklisted'] != $user->is_email_blacklisted) {
                RequestToUpdate::create([
                    'user_id' => $user->id,
                    'action' => ($input['is_email_blacklisted'] ? 'blacklist_email' : 'unblacklist_email'),
                ]);
            }

            if ($input['image']) {
                if ($user->avatar_path) {
                    Storage::delete($user->avatar_path);
                }

                $user->avatar_path = $input['image'];
            }

            if (isset($input['job_position_id']) && $input['job_position_id']) {
                $jp = JobPosition::find($input['job_position_id']);
                $input['is_team_lead'] = $jp->is_team_lead;
                $input['is_head_division'] = $jp->is_head_division;
            } else {
                $input['is_team_lead'] = false;
                $input['is_head_division'] = false;
            }

            if ($input['is_team_lead'] || $input['is_head_division']) {
                $input['team_lead_id'] = false;
            }

            if ($input['is_head_division']) {
                $input['head_division_id'] = false;
            }

            $errors = $this->checkInputForError($input);

            if ($errors && count($errors)) {
                throw ValidationException::withMessages($errors);
            }

            $user->fill(array_filter($input, fn ($value) => $value !== null));

            $role = Role::where('is_default', $input['is_administrator'])->first('id');
            $user->roles()->sync([$role->id]);

            if (isset($input['master_application_ids']) && is_array($input['master_application_ids'])) {
                $this->auditTrail->logUserMasterApplicationAction($user, $input['master_application_ids']);
                $user->master_applications()->sync($input['master_application_ids']);
            } else {
                if ($input['is_active']) {
                    $user->master_applications()->sync([]);
                }
            }

            $this->auditTrail->logUserWriteAction($user, 'update');

            $user->save();

            $this->commitTransaction();

            return $user;
        } catch (\Exception $e) {
            $this->rollbackTransaction();

            throw $e;
        }
    }

    public function destroy(int $id)
    {
        $user = User::findOrFail($id);
        $this->auditTrail->logUserWriteAction($user, 'delete');
        $user->delete();
    }

    public function updateActiveStatus(int $id, bool $active)
    {
        try {
            $this->beginTransaction();

            $user = User::findOrFail($id);

            RequestToUpdate::create([
                'user_id' => $id,
                'action' => ($active ? 'unblock_user' : 'block_user'),
            ]);

            if (! $active) {
                $user->forceLogout();
            }

            $user->is_active = $active;

            $this->auditTrail->logUserWriteAction($user, 'update');
            $user->update();

            $this->commitTransaction();
        } catch (\Exception $e) {
            $this->rollbackTransaction();

            throw $e;
        }
    }

    public function unblock(int $id)
    {
        $user = User::findOrFail($id);

        if ($user->is_administrator) {
            Password::sendResetLink(['email' => $user->email]);
            $user->update(['is_reset_password_pending' => true]);
        }

        RequestToUpdate::create([
            'user_id' => $id,
            'action' => ('unblock_user'),
        ]);

        $user->failed_login_counts = 0;
        $user->blocked_at = null;
        $user->is_active = true;

        $this->auditTrail->logUserWriteAction($user, 'update');
        $user->update();
    }

    private function checkInputForError(array $input)
    {
        $errors = [];

        if ($input['is_active'] && ! isset($input['master_application_ids'])) {
            $errors['master_application_id'] = 'Master application is required';
        }
        if (
            $input['job_position_id'] &&
            (
                ! $input['is_head_division'] &&
                (
                    ! isset($input['head_division_id']) ||
                    ! $input['head_division_id']
                )
            )
        ) {
            $errors['head_division_id'] = 'Head division is required';
        }

        return $errors;
    }

    public function forgotPassword(int $id)
    {
        $user = User::where('id', $id)->first();
        if (!$user){
            return api_response()->error(['Email tidak terdaftar.' => Password::PASSWORD_RESET], 400,'Email tidak terdaftar.');
        }

        $status = Password::sendResetLink(
            ['email' => $user->email]
        );

        $user->update(['is_reset_password_pending' => true]);
        $this->auditTrail->logUserResetPasswordAction(auth()->user(), $user, '');

        return $status;
    }
}
