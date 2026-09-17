import { Head, Link } from '@inertiajs/react';

export default function Index({ orders }) {
    return (
        <>
            <Head title="Order Management" />

            <div className="min-h-screen bg-gray-100 p-6">
                <div className="mx-auto max-w-7xl">

                    {/* Header */}
                    <div className="mb-6 flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">
                                Order Management
                            </h1>

                            <p className="mt-1 text-gray-600">
                                Monitor orders placed between buyers and
                                farmers.
                            </p>
                        </div>

                        <Link
                            href={route('admin.dashboard')}
                            className="rounded-md bg-gray-600 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-700"
                        >
                            Back to Dashboard
                        </Link>
                    </div>

                    {/* Orders */}
                    {orders.length === 0 ? (
                        <div className="rounded-lg bg-white p-6 text-center shadow">
                            <p className="text-gray-600">
                                No orders have been placed yet.
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-hidden rounded-lg bg-white shadow">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                                                Buyer
                                            </th>

                                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                                                Product
                                            </th>

                                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                                                Farmer
                                            </th>

                                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                                                Quantity
                                            </th>

                                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                                                Total Price
                                            </th>

                                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                                                Status
                                            </th>

                                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                                                Date
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-gray-200">
                                        {orders.map((order) => (
                                            <tr key={order.id}>

                                                {/* Buyer */}
                                                <td className="px-6 py-4 text-sm font-medium text-gray-800">
                                                    {order.buyer?.user?.name ||
                                                        'Unknown Buyer'}
                                                </td>

                                                {/* Product */}
                                                <td className="px-6 py-4 text-sm text-gray-800">
                                                    {order.product?.name ||
                                                        'Unknown Product'}
                                                </td>

                                                {/* Farmer */}
                                                <td className="px-6 py-4 text-sm text-gray-600">
                                                    {order.product?.farmer?.user
                                                        ?.name ||
                                                        'Unknown Farmer'}
                                                </td>

                                                {/* Quantity */}
                                                <td className="px-6 py-4 text-sm text-gray-600">
                                                    {order.quantity}{' '}
                                                    {order.product?.unit}
                                                </td>

                                                {/* Total */}
                                                <td className="px-6 py-4 text-sm font-semibold text-gray-800">
                                                    ₱
                                                    {Number(
                                                        order.total_price
                                                    ).toFixed(2)}
                                                </td>

                                                {/* Status */}
                                                <td className="px-6 py-4 text-sm">
                                                    {order.status ===
                                                        'pending' && (
                                                        <span className="font-semibold text-yellow-600">
                                                            Pending
                                                        </span>
                                                    )}

                                                    {order.status ===
                                                        'confirmed' && (
                                                        <span className="font-semibold text-blue-600">
                                                            Confirmed
                                                        </span>
                                                    )}

                                                    {order.status ===
                                                        'completed' && (
                                                        <span className="font-semibold text-green-600">
                                                            Completed
                                                        </span>
                                                    )}

                                                    {order.status ===
                                                        'cancelled' && (
                                                        <span className="font-semibold text-red-600">
                                                            Cancelled
                                                        </span>
                                                    )}
                                                </td>

                                                {/* Date */}
                                                <td className="px-6 py-4 text-sm text-gray-600">
                                                    {new Date(
                                                        order.created_at
                                                    ).toLocaleDateString()}
                                                </td>

                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </>
    );
}