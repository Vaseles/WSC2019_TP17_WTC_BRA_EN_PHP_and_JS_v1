<?php

use App\Http\Controllers\AuthAdminController;
use App\Http\Controllers\CourseController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

// courses
Route::get('/courses', [CourseController::class, 'index']);
Route::get('/create', [CourseController::class, 'create']);
Route::post('/create', [CourseController::class, 'store']);
Route::get('/courses/:id', [CourseController::class, 'attende']);

// Auth admin
Route::get('/login', [AuthAdminController::class, 'loginview']);
Route::post('/login', [AuthAdminController::class, 'auth']);

Route::get('/logout', [AuthAdminController::class, 'logout']);
