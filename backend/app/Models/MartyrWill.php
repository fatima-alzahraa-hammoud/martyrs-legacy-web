<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MartyrWill extends Model
{
    protected $fillable= [
        'martyr_id','user_id','title','description','document_type','video_id','image_id','audio_id','content','date'
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
