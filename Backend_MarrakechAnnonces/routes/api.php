<?php

use Illuminate\Http\Request;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/lista',[\App\Http\Controllers\AnnoncesController::class,'lista']);

Route::apiResource('annonces',\App\Http\Controllers\AnnoncesController::class);

Route::apiResource('membres',\App\Http\Controllers\MembresController::class);

Route::apiResource('categorieAnnonces',\App\Http\Controllers\categorieAnnoncesController::class);

Route::apiResource('typeAnnonces',\App\Http\Controllers\TypeAnnoncesController::class);
