<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\OAuthController;
use App\Http\Controllers\StorageController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::group(['prefix' => 'storage', 'middleware' => ['auth']], function () {
    Route::get('/{any?}', [StorageController::class, 'redirect'])->where('any', '.*');
});

Route::group([
    'prefix' => 'oauth',
], function () {
    Route::get('/authorize', [OAuthController::class, 'authorize'])
        ->name('authorizations.authorize')
        ->middleware(["web", 'auth']);

    Route::get('/mfa-bind', [OAuthController::class, 'mfabind'])
        ->name('authorizations.mfabind')
        ->middleware(["web", 'auth']);

    Route::post('/mfa-bind', [OAuthController::class, 'mfaconfirm'])
        ->name('authorizations.mfaconfirm')
        ->middleware(["web", 'auth']);

    Route::post('/user', [OAuthController::class, 'user'])
        ->name('authorizations.me')
        ->middleware(["web", 'auth:api']);

    Route::post('/logout', [OAuthController::class, 'logout'])
        ->name('authorizations.logout')
	->middleware(["web"]);
});

Route::get('/auth/{path?}', function () {
    return view('index');
})->name('auth')->middleware('guest');

Route::middleware(['auth:sanctum', 'guardMFA', 'guardResetPass'])->group(function () {
    Route::get('/{path?}', function () {
        return view('index');
    })->where('path', '^((?!api|auth|scan|admin|docs|storage|favicons|\.well-known).)*$');
});
