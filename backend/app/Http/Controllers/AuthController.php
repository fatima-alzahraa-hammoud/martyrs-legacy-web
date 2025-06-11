<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{

    public function register(Request $request){
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email', 
            'password' => 'required|string|min:8|confirmed',
            'phone_number' => 'required|string|max:17',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => $validator->errors()
            ], 422);
        }

        try {
            $data = $validator->validated();
            $data['password'] = bcrypt($data['password']);
            $data['role_id'] = 3;
            $user = User::create($data);
            $token = JWTAuth::fromUser($user);

            return response()->json([
                "status" => 'success',
                "message" => 'User registered successfully',
                "user" => $user,
                "token" => $token
            ], status: 201);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Registration failed: ' . $e->getMessage()
            ], 500);
        }
    }
    public function login(Request $request){
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => $validator->errors()
            ], 422);
        }
        
        $credentials = $validator->validated();

        try{
            if (! $token = JWTAuth::attempt($credentials)) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Invalid credentials'
                ], 401);
            }

            $user = JWTAuth::user();

            return response()->json([
                "status" => 'success',
                "message" => 'Login successful',
                "user" => $user, 
                "token" => $token
            ], status: 200);

        }catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Login failed: ' . $e->getMessage()
            ], 500);
        }
    }

    public function logout(Request $request)
    {
        try {
            $token = JWTAuth::getToken();

            if (!$token) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Token not provided'
                ], 401);
            }

            JWTAuth::invalidate($token);

            return response()->json([
                'status' => 'success',
                'message' => 'User logged out successfully'
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Logout failed: ' . $e->getMessage()
            ], 500);
        }
    }

    public function changePassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => $validator->errors()
            ], 422);
        }

        try {
            $data = $validator->validated();
            $user = User::where('email', $data['email'])->first();

            if (!$user) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'User not found'
                ], 404);
            }

            $user->password = bcrypt($data['password']);
            $user->save();

            return response()->json([
                'status' => 'success',
                'message' => 'Password changed successfully'
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Password changed failed: ' . $e->getMessage()
            ], 500);
        }
    }

    public function resetPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => $validator->errors()
            ], 422);
        }

        try {
            $data = $validator->validated();
            $user = User::where('email', $data['email'])->first();

            if (!$user) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'User not found'
                ], 404);
            }

            // Here we would typically send a reset link to the user's email


            // For simplicity, we will just return a success message
            return response()->json([
                'status' => 'success',
                'message' => 'Password reset link sent to your email'
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Password reset failed: ' . $e->getMessage()
            ], 500);
        }

    }

}
