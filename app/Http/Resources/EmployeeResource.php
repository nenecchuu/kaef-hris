<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * Employee Resource
 *
 * Formats employee data for API responses with Indonesian labels
 */
class EmployeeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'employee_id' => $this->employee_id,
            'employee_number' => $this->employee_number,
            'personal_info' => [
                'full_name' => $this->full_name,
                'preferred_name' => $this->preferred_name,
                'birth_date' => $this->birth_date?->format('Y-m-d'),
                'age' => $this->age,
                'national_id' => $this->when($request->user()?->is_administrator, $this->national_id),
                'tax_id' => $this->when($request->user()?->is_administrator, $this->tax_id),
                'photo_url' => $this->photo_url,
            ],
            'contact_info' => [
                'email' => $this->email,
                'phone' => $this->phone,
                'address' => $this->address,
                'emergency_contact' => [
                    'name' => $this->emergency_contact_name,
                    'phone' => $this->emergency_contact_phone,
                ],
            ],
            'employment_info' => [
                'employment_status' => $this->employment_status,
                'employment_status_label' => $this->getEmploymentStatusLabel(),
                'employment_type' => $this->employment_type,
                'employment_type_label' => $this->getEmploymentTypeLabel(),
                'hire_date' => $this->hire_date?->format('Y-m-d'),
                'termination_date' => $this->termination_date?->format('Y-m-d'),
                'years_of_service' => $this->years_of_service,
                'is_active' => $this->isActive(),
            ],
            'organizational_info' => [
                'division' => $this->when($this->relationLoaded('division'), [
                    'id' => $this->division?->id,
                    'name' => $this->division?->name,
                ]),
                'job_position' => $this->when($this->relationLoaded('jobPosition'), [
                    'id' => $this->jobPosition?->id,
                    'name' => $this->jobPosition?->name,
                ]),
                'manager' => $this->when($this->relationLoaded('manager'), [
                    'employee_id' => $this->manager?->employee_id,
                    'full_name' => $this->manager?->full_name,
                    'job_position' => $this->manager?->jobPosition?->name,
                ]),
                'is_manager' => $this->isManager(),
                'subordinates_count' => $this->when($this->relationLoaded('subordinates'),
                    $this->subordinates?->count() ?? 0
                ),
            ],
            'system_access' => [
                'has_access' => $this->hasSystemAccess(),
                'user_id' => $this->user_id,
                'username' => $this->when($this->relationLoaded('user'), $this->user?->ldap_username),
            ],
            'education_history' => $this->when($this->relationLoaded('educationHistory'),
                EducationHistoryResource::collection($this->educationHistory)
            ),
            'certifications' => $this->when($this->relationLoaded('certifications'),
                CertificationResource::collection($this->certifications)
            ),
            'professional_licenses' => $this->when($this->relationLoaded('professionalLicenses'),
                ProfessionalLicenseResource::collection($this->professionalLicenses)
            ),
            'subordinates' => $this->when($this->relationLoaded('subordinates'),
                EmployeeResource::collection($this->subordinates)
            ),
            'metadata' => [
                'created_at' => $this->created_at?->format('Y-m-d H:i:s'),
                'updated_at' => $this->updated_at?->format('Y-m-d H:i:s'),
                'deleted_at' => $this->deleted_at?->format('Y-m-d H:i:s'),
            ],
        ];
    }

    /**
     * Get employment status label in Indonesian
     */
    private function getEmploymentStatusLabel(): string
    {
        $labels = [
            'active' => 'Aktif',
            'inactive' => 'Tidak Aktif',
            'terminated' => 'Terminasi',
            'on_leave' => 'Cuti',
            'probation' => 'Probasi',
            'suspended' => 'Suspensi',
        ];

        return $labels[$this->employment_status] ?? $this->employment_status;
    }

    /**
     * Get employment type label in Indonesian
     */
    private function getEmploymentTypeLabel(): string
    {
        $labels = [
            'permanent' => 'Tetap',
            'contract' => 'Kontrak',
            'intern' => 'Magang',
            'consultant' => 'Konsultan',
        ];

        return $labels[$this->employment_type] ?? $this->employment_type;
    }
}