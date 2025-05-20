<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Story extends Model
{
    protected $fillable = [
        'user_id',
        'martyr_id',
        'title',
        'description',
        'content',
        'updating',
        'isUpdated'
    ];
}
