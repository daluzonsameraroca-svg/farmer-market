<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Buyer;

class BuyerController extends Controller
{
    public function index()
    {
        $buyers = Buyer::with('user')
            ->latest()
            ->get();

        return inertia('Admin/Buyers/Index', [
            'buyers' => $buyers,
        ]);
    }
}