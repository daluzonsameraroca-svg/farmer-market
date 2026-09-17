import { Head, useForm } from '@inertiajs/react';

import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Edit({ product }) {
    const {
        data,
        setData,
        put,
        processing,
        errors,
    } = useForm({
        name: product.name,
        category: product.category,
        description: product.description || '',
        price: product.price,
        quantity: product.quantity,
        unit: product.unit,
        is_available: product.is_available,
    });

    const submit = (e) => {
        e.preventDefault();

        put(
            route('farmer.products.update', product.id)
        );
    };

    return (
        <AuthenticatedLayout>
            <Head title="Edit Product" />

            <div className="mx-auto max-w-3xl">

                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Edit Product
                    </h1>

                    <p className="mt-1 text-gray-600">
                        Update your product information.
                    </p>
                </div>

                {/* Form Card */}
                <div className="rounded-lg bg-white p-6 shadow">

                    <form onSubmit={submit}>

                        {/* Product Name */}
                        <div>
                            <InputLabel
                                htmlFor="name"
                                value="Product Name"
                            />

                            <TextInput
                                id="name"
                                value={data.name}
                                className="mt-1 block w-full"
                                onChange={(e) =>
                                    setData('name', e.target.value)
                                }
                                required
                            />

                            <InputError
                                message={errors.name}
                                className="mt-2"
                            />
                        </div>

                        {/* Category */}
                        <div className="mt-5">
                            <InputLabel
                                htmlFor="category"
                                value="Category"
                            />

                            <TextInput
                                id="category"
                                value={data.category}
                                className="mt-1 block w-full"
                                onChange={(e) =>
                                    setData('category', e.target.value)
                                }
                                required
                            />

                            <InputError
                                message={errors.category}
                                className="mt-2"
                            />
                        </div>

                        {/* Description */}
                        <div className="mt-5">
                            <InputLabel
                                htmlFor="description"
                                value="Description"
                            />

                            <textarea
                                id="description"
                                value={data.description}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                                rows="4"
                                placeholder="Describe your product..."
                                onChange={(e) =>
                                    setData(
                                        'description',
                                        e.target.value
                                    )
                                }
                            />

                            <InputError
                                message={errors.description}
                                className="mt-2"
                            />
                        </div>

                        {/* Price */}
                        <div className="mt-5">
                            <InputLabel
                                htmlFor="price"
                                value="Price per Unit"
                            />

                            <div className="relative mt-1">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                                    ₱
                                </span>

                                <TextInput
                                    id="price"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    value={data.price}
                                    className="block w-full pl-8"
                                    onChange={(e) =>
                                        setData(
                                            'price',
                                            e.target.value
                                        )
                                    }
                                    required
                                />
                            </div>

                            <InputError
                                message={errors.price}
                                className="mt-2"
                            />
                        </div>

                        {/* Quantity */}
                        <div className="mt-5">
                            <InputLabel
                                htmlFor="quantity"
                                value="Available Quantity"
                            />

                            <TextInput
                                id="quantity"
                                type="number"
                                step="0.01"
                                min="0"
                                value={data.quantity}
                                className="mt-1 block w-full"
                                onChange={(e) =>
                                    setData(
                                        'quantity',
                                        e.target.value
                                    )
                                }
                                required
                            />

                            <InputError
                                message={errors.quantity}
                                className="mt-2"
                            />
                        </div>

                        {/* Unit */}
                        <div className="mt-5">
                            <InputLabel
                                htmlFor="unit"
                                value="Unit"
                            />

                            <TextInput
                                id="unit"
                                value={data.unit}
                                className="mt-1 block w-full"
                                onChange={(e) =>
                                    setData(
                                        'unit',
                                        e.target.value
                                    )
                                }
                                required
                            />

                            <InputError
                                message={errors.unit}
                                className="mt-2"
                            />
                        </div>

                        {/* Availability */}
                        <div className="mt-5">
                            <InputLabel
                                htmlFor="is_available"
                                value="Availability"
                            />

                            <select
                                id="is_available"
                                value={data.is_available ? '1' : '0'}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                                onChange={(e) =>
                                    setData(
                                        'is_available',
                                        e.target.value === '1'
                                    )
                                }
                            >
                                <option value="1">
                                    Available
                                </option>

                                <option value="0">
                                    Not Available
                                </option>
                            </select>

                            <InputError
                                message={errors.is_available}
                                className="mt-2"
                            />
                        </div>

                        {/* Buttons */}
                        <div className="mt-7 flex items-center justify-between">

                            <a
                                href={route('farmer.products.index')}
                                className="text-sm font-medium text-gray-600 hover:text-gray-800"
                            >
                                ← Back to Products
                            </a>

                            <PrimaryButton
                                disabled={processing}
                                className="bg-green-600 hover:bg-green-700 focus:bg-green-700 active:bg-green-800"
                            >
                                {processing
                                    ? 'Saving...'
                                    : 'Update Product'}
                            </PrimaryButton>

                        </div>

                    </form>

                </div>

            </div>
        </AuthenticatedLayout>
    );
}