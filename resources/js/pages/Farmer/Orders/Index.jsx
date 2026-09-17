import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index({ orders }) {
    const {
        data,
        setData,
        put,
        processing,
    } = useForm({
        status: '',
    });

    const updateStatus = (order, status) => {
        setData('status', status);

        put(
            route('farmer.orders.update', order.id),
            {
                preserveScroll: true,
            }
        );
    };

    return (
        <AuthenticatedLayout>
            <Head title="Customer Orders" />

            <div className="mx-auto max-w-6xl">

                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Customer Orders
                    </h1>

                    <p className="mt-1 text-gray-600">
                        Manage orders placed by buyers.
                    </p>
                </div>

                {/* Empty State */}
                {orders.length === 0 ? (

                    <div className="rounded-lg bg-white p-8 text-center shadow">

                        <div className="mb-3 text-4xl">
                            🛒
                        </div>

                        <p className="font-medium text-gray-700">
                            You have no customer orders yet.
                        </p>

                        <p className="mt-1 text-sm text-gray-500">
                            Orders from buyers will appear here.
                        </p>

                    </div>

                ) : (

                    /* Orders Table */
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
                                            Quantity
                                        </th>

                                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                                            Total
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

                                    {orders.map((order) => (

                                        <tr
                                            key={order.id}
                                            className="hover:bg-gray-50"
                                        >

                                            {/* Buyer */}
                                            <td className="px-6 py-4 text-sm font-medium text-gray-800">
                                                {order.buyer?.user?.name || 'Unknown Buyer'}
                                            </td>

                                            {/* Product */}
                                            <td className="px-6 py-4 text-sm text-gray-800">
                                                {order.product?.name || 'Unknown Product'}
                                            </td>

                                            {/* Quantity */}
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {order.quantity}{' '}
                                                {order.product?.unit}
                                            </td>

                                            {/* Total */}
                                            <td className="px-6 py-4 text-sm font-medium text-gray-700">
                                                ₱{order.total_price}
                                            </td>

                                            {/* Status */}
                                            <td className="px-6 py-4 text-sm">

                                                {order.status === 'pending' && (
                                                    <span className="inline-flex rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                                                        Pending
                                                    </span>
                                                )}

                                                {order.status === 'confirmed' && (
                                                    <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                                                        Confirmed
                                                    </span>
                                                )}

                                                {order.status === 'completed' && (
                                                    <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                                                        Completed
                                                    </span>
                                                )}

                                                {order.status === 'cancelled' && (
                                                    <span className="inline-flex rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                                                        Cancelled
                                                    </span>
                                                )}

                                            </td>

                                            {/* Actions */}
                                            <td className="px-6 py-4 text-sm">

                                                {/* Pending */}
                                                {order.status === 'pending' && (

                                                    <div className="flex flex-wrap gap-2">

                                                        <button
                                                            type="button"
                                                            disabled={processing}
                                                            onClick={() =>
                                                                updateStatus(
                                                                    order,
                                                                    'confirmed'
                                                                )
                                                            }
                                                            className="rounded-md bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                                                        >
                                                            Confirm
                                                        </button>

                                                        <button
                                                            type="button"
                                                            disabled={processing}
                                                            onClick={() =>
                                                                updateStatus(
                                                                    order,
                                                                    'cancelled'
                                                                )
                                                            }
                                                            className="rounded-md bg-red-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                                                        >
                                                            Cancel
                                                        </button>

                                                    </div>

                                                )}

                                                {/* Confirmed */}
                                                {order.status === 'confirmed' && (

                                                    <button
                                                        type="button"
                                                        disabled={processing}
                                                        onClick={() =>
                                                            updateStatus(
                                                                order,
                                                                'completed'
                                                            )
                                                        }
                                                        className="rounded-md bg-green-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                                                    >
                                                        Complete
                                                    </button>

                                                )}

                                                {/* Finished */}
                                                {(order.status === 'completed' ||
                                                    order.status === 'cancelled') && (

                                                    <span className="text-xs text-gray-400">
                                                        No action
                                                    </span>

                                                )}

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