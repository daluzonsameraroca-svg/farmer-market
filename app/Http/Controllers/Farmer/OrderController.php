<?php

namespace App\Http\Controllers\Farmer;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index()
    {
        $farmer = auth()->user()->farmer;

        $orders = Order::with(['buyer.user', 'product'])
            ->whereHas('product', function ($query) use ($farmer) {
                $query->where('farmer_id', $farmer->id);
            })
            ->latest()
            ->get();

        return inertia('Farmer/Orders/Index', [
            'orders' => $orders,
        ]);
    }

    public function update(Request $request, Order $order)
    {
        $farmer = auth()->user()->farmer;

        // Make sure this order belongs to the logged-in farmer
        if ($order->product->farmer_id !== $farmer->id) {
            abort(403);
        }

        // Validate the new status
        $request->validate([
            'status' => 'required|in:confirmed,completed,cancelled',
        ]);

        // Update the order status
        $order->update([
            'status' => $request->status,
        ]);

        return redirect()
            ->route('farmer.orders.index')
            ->with('success', 'Order status updated successfully.');
    }
}