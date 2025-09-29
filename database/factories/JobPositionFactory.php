<?php

namespace Database\Factories;

use App\Models\JobPosition;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * JobPosition Factory
 *
 * Generates realistic job position data for PT Kimia Farma organizational structure.
 */
class JobPositionFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     */
    protected $model = JobPosition::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        $positions = [
            // Management
            'General Manager',
            'Division Manager',
            'Department Manager',
            'Section Manager',
            'Team Lead',

            // Manufacturing & Production
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

            // Research & Development
            'R&D Manager',
            'Senior Pharmacist',
            'Formulation Scientist',
            'Analytical Chemist',
            'Microbiologist',
            'Clinical Research Associate',
            'Regulatory Affairs Specialist',
            'Product Development Specialist',

            // Commercial & Marketing
            'Commercial Manager',
            'Marketing Manager',
            'Sales Manager',
            'Brand Manager',
            'Medical Representative',
            'Key Account Manager',
            'Digital Marketing Specialist',
            'Market Research Analyst',

            // Support Functions
            'HR Manager',
            'Finance Manager',
            'IT Manager',
            'Legal Manager',
            'Compliance Officer',
            'Business Analyst',
            'Administrative Assistant',
            'Executive Assistant',
        ];

        $name = $this->faker->randomElement($positions);

        return [
            'name' => $name,
            'description' => "Position responsibilities for {$name} role in PT Kimia Farma pharmaceutical operations.",
        ];
    }

    /**
     * Factory state for managerial positions.
     */
    public function managerial(): static
    {
        return $this->state(function (array $attributes) {
            $managerialPositions = [
                'General Manager',
                'Division Manager',
                'Department Manager',
                'Section Manager',
                'Production Manager',
                'Quality Control Manager',
                'R&D Manager',
                'Commercial Manager',
                'HR Manager',
                'Finance Manager',
                'IT Manager',
            ];

            return [
                'name' => $this->faker->randomElement($managerialPositions),
            ];
        });
    }

    /**
     * Factory state for pharmaceutical positions.
     */
    public function pharmaceutical(): static
    {
        return $this->state(function (array $attributes) {
            $pharmaPositions = [
                'Senior Pharmacist',
                'Formulation Scientist',
                'Analytical Chemist',
                'Microbiologist',
                'QC Analyst',
                'QA Analyst',
                'Regulatory Affairs Specialist',
                'Clinical Research Associate',
            ];

            return [
                'name' => $this->faker->randomElement($pharmaPositions),
            ];
        });
    }

    /**
     * Factory state for entry-level positions.
     */
    public function entryLevel(): static
    {
        return $this->state(function (array $attributes) {
            $entryLevelPositions = [
                'Production Operator',
                'QC Analyst',
                'Administrative Assistant',
                'Medical Representative',
                'Business Analyst',
                'Marketing Specialist',
            ];

            return [
                'name' => $this->faker->randomElement($entryLevelPositions),
            ];
        });
    }
}