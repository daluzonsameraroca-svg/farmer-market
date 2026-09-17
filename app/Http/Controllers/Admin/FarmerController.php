<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Farmer;
use Illuminate\Http\Request;

class FarmerController extends Controller
{
    public function index()
    {
        $farmers = Farmer::with('user')
            ->latest()
            ->get();

        return inertia('Admin/Farmers/Index', [
            'farmers' => $farmers,
        ]);
    }

    public function update(Request $request, Farmer $farmer)
    {
        $request->validate([
            'bir_verified' => 'required|boolean',
        ]);

        $farmer->update([
            'bir_verified' => $request->boolean('bir_verified'),
        ]);

        return redirect()
            ->route('admin.farmers.index')
            ->with(
                'success',
                'Farmer verification updated successfully.'
            );
    }
}