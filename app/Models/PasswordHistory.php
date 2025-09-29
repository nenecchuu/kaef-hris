<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;

class PasswordHistory extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'password'];

    public function password(): Attribute
    {
        return Attribute::set(fn ($value) => Hash::make($value));
    }
}
