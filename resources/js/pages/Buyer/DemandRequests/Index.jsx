import { Head, Link, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index({ requests }) {
    const { flash } = usePage().props;

    return (
        <AuthenticatedLayout>
            <Head title="My Demand Requests" />

            <div className="mx-auto max-w-7xl">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-800">
                        My Demand Requests
                    </h1>

                    <p className="mt-1 text-gray-600">
                        Request agricultural products that you need.
                    </p>
                </div>

                {/* Success Message */}
                {flash?.success && (
                    <div className="mb-6 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-700">
                        {flash.success}
                    </div>
                )}

                {/* Create Request */}
                <div className="mb-6">
                    <Link
                        href={route('buyer.demand-requests.create')}
                        className="inline-flex items-center rounded-lg bg-green-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700"
                    >
                        + Create Demand Request
                    </Link>
                </div>

                {/* Empty State */}
                {requests.length === 0 ? (

                    <div className="rounded-xl bg-white p-8 text-center shadow-sm">

                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
                            <span className="text-2xl">
                                📋
                            </span>
                        </div>

                        <h2 className="text-lg font-bold text-gray-800">
                            No Demand Requests Yet
                        </h2>

                        <p className="mt-2 text-sm text-gray-600">
                            You have not submitted any demand requests yet.
                        </p>

                        <Link
                            href={route(
                                'buyer.demand-requests.create'
                            )}
                            className="mt-5 inline-block rounded-lg bg-green-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700"
                        >
                            Create Your First Request
                        </Link>

                    </div>

                ) : (

                    /* Requests Table */
                    <div className="overflow-hidden rounded-xl bg-white shadow-sm">

                        <div className="border-b border-gray-200 px-6 py-5">
                            <h2 className="text-lg font-bold text-gray-800">
                                Your Requests
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                View your requested products and find
                                available farmer matches.
                            </p>
                        </div>

                        <div className="overflow-x-auto">

                            <table className="w-full">

                                <thead className="bg-green-50">

                                    <tr>

                                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                                            Product
                                        </th>

                                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                                            Category
                                        </th>

                                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                                            Quantity
                                        </th>

                                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                                            Target Price
                                        </th>

                                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                                            Needed By
                                        </th>

                                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                                            Status
                                        </th>

                                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                                            Action
                                        </th>

                                    </tr>

                                </thead>

                                <tbody className="divide-y divide-gray-200">

                                    {requests.map((request) => (

                                        <tr
                                            key={request.id}
                                            className="transition hover:bg-gray-50"
                                        >

                                            {/* Product */}
                                            <td className="px-6 py-4 text-sm font-semibold text-gray-800">
                                                {request.product_name}
                                            </td>

                                            {/* Category */}
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {request.category ||
                                                    'Not specified'}
                                            </td>

                                            {/* Quantity */}
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {request.quantity}{' '}
                                                {request.unit}
                                            </td>

                                            {/* Target Price */}
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {request.target_price
                                                    ? `₱${Number(
                                                          request.target_price
                                                      ).toFixed(2)}`
                                                    : 'Not specified'}
                                            </td>

                                            {/* Needed By */}
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {request.needed_by ||
                                                    'Not specified'}
                                            </td>

                                            {/* Status */}
                                            <td className="px-6 py-4 text-sm">

                                                {request.status ===
                                                    'open' && (
                                                    <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                                                        Open
                                                    </span>
                                                )}

                                                {request.status ===
                                                    'matched' && (
                                                    <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                                                        Matched
                                                    </span>
                                                )}

                                                {request.status ===
                                                    'closed' && (
                                                    <span className="inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
                                                        Closed
                                                    </span>
                                                )}

                                            </td>

                                            {/* Action */}
                                            <td className="px-6 py-4 text-sm">

                                                <Link
                                                    href={route(
                                                        'buyer.demand-requests.matches',
                                                        request.id
                                                    )}
                                                    className="inline-flex rounded-lg bg-green-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-green-700"
                                                >
                                                    Find Matches
                                                </Link>

                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        </div>

                    </div>

                )}

            </div>
        </AuthenticatedLayout>
    );
}