<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class AdminController extends Controller
{
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
}
