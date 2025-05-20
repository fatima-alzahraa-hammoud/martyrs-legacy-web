<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Speech extends Model
{
    protected $fillable=[
        'martyr_id','user_id','title','description','document_type','video_id','audio_id','image_id','content','data'
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
