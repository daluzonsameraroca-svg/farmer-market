<?php

use App\Http\Controllers\Admin\BuyerController as AdminBuyerController;
use App\Http\Controllers\Admin\OrderController as AdminOrderController;
use App\Http\Controllers\Buyer\DemandRequestController;
use App\Http\Controllers\Admin\ProductController as AdminProductController;
use App\Http\Controllers\Admin\FarmerController as AdminFarmerController;
use App\Http\Controllers\Admin\PriceComplaintController as AdminPriceComplaintController;
use App\Http\Controllers\Buyer\PriceComplaintController as BuyerPriceComplaintController;
use App\Http\Controllers\Buyer\OrderController;
use App\Http\Controllers\Buyer\MarketplaceController;
use App\Http\Controllers\Farmer\ProductController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


/*
|--------------------------------------------------------------------------
| Dashboard
|--------------------------------------------------------------------------
*/

Route::get('/dashboard', function () {
    $user = auth()->user();

    if ($user->role === 'farmer') {
        return redirect()->route('farmer.dashboard');
    }

    if ($user->role === 'admin') {
        return redirect()->route('admin.dashboard');
    }

    return redirect()->route('buyer.dashboard');

})->middleware(['auth', 'verified'])
  ->name('dashboard');


/*
|--------------------------------------------------------------------------
| Authenticated Routes
|--------------------------------------------------------------------------
*/

Route::middleware(['auth', 'verified'])->group(function () {

    /*
    |--------------------------------------------------------------------------
    | Buyer Dashboard
    |--------------------------------------------------------------------------
    */

    Route::get('/buyer/dashboard', function () {

    $buyer = auth()->user()->buyer;

    $availableProducts = \App\Models\Product::where(
        'is_available',
        true
    )
        ->where('quantity', '>', 0)
        ->count();

    $totalOrders = \App\Models\Order::where(
        'buyer_id',
        $buyer->id
    )->count();

    $pendingOrders = \App\Models\Order::where(
        'buyer_id',
        $buyer->id
    )
        ->where('status', 'pending')
        ->count();

    $totalDemandRequests = \App\Models\DemandRequest::where(
        'buyer_id',
        $buyer->id
    )->count();

    $openDemandRequests = \App\Models\DemandRequest::where(
        'buyer_id',
        $buyer->id
    )
        ->where('status', 'open')
        ->count();

    return Inertia::render('Buyer/Dashboard', [
        'stats' => [
            'available_products' => $availableProducts,
            'total_orders' => $totalOrders,
            'pending_orders' => $pendingOrders,
            'total_demand_requests' => $totalDemandRequests,
            'open_demand_requests' => $openDemandRequests,
        ],
    ]);

})->name('buyer.dashboard');

    Route::get('/buyer/marketplace', [MarketplaceController::class, 'index'])
        ->name('buyer.marketplace.index');

    Route::get('/buyer/marketplace/{product}', [MarketplaceController::class, 'show'])
        ->name('buyer.marketplace.show');

    Route::get('/buyer/orders', [OrderController::class, 'index'])
        ->name('buyer.orders.index');

    Route::post('/buyer/orders/{product}', [OrderController::class, 'store'])
        ->name('buyer.orders.store');

    Route::post('/buyer/price-complaints/{product}', [BuyerPriceComplaintController::class, 'store'])
        ->name('buyer.price-complaints.store');
    
    Route::get('/buyer/demand-requests', [DemandRequestController::class, 'index'])
    ->name('buyer.demand-requests.index');

    Route::get('/buyer/demand-requests/create', [DemandRequestController::class, 'create'])
    ->name('buyer.demand-requests.create');

    Route::post('/buyer/demand-requests', [DemandRequestController::class, 'store'])
    ->name('buyer.demand-requests.store');

    Route::get(
    '/buyer/demand-requests/{demandRequest}/matches',
    [DemandRequestController::class, 'matches']
    )->name('buyer.demand-requests.matches');


    /*
    |--------------------------------------------------------------------------
    | Farmer Dashboard
    |--------------------------------------------------------------------------
    */

    Route::get('/farmer/dashboard', function () {

    $farmer = auth()->user()->farmer;

    $totalProducts = \App\Models\Product::where(
        'farmer_id',
        $farmer->id
    )->count();

    $availableProducts = \App\Models\Product::where(
        'farmer_id',
        $farmer->id
    )
        ->where('is_available', true)
        ->where('quantity', '>', 0)
        ->count();

    $pendingOrders = \App\Models\Order::where(
        'status',
        'pending'
    )
        ->whereHas('product', function ($query) use ($farmer) {
            $query->where('farmer_id', $farmer->id);
        })
        ->count();


    /*
    |--------------------------------------------------------------------------
    | Matching Buyer Demand Requests
    |--------------------------------------------------------------------------
    */

    $products = \App\Models\Product::where(
        'farmer_id',
        $farmer->id
    )
        ->where('is_available', true)
        ->where('quantity', '>', 0)
        ->get();

    $demandRequests = \App\Models\DemandRequest::where(
        'status',
        'open'
    )->get();

    $matchingRequests = 0;

    foreach ($demandRequests as $demandRequest) {

        foreach ($products as $product) {

            $requestedName = strtolower(
                trim($demandRequest->product_name)
            );

            $productName = strtolower(
                trim($product->name)
            );

            $requestedName = preg_replace(
                '/[^a-z0-9\s]/',
                '',
                $requestedName
            );

            $productName = preg_replace(
                '/[^a-z0-9\s]/',
                '',
                $productName
            );

            similar_text(
                $requestedName,
                $productName,
                $percentage
            );

            $unitMatches =
                strtolower(trim($demandRequest->unit))
                ===
                strtolower(trim($product->unit));

            if (
                $percentage >= 60 &&
                $unitMatches
            ) {
                $matchingRequests++;

                break;
            }
        }
    }


    return Inertia::render('Farmer/Dashboard', [
        'stats' => [
            'total_products' => $totalProducts,
            'available_products' => $availableProducts,
            'pending_orders' => $pendingOrders,
            'matching_requests' => $matchingRequests,
        ],
    ]);

})->name('farmer.dashboard');

    Route::get(
    '/farmer/demand-requests',
    [\App\Http\Controllers\Farmer\DemandRequestController::class, 'index']
)->name('farmer.demand-requests.index');

    Route::get('/farmer/orders', [\App\Http\Controllers\Farmer\OrderController::class, 'index'])
        ->name('farmer.orders.index');

    Route::put('/farmer/orders/{order}', [\App\Http\Controllers\Farmer\OrderController::class, 'update'])
        ->name('farmer.orders.update');


    /*
    |--------------------------------------------------------------------------
    | Farmer Products
    |--------------------------------------------------------------------------
    */

    Route::get('/farmer/products', [ProductController::class, 'index'])
        ->name('farmer.products.index');

    Route::get('/farmer/products/create', [ProductController::class, 'create'])
        ->name('farmer.products.create');

    Route::post('/farmer/products', [ProductController::class, 'store'])
        ->name('farmer.products.store');

    Route::get('/farmer/products/{product}/edit', [ProductController::class, 'edit'])
        ->name('farmer.products.edit');

    Route::put('/farmer/products/{product}', [ProductController::class, 'update'])
        ->name('farmer.products.update');

    Route::delete('/farmer/products/{product}', [ProductController::class, 'destroy'])
        ->name('farmer.products.destroy');


    /*
    |--------------------------------------------------------------------------
    | Admin Routes
    |--------------------------------------------------------------------------
    */

    Route::middleware('admin')->group(function () {

        Route::get('/admin/dashboard', function () {

    $totalFarmers = \App\Models\Farmer::count();

    $verifiedFarmers = \App\Models\Farmer::where(
        'bir_verified',
        true
    )->count();

    $pendingFarmers = \App\Models\Farmer::where(
        'bir_verified',
        false
    )->count();

    $totalBuyers = \App\Models\Buyer::count();

    $totalProducts = \App\Models\Product::count();

    $availableProducts = \App\Models\Product::where(
        'is_available',
        true
    )
        ->where('quantity', '>', 0)
        ->count();

    $totalOrders = \App\Models\Order::count();

    $pendingOrders = \App\Models\Order::where(
        'status',
        'pending'
    )->count();

    $pendingComplaints = \App\Models\PriceComplaint::where(
        'status',
        'pending'
    )->count();

    $openDemandRequests = \App\Models\DemandRequest::where(
        'status',
        'open'
    )->count();

    return Inertia::render('Admin/Dashboard', [
        'stats' => [
            'total_farmers' => $totalFarmers,
            'verified_farmers' => $verifiedFarmers,
            'pending_farmers' => $pendingFarmers,
            'total_buyers' => $totalBuyers,
            'total_products' => $totalProducts,
            'available_products' => $availableProducts,
            'total_orders' => $totalOrders,
            'pending_orders' => $pendingOrders,
            'pending_complaints' => $pendingComplaints,
            'open_demand_requests' => $openDemandRequests,
        ],
    ]);

})->name('admin.dashboard');

        Route::get('/admin/price-complaints', [AdminPriceComplaintController::class, 'index'])
            ->name('admin.price-complaints.index');

        Route::put('/admin/price-complaints/{priceComplaint}', [AdminPriceComplaintController::class, 'update'])
            ->name('admin.price-complaints.update');

        Route::get('/admin/farmers', [AdminFarmerController::class, 'index'])
        ->name('admin.farmers.index');

        Route::put('/admin/farmers/{farmer}', [AdminFarmerController::class, 'update'])
        ->name('admin.farmers.update');

        Route::get('/admin/products', [AdminProductController::class, 'index'])
        ->name('admin.products.index');

        Route::put('/admin/products/{product}', [AdminProductController::class, 'update'])
        ->name('admin.products.update');

        Route::get('/admin/orders', [AdminOrderController::class, 'index'])
        ->name('admin.orders.index');

        Route::get('/admin/buyers', [AdminBuyerController::class, 'index'])
        ->name('admin.buyers.index');
    });
});


/*
|--------------------------------------------------------------------------
| Profile
|--------------------------------------------------------------------------
*/

Route::middleware('auth')->group(function () {

    Route::get('/profile', [ProfileController::class, 'edit'])
        ->name('profile.edit');

    Route::patch('/profile', [ProfileController::class, 'update'])
        ->name('profile.update');

    Route::patch('/profile/password', [ProfileController::class, 'updatePassword'])
        ->name('profile.password.update');

    Route::delete('/profile', [ProfileController::class, 'destroy'])
        ->name('profile.destroy');
});


require __DIR__.'/auth.php';