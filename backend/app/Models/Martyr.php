<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Martyr extends Model
{
    protected $fillable = ['first_name', 'last_name','mother_name','father_name','birth_date','martyrdom_date','burial_place','status','marital_status','nb_of_children','related_phone_nb','is_published','updating','is_updated','user_id_publish','image_id'];

}
