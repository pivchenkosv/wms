<?php

namespace App\Http\Controllers;

use App\Mail\TaskCreated;
use App\Subtask;
use App\Task;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

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
        $subtasks = DB::table('subtasks')->join('tasks', 'subtasks.task_id', '=', 'tasks.id')->where('subtasks.task_id', '=', $taskId)->select('subtasks.id', 'from_cell', 'to_cell', 'product_id', 'quantity')->get();
        return json_encode($subtasks);
    }

    public function save(Request $request)
    {
        if (!$request->has('id')){
            $task = new Task;
        } else {
            $id = $request->input('id');
            $task  = Task::find($id);
        }
        $task->assigned_user = $request->input('assigned_user');
        $task->description = $request->input('description');
        $task->at = $request->input('at');
        $task->created_by = Auth::user()->id;
        $task ->save();
        //$subtasks = Subtask::where('task_id', $task->id);
        $subtasks = json_decode($request->input('subtasks'));
        foreach ($subtasks as $st) {
            if ($st->id > 0) {
                $subtask = Subtask::find($st->id);
            } else {
                $subtask = new Subtask;
                $subtask->task_id = $task->id;

            }
            $subtask->from_cell = $st->from_cell;
            $subtask->to_cell = $st->to_cell;
            $subtask->product_id = $st->product_id;
            $subtask->quantity = $st->quantity;
            $subtask->save();
        }

        $this->notifyWorker($task);

        return response()->json(['success' => true, 'data' => $subtasks]);
    }

    public function delete(Request $request)
    {
        $id = $request->input('id');
        Subtask::where('task_id', $id)->delete();
        Task::destroy($id);
        $tasks = Task::all();

        return response()->json($tasks);
    }

    public function notifyWorker()
    {
        $user = User::find(10);
        $task = Task::find(3);

        return new TaskCreated($task, $user->name);
//        Mail::to($user->email)->send(new TaskCreated($task, $user->name));
    }
}
