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
Route::middleware(['auth', 'admin'])->get('admin/users', [
    'as' => 'users',
    'uses' => 'AdminController@index'
]);
Route::post('login', [
    'as' => '',
    'uses' => 'Auth\LoginController@login'
])->middleware('guest');
Route::post('logout', [
    'as' => 'logout',
    'uses' => 'Auth\LoginController@logout'
])->middleware('auth');
Route::post('register', [
    'as' => '',
    'uses' => 'Auth\RegisterController@register'
])->middleware(['auth', 'admin']);
Route::delete('deleteUser/{id}', [
    'as' => '',
    'uses' => 'AdminController@delete'
])->middleware(['auth', 'admin']);
Route::get('cells', [
    'as' => 'cells',
    'uses' => 'CellController@showCells'
])->middleware('auth');
Route::get('products', [
    'as' => 'products',
    'uses' => 'ProductController@index'
])->middleware('auth');
Route::get('stocks', [
    'as' => 'stocks',
    'uses' => 'StockController@index'
])->middleware('auth');
Route::put('editStock', [
    'as' => '',
    'uses' => 'StockController@save'
])->middleware(['auth', 'manager']);
Route::delete('delStock/{id}', [
    'as' => '',
    'uses' => 'StockController@delStock'
])->middleware(['auth', 'manager']);
Route::get('cellInfo', [
    'as' => 'cellInfo',
    'uses' => 'CellController@showInfo'
])->middleware('auth');
Route::get('fromCell', [
    'as' => 'fromCell',
    'uses' => 'CellController@fromCell'
])->middleware(['auth', 'manager']);
Route::put('editCell', [
    'as' => '',
    'uses' => 'CellController@save'
])->middleware(['auth', 'manager']);
Route::delete('delCell/{id}', [
    'as' => '',
    'uses' => 'CellController@delete'
])->middleware(['auth', 'manager']);
Route::put('editProduct', [
    'as' => '',
    'uses' => 'ProductController@save'
])->middleware(['auth', 'manager']);
Route::delete('delProduct/{id}', [
    'as' => '',
    'uses' => 'ProductController@delete'
])->middleware(['auth', 'manager']);
Route::get('tasks', [
    'as' => 'tasks',
    'uses' => 'TaskController@index',
])->middleware('auth');
Route::get('taskInfo', [
    'as' => 'taskInfo',
    'uses' => 'TaskController@showTaskInfo',
])->middleware('auth');
Route::put('editTask', [
    'as' => '',
    'uses' => 'TaskController@save'
])->middleware(['auth', 'manager']);
Route::delete('delTask/{id}', [
    'as' => '',
    'uses' => 'TaskController@delete'
])->middleware(['auth', 'manager']);
Route::post('completeTask', [
    'as' => '',
    'uses' => 'TaskController@completeTask'
])->middleware('auth');
//Route::get('taskCreated', [
//    'as' => 'taskCreated',
//    'uses' => 'TaskController@notifyWorker'
//])->middleware('auth');
//Route::get('reports', [
//    'as' => 'reports',
//    'uses' => 'ReportController@index'
//])->middleware('auth');
Route::get('reports', [
    'as' => 'reports',
    'uses' => 'ReportController@indexPaginate'
])->middleware('auth');

Route::post('password/email', [
    'as' => 'password.email',
    'uses' => 'Auth\ForgotPasswordController@sendResetLinkEmail'
]);
