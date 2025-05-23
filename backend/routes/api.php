<?php

use App\Http\Controllers\UserController;
use Database\Factories\UserFactory;
use Illuminate\Support\Facades\Route;

Route::get('/users', [UserController::class, 'getUsers']);
