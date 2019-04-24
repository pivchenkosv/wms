<?php

namespace App\Http\Controllers;

use App\Cell;
use App\Stock;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class StockController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct() {}

    /**
     * Stocks list
     *
     * @return JsonResponse
     */
    public function index()
    {
        $stocks = Stock::all();

        foreach ($stocks as $key => $stock) {
            $stock = array('stock' => $stock, 'cells' => array(
                'in_use' => Cell::where('status', 'BUSY')
                    ->where('stock_id', $stock->id)
                    ->count(),
                'quantity' => Cell::all()
                    ->where('stock_id', $stock->id)
                    ->count()));
            $stocks[$key] = $stock;
        }

        return response(['success' => true, 'data' => $stocks]);
    }

    /**
     * Create or update stock
     *
     * @param Request $request
     * @param Stock $stock
     * @return JsonResponse
     */
    public function save(Request $request, Stock $stock)
    {
        if ($request->has('id')) {
            $stock = Stock::find($request->input('id'));
        }

        $request->validate([
           'location' => ['required']
        ]);

        $stock->location = $request->input('location');

        if ($stock->save()) {
            $stocks = Stock::all();
            if ($stocks) {
                foreach ($stocks as $key => $stock) {
                    $stock=$this->handle($stock);
                    $stocks[$key] = $stock;
                }
            }

            return response()->json(['success' => true, 'data' => $stocks]);
        }

        return response()->json(['failure' => true]);
    }

    /**
     * Make an array with stocks and cells are being in use and their total quantity in $stock
     *
     * @param Stock $stock
     * @return array
     */
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

    /**
     * Delete stock by id
     *
     * @param $id
     * @return JsonResponse
     */
    public function delStock($id)
    {
        Stock::destroy($id);
        $stocks = Stock::all();
        foreach ($stocks as $key => $stock) {
            $stock = $this->handle($stock);
            $stocks[$key] = $stock;
        }
        return response()->json(['success' => true, 'data' => $stocks]);
    }
}
