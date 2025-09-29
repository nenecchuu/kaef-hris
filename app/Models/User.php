<?php

namespace App\Models;

use App\Notifications\ResetPassword;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
// use Laravel\Sanctum\HasApiTokens;
use Laravel\Passport\HasApiTokens as PassportToken;

class User extends Authenticatable
{
    use PassportToken;
    // use HasApiTokens;
    use HasFactory;
    use Notifiable;
    use SoftDeletes;

    protected $dates = [
        'birthdate',
        'email_verified_at',
        'created_at',
        'updated_at',
        'deleted_at',
        'two_factor_expires_at',
    ];

    protected $fillable = [
        'name',
        'birthdate',
        'phone',
        'email',
        'avatar_path',
        'ldap_username',
        'division_id',
        'job_position_id',
        'team_lead_id',
        'head_division_id',
        'description',
        'is_administrator',
        'is_superadmin',
        'is_email_blacklisted',
        'is_use_mfa',
        'is_team_lead',
        'is_head_division',
        'is_reset_password_pending',
        'is_active',
        'email_verified_at',
        'password',
        'remember_token',
        'two_factor_code',
        'two_factor_expires_at',
        'mfa_secret_key',
        'is_mfa_enabled',
        'failed_login_counts',
        'latest_updated_password',
        'blocked_at',
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    protected $casts = [
        'birthdate' => 'date',
    ];

    protected $hidden = ['password', 'remember_token'];

    public function password(): Attribute
    {
        return Attribute::set(fn($value) => Hash::make($value));
    }

    public function division()
    {
        return $this->belongsTo(Division::class, 'division_id');
    }

    public function job_position()
    {
        return $this->belongsTo(JobPosition::class, 'job_position_id');
    }

    public function team_lead()
    {
        return $this->belongsTo(self::class, 'team_lead_id');
    }

    public function head_division()
    {
        return $this->belongsTo(self::class, 'head_division_id');
    }

    public function roles()
    {
        return $this->belongsToMany(Role::class);
    }

    public function master_applications()
    {
        return $this->belongsToMany(MasterApplication::class, 'master_application_user');
    }

    public function password_histories()
    {
        return $this->hasMany(PasswordHistory::class);
    }

    public function getFormattedBirthdateAttribute()
    {
        return Carbon::parse($this->birthdate)->locale('id')->translatedFormat('d F Y') ?? '';
    }

    public function sendPasswordResetNotification($token)
    {
        $this->notify(new ResetPassword($token));
    }

    public function getPermissions()
    {
        return $this->roles->flatMap(function ($role) {
            return $role->permissions->pluck('title');
        })->unique()->values()->all();
    }

    function forceLogout()
    {
        // Delete all sessions of the user (force logout from all devices)
        DB::table('sessions')->where('user_id', $this->id)->delete();

        // Revoke all API tokens if using Laravel Passport
        $this->tokens()->delete();

        return $this;
    }
}
