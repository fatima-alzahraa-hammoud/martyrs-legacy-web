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
        'image_url',
        'author',
        'category',
        'readTime',
        'likes',
        'featured',
        'updating',
        'isUpdated',
        'isPublished',
        'date',
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
