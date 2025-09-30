<?php

namespace App\Repositories;

use App\Models\Employee;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;

/**
 * Employee Repository
 *
 * Handles data access layer for employee management
 */
class EmployeeRepository
{
    private Employee $model;

    public function __construct(Employee $model)
    {
        $this->model = $model;
    }

    /**
     * Get paginated employees with filters and search
     */
    public function getPaginatedWithFilters(array $filters): LengthAwarePaginator
    {
        $query = $this->model->with(['division', 'jobPosition', 'manager'])
            ->select('employees.*');

        // Apply search filter
        if (!empty($filters['search'])) {
            $search = $filters['search'];
            $query->where(function (Builder $q) use ($search) {
                $q->where('full_name', 'ILIKE', "%{$search}%")
                  ->orWhere('employee_number', 'ILIKE', "%{$search}%")
                  ->orWhere('email', 'ILIKE', "%{$search}%")
                  ->orWhere('employee_id', 'ILIKE', "%{$search}%");
            });
        }

        // Apply division filter
        if (!empty($filters['division_id'])) {
            $query->where('division_id', $filters['division_id']);
        }

        // Apply employment status filter
        if (!empty($filters['employment_status'])) {
            $query->where('employment_status', $filters['employment_status']);
        }

        // Apply employment type filter
        if (!empty($filters['employment_type'])) {
            $query->where('employment_type', $filters['employment_type']);
        }

        // Apply manager filter
        if (!empty($filters['manager_id'])) {
            $query->where('manager_id', $filters['manager_id']);
        }

        // Apply sorting
        $sortBy = $filters['sort_by'] ?? 'full_name';
        $sortOrder = $filters['sort_order'] ?? 'asc';
        $query->orderBy($sortBy, $sortOrder);

        $perPage = $filters['per_page'] ?? 15;
        return $query->paginate($perPage);
    }

    /**
     * Find employee by employee_id
     */
    public function findByEmployeeId(string $employeeId): ?Employee
    {
        return $this->model->with([
            'division',
            'jobPosition',
            'manager',
            'subordinates',
            'educationHistory',
            'certifications',
            'professionalLicenses',
            'user'
        ])->where('employee_id', $employeeId)->first();
    }

    /**
     * Create new employee
     */
    public function create(array $data): Employee
    {
        return $this->model->create($data);
    }

    /**
     * Update employee
     */
    public function update(Employee $employee, array $data): Employee
    {
        $employee->update($data);
        return $employee->refresh();
    }

    /**
     * Delete employee (soft delete)
     */
    public function delete(Employee $employee): bool
    {
        return $employee->delete();
    }

    /**
     * Get active employees
     */
    public function getActiveEmployees(int $perPage = 15): LengthAwarePaginator
    {
        return $this->model->with(['division', 'jobPosition', 'manager'])
            ->where('employment_status', 'active')
            ->orderBy('full_name')
            ->paginate($perPage);
    }

    /**
     * Get employees by division
     */
    public function getByDivision(int $divisionId, int $perPage = 15): LengthAwarePaginator
    {
        return $this->model->with(['division', 'jobPosition', 'manager'])
            ->where('division_id', $divisionId)
            ->orderBy('full_name')
            ->paginate($perPage);
    }

    /**
     * Get subordinates of a manager
     */
    public function getSubordinates(string $managerId, int $perPage = 15): LengthAwarePaginator
    {
        return $this->model->with(['division', 'jobPosition', 'manager'])
            ->where('manager_id', $managerId)
            ->orderBy('full_name')
            ->paginate($perPage);
    }

    /**
     * Get total employee count
     */
    public function getTotalCount(): int
    {
        return $this->model->count();
    }

    /**
     * Get active employee count
     */
    public function getActiveCount(): int
    {
        return $this->model->where('employment_status', 'active')->count();
    }

    /**
     * Get gender distribution (based on NIK)
     */
    public function getGenderDistribution(): array
    {
        return $this->model->selectRaw("
            CASE
                WHEN CAST(SUBSTRING(national_id, 7, 2) AS INTEGER) > 40 THEN 'Perempuan'
                ELSE 'Laki-laki'
            END as gender,
            COUNT(*) as count
        ")
        ->whereNotNull('national_id')
        ->groupBy(DB::raw("
            CASE
                WHEN CAST(SUBSTRING(national_id, 7, 2) AS INTEGER) > 40 THEN 'Perempuan'
                ELSE 'Laki-laki'
            END
        "))
        ->pluck('count', 'gender')
        ->toArray();
    }

    /**
     * Get age distribution
     */
    public function getAgeDistribution(): array
    {
        return $this->model->selectRaw("
            CASE
                WHEN EXTRACT(YEAR FROM AGE(birth_date)) < 25 THEN '< 25 tahun'
                WHEN EXTRACT(YEAR FROM AGE(birth_date)) BETWEEN 25 AND 34 THEN '25-34 tahun'
                WHEN EXTRACT(YEAR FROM AGE(birth_date)) BETWEEN 35 AND 44 THEN '35-44 tahun'
                WHEN EXTRACT(YEAR FROM AGE(birth_date)) BETWEEN 45 AND 54 THEN '45-54 tahun'
                ELSE '55+ tahun'
            END as age_group,
            COUNT(*) as count
        ")
        ->whereNotNull('birth_date')
        ->groupBy(DB::raw("
            CASE
                WHEN EXTRACT(YEAR FROM AGE(birth_date)) < 25 THEN '< 25 tahun'
                WHEN EXTRACT(YEAR FROM AGE(birth_date)) BETWEEN 25 AND 34 THEN '25-34 tahun'
                WHEN EXTRACT(YEAR FROM AGE(birth_date)) BETWEEN 35 AND 44 THEN '35-44 tahun'
                WHEN EXTRACT(YEAR FROM AGE(birth_date)) BETWEEN 45 AND 54 THEN '45-54 tahun'
                ELSE '55+ tahun'
            END
        "))
        ->pluck('count', 'age_group')
        ->toArray();
    }

    /**
     * Get employment status distribution
     */
    public function getEmploymentStatusDistribution(): array
    {
        $statusLabels = [
            'active' => 'Aktif',
            'inactive' => 'Tidak Aktif',
            'terminated' => 'Terminasi',
            'on_leave' => 'Cuti',
            'probation' => 'Probasi',
            'suspended' => 'Suspensi'
        ];

        $distribution = $this->model->selectRaw('employment_status, COUNT(*) as count')
            ->groupBy('employment_status')
            ->pluck('count', 'employment_status')
            ->toArray();

        // Convert to Indonesian labels
        $result = [];
        foreach ($distribution as $status => $count) {
            $label = $statusLabels[$status] ?? $status;
            $result[$label] = $count;
        }

        return $result;
    }

    /**
     * Get employment type distribution
     */
    public function getEmploymentTypeDistribution(): array
    {
        $typeLabels = [
            'permanent' => 'Tetap',
            'contract' => 'Kontrak',
            'intern' => 'Magang',
            'consultant' => 'Konsultan'
        ];

        $distribution = $this->model->selectRaw('employment_type, COUNT(*) as count')
            ->groupBy('employment_type')
            ->pluck('count', 'employment_type')
            ->toArray();

        // Convert to Indonesian labels
        $result = [];
        foreach ($distribution as $type => $count) {
            $label = $typeLabels[$type] ?? $type;
            $result[$label] = $count;
        }

        return $result;
    }

    /**
     * Get average tenure in years
     */
    public function getAverageTenure(): float
    {
        return $this->model->selectRaw('AVG(EXTRACT(YEAR FROM AGE(hire_date))) as avg_tenure')
            ->whereNotNull('hire_date')
            ->value('avg_tenure') ?? 0;
    }

    /**
     * Get tenure distribution
     */
    public function getTenureDistribution(): array
    {
        return $this->model->selectRaw("
            CASE
                WHEN EXTRACT(YEAR FROM AGE(hire_date)) < 1 THEN '< 1 tahun'
                WHEN EXTRACT(YEAR FROM AGE(hire_date)) BETWEEN 1 AND 2 THEN '1-2 tahun'
                WHEN EXTRACT(YEAR FROM AGE(hire_date)) BETWEEN 3 AND 5 THEN '3-5 tahun'
                WHEN EXTRACT(YEAR FROM AGE(hire_date)) BETWEEN 6 AND 10 THEN '6-10 tahun'
                ELSE '> 10 tahun'
            END as tenure_group,
            COUNT(*) as count
        ")
        ->whereNotNull('hire_date')
        ->groupBy(DB::raw("
            CASE
                WHEN EXTRACT(YEAR FROM AGE(hire_date)) < 1 THEN '< 1 tahun'
                WHEN EXTRACT(YEAR FROM AGE(hire_date)) BETWEEN 1 AND 2 THEN '1-2 tahun'
                WHEN EXTRACT(YEAR FROM AGE(hire_date)) BETWEEN 3 AND 5 THEN '3-5 tahun'
                WHEN EXTRACT(YEAR FROM AGE(hire_date)) BETWEEN 6 AND 10 THEN '6-10 tahun'
                ELSE '> 10 tahun'
            END
        "))
        ->pluck('count', 'tenure_group')
        ->toArray();
    }

    /**
     * Get longest tenure employees
     */
    public function getLongestTenureEmployees(int $limit = 10): array
    {
        return $this->model->with(['division', 'jobPosition'])
            ->selectRaw('*, EXTRACT(YEAR FROM AGE(hire_date)) as years_of_service')
            ->whereNotNull('hire_date')
            ->orderByDesc('hire_date')
            ->limit($limit)
            ->get()
            ->map(function ($employee) {
                return [
                    'nama_lengkap' => $employee->full_name,
                    'nomor_karyawan' => $employee->employee_number,
                    'divisi' => $employee->division->name ?? '',
                    'jabatan' => $employee->jobPosition->name ?? '',
                    'tanggal_masuk' => $employee->hire_date?->format('d/m/Y'),
                    'masa_kerja' => $employee->years_of_service . ' tahun'
                ];
            })
            ->toArray();
    }

    /**
     * Get newest employees
     */
    public function getNewestEmployees(int $limit = 10): array
    {
        return $this->model->with(['division', 'jobPosition'])
            ->whereNotNull('hire_date')
            ->orderBy('hire_date')
            ->limit($limit)
            ->get()
            ->map(function ($employee) {
                return [
                    'nama_lengkap' => $employee->full_name,
                    'nomor_karyawan' => $employee->employee_number,
                    'divisi' => $employee->division->name ?? '',
                    'jabatan' => $employee->jobPosition->name ?? '',
                    'tanggal_masuk' => $employee->hire_date?->format('d/m/Y'),
                    'masa_kerja' => $employee->years_of_service . ' tahun'
                ];
            })
            ->toArray();
    }

    /**
     * Get employee count by division
     */
    public function getEmployeeCountByDivision(): array
    {
        return $this->model->join('divisions', 'employees.division_id', '=', 'divisions.id')
            ->selectRaw('divisions.name as divisi, COUNT(employees.id) as jumlah_karyawan')
            ->groupBy('divisions.id', 'divisions.name')
            ->orderBy('jumlah_karyawan', 'desc')
            ->pluck('jumlah_karyawan', 'divisi')
            ->toArray();
    }

    /**
     * Get employee percentage by division
     */
    public function getEmployeePercentageByDivision(): array
    {
        $totalEmployees = $this->getTotalCount();
        $countByDivision = $this->getEmployeeCountByDivision();

        $result = [];
        foreach ($countByDivision as $division => $count) {
            $percentage = $totalEmployees > 0 ? round(($count / $totalEmployees) * 100, 2) : 0;
            $result[$division] = $percentage;
        }

        return $result;
    }

    /**
     * Get division growth report (last 12 months)
     */
    public function getDivisionGrowthReport(): array
    {
        return $this->model->join('divisions', 'employees.division_id', '=', 'divisions.id')
            ->selectRaw('
                divisions.name as divisi,
                COUNT(CASE WHEN employees.hire_date >= ? THEN 1 END) as karyawan_baru,
                COUNT(CASE WHEN employees.termination_date >= ? THEN 1 END) as karyawan_keluar,
                COUNT(employees.id) as total_karyawan
            ', [
                now()->subMonths(12),
                now()->subMonths(12)
            ])
            ->groupBy('divisions.id', 'divisions.name')
            ->orderBy('karyawan_baru', 'desc')
            ->get()
            ->map(function ($item) {
                return [
                    'divisi' => $item->divisi,
                    'karyawan_baru' => $item->karyawan_baru,
                    'karyawan_keluar' => $item->karyawan_keluar,
                    'pertumbuhan_bersih' => $item->karyawan_baru - $item->karyawan_keluar,
                    'total_karyawan' => $item->total_karyawan
                ];
            })
            ->toArray();
    }
}