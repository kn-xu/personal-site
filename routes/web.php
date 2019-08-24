<?php

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

Route::any('{path?}', function () {
    return view('welcome');
})->where("all", "^((?!api).)*");

Route::get("api/user", "UserController@client");

Route::get("api/heartbeats", "HeartbeatsController@get");
//Route::post("api/heartbeat", "HeartbeatController@get");
//Route::put("api/heartbeat", "HeartbeatController@get");
//Route::delete("api/heartbeat", "HeartbeatController@get");