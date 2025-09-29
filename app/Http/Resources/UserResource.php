<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            ...$this->resource->makeHidden([
                'deleted_at',
            ])->toArray(),
            'birthdate' => Carbon::parse($this->resource->birthdate)->format('Y-m-d'),
            'formatted_birthdate' => $this->resource->formatted_birthdate,
            'division_id' => (float) $this->resource->division_id,
            'head_division_id' => (float) $this->resource->head_division_id,
            'is_active' => (bool) $this->resource->is_active,
            'is_administrator' => (bool) $this->resource->is_administrator,
            'is_email_blacklisted' => (bool) $this->resource->is_email_blacklisted,
            'is_team_lead' => (bool) $this->resource->is_team_lead,
            'is_head_division' => (bool) $this->resource->is_head_division,
            'is_use_mfa' => (bool) $this->resource->is_use_mfa,
            'is_mfa_enabled' => (bool) $this->resource->is_mfa_enabled,
            'job_position_id' => (float) $this->resource->job_position_id,
            'team_lead_id' => (float) $this->resource->team_lead_id,
            'avatar_path' => $this->resource->avatar_path ? asset('storage/'.$this->resource->avatar_path) : null,
        ];
    }
}
