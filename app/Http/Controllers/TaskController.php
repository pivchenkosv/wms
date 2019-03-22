<?php

namespace App\Http\Controllers;

use App\Cell;
use App\Mail\TaskCreated;
use App\Mail\TaskUpdated;
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
        if (!$request->has('id')) {
            $task = new Task;
            $action = 'TASK_CREATED';
        } else {
            $id = $request->input('id');
            $task = Task::find($id);
            $action = 'TASK_UPDATED';
        }
        $task->assigned_user = $request->input('assigned_user');
        $task->description = $request->input('description');
        $task->at = $request->input('at');
        $task->created_by = Auth::user()->id;
        $task->save();

//        Subtask::where('task_id', $task->id)->delete();
        $subtasks = json_decode($request->input('subtasks'));

        $this->deleteSubtasks($subtasks, $task->id);

        foreach ($subtasks as $st) {
            $subtask = null;
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

        $this->notifyWorker($task, $action);
        $this->makeReport($task, $action);

        return response()->json(['success' => true, 'data' => $subtasks]);
    }

    public function delete(Request $request)
    {
        $id = $request->input('id');

        $task = Task::find($id);
        $task->status = 'REMOVED';
        $task->save();

        $this->makeReport($task, 'TASK_REMOVED');

        $tasks = Task::where('status', '!=', 'REMOVED')->get();
        return response()->json($tasks);
    }

    public function deleteSubtasks($subtasks, $id) {
        $subtasksDB = Subtask::where('task_id', $id)->get();
        foreach ($subtasksDB as $subtaskDB) {
            if (!$this->isInArray($subtaskDB, $subtasks))
            {
                Subtask::destroy($subtaskDB->id);
            }
        }
    }

    private function isInArray($subtaskDB, $subtasks) {
        foreach ($subtasks as $subtask) {
            if ($subtask->id === $subtaskDB->id) {
                return true;
            }
        }
        return false;
    }

    public function notifyWorker($task, $action)
    {
        $user = User::find($task->assigned_user);

        switch ($action) {
            case 'TASK_CREATED':
                Mail::to($user->email)->send(new TaskCreated($task, $user->name));
                break;
            case 'TASK_UPDATED':
                Mail::to($user->email)->send(new TaskUpdated($task, $user->name));
                break;
        }
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

        $subtasks = Subtask::where('task_id', $id)->get();

        if ($subtasks) {
            foreach ($subtasks as $subtask) {
                $this->handleSubtask($subtask);
            }
        }

        $tasks = Task::where('status', '!=', 'REMOVED')->get();
        return response()->json($tasks);
    }

    private function handleSubtask($subtask)
    {
        $cell = Cell::find($subtask->from_cell);
        if ($cell->status !== 'RESERVED') {
            //decrease product quantity in cell_product table
            $productQuantity = DB::table('cell_product')
                ->where('cell_id', $subtask->from_cell)
                ->where('product_id', $subtask->product_id)
                ->pluck('quantity')
                ->get(0);
            DB::table('cell_product')
                ->where('cell_id', $subtask->from_cell)
                ->where('product_id', $subtask->product_id)
                ->update(['quantity' => $productQuantity - $subtask->quantity]);

            if ($productQuantity === $subtask->quantity) {
                DB::table('cell_product')
                    ->where('cell_id', $subtask->from_cell)
                    ->where('product_id', $subtask->product_id)
                    ->delete();
            }
        }

        $cell = Cell::find($subtask->to_cell);
        if ($cell->status !== 'RESERVED') {
            //increase product quantity in cell_product table
            $productQuantity = DB::table('cell_product')
                ->where('cell_id', $subtask->to_cell)
                ->where('product_id', $subtask->product_id)
                ->pluck('quantity')
                ->get(0);
            DB::table('cell_product')
                ->when($productQuantity, function ($query, $productQuantity) use ($subtask) {
                    return $query
                        ->where('cell_id', $subtask->to_cell)
                        ->where('product_id', $subtask->product_id)
                        ->update(['product_id' => $subtask->product_id, 'cell_id' => $subtask->to_cell, 'quantity' => $productQuantity + $subtask->quantity]);
                }, function ($query) use ($subtask) {
                    return $query->insert(['product_id' => $subtask->product_id, 'cell_id' => $subtask->to_cell, 'quantity' => $subtask->quantity]);
                });
        }
    }
}
