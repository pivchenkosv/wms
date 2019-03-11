<?php

namespace App\Http\Controllers;

use App\Cell;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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

    public function showInfo(Request $request)
    {
        $cellId = $request->input('cellId');
        $products = DB::table('cell_product')->join('products', 'cell_product.product_id', '=', 'products.id')->where('cell_product.cell_id', '=', $cellId)->select('name', 'volume', 'quantity')->get();
        return json_encode($products);
    }

    public function save(Request $request)
    {
        if (!$request->has('id')){
            $cell = new Cell;

        } else {
            $id = $request->input('id');
            $cell = Cell::find($id);
        }
        $cell->volume = $request->input('volume');
        $cell->status = $request->input('status');
        $cell->stock_id = $request->input('stock_id');
        $cell->save();
        $cells = Cell::all();

        return $cells->toJson();
    }

    public function delete(Request $request)
    {
        Cell::destroy($request->input('id'));
        $cells = Cell::all();

        return $cells->toJson();
    }

    public function fromCell(Request $request)
    {
        $cells = Cell::all();
        return $cells->toJson();
        //return response()->json(['success' => true, 'data' => $cells]);
    }
}
