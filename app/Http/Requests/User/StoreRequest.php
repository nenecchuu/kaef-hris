<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

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
        $userId = $this->route('id');

        return [
            'name' => ['required', 'string'],
            'email' => [
                'required',
                'email',
                Rule::unique('users', 'email')->ignore($userId)->whereNull('deleted_at'),
            ],
            'phone' => ['nullable', 'regex:'.phoneNumberRegex()],
            'birthdate' => ['nullable', 'date'],
            'description' => ['nullable', 'string'],
            'ldap_username' => ['nullable', 'string'],
            'division_id' => ['required', 'numeric'],
            'job_position_id' => ['required', 'numeric'],
            'team_lead_id' => ['nullable', 'numeric'],
            'head_division_id' => ['nullable', 'numeric'],
            'is_email_blacklisted' => ['nullable', 'boolean'],
            'is_use_mfa' => ['nullable', 'boolean'],
            'is_administrator' => ['nullable', 'boolean'],
            'is_active' => ['nullable', 'boolean'],
            'master_application_ids' => ['nullable', 'array'],
            'password' => ['nullable', 'string'],
            'password_confirmation' => ['nullable', 'string'],
            'image' => ['nullable', 'image', 'max:7168'], // max 7MB
        ];
    }
}
