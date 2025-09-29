<?php

namespace Database\Factories;

use App\Models\EmployeeEducationHistory;
use App\Models\Employee;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * EmployeeEducationHistory Factory
 *
 * Generates realistic education history data for Indonesian employees
 * in pharmaceutical industry context.
 */
class EmployeeEducationHistoryFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     */
    protected $model = EmployeeEducationHistory::class;

    /**
     * Indonesian educational institutions.
     */
    private array $indonesianInstitutions = [
        // Universities
        'Universitas Indonesia',
        'Universitas Gadjah Mada',
        'Institut Teknologi Bandung',
        'Universitas Airlangga',
        'Universitas Padjadjaran',
        'Universitas Diponegoro',
        'Universitas Brawijaya',
        'Universitas Hasanuddin',
        'Institut Pertanian Bogor',
        'Universitas Sebelas Maret',

        // Pharmaceutical/Health Universities
        'Sekolah Tinggi Ilmu Farmasi Riau',
        'Universitas Pancasila - Fakultas Farmasi',
        'Universitas 17 Agustus 1945 Jakarta',
        'Sekolah Tinggi Farmasi Indonesia',

        // Diploma Institutions
        'Politeknik Negeri Jakarta',
        'Politeknik Negeri Bandung',
        'Politeknik Kesehatan Kementerian Kesehatan',
        'Akademi Farmasi Surabaya',
        'Akademi Analisis Farmasi dan Makanan',

        // High Schools
        'SMA Negeri 1 Jakarta',
        'SMA Negeri 3 Bandung',
        'SMA Negeri 5 Surabaya',
        'SMK Farmasi Bhakti Kencana',
        'SMK Kesehatan Bakti Indonesia',
    ];

    /**
     * Fields of study relevant to pharmaceutical industry.
     */
    private array $pharmaceuticalFields = [
        'Farmasi',
        'Farmasi Klinis',
        'Farmasi Industri',
        'Kimia Farmasi',
        'Biologi Farmasi',
        'Farmakologi',
        'Teknologi Farmasi',
        'Kimia',
        'Biologi',
        'Mikrobiologi',
        'Biokimia',
        'Teknik Kimia',
        'Manajemen',
        'Akuntansi',
        'Sistem Informasi',
        'Teknik Industri',
        'Kesehatan Masyarakat',
        'Ilmu Gizi',
    ];

    /**
     * General fields of study.
     */
    private array $generalFields = [
        'Ekonomi',
        'Manajemen',
        'Akuntansi',
        'Hukum',
        'Psikologi',
        'Komunikasi',
        'Sastra Indonesia',
        'Sastra Inggris',
        'Pendidikan',
        'Sosiologi',
        'Ilmu Komputer',
        'Teknik Informatika',
        'IPA',
        'IPS',
        'Bahasa',
    ];

    /**
     * Indonesian cities for institution locations.
     */
    private array $indonesianCities = [
        'Jakarta', 'Bandung', 'Surabaya', 'Yogyakarta', 'Semarang',
        'Medan', 'Makassar', 'Denpasar', 'Malang', 'Solo',
        'Bogor', 'Depok', 'Tangerang', 'Bekasi', 'Palembang'
    ];

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        $degreeLevel = $this->faker->randomElement([
            'senior_high', 'senior_high', 'senior_high', // More common
            'diploma_3', 'diploma_3', 'bachelor', 'bachelor', // Common in pharmaceutical
            'master', 'diploma_4' // Less common
        ]);

        $institution = $this->getInstitutionByDegreeLevel($degreeLevel);
        $fieldOfStudy = $this->getFieldOfStudyByDegreeLevel($degreeLevel);
        $graduationYear = $this->getGraduationYearByDegreeLevel($degreeLevel);

        return [
            'employee_id' => Employee::factory(),
            'institution_name' => $institution,
            'degree_level' => $degreeLevel,
            'field_of_study' => $fieldOfStudy,
            'graduation_year' => $graduationYear,
            'gpa' => $this->getGPAByDegreeLevel($degreeLevel),
            'is_verified' => $this->faker->boolean(80), // 80% are verified
            'location' => $this->faker->randomElement($this->indonesianCities),
        ];
    }

    /**
     * Get appropriate institution based on degree level.
     */
    private function getInstitutionByDegreeLevel(string $degreeLevel): string
    {
        switch ($degreeLevel) {
            case 'senior_high':
                return $this->faker->randomElement([
                    'SMA Negeri 1 Jakarta',
                    'SMA Negeri 3 Bandung',
                    'SMA Negeri 5 Surabaya',
                    'SMK Farmasi Bhakti Kencana',
                    'SMK Kesehatan Bakti Indonesia',
                    'SMA Negeri 2 Medan',
                    'SMK Kimia Industri Theresiana',
                ]);

            case 'diploma_1':
            case 'diploma_2':
            case 'diploma_3':
            case 'diploma_4':
                return $this->faker->randomElement([
                    'Politeknik Negeri Jakarta',
                    'Politeknik Negeri Bandung',
                    'Politeknik Kesehatan Kementerian Kesehatan',
                    'Akademi Farmasi Surabaya',
                    'Akademi Analisis Farmasi dan Makanan',
                    'Politeknik Caltex Riau',
                    'Politeknik Manufaktur Negeri Bandung',
                ]);

            default: // bachelor, master, doctoral
                return $this->faker->randomElement($this->indonesianInstitutions);
        }
    }

    /**
     * Get appropriate field of study based on degree level.
     */
    private function getFieldOfStudyByDegreeLevel(string $degreeLevel): ?string
    {
        if ($degreeLevel === 'senior_high') {
            return $this->faker->randomElement(['IPA', 'IPS', 'Bahasa', null]);
        }

        // For higher education, use pharmaceutical fields more often
        if (in_array($degreeLevel, ['bachelor', 'master', 'doctoral', 'diploma_3', 'diploma_4'])) {
            return $this->faker->boolean(70) ?
                $this->faker->randomElement($this->pharmaceuticalFields) :
                $this->faker->randomElement($this->generalFields);
        }

        return $this->faker->randomElement($this->generalFields);
    }

    /**
     * Get appropriate graduation year based on degree level.
     */
    private function getGraduationYearByDegreeLevel(string $degreeLevel): ?int
    {
        $baseYear = $this->faker->numberBetween(1995, 2023);

        switch ($degreeLevel) {
            case 'senior_high':
                return $this->faker->numberBetween(1990, 2020);
            case 'diploma_1':
            case 'diploma_2':
            case 'diploma_3':
                return $this->faker->numberBetween(1995, 2022);
            case 'bachelor':
                return $this->faker->numberBetween(1998, 2023);
            case 'master':
                return $this->faker->numberBetween(2005, 2024);
            case 'doctoral':
                return $this->faker->numberBetween(2010, 2024);
            default:
                return $baseYear;
        }
    }

    /**
     * Get appropriate GPA based on degree level.
     */
    private function getGPAByDegreeLevel(string $degreeLevel): ?float
    {
        if ($degreeLevel === 'senior_high') {
            return null; // High schools don't typically use GPA system in Indonesia
        }

        // Generate realistic GPA (Indonesian 4.0 scale)
        return $this->faker->randomFloat(2, 2.50, 4.00);
    }

    /**
     * Factory state for pharmaceutical education.
     */
    public function pharmaceutical(): static
    {
        return $this->state(fn (array $attributes) => [
            'field_of_study' => $this->faker->randomElement($this->pharmaceuticalFields),
            'degree_level' => $this->faker->randomElement(['bachelor', 'master', 'diploma_3', 'diploma_4']),
        ]);
    }

    /**
     * Factory state for high school education.
     */
    public function highSchool(): static
    {
        return $this->state(fn (array $attributes) => [
            'degree_level' => 'senior_high',
            'field_of_study' => $this->faker->randomElement(['IPA', 'IPS', 'Bahasa']),
            'gpa' => null,
            'graduation_year' => $this->faker->numberBetween(1990, 2020),
        ]);
    }

    /**
     * Factory state for bachelor's degree.
     */
    public function bachelor(): static
    {
        return $this->state(fn (array $attributes) => [
            'degree_level' => 'bachelor',
            'gpa' => $this->faker->randomFloat(2, 2.75, 4.00),
            'graduation_year' => $this->faker->numberBetween(1998, 2023),
        ]);
    }

    /**
     * Factory state for master's degree.
     */
    public function master(): static
    {
        return $this->state(fn (array $attributes) => [
            'degree_level' => 'master',
            'field_of_study' => $this->faker->randomElement($this->pharmaceuticalFields),
            'gpa' => $this->faker->randomFloat(2, 3.00, 4.00),
            'graduation_year' => $this->faker->numberBetween(2005, 2024),
        ]);
    }

    /**
     * Factory state for diploma education.
     */
    public function diploma(): static
    {
        return $this->state(fn (array $attributes) => [
            'degree_level' => $this->faker->randomElement(['diploma_3', 'diploma_4']),
            'field_of_study' => $this->faker->randomElement($this->pharmaceuticalFields),
            'gpa' => $this->faker->randomFloat(2, 2.50, 4.00),
        ]);
    }

    /**
     * Factory state for verified education.
     */
    public function verified(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_verified' => true,
        ]);
    }

    /**
     * Factory state for unverified education.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_verified' => false,
        ]);
    }
}