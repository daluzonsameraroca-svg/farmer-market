import { Head, Link, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Dashboard({ stats }) {
    const { auth } = usePage().props;

    const farmer = auth.user?.farmer;
    const isVerified = farmer?.bir_verified;

    return (
        <AuthenticatedLayout>
            <Head title="Farmer Dashboard" />

            <div className="min-h-screen bg-gray-100">

                <div className="mx-auto max-w-7xl">

                    {/* Header */}
                    <div className="flex items-center justify-between">

                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">
                                Farmer Dashboard
                            </h1>

                            <p className="mt-2 text-gray-600">
                                Welcome, {auth.user?.name}.
                            </p>
                        </div>

                    </div>


                    {/* BIR Verification */}
                    <div className="mt-8">

                        {isVerified ? (

                            <div className="rounded-lg border border-green-200 bg-green-50 p-5">

                                <h2 className="text-lg font-bold text-green-800">
                                    BIR Verification: Verified
                                </h2>

                                <p className="mt-1 text-sm text-green-700">
                                    Your farmer account has been verified.
                                    You can now sell your agricultural
                                    products through the marketplace.
                                </p>

                            </div>

                        ) : (

                            <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-5">

                                <h2 className="text-lg font-bold text-yellow-800">
                                    BIR Verification: Pending
                                </h2>

                                <p className="mt-1 text-sm text-yellow-700">
                                    Your farmer account is waiting for Admin
                                    verification. You cannot add or sell
                                    products until your BIR registration is
                                    verified.
                                </p>

                            </div>

                        )}

                    </div>


                    {/* Statistics */}
                    <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

                        {/* My Products */}
                        <div className="rounded-lg bg-white p-6 shadow">

                            <p className="text-sm font-medium text-gray-500">
                                My Products
                            </p>

                            <p className="mt-2 text-3xl font-bold text-gray-800">
                                {stats?.total_products ?? 0}
                            </p>

                            <p className="mt-2 text-sm text-gray-500">
                                Products listed
                            </p>

                        </div>


                        {/* Available Products */}
                        <div className="rounded-lg bg-white p-6 shadow">

                            <p className="text-sm font-medium text-gray-500">
                                Available Products
                            </p>

                            <p className="mt-2 text-3xl font-bold text-green-600">
                                {stats?.available_products ?? 0}
                            </p>

                            <p className="mt-2 text-sm text-gray-500">
                                Currently available
                            </p>

                        </div>


                        {/* Pending Orders */}
                        <div className="rounded-lg bg-white p-6 shadow">

                            <p className="text-sm font-medium text-gray-500">
                                Pending Orders
                            </p>

                            <p className="mt-2 text-3xl font-bold text-yellow-600">
                                {stats?.pending_orders ?? 0}
                            </p>

                            <p className="mt-2 text-sm text-gray-500">
                                Waiting for confirmation
                            </p>

                        </div>


                        {/* Buyer Matches */}
                        <div className="rounded-lg bg-white p-6 shadow">

                            <p className="text-sm font-medium text-gray-500">
                                Buyer Matches
                            </p>

                            <p className="mt-2 text-3xl font-bold text-indigo-600">
                                {stats?.buyer_matches ?? 0}
                            </p>

                            <p className="mt-2 text-sm text-gray-500">
                                Matching buyer requests
                            </p>

                        </div>

                    </div>


                    {/* Main Features */}
                    <div className="mt-8 grid gap-6 md:grid-cols-3">

                        {/* Products */}
                        <div className="rounded-lg bg-white p-6 shadow">

                            <h2 className="text-lg font-bold text-gray-800">
                                My Products
                            </h2>

                            <p className="mt-2 text-sm text-gray-600">
                                Add, update, and manage your agricultural
                                products.
                            </p>

                            {isVerified ? (

                                <Link
                                    href={route('farmer.products.index')}
                                    className="mt-4 inline-block rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
                                >
                                    Manage Products
                                </Link>

                            ) : (

                                <button
                                    type="button"
                                    disabled
                                    className="mt-4 rounded-md bg-gray-300 px-4 py-2 text-sm font-semibold text-gray-500"
                                >
                                    Verification Required
                                </button>

                            )}

                        </div>


                        {/* Orders */}
                        <div className="rounded-lg bg-white p-6 shadow">

                            <h2 className="text-lg font-bold text-gray-800">
                                Customer Orders
                            </h2>

                            <p className="mt-2 text-sm text-gray-600">
                                View and manage orders placed by buyers.
                            </p>

                            <Link
                                href={route('farmer.orders.index')}
                                className="mt-4 inline-block rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
                            >
                                View Orders
                            </Link>

                        </div>


                        {/* Demand Requests */}
                        <div className="rounded-lg bg-white p-6 shadow">

                            <h2 className="text-lg font-bold text-gray-800">
                                Buyer Demand Requests
                            </h2>

                            <p className="mt-2 text-sm text-gray-600">
                                Find buyer requests that match your available
                                agricultural products.
                            </p>

                            <Link
                                href={route('farmer.demand-requests.index')}
                                className="mt-4 inline-block rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
                            >
                                View Demand Requests
                            </Link>

                        </div>

                    </div>


                    {/* Account Information */}
                    <div className="mt-8 rounded-lg bg-white p-6 shadow">

                        <h2 className="text-lg font-bold text-gray-800">
                            Account Information
                        </h2>

                        <div className="mt-5 grid gap-6 md:grid-cols-2">

                            <div>
                                <p className="text-sm text-gray-500">
                                    Name
                                </p>

                                <p className="font-semibold text-gray-800">
                                    {auth.user?.name}
                                </p>
                            </div>


                            <div>
                                <p className="text-sm text-gray-500">
                                    Email
                                </p>

                                <p className="font-semibold text-gray-800">
                                    {auth.user?.email}
                                </p>
                            </div>


                            <div>
                                <p className="text-sm text-gray-500">
                                    Farm Name
                                </p>

                                <p className="font-semibold text-gray-800">
                                    {farmer?.farm_name}
                                </p>
                            </div>


                            <div>
                                <p className="text-sm text-gray-500">
                                    Farm Location
                                </p>

                                <p className="font-semibold text-gray-800">
                                    {farmer?.farm_location}
                                </p>
                            </div>


                            <div>
                                <p className="text-sm text-gray-500">
                                    BIR Registration Number
                                </p>

                                <p className="font-semibold text-gray-800">
                                    {farmer?.bir_registration_number || 'Not provided'}
                                </p>
                            </div>


                            <div>
                                <p className="text-sm text-gray-500">
                                    Verification Status
                                </p>

                                {isVerified ? (

                                    <span className="mt-1 inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                                        Verified
                                    </span>

                                ) : (

                                    <span className="mt-1 inline-block rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                                        Pending
                                    </span>

                                )}

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </AuthenticatedLayout>
    );
}