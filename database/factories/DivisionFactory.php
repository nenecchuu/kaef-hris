<?php

namespace Database\Factories;

use App\Models\Division;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * Division Factory
 *
 * Generates realistic division data for PT Kimia Farma organizational structure.
 */
class DivisionFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     */
    protected $model = Division::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        $divisionNames = [
            'Manufacturing & Production',
            'Research & Development',
            'Commercial & Marketing',
            'Retail & Healthcare Services',
            'Supply Chain & Distribution',
            'Finance & Accounting',
            'Human Resources',
            'Information Technology',
            'Legal & Compliance',
            'Quality Assurance',
            'Regulatory Affairs',
            'Business Development',
        ];

        $name = $this->faker->randomElement($divisionNames);

        return [
            'name' => $name,
            'description' => "PT Kimia Farma {$name} Division - " . $this->faker->sentence(),
            'head_division_id' => null,
        ];
    }

    /**
     * Factory state for parent divisions.
     */
    public function parent(): static
    {
        return $this->state(fn (array $attributes) => [
            'head_division_id' => null,
        ]);
    }

    /**
     * Factory state for child divisions.
     */
    public function child(): static
    {
        return $this->state(fn (array $attributes) => [
            'head_division_id' => Division::factory(),
        ]);
    }
}