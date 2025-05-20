<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Interview extends Model
{
    protected $fillable = [
        'user_id',
        'martyr_id',
        'title',
        'description',
        'document_type',
        'content',
        'date',
        'image_id',
        'video_id',
        'audio_id'
    ];
}
