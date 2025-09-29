<?php

namespace App\Console\Commands;

use App\Models\User;
use Faker\Factory as Faker;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;

class RandomizeUser extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'command:randomize_user';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Randomize email, name, ldap_username of users';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $this->info('-- Start Randomize Users --');
        
        $prefixName = "users_";
        //clean up old files
        foreach (glob(Storage::disk('public')->path('randomize/').$prefixName."*.*") as $filename) {
            unlink($filename);
        }

        $csvName = $prefixName.bin2hex(random_bytes(5)).".csv";
        Storage::disk('public')->put('randomize/'.$csvName, 'Contents');
        $fileHandle = fopen(Storage::disk('public')->path('randomize/'.$csvName), 'w') or die('Can\'t create .csv file, try again later.');

        //Add the headers
        $headers = ["[Before] Name", "[After] Name", "[Before] Email", "[After] Email", "[Before] LDAP Username", "[After] LDAP Username"];
        fputcsv($fileHandle, $headers, ";");

        $faker = Faker::create('id_ID');
        $users = User::all();

        foreach ($users as $user) {
            $name = $faker->unique()->name;
            $email = $faker->unique()->safeEmail;
            $ldapUsername = $user->ldap_username ? $faker->unique()->userName : null;

            $row = [$user->name, $name, $user->email, $email, $user->ldap_username, $ldapUsername];

            //save data
            $user->name = $name;
            $user->email = $email;
            $user->ldap_username = $ldapUsername;
            $user->save();
            
            fputcsv($fileHandle, $row, ";");
        }
        fclose($fileHandle);
        $this->info('File Location: '.Storage::disk('public')->url('randomize/'.$csvName));
        $this->info('-- End Randomize Users --');
    }
}
