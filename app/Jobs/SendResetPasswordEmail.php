<?php

namespace App\Jobs;

use App\Models\User;
use App\Services\AuditTrailService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Password;

class SendResetPasswordEmail implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $performedUser;
    public $userIds;

     /**
     * Create a new job instance.
     *
     * @param array $emails
     */
    public function __construct(?User $performedUser, $userIds)
    {
        $this->performedUser = $performedUser;
        $this->userIds = $userIds;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        foreach ($this->userIds as $userId) {
            $user = User::find($userId);
            if (!$user) {
                continue;
            }

            // Send reset password email
            Password::sendResetLink(['email' => $user->email]);

            if($this->performedUser) {
                // Log the reset password action
                (new AuditTrailService())->logUserResetPasswordAction($this->performedUser, $user, '');
            } else {
                // If no performed user is set, log with a generic action
                (new AuditTrailService())->logUserResetPasswordAction(null, null, $user->email);
            }
        }

        // Update all users with a single query using whereIn
        User::whereIn('id', $this->userIds)
            ->update(['is_reset_password_pending' => true]);
    }
}
