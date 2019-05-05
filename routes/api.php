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
Route::group(['middleware' => ['jwt.auth','api-header']], function () {

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
    Route::delete('deleteUser/{user}', [
        'as' => '',
        'uses' => 'AdminController@delete'
    ])->middleware(['admin']);
    Route::middleware(['admin'])->post('register', [
        'as' => '',
        'uses' => 'Auth\RegisterController@register'
    ]);

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
    Route::delete('delProduct/{product}', [
        'as' => '',
        'uses' => 'ProductController@delete'
    ])->middleware(['manager']);
    Route::get('products/{product}', [
        'as' => 'productInfo',
        'uses' => 'ProductController@showInfo'
    ]);

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
    Route::get('cellInfo/{cell}', [
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
    Route::delete('delCell/{cell}', [
        'as' => '',
        'uses' => 'CellController@delete'
    ])->middleware(['manager']);

    //Tasks
    Route::get('tasks', [
        'as' => 'tasks',
        'uses' => 'TaskController@indexPaginate',
    ]);
    Route::get('taskInfo/{task}', [
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

    Route::delete('delTask/{task}', [
        'as' => '',
        'uses' => 'TaskController@delete'
    ])->middleware(['manager']);
    Route::post('createTasks', [
        'as' => '',
        'uses' => 'TaskController@createTasks'
    ]);

});
Route::group(['middleware' => ['api-header']], function () {

    Route::post('login', [
        'as' => '',
        'uses' => 'Auth\LoginController@login'
    ]);

    Route::post('password/email', [
        'as' => 'password.email',
        'uses' => 'Auth\ForgotPasswordController@sendResetLinkEmail'
    ]);

    Route::post('password/reset', [
        'as' => 'password.update',
        'uses' => 'Auth\ResetPasswordController@reset'
    ]);

});
Route::middleware('jwt.auth', 'api-header')->get('/user', function (Request $request) {
    return $request->user();
});
Route::get('tasksPaginated', [
    'as' => 'tasksPaginated',
    'uses' => 'TaskController@indexPaginate',
]);
Route::post('makeSubtasks', [
    'as' => '',
    'uses' => 'TaskController@makeSubtasks'
]);
Route::get('cellProducts', [
    'uses' => 'TaskController@cellProducts'
]);
Route::post('getCells', [
    'uses' => 'TaskController@getCells'
]);

Route::post('countAvailableVolumeRemaining', [
    'uses' => 'TaskController@countAvailableVolumeRemaining'
]);
