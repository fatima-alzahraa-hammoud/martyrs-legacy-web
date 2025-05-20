<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MartyrRecipient extends Model
{
    protected $fillable=[
        'will_id', 'recipient_type','specific_content'
    ];

    public function martyrWill()
    {
        return $this->belongsTo(MartyrWill::class);
    }
}
