<?php

namespace App\Http\Requests\AuditTrail;

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
            'action' => ['sometimes', 'nullable', 'string'],
            'performed_by_id' => ['sometimes', 'nullable', 'integer'],
            'start_date' => ['sometimes', 'nullable', 'date'],
            'end_date' => ['sometimes', 'nullable', 'date'],
            'limit' => ['sometimes', 'nullable', 'integer'],
            'page' => ['sometimes', 'nullable', 'integer', 'min:1'],
            'search' => ['sometimes', 'nullable', 'string'],
            'sort_column' => [
                'sometimes',
                'nullable',
                'string',
                'in:created_at,performed_by_name,action',
            ],
            'sort_order' => ['sometimes', 'nullable', 'string', 'in:asc,desc'],
        ];
    }
}
