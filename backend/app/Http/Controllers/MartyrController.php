<?php

namespace App\Http\Controllers;

use App\Models\Martyr;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

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

    public function createMartyr(Request $request){
        $validator = \Validator::make($request->all(), [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'mother_name' => 'required|string|max:255',
            'father_name' => 'required|string|max:255',
            'birth_date' => 'required|date',
            'place_of_birth' => 'required|string|max:255',
            'martyrdom_date' => 'required|date',
            'burial_place' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'bio' => 'nullable|string',
            'famous_quote' => 'nullable|string|max:500',
            'marital_status' => 'required|string|max:255',
            'nb_of_children' => 'nullable|integer|min:0',
            'related_phone_nb' => 'required|string|max:20',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // Add image validation
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => $validator->errors()
            ], 422);
        }

        $data = $validator->validated();

        // Add default boolean fields
        $data['is_published'] = false;
        $data['updating'] = false;
        $data['is_updated'] = false;
        $data['user_id_publish'] = auth()->id() ?? 1; // Use authenticated user or fallback to 1
        $data['status'] = 'martyr'; // Default status


        Log::info('Creating martyr with data: ', $data);
        unset($data['image']);

        // Create martyr first (without image_id)
        $martyr = Martyr::create($data);

        // Handle image upload and create media record
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $imagePath = $file->store('photos', 'public');

            $media = \App\Models\Media::create([
                'martyr_id' => $martyr->id,
                'user_id' => auth()->id() ?? 1, // Use authenticated user or fallback to 1
                'file_path' => $imagePath,
                'file_name' => $file->getClientOriginalName(),
                'file_type' => 'photo',
                'file_description' => 'Martyr main image',
                'file_date' => now(),
                'file_location' => null,
                'views' => 0,
                'likes' => 0,
                'featured' => true,
            ]);

            // Update martyr with image_id
            $martyr->image_id = $media->id;
            $martyr->save();
        }

        return response()->json([
            'status' => 'success',
            'data' => $martyr
        ], 201);
    }

    public function updateMartyr(Request $request, $id){
        $martyr = Martyr::findOrFail($id);
        if (!$martyr) {
            return response()->json([
                'status' => 'error',
                'message' => 'Martyr not found'
            ], 404);
        }

        $validator = \Validator::make($request->all(), [
            'first_name' => 'sometimes|required|string|max:255',
            'last_name' => 'sometimes|required|string|max:255',
            'mother_name' => 'nullable|string|max:255',
            'father_name' => 'nullable|string|max:255',
            'birth_date' => 'sometimes|required|date',
            'place_of_birth' => 'nullable|string|max:255',
            'martyrdom_date' => 'sometimes|required|date',
            'burial_place' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'bio' => 'nullable|string',
            'famous_quote' => 'nullable|string|max:500',
            'status' => 'nullable|string|max:255',
            'marital_status' => 'nullable|string|max:255',
            'nb_of_children' => 'nullable|integer|min:0',
            'related_phone_nb' => 'nullable|string|max:20',
            'is_published' => 'boolean',
            'updating' => 'boolean',
            'is_updated' => 'boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => $validator->errors()
            ], 422);
        }

        $martyr->update($validator->validated());

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
