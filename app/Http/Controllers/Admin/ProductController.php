<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::with('farmer.user')
            ->latest()
            ->get();

        return inertia('Admin/Products/Index', [
            'products' => $products,
        ]);
    }

    public function update(Request $request, Product $product)
    {
        $request->validate([
            'is_available' => 'required|boolean',
        ]);

        $product->update([
            'is_available' => $request->is_available,
        ]);

        return redirect()
            ->route('admin.products.index')
            ->with('success', 'Product availability updated successfully.');
    }
}