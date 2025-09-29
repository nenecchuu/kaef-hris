<?php

namespace App\Console\Commands;

use App\Jobs\SendResetPasswordEmail;
use App\Models\SettingPasswordComplexity;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Password;

class ResetPassword extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'users:reset-password';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Reset password if latest password update ';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $config = SettingPasswordComplexity::firstOrCreate();
        $now = Carbon::now();
        $this->info("Password Reset At : $now");
        $userIds = [];
        if ($config->password_expired_period > 0) {

            $users = User::where('is_active', 1)
                ->whereNotNull('latest_updated_password')
                ->where('is_reset_password_pending',false)
                ->get();

            foreach ($users as $user) {
                $expiryDate = Carbon::parse($user->latest_updated_password)
                    ->addMonths($config->password_expired_period);

                if ($expiryDate->lessThanOrEqualTo($now)) {
                    array_push($userIds,$user->id);
                }
            }
            SendResetPasswordEmail::dispatch(null, $userIds);
            if (count($userIds) > 0) {
                $this->info('Password reset emails dispatched for users with ids: ' . implode(', ', $userIds));
            } else {
                $this->info('No expired passwords found.');
            }
        }

        return 0;
    }
}
