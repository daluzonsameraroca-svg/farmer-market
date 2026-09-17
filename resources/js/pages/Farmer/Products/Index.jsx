import { Head, Link, usePage, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index({ products }) {
    const { auth, errors } = usePage().props;

    const { delete: destroy } = useForm();

    const farmer = auth?.user?.farmer;

    const isVerified = farmer?.bir_verified === true;

    const deleteProduct = (product) => {
        if (confirm(`Are you sure you want to delete ${product.name}?`)) {
            destroy(
                route('farmer.products.destroy', product.id)
            );
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="My Products" />

            <div className="mx-auto max-w-6xl">

                {/* Header */}
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">
                            My Products
                        </h1>

                        <p className="mt-1 text-gray-600">
                            Manage the products you are selling.
                        </p>
                    </div>

                    {/* Add Product Button */}
                    {isVerified ? (
                        <Link
                            href={route('farmer.products.create')}
                            className="rounded-md bg-green-600 px-4 py-2 text-center text-sm font-semibold text-white transition hover:bg-green-700"
                        >
                            + Add Product
                        </Link>
                    ) : (
                        <span
                            className="cursor-not-allowed rounded-md bg-gray-400 px-4 py-2 text-center text-sm font-semibold text-white"
                            title="Your account must be BIR verified first."
                        >
                            + Add Product
                        </span>
                    )}

                </div>

                {/* BIR Verification Notice */}
                {!isVerified && (
                    <div className="mb-6 rounded-lg border border-yellow-300 bg-yellow-50 p-5">

                        <div className="flex items-start gap-3">

                            <div className="text-2xl">
                                ⚠️
                            </div>

                            <div>
                                <h2 className="font-semibold text-yellow-800">
                                    BIR Verification Required
                                </h2>

                                <p className="mt-1 text-sm text-yellow-700">
                                    Your farmer account has not been verified
                                    yet. You cannot list or manage products
                                    until the administrator verifies your BIR
                                    registration.
                                </p>

                                <p className="mt-2 text-sm text-yellow-700">
                                    Please make sure your BIR registration
                                    information is complete and wait for
                                    administrator verification.
                                </p>
                            </div>

                        </div>

                    </div>
                )}

                {/* Verification Error */}
                {errors?.verification && (
                    <div className="mb-6 rounded-lg border border-red-300 bg-red-50 p-4">

                        <p className="text-sm font-medium text-red-700">
                            {errors.verification}
                        </p>

                    </div>
                )}

                {/* Products */}
                {products.length === 0 ? (

                    <div className="rounded-lg bg-white p-8 text-center shadow">

                        <div className="mb-3 text-4xl">
                            📦
                        </div>

                        <p className="font-medium text-gray-700">
                            You have no products yet.
                        </p>

                        {isVerified && (
                            <Link
                                href={route('farmer.products.create')}
                                className="mt-4 inline-block text-green-600 underline hover:text-green-800"
                            >
                                Add your first product
                            </Link>
                        )}

                        {!isVerified && (
                            <p className="mt-4 text-sm text-gray-500">
                                Product listing will become available after
                                your BIR registration is verified.
                            </p>
                        )}

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
                                            Price
                                        </th>

                                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                                            Quantity
                                        </th>

                                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                                            Availability
                                        </th>

                                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                                            Actions
                                        </th>

                                    </tr>

                                </thead>

                                <tbody className="divide-y divide-gray-200">

                                    {products.map((product) => (

                                        <tr
                                            key={product.id}
                                            className="hover:bg-gray-50"
                                        >

                                            {/* Product */}
                                            <td className="px-6 py-4 text-sm font-medium text-gray-800">
                                                {product.name}
                                            </td>

                                            {/* Category */}
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {product.category}
                                            </td>

                                            {/* Price */}
                                            <td className="px-6 py-4 text-sm font-medium text-gray-700">
                                                ₱{product.price}
                                            </td>

                                            {/* Quantity */}
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {product.quantity}{' '}
                                                {product.unit}
                                            </td>

                                            {/* Availability */}
                                            <td className="px-6 py-4 text-sm">

                                                {product.is_available ? (
                                                    <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                                                        Available
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                                                        Not Available
                                                    </span>
                                                )}

                                            </td>

                                            {/* Actions */}
                                            <td className="px-6 py-4 text-sm">

                                                {isVerified ? (
                                                    <div className="flex items-center gap-4">

                                                        <Link
                                                            href={route(
                                                                'farmer.products.edit',
                                                                product.id
                                                            )}
                                                            className="font-medium text-green-600 hover:text-green-800"
                                                        >
                                                            Edit
                                                        </Link>

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                deleteProduct(
                                                                    product
                                                                )
                                                            }
                                                            className="font-medium text-red-600 hover:text-red-800"
                                                        >
                                                            Delete
                                                        </button>

                                                    </div>
                                                ) : (
                                                    <span className="text-gray-400">
                                                        Verification required
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