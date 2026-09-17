<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PriceComplaint;
use Illuminate\Http\Request;

class PriceComplaintController extends Controller
{
    public function index()
    {
        $complaints = PriceComplaint::with([
            'buyer.user',
            'product.farmer.user',
        ])
            ->latest()
            ->get();

        return inertia('Admin/PriceComplaints/Index', [
            'complaints' => $complaints,
        ]);
    }

    public function update(Request $request, PriceComplaint $priceComplaint)
    {
        $request->validate([
            'status' => 'required|in:reviewing,resolved,rejected',
            'admin_notes' => 'nullable|string|max:1000',
        ]);

        $priceComplaint->update([
            'status' => $request->status,
            'admin_notes' => $request->admin_notes,
        ]);

        return redirect()
            ->route('admin.price-complaints.index')
            ->with('success', 'Price complaint updated successfully.');
    }
}