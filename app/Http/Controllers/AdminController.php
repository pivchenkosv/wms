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

        return response()->json(['success' => true, 'data' => $users]);
    }

    public function delete(Request $request){
        if ($request->has('id')) {
            User::destroy($request->input('id'));
        }

        $users = User::all();

        return response()->json(['success' => true, 'data' => $users]);
    }
}
