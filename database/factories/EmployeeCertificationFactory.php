<?php

namespace Database\Factories;

use App\Models\EmployeeCertification;
use App\Models\Employee;
use Illuminate\Database\Eloquent\Factories\Factory;
use Carbon\Carbon;

/**
 * EmployeeCertification Factory
 *
 * Generates realistic certification data for employees
 * in pharmaceutical industry context.
 */
class EmployeeCertificationFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     */
    protected $model = EmployeeCertification::class;

    /**
     * Pharmaceutical industry certifications.
     */
    private array $pharmaceuticalCertifications = [
        'CPOB (Cara Pembuatan Obat yang Baik)',
        'CDOB (Cara Distribusi Obat yang Baik)',
        'GMP (Good Manufacturing Practice)',
        'GDP (Good Distribution Practice)',
        'HACCP (Hazard Analysis Critical Control Points)',
        'ISO 9001 Quality Management System',
        'ISO 14001 Environmental Management System',
        'ISO 45001 Occupational Health and Safety',
        'Sertifikat Pelatihan Farmasi Industri',
        'Sertifikat Quality Control Farmasi',
        'Sertifikat Regulatory Affairs',
        'Pelatihan Farmakovigilans',
        'Sertifikat Validasi dan Kualifikasi',
        'Pelatihan Mikrobiologi Farmasi',
        'Sertifikat R&D Formulasi',
    ];

    /**
     * General professional certifications.
     */
    private array $generalCertifications = [
        'Microsoft Office Specialist',
        'Project Management Professional (PMP)',
        'Certified Public Accountant (CPA)',
        'Six Sigma Green Belt',
        'Six Sigma Black Belt',
        'Lean Manufacturing',
        'SAP Certification',
        'Oracle Database Certification',
        'ITIL Foundation',
        'Certified Internal Auditor (CIA)',
        'Risk Management Certification',
        'Leadership Development Program',
        'Digital Marketing Certification',
        'Data Analytics Certificate',
        'Business Analysis Certificate',
    ];

    /**
     * Language certifications.
     */
    private array $languageCertifications = [
        'TOEFL (Test of English as Foreign Language)',
        'IELTS (International English Language Testing System)',
        'TOEIC (Test of English for International Communication)',
        'HSK (Hanyu Shuiping Kaoshi) - Chinese',
        'JLPT (Japanese Language Proficiency Test)',
        'DELF (Diplôme d\'Études en Langue Française)',
        'Goethe-Zertifikat Deutsch',
        'Business English Certificate',
    ];

    /**
     * Issuing organizations for pharmaceutical certifications.
     */
    private array $pharmaceuticalOrganizations = [
        'Badan Pengawas Obat dan Makanan (BPOM)',
        'Kementerian Kesehatan RI',
        'Ikatan Apoteker Indonesia (IAI)',
        'Gabungan Perusahaan Farmasi Indonesia (GP Farmasi)',
        'International Society for Pharmaceutical Engineering (ISPE)',
        'Pharmaceutical Research and Manufacturers of America (PhRMA)',
        'Indonesian Pharmaceutical Association',
        'PT Kimia Farma Training Center',
        'Institut Sains dan Teknologi Farmasi',
        'Universitas Indonesia - Fakultas Farmasi',
    ];

    /**
     * General issuing organizations.
     */
    private array $generalOrganizations = [
        'Project Management Institute',
        'Microsoft Corporation',
        'Oracle Corporation',
        'SAP SE',
        'Cisco Systems',
        'CompTIA',
        'International Institute of Business Analysis',
        'Lean Six Sigma Institute',
        'Indonesian Institute of Accountants',
        'Risk Management Society',
        'Google',
        'Amazon Web Services',
        'Coursera',
        'LinkedIn Learning',
    ];

    /**
     * Indonesian cities for certification locations.
     */
    private array $indonesianCities = [
        'Jakarta', 'Bandung', 'Surabaya', 'Semarang', 'Yogyakarta',
        'Medan', 'Makassar', 'Bali', 'Batam', 'Bogor'
    ];

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        $certificationData = $this->getCertificationData();
        $issueDate = $this->faker->dateTimeBetween('-5 years', 'now');
        $expiryDate = $this->getExpiryDate($issueDate, $certificationData['certification_name']);

        return [
            'employee_id' => Employee::factory(),
            'certification_name' => $certificationData['certification_name'],
            'issuing_organization' => $certificationData['issuing_organization'],
            'issue_date' => $issueDate,
            'expiry_date' => $expiryDate,
            'certification_number' => $this->generateCertificationNumber(),
            'is_active' => $this->faker->boolean(85), // 85% active
            'location' => $this->faker->randomElement($this->indonesianCities),
        ];
    }

    /**
     * Get certification data with matching organization.
     */
    private function getCertificationData(): array
    {
        $type = $this->faker->randomElement(['pharmaceutical', 'general', 'language']);

        switch ($type) {
            case 'pharmaceutical':
                return [
                    'certification_name' => $this->faker->randomElement($this->pharmaceuticalCertifications),
                    'issuing_organization' => $this->faker->randomElement($this->pharmaceuticalOrganizations),
                ];

            case 'language':
                return [
                    'certification_name' => $this->faker->randomElement($this->languageCertifications),
                    'issuing_organization' => $this->getLanguageOrganization(),
                ];

            default: // general
                return [
                    'certification_name' => $this->faker->randomElement($this->generalCertifications),
                    'issuing_organization' => $this->faker->randomElement($this->generalOrganizations),
                ];
        }
    }

    /**
     * Get appropriate organization for language certification.
     */
    private function getLanguageOrganization(): string
    {
        $organizations = [
            'Educational Testing Service (ETS)',
            'British Council',
            'Cambridge English Assessment',
            'Hanban/Confucius Institute',
            'Japan Foundation',
            'Alliance Française',
            'Goethe Institut',
            'TOEIC Committee',
        ];

        return $this->faker->randomElement($organizations);
    }

    /**
     * Generate realistic certification number.
     */
    private function generateCertificationNumber(): string
    {
        $formats = [
            $this->faker->bothify('CERT-####-****'),
            $this->faker->numerify('###########'),
            $this->faker->bothify('??########'),
            $this->faker->regexify('[A-Z]{2}[0-9]{6}[A-Z]{2}'),
            $this->faker->bothify('****-***-####'),
        ];

        return $this->faker->randomElement($formats);
    }

    /**
     * Generate expiry date based on certification type.
     */
    private function getExpiryDate(\DateTime $issueDate, string $certificationName): ?\DateTime
    {
        // Some certifications don't expire
        $noExpiryKeywords = ['Microsoft Office', 'Degree', 'Certificate', 'TOEFL', 'IELTS'];

        foreach ($noExpiryKeywords as $keyword) {
            if (strpos($certificationName, $keyword) !== false) {
                if ($this->faker->boolean(30)) { // 30% chance of no expiry
                    return null;
                }
            }
        }

        // Pharmaceutical certifications typically expire in 1-3 years
        if (strpos($certificationName, 'CPOB') !== false ||
            strpos($certificationName, 'CDOB') !== false ||
            strpos($certificationName, 'GMP') !== false ||
            strpos($certificationName, 'HACCP') !== false) {
            $yearsValid = $this->faker->numberBetween(1, 3);
        } else {
            // General certifications 2-5 years
            $yearsValid = $this->faker->numberBetween(2, 5);
        }

        return (clone $issueDate)->modify("+{$yearsValid} years");
    }

    /**
     * Factory state for pharmaceutical certifications.
     */
    public function pharmaceutical(): static
    {
        return $this->state(function (array $attributes) {
            $certName = $this->faker->randomElement($this->pharmaceuticalCertifications);
            $organization = $this->faker->randomElement($this->pharmaceuticalOrganizations);

            return [
                'certification_name' => $certName,
                'issuing_organization' => $organization,
                'is_active' => true,
            ];
        });
    }

    /**
     * Factory state for active certifications.
     */
    public function active(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_active' => true,
        ]);
    }

    /**
     * Factory state for inactive certifications.
     */
    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_active' => false,
        ]);
    }

    /**
     * Factory state for expired certifications.
     */
    public function expired(): static
    {
        return $this->state(function (array $attributes) {
            $issueDate = $this->faker->dateTimeBetween('-10 years', '-2 years');
            $expiryDate = (clone $issueDate)->modify('+2 years');

            return [
                'issue_date' => $issueDate,
                'expiry_date' => $expiryDate,
                'is_active' => false,
            ];
        });
    }

    /**
     * Factory state for certifications expiring soon.
     */
    public function expiringSoon(): static
    {
        return $this->state(function (array $attributes) {
            $issueDate = $this->faker->dateTimeBetween('-3 years', '-1 year');
            $expiryDate = Carbon::now()->addDays($this->faker->numberBetween(1, 30));

            return [
                'issue_date' => $issueDate,
                'expiry_date' => $expiryDate,
                'is_active' => true,
            ];
        });
    }

    /**
     * Factory state for language certifications.
     */
    public function language(): static
    {
        return $this->state(function (array $attributes) {
            $certName = $this->faker->randomElement($this->languageCertifications);
            $organization = $this->getLanguageOrganization();

            return [
                'certification_name' => $certName,
                'issuing_organization' => $organization,
                'expiry_date' => $this->faker->boolean(40) ? null : (new Carbon($attributes['issue_date']))->addYears(2),
            ];
        });
    }

    /**
     * Factory state for recent certifications.
     */
    public function recent(): static
    {
        return $this->state(function (array $attributes) {
            $issueDate = $this->faker->dateTimeBetween('-1 year', 'now');
            $expiryDate = (clone $issueDate)->modify('+3 years');

            return [
                'issue_date' => $issueDate,
                'expiry_date' => $expiryDate,
                'is_active' => true,
            ];
        });
    }
}