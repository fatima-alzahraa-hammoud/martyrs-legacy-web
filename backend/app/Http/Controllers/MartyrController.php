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

    public function getMartyr($id){
        $martyr = Martyr::findOrFail($id);
        if (!$martyr) {
            return response()->json([
                'status' => 'error',
                'message' => 'Martyr not found'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'data' => $martyr
        ], 200);
    }
}
