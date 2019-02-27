<?php

use Illuminate\Http\Request;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::get('admin/users', [
    'as' => 'users',
    'uses' => 'AdminController@index'
]);
//Route::get('admin/users/{id}', 'AdminController@show');
Route::get('login', [
    'as' => 'login',
    'uses' => 'Auth\LoginController@showLoginForm'
]);
Route::post('login', [
    'as' => '',
    'uses' => 'Auth\LoginController@login'
]);
Route::post('register', [
    'as' => '',
    'uses' => 'Auth\RegisterController@register'
]);
Route::post('deleteUser', [
    'as' => '',
    'uses' => 'AdminController@delete'
]);
Route::get('cells', [
    'as' => 'cells',
    'uses' => 'CellController@showCells'
]);
Route::get('products', [
    'as' => 'products',
    'uses' => 'ProductController@index'
]);
Route::get('stocks', [
    'as' => 'stocks',
    'uses' => 'StockController@index'
]);
Route::get('tasks', [
    'as' => 'tasks',
    'uses' => 'TaskController@index',
]);
