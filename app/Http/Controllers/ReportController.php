<?php

namespace App\Http\Controllers;

use App\Report;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ReportController extends Controller
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
     * Reports list
     *
     * @return JsonResponse
     */
    public function index()
    {
        $reports = Report::all();

        return response()->json(['success' => true, 'data' => $reports]);
    }

    /**
     * Paginated reports list
     *
     * @return JsonResponse
     */
    public function indexPaginate()
    {
        $reports = Report::paginate(30);

        return response()->json(['success' => true, 'data' => $reports]);
    }
}
