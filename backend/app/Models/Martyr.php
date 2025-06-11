<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Martyr extends Model
{
    protected $fillable = [
        'first_name',
        'last_name',
        'mother_name',
        'father_name',
        'birth_date',
        'place_of_birth',
        'martyrdom_date',
        'burial_place',
        'description',
        'bio',
        'famous_quote',
        'status',
        'marital_status',
        'nb_of_children',
        'related_phone_nb',
        'is_published',
        'updating',
        'is_updated',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function image()
    {
        return $this->belongsTo(Media::class, 'image_id');
    }

    public function martyrWills()
    {
        return $this->hasMany(MartyrWill::class);
    }

    public function interviews()
    {
        return $this->hasMany(Interview::class);
    }

    public function stories()
    {
        return $this->hasMany(Story::class);
    }

    public function speeches()
    {
        return $this->hasMany(Speech::class);
    }

}
