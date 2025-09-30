<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * Certification Resource
 *
 * Formats certification data with Indonesian labels
 */
class CertificationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'certification_name' => $this->certification_name,
            'issuing_organization' => $this->issuing_organization,
            'issue_date' => $this->issue_date?->format('Y-m-d'),
            'expiry_date' => $this->expiry_date?->format('Y-m-d'),
            'certification_number' => $this->certification_number,
            'is_active' => $this->is_active,
            'is_expired' => $this->expiry_date ? $this->expiry_date->isPast() : false,
            'days_until_expiry' => $this->expiry_date ? now()->diffInDays($this->expiry_date, false) : null,
            'created_at' => $this->created_at?->format('Y-m-d H:i:s'),
            'updated_at' => $this->updated_at?->format('Y-m-d H:i:s'),
        ];
    }
}