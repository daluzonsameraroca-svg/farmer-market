<?php

namespace App\Http\Controllers\Buyer;

use App\Http\Controllers\Controller;
use App\Models\Product;

class MarketplaceController extends Controller
{
    public function index()
    {
        $products = Product::with('farmer')
            ->where('is_available', true)
            ->where('quantity', '>', 0)
            ->latest()
            ->get();

        return inertia('Buyer/Marketplace/Index', [
            'products' => $products,
        ]);
    }

    public function show(Product $product)
    {
        $product->load('farmer.user');

        if (!$product->is_available || $product->quantity <= 0) {
            abort(404);
        }

        return inertia('Buyer/Marketplace/Show', [
            'product' => $product,
        ]);
    }
}