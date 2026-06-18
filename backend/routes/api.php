<?php

use App\Http\Controllers\ProjectController;
use Illuminate\Support\Facades\Route;

Route::get('projects/filter-options', [ProjectController::class, 'filterOptions']);
Route::apiResource('projects', ProjectController::class)->only(['index', 'show']);