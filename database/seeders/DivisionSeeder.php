<?php

namespace Database\Seeders;

use App\Models\Division;
use Faker\Factory as Faker;
use Illuminate\Database\Seeder;

class DivisionSeeder extends Seeder
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
            Division::insert([
                'name' => $faker->name,
                'description' => $faker->text,
                'head_division_id' => $faker->numberBetween(
                    1,
                    10
                ),
            ]);
        }
    }

    public function runStaging()
    {
        $jsonFile = database_path('seeders/data/division.json');
        $jsonData = file_get_contents($jsonFile);
        $seedDatas = json_decode($jsonData, true);

        Division::truncate();

        foreach ($seedDatas as $seed) {
            Division::insert([
                'name' => $seed,
                'description' => "Deskripsi untuk divisi {$seed}",
            ]);
        }
    }
}
