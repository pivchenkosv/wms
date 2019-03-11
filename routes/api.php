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
Route::post('editStock', [
    'as' => '',
    'uses' => 'StockController@save'
]);
Route::post('delStock', [
    'as' => '',
    'uses' => 'StockController@delStock'
]);
Route::get('cellInfo', [
    'as' => 'cellInfo',
    'uses' => 'CellController@showInfo'
]);
Route::get('fromCell', [
    'as' => 'fromCell',
    'uses' => 'CellController@fromCell'
]);
Route::post('editCell', [
    'as' => '',
    'uses' => 'CellController@save'
]);
Route::post('delCell', [
    'as' => '',
    'uses' => 'CellController@delete'
]);
Route::post('editProduct', [
    'as' => '',
    'uses' => 'ProductController@save'
]);
Route::post('delProduct', [
    'as' => '',
    'uses' => 'ProductController@delete'
]);
Route::get('tasks', [
    'as' => 'tasks',
    'uses' => 'TaskController@index',
]);
Route::get('taskInfo', [
    'as' => 'taskInfo',
    'uses' => 'TaskController@showTaskInfo',
]);
Route::post('editTask', [
    'as' => '',
    'uses' => 'TaskController@save'
]);
Route::post('delTask', [
    'as' => '',
    'uses' => 'TaskController@delete'
]);
