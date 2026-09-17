import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index({ matches }) {
    return (
        <AuthenticatedLayout>
            <Head title="Buyer Demand Requests" />

            <div className="mx-auto max-w-7xl">

                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Buyer Demand Requests
                    </h1>

                    <p className="mt-1 text-gray-600">
                        View buyer requests that may match your available
                        products.
                    </p>
                </div>

                {/* No Matches */}
                {matches.length === 0 ? (

                    <div className="rounded-lg bg-white p-8 text-center shadow">

                        <div className="mb-3 text-4xl">
                            🔎
                        </div>

                        <h2 className="text-lg font-bold text-gray-800">
                            No Matching Requests
                        </h2>

                        <p className="mt-2 text-sm text-gray-600">
                            There are currently no buyer demand requests
                            matching your available products.
                        </p>

                    </div>

                ) : (

                    <div className="grid gap-6 md:grid-cols-2">

                        {matches.map((match, index) => {

                            const request = match.demand_request;
                            const product = match.product;

                            return (
                                <div
                                    key={`${request.id}-${product.id}-${index}`}
                                    className="rounded-lg bg-white p-6 shadow transition hover:shadow-md"
                                >

                                    {/* Match Score */}
                                    <div className="flex items-center justify-between">

                                        <div>
                                            <p className="text-sm text-gray-500">
                                                Match Score
                                            </p>

                                            <p className="text-2xl font-bold text-green-600">
                                                {match.match_score}%
                                            </p>
                                        </div>

                                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                                            Potential Match
                                        </span>

                                    </div>

                                    {/* Buyer */}
                                    <div className="mt-5">
                                        <p className="text-sm text-gray-500">
                                            Buyer
                                        </p>

                                        <p className="font-semibold text-gray-800">
                                            {request.buyer?.user?.name ||
                                                'Unknown Buyer'}
                                        </p>
                                    </div>

                                    {/* Buyer Request */}
                                    <div className="mt-4 rounded-md bg-gray-50 p-4">

                                        <h3 className="font-bold text-gray-800">
                                            Buyer Request
                                        </h3>

                                        <div className="mt-3 space-y-2 text-sm">

                                            <div className="flex justify-between gap-4">
                                                <span className="text-gray-500">
                                                    Product
                                                </span>

                                                <span className="text-right font-semibold text-gray-800">
                                                    {request.product_name}
                                                </span>
                                            </div>

                                            <div className="flex justify-between gap-4">
                                                <span className="text-gray-500">
                                                    Quantity
                                                </span>

                                                <span className="font-semibold text-gray-800">
                                                    {request.quantity}{' '}
                                                    {request.unit}
                                                </span>
                                            </div>

                                            <div className="flex justify-between gap-4">
                                                <span className="text-gray-500">
                                                    Target Price
                                                </span>

                                                <span className="font-semibold text-gray-800">
                                                    {request.target_price
                                                        ? `₱${Number(
                                                              request.target_price
                                                          ).toFixed(2)}`
                                                        : 'Not specified'}
                                                </span>
                                            </div>

                                            <div className="flex justify-between gap-4">
                                                <span className="text-gray-500">
                                                    Needed By
                                                </span>

                                                <span className="font-semibold text-gray-800">
                                                    {request.needed_by ||
                                                        'Not specified'}
                                                </span>
                                            </div>

                                        </div>
                                    </div>

                                    {/* Farmer Product */}
                                    <div className="mt-4 rounded-md bg-green-50 p-4">

                                        <h3 className="font-bold text-green-800">
                                            Your Matching Product
                                        </h3>

                                        <div className="mt-3 space-y-2 text-sm">

                                            <div className="flex justify-between gap-4">
                                                <span className="text-gray-500">
                                                    Product
                                                </span>

                                                <span className="text-right font-semibold text-gray-800">
                                                    {product.name}
                                                </span>
                                            </div>

                                            <div className="flex justify-between gap-4">
                                                <span className="text-gray-500">
                                                    Your Price
                                                </span>

                                                <span className="font-bold text-green-600">
                                                    ₱
                                                    {Number(
                                                        product.price
                                                    ).toFixed(2)}
                                                </span>
                                            </div>

                                            <div className="flex justify-between gap-4">
                                                <span className="text-gray-500">
                                                    Available Supply
                                                </span>

                                                <span className="font-semibold text-gray-800">
                                                    {product.quantity}{' '}
                                                    {product.unit}
                                                </span>
                                            </div>

                                        </div>
                                    </div>

                                    {/* Match Reasons */}
                                    <div className="mt-4">

                                        <h3 className="font-bold text-gray-800">
                                            Why This Matches
                                        </h3>

                                        <ul className="mt-2 space-y-1">

                                            {match.match_reasons.map(
                                                (reason, reasonIndex) => (
                                                    <li
                                                        key={reasonIndex}
                                                        className="text-sm text-gray-600"
                                                    >
                                                        <span className="mr-1 font-semibold text-green-600">
                                                            ✓
                                                        </span>
                                                        {reason}
                                                    </li>
                                                )
                                            )}

                                        </ul>

                                    </div>

                                </div>
                            );
                        })}

                    </div>

                )}

            </div>
        </AuthenticatedLayout>
    );
}