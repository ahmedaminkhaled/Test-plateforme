<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\HealthController;
use App\Http\Controllers\Api\UserStoryController;
use App\Http\Controllers\Api\TestCaseController;
use App\Http\Controllers\Api\TestRunController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
| All API routes are prefixed with /api (handled by RouteServiceProvider).
*/

Route::get('/health', HealthController::class);

Route::apiResource('user-stories', UserStoryController::class);
Route::apiResource('test-cases', TestCaseController::class);
Route::apiResource('test-runs', TestRunController::class)->only([
    'index', 'show', 'store', 'destroy',
]);
