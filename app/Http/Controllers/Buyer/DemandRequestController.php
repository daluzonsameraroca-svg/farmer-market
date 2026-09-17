<?php

namespace App\Http\Controllers\Buyer;

use App\Http\Controllers\Controller;
use App\Models\DemandRequest;
use App\Models\Product;
use Illuminate\Http\Request;

class DemandRequestController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Display Buyer's Demand Requests
    |--------------------------------------------------------------------------
    */

    public function index()
    {
        $buyer = auth()->user()->buyer;

        $requests = DemandRequest::where('buyer_id', $buyer->id)
            ->latest()
            ->get();

        return inertia('Buyer/DemandRequests/Index', [
            'requests' => $requests,
        ]);
    }


    /*
    |--------------------------------------------------------------------------
    | Show Create Demand Request Form
    |--------------------------------------------------------------------------
    */

    public function create()
    {
        return inertia('Buyer/DemandRequests/Create');
    }


    /*
    |--------------------------------------------------------------------------
    | Store Demand Request
    |--------------------------------------------------------------------------
    */

    public function store(Request $request)
    {
        $buyer = auth()->user()->buyer;

        $request->validate([
            'product_name' => 'required|string|max:255',
            'category' => 'nullable|string|max:255',
            'quantity' => 'required|numeric|min:0.01',
            'unit' => 'required|string|max:50',
            'target_price' => 'nullable|numeric|min:0',
            'needed_by' => 'nullable|date',
        ]);

        DemandRequest::create([
            'buyer_id' => $buyer->id,
            'product_name' => $request->product_name,
            'category' => $request->category,
            'quantity' => $request->quantity,
            'unit' => $request->unit,
            'target_price' => $request->target_price,
            'needed_by' => $request->needed_by,
            'status' => 'open',
        ]);

        return redirect()
            ->route('buyer.demand-requests.index')
            ->with(
                'success',
                'Demand request submitted successfully.'
            );
    }


    /*
    |--------------------------------------------------------------------------
    | Normalize Product Name
    |--------------------------------------------------------------------------
    |
    | This makes product names easier to compare.
    |
    | Examples:
    |
    | "Tomatoes" -> "tomato"
    | "tomato"   -> "tomato"
    | " TOMATO " -> "tomato"
    |
    */

    private function normalizeProductName($name)
    {
        $name = strtolower(trim($name));

        // Remove special characters.
        $name = preg_replace('/[^a-z0-9\s]/', '', $name);

        // Remove extra spaces.
        $name = preg_replace('/\s+/', ' ', $name);

        /*
        |--------------------------------------------------------------------------
        | Handle common plural forms
        |--------------------------------------------------------------------------
        */

        if (str_ends_with($name, 'ies')) {
            $name = substr($name, 0, -3) . 'y';
        } elseif (str_ends_with($name, 'es')) {
            $name = substr($name, 0, -2);
        } elseif (
            str_ends_with($name, 's') &&
            !str_ends_with($name, 'ss')
        ) {
            $name = substr($name, 0, -1);
        }

        return $name;
    }


    /*
    |--------------------------------------------------------------------------
    | Calculate Product Name Similarity
    |--------------------------------------------------------------------------
    |
    | Returns a percentage from 0 to 100.
    |
    */

    private function calculateNameSimilarity($requestedName, $productName)
    {
        $requestedName = $this->normalizeProductName($requestedName);
        $productName = $this->normalizeProductName($productName);

        /*
        |--------------------------------------------------------------------------
        | Exact normalized match
        |--------------------------------------------------------------------------
        */

        if ($requestedName === $productName) {
            return 100;
        }

        /*
        |--------------------------------------------------------------------------
        | Similarity comparison
        |--------------------------------------------------------------------------
        */

        similar_text(
            $requestedName,
            $productName,
            $percentage
        );

        return round($percentage);
    }


    /*
    |--------------------------------------------------------------------------
    | Find Supply Matches
    |--------------------------------------------------------------------------
    |
    | Matching Score:
    |
    | Product Name       = 40 points
    | Category           = 20 points
    | Unit               = 15 points
    | Quantity           = 15 points
    | Price              = 10 points
    | ------------------------------
    | Total              = 100 points
    |
    */

    public function matches(DemandRequest $demandRequest)
    {
        $buyer = auth()->user()->buyer;

        /*
        |--------------------------------------------------------------------------
        | Security Check
        |--------------------------------------------------------------------------
        */

        if ($demandRequest->buyer_id !== $buyer->id) {
            abort(403);
        }


        /*
        |--------------------------------------------------------------------------
        | Requested Information
        |--------------------------------------------------------------------------
        */

        $requestedName = $demandRequest->product_name;

        $requestedUnit = strtolower(
            trim($demandRequest->unit)
        );


        /*
        |--------------------------------------------------------------------------
        | Get Available Farmer Products
        |--------------------------------------------------------------------------
        |
        | We no longer require an exact product name.
        |
        | The system retrieves available products and then
        | calculates their name similarity.
        |
        */

        $products = Product::with('farmer.user')
            ->where('is_available', true)
            ->where('quantity', '>', 0)
            ->get();


        /*
        |--------------------------------------------------------------------------
        | Calculate Match Scores
        |--------------------------------------------------------------------------
        */

        $matches = $products
            ->map(function ($product) use (
                $demandRequest,
                $requestedName,
                $requestedUnit
            ) {

                $score = 0;

                /*
                |--------------------------------------------------------------------------
                | 1. Product Name - 40 points
                |--------------------------------------------------------------------------
                */

                $nameSimilarity = $this->calculateNameSimilarity(
                    $requestedName,
                    $product->name
                );

                /*
                |--------------------------------------------------------------------------
                | Convert similarity percentage to 40 points.
                |--------------------------------------------------------------------------
                */

                $nameScore = round(
                    ($nameSimilarity / 100) * 40
                );

                $score += $nameScore;


                /*
                |--------------------------------------------------------------------------
                | 2. Category - 20 points
                |--------------------------------------------------------------------------
                */

                $categoryMatches = false;

                if ($demandRequest->category) {

                    $requestedCategory = strtolower(
                        trim($demandRequest->category)
                    );

                    $productCategory = strtolower(
                        trim($product->category)
                    );

                    if ($requestedCategory === $productCategory) {

                        $score += 20;

                        $categoryMatches = true;
                    }
                } else {

                    /*
                    |--------------------------------------------------------------------------
                    | No category specified.
                    |
                    | Give full category points because category
                    | is not a requirement.
                    |--------------------------------------------------------------------------
                    */

                    $score += 20;

                    $categoryMatches = true;
                }


                /*
                |--------------------------------------------------------------------------
                | 3. Unit - 15 points
                |--------------------------------------------------------------------------
                */

                $productUnit = strtolower(
                    trim($product->unit)
                );

                $unitMatches = false;

                if ($productUnit === $requestedUnit) {

                    $score += 15;

                    $unitMatches = true;
                }


                /*
                |--------------------------------------------------------------------------
                | 4. Quantity - 15 points
                |--------------------------------------------------------------------------
                */

                $requestedQuantity =
                    (float) $demandRequest->quantity;

                $availableQuantity =
                    (float) $product->quantity;

                $enoughSupply = false;

                if ($availableQuantity >= $requestedQuantity) {

                    /*
                    |--------------------------------------------------------------------------
                    | Enough supply.
                    |--------------------------------------------------------------------------
                    */

                    $score += 15;

                    $enoughSupply = true;

                } else {

                    /*
                    |--------------------------------------------------------------------------
                    | Partial supply.
                    |--------------------------------------------------------------------------
                    */

                    $quantityRatio =
                        $availableQuantity / $requestedQuantity;

                    $quantityScore =
                        round($quantityRatio * 15);

                    $score += min(
                        15,
                        $quantityScore
                    );
                }


                /*
                |--------------------------------------------------------------------------
                | 5. Price - 10 points
                |--------------------------------------------------------------------------
                */

                $withinTargetPrice = false;

                if ($demandRequest->target_price === null) {

                    /*
                    |--------------------------------------------------------------------------
                    | No target price.
                    |--------------------------------------------------------------------------
                    */

                    $score += 10;

                    $withinTargetPrice = true;

                } else {

                    $targetPrice =
                        (float) $demandRequest->target_price;

                    $productPrice =
                        (float) $product->price;


                    if ($productPrice <= $targetPrice) {

                        /*
                        |--------------------------------------------------------------------------
                        | Price is within target.
                        |--------------------------------------------------------------------------
                        */

                        $score += 10;

                        $withinTargetPrice = true;

                    } else {

                        /*
                        |--------------------------------------------------------------------------
                        | Price is higher than target.
                        |--------------------------------------------------------------------------
                        */

                        $priceDifference =
                            (
                                $productPrice -
                                $targetPrice
                            ) / $targetPrice;

                        $priceScore =
                            10 - ($priceDifference * 10);

                        $score += max(
                            0,
                            round($priceScore)
                        );
                    }
                }


                /*
                |--------------------------------------------------------------------------
                | Match Quality
                |--------------------------------------------------------------------------
                |
                | Do not show products with very poor name matches
                | or incorrect units.
                |
                */

                if (
                    $nameSimilarity < 60 ||
                    !$unitMatches
                ) {
                    return null;
                }


                /*
                |--------------------------------------------------------------------------
                | Match Reasons
                |--------------------------------------------------------------------------
                */

                $matchReasons = [];

                if ($nameSimilarity >= 90) {

                    $matchReasons[] =
                        'Product name closely matches your request.';

                } elseif ($nameSimilarity >= 75) {

                    $matchReasons[] =
                        'Product name is similar to your request.';

                }


                if ($categoryMatches) {

                    $matchReasons[] =
                        'Category matches your request.';

                }


                if ($unitMatches) {

                    $matchReasons[] =
                        'Unit matches your request.';

                }


                if ($enoughSupply) {

                    $matchReasons[] =
                        'Enough supply is available.';

                } else {

                    $matchReasons[] =
                        'Partial supply is available.';
                }


                if ($withinTargetPrice) {

                    $matchReasons[] =
                        'Price is within your target.';

                } elseif ($demandRequest->target_price !== null) {

                    $matchReasons[] =
                        'Price is above your target.';
                }


                /*
                |--------------------------------------------------------------------------
                | Return Match
                |--------------------------------------------------------------------------
                */

                return [
                    'product' => $product,
                    'match_score' => min(100, $score),
                    'match_reasons' => $matchReasons,
                ];
            })
            ->filter()
            ->sortByDesc('match_score')
            ->values();


        /*
        |--------------------------------------------------------------------------
        | Send Results to React
        |--------------------------------------------------------------------------
        */

        return inertia('Buyer/DemandRequests/Matches', [
            'demandRequest' => $demandRequest,
            'matches' => $matches,
        ]);
    }
}