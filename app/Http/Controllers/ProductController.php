<?php

namespace App\Http\Controllers;

use App\Cell;
use App\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct() {}

    /**
     * Products list
     *
     * @return JsonResponse
     */
    public function index()
    {
        $products = Product::all();
        return response()->json(['success' => true, 'data' => $products]);
    }

    /**
     * Create or update product
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function save(Request $request)
    {
        if (!$request->has('id')) {
            $product = new Product;
        } else {
            $id = $request->input('id');
            $product = Product::find($id);
        }
        $request->validate([
            'name' => ['required'],
            'volume' => [
                'required',
                function ($attribute, $value, $fail) {
                    if ($value <= 0) {
                        $fail($attribute . ' should be no less than 1.');
                    }
                },
            ]
        ]);
        $product->name = $request->input('name');
        $product->description = $request->input('description');
        $product->volume = $request->input('volume');
        if ($product->save())
        {
            $products = Product::all();
            return response()->json(['success' => true, 'data' => $products]);
        }
        return response()->json(['success' => false]);

    }

    /**
     * Delete product by id
     *
     * @param $id
     * @return JsonResponse
     */
    public function delete($id)
    {
        if (Product::destroy($id))
        {
            $products = Product::all();
            return response()->json(['success' => true, 'data' => $products]);
        }

        return response()->json(['success' => false]);
    }

    /**
     * List of cells containing product with $id
     *
     * @param $id
     * @return JsonResponse
     */
    public function showInfo($id)
    {
        if ($id) {
            $products = DB::table('cell_product')
                ->join('products', 'cell_product.product_id', '=', 'products.id')
                ->where('cell_product.product_id', '=', $id)
                ->select('cell_id', 'volume', 'quantity')
                ->get();
            return response()->json(['success' => true, 'data' => $products]);
        }

        return response()->json(['success' => false]);
    }
}
