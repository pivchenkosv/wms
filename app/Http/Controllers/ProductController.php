<?php

namespace App\Http\Controllers;

use App\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function __construct() {}

    public function index()
    {
        $products = Product::all();
        return response()->json(['success' => true, 'data' => $products]);
    }

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

    public function delete(Request $request, $id)
    {
        if (Product::destroy($id))
        {
            $products = Product::all();
            return response()->json(['success' => true, 'data' => $products]);
        }

        return response()->json(['success' => false]);
    }
}
