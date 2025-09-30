<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

/**
 * Employee Collection Resource
 *
 * Formats paginated employee data with Indonesian metadata
 */
class EmployeeCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     */
    public function toArray(Request $request): array
    {
        return [
            'data' => EmployeeResource::collection($this->collection),
            'pagination' => [
                'current_page' => $this->currentPage(),
                'per_page' => $this->perPage(),
                'total' => $this->total(),
                'last_page' => $this->lastPage(),
                'from' => $this->firstItem(),
                'to' => $this->lastItem(),
                'links' => [
                    'first' => $this->url(1),
                    'last' => $this->url($this->lastPage()),
                    'prev' => $this->previousPageUrl(),
                    'next' => $this->nextPageUrl(),
                ],
            ],
            'available_filters' => [
                'employment_status' => [
                    ['value' => 'active', 'label' => 'Aktif'],
                    ['value' => 'inactive', 'label' => 'Tidak Aktif'],
                    ['value' => 'terminated', 'label' => 'Terminasi'],
                    ['value' => 'on_leave', 'label' => 'Cuti'],
                    ['value' => 'probation', 'label' => 'Probasi'],
                    ['value' => 'suspended', 'label' => 'Suspensi'],
                ],
                'employment_type' => [
                    ['value' => 'permanent', 'label' => 'Tetap'],
                    ['value' => 'contract', 'label' => 'Kontrak'],
                    ['value' => 'intern', 'label' => 'Magang'],
                    ['value' => 'consultant', 'label' => 'Konsultan'],
                ],
            ],
        ];
    }

    /**
     * Get additional data that should be returned with the resource array.
     */
    public function with(Request $request): array
    {
        return [
            'metadata' => [
                'timestamp' => now()->format('Y-m-d H:i:s'),
                'timezone' => config('app.timezone'),
                'version' => 'v1',
            ],
        ];
    }
}