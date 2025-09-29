<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class SettingPasswordComplexityResource extends JsonResource
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
            'minimum_limit_character' => (int) $this->resource->minimum_limit_character,
            'password_reuse_limit' => (int) $this->resource->password_reuse_limit,
            'password_expired_period' => (int) $this->resource->password_expired_period,
            'is_minimum_limit_character' => (bool) $this->resource->is_minimum_limit_character,
            'is_password_reuse_limit' => (bool) $this->resource->is_password_reuse_limit,
            'use_capital_letter' => (bool) $this->resource->use_capital_letter,
            'use_small_letter' => (bool) $this->resource->use_small_letter,
            'use_number' => (bool) $this->resource->use_number,
            'use_symbol' => (bool) $this->resource->use_symbol,
        ];
    }
}
