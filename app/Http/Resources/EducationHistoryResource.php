<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * Education History Resource
 *
 * Formats education history data with Indonesian labels
 */
class EducationHistoryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'institution_name' => $this->institution_name,
            'degree_level' => $this->degree_level,
            'field_of_study' => $this->field_of_study,
            'graduation_year' => $this->graduation_year,
            'gpa' => $this->gpa,
            'is_verified' => $this->is_verified,
            'created_at' => $this->created_at?->format('Y-m-d H:i:s'),
            'updated_at' => $this->updated_at?->format('Y-m-d H:i:s'),
        ];
    }
}