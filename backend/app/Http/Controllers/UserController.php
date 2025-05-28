<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function getUsers(){
        $users = User::all();
        return response()->json([
            'status' => 'success',
            'data' => $users
        ], 200);
    }

    public function getUser($id){
        $user = User::findOrFail($id);
        if (!$user) {
            return response()->json([
                'status' => 'error',
                'message' => 'User not found'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'data' => $user
        ], 200);
    }

    public  function createUser(Request $request){
        $validatedData = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'phone_number' => 'required|string|max:15',
            'role_id' => 'required|exists:roles,id',
        ]);

        if($validatedData->fails()){
            return response()->json([
                'status' => 'error',
                'message' => $validatedData->errors()
            ], 422);
        }
        // Hash the password before saving
        $validatedData['password'] = Hash::make($validatedData['password']);

        $user = User::create($validatedData);

        return response()->json([
            'status' => 'success',
            'data' => $user
        ], 201);

    }

    public function deleteUser($id){
        $user = User::findOrFail($id);
        if (!$user) {
            return response()->json([
                'status' => 'error',
                'message' => 'User not found'
            ], 404);
        }

        $user->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'User deleted successfully'
        ], 200);
    }
}
