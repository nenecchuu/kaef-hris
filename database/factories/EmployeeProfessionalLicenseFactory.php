<?php

namespace Database\Factories;

use App\Models\EmployeeProfessionalLicense;
use App\Models\Employee;
use Illuminate\Database\Eloquent\Factories\Factory;
use Carbon\Carbon;

/**
 * EmployeeProfessionalLicense Factory
 *
 * Generates realistic professional license data for employees
 * in pharmaceutical industry with Indonesian regulatory context.
 */
class EmployeeProfessionalLicenseFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     */
    protected $model = EmployeeProfessionalLicense::class;

    /**
     * Indonesian pharmaceutical professional licenses.
     */
    private array $pharmaceuticalLicenses = [
        'STRA' => 'Surat Tanda Registrasi Apoteker',
        'SIA' => 'Surat Izin Apotek',
        'SIPA' => 'Surat Izin Praktik Apoteker',
        'SIKTTK' => 'Surat Izin Kerja Tenaga Teknis Kefarmasian',
        'SIUP' => 'Surat Izin Usaha Perdagangan',
        'SITU' => 'Surat Izin Tempat Usaha',
        'TDP' => 'Tanda Daftar Perusahaan',
        'NPWP' => 'Nomor Pokok Wajib Pajak',
        'NIB' => 'Nomor Induk Berusaha',
        'Izin Edar' => 'Izin Edar Obat Tradisional',
        'CPOB' => 'Sertifikat CPOB (Cara Pembuatan Obat yang Baik)',
        'CDOB' => 'Sertifikat CDOB (Cara Distribusi Obat yang Baik)',
    ];

    /**
     * General professional licenses.
     */
    private array $generalLicenses = [
        'Certified Public Accountant',
        'Certified Internal Auditor',
        'Project Management Professional',
        'Certified Information Systems Auditor',
        'Risk Management Professional',
        'Quality Management System Lead Auditor',
        'Environmental Management System Lead Auditor',
        'Occupational Health and Safety Management System Lead Auditor',
        'Certified Supply Chain Professional',
        'Certified Logistics Professional',
    ];

    /**
     * Indonesian regulatory authorities.
     */
    private array $indonesianAuthorities = [
        'Badan Pengawas Obat dan Makanan (BPOM)',
        'Kementerian Kesehatan Republik Indonesia',
        'Ikatan Apoteker Indonesia (IAI)',
        'Majelis Tenaga Kesehatan Indonesia (MTKI)',
        'Kementerian Perindustrian RI',
        'Badan Koordinasi Penanaman Modal (BKPM)',
        'Direktorat Jenderal Pajak',
        'Kementerian Perdagangan RI',
        'Pemerintah Daerah DKI Jakarta',
        'Dinas Kesehatan Provinsi',
        'Dinas Perindustrian dan Perdagangan',
    ];

    /**
     * International certification bodies.
     */
    private array $internationalAuthorities = [
        'International Society for Pharmaceutical Engineering (ISPE)',
        'Pharmaceutical Research and Manufacturers of America (PhRMA)',
        'World Health Organization (WHO)',
        'International Conference on Harmonisation (ICH)',
        'Project Management Institute (PMI)',
        'Institute of Internal Auditors (IIA)',
        'American Society for Quality (ASQ)',
        'International Organization for Standardization (ISO)',
        'Supply Chain Management Professionals (SCMP)',
        'Council of Supply Chain Management Professionals (CSCMP)',
    ];

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        $licenseData = $this->getLicenseData();
        $issueDate = $this->faker->dateTimeBetween('-10 years', '-1 month');
        $expiryDate = $this->getExpiryDate($issueDate, $licenseData['license_name']);
        $status = $this->getLicenseStatus($expiryDate);

        return [
            'employee_id' => Employee::factory(),
            'license_name' => $licenseData['license_name'],
            'license_number' => $this->generateLicenseNumber($licenseData['license_name']),
            'issuing_authority' => $licenseData['issuing_authority'],
            'issue_date' => $issueDate,
            'expiry_date' => $expiryDate,
            'license_status' => $status,
        ];
    }

    /**
     * Get license data with matching authority.
     */
    private function getLicenseData(): array
    {
        $usePharmaceutical = $this->faker->boolean(70); // 70% pharmaceutical licenses

        if ($usePharmaceutical) {
            $licenseKey = $this->faker->randomElement(array_keys($this->pharmaceuticalLicenses));
            $licenseName = $this->pharmaceuticalLicenses[$licenseKey];

            return [
                'license_name' => $licenseName,
                'issuing_authority' => $this->getPharmaceuticalAuthority($licenseKey),
            ];
        } else {
            return [
                'license_name' => $this->faker->randomElement($this->generalLicenses),
                'issuing_authority' => $this->faker->randomElement($this->internationalAuthorities),
            ];
        }
    }

    /**
     * Get appropriate authority for pharmaceutical license.
     */
    private function getPharmaceuticalAuthority(string $licenseKey): string
    {
        $authorityMap = [
            'STRA' => 'Ikatan Apoteker Indonesia (IAI)',
            'SIA' => 'Dinas Kesehatan Provinsi',
            'SIPA' => 'Dinas Kesehatan Provinsi',
            'SIKTTK' => 'Kementerian Kesehatan Republik Indonesia',
            'SIUP' => 'Dinas Perindustrian dan Perdagangan',
            'SITU' => 'Pemerintah Daerah DKI Jakarta',
            'TDP' => 'Dinas Perindustrian dan Perdagangan',
            'NPWP' => 'Direktorat Jenderal Pajak',
            'NIB' => 'Badan Koordinasi Penanaman Modal (BKPM)',
            'Izin Edar' => 'Badan Pengawas Obat dan Makanan (BPOM)',
            'CPOB' => 'Badan Pengawas Obat dan Makanan (BPOM)',
            'CDOB' => 'Badan Pengawas Obat dan Makanan (BPOM)',
        ];

        return $authorityMap[$licenseKey] ?? $this->faker->randomElement($this->indonesianAuthorities);
    }

    /**
     * Generate realistic license number based on license type.
     */
    private function generateLicenseNumber(string $licenseName): string
    {
        if (strpos($licenseName, 'STRA') !== false) {
            return $this->faker->regexify('[0-9]{2}\.[0-9]{2}\.[0-9]{1}\.[0-9]{7}\.[0-9]{2}');
        }

        if (strpos($licenseName, 'SIPA') !== false || strpos($licenseName, 'SIA') !== false) {
            return $this->faker->regexify('[0-9]{3}/SIA/[0-9]{2}/[0-9]{4}');
        }

        if (strpos($licenseName, 'SIKTTK') !== false) {
            return $this->faker->regexify('SIKTTK/[0-9]{3}/[0-9]{2}/[0-9]{4}');
        }

        if (strpos($licenseName, 'NPWP') !== false) {
            return $this->faker->numerify('##.###.###.#-###.###');
        }

        if (strpos($licenseName, 'NIB') !== false) {
            return $this->faker->numerify('############');
        }

        if (strpos($licenseName, 'CPOB') !== false || strpos($licenseName, 'CDOB') !== false) {
            return $this->faker->regexify('C-[0-9]{4}-[0-9]{2}-[0-9]{6}');
        }

        // Default format for other licenses
        return $this->faker->bothify('???-####-****');
    }

    /**
     * Generate expiry date based on license type.
     */
    private function getExpiryDate(\DateTime $issueDate, string $licenseName): \DateTime
    {
        $licenseValidityPeriods = [
            'STRA' => 5, // 5 years
            'SIPA' => 5, // 5 years
            'SIA' => 5,  // 5 years
            'SIKTTK' => 5, // 5 years
            'CPOB' => 3, // 3 years
            'CDOB' => 3, // 3 years
            'SIUP' => 5, // 5 years
            'SITU' => 5, // 5 years
            'TDP' => 5,  // 5 years
            'NPWP' => 999, // Permanent (use large number)
        ];

        $defaultPeriod = 3; // Default 3 years

        foreach ($licenseValidityPeriods as $licenseType => $years) {
            if (strpos($licenseName, $licenseType) !== false) {
                $period = ($years === 999) ? $this->faker->numberBetween(10, 20) : $years;
                return (clone $issueDate)->modify("+{$period} years");
            }
        }

        // For general professional licenses
        $period = $this->faker->randomElement([2, 3, 4, 5]);
        return (clone $issueDate)->modify("+{$period} years");
    }

    /**
     * Determine license status based on expiry date.
     */
    private function getLicenseStatus(?\DateTime $expiryDate): string
    {
        if (!$expiryDate) {
            return 'active';
        }

        $now = new Carbon();
        $expiry = new Carbon($expiryDate);

        if ($expiry->isPast()) {
            return $this->faker->randomElement(['expired', 'expired', 'expired', 'suspended', 'revoked']);
        }

        if ($expiry->diffInDays($now) < 30) {
            return 'active'; // Soon to expire but still active
        }

        return $this->faker->randomElement(['active', 'active', 'active', 'active', 'suspended']);
    }

    /**
     * Factory state for pharmaceutical licenses.
     */
    public function pharmaceutical(): static
    {
        return $this->state(function (array $attributes) {
            $licenseKey = $this->faker->randomElement(array_keys($this->pharmaceuticalLicenses));
            $licenseName = $this->pharmaceuticalLicenses[$licenseKey];

            return [
                'license_name' => $licenseName,
                'license_number' => $this->generateLicenseNumber($licenseName),
                'issuing_authority' => $this->getPharmaceuticalAuthority($licenseKey),
                'license_status' => 'active',
            ];
        });
    }

    /**
     * Factory state for active licenses.
     */
    public function active(): static
    {
        return $this->state(fn (array $attributes) => [
            'license_status' => 'active',
        ]);
    }

    /**
     * Factory state for expired licenses.
     */
    public function expired(): static
    {
        return $this->state(function (array $attributes) {
            $issueDate = $this->faker->dateTimeBetween('-10 years', '-2 years');
            $expiryDate = (clone $issueDate)->modify('+3 years'); // Already expired

            return [
                'issue_date' => $issueDate,
                'expiry_date' => $expiryDate,
                'license_status' => 'expired',
            ];
        });
    }

    /**
     * Factory state for licenses expiring soon.
     */
    public function expiringSoon(): static
    {
        return $this->state(function (array $attributes) {
            $issueDate = $this->faker->dateTimeBetween('-5 years', '-1 year');
            $expiryDate = Carbon::now()->addDays($this->faker->numberBetween(1, 60));

            return [
                'issue_date' => $issueDate,
                'expiry_date' => $expiryDate,
                'license_status' => 'active',
            ];
        });
    }

    /**
     * Factory state for suspended licenses.
     */
    public function suspended(): static
    {
        return $this->state(fn (array $attributes) => [
            'license_status' => 'suspended',
        ]);
    }

    /**
     * Factory state for revoked licenses.
     */
    public function revoked(): static
    {
        return $this->state(fn (array $attributes) => [
            'license_status' => 'revoked',
        ]);
    }

    /**
     * Factory state for critical pharmaceutical licenses.
     */
    public function critical(): static
    {
        return $this->state(function (array $attributes) {
            $criticalLicenses = [
                'STRA' => 'Surat Tanda Registrasi Apoteker',
                'SIPA' => 'Surat Izin Praktik Apoteker',
                'CPOB' => 'Sertifikat CPOB (Cara Pembuatan Obat yang Baik)',
            ];

            $licenseKey = $this->faker->randomElement(array_keys($criticalLicenses));
            $licenseName = $criticalLicenses[$licenseKey];

            return [
                'license_name' => $licenseName,
                'license_number' => $this->generateLicenseNumber($licenseName),
                'issuing_authority' => $this->getPharmaceuticalAuthority($licenseKey),
                'license_status' => 'active',
            ];
        });
    }

    /**
     * Factory state for recent licenses.
     */
    public function recent(): static
    {
        return $this->state(function (array $attributes) {
            $issueDate = $this->faker->dateTimeBetween('-1 year', 'now');
            $expiryDate = (clone $issueDate)->modify('+5 years');

            return [
                'issue_date' => $issueDate,
                'expiry_date' => $expiryDate,
                'license_status' => 'active',
            ];
        });
    }
}