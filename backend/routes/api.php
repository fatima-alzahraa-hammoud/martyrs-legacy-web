<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\AdminMiddleware;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::middleware('jwt')->post('/logout', [AuthController::class, 'logout']);
    Route::post('/logout', [AuthController::class, 'logout']);
});

Route::get('/users', [UserController::class, 'getUsers']);
