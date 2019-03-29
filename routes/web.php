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

// Password Reset Routes...

//Route::get('password/reset', [
//    'as' => 'password.request',
//    'uses' => 'Auth\ForgotPasswordController@showLinkRequestForm'
//]);
//Route::post('password/reset', [
//    'as' => 'password.update',
//    'uses' => 'Auth\ResetPasswordController@reset'
//]);
Route::get('password/reset/{token}', [
    'as' => 'password.reset',
    'uses' => 'Auth\ResetPasswordController@showResetForm'
]);

Route::view('/{any?}', 'app');
Route::view('/admin/users', 'app');
Route::view('/password/reset', 'app');
