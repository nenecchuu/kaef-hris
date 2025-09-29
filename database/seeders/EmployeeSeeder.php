<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Employee;
use App\Models\Division;
use App\Models\JobPosition;
use App\Models\EmployeeEducationHistory;
use App\Models\EmployeeCertification;
use App\Models\EmployeeProfessionalLicense;

/**
 * EmployeeSeeder
 *
 * Seeds the database with sample employee data following
 * PT Kimia Farma's organizational structure and pharmaceutical
 * industry context.
 */
class EmployeeSeeder extends Seeder
{
    /**
     * PT Kimia Farma divisions and their typical job positions.
     */
    private array $kimiaFarmaDivisions = [
        'Manufacturing & Production' => [
            'Production Manager',
            'Quality Control Manager',
            'Quality Assurance Manager',
            'Production Supervisor',
            'QC Analyst',
            'QA Analyst',
            'Production Operator',
            'Machine Operator',
            'Maintenance Technician',
            'Warehouse Supervisor',
        ],
        'Research & Development' => [
            'R&D Manager',
            'Senior Pharmacist',
            'Formulation Scientist',
            'Analytical Chemist',
            'Microbiologist',
            'Clinical Research Associate',
            'Regulatory Affairs Specialist',
            'Product Development Specialist',
        ],
        'Commercial & Marketing' => [
            'Commercial Manager',
            'Marketing Manager',
            'Sales Manager',
            'Brand Manager',
            'Medical Representative',
            'Key Account Manager',
            'Digital Marketing Specialist',
            'Market Research Analyst',
        ],
        'Retail & Healthcare Services' => [
            'Retail Operations Manager',
            'Pharmacy Manager',
            'Clinical Pharmacist',
            'Pharmacy Assistant',
            'Healthcare Consultant',
            'Customer Service Representative',
            'Store Supervisor',
            'Inventory Coordinator',
        ],
        'Supply Chain & Distribution' => [
            'Supply Chain Manager',
            'Procurement Manager',
            'Logistics Manager',
            'Distribution Supervisor',
            'Warehouse Manager',
            'Inventory Analyst',
            'Procurement Specialist',
            'Transportation Coordinator',
        ],
        'Finance & Accounting' => [
            'Finance Manager',
            'Accounting Manager',
            'Financial Analyst',
            'Cost Accountant',
            'Treasury Specialist',
            'Tax Specialist',
            'Budget Analyst',
            'Accounts Payable Specialist',
        ],
        'Human Resources' => [
            'HR Manager',
            'HR Business Partner',
            'Recruitment Specialist',
            'Training & Development Specialist',
            'Compensation & Benefits Specialist',
            'Employee Relations Specialist',
            'HR Analyst',
            'Payroll Specialist',
        ],
        'Information Technology' => [
            'IT Manager',
            'System Administrator',
            'Database Administrator',
            'Software Developer',
            'Business Analyst',
            'IT Support Specialist',
            'Cybersecurity Specialist',
            'Data Analyst',
        ],
        'Legal & Compliance' => [
            'Legal Manager',
            'Compliance Manager',
            'Corporate Secretary',
            'Legal Counsel',
            'Regulatory Compliance Officer',
            'Risk Management Specialist',
            'Corporate Governance Specialist',
        ],
    ];

    /**
     * Pharmaceutical industry-specific employee profiles.
     */
    private array $pharmaceuticalProfiles = [
        [
            'name' => 'Dr. Sari Kusuma',
            'position' => 'R&D Manager',
            'division' => 'Research & Development',
            'education_level' => 'doctoral',
            'field_of_study' => 'Farmasi',
            'certifications' => ['CPOB (Cara Pembuatan Obat yang Baik)', 'ISO 9001 Quality Management System'],
            'licenses' => ['STRA' => 'Surat Tanda Registrasi Apoteker'],
            'years_experience' => 15,
        ],
        [
            'name' => 'Apt. Budi Santoso',
            'position' => 'Senior Pharmacist',
            'division' => 'Manufacturing & Production',
            'education_level' => 'bachelor',
            'field_of_study' => 'Farmasi',
            'certifications' => ['CPOB (Cara Pembuatan Obat yang Baik)', 'HACCP (Hazard Analysis Critical Control Points)'],
            'licenses' => ['STRA' => 'Surat Tanda Registrasi Apoteker', 'SIPA' => 'Surat Izin Praktik Apoteker'],
            'years_experience' => 10,
        ],
        [
            'name' => 'Maya Permana',
            'position' => 'Quality Control Manager',
            'division' => 'Manufacturing & Production',
            'education_level' => 'master',
            'field_of_study' => 'Kimia Farmasi',
            'certifications' => ['ISO 9001 Quality Management System', 'Six Sigma Black Belt'],
            'licenses' => [],
            'years_experience' => 12,
        ],
        [
            'name' => 'Indra Wijaya',
            'position' => 'Commercial Manager',
            'division' => 'Commercial & Marketing',
            'education_level' => 'master',
            'field_of_study' => 'Manajemen',
            'certifications' => ['Project Management Professional (PMP)', 'Digital Marketing Certification'],
            'licenses' => [],
            'years_experience' => 8,
        ],
        [
            'name' => 'Apt. Fitri Rahayu',
            'position' => 'Pharmacy Manager',
            'division' => 'Retail & Healthcare Services',
            'education_level' => 'bachelor',
            'field_of_study' => 'Farmasi',
            'certifications' => ['CDOB (Cara Distribusi Obat yang Baik)'],
            'licenses' => ['STRA' => 'Surat Tanda Registrasi Apoteker', 'SIA' => 'Surat Izin Apotek'],
            'years_experience' => 7,
        ],
    ];

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->command->info('🏭 Seeding PT Kimia Farma Employee Master Data...');

        // First, ensure we have divisions and job positions
        $this->ensureDivisionsExist();
        $this->ensureJobPositionsExist();

        // Create pharmaceutical industry leaders
        $this->createPharmaceuticalLeaders();

        // Create regular employees across divisions
        $this->createDivisionEmployees();

        // Establish manager-subordinate relationships
        $this->establishManagerRelationships();

        $this->command->info('✅ Employee Master Data seeding completed successfully!');
    }

    /**
     * Ensure PT Kimia Farma divisions exist.
     */
    private function ensureDivisionsExist(): void
    {
        $this->command->info('📋 Ensuring PT Kimia Farma divisions exist...');

        foreach (array_keys($this->kimiaFarmaDivisions) as $divisionName) {
            Division::firstOrCreate(
                ['name' => $divisionName],
                [
                    'description' => "PT Kimia Farma {$divisionName} Division",
                    'head_division_id' => null,
                ]
            );
        }
    }

    /**
     * Ensure job positions exist for all divisions.
     */
    private function ensureJobPositionsExist(): void
    {
        $this->command->info('💼 Ensuring job positions exist...');

        foreach ($this->kimiaFarmaDivisions as $divisionName => $positions) {
            foreach ($positions as $positionName) {
                JobPosition::firstOrCreate(
                    ['name' => $positionName],
                    [
                        'description' => "Position in {$divisionName} division",
                    ]
                );
            }
        }
    }

    /**
     * Create pharmaceutical industry leaders with specific profiles.
     */
    private function createPharmaceuticalLeaders(): void
    {
        $this->command->info('👩‍💼 Creating pharmaceutical industry leaders...');

        foreach ($this->pharmaceuticalProfiles as $profile) {
            $division = Division::where('name', 'like', "%{$profile['division']}%")->first();
            $jobPosition = JobPosition::where('name', $profile['position'])->first();

            if (!$division || !$jobPosition) {
                $this->command->warn("⚠️  Skipping {$profile['name']} - Division or Position not found");
                continue;
            }

            $employee = Employee::factory()
                ->state([
                    'full_name' => $profile['name'],
                    'email' => strtolower(str_replace([' ', '.'], ['', ''], $profile['name'])) . '@kimiafarma.co.id',
                    'employment_status' => 'active',
                    'employment_type' => 'permanent',
                    'hire_date' => now()->subYears($profile['years_experience']),
                    'division_id' => $division->id,
                    'job_position_id' => $jobPosition->id,
                ])
                ->create();

            // Add education history
            EmployeeEducationHistory::factory()
                ->state([
                    'employee_id' => $employee->id,
                    'degree_level' => $profile['education_level'],
                    'field_of_study' => $profile['field_of_study'],
                    'is_verified' => true,
                ])
                ->create();

            // Add certifications
            foreach ($profile['certifications'] as $certName) {
                EmployeeCertification::factory()
                    ->state([
                        'employee_id' => $employee->id,
                        'certification_name' => $certName,
                        'is_active' => true,
                    ])
                    ->create();
            }

            // Add licenses
            foreach ($profile['licenses'] as $licenseKey => $licenseName) {
                EmployeeProfessionalLicense::factory()
                    ->state([
                        'employee_id' => $employee->id,
                        'license_name' => $licenseName,
                        'license_status' => 'active',
                    ])
                    ->create();
            }

            $this->command->info("  ✓ Created leader: {$profile['name']} ({$profile['position']})");
        }
    }

    /**
     * Create employees across all divisions.
     */
    private function createDivisionEmployees(): void
    {
        $this->command->info('👥 Creating employees across divisions...');

        foreach ($this->kimiaFarmaDivisions as $divisionName => $positions) {
            $division = Division::where('name', $divisionName)->first();

            if (!$division) {
                continue;
            }

            // Create 8-15 employees per division
            $employeeCount = rand(8, 15);
            $this->command->info("  📊 Creating {$employeeCount} employees in {$divisionName}...");

            for ($i = 0; $i < $employeeCount; $i++) {
                $position = $positions[array_rand($positions)];
                $jobPosition = JobPosition::where('name', $position)->first();

                if (!$jobPosition) {
                    continue;
                }

                // Create employee with appropriate employment status distribution
                $employee = Employee::factory()
                    ->state([
                        'division_id' => $division->id,
                        'job_position_id' => $jobPosition->id,
                        'employment_status' => $this->getWeightedEmploymentStatus(),
                        'employment_type' => $this->getWeightedEmploymentType($position),
                    ])
                    ->create();

                // Add education history (60% chance)
                if (rand(1, 100) <= 60) {
                    $this->createEducationHistory($employee, $position);
                }

                // Add certifications (40% chance)
                if (rand(1, 100) <= 40) {
                    $this->createCertifications($employee, $divisionName);
                }

                // Add professional licenses (30% chance for pharmaceutical positions)
                if ($this->isPharmaceuticalPosition($position) && rand(1, 100) <= 70) {
                    $this->createProfessionalLicenses($employee);
                }
            }

            $this->command->info("  ✓ Completed {$divisionName} division");
        }
    }

    /**
     * Get weighted employment status (more active employees).
     */
    private function getWeightedEmploymentStatus(): string
    {
        $weighted = [
            'active' => 75,
            'probation' => 10,
            'on_leave' => 8,
            'contract' => 5,
            'inactive' => 2,
        ];

        return $this->getWeightedRandomChoice($weighted);
    }

    /**
     * Get weighted employment type based on position.
     */
    private function getWeightedEmploymentType(string $position): string
    {
        // Managers and specialists are usually permanent
        if (strpos(strtolower($position), 'manager') !== false ||
            strpos(strtolower($position), 'specialist') !== false ||
            strpos(strtolower($position), 'analyst') !== false) {
            return 'permanent';
        }

        $weighted = [
            'permanent' => 70,
            'contract' => 25,
            'intern' => 5,
        ];

        return $this->getWeightedRandomChoice($weighted);
    }

    /**
     * Get weighted random choice from array.
     */
    private function getWeightedRandomChoice(array $weighted): string
    {
        $total = array_sum($weighted);
        $random = rand(1, $total);

        $sum = 0;
        foreach ($weighted as $choice => $weight) {
            $sum += $weight;
            if ($random <= $sum) {
                return $choice;
            }
        }

        return array_key_first($weighted);
    }

    /**
     * Create appropriate education history based on position.
     */
    private function createEducationHistory(Employee $employee, string $position): void
    {
        $isManagerial = strpos(strtolower($position), 'manager') !== false;
        $isPharmaceutical = $this->isPharmaceuticalPosition($position);

        if ($isManagerial) {
            // Managers typically have higher education
            EmployeeEducationHistory::factory()
                ->state([
                    'employee_id' => $employee->id,
                    'degree_level' => rand(1, 100) <= 60 ? 'master' : 'bachelor',
                    'field_of_study' => $isPharmaceutical ? 'Farmasi' : 'Manajemen',
                ])
                ->create();
        } elseif ($isPharmaceutical) {
            // Pharmaceutical positions require specific education
            EmployeeEducationHistory::factory()
                ->pharmaceutical()
                ->state(['employee_id' => $employee->id])
                ->create();
        } else {
            // General employees
            EmployeeEducationHistory::factory()
                ->state(['employee_id' => $employee->id])
                ->create();
        }
    }

    /**
     * Create appropriate certifications based on division.
     */
    private function createCertifications(Employee $employee, string $divisionName): void
    {
        $certCount = rand(1, 3);

        for ($i = 0; $i < $certCount; $i++) {
            if (strpos(strtolower($divisionName), 'manufacturing') !== false ||
                strpos(strtolower($divisionName), 'research') !== false) {
                EmployeeCertification::factory()
                    ->pharmaceutical()
                    ->state(['employee_id' => $employee->id])
                    ->create();
            } else {
                EmployeeCertification::factory()
                    ->state(['employee_id' => $employee->id])
                    ->create();
            }
        }
    }

    /**
     * Create professional licenses for pharmaceutical positions.
     */
    private function createProfessionalLicenses(Employee $employee): void
    {
        $licenseCount = rand(1, 2);

        for ($i = 0; $i < $licenseCount; $i++) {
            EmployeeProfessionalLicense::factory()
                ->pharmaceutical()
                ->state(['employee_id' => $employee->id])
                ->create();
        }
    }

    /**
     * Check if position is pharmaceutical-related.
     */
    private function isPharmaceuticalPosition(string $position): bool
    {
        $pharmaceuticalKeywords = [
            'pharmacist', 'pharmacy', 'qc', 'qa', 'quality', 'analyst',
            'formulation', 'regulatory', 'clinical', 'microbiologist'
        ];

        $positionLower = strtolower($position);

        foreach ($pharmaceuticalKeywords as $keyword) {
            if (strpos($positionLower, $keyword) !== false) {
                return true;
            }
        }

        return false;
    }

    /**
     * Establish manager-subordinate relationships.
     */
    private function establishManagerRelationships(): void
    {
        $this->command->info('👔 Establishing manager-subordinate relationships...');

        // Get all managers (positions with "Manager" in the name)
        $managers = Employee::join('job_positions', 'employees.job_position_id', '=', 'job_positions.id')
            ->where('job_positions.name', 'like', '%Manager%')
            ->where('employees.employment_status', 'active')
            ->select('employees.*')
            ->get();

        foreach ($managers as $manager) {
            // Find potential subordinates in the same division
            $subordinates = Employee::where('division_id', $manager->division_id)
                ->where('id', '!=', $manager->id)
                ->where('employment_status', 'active')
                ->whereNull('manager_id')
                ->join('job_positions', 'employees.job_position_id', '=', 'job_positions.id')
                ->where('job_positions.name', 'not like', '%Manager%')
                ->select('employees.*')
                ->take(rand(3, 8))
                ->get();

            // Assign manager to subordinates
            foreach ($subordinates as $subordinate) {
                $subordinate->update(['manager_id' => $manager->id]);
            }

            $count = $subordinates->count();
            $this->command->info("  ✓ {$manager->full_name} assigned {$count} subordinates");
        }
    }
}