<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\PublicController;
use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\ProjectAdminController;
use App\Http\Controllers\Admin\SkillAdminController;
use App\Http\Controllers\Admin\ServiceAdminController;
use App\Http\Controllers\Admin\ExperienceAdminController;
use App\Http\Controllers\Admin\MessageAdminController;
use App\Http\Controllers\Admin\SettingAdminController;

// ─── Public API ────────────────────────────────────────────────────────────
Route::prefix('v1')->group(function () {
    Route::get('/projects',          [ProjectController::class, 'index']);
    Route::get('/projects/{slug}',   [ProjectController::class, 'show']);
    Route::get('/skills',            [PublicController::class, 'skills']);
    Route::get('/services',          [PublicController::class, 'services']);
    Route::get('/experiences',       [PublicController::class, 'experiences']);
    Route::get('/settings',          [PublicController::class, 'settings']);
    Route::post('/contact',          [PublicController::class, 'contact']);
});

// ─── Admin Auth ────────────────────────────────────────────────────────────
Route::prefix('admin')->group(function () {
    Route::post('/login',  [AuthController::class, 'login']);

    Route::middleware(['auth:sanctum'])->group(function () {
        Route::post('/logout',  [AuthController::class, 'logout']);
        Route::get('/me',       [AuthController::class, 'me']);

        // Dashboard
        Route::get('/dashboard/stats',    [DashboardController::class, 'stats']);
        Route::get('/dashboard/messages', [DashboardController::class, 'recentMessages']);
        Route::get('/dashboard/activity', [DashboardController::class, 'activityLog']);

        // Projects
        Route::get('/projects',                          [ProjectAdminController::class, 'index']);
        Route::post('/projects',                         [ProjectAdminController::class, 'store']);
        Route::get('/projects/{project}',                [ProjectAdminController::class, 'show']);
        Route::post('/projects/{project}',               [ProjectAdminController::class, 'update']); // POST for multipart
        Route::delete('/projects/{project}',             [ProjectAdminController::class, 'destroy']);
        Route::post('/projects/{project}/publish',       [ProjectAdminController::class, 'publish']);
        Route::post('/projects/{project}/unpublish',     [ProjectAdminController::class, 'unpublish']);
        Route::post('/projects/reorder',                 [ProjectAdminController::class, 'reorder']);
        Route::post('/projects/{project}/media',         [ProjectAdminController::class, 'uploadMedia']);
        Route::post('/projects/{project}/media/video',   [ProjectAdminController::class, 'addVideoUrl']);
        Route::delete('/media/{media}',                  [ProjectAdminController::class, 'deleteMedia']);

        // Skills
        Route::get('/skills',             [SkillAdminController::class, 'index']);
        Route::post('/skills',            [SkillAdminController::class, 'store']);
        Route::put('/skills/{skill}',     [SkillAdminController::class, 'update']);
        Route::delete('/skills/{skill}',  [SkillAdminController::class, 'destroy']);
        Route::post('/skills/reorder',    [SkillAdminController::class, 'reorder']);

        // Services
        Route::get('/services',              [ServiceAdminController::class, 'index']);
        Route::post('/services',             [ServiceAdminController::class, 'store']);
        Route::put('/services/{service}',    [ServiceAdminController::class, 'update']);
        Route::delete('/services/{service}', [ServiceAdminController::class, 'destroy']);

        // Experiences
        Route::get('/experiences',                  [ExperienceAdminController::class, 'index']);
        Route::post('/experiences',                 [ExperienceAdminController::class, 'store']);
        Route::put('/experiences/{experience}',     [ExperienceAdminController::class, 'update']);
        Route::delete('/experiences/{experience}',  [ExperienceAdminController::class, 'destroy']);

        // Messages
        Route::get('/messages',                       [MessageAdminController::class, 'index']);
        Route::get('/messages/{message}',             [MessageAdminController::class, 'show']);
        Route::put('/messages/{message}/status',      [MessageAdminController::class, 'updateStatus']);
        Route::delete('/messages/{message}',          [MessageAdminController::class, 'destroy']);

        // Settings
        Route::get('/settings',           [SettingAdminController::class, 'index']);
        Route::post('/settings',          [SettingAdminController::class, 'update']);
        Route::post('/settings/image',    [SettingAdminController::class, 'uploadImage']);
        Route::post('/settings/cv',       [SettingAdminController::class, 'uploadCV']);
    });
});
