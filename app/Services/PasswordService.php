<?php

namespace App\Services;

use App\Models\User;
use App\Models\PasswordHistory;
use App\Models\SettingPasswordComplexity;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Str;

class PasswordService
{
    public function validate(int $user_id, string $password, string $password_confirm)
    {
        $setting = SettingPasswordComplexity::firstOrCreate();

        $errors = [
            'password' => null,
            'password_confirmation' => null,
        ];

        $user = User::where('id', $user_id)->first();
        // Check password contain username or not based on . (dot) delimiter
        if (isset($user) && isset($user->email)) {
            $emailArr = explode(".", Str::before($user->email, '@'));
            if (Str::contains($password, $emailArr)) {
                $errors['password'] = "Password must not contain username.";
            }
        }

        // Check password validation
        if ($setting->is_minimum_limit_character && strlen($password) < $setting->minimum_limit_character) {
            $errors['password'] = "Password must be at least {$setting->minimum_limit_character} characters long.";
        } elseif ($setting->use_capital_letter && ! preg_match('/[A-Z]/', $password)) {
            $errors['password'] = $errors['password'] ?: 'Password must contain at least one uppercase letter.';
        } elseif ($setting->use_small_letter && ! preg_match('/[a-z]/', $password)) {
            $errors['password'] = $errors['password'] ?: 'Password must contain at least one lowercase letter.';
        } elseif ($setting->use_number && ! preg_match('/\d/', $password)) {
            $errors['password'] = $errors['password'] ?: 'Password must contain at least one number.';
        } elseif ($setting->use_symbol && ! preg_match('/[\W_]/', $password)) {
            $errors['password'] = $errors['password'] ?: 'Password must contain at least one special character.';
        }

        // Check confirm password validation
        if ($password !== $password_confirm) {
            $errors['password_confirmation'] = 'Password and confirmation password do not match.';
        }

        if ($setting->is_password_reuse_limit) {
            $passwordHistories = PasswordHistory::where('user_id', $user_id)
                ->orderBy('created_at', 'desc')
                ->take($setting->password_reuse_limit)
                ->get();

            foreach ($passwordHistories as $history) {
                if (Hash::check($password, $history->password)) {
                    $errors['password'] = $errors['password'] ?: "You cannot reuse any of your last {$setting->password_reuse_limit} passwords.";
                }
            }
        }

        if ($errors['password'] || $errors['password_confirmation']) {
            throw ValidationException::withMessages($errors);
        }
    }

    public function storePasswordHistory(int $user_id, string $password)
    {
        $setting = SettingPasswordComplexity::firstOrCreate();

        // Save current password to history
        PasswordHistory::create([
            'user_id' => $user_id,
            'password' => $password,
        ]);

        // Maintain password history limit
        if ($setting->is_password_reuse_limit) {
            $excessHistory = PasswordHistory::where('user_id', $user_id)
                ->orderBy('created_at', 'desc')
                ->skip($setting->password_reuse_limit)
                ->take(PHP_INT_MAX)
                ->get();

            foreach ($excessHistory as $history) {
                $history->delete();
            }
        }
    }
}
