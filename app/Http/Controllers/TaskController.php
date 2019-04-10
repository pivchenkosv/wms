<?php

namespace App\Http\Controllers;

use App\Cell;
use App\Mail\TaskCreated;
use App\Mail\TaskUpdated;
use App\Product;
use App\Report;
use App\Subtask;
use App\Task;
use App\User;
use ArrayIterator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class TaskController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
    }

    /**
     * List with not REMOVED tasks
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $tasks = Task::where('status', '!=', 'REMOVED')->get();

        return response()->json($tasks);
    }

    /**
     * Paginated list with not REMOVED tasks
     * @return \Illuminate\Http\JsonResponse
     */
    public function indexPaginate()
    {
        $tasks = Task::where('status', '!=', 'REMOVED')->orderBy('at', 'desc')->paginate(15);

        return response()->json($tasks);
    }

    /**
     * List with subtasks for selected task
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function showTaskInfo(Request $request)
    {
        $taskId = $request->input('taskId');

        $subtasks = DB::table('subtasks')
            ->join('tasks', 'subtasks.task_id', '=', 'tasks.id')
            ->where('subtasks.task_id', '=', $taskId)
            ->select('subtasks.id', 'from_cell', 'to_cell', 'product_id', 'quantity')
            ->get();

        return response()->json($subtasks);
    }

    /**
     * Create or update task
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function save(Request $request)
    {
        //Validate input values
        $validator = Validator::make($request->all(), [
            'assigned_user' => ['required', 'numeric', 'exists:users,id'],
            'at' => ['required', 'date', 'after:now'],
        ]);
        $validator->validate();
        $subtasks = json_decode($request->input('subtasks'));

        foreach ($subtasks as $subtask) {
            $subtasksValidator = Validator::make((array)$subtask, [
                'from_cell' => ['exists:cells,id'],
                'to_cell' => ['exists:cells,id'],
                'product_id' => ['exists:products,id'],
                'quantity' => [
                    'required',
                    function ($attribute, $value, $fail) {
                        if ($value <= 0) {
                            $fail($attribute . ' is invalid.');
                        }
                    },
                ]
            ]);
            $subtasksValidator->validate();
        }

        //Determine to create new or update existing task. Set appropriate action
        if (!$request->has('id')) {
            $task = new Task;
            $action = 'TASK_CREATED';
        } else {
            $id = $request->input('id');
            $task = Task::find($id);
            $action = 'TASK_UPDATED';
        }

        //Initialize or rewrite task fields and persist to database
        $task->assigned_user = $request->input('assigned_user');
        $task->description = $request->input('description');
        $task->at = $request->input('at');
        $task->created_by = Auth::user()->id;
        $task->save();

        //handle subtasks
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

        //Notify worker about task changes and make report
        $this->notifyWorker($task, $action);
        $this->makeReport($task, $action);

        return response()->json(['success' => true, 'data' => $subtasks]);
    }

    /**
     * Change task status to REMOVED
     *
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function delete($id)
    {
        $task = Task::find($id);
        $task->status = 'REMOVED';
        $task->save();

        $this->makeReport($task, 'TASK_REMOVED');

        $tasks = Task::where('status', '!=', 'REMOVED')->get();

        return response()->json($tasks);
    }

    /**
     * Delete inappropriate subtasks
     * @param $subtasks
     * @param $id
     */
    public function deleteSubtasks($subtasks, $id)
    {
        $subtasksDB = Subtask::where('task_id', $id)->get();
        foreach ($subtasksDB as $subtaskDB) {
            if (!$this->isInArray($subtaskDB, $subtasks)) {
                Subtask::destroy($subtaskDB->id);
            }
        }
    }

    /**
     * Check whether second array parameter contains first or not
     * @param $subtaskDB
     * @param $subtasks
     * @return bool
     */
    private function isInArray($subtaskDB, $subtasks)
    {
        foreach ($subtasks as $subtask) {
            if ($subtask->id === $subtaskDB->id) {
                return true;
            }
        }
        return false;
    }

    /**
     * Send mail to worker about task changes
     * @param $task
     * @param $action
     */
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

    /**
     * Make report about task changes
     * @param $task
     * @param $action
     */
    private function makeReport($task, $action)
    {
        $report = new Report;
        $report->created_by = Auth::user()->id;
        $report->action = $action;
        $report->task_id = $task->id;
        $report->save();
    }

    /**
     * Handle task completion
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
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

    /**
     * Increase and decrease quantity of product in cells with ids are equal to values in $subtask->to_cell and $subtask->from_cell fields accordingly
     * @param $subtask
     * @return void
     */
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

    /**
     * Create tasks for multiple users
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse|\Illuminate\Support\MessageBag
     */
    public function createTasks(Request $request)
    {
        $userIds = json_decode($request->input('userIds'));
        $validator = Validator::make([
            'at' => $request->input('at'),
            'userIds' => $userIds
        ], [
            'userIds' => ['required', 'array'],
            'userIds.*' => ['exists:users,id'],
            'at' => ['required', 'date', 'after:now'],
        ]);
        if ($validator->fails()) {
            return $validator->errors();
        }

        $taskType = $request->input('taskType');
        $products = json_decode($request->input('products'));
        $opts = ['description' => $request->input('description'), 'at' => $request->input('at')];

        $returnedArray = $this->makeSubtasks($taskType, $products);
        $subtasks = $returnedArray['subtasks'];
        $message = $returnedArray['message'];

        $id = new ArrayIterator($userIds);
        $subtasksForUsers = [];
        foreach ($subtasks as $subtask) {
            $subtasksForUsers[$id->current()][] = $subtask;
            $id->next();
            if (!$id->valid())
                $id->rewind();
        }

        $tasks = [];
        foreach ($subtasksForUsers as $id => $subtasksForUser) {
            $tasks[] = $this->makeTask($id, $subtasksForUser, $opts);
        }

        return response()->json(['success' => true, 'message' => $message]);

    }

    /**
     * Create subtasks according to $taskType (acceptance or shipment)
     * $products is an array of product_id and quantity
     * @param $taskType
     * @param array $products
     * @return array
     */
    public function makeSubtasks($taskType, $products)
    {
        $subtasks = [];
        $message = 'Success!';

        foreach ($products as $product) {
            $productDB = Product::find($product->product_id);
            $cells = $this->getCells($taskType, $product->product_id);
            $productQuantityRemaining = $product->quantity;

            foreach ($cells as $cell) {
                $tracker['order'][] = $cell->id;
                if ($taskType === 'acceptance') {
                    $cellVolume = $this->countAvailableVolumeRemaining($cell, $subtasks);

                    if ($cellVolume <= 0) {
                        $tracker['skippedCV'][] = $cell->id;
                        continue;
                    }
                }


                $quantity = $taskType === 'acceptance' ? intdiv($cellVolume, $productDB->volume) : $cell->available_quantity;
                if ($productQuantityRemaining <= 0) {
                    $tracker['skippedPQR'][] = $cell->id;
                    break 1;
                }
                if ($quantity <= 0) {
                    $tracker['skippedQt'][] = $cell->id;
                    continue;
                }

                $subtask = [
                    'from_cell' => $taskType === 'acceptance' ? 1 : $cell->id,
                    'to_cell' => $taskType === 'shipment' ? 1 : $cell->id,
                    'product_id' => $product->product_id,
                    'quantity' => $productQuantityRemaining < $quantity ?
                        $productQuantityRemaining :
                        $quantity,
                ];
                $productQuantityRemaining -= $quantity;
                $subtasks[] = $subtask;

            }

            if ($productQuantityRemaining > 0)
                switch ($taskType) {
                    case 'acceptance':
                        $message = 'Out of storage!';
                        break;
                    case 'shipment':
                        $message = 'Out of products!';
                        break;
                }

        }

        return ['subtasks' => $subtasks, 'message' => $message];
    }

    /**
     * Count an available volume of cell.
     * Cell volume -
     * - volume of products located in cell -
     * - volume of products that should be placed to this cell
     * according to tasks with status OPENED and recently created subtasks
     * @param $cell
     * @param $subtasks
     * @return float|int|mixed
     */
    private function countAvailableVolumeRemaining($cell, $subtasks)
    {
        $openedSubtasksVolume = DB::table('subtasks')
            ->where('tasks.status', '=', 'OPENED')
            ->where('subtasks.to_cell', $cell->id)
            ->leftJoin('products', 'products.id', '=', 'subtasks.product_id')
            ->leftJoin('tasks', 'tasks.id', '=', 'subtasks.task_id')
            ->select('subtasks.to_cell',
                DB::raw('sum(subtasks.quantity * products.volume) as volume')
            )
            ->groupBy('subtasks.to_cell')
            ->value('volume');
        $availableVolume = $cell->available_volume - $openedSubtasksVolume;
        foreach ($subtasks as $subtask) {
            if ($cell->id == $subtask['to_cell']) {
                $product = Product::find($subtask['product_id']);
                $availableVolume -= $subtask['quantity'] * $product->volume;
            }
        }

        return $availableVolume;
    }

    /**
     * Make task for user and init it with subtasks
     * @param $userId
     * @param $subtasksForUser
     * @param array $opts
     * @return array
     */
    private function makeTask($userId, $subtasksForUser, $opts = [])
    {
        $task = new Task;
        $task->assigned_user = $userId;
        $task->description = $opts['description'];
        $task->at = $opts['at'];
        $task->created_by = Auth::user()->id;
        $task->save();

        foreach ($subtasksForUser as $subtaskForUser) {
            $subtask = new Subtask;
            $subtask->task_id = $task->id;
            $subtask->from_cell = $subtaskForUser['from_cell'];
            $subtask->to_cell = $subtaskForUser['to_cell'];
            $subtask->product_id = $subtaskForUser['product_id'];
            $subtask->quantity = $subtaskForUser['quantity'];
            $subtask->save();
        }

        return [$task, Subtask::where('task_id', '=', $task->id)];
    }

    /**
     * Return cells in priority order according to task type
     * @param $taskType
     * @param $productId
     * @return \Illuminate\Support\Collection
     */
    public function getCells($taskType, $productId)
    {
        switch ($taskType) {
            case 'acceptance':
                {

                    $cells = DB::table('cells')
                        ->leftJoin('cell_product', 'cells.id', '=', 'cell_product.cell_id')
                        ->leftJoin('products', 'products.id', '=', 'cell_product.product_id')
                        ->select('cells.*',
                            DB::raw('ifnull(cells.volume - SUM(cell_product.quantity * products.volume), cells.volume) as available_volume')
                        )
                        ->where('cells.status', '!=', 'RESERVED')
                        ->orWhereRaw('cells.id not in(select distinct(cell_product.cell_id) as ids from cell_product)')
                        ->orderBy('available_volume', 'asc')
                        ->groupBy('cells.id')
                        ->get();

                    return $cells;
                }
            case 'shipment':
                {
                    $cells = DB::table('cells')
                        ->leftJoin('cell_product', 'cells.id', '=', 'cell_product.cell_id')
                        ->leftJoin('products', 'products.id', '=', 'cell_product.product_id')
                        ->select('cells.*', DB::raw('cell_product.quantity as available_quantity'))
                        ->where('cells.status', '!=', 'RESERVED')
                        ->where('cell_product.product_id', $productId)
                        ->orderBy('available_quantity', 'asc')
                        ->get();

                    return $cells;
                }
            default: return Cell::all();
        }

    }
}
