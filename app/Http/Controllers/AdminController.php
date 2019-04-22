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
        $users = User::all()->map(function ($user) {
            return collect($user)->except(['auth_token']);
        });

        return response()->json(['success' => true, 'data' => $users]);
    }

    /**
     * Delete user
     *
     * @param Request $request
     * @param $id
     * @return JsonResponse
     * @throws \Exception
     */
    public function delete(User $user){

        $user->delete();
        $users = User::all()->map(function ($user) {
            return collect($user)->except(['auth_token']);
        });

        return response()->json(['success' => true, 'data' => $users]);
    }
}
