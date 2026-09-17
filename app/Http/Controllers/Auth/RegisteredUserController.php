<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',

            'email' => [
                'required',
                'string',
                'lowercase',
                'email',
                'max:255',
                'unique:' . User::class,
            ],

            'role' => 'required|in:buyer,farmer',

            'password' => [
                'required',
                'confirmed',
                Rules\Password::defaults(),
            ],

            // Buyer
            'phone_number' => 'nullable|string|max:20',
            'address' => 'nullable|string|max:255',

            // Farmer
            'bir_registered' => 'nullable|boolean',

            'bir_registration_number' => [
                'nullable',
                'string',
                'max:255',
                'unique:farmers,bir_registration_number',
            ],

            'farm_name' => 'nullable|string|max:255',

            'farm_location' => 'nullable|string|max:255',
        ]);

        /*
        |--------------------------------------------------------------------------
        | Create User
        |--------------------------------------------------------------------------
        */

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'role' => $request->role,
            'password' => Hash::make($request->password),
        ]);

        /*
        |--------------------------------------------------------------------------
        | Create Buyer
        |--------------------------------------------------------------------------
        */

        if ($request->role === 'buyer') {
            $user->buyer()->create([
                'phone_number' => $request->phone_number,
                'address' => $request->address,
            ]);
        }

        /*
        |--------------------------------------------------------------------------
        | Create Farmer
        |--------------------------------------------------------------------------
        */

        if ($request->role === 'farmer') {
            $user->farmer()->create([
                'bir_registration_number' =>
                    $request->bir_registration_number,

                'farm_name' =>
                    $request->farm_name,

                'farm_location' =>
                    $request->farm_location,

                // Farmer is not automatically verified.
                'bir_verified' => false,
            ]);
        }

        /*
        |--------------------------------------------------------------------------
        | Login User
        |--------------------------------------------------------------------------
        */

        event(new Registered($user));

        Auth::login($user);

        return redirect()->route('dashboard');
    }
}