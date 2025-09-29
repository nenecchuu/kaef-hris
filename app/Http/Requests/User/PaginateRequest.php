<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;

class PaginateRequest extends FormRequest
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
            'is_active' => ['sometimes', 'nullable', 'boolean'],
            'is_blocked' => ['sometimes', 'nullable', 'boolean'],
            'division_id' => ['sometimes', 'nullable', 'integer'],
            'job_position_id' => ['sometimes', 'nullable', 'integer'],
            'limit' => ['sometimes', 'nullable', 'integer'],
            'page' => ['sometimes', 'nullable', 'integer', 'min:1'],
            'search' => ['sometimes', 'nullable', 'string'],
            'sort_column' => [
                'sometimes',
                'nullable',
                'string',
                'in:name,email,phone_number,created_at,updated_at',
            ],
            'sort_order' => ['sometimes', 'nullable', 'string', 'in:asc,desc'],
        ];
    }
}
