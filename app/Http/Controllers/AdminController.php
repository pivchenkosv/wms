<?php

namespace App\Http\Controllers;

use App\Cell;
use App\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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

        $cellsAvailableVolume = 0;
        $cells = DB::table('cells')
            ->where('status', '!=', 'RESERVED')
            ->leftJoin('cell_product', 'cells.id', '=', 'cell_product.cell_id')
            ->leftJoin('products', 'products.id', '=', 'cell_product.product_id')
            ->select('cells.*', DB::raw('ifnull(cells.volume - sum(cell_product.quantity * products.volume), cells.volume) as available_volume'))
            ->groupBy('cells.id', 'cells.volume')->get();
        foreach ($cells as $cell)
            $cellsAvailableVolume += $cell->available_volume;
        $openedSubtasksVolume = DB::table('subtasks')
            ->where('tasks.status', '=', 'OPENED')
            ->where('cells.status', '!=', 'RESERVED')
            ->leftJoin('cells', 'cells.id', '=', 'subtasks.to_cell')
            ->leftJoin('products', 'products.id', '=', 'subtasks.product_id')
            ->leftJoin('tasks', 'tasks.id', '=', 'subtasks.task_id')
            ->select(
                DB::raw('sum(subtasks.quantity * products.volume) as volume')
            )
            ->groupBy('subtasks.to_cell')
            ->get();
//        return response()->json(['success' => true, 'data' => $users, 'volume' => $cellsAvailableVolume]);
        foreach ($openedSubtasksVolume as $volume)
            $cellsAvailableVolume -= $volume->volume;

        return response()->json(['success' => true, 'data' => $users, 'volume' => $cellsAvailableVolume, 'openedSubtasksVolume' => $openedSubtasksVolume]);
    }

    /**
     * Delete user
     *
     * @param User $user
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

    public function usersRating(){
        $users = User::where('role', '=', 'ROLE_WORKER')
            ->select('id', 'name')
            ->withCount('tasks', 'subtasks')->get();

        return  response()->json(['success' => true, 'data' => $users]);
    }
}
