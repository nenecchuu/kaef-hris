<?php

namespace App\Http\Requests\SettingPasswordComplexity;

use Illuminate\Foundation\Http\FormRequest;

class StoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'minimum_limit_character' => ['nullable', 'numeric'],
            'password_reuse_limit' => ['nullable', 'numeric'],
            'password_expired_period' => ['nullable', 'numeric'],
            'is_minimum_limit_character' => ['nullable', 'boolean'],
            'is_password_reuse_limit' => ['nullable', 'boolean'],
            'use_capital_letter' => ['nullable', 'boolean'],
            'use_small_letter' => ['nullable', 'boolean'],
            'reset_password' => ['sometimes', 'nullable', 'boolean'],
            'use_number' => ['nullable', 'boolean'],
            'use_symbol' => ['nullable', 'boolean'],
        ];
    }
}
