<?php

namespace Database\Seeders;

use App\Models\JobPosition;
use Faker\Factory as Faker;
use Illuminate\Database\Seeder;

class JobPositionSeeder extends Seeder
{
    public function run()
    {
        if (app()->environment('local')) {
            $this->runLocal();
        } elseif (! app()->environment('production')) {
            $this->runStaging();
        }
    }

    public function runLocal()
    {
        $faker = Faker::create();

        foreach (range(1, 10) as $index) {
            JobPosition::insert([
                'name' => $faker->name,
                'description' => $faker->text,
            ]);
        }
    }

    public function runStaging()
    {
        $seedDatas = [
            ['name' => 'Staff', 'is_team_lead' => false, 'is_head_division' => false],
            ['name' => 'TL', 'is_team_lead' => true, 'is_head_division' => false],
            ['name' => 'Kadiv', 'is_team_lead' => false, 'is_head_division' => true],
        ];

        JobPosition::truncate();

        foreach ($seedDatas as $seed) {
            JobPosition::insert([
                'name' => $seed['name'],
                'is_team_lead' => $seed['is_team_lead'],
                'is_head_division' => $seed['is_head_division'],
                'description' => "Deskripsi untuk jabatan {$seed['name']}",
            ]);
        }
    }
}
