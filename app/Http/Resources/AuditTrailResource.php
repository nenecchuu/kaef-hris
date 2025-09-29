<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AuditTrailResource extends JsonResource
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
            'id' => (int) $this->resource->id,
            'created_at' => $this->resource->created_at,
            'formatted_created_at' => $this->resource->formatted_created_at,
            'performed_by_name' => $this->resource->performed_by_name,
            'action' => $this->resource->action,
            'formatted_description' => $this->resource->formatted_description,
        ];
    }
}
