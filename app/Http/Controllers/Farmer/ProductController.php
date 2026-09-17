<?php

namespace App\Http\Controllers\Farmer;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        $farmer = auth()->user()->farmer;

        $products = Product::where('farmer_id', $farmer->id)
            ->latest()
            ->get();

        return inertia('Farmer/Products/Index', [
            'products' => $products,
        ]);
    }

    public function create()
    {
        $farmer = auth()->user()->farmer;

        if (!$farmer->bir_verified) {
            return redirect()
                ->route('farmer.products.index')
                ->withErrors([
                    'verification' => 'Your farmer account must be verified before you can add products.',
                ]);
        }

        return inertia('Farmer/Products/Create');
    }

    public function store(Request $request)
    {
        $farmer = auth()->user()->farmer;

        if (!$farmer->bir_verified) {
            return redirect()
                ->route('farmer.products.index')
                ->withErrors([
                    'verification' => 'Your farmer account must be verified before you can add products.',
                ]);
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'quantity' => 'required|numeric|min:0',
            'unit' => 'required|string|max:50',
        ]);

        Product::create([
            'farmer_id' => $farmer->id,
            'name' => $request->name,
            'category' => $request->category,
            'description' => $request->description,
            'price' => $request->price,
            'quantity' => $request->quantity,
            'unit' => $request->unit,
            'is_available' => true,
        ]);

        return redirect()
            ->route('farmer.products.index')
            ->with('success', 'Product added successfully.');
    }

    public function edit(Product $product)
    {
        $farmer = auth()->user()->farmer;

        if ($product->farmer_id !== $farmer->id) {
            abort(403);
        }

        return inertia('Farmer/Products/Edit', [
            'product' => $product,
        ]);
    }

    public function update(Request $request, Product $product)
    {
        $farmer = auth()->user()->farmer;

        if ($product->farmer_id !== $farmer->id) {
            abort(403);
        }

        if (!$farmer->bir_verified) {
            return redirect()
                ->route('farmer.products.index')
                ->withErrors([
                    'verification' => 'Your farmer account must be verified before you can manage products.',
                ]);
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'quantity' => 'required|numeric|min:0',
            'unit' => 'required|string|max:50',
            'is_available' => 'required|boolean',
        ]);

        $product->update([
            'name' => $request->name,
            'category' => $request->category,
            'description' => $request->description,
            'price' => $request->price,
            'quantity' => $request->quantity,
            'unit' => $request->unit,
            'is_available' => $request->is_available,
        ]);

        return redirect()
            ->route('farmer.products.index')
            ->with('success', 'Product updated successfully.');
    }

    public function destroy(Product $product)
    {
        $farmer = auth()->user()->farmer;

        if ($product->farmer_id !== $farmer->id) {
            abort(403);
        }

        if (!$farmer->bir_verified) {
            return redirect()
                ->route('farmer.products.index')
                ->withErrors([
                    'verification' => 'Your farmer account must be verified before you can manage products.',
                ]);
        }

        $product->delete();

        return redirect()
            ->route('farmer.products.index')
            ->with('success', 'Product deleted successfully.');
    }
}