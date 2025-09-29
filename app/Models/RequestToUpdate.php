<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RequestToUpdate extends Model
{
    use HasFactory;

    const UPDATED_AT = null;

    public $table = 'request_to_updates';

    protected $fillable = [
        'user_id',
        'action'
    ];
}