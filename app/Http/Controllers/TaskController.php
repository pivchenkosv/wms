<?php

namespace App\Http\Controllers;

use App\Mail\TaskCreated;
use App\Report;
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
        $tasks = Task::where('status', '!=', 'REMOVED')->get();
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
        $action = '';
        if (!$request->has('id')){
            $task = new Task;
            $action = 'TASK_CREATED';
        } else {
            $id = $request->input('id');
            $task  = Task::find($id);
            $action = 'TASK_UPDATED';
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
        $this->makeReport($task, $action);

        return response()->json(['success' => true, 'data' => $subtasks]);
    }

    public function delete(Request $request)
    {
        $id = $request->input('id');
//        Subtask::where('task_id', $id)->delete();
//        Task::destroy($id);
        $task = Task::find($id);
        $task->status = 'REMOVED';
        $task->save();

        $this->makeReport($task, 'TASK_REMOVED');

        $tasks = Task::where('status', '!=', 'REMOVED')->get();
        return response()->json($tasks);
    }

    public function notifyWorker($task)
    {
        $user = User::find($task->assigned_user);

        Mail::to($user->email)->send(new TaskCreated($task, $user->name));
        return new TaskCreated($task, $user->name);
    }

    private function makeReport($task, $action)
    {
        $report = new Report;
        $report->created_by = Auth::user()->id;
        $report->action = $action;
        $report->task_id = $task->id;
        $report->save();
    }

    public function completeTask(Request $request)
    {
        $id = $request->input('id');
        $task = Task::find($id);
        $task->status = 'COMPLETED';
        $task->save();

        $this->makeReport($task, 'TASK_COMPLETED');

        $tasks = Task::where('status', '!=', 'REMOVED')->get();
        return response()->json($tasks);
    }
}
