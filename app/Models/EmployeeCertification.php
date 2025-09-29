<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Carbon\Carbon;

/**
 * EmployeeCertification Model
 *
 * Tracks professional certifications and their expiry dates
 * for compliance and professional development monitoring.
 */
class EmployeeCertification extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     */
    protected $table = 'employee_certifications';

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'employee_id',
        'certification_name',
        'issuing_organization',
        'issue_date',
        'expiry_date',
        'certification_number',
        'is_active',
        'location',
    ];

    /**
     * The attributes that should be cast to native types.
     */
    protected $casts = [
        'issue_date' => 'date',
        'expiry_date' => 'date',
        'is_active' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * The attributes that should be mutated to dates.
     */
    protected $dates = [
        'issue_date',
        'expiry_date',
        'created_at',
        'updated_at',
    ];

    /**
     * Get the employee that owns the certification.
     */
    public function employee(): BelongsTo
    {
        return $this->belongsTo(Employee::class);
    }

    /**
     * Scope a query to only include active certifications.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope a query to only include inactive certifications.
     */
    public function scopeInactive($query)
    {
        return $query->where('is_active', false);
    }

    /**
     * Scope a query to include certifications expiring soon.
     */
    public function scopeExpiringSoon($query, int $days = 30)
    {
        $expiryThreshold = Carbon::now()->addDays($days);
        return $query->where('expiry_date', '<=', $expiryThreshold)
            ->where('expiry_date', '>', Carbon::now())
            ->where('is_active', true);
    }

    /**
     * Scope a query to include expired certifications.
     */
    public function scopeExpired($query)
    {
        return $query->where('expiry_date', '<', Carbon::now())
            ->where('expiry_date', '!=', null);
    }

    /**
     * Scope a query to include certifications by organization.
     */
    public function scopeByOrganization($query, string $organization)
    {
        return $query->where('issuing_organization', 'like', '%' . $organization . '%');
    }

    /**
     * Check if the certification is currently valid.
     */
    public function isValid(): bool
    {
        if (!$this->is_active) {
            return false;
        }

        if ($this->expiry_date && $this->expiry_date->isPast()) {
            return false;
        }

        return true;
    }

    /**
     * Check if the certification is expiring soon.
     */
    public function isExpiringSoon(int $days = 30): bool
    {
        if (!$this->expiry_date || !$this->is_active) {
            return false;
        }

        return $this->expiry_date->isBetween(
            Carbon::now(),
            Carbon::now()->addDays($days)
        );
    }

    /**
     * Check if the certification has expired.
     */
    public function isExpired(): bool
    {
        if (!$this->expiry_date) {
            return false;
        }

        return $this->expiry_date->isPast();
    }

    /**
     * Get the expiry status of the certification.
     */
    public function getExpiryStatusAttribute(): string
    {
        if (!$this->is_active) {
            return 'inactive';
        }

        if (!$this->expiry_date) {
            return 'no_expiry';
        }

        if ($this->isExpired()) {
            return 'expired';
        }

        if ($this->isExpiringSoon()) {
            return 'expiring_soon';
        }

        return 'valid';
    }

    /**
     * Get days until expiry.
     */
    public function getDaysUntilExpiryAttribute(): ?int
    {
        if (!$this->expiry_date) {
            return null;
        }

        return Carbon::now()->diffInDays($this->expiry_date, false);
    }

    /**
     * Get the certification validity period in years.
     */
    public function getValidityPeriodAttribute(): ?int
    {
        if (!$this->issue_date || !$this->expiry_date) {
            return null;
        }

        return $this->issue_date->diffInYears($this->expiry_date);
    }

    /**
     * Check if certification requires renewal.
     */
    public function requiresRenewal(): bool
    {
        return $this->isExpired() || $this->isExpiringSoon(60);
    }
}