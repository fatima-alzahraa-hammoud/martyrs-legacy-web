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
        'author',
        'category',
        'readTime',
        'likes',
        'featured',
        'updating',
        'isUpdated',
        'isPublished',
        'date',
        'image_id',
        'video_id',
        'audio_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function martyr()
    {
        return $this->belongsTo(Martyr::class);
    }
}
