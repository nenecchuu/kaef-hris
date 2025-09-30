<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Employee\StoreEmployeeRequest;
use App\Http\Requests\Employee\UpdateEmployeeRequest;
use App\Http\Resources\EmployeeResource;
use App\Http\Resources\EmployeeCollection;
use App\Services\EmployeeService;
use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

/**
 * Employee API Controller
 *
 * Handles CRUD operations for employee management with Indonesian user-facing messages
 */
class EmployeeController extends Controller
{
    private EmployeeService $employeeService;

    public function __construct(EmployeeService $employeeService)
    {
        $this->employeeService = $employeeService;
    }

    /**
     * Display a listing of employees with pagination and filtering
     */
    public function index(Request $request): AnonymousResourceCollection
    {
        $filters = [
            'search' => $request->get('search'),
            'division_id' => $request->get('division_id'),
            'employment_status' => $request->get('employment_status'),
            'employment_type' => $request->get('employment_type'),
            'manager_id' => $request->get('manager_id'),
            'per_page' => $request->get('per_page', 15)
        ];

        $employees = $this->employeeService->getPaginatedEmployees($filters);

        return EmployeeCollection::make($employees)->additional([
            'message' => 'Data karyawan berhasil diambil',
            'success' => true
        ]);
    }

    /**
     * Store a newly created employee
     */
    public function store(StoreEmployeeRequest $request): JsonResponse
    {
        try {
            $employee = $this->employeeService->createEmployee($request->validated());

            return response()->json([
                'success' => true,
                'message' => 'Karyawan berhasil ditambahkan',
                'data' => new EmployeeResource($employee)
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal menambahkan karyawan: ' . $e->getMessage(),
                'errors' => []
            ], 500);
        }
    }

    /**
     * Display the specified employee
     */
    public function show(string $employeeId): JsonResponse
    {
        try {
            $employee = $this->employeeService->getEmployeeById($employeeId);

            if (!$employee) {
                return response()->json([
                    'success' => false,
                    'message' => 'Karyawan tidak ditemukan',
                    'data' => null
                ], 404);
            }

            return response()->json([
                'success' => true,
                'message' => 'Detail karyawan berhasil diambil',
                'data' => new EmployeeResource($employee)
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil data karyawan: ' . $e->getMessage(),
                'data' => null
            ], 500);
        }
    }

    /**
     * Update the specified employee
     */
    public function update(UpdateEmployeeRequest $request, string $employeeId): JsonResponse
    {
        try {
            $employee = $this->employeeService->updateEmployee($employeeId, $request->validated());

            if (!$employee) {
                return response()->json([
                    'success' => false,
                    'message' => 'Karyawan tidak ditemukan',
                    'data' => null
                ], 404);
            }

            return response()->json([
                'success' => true,
                'message' => 'Data karyawan berhasil diperbarui',
                'data' => new EmployeeResource($employee)
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal memperbarui data karyawan: ' . $e->getMessage(),
                'errors' => []
            ], 500);
        }
    }

    /**
     * Remove the specified employee (soft delete)
     */
    public function destroy(string $employeeId): JsonResponse
    {
        try {
            $deleted = $this->employeeService->deleteEmployee($employeeId);

            if (!$deleted) {
                return response()->json([
                    'success' => false,
                    'message' => 'Karyawan tidak ditemukan',
                    'data' => null
                ], 404);
            }

            return response()->json([
                'success' => true,
                'message' => 'Karyawan berhasil dihapus',
                'data' => null
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal menghapus karyawan: ' . $e->getMessage(),
                'data' => null
            ], 500);
        }
    }

    /**
     * Get active employees only
     */
    public function getActiveEmployees(Request $request): AnonymousResourceCollection
    {
        $perPage = $request->get('per_page', 15);
        $employees = $this->employeeService->getActiveEmployees($perPage);

        return EmployeeCollection::make($employees)->additional([
            'message' => 'Data karyawan aktif berhasil diambil',
            'success' => true
        ]);
    }

    /**
     * Get employees by division
     */
    public function getEmployeesByDivision(Request $request, int $divisionId): AnonymousResourceCollection
    {
        $perPage = $request->get('per_page', 15);
        $employees = $this->employeeService->getEmployeesByDivision($divisionId, $perPage);

        return EmployeeCollection::make($employees)->additional([
            'message' => 'Data karyawan berdasarkan divisi berhasil diambil',
            'success' => true
        ]);
    }

    /**
     * Get subordinates of a manager
     */
    public function getSubordinates(Request $request, string $managerId): AnonymousResourceCollection
    {
        $perPage = $request->get('per_page', 15);
        $employees = $this->employeeService->getSubordinates($managerId, $perPage);

        return EmployeeCollection::make($employees)->additional([
            'message' => 'Data bawahan berhasil diambil',
            'success' => true
        ]);
    }

    /**
     * Bulk import employees from CSV/Excel
     */
    public function bulkImport(Request $request): JsonResponse
    {
        $request->validate([
            'file' => 'required|file|mimes:csv,xlsx,xls|max:5120', // 5MB max
        ], [
            'file.required' => 'File impor wajib diunggah',
            'file.mimes' => 'File harus berformat CSV atau Excel',
            'file.max' => 'Ukuran file maksimal 5MB'
        ]);

        try {
            $result = $this->employeeService->bulkImportEmployees($request->file('file'));

            return response()->json([
                'success' => true,
                'message' => "Berhasil mengimpor {$result['imported']} karyawan",
                'data' => [
                    'imported' => $result['imported'],
                    'failed' => $result['failed'],
                    'errors' => $result['errors']
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengimpor data karyawan: ' . $e->getMessage(),
                'data' => null
            ], 500);
        }
    }

    /**
     * Export employees to Excel
     */
    public function exportEmployees(Request $request)
    {
        try {
            $filters = [
                'division_id' => $request->get('division_id'),
                'employment_status' => $request->get('employment_status'),
                'employment_type' => $request->get('employment_type'),
            ];

            return $this->employeeService->exportEmployees($filters);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengekspor data karyawan: ' . $e->getMessage(),
                'data' => null
            ], 500);
        }
    }

    /**
     * Get demographics report
     */
    public function getDemographicsReport(): JsonResponse
    {
        try {
            $report = $this->employeeService->getDemographicsReport();

            return response()->json([
                'success' => true,
                'message' => 'Laporan demografis berhasil diambil',
                'data' => $report
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil laporan demografis: ' . $e->getMessage(),
                'data' => null
            ], 500);
        }
    }

    /**
     * Get tenure report
     */
    public function getTenureReport(): JsonResponse
    {
        try {
            $report = $this->employeeService->getTenureReport();

            return response()->json([
                'success' => true,
                'message' => 'Laporan masa kerja berhasil diambil',
                'data' => $report
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil laporan masa kerja: ' . $e->getMessage(),
                'data' => null
            ], 500);
        }
    }

    /**
     * Get division distribution report
     */
    public function getDivisionDistributionReport(): JsonResponse
    {
        try {
            $report = $this->employeeService->getDivisionDistributionReport();

            return response()->json([
                'success' => true,
                'message' => 'Laporan distribusi divisi berhasil diambil',
                'data' => $report
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil laporan distribusi divisi: ' . $e->getMessage(),
                'data' => null
            ], 500);
        }
    }
}