import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Create() {
    const {
        data,
        setData,
        post,
        processing,
        errors,
    } = useForm({
        product_name: '',
        category: '',
        quantity: '',
        unit: '',
        target_price: '',
        needed_by: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('buyer.demand-requests.store'));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Create Demand Request" />

            <div className="mx-auto max-w-2xl">

                {/* Header */}
                <div className="mb-8">
                    <Link
                        href={route('buyer.demand-requests.index')}
                        className="text-sm font-semibold text-green-600 hover:text-green-700"
                    >
                        ← Back to Demand Requests
                    </Link>

                    <h1 className="mt-4 text-2xl font-bold text-gray-800">
                        Create Demand Request
                    </h1>

                    <p className="mt-1 text-gray-600">
                        Tell farmers what agricultural products you need.
                    </p>
                </div>

                {/* Form */}
                <form
                    onSubmit={submit}
                    className="rounded-xl bg-white p-6 shadow-sm"
                >

                    {/* Product Name */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700">
                            Product Name
                        </label>

                        <input
                            type="text"
                            value={data.product_name}
                            onChange={(e) =>
                                setData('product_name', e.target.value)
                            }
                            placeholder="Example: Tomatoes"
                            className="mt-2 w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                        />

                        {errors.product_name && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.product_name}
                            </p>
                        )}
                    </div>

                    {/* Category */}
                    <div className="mt-5">
                        <label className="block text-sm font-semibold text-gray-700">
                            Category
                        </label>

                        <input
                            type="text"
                            value={data.category}
                            onChange={(e) =>
                                setData('category', e.target.value)
                            }
                            placeholder="Example: Vegetables"
                            className="mt-2 w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                        />

                        {errors.category && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.category}
                            </p>
                        )}
                    </div>

                    {/* Quantity */}
                    <div className="mt-5">
                        <label className="block text-sm font-semibold text-gray-700">
                            Quantity Needed
                        </label>

                        <input
                            type="number"
                            step="0.01"
                            min="0.01"
                            value={data.quantity}
                            onChange={(e) =>
                                setData('quantity', e.target.value)
                            }
                            placeholder="Example: 50"
                            className="mt-2 w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                        />

                        {errors.quantity && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.quantity}
                            </p>
                        )}
                    </div>

                    {/* Unit */}
                    <div className="mt-5">
                        <label className="block text-sm font-semibold text-gray-700">
                            Unit
                        </label>

                        <select
                            value={data.unit}
                            onChange={(e) =>
                                setData('unit', e.target.value)
                            }
                            className="mt-2 w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                        >
                            <option value="">
                                Select unit
                            </option>

                            <option value="kg">
                                Kilogram (kg)
                            </option>

                            <option value="g">
                                Gram (g)
                            </option>

                            <option value="sack">
                                Sack
                            </option>

                            <option value="piece">
                                Piece
                            </option>

                            <option value="crate">
                                Crate
                            </option>

                            <option value="box">
                                Box
                            </option>
                        </select>

                        {errors.unit && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.unit}
                            </p>
                        )}
                    </div>

                    {/* Target Price */}
                    <div className="mt-5">
                        <label className="block text-sm font-semibold text-gray-700">
                            Target Price
                        </label>

                        <div className="relative mt-2">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                                ₱
                            </span>

                            <input
                                type="number"
                                step="0.01"
                                min="0"
                                value={data.target_price}
                                onChange={(e) =>
                                    setData(
                                        'target_price',
                                        e.target.value
                                    )
                                }
                                placeholder="Optional"
                                className="w-full rounded-lg border-gray-300 pl-8 shadow-sm focus:border-green-500 focus:ring-green-500"
                            />
                        </div>

                        <p className="mt-1 text-xs text-gray-500">
                            Enter your preferred price per unit.
                        </p>

                        {errors.target_price && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.target_price}
                            </p>
                        )}
                    </div>

                    {/* Needed By */}
                    <div className="mt-5">
                        <label className="block text-sm font-semibold text-gray-700">
                            Needed By
                        </label>

                        <input
                            type="date"
                            value={data.needed_by}
                            onChange={(e) =>
                                setData('needed_by', e.target.value)
                            }
                            className="mt-2 w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                        />

                        {errors.needed_by && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.needed_by}
                            </p>
                        )}
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={processing}
                        className="mt-7 w-full rounded-lg bg-green-600 px-4 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {processing
                            ? 'Submitting...'
                            : 'Submit Demand Request'}
                    </button>

                </form>
            </div>
        </AuthenticatedLayout>
    );
}