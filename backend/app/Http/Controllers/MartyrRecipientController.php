<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MartyrRecipientController extends Controller
{
    public function getMartyrRecipients()
    {
        $recipients = MartyrRecipient::all();
        return response()->json([
            'status' => 'success',
            'data' => $recipients
        ], 200);
    }
    public function getMartyrRecipient($id)
    {
        $recipient = MartyrRecipient::find($id);

        if (!$recipient) {
            return response()->json([
                'status' => 'error',
                'message' => 'MartyrRecipient not found'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'data' => $recipient
        ], 200);
    }
    public function createMartyrRecipient(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'will_id' => 'required|exists:martyr_wills,id',
            'recipient_type' => 'required|string|max:255',
            'specific_content' => 'nullable|string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => $validator->errors()
            ], 422);
        }

        $recipient = MartyrRecipient::create($validator->validated());

        return response()->json([
            'status' => 'success',
            'data' => $recipient
        ], 201);
    }
     public function updateMartyrRecipient(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required|exists:martyr_recipients,id',
            'will_id' => 'sometimes|exists:martyr_wills,id',
            'recipient_type' => 'sometimes|string|max:255',
            'specific_content' => 'nullable|string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => $validator->errors()
            ], 422);
        }

        $recipient = MartyrRecipient::find($request->id);

        if (!$recipient) {
            return response()->json([
                'status' => 'error',
                'message' => 'MartyrRecipient not found'
            ], 404);
        }

        $recipient->update($validator->validated());

        return response()->json([
            'status' => 'success',
            'data' => $recipient
        ], 200);
    }
    public function deleteMartyrRecipient($id)
    {
        $recipient = MartyrRecipient::find($id);

        if (!$recipient) {
            return response()->json([
                'status' => 'error',
                'message' => 'MartyrRecipient not found'
            ], 404);
        }

        $recipient->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'MartyrRecipient deleted successfully'
        ], 200);
    }
}
