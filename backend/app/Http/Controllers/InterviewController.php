<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;


class InterviewController extends Controller
{
    public function getInterviews()
    {
        $interviews = Interview::all();
        return response()->json([
            'status' => 'success',
            'data' => $interviews
        ], 200);
    }
    public function getInterview($id)
    {
        $interview = Interview::find($id);

        if (!$interview) {
            return response()->json([
                'status' => 'error',
                'message' => 'Interview not found'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'data' => $interview
        ], 200);
    }
    public function createInterview(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',
            'martyr_id' => 'required|exists:martyrs,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'document_type' => 'required|string|max:50',
            'content' => 'nullable|string',
            'date' => 'required|date',
            'image_id' => 'nullable|integer',
            'video_id' => 'nullable|integer',
            'audio_id' => 'nullable|integer',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => $validator->errors()
            ], 422);
        }

        $interview = Interview::create($validator->validated());

        return response()->json([
            'status' => 'success',
            'data' => $interview
        ], 201);
    }
     public function updateInterview(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required|exists:interviews,id',
            'user_id' => 'sometimes|exists:users,id',
            'martyr_id' => 'sometimes|exists:martyrs,id',
            'title' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'document_type' => 'sometimes|string|max:50',
            'content' => 'nullable|string',
            'date' => 'sometimes|date',
            'image_id' => 'nullable|integer',
            'video_id' => 'nullable|integer',
            'audio_id' => 'nullable|integer',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => $validator->errors()
            ], 422);
        }

        $interview = Interview::find($request->id);

        if (!$interview) {
            return response()->json([
                'status' => 'error',
                'message' => 'Interview not found'
            ], 404);
        }

        $interview->update($validator->validated());

        return response()->json([
            'status' => 'success',
            'data' => $interview
        ], 200);
    }
     public function deleteInterview($id)
    {
        $interview = Interview::find($id);

        if (!$interview) {
            return response()->json([
                'status' => 'error',
                'message' => 'Interview not found'
            ], 404);
        }

        $interview->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Interview deleted successfully'
        ], 200);
    }


}
