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
Route::group(['middleware' => ['auth']], function () {

    //Reports
    Route::get('reports', [
        'as' => 'reports',
        'uses' => 'ReportController@indexPaginate'
    ]);

    //Admin
    Route::middleware(['admin'])->get('admin/users', [
        'as' => 'users',
        'uses' => 'AdminController@index'
    ]);
    Route::delete('deleteUser/{id}', [
        'as' => '',
        'uses' => 'AdminController@delete'
    ])->middleware(['admin']);
    Route::post('register', [
        'as' => '',
        'uses' => 'Auth\RegisterController@register'
    ])->middleware(['admin']);

    //Logout
    Route::post('logout', [
        'as' => 'logout',
        'uses' => 'Auth\LoginController@logout'
    ]);

    //Products
    Route::get('products', [
        'as' => 'products',
        'uses' => 'ProductController@index'
    ]);
    Route::put('editProduct', [
        'as' => '',
        'uses' => 'ProductController@save'
    ])->middleware(['manager']);
    Route::delete('delProduct/{id}', [
        'as' => '',
        'uses' => 'ProductController@delete'
    ])->middleware(['manager']);

    //Stocks
    Route::get('stocks', [
        'as' => 'stocks',
        'uses' => 'StockController@index'
    ]);
    Route::put('editStock', [
        'as' => '',
        'uses' => 'StockController@save'
    ])->middleware(['manager']);
    Route::delete('delStock/{id}', [
        'as' => '',
        'uses' => 'StockController@delStock'
    ])->middleware(['manager']);

    //Cells
    Route::get('cells', [
        'as' => 'cells',
        'uses' => 'CellController@showCells'
    ]);
    Route::get('cellInfo', [
        'as' => 'cellInfo',
        'uses' => 'CellController@showInfo'
    ]);
    Route::get('fromCell', [
        'as' => 'fromCell',
        'uses' => 'CellController@fromCell'
    ])->middleware(['manager']);
    Route::put('editCell', [
        'as' => '',
        'uses' => 'CellController@save'
    ])->middleware(['manager']);
    Route::delete('delCell/{id}', [
        'as' => '',
        'uses' => 'CellController@delete'
    ])->middleware(['manager']);

    //Tasks
    Route::get('tasks', [
        'as' => 'tasks',
        'uses' => 'TaskController@index',
    ]);
    Route::get('taskInfo', [
        'as' => 'taskInfo',
        'uses' => 'TaskController@showTaskInfo',
    ]);
    Route::post('completeTask', [
        'as' => '',
        'uses' => 'TaskController@completeTask'
    ]);
    Route::put('editTask', [
        'as' => '',
        'uses' => 'TaskController@save'
    ])->middleware(['manager']);
    Route::delete('delTask/{id}', [
        'as' => '',
        'uses' => 'TaskController@delete'
    ])->middleware(['manager']);

});
Route::group(['middleware' => ['guest']], function () {

    Route::post('login', [
        'as' => '',
        'uses' => 'Auth\LoginController@login'
    ])->middleware('guest');

    Route::post('password/email', [
        'as' => 'password.email',
        'uses' => 'Auth\ForgotPasswordController@sendResetLinkEmail'
    ]);

    Route::post('password/reset', [
        'as' => 'password.update',
        'uses' => 'Auth\ResetPasswordController@reset'
    ]);

});
Route::middleware('auth')->get('/user', function (Request $request) {
    return $request->user();
});