<?php

namespace App\Http\Controllers;

use App\Models\Story;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class StoryController extends Controller
{
    public function getStories()
    {
        $stories = Story::all();
        return response()->json([
            'status' => 'success',
            'data' => $stories
        ], 200);
    }

    public function getStory($id)
    {
        $story = Story::find($id);

        if (!$story) {
            return response()->json([
                'status' => 'error',
                'message' => 'Story not found'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'data' => $story
        ], 200);
    }

    public function getMartyrStories($id){
        $stories = Story::where('martyr_id', $id)->get();

        if ($stories->isEmpty()) {
            return response()->json([
                'status' => 'error',
                'message' => 'No stories found for this martyr'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'data' => $stories
        ], 200);
    }
     public function createStory(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id'       => 'required|exists:users,id',
            'martyr_id'     => 'required|exists:martyrs,id',
            'title'         => 'required|string|max:255',
            'description'   => 'nullable|string',
            'content'       => 'nullable|string',
            'author'        => 'nullable|string|max:255',
            'category'      => 'nullable|string|max:255',
            'readTime'      => 'nullable|integer',
            'likes'         => 'nullable|integer',
            'featured'      => 'nullable|boolean',
            'updating'      => 'nullable|boolean',
            'isUpdated'     => 'nullable|boolean',
            'isPublished'   => 'nullable|boolean',
            'date'          => 'nullable|date',
            'image_id'      => 'nullable|integer',
            'video_id'      => 'nullable|integer',
            'audio_id'      => 'nullable|integer'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => $validator->errors()
            ], 422);
        }

        $story = Story::create($validator->validated());

        return response()->json([
            'status' => 'success',
            'data' => $story
        ], 201);
    }

    public function updateStory(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id'            => 'required|exists:stories,id',
            'user_id'       => 'sometimes|exists:users,id',
            'martyr_id'     => 'sometimes|exists:martyrs,id',
            'title'         => 'sometimes|string|max:255',
            'description'   => 'sometimes|nullable|string',
            'content'       => 'sometimes|nullable|string',
            'author'        => 'sometimes|nullable|string|max:255',
            'category'      => 'sometimes|nullable|string|max:255',
            'readTime'      => 'sometimes|nullable|integer',
            'likes'         => 'sometimes|nullable|integer',
            'featured'      => 'sometimes|nullable|boolean',
            'updating'      => 'sometimes|nullable|boolean',
            'isUpdated'     => 'sometimes|nullable|boolean',
            'isPublished'   => 'sometimes|nullable|boolean',
            'date'          => 'sometimes|nullable|date',
            'image_id'      => 'sometimes|nullable|integer',
            'video_id'      => 'sometimes|nullable|integer',
            'audio_id'      => 'sometimes|nullable|integer'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => $validator->errors()
            ], 422);
        }

        $story = Story::find($request->id);

        if (!$story) {
            return response()->json([
                'status' => 'error',
                'message' => 'Story not found'
            ], 404);
        }

        $story->update($validator->validated());

        return response()->json([
            'status' => 'success',
            'data' => $story
        ], 200);
    }
     public function deleteStory($id)
    {
        $story = Story::find($id);

        if (!$story) {
            return response()->json([
                'status' => 'error',
                'message' => 'Story not found'
            ], 404);
        }

        $story->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Story deleted successfully'
        ], 200);
    }
}
