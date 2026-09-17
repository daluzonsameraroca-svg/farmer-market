import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Show({ product }) {
    const [quantity, setQuantity] = useState(1);
    const [showConfirm, setShowConfirm] = useState(false);
    const [showComplaint, setShowComplaint] = useState(false);

    const {
        data,
        setData,
        post,
        processing,
        errors,
    } = useForm({
        quantity: 1,
    });

    const {
        data: complaintData,
        setData: setComplaintData,
        post: postComplaint,
        processing: complaintProcessing,
        errors: complaintErrors,
        reset: resetComplaint,
    } = useForm({
        reported_price: product.price,
        reason: '',
    });

    /*
    |--------------------------------------------------------------------------
    | Quantity Change
    |--------------------------------------------------------------------------
    */

    const handleQuantityChange = (value) => {
        let newQuantity = Number(value);

        if (newQuantity < 0.01) {
            newQuantity = 0.01;
        }

        if (newQuantity > Number(product.quantity)) {
            newQuantity = Number(product.quantity);
        }

        setQuantity(newQuantity);
        setData('quantity', newQuantity);
    };

    /*
    |--------------------------------------------------------------------------
    | Open Order Confirmation
    |--------------------------------------------------------------------------
    */

    const openConfirmation = (e) => {
        e.preventDefault();

        if (
            !quantity ||
            Number(quantity) <= 0 ||
            Number(quantity) > Number(product.quantity)
        ) {
            return;
        }

        setShowConfirm(true);
    };

    /*
    |--------------------------------------------------------------------------
    | Confirm Order
    |--------------------------------------------------------------------------
    */

    const confirmOrder = () => {
        post(route('buyer.orders.store', product.id), {
            preserveScroll: true,
            onSuccess: () => {
                setShowConfirm(false);
            },
        });
    };

    /*
    |--------------------------------------------------------------------------
    | Submit Price Complaint
    |--------------------------------------------------------------------------
    */

    const submitComplaint = (e) => {
        e.preventDefault();

        postComplaint(
            route('buyer.price-complaints.store', product.id),
            {
                preserveScroll: true,
                onSuccess: () => {
                    setShowComplaint(false);
                    resetComplaint();
                },
            }
        );
    };

    /*
    |--------------------------------------------------------------------------
    | Total Price
    |--------------------------------------------------------------------------
    */

    const totalPrice =
        Number(quantity || 0) * Number(product.price);

    return (
        <AuthenticatedLayout>
            <Head title={product.name} />

            <div className="mx-auto max-w-5xl">

                {/* Back to Marketplace */}
                <div className="mb-6">
                    <Link
                        href={route('buyer.marketplace.index')}
                        className="inline-flex items-center rounded-lg bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50"
                    >
                        ← Back to Marketplace
                    </Link>
                </div>

                {/* Product Card */}
                <div className="overflow-hidden rounded-xl bg-white shadow-sm">

                    {/* Product Header */}
                    <div className="border-b border-gray-200 bg-green-50 p-6 sm:p-8">

                        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">

                            <div>
                                <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                                    {product.category}
                                </span>

                                <h1 className="mt-3 text-3xl font-bold text-gray-800">
                                    {product.name}
                                </h1>

                                <p className="mt-2 text-sm text-gray-600">
                                    Product offered directly by a registered farmer.
                                </p>
                            </div>

                            <div className="text-left sm:text-right">
                                <p className="text-3xl font-bold text-green-600">
                                    ₱{Number(product.price).toFixed(2)}
                                </p>

                                <p className="text-sm text-gray-500">
                                    per {product.unit}
                                </p>
                            </div>

                        </div>

                    </div>

                    {/* Product Information */}
                    <div className="p-6 sm:p-8">

                        <div className="grid gap-4 sm:grid-cols-2">

                            {/* Farmer */}
                            <div className="rounded-lg bg-gray-50 p-5">
                                <p className="text-sm text-gray-500">
                                    Farmer
                                </p>

                                <p className="mt-1 font-semibold text-gray-800">
                                    {product.farmer?.user?.name ||
                                        'Unknown Farmer'}
                                </p>
                            </div>

                            {/* Farm */}
                            <div className="rounded-lg bg-gray-50 p-5">
                                <p className="text-sm text-gray-500">
                                    Farm
                                </p>

                                <p className="mt-1 font-semibold text-gray-800">
                                    {product.farmer?.farm_name ||
                                        'Not specified'}
                                </p>
                            </div>

                            {/* Available Supply */}
                            <div className="rounded-lg bg-gray-50 p-5">
                                <p className="text-sm text-gray-500">
                                    Available Supply
                                </p>

                                <p className="mt-1 font-semibold text-gray-800">
                                    {product.quantity} {product.unit}
                                </p>
                            </div>

                            {/* Category */}
                            <div className="rounded-lg bg-gray-50 p-5">
                                <p className="text-sm text-gray-500">
                                    Category
                                </p>

                                <p className="mt-1 font-semibold text-gray-800">
                                    {product.category}
                                </p>
                            </div>

                        </div>

                        {/* Description */}
                        <div className="mt-8">
                            <h2 className="text-lg font-bold text-gray-800">
                                Description
                            </h2>

                            <p className="mt-2 leading-relaxed text-gray-600">
                                {product.description ||
                                    'No description provided.'}
                            </p>
                        </div>

                        {/* Order Section */}
                        <div className="mt-8 rounded-xl border border-green-100 bg-green-50 p-6">

                            <div>
                                <h2 className="text-lg font-bold text-gray-800">
                                    Place an Order
                                </h2>

                                <p className="mt-1 text-sm text-gray-600">
                                    Enter the quantity you want to purchase.
                                </p>
                            </div>

                            {/* Quantity */}
                            <div className="mt-5">

                                <label
                                    htmlFor="quantity"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Quantity ({product.unit})
                                </label>

                                <input
                                    id="quantity"
                                    type="number"
                                    min="0.01"
                                    max={product.quantity}
                                    step="0.01"
                                    value={quantity}
                                    onChange={(e) =>
                                        handleQuantityChange(
                                            e.target.value
                                        )
                                    }
                                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                                />

                                {errors.quantity && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.quantity}
                                    </p>
                                )}

                            </div>

                            {/* Total */}
                            <div className="mt-5 rounded-lg bg-white p-4 shadow-sm">

                                <div className="flex items-center justify-between">

                                    <span className="text-gray-600">
                                        Total Price
                                    </span>

                                    <span className="text-2xl font-bold text-green-600">
                                        ₱{totalPrice.toFixed(2)}
                                    </span>

                                </div>

                            </div>

                            {/* Order Button */}
                            <button
                                type="button"
                                onClick={openConfirmation}
                                disabled={
                                    processing ||
                                    Number(product.quantity) <= 0
                                }
                                className="mt-5 w-full rounded-lg bg-green-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-300"
                            >
                                {processing
                                    ? 'Processing...'
                                    : 'Place Order'}
                            </button>

                        </div>

                        {/* Price Complaint */}
                        <div className="mt-8 border-t border-gray-200 pt-6">

                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                                <div>
                                    <h2 className="font-bold text-gray-800">
                                        Think this price is too high?
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-500">
                                        Report the product price to the
                                        administrator for review.
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowComplaint(true)
                                    }
                                    className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-600"
                                >
                                    Report Price
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            {/* ========================================================= */}
            {/* ORDER CONFIRMATION MODAL */}
            {/* ========================================================= */}

            {showConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

                    <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">

                        <h2 className="text-xl font-bold text-gray-800">
                            Confirm Order
                        </h2>

                        <p className="mt-2 text-sm text-gray-600">
                            Please review your order before confirming.
                        </p>

                        {/* Order Details */}
                        <div className="mt-5 space-y-3 rounded-lg bg-gray-50 p-4">

                            <div className="flex justify-between gap-4">
                                <span className="text-gray-500">
                                    Product
                                </span>

                                <span className="font-semibold text-gray-800">
                                    {product.name}
                                </span>
                            </div>

                            <div className="flex justify-between gap-4">
                                <span className="text-gray-500">
                                    Quantity
                                </span>

                                <span className="font-semibold text-gray-800">
                                    {quantity} {product.unit}
                                </span>
                            </div>

                            <div className="flex justify-between gap-4">
                                <span className="text-gray-500">
                                    Price
                                </span>

                                <span className="font-semibold text-gray-800">
                                    ₱{Number(product.price).toFixed(2)}
                                    /{product.unit}
                                </span>
                            </div>

                            <div className="border-t pt-3">
                                <div className="flex justify-between gap-4">

                                    <span className="font-semibold text-gray-700">
                                        Total
                                    </span>

                                    <span className="text-lg font-bold text-green-600">
                                        ₱{totalPrice.toFixed(2)}
                                    </span>

                                </div>
                            </div>

                        </div>

                        <p className="mt-4 text-sm text-gray-600">
                            Are you sure you want to place this order?
                        </p>

                        {/* Modal Buttons */}
                        <div className="mt-6 flex justify-end gap-3">

                            <button
                                type="button"
                                onClick={() =>
                                    setShowConfirm(false)
                                }
                                disabled={processing}
                                className="rounded-lg bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-300"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={confirmOrder}
                                disabled={processing}
                                className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:bg-gray-300"
                            >
                                {processing
                                    ? 'Confirming...'
                                    : 'Confirm Order'}
                            </button>

                        </div>

                    </div>

                </div>
            )}

            {/* ========================================================= */}
            {/* PRICE COMPLAINT MODAL */}
            {/* ========================================================= */}

            {showComplaint && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

                    <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">

                        <h2 className="text-xl font-bold text-gray-800">
                            Report Product Price
                        </h2>

                        <p className="mt-2 text-sm text-gray-600">
                            Submit a complaint if you believe the listed
                            price is unreasonable.
                        </p>

                        <form
                            onSubmit={submitComplaint}
                            className="mt-5"
                        >

                            {/* Reported Price */}
                            <div>

                                <label
                                    htmlFor="reported_price"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Reported Price
                                </label>

                                <input
                                    id="reported_price"
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={
                                        complaintData.reported_price
                                    }
                                    onChange={(e) =>
                                        setComplaintData(
                                            'reported_price',
                                            e.target.value
                                        )
                                    }
                                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                                />

                                {complaintErrors.reported_price && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {
                                            complaintErrors
                                                .reported_price
                                        }
                                    </p>
                                )}

                            </div>

                            {/* Reason */}
                            <div className="mt-4">

                                <label
                                    htmlFor="reason"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Reason
                                </label>

                                <textarea
                                    id="reason"
                                    rows="4"
                                    value={complaintData.reason}
                                    onChange={(e) =>
                                        setComplaintData(
                                            'reason',
                                            e.target.value
                                        )
                                    }
                                    placeholder="Explain why you believe the price should be reviewed."
                                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                                />

                                {complaintErrors.reason && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {complaintErrors.reason}
                                    </p>
                                )}

                            </div>

                            {/* Complaint Buttons */}
                            <div className="mt-6 flex justify-end gap-3">

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowComplaint(false)
                                    }
                                    disabled={complaintProcessing}
                                    className="rounded-lg bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-300"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={complaintProcessing}
                                    className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600 disabled:bg-gray-300"
                                >
                                    {complaintProcessing
                                        ? 'Submitting...'
                                        : 'Submit Report'}
                                </button>

                            </div>

                        </form>

                    </div>

                </div>
            )}

        </AuthenticatedLayout>
    );
}