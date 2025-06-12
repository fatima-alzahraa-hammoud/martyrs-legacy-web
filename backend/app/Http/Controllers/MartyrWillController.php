<?php

namespace App\Http\Controllers;

use App\Models\MartyrWill;
use Illuminate\Http\Request;
use Validator;

class MartyrWillController extends Controller
{
    public function getMartyrsWills()
    {
        $wills = MartyrWill::all();
        return response()->json([
            'status' => 'success',
            'data' => $wills
        ], 200);
    }
    public function getMartyrWill($id)
    {
        $will = MartyrWill::find($id);

        if (!$will) {
            return response()->json([
                'status' => 'error',
                'message' => 'MartyrWill not found'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'data' => $will
        ], 200);
    }
    public function createMartyrWill(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'martyr_id' => 'required|exists:martyrs,id',
            'user_id' => 'required|exists:users,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'document_type' => 'required|string|max:50',
            'video_id' => 'nullable|integer',
            'image_id' => 'nullable|integer',
            'audio_id' => 'nullable|integer',
            'content' => 'nullable|string',
            'date' => 'required|date'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => $validator->errors()
            ], 422);
        }

        $will = MartyrWill::create($validator->validated());

        return response()->json([
            'status' => 'success',
            'data' => $will
        ], 201);
    }
    public function updateMartyrWill(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required|exists:martyr_wills,id',
            'martyr_id' => 'sometimes|exists:martyrs,id',
            'user_id' => 'sometimes|exists:users,id',
            'title' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'document_type' => 'sometimes|string|max:50',
            'video_id' => 'nullable|integer',
            'image_id' => 'nullable|integer',
            'audio_id' => 'nullable|integer',
            'content' => 'nullable|string',
            'date' => 'sometimes|date'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => $validator->errors()
            ], 422);
        }

        $will = MartyrWill::find($request->id);

        if (!$will) {
            return response()->json([
                'status' => 'error',
                'message' => 'MartyrWill not found'
            ], 404);
        }

        $will->update($validator->validated());

        return response()->json([
            'status' => 'success',
            'data' => $will
        ], 200);
    }
    public function deleteMartyrWill($id)
    {
        $will = MartyrWill::find($id);

        if (!$will) {
            return response()->json([
                'status' => 'error',
                'message' => 'MartyrWill not found'
            ], 404);
        }

        $will->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'MartyrWill deleted successfully'
        ], 200);
    }

}
