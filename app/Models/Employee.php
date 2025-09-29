<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Employee Model
 *
 * Core employee business entity separate from authentication concerns,
 * containing comprehensive professional and personal information for
 * PT Kimia Farma staff across all divisions and subsidiaries.
 */
class Employee extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The table associated with the model.
     */
    protected $table = 'employees';

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'employee_id',
        'employee_number',
        'full_name',
        'preferred_name',
        'birth_date',
        'national_id',
        'tax_id',
        'email',
        'phone',
        'emergency_contact_name',
        'emergency_contact_phone',
        'address',
        'employment_status',
        'employment_type',
        'hire_date',
        'termination_date',
        'photo_url',
        'user_id',
        'division_id',
        'job_position_id',
        'manager_id',
    ];

    /**
     * The attributes that should be hidden for arrays.
     */
    protected $hidden = [
        'national_id',
        'tax_id',
    ];

    /**
     * The attributes that should be cast to native types.
     */
    protected $casts = [
        'birth_date' => 'date',
        'hire_date' => 'date',
        'termination_date' => 'date',
        'employment_status' => 'string',
        'employment_type' => 'string',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => 'datetime',
    ];

    /**
     * The attributes that should be mutated to dates.
     */
    protected $dates = [
        'birth_date',
        'hire_date',
        'termination_date',
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    /**
     * Boot the model.
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($employee) {
            if (empty($employee->employee_id)) {
                $employee->employee_id = static::generateEmployeeId();
            }
        });
    }

    /**
     * Generate unique employee ID
     */
    public static function generateEmployeeId(): string
    {
        $year = date('Y');
        $prefix = 'KF' . $year;

        // Get the highest employee number for this year
        $lastEmployee = static::withTrashed()
            ->where('employee_id', 'like', $prefix . '%')
            ->orderBy('employee_id', 'desc')
            ->first();

        if ($lastEmployee) {
            $lastNumber = intval(substr($lastEmployee->employee_id, -3));
            $nextNumber = $lastNumber + 1;
        } else {
            $nextNumber = 1;
        }

        return $prefix . str_pad($nextNumber, 3, '0', STR_PAD_LEFT);
    }

    /**
     * Get the user associated with the employee.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * Get the division that the employee belongs to.
     */
    public function division(): BelongsTo
    {
        return $this->belongsTo(Division::class, 'division_id');
    }

    /**
     * Get the job position of the employee.
     */
    public function jobPosition(): BelongsTo
    {
        return $this->belongsTo(JobPosition::class, 'job_position_id');
    }

    /**
     * Get the manager of the employee.
     */
    public function manager(): BelongsTo
    {
        return $this->belongsTo(Employee::class, 'manager_id');
    }

    /**
     * Get the subordinates of the employee.
     */
    public function subordinates(): HasMany
    {
        return $this->hasMany(Employee::class, 'manager_id');
    }

    /**
     * Get the education history for the employee.
     */
    public function educationHistory(): HasMany
    {
        return $this->hasMany(EmployeeEducationHistory::class);
    }

    /**
     * Get the certifications for the employee.
     */
    public function certifications(): HasMany
    {
        return $this->hasMany(EmployeeCertification::class);
    }

    /**
     * Get the professional licenses for the employee.
     */
    public function professionalLicenses(): HasMany
    {
        return $this->hasMany(EmployeeProfessionalLicense::class);
    }

    /**
     * Scope a query to only include active employees.
     */
    public function scopeActive($query)
    {
        return $query->where('employment_status', 'active');
    }

    /**
     * Scope a query to include employees by division.
     */
    public function scopeInDivision($query, $divisionId)
    {
        return $query->where('division_id', $divisionId);
    }

    /**
     * Scope a query to include employees by manager.
     */
    public function scopeUnderManager($query, $managerId)
    {
        return $query->where('manager_id', $managerId);
    }

    /**
     * Get the employee's full display name.
     */
    public function getDisplayNameAttribute(): string
    {
        return $this->preferred_name ?: $this->full_name;
    }

    /**
     * Check if employee is currently active.
     */
    public function isActive(): bool
    {
        return $this->employment_status === 'active';
    }

    /**
     * Check if employee is a manager (has subordinates).
     */
    public function isManager(): bool
    {
        return $this->subordinates()->exists();
    }

    /**
     * Get employee's age in years.
     */
    public function getAgeAttribute(): ?int
    {
        if (!$this->birth_date) {
            return null;
        }

        return $this->birth_date->diffInYears(now());
    }

    /**
     * Get employee's years of service.
     */
    public function getYearsOfServiceAttribute(): ?int
    {
        if (!$this->hire_date) {
            return null;
        }

        $endDate = $this->termination_date ?: now();
        return $this->hire_date->diffInYears($endDate);
    }

    /**
     * Check if employee has system access.
     */
    public function hasSystemAccess(): bool
    {
        return !is_null($this->user_id) && $this->user !== null;
    }

    /**
     * Get the route key for the model.
     */
    public function getRouteKeyName(): string
    {
        return 'employee_id';
    }
}