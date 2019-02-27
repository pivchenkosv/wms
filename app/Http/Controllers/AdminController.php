<?php

namespace App\Http\Controllers;

use App\Cell;
use App\User;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth', 'admin']);
    }

    public function index()
    {
        $users = User::all();

        return $users->toJson();
    }

    public function show($id)
    {
        $user = User::all()->find($id);

        return $user->toJson();
    }

    public function delete(Request $request){
        $id = $request->input('id');
        User::destroy($id);

        $user = User::all();

        return $user->toJson();
    }

    public function showCells()
    {
        $cells = Cell::all();
        return $cells->toJson();
    }
}
