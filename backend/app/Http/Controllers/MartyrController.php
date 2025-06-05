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

    public function deleteMartyr($id){
        $martyr = Martyr::findOrFail($id);
        if (!$martyr) {
            return response()->json([
                'status' => 'error',
                'message' => 'Martyr not found'
            ], 404);
        }

        $martyr->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Martyr deleted successfully'
        ], 200);
    }
    //public function store(Request $request)
//{
  //  $validator = Validator::make($request->all(), [
    //    'first_name' => 'required|string|max:255',
      //  'last_name' => 'required|string|max:255',
        //'mother_name' => 'nullable|string|max:255',
        //'father_name' => 'nullable|string|max:255',
        //'birth_date' => 'required|date',
        //'martyrdom_date' => 'required|date',
        //'burial_place' => 'nullable|string|max:255',
        //'status' => 'nullable|string|max:255',
        //'marital_status' => 'nullable|string|max:255',
        //'nb_of_children' => 'nullable|integer|min:0',
        //'related_phone_nb' => 'nullable|string|max:20',
        //'is_published' => 'boolean',
        //'updating' => 'boolean',
        //'is_updated' => 'boolean',
        //'user_id_publish' => 'nullable|exists:users,id',
        //'image_id' => 'nullable|exists:images,id'
    //]);

    //if ($validator->fails()) {
      //  return response()->json([
        //    'status' => 'error',
          //  'errors' => $validator->errors()
        //], 422);
    //}

    //$martyr = Martyr::create($validator->validated());

    //return response()->json([
      //  'status' => 'success',
        //'data' => $martyr
    //], 201);
//}

//public function update(Request $request, $id)
//{
  //  $martyr = Martyr::findOrFail($id);

    //$validator = Validator::make($request->all(), [
      //  'first_name' => 'sometimes|required|string|max:255',
       // 'last_name' => 'sometimes|required|string|max:255',
       // 'mother_name' => 'nullable|string|max:255',
       // 'father_name' => 'nullable|string|max:255',
       // 'birth_date' => 'sometimes|required|date',
       // 'martyrdom_date' => 'sometimes|required|date',
       // 'burial_place' => 'nullable|string|max:255',
       // 'status' => 'nullable|string|max:255',
       // 'marital_status' => 'nullable|string|max:255',
       // 'nb_of_children' => 'nullable|integer|min:0',
       // 'related_phone_nb' => 'nullable|string|max:20',
       // 'is_published' => 'boolean',
       // 'updating' => 'boolean',
       // 'is_updated' => 'boolean',
       // 'user_id_publish' => 'nullable|exists:users,id',
       // 'image_id' => 'nullable|exists:images,id'
    //]);
}
