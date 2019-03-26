<?php

namespace App\Http\Controllers;

use App\Cell;
use App\User;
use Illuminate\Http\Request;

class AdminController extends Controller
{

    public function index()
    {
        $users = User::all();

        return response()->json(['success' => true, 'data' => $users]);
    }

    public function delete(Request $request, $id){

        User::destroy($id);
        $users = User::all();

        return response()->json(['success' => true, 'data' => $users]);
    }
}
