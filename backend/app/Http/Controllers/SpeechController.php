<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SpeechController extends Controller
{
    public function getSpeeches()
    {
        $speeches = Speech::all();
        return response()->json([
            'status' => 'success',
            'data' => $speeches
        ], 200);
    }

    public function getSpeech($id)
    {
        $speech = Speech::find($id);

        if (!$speech) {
            return response()->json([
                'status' => 'error',
                'message' => 'Speech not found'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'data' => $speech
        ], 200);
    }
    public function createSpeech(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'martyr_id'      => 'required|exists:martyrs,id',
            'user_id'        => 'required|exists:users,id',
            'title'          => 'required|string|max:255',
            'description'    => 'nullable|string',
            'document_type'  => 'nullable|string|max:100',
            'video_id'       => 'nullable|integer',
            'audio_id'       => 'nullable|integer',
            'image_id'       => 'nullable|integer',
            'content'        => 'nullable|string',
            'data'           => 'nullable|date'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => $validator->errors()
            ], 422);
        }

        $speech = Speech::create($validator->validated());

        return response()->json([
            'status' => 'success',
            'data' => $speech
        ], 201);
    }

    public function updateSpeech(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id'             => 'required|exists:speeches,id',
            'martyr_id'      => 'sometimes|exists:martyrs,id',
            'user_id'        => 'sometimes|exists:users,id',
            'title'          => 'sometimes|string|max:255',
            'description'    => 'sometimes|string',
            'document_type'  => 'sometimes|string|max:100',
            'video_id'       => 'sometimes|integer',
            'audio_id'       => 'sometimes|integer',
            'image_id'       => 'sometimes|integer',
            'content'        => 'sometimes|string',
            'data'           => 'sometimes|date'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => $validator->errors()
            ], 422);
        }

        $speech = Speech::find($request->id);

        if (!$speech) {
            return response()->json([
                'status' => 'error',
                'message' => 'Speech not found'
            ], 404);
        }

        $speech->update($validator->validated());

        return response()->json([
            'status' => 'success',
            'data' => $speech
        ], 200);
    }

    public function deleteSpeech($id)
    {
        $speech = Speech::find($id);

        if (!$speech) {
            return response()->json([
                'status' => 'error',
                'message' => 'Speech not found'
            ], 404);
        }

        $speech->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Speech deleted successfully'
        ], 200);
    }
}
