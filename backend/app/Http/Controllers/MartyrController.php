<?php

namespace App\Http\Controllers;

use App\Models\Martyr;
use Illuminate\Http\Request;

class MartyrController extends Controller
{
    public function getMartyrs(){
        $martyrs = Martyr::all();
        return response()->json([
            'status' => 'success',
            'data' => $martyrs
        ], 200);
    }
}
