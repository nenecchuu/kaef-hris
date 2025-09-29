<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SettingPasswordComplexity extends Model
{
    use HasFactory;

    public $table = 'setting_password_complexity';

    protected $dates = [
        'created_at',
        'updated_at',
    ];

    protected $fillable = [
        'minimum_limit_character',
        'password_reuse_limit',
        'is_minimum_limit_character',
        'is_password_reuse_limit',
        'password_expired_period',
        'use_capital_letter',
        'use_small_letter',
        'use_number',
        'use_symbol',
        'created_at',
        'updated_at',
    ];
}
