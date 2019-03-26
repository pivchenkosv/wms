<?php

namespace App\Http\Controllers;

use App\Report;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    public function __construct() {}

    public function index()
    {
        $reports = Report::all();
        return response()->json(['success' => true, 'data' => $reports]);
    }

    public function indexPaginate() {
        $reports = Report::paginate(30);
        return response()->json(['success' => true, 'data' => $reports]);
//        return view('report.index', ['reports' => $reports]);
    }
}
