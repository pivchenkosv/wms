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
     * @param Product $product
     * @return JsonResponse
     * @throws \Exception
     */
    public function delete(Product $product)
    {
        if ($product->delete())
        {
            $products = Product::all();
            return response()->json(['success' => true, 'data' => $products]);
        }

        return response()->json(['success' => false]);
    }

    /**
     * List of cells containing product with $id
     *
     * @param Product $product
     * @return JsonResponse
     */
    public function showInfo(Product $product)
    {
        return response()->json(['success' => true, 'data' => $product->cells]);
    }

    public function getReport()
    {
        $products = DB::table('products')
            ->leftJoin('cell_product', 'products.id', '=', 'cell_product.product_id')
            ->select('products.*', DB::raw('ifnull(sum(cell_product.quantity), 0) as quantity'))
            ->groupBy('products.id', 'products.name', 'products.description', 'quantity')
            ->get();

        return response()->json(['success' => true, 'data' => $products]);
    }
}
