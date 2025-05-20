<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Speech extends Model
{
    protected $fillable=[
        'martyr_id','user_id','title','description','document_type','video_id','audio_id','image_id','content','data'
    ];
}
