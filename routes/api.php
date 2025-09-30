<?php

use App\Http\Controllers\AuditTrailController;
use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\MasterApplicationController;
use App\Http\Controllers\OptionController;
use App\Http\Controllers\SettingPasswordComplexityController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::controller(AuthenticationController::class)->group(function () {
    Route::post('/sign-in', 'store');
    Route::post('/forgot-password', 'forgot_password');
    Route::post('/reset-password', 'reset_password');
    Route::post('/verify-login-mfa', 'verify_login_mfa');
    Route::post('/verify-forgot-password-mfa', 'verify_forgot_password_mfa');

    Route::middleware(['auth:sanctum', 'guardMFA', 'guardResetPass'])->group(function () {
        Route::get('/user', 'show')->middleware(['as:user']);
        Route::post('/sign-out', 'destroy');
        Route::get('/generate-mfa', 'generate_qr_mfa');
        Route::post('/verify-mfa', 'verify_mfa');
        Route::post('/unbind-mfa/{id}', 'unbind_mfa');
    });
});

Route::prefix('users')
    ->middleware(['auth:sanctum', 'as:user', 'guardMFA', 'guardResetPass'])
    ->controller(UserController::class)
    ->group(function () {
        Route::get('/', 'paginate');
        Route::get('/entry-related-data', 'get_entry_related_data');
        Route::post('/', 'store');
        Route::put('/{id}', 'update');
        Route::get('/{id}', 'show');
        Route::delete('/{id}', 'destroy');
        Route::put('/{id}/set-active/{active}', 'update_user_status');
        Route::put('/{id}/unblock', 'unblock_user');
        Route::post('/forgot-password', 'forgot_password');
    });

Route::prefix('master-applications')
    ->middleware(['auth:sanctum', 'as:user', 'guardMFA', 'guardResetPass'])
    ->controller(MasterApplicationController::class)
    ->group(function () {
        Route::get('/', 'get_all');
    });

Route::prefix('audit-trails')
    ->middleware(['auth:sanctum', 'as:user', 'guardMFA', 'guardResetPass'])
    ->controller(AuditTrailController::class)
    ->group(function () {
        Route::get('/', 'paginate');
        Route::get('/export', 'export');
    });

Route::prefix('password-complexity')
    ->controller(SettingPasswordComplexityController::class)
    ->group(function () {
        Route::get('/', 'get');
    });

Route::prefix('password-complexity')
    ->middleware(['auth:sanctum', 'as:user', 'guardMFA', 'guardResetPass'])
    ->controller(SettingPasswordComplexityController::class)
    ->group(function () {
        Route::put('/', 'update');
    });

Route::prefix('options')
    ->middleware(['auth:sanctum', 'as:user', 'guardMFA', 'guardResetPass'])
    ->controller(OptionController::class)
    ->group(function () {
        Route::get('/users', 'users');
        Route::get('/divisions', 'divisions');
        Route::get('/job-positions', 'job_positions');
    });

// Employee Management API Routes (Story 1.2)
Route::middleware(['auth:sanctum', 'as:user', 'guardMFA', 'guardResetPass'])->group(function () {

    // Employee CRUD endpoints
    Route::apiResource('employees', App\Http\Controllers\Api\EmployeeController::class)->parameters([
        'employees' => 'employee_id'
    ]);

    // Additional employee endpoints
    Route::prefix('employees')->group(function () {
        Route::get('/active', [App\Http\Controllers\Api\EmployeeController::class, 'getActiveEmployees']);
        Route::get('/by-division/{division_id}', [App\Http\Controllers\Api\EmployeeController::class, 'getEmployeesByDivision']);
        Route::get('/subordinates/{manager_id}', [App\Http\Controllers\Api\EmployeeController::class, 'getSubordinates']);
        Route::post('/bulk-import', [App\Http\Controllers\Api\EmployeeController::class, 'bulkImport']);
        Route::get('/export', [App\Http\Controllers\Api\EmployeeController::class, 'exportEmployees']);
    });

    // Employee child resources
    Route::prefix('employees/{employee_id}')->group(function () {
        Route::apiResource('education-history', App\Http\Controllers\Api\EmployeeEducationController::class);
        Route::apiResource('certifications', App\Http\Controllers\Api\EmployeeCertificationController::class);
        Route::apiResource('professional-licenses', App\Http\Controllers\Api\EmployeeProfessionalLicenseController::class);
    });

    // Employee reports
    Route::prefix('employee-reports')->group(function () {
        Route::get('/demographics', [App\Http\Controllers\Api\EmployeeController::class, 'getDemographicsReport']);
        Route::get('/tenure', [App\Http\Controllers\Api\EmployeeController::class, 'getTenureReport']);
        Route::get('/division-distribution', [App\Http\Controllers\Api\EmployeeController::class, 'getDivisionDistributionReport']);
    });
});
