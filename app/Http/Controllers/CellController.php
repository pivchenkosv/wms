<?php

namespace App\Http\Controllers;

use App\Cell;
use Illuminate\Http\Request;

class CellController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function showCells()
    {
        $cells = Cell::all();
        return $cells->toJson();
    }
}
