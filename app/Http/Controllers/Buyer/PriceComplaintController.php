<?php

namespace App\Http\Controllers\Buyer;

use App\Http\Controllers\Controller;
use App\Models\PriceComplaint;
use App\Models\Product;
use Illuminate\Http\Request;

class PriceComplaintController extends Controller
{
    public function store(Request $request, Product $product)
    {
        $buyer = auth()->user()->buyer;

        $request->validate([
            'reported_price' => 'required|numeric|min:0',
            'reason' => 'required|string|max:1000',
        ]);

        if (!$product->is_available) {
            return back()->withErrors([
                'reason' => 'This product is no longer available.',
            ]);
        }

        PriceComplaint::create([
            'buyer_id' => $buyer->id,
            'product_id' => $product->id,
            'reported_price' => $request->reported_price,
            'reason' => $request->reason,
            'status' => 'pending',
        ]);

        return back()->with(
            'success',
            'Price complaint submitted successfully.'
        );
    }
}