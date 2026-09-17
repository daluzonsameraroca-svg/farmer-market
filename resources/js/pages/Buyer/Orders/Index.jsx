import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index({ orders }) {
    const getStatusStyle = (status) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-700';

            case 'confirmed':
                return 'bg-blue-100 text-blue-700';

            case 'completed':
                return 'bg-green-100 text-green-700';

            case 'cancelled':
                return 'bg-red-100 text-red-700';

            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    const getStatusLabel = (status) => {
        switch (status) {
            case 'pending':
                return 'Pending';

            case 'confirmed':
                return 'Confirmed';

            case 'completed':
                return 'Completed';

            case 'cancelled':
                return 'Cancelled';

            default:
                return status;
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="My Orders" />

            <div className="mx-auto max-w-7xl">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-800">
                        My Orders
                    </h1>

                    <p className="mt-1 text-gray-600">
                        View and track your agricultural product orders.
                    </p>
                </div>

                {/* Empty State */}
                {orders.length === 0 ? (

                    <div className="rounded-xl bg-white p-8 text-center shadow-sm">

                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
                            <span className="text-2xl">
                                🛒
                            </span>
                        </div>

                        <h2 className="text-lg font-bold text-gray-800">
                            No Orders Yet
                        </h2>

                        <p className="mt-2 text-sm text-gray-600">
                            You have not placed any orders yet.
                        </p>

                        <Link
                            href={route('buyer.marketplace.index')}
                            className="mt-5 inline-block rounded-lg bg-green-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700"
                        >
                            Browse Marketplace
                        </Link>

                    </div>

                ) : (

                    /* Orders Grid */
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                        {orders.map((order) => (

                            <div
                                key={order.id}
                                className="rounded-xl bg-white p-6 shadow-sm transition hover:shadow-md"
                            >

                                {/* Product Header */}
                                <div className="flex items-start justify-between gap-4">

                                    <div>
                                        <h2 className="text-lg font-bold text-gray-800">
                                            {order.product?.name ||
                                                'Product Unavailable'}
                                        </h2>

                                        <p className="mt-1 text-sm text-gray-500">
                                            Order #{order.id}
                                        </p>
                                    </div>

                                    {/* Status */}
                                    <span
                                        className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                                            order.status
                                        )}`}
                                    >
                                        {getStatusLabel(order.status)}
                                    </span>

                                </div>

                                {/* Farmer */}
                                <div className="mt-5 rounded-lg bg-gray-50 p-4">

                                    <p className="text-sm text-gray-500">
                                        Farmer
                                    </p>

                                    <p className="mt-1 font-semibold text-gray-800">
                                        {order.product?.farmer?.user?.name ||
                                            'Unknown Farmer'}
                                    </p>

                                </div>

                                {/* Order Details */}
                                <div className="mt-5 space-y-3">

                                    {/* Quantity */}
                                    <div className="flex justify-between gap-4">
                                        <span className="text-sm text-gray-500">
                                            Quantity
                                        </span>

                                        <span className="text-sm font-semibold text-gray-800">
                                            {order.quantity}{' '}
                                            {order.product?.unit || ''}
                                        </span>
                                    </div>

                                    {/* Total */}
                                    <div className="flex justify-between gap-4">
                                        <span className="text-sm text-gray-500">
                                            Total Price
                                        </span>

                                        <span className="font-bold text-green-600">
                                            ₱{Number(
                                                order.total_price
                                            ).toFixed(2)}
                                        </span>
                                    </div>

                                    {/* Date */}
                                    <div className="flex justify-between gap-4">
                                        <span className="text-sm text-gray-500">
                                            Order Date
                                        </span>

                                        <span className="text-sm text-gray-700">
                                            {new Date(
                                                order.created_at
                                            ).toLocaleDateString()}
                                        </span>
                                    </div>

                                </div>

                                {/* Status Message */}
                                <div className="mt-5 rounded-lg bg-gray-50 p-4">

                                    {order.status === 'pending' && (
                                        <p className="text-sm text-yellow-700">
                                            ⏳ Your order is waiting for the
                                            farmer to confirm it.
                                        </p>
                                    )}

                                    {order.status === 'confirmed' && (
                                        <p className="text-sm text-blue-700">
                                            ✓ Your order has been confirmed
                                            by the farmer.
                                        </p>
                                    )}

                                    {order.status === 'completed' && (
                                        <p className="text-sm text-green-700">
                                            ✓ Your order has been completed.
                                        </p>
                                    )}

                                    {order.status === 'cancelled' && (
                                        <p className="text-sm text-red-700">
                                            ✕ Your order was cancelled.
                                        </p>
                                    )}

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>
        </AuthenticatedLayout>
    );
}