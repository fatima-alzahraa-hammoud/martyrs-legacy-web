<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Media extends Model
{
    protected $table = 'medias';
    protected $fillable = [
        'file_name',
        'file_path',
        'file_type',
        'user_id',
        'martyr_id',
        'file_description',
        'file_date',
        'file_location',
        'views',
        'likes',
        'featured',
    ];
    public function user(){
        return $this->belongsTo(User::class);
    }
    public function martyr(){
        return $this->belongsTo(Martyr::class);
    }

}
