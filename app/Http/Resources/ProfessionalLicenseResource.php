<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * Professional License Resource
 *
 * Formats professional license data with Indonesian labels
 */
class ProfessionalLicenseResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'license_name' => $this->license_name,
            'license_number' => $this->license_number,
            'issuing_authority' => $this->issuing_authority,
            'issue_date' => $this->issue_date?->format('Y-m-d'),
            'expiry_date' => $this->expiry_date?->format('Y-m-d'),
            'license_status' => $this->license_status,
            'license_status_label' => $this->getLicenseStatusLabel(),
            'is_expired' => $this->expiry_date ? $this->expiry_date->isPast() : false,
            'days_until_expiry' => $this->expiry_date ? now()->diffInDays($this->expiry_date, false) : null,
            'created_at' => $this->created_at?->format('Y-m-d H:i:s'),
            'updated_at' => $this->updated_at?->format('Y-m-d H:i:s'),
        ];
    }

    /**
     * Get license status label in Indonesian
     */
    private function getLicenseStatusLabel(): string
    {
        $labels = [
            'active' => 'Aktif',
            'expired' => 'Kadaluarsa',
            'suspended' => 'Ditangguhkan',
            'revoked' => 'Dicabut',
        ];

        return $labels[$this->license_status] ?? $this->license_status;
    }
}