<?php

namespace App\Services;

use App\Models\Employee;
use App\Repositories\EmployeeRepository;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\EmployeeExport;
use App\Imports\EmployeeImport;

/**
 * Employee Service
 *
 * Handles business logic for employee management operations
 */
class EmployeeService
{
    private EmployeeRepository $employeeRepository;

    public function __construct(EmployeeRepository $employeeRepository)
    {
        $this->employeeRepository = $employeeRepository;
    }

    /**
     * Get paginated employees with filters
     */
    public function getPaginatedEmployees(array $filters): LengthAwarePaginator
    {
        return $this->employeeRepository->getPaginatedWithFilters($filters);
    }

    /**
     * Create a new employee
     */
    public function createEmployee(array $data): Employee
    {
        return DB::transaction(function () use ($data) {
            // Generate employee ID if not provided
            if (empty($data['employee_id'])) {
                $data['employee_id'] = Employee::generateEmployeeId();
            }

            // Create main employee record
            $employee = $this->employeeRepository->create($data);

            // Create related records if provided
            if (isset($data['education_history'])) {
                foreach ($data['education_history'] as $education) {
                    $employee->educationHistory()->create($education);
                }
            }

            if (isset($data['certifications'])) {
                foreach ($data['certifications'] as $certification) {
                    $employee->certifications()->create($certification);
                }
            }

            if (isset($data['professional_licenses'])) {
                foreach ($data['professional_licenses'] as $license) {
                    $employee->professionalLicenses()->create($license);
                }
            }

            // Log the creation
            Log::info('Employee created', [
                'employee_id' => $employee->employee_id,
                'full_name' => $employee->full_name,
                'created_by' => auth()->id()
            ]);

            return $employee->load(['division', 'jobPosition', 'manager', 'educationHistory', 'certifications', 'professionalLicenses']);
        });
    }

    /**
     * Get employee by ID
     */
    public function getEmployeeById(string $employeeId): ?Employee
    {
        return $this->employeeRepository->findByEmployeeId($employeeId);
    }

    /**
     * Update employee
     */
    public function updateEmployee(string $employeeId, array $data): ?Employee
    {
        return DB::transaction(function () use ($employeeId, $data) {
            $employee = $this->employeeRepository->findByEmployeeId($employeeId);

            if (!$employee) {
                return null;
            }

            // Update main employee record
            $employee = $this->employeeRepository->update($employee, $data);

            // Update related records if provided
            if (isset($data['education_history'])) {
                $employee->educationHistory()->delete();
                foreach ($data['education_history'] as $education) {
                    $employee->educationHistory()->create($education);
                }
            }

            if (isset($data['certifications'])) {
                $employee->certifications()->delete();
                foreach ($data['certifications'] as $certification) {
                    $employee->certifications()->create($certification);
                }
            }

            if (isset($data['professional_licenses'])) {
                $employee->professionalLicenses()->delete();
                foreach ($data['professional_licenses'] as $license) {
                    $employee->professionalLicenses()->create($license);
                }
            }

            // Log the update
            Log::info('Employee updated', [
                'employee_id' => $employee->employee_id,
                'full_name' => $employee->full_name,
                'updated_by' => auth()->id()
            ]);

            return $employee->load(['division', 'jobPosition', 'manager', 'educationHistory', 'certifications', 'professionalLicenses']);
        });
    }

    /**
     * Delete employee (soft delete)
     */
    public function deleteEmployee(string $employeeId): bool
    {
        $employee = $this->employeeRepository->findByEmployeeId($employeeId);

        if (!$employee) {
            return false;
        }

        // Log the deletion
        Log::info('Employee deleted', [
            'employee_id' => $employee->employee_id,
            'full_name' => $employee->full_name,
            'deleted_by' => auth()->id()
        ]);

        return $this->employeeRepository->delete($employee);
    }

    /**
     * Get active employees
     */
    public function getActiveEmployees(int $perPage = 15): LengthAwarePaginator
    {
        return $this->employeeRepository->getActiveEmployees($perPage);
    }

    /**
     * Get employees by division
     */
    public function getEmployeesByDivision(int $divisionId, int $perPage = 15): LengthAwarePaginator
    {
        return $this->employeeRepository->getByDivision($divisionId, $perPage);
    }

    /**
     * Get subordinates of a manager
     */
    public function getSubordinates(string $managerId, int $perPage = 15): LengthAwarePaginator
    {
        return $this->employeeRepository->getSubordinates($managerId, $perPage);
    }

    /**
     * Bulk import employees from file
     */
    public function bulkImportEmployees(UploadedFile $file): array
    {
        try {
            $import = new EmployeeImport();
            Excel::import($import, $file);

            return [
                'imported' => $import->getImportedCount(),
                'failed' => $import->getFailedCount(),
                'errors' => $import->getErrors()
            ];

        } catch (\Exception $e) {
            Log::error('Employee bulk import failed', [
                'error' => $e->getMessage(),
                'file_name' => $file->getClientOriginalName(),
                'imported_by' => auth()->id()
            ]);

            throw $e;
        }
    }

    /**
     * Export employees to Excel
     */
    public function exportEmployees(array $filters = [])
    {
        $filename = 'karyawan_' . date('Y-m-d_H-i-s') . '.xlsx';

        Log::info('Employee export initiated', [
            'filters' => $filters,
            'exported_by' => auth()->id()
        ]);

        return Excel::download(new EmployeeExport($filters), $filename);
    }

    /**
     * Get demographics report
     */
    public function getDemographicsReport(): array
    {
        return [
            'total_karyawan' => $this->employeeRepository->getTotalCount(),
            'karyawan_aktif' => $this->employeeRepository->getActiveCount(),
            'distribusi_gender' => $this->employeeRepository->getGenderDistribution(),
            'distribusi_umur' => $this->employeeRepository->getAgeDistribution(),
            'distribusi_status_kepegawaian' => $this->employeeRepository->getEmploymentStatusDistribution(),
            'distribusi_tipe_kepegawaian' => $this->employeeRepository->getEmploymentTypeDistribution(),
        ];
    }

    /**
     * Get tenure report
     */
    public function getTenureReport(): array
    {
        return [
            'rata_rata_masa_kerja' => $this->employeeRepository->getAverageTenure(),
            'distribusi_masa_kerja' => $this->employeeRepository->getTenureDistribution(),
            'karyawan_terlama' => $this->employeeRepository->getLongestTenureEmployees(10),
            'karyawan_terbaru' => $this->employeeRepository->getNewestEmployees(10),
        ];
    }

    /**
     * Get division distribution report
     */
    public function getDivisionDistributionReport(): array
    {
        return [
            'karyawan_per_divisi' => $this->employeeRepository->getEmployeeCountByDivision(),
            'persentase_per_divisi' => $this->employeeRepository->getEmployeePercentageByDivision(),
            'pertumbuhan_per_divisi' => $this->employeeRepository->getDivisionGrowthReport(),
        ];
    }
}