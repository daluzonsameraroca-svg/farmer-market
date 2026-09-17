import { Head, useForm } from '@inertiajs/react';

import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Create() {
    const {
        data,
        setData,
        post,
        processing,
        errors,
    } = useForm({
        name: '',
        category: '',
        description: '',
        price: '',
        quantity: '',
        unit: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('farmer.products.store'));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Add Product" />

            <div className="mx-auto max-w-3xl">

                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Add Product
                    </h1>

                    <p className="mt-1 text-gray-600">
                        Add a product that you want to sell.
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
                                placeholder="Example: Fresh Tomatoes"
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
                                placeholder="Example: Vegetables"
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
                                    setData('description', e.target.value)
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
                                    placeholder="Example: 50.00"
                                    onChange={(e) =>
                                        setData('price', e.target.value)
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
                                placeholder="Example: 100"
                                onChange={(e) =>
                                    setData('quantity', e.target.value)
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
                                placeholder="Example: kg"
                                onChange={(e) =>
                                    setData('unit', e.target.value)
                                }
                                required
                            />

                            <InputError
                                message={errors.unit}
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
                                    : 'Add Product'}
                            </PrimaryButton>

                        </div>

                    </form>

                </div>

            </div>
        </AuthenticatedLayout>
    );
}