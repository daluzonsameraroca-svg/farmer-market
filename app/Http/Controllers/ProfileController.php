<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    public function edit(Request $request): Response
    {
        $user = $request->user();

        $user->loadMissing([
            'farmer',
            'buyer',
        ]);

        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' =>
                $user instanceof \Illuminate\Contracts\Auth\MustVerifyEmail,

            'status' => session('status'),

            'user' => $user,
        ]);
    }


    public function update(Request $request): RedirectResponse
    {
        $user = $request->user();

        $validated = $request->validate([
            'name' => [
                'required',
                'string',
                'max:255',
            ],

            'email' => [
                'required',
                'string',
                'lowercase',
                'email',
                'max:255',
                Rule::unique('users')->ignore($user->id),
            ],
        ]);

        $user->fill([
            'name' => $validated['name'],
            'email' => $validated['email'],
        ]);

        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }

        $user->save();


        /*
        |--------------------------------------------------------------------------
        | Farmer Information
        |--------------------------------------------------------------------------
        */

        if ($user->role === 'farmer' && $user->farmer) {

            $farmerData = $request->validate([
                'farm_name' => [
                    'required',
                    'string',
                    'max:255',
                ],

                'farm_location' => [
                    'required',
                    'string',
                    'max:255',
                ],
            ]);

            $user->farmer->update([
                'farm_name' => $farmerData['farm_name'],
                'farm_location' => $farmerData['farm_location'],
            ]);
        }


        /*
        |--------------------------------------------------------------------------
        | Buyer Information
        |--------------------------------------------------------------------------
        */

        if ($user->role === 'buyer' && $user->buyer) {

            $buyerData = $request->validate([
                'phone_number' => [
                    'nullable',
                    'string',
                    'max:50',
                ],

                'address' => [
                    'required',
                    'string',
                    'max:255',
                ],
            ]);

            $user->buyer->update([
                'phone_number' => $buyerData['phone_number'],
                'address' => $buyerData['address'],
            ]);
        }


        return back()->with(
            'status',
            'profile-updated'
        );
    }


    /*
    |--------------------------------------------------------------------------
    | Update Password
    |--------------------------------------------------------------------------
    */

    public function updatePassword(Request $request): RedirectResponse
    {
        $request->validate([
            'current_password' => [
                'required',
                'current_password',
            ],

            'password' => [
                'required',
                'string',
                'min:8',
                'confirmed',
            ],
        ]);

        $request->user()->update([
            'password' => $request->password,
        ]);

        return back()->with(
            'status',
            'password-updated'
        );
    }


    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => [
                'required',
                'current_password',
            ],
        ]);

        $user = $request->user();

        auth()->logout();

        $user->delete();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}