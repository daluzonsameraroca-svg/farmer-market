<?php

namespace App\Http\Controllers\Buyer;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index()
    {
        $buyer = auth()->user()->buyer;

        $orders = Order::with('product.farmer')
            ->where('buyer_id', $buyer->id)
            ->latest()
            ->get();

        return inertia('Buyer/Orders/Index', [
            'orders' => $orders,
        ]);
    }

    public function store(Request $request, Product $product)
    {
        $buyer = auth()->user()->buyer;

        $request->validate([
            'quantity' => 'required|numeric|min:0.01',
        ]);

        if (!$product->is_available || $product->quantity <= 0) {
            return back()->withErrors([
                'quantity' => 'This product is no longer available.',
            ]);
        }

        if ($request->quantity > $product->quantity) {
            return back()->withErrors([
                'quantity' => 'Requested quantity is greater than the available stock.',
            ]);
        }

        $totalPrice = $request->quantity * $product->price;

        Order::create([
            'buyer_id' => $buyer->id,
            'product_id' => $product->id,
            'quantity' => $request->quantity,
            'total_price' => $totalPrice,
            'status' => 'pending',
        ]);

        $product->quantity -= $request->quantity;

        if ($product->quantity <= 0) {
            $product->quantity = 0;
            $product->is_available = false;
        }

        $product->save();

        return redirect()
            ->route('buyer.marketplace.index')
            ->with('success', 'Order placed successfully.');
    }
}