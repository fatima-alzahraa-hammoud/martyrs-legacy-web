<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MediaController extends Controller
{
     public function getMedia()
    {
        $media = Media::all();
        return response()->json([
            'status' => 'success',
            'data' => $media
        ], 200);
    }
    public function getSingleMedia($id)
    {
        $media = Media::find($id);

        if (!$media) {
            return response()->json([
                'status' => 'error',
                'message' => 'Media not found'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'data' => $media
        ], 200);
    }
    public function createMedia(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'file_name' => 'required|string|max:255',
            'file_path' => 'required|string',
            'file_type' => 'required|string|max:50',
            'user_id' => 'nullable|exists:users,id',
            'martyr_id' => 'nullable|exists:martyrs,id',
            'file_kind' => 'nullable|string|max:50',
            'file_description' => 'nullable|string',
            'file_date' => 'nullable|date',
            'file_location' => 'nullable|string|max:255'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => $validator->errors()
            ], 422);
        }

        $media = Media::create($validator->validated());

        return response()->json([
            'status' => 'success',
            'data' => $media
        ], 201);
    }
    public function updateMedia(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required|exists:media,id',
            'file_name' => 'sometimes|string|max:255',
            'file_path' => 'sometimes|string',
            'file_type' => 'sometimes|string|max:50',
            'user_id' => 'nullable|exists:users,id',
            'martyr_id' => 'nullable|exists:martyrs,id',
            'file_kind' => 'nullable|string|max:50',
            'file_description' => 'nullable|string',
            'file_date' => 'nullable|date',
            'file_location' => 'nullable|string|max:255'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => $validator->errors()
            ], 422);
        }

        $media = Media::find($request->id);

        if (!$media) {
            return response()->json([
                'status' => 'error',
                'message' => 'Media not found'
            ], 404);
        }

        $media->update($validator->validated());

        return response()->json([
            'status' => 'success',
            'data' => $media
        ], 200);
    }
    public function deleteMedia($id)
    {
        $media = Media::find($id);

        if (!$media) {
            return response()->json([
                'status' => 'error',
                'message' => 'Media not found'
            ], 404);
        }

        $media->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Media deleted successfully'
        ], 200);
    }

}
