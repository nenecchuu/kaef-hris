<?php

namespace Database\Seeders;

use App\Models\Division;
use App\Models\JobPosition;
use App\Models\Role;
use App\Models\User;
use Faker\Factory as Faker;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run()
    {
        $role = [];
        $role['superadmin'] = Role::where('title', 'SuperAdmin')->first('id');
        $role['supervisor'] = Role::where('title', 'Supervisor')->first('id');
        $role['user'] = Role::where('title', 'User')->first('id');

        if (app()->environment('local')) {
            $this->runLocal($role);
        } elseif (! app()->environment('production')) {
            $this->runStaging($role);
        }

        $user = User::create([
            'name' => 'Super Admin',
            'email' => 'admin@example.com',
            'ldap_username' => 'adminums',
            'is_administrator' => true,
            'is_superadmin' => true,
            'is_team_lead' => 1,
            'is_active' => true,
            'password' => 'password',
        ]);

        $user->roles()->sync([$role['superadmin']->id]);
    }

    public function runLocal($role)
    {
        $faker = Faker::create();

        foreach (range(1, 10) as $index) {
            $user = User::create([
                'name' => $faker->name(),
                'birthdate' => $faker->date(),
                'phone' => $faker->phoneNumber(),
                'email' => $faker->unique()->safeEmail(),
                'ldap_username' => $faker->userName(),
                'description' => $faker->text(),
                'is_team_lead' => $faker->boolean(),
                'job_position_id' => $faker->numberBetween(
                    1,
                    JobPosition::count()
                ),
                'head_division_id' => $faker->numberBetween(
                    1,
                    JobPosition::count()
                ),
                'division_id' => $faker->numberBetween(1, Division::count()),
                'is_active' => true,
                'password' => 'password',
            ]);

            // Assign role based on is_administrator flag for backward compatibility
            if ($user->is_administrator) {
                $user->roles()->sync([$role['superadmin']->id]);
            } else {
                // Randomly assign supervisor or user role for testing
                $randomRole = $faker->boolean() ? 'supervisor' : 'user';
                $user->roles()->sync([$role[$randomRole]->id]);
            }
        }
    }

    public function runStaging($role)
    {
        $jsonFile = database_path('seeders/data/user.json');
        $jsonData = file_get_contents($jsonFile);
        $datas = json_decode($jsonData, true);

        foreach ($datas as $data) {
            $user = User::create([
                'name' => $data['name'],
                'birthdate' => $data['birthdate'],
                'phone' => $data['phone'],
                'email' => $data['email'],
                'ldap_username' => $data['ldap_username'],
                'description' => $data['description'],
                'is_administrator' => $data['is_administrator'],
                'is_superadmin' => $data['is_superadmin'] ?? false,
                'is_email_blacklisted' => $data['is_email_blacklisted'],
                'job_position_id' => $data['job_position_id'],
                'head_division_id' => $data['head_division_id'],
                'division_id' => $data['division_id'],
                'team_lead_id' => $data['team_lead_id'] || 0,
                'is_team_lead' => $data['job_position_id'] === 2,
                'is_active' => true,
                'password' => 'password',
            ]);

            // Assign role based on role_type from JSON data
            $roleType = $data['role_type'] ?? 'user';
            $user->roles()->sync([$role[$roleType]->id]);
        }
    }
}
