<?php

namespace App\Http\Controllers\Farmer;

use App\Http\Controllers\Controller;
use App\Models\DemandRequest;
use App\Models\Product;

class DemandRequestController extends Controller
{
    public function index()
    {
        $farmer = auth()->user()->farmer;

        $products = Product::where('farmer_id', $farmer->id)
            ->where('is_available', true)
            ->where('quantity', '>', 0)
            ->get();

        $demandRequests = DemandRequest::with('buyer.user')
            ->where('status', 'open')
            ->latest()
            ->get();

        $matches = [];

        foreach ($demandRequests as $demandRequest) {

            foreach ($products as $product) {

                $nameSimilarity = $this->calculateNameSimilarity(
                    $demandRequest->product_name,
                    $product->name
                );

                $categoryMatches = false;

                if ($demandRequest->category) {

                    $categoryMatches =
                        strtolower(trim($demandRequest->category))
                        ===
                        strtolower(trim($product->category));

                } else {

                    $categoryMatches = true;

                }

                $unitMatches =
                    strtolower(trim($demandRequest->unit))
                    ===
                    strtolower(trim($product->unit));

                if (
                    $nameSimilarity < 60 ||
                    !$unitMatches
                ) {
                    continue;
                }

                $score = 0;

                $score += round(
                    ($nameSimilarity / 100) * 40
                );

                if ($categoryMatches) {
                    $score += 20;
                }

                if ($unitMatches) {
                    $score += 15;
                }

                if (
                    $product->quantity >=
                    $demandRequest->quantity
                ) {
                    $score += 15;
                } else {

                    $quantityRatio =
                        $product->quantity /
                        $demandRequest->quantity;

                    $score += min(
                        15,
                        round($quantityRatio * 15)
                    );
                }

                if (
                    $demandRequest->target_price === null ||
                    $product->price <=
                    $demandRequest->target_price
                ) {
                    $score += 10;
                }

                $reasons = [];

                if ($nameSimilarity >= 90) {

                    $reasons[] =
                        'Product name closely matches the buyer request.';

                } elseif ($nameSimilarity >= 75) {

                    $reasons[] =
                        'Product name is similar to the buyer request.';

                }

                if ($categoryMatches) {

                    $reasons[] =
                        'Category matches the request.';

                }

                if ($unitMatches) {

                    $reasons[] =
                        'Unit matches the request.';

                }

                if (
                    $product->quantity >=
                    $demandRequest->quantity
                ) {

                    $reasons[] =
                        'Your available supply is enough to meet the requested quantity.';

                } else {

                    $reasons[] =
                        'Your available supply can partially meet the request.';

                }

                if ($demandRequest->target_price === null) {

                    $reasons[] =
                        'The buyer did not specify a target price.';

                } elseif (
                    $product->price <=
                    $demandRequest->target_price
                ) {

                    $reasons[] =
                        'Your price is within the buyer’s target price.';

                } else {

                    $reasons[] =
                        'Your price is above the buyer’s target price.';

                }

                $matches[] = [
                    'demand_request' => $demandRequest,
                    'product' => $product,
                    'match_score' => min(100, $score),
                    'match_reasons' => $reasons,
                ];
            }
        }

        usort($matches, function ($a, $b) {
            return $b['match_score'] <=> $a['match_score'];
        });

        return inertia(
            'Farmer/DemandRequests/Index',
            [
                'matches' => $matches,
            ]
        );
    }

    private function normalizeProductName($name)
    {
        $name = strtolower(trim($name));

        $name = preg_replace(
            '/[^a-z0-9\s]/',
            '',
            $name
        );

        $name = preg_replace(
            '/\s+/',
            ' ',
            $name
        );

        if (str_ends_with($name, 'ies')) {

            $name =
                substr($name, 0, -3) . 'y';

        } elseif (str_ends_with($name, 'es')) {

            $name =
                substr($name, 0, -2);

        } elseif (
            str_ends_with($name, 's') &&
            !str_ends_with($name, 'ss')
        ) {

            $name =
                substr($name, 0, -1);

        }

        return $name;
    }

    private function calculateNameSimilarity(
        $requestedName,
        $productName
    ) {
        $requestedName =
            $this->normalizeProductName(
                $requestedName
            );

        $productName =
            $this->normalizeProductName(
                $productName
            );

        if ($requestedName === $productName) {
            return 100;
        }

        similar_text(
            $requestedName,
            $productName,
            $percentage
        );

        return round($percentage);
    }
}