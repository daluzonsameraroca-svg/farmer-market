import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ products }) {
    const [processing, setProcessing] = useState(false);

    const updateAvailability = (product, available) => {
        setProcessing(true);

        router.put(
            route('admin.products.update', product.id),
            {
                is_available: available,
            },
            {
                preserveScroll: true,
                onFinish: () => {
                    setProcessing(false);
                },
            }
        );
    };

    return (
        <>
            <Head title="Product Management" />

            <div className="min-h-screen bg-gray-100 p-6">
                <div className="mx-auto max-w-7xl">

                    {/* Header */}
                    <div className="mb-6 flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">
                                Product Management
                            </h1>

                            <p className="mt-1 text-gray-600">
                                View and manage products listed by farmers.
                            </p>
                        </div>

                        <Link
                            href={route('admin.dashboard')}
                            className="rounded-md bg-gray-600 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-700"
                        >
                            Back to Dashboard
                        </Link>
                    </div>

                    {/* Products */}
                    {products.length === 0 ? (
                        <div className="rounded-lg bg-white p-6 text-center shadow">
                            <p className="text-gray-600">
                                No products have been listed yet.
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-hidden rounded-lg bg-white shadow">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                                                Product
                                            </th>

                                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                                                Category
                                            </th>

                                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                                                Farmer
                                            </th>

                                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                                                Price
                                            </th>

                                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                                                Quantity
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
                                        {products.map((product) => (
                                            <tr key={product.id}>

                                                <td className="px-6 py-4 text-sm font-medium text-gray-800">
                                                    {product.name}
                                                </td>

                                                <td className="px-6 py-4 text-sm text-gray-600">
                                                    {product.category}
                                                </td>

                                                <td className="px-6 py-4 text-sm text-gray-600">
                                                    {product.farmer?.user?.name}
                                                </td>

                                                <td className="px-6 py-4 text-sm font-semibold text-gray-800">
                                                    ₱{Number(product.price).toFixed(2)}
                                                    {' / '}
                                                    {product.unit}
                                                </td>

                                                <td className="px-6 py-4 text-sm text-gray-600">
                                                    {product.quantity} {product.unit}
                                                </td>

                                                <td className="px-6 py-4 text-sm">
                                                    {product.is_available ? (
                                                        <span className="font-semibold text-green-600">
                                                            Available
                                                        </span>
                                                    ) : (
                                                        <span className="font-semibold text-red-600">
                                                            Unavailable
                                                        </span>
                                                    )}
                                                </td>

                                                <td className="px-6 py-4 text-sm">
                                                    {product.is_available ? (
                                                        <button
                                                            type="button"
                                                            disabled={processing}
                                                            onClick={() =>
                                                                updateAvailability(
                                                                    product,
                                                                    false
                                                                )
                                                            }
                                                            className="rounded-md bg-red-600 px-3 py-1 text-white hover:bg-red-700 disabled:opacity-50"
                                                        >
                                                            {processing
                                                                ? 'Updating...'
                                                                : 'Disable'}
                                                        </button>
                                                    ) : (
                                                        <button
                                                            type="button"
                                                            disabled={processing}
                                                            onClick={() =>
                                                                updateAvailability(
                                                                    product,
                                                                    true
                                                                )
                                                            }
                                                            className="rounded-md bg-green-600 px-3 py-1 text-white hover:bg-green-700 disabled:opacity-50"
                                                        >
                                                            {processing
                                                                ? 'Updating...'
                                                                : 'Enable'}
                                                        </button>
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
            </div>
        </>
    );
}