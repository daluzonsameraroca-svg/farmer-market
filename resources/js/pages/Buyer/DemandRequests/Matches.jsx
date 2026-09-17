import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Matches({ demandRequest, matches }) {
    return (
        <AuthenticatedLayout>
            <Head title="Supply Matches" />

            <div className="mx-auto max-w-6xl">

                {/* Header */}
                <div className="mb-8">
                    <Link
                        href={route('buyer.demand-requests.index')}
                        className="text-sm font-semibold text-green-600 hover:text-green-700"
                    >
                        ← Back to Demand Requests
                    </Link>

                    <h1 className="mt-4 text-2xl font-bold text-gray-800">
                        Supply Matches
                    </h1>

                    <p className="mt-1 text-gray-600">
                        Farmers whose products match your demand request.
                    </p>
                </div>

                {/* Demand Request Summary */}
                <div className="mb-6 rounded-xl bg-white p-6 shadow-sm">

                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                            <span className="text-lg">📋</span>
                        </div>

                        <div>
                            <h2 className="text-lg font-bold text-gray-800">
                                Your Request
                            </h2>

                            <p className="text-sm text-gray-500">
                                Details of the product you are looking for.
                            </p>
                        </div>
                    </div>

                    <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

                        {/* Product */}
                        <div className="rounded-lg bg-gray-50 p-4">
                            <p className="text-xs font-medium uppercase text-gray-500">
                                Product
                            </p>

                            <p className="mt-1 font-semibold text-gray-800">
                                {demandRequest.product_name}
                            </p>
                        </div>

                        {/* Quantity */}
                        <div className="rounded-lg bg-gray-50 p-4">
                            <p className="text-xs font-medium uppercase text-gray-500">
                                Quantity
                            </p>

                            <p className="mt-1 font-semibold text-gray-800">
                                {demandRequest.quantity}{' '}
                                {demandRequest.unit}
                            </p>
                        </div>

                        {/* Target Price */}
                        <div className="rounded-lg bg-gray-50 p-4">
                            <p className="text-xs font-medium uppercase text-gray-500">
                                Target Price
                            </p>

                            <p className="mt-1 font-semibold text-gray-800">
                                {demandRequest.target_price
                                    ? `₱${Number(
                                          demandRequest.target_price
                                      ).toFixed(2)}`
                                    : 'Not specified'}
                            </p>
                        </div>

                        {/* Needed By */}
                        <div className="rounded-lg bg-gray-50 p-4">
                            <p className="text-xs font-medium uppercase text-gray-500">
                                Needed By
                            </p>

                            <p className="mt-1 font-semibold text-gray-800">
                                {demandRequest.needed_by ||
                                    'Not specified'}
                            </p>
                        </div>

                    </div>
                </div>

                {/* No Matches */}
                {matches.length === 0 ? (

                    <div className="rounded-xl bg-white p-10 text-center shadow-sm">

                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
                            <span className="text-2xl">
                                🔎
                            </span>
                        </div>

                        <h2 className="text-lg font-bold text-gray-800">
                            No Matching Supply Found
                        </h2>

                        <p className="mx-auto mt-2 max-w-md text-sm text-gray-600">
                            No available farmer products currently match
                            your request. Try checking again later as farmers
                            add new products.
                        </p>

                        <Link
                            href={route(
                                'buyer.demand-requests.index'
                            )}
                            className="mt-5 inline-block rounded-lg bg-green-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700"
                        >
                            Back to Requests
                        </Link>

                    </div>

                ) : (

                    <div>

                        {/* Match Count */}
                        <div className="mb-4">
                            <h2 className="text-lg font-bold text-gray-800">
                                Matching Products
                            </h2>

                            <p className="text-sm text-gray-500">
                                {matches.length} matching product
                                {matches.length !== 1 ? 's' : ''} found.
                            </p>
                        </div>

                        {/* Matches */}
                        <div className="grid gap-6 md:grid-cols-2">

                            {matches.map((match) => {

                                const product = match.product;

                                return (
                                    <div
                                        key={product.id}
                                        className="rounded-xl bg-white p-6 shadow-sm transition hover:shadow-md"
                                    >

                                        {/* Product Header */}
                                        <div className="flex items-start justify-between gap-4">

                                            <div>
                                                <h2 className="text-lg font-bold text-gray-800">
                                                    {product.name}
                                                </h2>

                                                <p className="mt-1 text-sm text-gray-500">
                                                    {product.category}
                                                </p>
                                            </div>

                                            {/* Match Score */}
                                            <div className="shrink-0 text-center">

                                                <div className="rounded-full bg-green-100 px-4 py-1.5">
                                                    <span className="text-sm font-bold text-green-700">
                                                        {match.match_score}%
                                                    </span>
                                                </div>

                                                <p className="mt-1 text-xs text-gray-500">
                                                    Match
                                                </p>

                                            </div>

                                        </div>

                                        {/* Farmer Information */}
                                        <div className="mt-5 border-t border-gray-200 pt-4">

                                            <div className="grid gap-4 sm:grid-cols-2">

                                                {/* Farmer */}
                                                <div>
                                                    <p className="text-xs font-medium uppercase text-gray-500">
                                                        Farmer
                                                    </p>

                                                    <p className="mt-1 font-semibold text-gray-800">
                                                        {product.farmer?.user?.name ||
                                                            'Unknown Farmer'}
                                                    </p>
                                                </div>

                                                {/* Farm */}
                                                <div>
                                                    <p className="text-xs font-medium uppercase text-gray-500">
                                                        Farm
                                                    </p>

                                                    <p className="mt-1 font-semibold text-gray-800">
                                                        {product.farmer?.farm_name ||
                                                            'Not specified'}
                                                    </p>
                                                </div>

                                            </div>

                                        </div>

                                        {/* Product Details */}
                                        <div className="mt-5 grid gap-4 sm:grid-cols-2">

                                            {/* Price */}
                                            <div className="rounded-lg bg-green-50 p-4">
                                                <p className="text-xs font-medium uppercase text-gray-500">
                                                    Price
                                                </p>

                                                <p className="mt-1 text-lg font-bold text-green-600">
                                                    ₱
                                                    {Number(
                                                        product.price
                                                    ).toFixed(2)}
                                                    {' / '}
                                                    {product.unit}
                                                </p>
                                            </div>

                                            {/* Available Supply */}
                                            <div className="rounded-lg bg-gray-50 p-4">
                                                <p className="text-xs font-medium uppercase text-gray-500">
                                                    Available Supply
                                                </p>

                                                <p className="mt-1 text-lg font-bold text-gray-800">
                                                    {product.quantity}{' '}
                                                    {product.unit}
                                                </p>
                                            </div>

                                        </div>

                                        {/* Match Explanation */}
                                        <div className="mt-5 rounded-lg bg-gray-50 p-4">

                                            <h3 className="text-sm font-bold text-gray-800">
                                                Why this matches
                                            </h3>

                                            <div className="mt-3 space-y-2">

                                                {match.match_reasons?.map(
                                                    (reason, index) => (
                                                        <div
                                                            key={index}
                                                            className="flex items-start gap-2"
                                                        >

                                                            <span className="font-bold text-green-600">
                                                                ✓
                                                            </span>

                                                            <p className="text-sm text-gray-600">
                                                                {reason}
                                                            </p>

                                                        </div>
                                                    )
                                                )}

                                            </div>

                                        </div>

                                        {/* Price Comparison */}
                                        {demandRequest.target_price !==
                                            null && (
                                            <div className="mt-4 rounded-lg border border-gray-200 p-3">

                                                {Number(product.price) <=
                                                Number(
                                                    demandRequest.target_price
                                                ) ? (

                                                    <p className="text-sm font-semibold text-green-600">
                                                        ✓ Price is within your
                                                        target of ₱
                                                        {Number(
                                                            demandRequest.target_price
                                                        ).toFixed(2)}
                                                        /{product.unit}
                                                    </p>

                                                ) : (

                                                    <p className="text-sm font-semibold text-orange-600">
                                                        ⚠ Price is above your
                                                        target of ₱
                                                        {Number(
                                                            demandRequest.target_price
                                                        ).toFixed(2)}
                                                        /{product.unit}
                                                    </p>

                                                )}

                                            </div>
                                        )}

                                        {/* Quantity Comparison */}
                                        <div className="mt-3 rounded-lg border border-gray-200 p-3">

                                            {Number(product.quantity) >=
                                            Number(
                                                demandRequest.quantity
                                            ) ? (

                                                <p className="text-sm font-semibold text-green-600">
                                                    ✓ Enough supply for your
                                                    request
                                                </p>

                                            ) : (

                                                <p className="text-sm font-semibold text-orange-600">
                                                    ⚠ Partial supply available:{' '}
                                                    {product.quantity}{' '}
                                                    {product.unit}
                                                </p>

                                            )}

                                        </div>

                                        {/* View Product */}
                                        <div className="mt-5">

                                            <Link
                                                href={route(
                                                    'buyer.marketplace.show',
                                                    product.id
                                                )}
                                                className="block w-full rounded-lg bg-green-600 px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-green-700"
                                            >
                                                View Product
                                            </Link>

                                        </div>

                                    </div>
                                );
                            })}

                        </div>

                    </div>

                )}

            </div>
        </AuthenticatedLayout>
    );
}