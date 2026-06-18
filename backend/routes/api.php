<?php

use App\Http\Controllers\ProjectController;
use Illuminate\Support\Facades\Route;

Route::apiResource('projects', ProjectController::class);
Route::post('projects/{project}/check', [ProjectController::class, 'check']);