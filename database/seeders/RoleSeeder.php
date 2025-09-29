<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    public function run()
    {
        $roles = [
            [
                'title' => 'SuperAdmin',
                'is_default' => true,
            ],
            [
                'title' => 'Supervisor',
                'is_default' => false,
            ],
            [
                'title' => 'User',
                'is_default' => false,
            ],
        ];

        Role::insert($roles);
    }
}
