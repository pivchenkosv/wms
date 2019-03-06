<?php

namespace App\Http\Controllers;

use App\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TaskController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        $tasks = Task::all();
        return $tasks->toJson();
    }

    public function showTaskInfo(Request $request)
    {
        $taskId = $request->input('taskId');
        $subtasks = DB::table('subtasks')->join('tasks', 'subtasks.task_id', '=', 'tasks.id')->where('subtasks.task_id', '=', $taskId)->select('from_cell', 'to_cell', 'product_id', 'quantity')->get();
        return json_encode($subtasks);
    }
}
