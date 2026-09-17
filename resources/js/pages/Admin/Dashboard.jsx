import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Dashboard() {
    return (
        <AuthenticatedLayout>
            <Head title="Admin Dashboard" />

            <div className="min-h-screen bg-gray-100">

                <div className="mx-auto max-w-7xl">

                    {/* Header */}
                    <div>

                        <h1 className="text-2xl font-bold text-gray-800">
                            Admin Dashboard
                        </h1>

                        <p className="mt-2 text-gray-600">
                            Manage the Farmer Direct-to-Market System.
                        </p>

                    </div>


                    {/* Management Cards */}
                    <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

                        {/* Price Complaints */}
                        <div className="rounded-lg bg-white p-6 shadow">

                            <h2 className="text-lg font-bold text-gray-800">
                                Price Complaints
                            </h2>

                            <p className="mt-2 text-sm text-gray-600">
                                Review price complaints submitted by buyers.
                            </p>

                            <Link
                                href={route('admin.price-complaints.index')}
                                className="mt-4 inline-block rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
                            >
                                Manage Complaints
                            </Link>

                        </div>


                        {/* Farmer Verification */}
                        <div className="rounded-lg bg-white p-6 shadow">

                            <h2 className="text-lg font-bold text-gray-800">
                                Farmer Verification
                            </h2>

                            <p className="mt-2 text-sm text-gray-600">
                                Review farmer BIR registration information
                                and verify farmer accounts.
                            </p>

                            <Link
                                href={route('admin.farmers.index')}
                                className="mt-4 inline-block rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
                            >
                                Manage Farmers
                            </Link>

                        </div>


                        {/* Product Management */}
                        <div className="rounded-lg bg-white p-6 shadow">

                            <h2 className="text-lg font-bold text-gray-800">
                                Product Management
                            </h2>

                            <p className="mt-2 text-sm text-gray-600">
                                View and manage products listed by farmers.
                            </p>

                            <Link
                                href={route('admin.products.index')}
                                className="mt-4 inline-block rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
                            >
                                Manage Products
                            </Link>

                        </div>


                        {/* Order Management */}
                        <div className="rounded-lg bg-white p-6 shadow">

                            <h2 className="text-lg font-bold text-gray-800">
                                Order Management
                            </h2>

                            <p className="mt-2 text-sm text-gray-600">
                                Monitor orders placed by buyers and processed
                                by farmers.
                            </p>

                            <Link
                                href={route('admin.orders.index')}
                                className="mt-4 inline-block rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                            >
                                Manage Orders
                            </Link>

                        </div>


                        {/* Buyer Management */}
                        <div className="rounded-lg bg-white p-6 shadow">

                            <h2 className="text-lg font-bold text-gray-800">
                                Buyer Management
                            </h2>

                            <p className="mt-2 text-sm text-gray-600">
                                View registered buyers and their account
                                information.
                            </p>

                            <Link
                                href={route('admin.buyers.index')}
                                className="mt-4 inline-block rounded-md bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700"
                            >
                                Manage Buyers
                            </Link>

                        </div>

                    </div>


                    {/* Admin Account Information */}
                    <div className="mt-8 rounded-lg bg-white p-6 shadow">

                        <h2 className="text-lg font-bold text-gray-800">
                            Admin Account
                        </h2>

                        <div className="mt-5 grid gap-6 md:grid-cols-3">

                            {/* Name */}
                            <div>

                                <p className="text-sm text-gray-500">
                                    Name
                                </p>

                                <p className="font-semibold text-gray-800">
                                    System Admin
                                </p>

                            </div>


                            {/* Account Type */}
                            <div>

                                <p className="text-sm text-gray-500">
                                    Account Type
                                </p>

                                <p className="font-semibold text-gray-800">
                                    Administrator
                                </p>

                            </div>


                            {/* Access */}
                            <div>

                                <p className="text-sm text-gray-500">
                                    Access
                                </p>

                                <span className="mt-1 inline-block rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
                                    Full Management Access
                                </span>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </AuthenticatedLayout>
    );
}