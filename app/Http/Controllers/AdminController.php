<?php

namespace App\Http\Controllers;

use App\Cell;
use App\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    /**
     * Users list
     *
     * @return JsonResponse
     */
    public function index()
    {
        $users = User::all();

        return response()->json(['success' => true, 'data' => $users]);
    }

    /**
     * Delete user
     *
     * @return JsonResponse
     */
    public function delete(Request $request, $id){

        User::destroy($id);
        $users = User::all();

        return response()->json(['success' => true, 'data' => $users]);
    }
}
