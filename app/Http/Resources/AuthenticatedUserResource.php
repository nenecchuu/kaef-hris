<?php

namespace App\Http\Resources;

// use App\Models\Feedback;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class AuthenticatedUserResource extends JsonResource
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
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'division_id' => (float) $this->resource->division_id,
            'head_division_id' => (float) $this->resource->head_division_id,
            'is_active' => (bool) $this->resource->is_active,
            'is_administrator' => (bool) $this->resource->is_administrator,
            'is_superadmin' => (bool) $this->resource->is_superadmin,
            'is_email_blacklisted' => (bool) $this->resource->is_email_blacklisted,
            'is_team_lead' => (bool) $this->resource->is_team_lead,
            'is_use_mfa' => (bool) $this->resource->is_use_mfa,
            'is_mfa_enabled' => (bool) $this->resource->is_mfa_enabled,
            'job_position_id' => (float) $this->resource->job_position_id,
            'team_lead_id' => (float) $this->resource->team_lead_id,
            'permissions' => $this->resource->getPermissions(),
            'avatar_path' => $this->avatar_path
                ? Storage::url($this->resource->avatar_path)
                : 'https://ui-avatars.com/api/?name='.
                rawurlencode($this->name).
                '&color=FFFFFF&background=2e2e2e&length=1',
        ];
    }
}
