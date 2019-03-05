<?php

namespace App\Http\Controllers;

use App\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        $products = Product::all();
        return $products->toJson();
    }

    public function save(Request $request)
    {
        if (!$request->has('id')){
            $product = new Product;
        } else {
            $id = $request->input('id');
            $product  = Product::find($id);
        }
        $product->name = $request->input('name');
        $product->description = $request->input('description');
        $product->volume = $request->input('volume');
        $product ->save();
        $products = Product::all();

        return $products->toJson();
    }

    public function delete(Request $request)
    {
        Product::destroy($request->input('id'));
        $products = Product::all();

        return $products->toJson();
    }
}
