<?php

namespace App\Http\Controllers;

use App\Cell;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CellController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct() {}

    /**
     * Cells list
     *
     * @return JsonResponse
     */
    public function showCells()
    {
        $cells = Cell::all();
        return response()->json(['success' => true, 'data' => $cells]);
    }

    /**
     * Show information about products in cell
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function showInfo(Request $request)
    {
        if ($request->has('cellId')) {
            $cellId = $request->input('cellId');
            $products = DB::table('cell_product')->join('products', 'cell_product.product_id', '=', 'products.id')->where('cell_product.cell_id', '=', $cellId)->select('name', 'volume', 'quantity')->get();
            return response()->json(['success' => true, 'data' => $products]);
        }

        return response()->json(['success' => false]);
    }

    /**
     * Create or update cell
     *
     * @param Request $request
     * @param Cell $cell
     * @return JsonResponse
     */
    public function save(Request $request, Cell $cell)
    {
        if ($request->has('id')){
            $cell = Cell::find($request->input('id'));
        }

        $request->validate([
            'stock_id' => ['required', 'exists:stocks,id'],
            'volume' => [
                'required',
                function ($attribute, $value, $fail) {
                    if ($value <= 0) {
                        $fail($attribute . ' should be no less than 1.');
                    }
                },
            ]
        ]);

        $cell->volume = $request->input('volume');
        $cell->status = $request->input('status');
        $cell->stock_id = $request->input('stock_id');

        if ($cell->save()) {
            $cells = Cell::all();
            return response()->json(['success' => true, 'data' => $cells]);
        }

        return response()->json(['success' => false]);
    }

    /**
     * Delete cell by id
     *
     * @param $id
     * @return JsonResponse
     */
    public function delete($id)
    {
        if ($id) {
            Cell::destroy($id);
            $cells = Cell::all();
            return response(['success' => true, 'data' => $cells]);
        }

        return response(['success' => false]);
    }

    /**
     * Cells list with available volume
     *
     * @return JsonResponse
     */
    public function fromCell()
    {
        $cells = DB::table('cells')
            ->leftJoin('cell_product', 'cells.id', '=', 'cell_product.cell_id')
            ->leftJoin('products', 'products.id', '=', 'cell_product.product_id')
            ->select('cells.*', DB::raw('cells.volume - SUM(cell_product.quantity * products.volume) as available_volume'))
            ->groupBy('cells.id')->get();

        return response()->json(['success' => true, 'data' => $cells]);
    }
}
