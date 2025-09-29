<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

/**
 * User Factory
 *
 * Generates realistic user data for authentication testing.
 */
class UserFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     */
    protected $model = User::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),
            'birthdate' => $this->faker->dateTimeBetween('-65 years', '-18 years'),
            'phone' => $this->faker->phoneNumber(),
            'email' => $this->faker->unique()->safeEmail(),
            'ldap_username' => $this->faker->unique()->userName(),
            'avatar_path' => '',
            'division_id' => 0,
            'job_position_id' => 0,
            'team_lead_id' => 0,
            'head_division_id' => 0,
            'description' => '',
            'is_administrator' => false,
            'is_email_blacklisted' => false,
            'is_use_mfa' => false,
            'is_team_lead' => false,
            'is_active' => '1',
            'password' => Hash::make('password'),
        ];
    }

    /**
     * Indicate that the user is an administrator.
     */
    public function administrator(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_administrator' => true,
        ]);
    }

    /**
     * Indicate that the user uses MFA.
     */
    public function withMfa(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_use_mfa' => true,
        ]);
    }

    /**
     * Indicate that the user is a team lead.
     */
    public function teamLead(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_team_lead' => true,
        ]);
    }
}