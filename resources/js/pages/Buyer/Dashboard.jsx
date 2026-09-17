import { Head, Link, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Dashboard({ stats }) {
    const { auth } = usePage().props;

    return (
        <AuthenticatedLayout>
            <Head title="Buyer Dashboard" />

            <div className="mx-auto max-w-7xl">

                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">
                        Buyer Dashboard
                    </h1>

                    <p className="mt-2 text-gray-600">
                        Welcome, {auth.user?.name}.
                    </p>
                </div>

                {/* Statistics */}
                <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

                    {/* Available Products */}
                    <div className="rounded-lg bg-white p-6 shadow">

                        <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-500">
                                Available Products
                            </p>

                            <span className="text-2xl">
                                🛒
                            </span>
                        </div>

                        <p className="mt-3 text-3xl font-bold text-green-600">
                            {stats?.available_products ?? 0}
                        </p>

                        <p className="mt-2 text-sm text-gray-500">
                            Products available to buy
                        </p>

                    </div>

                    {/* My Orders */}
                    <div className="rounded-lg bg-white p-6 shadow">

                        <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-500">
                                My Orders
                            </p>

                            <span className="text-2xl">
                                📦
                            </span>
                        </div>

                        <p className="mt-3 text-3xl font-bold text-green-600">
                            {stats?.total_orders ?? 0}
                        </p>

                        <p className="mt-2 text-sm text-gray-500">
                            Total orders placed
                        </p>

                    </div>

                    {/* Pending Orders */}
                    <div className="rounded-lg bg-white p-6 shadow">

                        <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-500">
                                Pending Orders
                            </p>

                            <span className="text-2xl">
                                ⏳
                            </span>
                        </div>

                        <p className="mt-3 text-3xl font-bold text-yellow-600">
                            {stats?.pending_orders ?? 0}
                        </p>

                        <p className="mt-2 text-sm text-gray-500">
                            Waiting for farmer confirmation
                        </p>

                    </div>

                    {/* Demand Requests */}
                    <div className="rounded-lg bg-white p-6 shadow">

                        <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-500">
                                Demand Requests
                            </p>

                            <span className="text-2xl">
                                📋
                            </span>
                        </div>

                        <p className="mt-3 text-3xl font-bold text-green-600">
                            {stats?.total_demand_requests ?? 0}
                        </p>

                        <p className="mt-2 text-sm text-gray-500">
                            {stats?.open_demand_requests ?? 0} currently open
                        </p>

                    </div>

                </div>

                {/* Marketplace Features */}
                <div className="mt-8 grid gap-6 md:grid-cols-3">

                    {/* Marketplace */}
                    <div className="rounded-lg bg-white p-6 shadow">

                        <div className="mb-3 text-3xl">
                            🛒
                        </div>

                        <h2 className="text-lg font-bold text-gray-800">
                            Browse Marketplace
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-gray-600">
                            Browse agricultural products listed by verified
                            farmers.
                        </p>

                        <Link
                            href={route('buyer.marketplace.index')}
                            className="mt-5 inline-block rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700"
                        >
                            Browse Marketplace
                        </Link>

                    </div>

                    {/* Orders */}
                    <div className="rounded-lg bg-white p-6 shadow">

                        <div className="mb-3 text-3xl">
                            📦
                        </div>

                        <h2 className="text-lg font-bold text-gray-800">
                            My Orders
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-gray-600">
                            View and track the orders you have placed.
                        </p>

                        <Link
                            href={route('buyer.orders.index')}
                            className="mt-5 inline-block rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700"
                        >
                            View My Orders
                        </Link>

                    </div>

                    {/* Demand Requests */}
                    <div className="rounded-lg bg-white p-6 shadow">

                        <div className="mb-3 text-3xl">
                            🔎
                        </div>

                        <h2 className="text-lg font-bold text-gray-800">
                            Demand Requests
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-gray-600">
                            Tell farmers which agricultural products you need
                            and find matching supply.
                        </p>

                        <Link
                            href={route('buyer.demand-requests.index')}
                            className="mt-5 inline-block rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700"
                        >
                            My Demand Requests
                        </Link>

                    </div>

                </div>

                {/* Account Information */}
                <div className="mt-8 rounded-lg bg-white p-6 shadow">

                    <div className="flex items-center gap-3">
                        <span className="text-2xl">
                            👤
                        </span>

                        <h2 className="text-lg font-bold text-gray-800">
                            Account Information
                        </h2>
                    </div>

                    <div className="mt-5 grid gap-6 md:grid-cols-2">

                        {/* Name */}
                        <div>
                            <p className="text-sm text-gray-500">
                                Name
                            </p>

                            <p className="mt-1 font-semibold text-gray-800">
                                {auth.user?.name}
                            </p>
                        </div>

                        {/* Email */}
                        <div>
                            <p className="text-sm text-gray-500">
                                Email
                            </p>

                            <p className="mt-1 font-semibold text-gray-800">
                                {auth.user?.email}
                            </p>
                        </div>

                        {/* Phone Number */}
                        <div>
                            <p className="text-sm text-gray-500">
                                Phone Number
                            </p>

                            <p className="mt-1 font-semibold text-gray-800">
                                {auth.user?.buyer?.phone_number ||
                                    'Not provided'}
                            </p>
                        </div>

                        {/* Address */}
                        <div>
                            <p className="text-sm text-gray-500">
                                Address
                            </p>

                            <p className="mt-1 font-semibold text-gray-800">
                                {auth.user?.buyer?.address ||
                                    'Not provided'}
                            </p>
                        </div>

                    </div>

                </div>

            </div>
        </AuthenticatedLayout>
    );
}