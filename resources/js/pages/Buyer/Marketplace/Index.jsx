import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index({ products }) {
    return (
        <AuthenticatedLayout>
            <Head title="Marketplace" />

            <div className="mx-auto max-w-7xl">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Marketplace
                    </h1>

                    <p className="mt-1 text-gray-600">
                        Browse products from registered farmers.
                    </p>
                </div>

                {/* No Products */}
                {products.length === 0 ? (
                    <div className="rounded-xl bg-white p-8 text-center shadow-sm">
                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
                            <span className="text-2xl">📦</span>
                        </div>

                        <h2 className="text-lg font-semibold text-gray-800">
                            No Products Available
                        </h2>

                        <p className="mt-2 text-sm text-gray-600">
                            There are currently no products available in the marketplace.
                        </p>
                    </div>
                ) : (
                    /* Product Grid */
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

                        {products.map((product) => (
                            <div
                                key={product.id}
                                className="overflow-hidden rounded-xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                            >

                                {/* Product Header */}
                                <div className="bg-green-50 p-6">

                                    <div className="flex items-start justify-between gap-3">

                                        <div>
                                            <h2 className="text-xl font-bold text-gray-800">
                                                {product.name}
                                            </h2>

                                            <p className="mt-1 text-sm text-gray-500">
                                                {product.category}
                                            </p>
                                        </div>

                                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                                            Available
                                        </span>

                                    </div>

                                </div>

                                {/* Product Information */}
                                <div className="p-6">

                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Price
                                        </p>

                                        <p className="mt-1 text-xl font-bold text-green-600">
                                            ₱{product.price} / {product.unit}
                                        </p>
                                    </div>

                                    <div className="mt-4">
                                        <p className="text-sm text-gray-500">
                                            Available Quantity
                                        </p>

                                        <p className="mt-1 text-sm font-semibold text-gray-800">
                                            {product.quantity} {product.unit}
                                        </p>
                                    </div>

                                    {/* Farmer Information */}
                                    <div className="mt-5 border-t border-gray-200 pt-5">

                                        <p className="text-sm text-gray-500">
                                            Farmer
                                        </p>

                                        <p className="mt-1 font-semibold text-gray-800">
                                            {product.farmer?.farm_name}
                                        </p>

                                    </div>

                                    {/* View Details */}
                                    <div className="mt-5">

                                        <Link
                                            href={route(
                                                'buyer.marketplace.show',
                                                product.id
                                            )}
                                            className="block rounded-lg bg-green-600 px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-green-700"
                                        >
                                            View Details
                                        </Link>

                                    </div>

                                </div>

                            </div>
                        ))}

                    </div>
                )}

            </div>
        </AuthenticatedLayout>
    );
}