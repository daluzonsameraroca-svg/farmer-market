<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::with([
            'buyer.user',
            'product.farmer.user',
        ])
            ->latest()
            ->get();

        return inertia('Admin/Orders/Index', [
            'orders' => $orders,
        ]);
    }
}