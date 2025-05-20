<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Media extends Model
{
    protected $fillable = [
        'file_name',
        'file_path',
        'file_type',
        'user_id',
        'martyr_id',
        'file_kind',
        'file_description',
        'file_date',
        'file_location'
    ];
}
