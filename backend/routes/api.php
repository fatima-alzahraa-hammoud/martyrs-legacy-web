<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\InterviewController;
use App\Http\Controllers\MartyrController;
use App\Http\Controllers\MartyrWillController;
use App\Http\Controllers\MediaController;
use App\Http\Controllers\SpeechController;
use App\Http\Controllers\StoryController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\AdminMiddleware;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::middleware('jwt')->post('/logout', [AuthController::class, 'logout']);
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
    Route::get('/{id}/stories', [StoryController::class, 'getMartyrStories']);
    Route::get('/{id}/interviews', [InterviewController::class, 'getMartyrInterviews']);
    Route::get('/{id}/will', [MartyrWillController::class, 'getMartyrWillsByMartyr']);
    Route::get('/{id}/media', [MediaController::class, 'getMediaByMartyr']);
});


Route::prefix('al-sayyed-hasan')->group(function () {
    Route::get('/2', [MartyrController::class, 'getMartyr']);
    Route::get('/2/stories', [StoryController::class, 'getMartyrStories']);
    Route::get('/2/interviews', [InterviewController::class, 'getMartyrInterviews']);
    Route::get('/2/media', [MediaController::class, 'getMediaByMartyr']);
    Route::get('/2/speeches', [SpeechController::class, 'getSpeechesByMartyr']);
});

Route::middleware("jwt")->group(function () {
    Route::post('/martyr', [MartyrController::class, 'createMartyr']);
    Route::put('/martyr/{id}', [MartyrController::class, 'updateMartyr']);
});