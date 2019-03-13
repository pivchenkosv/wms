<?php

namespace App\Http\Controllers;

use App\Cell;
use App\Stock;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class StockController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        $stocks = Stock::all();
        foreach ($stocks as $key => $stock) {
            $stock = array('stock' => $stock, 'cells' => array( 'in_use' => Cell::where('status', 'BUSY')->where('stock_id', $stock->id)->count(), 'quantity' => Cell::all()->where('stock_id', $stock->id)->count()));
            //$stock = (object)array_merge( (array)$stock, array( 'in_use' => Cell::where('status', 'BUSY')->where('stock_id', $stock->id)->count(), 'quantity' => Cell::all()->where('stock_id', $stock->id)->count()));
            $stocks[$key] = $stock;
        }
        return response(['success' => true, 'data' => $stocks]);
    }

//    public function save(Request $request)
//    {
//        if (!$request->has('id')){
//            $stock = new Stock;
//            $stock->location = $request->input('location');
//        } else {
//            $id = $request->input('id');
//            $updatedLocation = $request->input('location');
//            $stock = Stock::find($id);
//            $stock->location = $updatedLocation;
//        }
//        $stock->save();
//        $stocks = Stock::all();
//        foreach ($stocks as $key => $stock) {
//            $stock = array('stock' => $stock, 'cells' => array( 'in_use' => Cell::where('status', 'BUSY')->where('stock_id', $stock->id)->count(), 'quantity' => Cell::all()->where('stock_id', $stock->id)->count()));
//            //$stock = (object)array_merge( (array)$stock, array( 'in_use' => Cell::where('status', 'BUSY')->where('stock_id', $stock->id)->count(), 'quantity' => Cell::all()->where('stock_id', $stock->id)->count()));
//            $stocks[$key] = $stock;
//        }
//        return $stocks->toJson();
//    }

    public function save(Request $request, Stock $stock)
    {
        if ($request->has('id')) {
            $stock = Stock::find($request->has('id'));
        }

        $stock->location = $request->input('location');

        if ($stock->save()) {
            $stocks = Stock::all();
            if ($stocks) {
                foreach ($stocks as &$stock) {
                    $stock=$this->handle($stock);
                }
            }

            return response()->json(['success' => true, 'data' => $stocks]);
        }

        return response()->json(['failure' => true]);
    }

    function handle(Stock $stock)
    {
        return array(
            'stock' => $stock,
            'cells' => array(
                'in_use' => Cell::where('status', 'BUSY')->where('stock_id', $stock->id)->count(),
                'quantity' => Cell::all()->where('stock_id', $stock->id)->count()
            )
        );
    }

    public function delStock(Request $request)
    {
        Stock::destroy($request->input('id'));
        $stocks = Stock::all();
        foreach ($stocks as $key => $stock) {
            $stock = array('stock' => $stock, 'cells' => array( 'in_use' => Cell::where('status', 'BUSY')->where('stock_id', $stock->id)->count(), 'quantity' => Cell::all()->where('stock_id', $stock->id)->count()));
            //$stock = (object)array_merge( (array)$stock, array( 'in_use' => Cell::where('status', 'BUSY')->where('stock_id', $stock->id)->count(), 'quantity' => Cell::all()->where('stock_id', $stock->id)->count()));
            $stocks[$key] = $stock;
        }
        return response()->json(['success' => true, 'data' => $stocks]);
    }
}
