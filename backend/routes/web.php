<?php

use App\Http\Controllers\AdminAuthController;
use App\Http\Controllers\ProjectController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return redirect('/admin');
});

// Мутации проектов — сессионная авторизация admin + CSRF (web-группа)
Route::prefix('api')->middleware('admin.auth')->group(function () {
    Route::post('projects', [ProjectController::class, 'store']);
    Route::match(['put', 'patch'], 'projects/{id}', [ProjectController::class, 'update']);
    Route::delete('projects/{id}', [ProjectController::class, 'destroy']);
});

// Admin auth
Route::get('/admin/login', [AdminAuthController::class, 'showLogin'])->name('admin.login');
Route::post('/admin/login', [AdminAuthController::class, 'login'])->name('admin.login.post');
Route::post('/admin/logout', [AdminAuthController::class, 'logout'])->name('admin.logout')->middleware('admin.auth');

// Admin panel — только авторизованным
Route::get('/admin', function () {
    return view('admin');
})->middleware('admin.auth');
