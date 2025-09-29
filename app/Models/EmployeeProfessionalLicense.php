<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Carbon\Carbon;

/**
 * EmployeeProfessionalLicense Model
 *
 * Tracks professional licenses required for pharmaceutical
 * industry compliance and regulatory requirements.
 */
class EmployeeProfessionalLicense extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     */
    protected $table = 'employee_professional_licenses';

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'employee_id',
        'license_name',
        'license_number',
        'issuing_authority',
        'issue_date',
        'expiry_date',
        'license_status',
    ];

    /**
     * The attributes that should be cast to native types.
     */
    protected $casts = [
        'issue_date' => 'date',
        'expiry_date' => 'date',
        'license_status' => 'string',
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
     * Available license statuses.
     */
    public const LICENSE_STATUSES = [
        'active' => 'Active',
        'expired' => 'Expired',
        'suspended' => 'Suspended',
        'revoked' => 'Revoked',
    ];

    /**
     * Common pharmaceutical industry licenses.
     */
    public const PHARMACEUTICAL_LICENSES = [
        'STRA' => 'Surat Tanda Registrasi Apoteker (Pharmacist Registration)',
        'SIA' => 'Surat Izin Apotek (Pharmacy Permit)',
        'SIPA' => 'Surat Izin Praktik Apoteker (Pharmacist Practice Permit)',
        'SIKTTK' => 'Surat Izin Kerja Tenaga Teknis Kefarmasian (Pharmaceutical Technical License)',
        'CPOB' => 'Cara Pembuatan Obat yang Baik (Good Manufacturing Practice)',
        'CDOB' => 'Cara Distribusi Obat yang Baik (Good Distribution Practice)',
        'ISO_9001' => 'ISO 9001 Quality Management System',
        'ISO_14001' => 'ISO 14001 Environmental Management System',
        'HACCP' => 'Hazard Analysis Critical Control Points',
    ];

    /**
     * Get the employee that owns the license.
     */
    public function employee(): BelongsTo
    {
        return $this->belongsTo(Employee::class);
    }

    /**
     * Scope a query to only include active licenses.
     */
    public function scopeActive($query)
    {
        return $query->where('license_status', 'active');
    }

    /**
     * Scope a query to only include expired licenses.
     */
    public function scopeExpired($query)
    {
        return $query->where('license_status', 'expired')
            ->orWhere(function ($query) {
                $query->where('expiry_date', '<', Carbon::now())
                    ->where('license_status', 'active');
            });
    }

    /**
     * Scope a query to include licenses expiring soon.
     */
    public function scopeExpiringSoon($query, int $days = 30)
    {
        $expiryThreshold = Carbon::now()->addDays($days);
        return $query->where('expiry_date', '<=', $expiryThreshold)
            ->where('expiry_date', '>', Carbon::now())
            ->where('license_status', 'active');
    }

    /**
     * Scope a query to include licenses by status.
     */
    public function scopeByStatus($query, string $status)
    {
        return $query->where('license_status', $status);
    }

    /**
     * Scope a query to include licenses by issuing authority.
     */
    public function scopeByAuthority($query, string $authority)
    {
        return $query->where('issuing_authority', 'like', '%' . $authority . '%');
    }

    /**
     * Check if the license is currently valid.
     */
    public function isValid(): bool
    {
        if ($this->license_status !== 'active') {
            return false;
        }

        if ($this->expiry_date && $this->expiry_date->isPast()) {
            return false;
        }

        return true;
    }

    /**
     * Check if the license is expiring soon.
     */
    public function isExpiringSoon(int $days = 30): bool
    {
        if (!$this->expiry_date || $this->license_status !== 'active') {
            return false;
        }

        return $this->expiry_date->isBetween(
            Carbon::now(),
            Carbon::now()->addDays($days)
        );
    }

    /**
     * Check if the license has expired.
     */
    public function isExpired(): bool
    {
        if (!$this->expiry_date) {
            return $this->license_status === 'expired';
        }

        return $this->expiry_date->isPast() || $this->license_status === 'expired';
    }

    /**
     * Check if the license is suspended or revoked.
     */
    public function isInvalidated(): bool
    {
        return in_array($this->license_status, ['suspended', 'revoked']);
    }

    /**
     * Get the human-readable license status.
     */
    public function getLicenseStatusNameAttribute(): string
    {
        return self::LICENSE_STATUSES[$this->license_status] ?? $this->license_status;
    }

    /**
     * Get the current status considering expiry date.
     */
    public function getCurrentStatusAttribute(): string
    {
        if ($this->isInvalidated()) {
            return $this->license_status;
        }

        if ($this->isExpired()) {
            return 'expired';
        }

        if ($this->isExpiringSoon()) {
            return 'expiring_soon';
        }

        if ($this->isValid()) {
            return 'active';
        }

        return $this->license_status;
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
     * Get the license validity period in years.
     */
    public function getValidityPeriodAttribute(): ?int
    {
        if (!$this->issue_date || !$this->expiry_date) {
            return null;
        }

        return $this->issue_date->diffInYears($this->expiry_date);
    }

    /**
     * Check if license requires immediate renewal.
     */
    public function requiresImmediateRenewal(): bool
    {
        return $this->isExpired() || $this->isExpiringSoon(7);
    }

    /**
     * Check if license is a pharmaceutical industry license.
     */
    public function isPharmaceuticalLicense(): bool
    {
        $licenseCode = strtoupper($this->license_name);

        foreach (array_keys(self::PHARMACEUTICAL_LICENSES) as $pharmaLicense) {
            if (strpos($licenseCode, $pharmaLicense) !== false) {
                return true;
            }
        }

        return false;
    }

    /**
     * Get the license priority level (1 = critical, 5 = low priority).
     */
    public function getPriorityLevelAttribute(): int
    {
        $criticalLicenses = ['STRA', 'SIA', 'SIPA', 'CPOB'];
        $highPriorityLicenses = ['CDOB', 'SIKTTK'];

        $licenseName = strtoupper($this->license_name);

        foreach ($criticalLicenses as $critical) {
            if (strpos($licenseName, $critical) !== false) {
                return 1; // Critical
            }
        }

        foreach ($highPriorityLicenses as $high) {
            if (strpos($licenseName, $high) !== false) {
                return 2; // High
            }
        }

        if ($this->isPharmaceuticalLicense()) {
            return 3; // Medium
        }

        return 4; // Low
    }
}