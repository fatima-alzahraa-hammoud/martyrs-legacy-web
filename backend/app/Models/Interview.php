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
