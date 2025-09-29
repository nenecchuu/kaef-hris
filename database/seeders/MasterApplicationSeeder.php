<?php

namespace Database\Seeders;

use App\Models\MasterApplication;
use Faker\Factory as Faker;
use Illuminate\Database\Seeder;

class MasterApplicationSeeder extends Seeder
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
            MasterApplication::insert([
                'name' => $faker->name,
                'secret' => $faker->sha256,
                'redirect' => $faker->url,
                'personal_access_client' => false,
                'password_client' => false,
                'revoked' => false,
            ]);
        }
    }

    public function runStaging()
    {
        $seedDatas = ['EWS', 'DRD', 'GRM', 'RDMS', 'SMS', 'RPA', 'Regiofin'];

        MasterApplication::truncate();

        foreach ($seedDatas as $seed) {
            MasterApplication::insert([
                'name' => $seed,
                'secret' => hash('sha256', $seed . time()),
                'redirect' => 'http://localhost',
                'personal_access_client' => false,
                'password_client' => false,
                'revoked' => false,
            ]);
        }
    }
}
