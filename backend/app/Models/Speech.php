<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Speech extends Model
{
    protected $fillable = [
        'martyr_id',
        'user_id',
        'title',
        'description',
        'document_type',
        'video_id',
        'audio_id',
        'image_id',
        'content',
        'date',
        'duration',
        'category',
        'occasion',
        'audio_url',
        'transcript_url',
        'views',
        'featured',
        'tags',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function martyr()
    {
        return $this->belongsTo(Martyr::class);
    }

    public function video()
    {
        return $this->belongsTo(Media::class, 'video_id');
    }

    public function audio()
    {
        return $this->belongsTo(Media::class, 'audio_id');
    }

    public function image()
    {
        return $this->belongsTo(Media::class, 'image_id');
    }

}
