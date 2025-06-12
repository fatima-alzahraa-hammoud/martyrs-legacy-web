<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\InterviewController;
use App\Http\Controllers\MartyrController;
use App\Http\Controllers\MartyrWillController;
use App\Http\Controllers\StoryController;
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

Route::prefix('martyrs')->group(function () {
    Route::get('/', [MartyrController::class, 'getMartyrs']);
    Route::get('/interviews', [InterviewController::class, 'getInterviews']);
    Route::get('/stories', [StoryController::class, 'getStories']);
    Route::get("/wills", [MartyrWillController::class, 'getMartyrsWills']);
});

Route::prefix('martyr')->group(function () {
    Route::get('/{id}', [MartyrController::class, 'getMartyr']);
    Route::get('/{id}/stories', [MartyrController::class, 'getMartyrStories']);
});