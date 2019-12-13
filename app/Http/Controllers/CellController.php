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
    public function __construct()
    {
    }

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
     * @param Cell $cell
     * @return JsonResponse
     */
    public function showInfo(Cell $cell)
    {
        return response()->json(['success' => true, 'data' => $cell->products]);
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
        if ($request->has('id')) {
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
     * @param Cell $cell
     * @return JsonResponse
     * @throws \Exception
     */
    public function delete(Cell $cell)
    {
        $cell->delete();

        $cells = Cell::all();
        return response(['success' => true, 'data' => $cells]);
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
            ->select('cells.*', DB::raw('ifnull(cells.volume - sum(cell_product.quantity * products.volume), cells.volume) as available_volume'))
            ->groupBy('cells.id', 'cells.volume', 'cells.status')->get();

        return response()->json(['success' => true, 'data' => $cells]);
    }
}
