<?php

namespace Database\Factories;

use App\Models\Employee;
use App\Models\User;
use App\Models\Division;
use App\Models\JobPosition;
use Illuminate\Database\Eloquent\Factories\Factory;
use Carbon\Carbon;

/**
 * Employee Factory
 *
 * Generates realistic employee test data with Indonesian context
 * for PT Kimia Farma organizational structure.
 */
class EmployeeFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     */
    protected $model = Employee::class;

    /**
     * Indonesian first names for realistic test data.
     */
    private array $indonesianFirstNames = [
        'Andi', 'Budi', 'Citra', 'Dewi', 'Eka', 'Fitri', 'Gita', 'Hadi',
        'Indra', 'Joko', 'Kartika', 'Lestari', 'Maya', 'Nuri', 'Omar', 'Putri',
        'Qori', 'Ratna', 'Sari', 'Tari', 'Umar', 'Vina', 'Wulan', 'Yanti', 'Zaki'
    ];

    /**
     * Indonesian family names for realistic test data.
     */
    private array $indonesianFamilyNames = [
        'Prasetyo', 'Setiawan', 'Wijaya', 'Kusuma', 'Santoso', 'Hidayat',
        'Suharto', 'Rahayu', 'Permana', 'Nugroho', 'Hartono', 'Suryanto',
        'Wibowo', 'Kurniawan', 'Utomo', 'Purnomo', 'Wahyudi', 'Susanto'
    ];

    /**
     * Indonesian cities for location data.
     */
    private array $indonesianCities = [
        'Jakarta', 'Surabaya', 'Bandung', 'Medan', 'Semarang', 'Makassar',
        'Palembang', 'Tangerang', 'Depok', 'Bekasi', 'Bogor', 'Batam',
        'Yogyakarta', 'Malang', 'Solo', 'Denpasar', 'Balikpapan', 'Pontianak'
    ];

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        $firstName = $this->faker->randomElement($this->indonesianFirstNames);
        $lastName = $this->faker->randomElement($this->indonesianFamilyNames);
        $fullName = $firstName . ' ' . $lastName;

        $hireDate = $this->faker->dateTimeBetween('-10 years', 'now');
        $birthDate = $this->faker->dateTimeBetween('-65 years', '-18 years');

        // Generate Indonesian-style NIK (16 digits)
        $nationalId = $this->generateIndonesianNIK();

        // Generate NPWP (15 digits with dots)
        $taxId = $this->faker->boolean(70) ? $this->generateNPWP() : null;

        return [
            'employee_number' => 'EMP' . str_pad($this->faker->unique()->numberBetween(1, 99999), 5, '0', STR_PAD_LEFT),
            'full_name' => $fullName,
            'preferred_name' => $this->faker->boolean(30) ? $firstName : null,
            'birth_date' => $birthDate,
            'national_id' => $nationalId,
            'tax_id' => $taxId,
            'email' => strtolower(str_replace(' ', '.', $fullName)) . '@kimiafarma.co.id',
            'phone' => $this->generateIndonesianPhone(),
            'emergency_contact_name' => $this->faker->randomElement($this->indonesianFirstNames) . ' ' . $this->faker->randomElement($this->indonesianFamilyNames),
            'emergency_contact_phone' => $this->generateIndonesianPhone(),
            'address' => $this->generateIndonesianAddress(),
            'employment_status' => $this->faker->randomElement(['active', 'active', 'active', 'active', 'active', 'on_leave', 'probation']), // Weighted toward active
            'employment_type' => $this->faker->randomElement(['permanent', 'permanent', 'permanent', 'contract', 'intern']), // Weighted toward permanent
            'hire_date' => $hireDate,
            'termination_date' => null, // Most employees are still active
            'photo_url' => $this->faker->boolean(60) ? 'storage/photos/employees/' . $this->faker->uuid() . '.jpg' : null,
            'user_id' => null, // Will be set in states if needed
            'division_id' => 1, // Default to ID 1, can be overridden in tests
            'job_position_id' => 1, // Default to ID 1, can be overridden in tests
            'manager_id' => null, // Will be set in post-creation callbacks
        ];
    }

    /**
     * Generate realistic Indonesian NIK (Nomor Induk Kependudukan).
     */
    private function generateIndonesianNIK(): string
    {
        // NIK format: PPKKSSDDMMYYGGGZ
        // PP = Province code (Jakarta = 31, Jawa Barat = 32, etc.)
        $provinceCode = $this->faker->randomElement(['31', '32', '33', '34', '35', '36']);

        // KK = Regency/City code
        $regencyCode = str_pad($this->faker->numberBetween(1, 99), 2, '0', STR_PAD_LEFT);

        // SS = Sub-district code
        $subdistrictCode = str_pad($this->faker->numberBetween(1, 99), 2, '0', STR_PAD_LEFT);

        // DDMMYY = Birth date
        $birthDate = $this->faker->dateTimeBetween('-65 years', '-18 years');
        $day = $birthDate->format('d');
        // Add 40 to day for female (Indonesian NIK convention)
        if ($this->faker->boolean(50)) { // 50% chance for female
            $day = str_pad((int)$day + 40, 2, '0', STR_PAD_LEFT);
        }
        $dateCode = $day . $birthDate->format('my');

        // GGG = Sequential number
        $sequential = str_pad($this->faker->numberBetween(1, 999), 3, '0', STR_PAD_LEFT);

        return $provinceCode . $regencyCode . $subdistrictCode . $dateCode . $sequential;
    }

    /**
     * Generate realistic Indonesian NPWP.
     */
    private function generateNPWP(): string
    {
        return $this->faker->numerify('##.###.###.#-###.###');
    }

    /**
     * Generate realistic Indonesian phone number.
     */
    private function generateIndonesianPhone(): string
    {
        $prefixes = ['0811', '0812', '0813', '0821', '0822', '0823', '0851', '0852', '0853'];
        $prefix = $this->faker->randomElement($prefixes);
        $suffix = $this->faker->numerify('########');

        return $prefix . $suffix;
    }

    /**
     * Generate realistic Indonesian address.
     */
    private function generateIndonesianAddress(): string
    {
        $street = 'Jl. ' . $this->faker->streetName();
        $number = 'No. ' . $this->faker->buildingNumber();
        $city = $this->faker->randomElement($this->indonesianCities);
        $postalCode = $this->faker->numerify('#####');

        return "{$street} {$number}, {$city} {$postalCode}";
    }

    /**
     * Factory state for active employees.
     */
    public function active(): static
    {
        return $this->state(fn (array $attributes) => [
            'employment_status' => 'active',
        ]);
    }

    /**
     * Factory state for employees on probation.
     */
    public function probation(): static
    {
        return $this->state(fn (array $attributes) => [
            'employment_status' => 'probation',
            'hire_date' => $this->faker->dateTimeBetween('-6 months', 'now'),
        ]);
    }

    /**
     * Factory state for contract employees.
     */
    public function contract(): static
    {
        return $this->state(fn (array $attributes) => [
            'employment_type' => 'contract',
            'employment_status' => 'active',
        ]);
    }

    /**
     * Factory state for employees with system access.
     */
    public function withSystemAccess(): static
    {
        return $this->state(fn (array $attributes) => [
            'user_id' => User::factory()->create()->id,
        ]);
    }

    /**
     * Factory state for terminated employees.
     */
    public function terminated(): static
    {
        return $this->state(function (array $attributes) {
            $terminationDate = $this->faker->dateTimeBetween($attributes['hire_date'], 'now');

            return [
                'employment_status' => 'terminated',
                'termination_date' => $terminationDate,
            ];
        });
    }

    /**
     * Factory state for senior employees (hired more than 5 years ago).
     */
    public function senior(): static
    {
        return $this->state(fn (array $attributes) => [
            'hire_date' => $this->faker->dateTimeBetween('-15 years', '-5 years'),
        ]);
    }

    /**
     * Factory state for new employees (hired within last year).
     */
    public function newEmployee(): static
    {
        return $this->state(fn (array $attributes) => [
            'hire_date' => $this->faker->dateTimeBetween('-1 year', 'now'),
            'employment_status' => $this->faker->randomElement(['active', 'probation']),
        ]);
    }

    /**
     * Factory state for managers.
     */
    public function manager(): static
    {
        return $this->state(fn (array $attributes) => [
            'employment_status' => 'active',
            'employment_type' => 'permanent',
        ]);
    }

    /**
     * Configure the model factory.
     */
    public function configure(): static
    {
        return $this->afterCreating(function (Employee $employee) {
            // Sync email with employee number if no specific email was set
            if (strpos($employee->email, 'EMP') === false) {
                $employee->update([
                    'email' => strtolower(str_replace(' ', '.', $employee->full_name)) . '@kimiafarma.co.id',
                ]);
            }
        });
    }
}