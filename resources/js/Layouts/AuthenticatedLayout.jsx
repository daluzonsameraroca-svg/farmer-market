import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const { auth } = usePage().props;
    const user = auth.user;
    const role = user.role;

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const navigation = {
        farmer: [
            { name: 'Dashboard', route: 'farmer.dashboard', icon: '🏠' },
            { name: 'My Products', route: 'farmer.products.index', icon: '📦' },
            { name: 'Customer Orders', route: 'farmer.orders.index', icon: '🛒' },
            { name: 'Buyer Requests', route: 'farmer.demand-requests.index', icon: '🔎' },
        ],

        buyer: [
            { name: 'Dashboard', route: 'buyer.dashboard', icon: '🏠' },
            { name: 'Marketplace', route: 'buyer.marketplace.index', icon: '🛒' },
            { name: 'My Orders', route: 'buyer.orders.index', icon: '📦' },
            { name: 'Demand Requests', route: 'buyer.demand-requests.index', icon: '📋' },
        ],

        admin: [
            { name: 'Dashboard', route: 'admin.dashboard', icon: '🏠' },
            { name: 'Farmers', route: 'admin.farmers.index', icon: '👨‍🌾' },
            { name: 'Buyers', route: 'admin.buyers.index', icon: '👥' },
            { name: 'Products', route: 'admin.products.index', icon: '📦' },
            { name: 'Orders', route: 'admin.orders.index', icon: '🛒' },
            { name: 'Price Complaints', route: 'admin.price-complaints.index', icon: '⚠️' },
        ],
    };

    const menuItems = navigation[role] || [];

    const logout = () => {
        router.post(route('logout'));
    };

    return (
        <div className="min-h-screen bg-gray-100">

            {/* Mobile Header */}
            <div className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-4 lg:hidden">
                <Link href="/">
                    <div className="flex items-center gap-2">
                        <ApplicationLogo className="h-9 w-auto fill-current text-green-700" />

                        <div>
                            <div className="text-base font-bold text-green-700">
                                Farmer Market
                            </div>

                            <div className="text-xs capitalize text-gray-500">
                                {role} Account
                            </div>
                        </div>
                    </div>
                </Link>

                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="rounded-lg p-2 text-gray-600 hover:bg-gray-100"
                >
                    <span className="text-2xl">
                        {sidebarOpen ? '✕' : '☰'}
                    </span>
                </button>
            </div>

            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div
                    onClick={() => setSidebarOpen(false)}
                    className="fixed inset-0 z-30 bg-black/40 lg:hidden"
                ></div>
            )}

            {/* Sidebar */}
            <aside
                className={`
                    fixed left-0 top-0 z-40 flex h-screen w-64 flex-col
                    border-r border-gray-200 bg-white
                    transition-transform duration-300
                    ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                    lg:translate-x-0
                `}
            >

                {/* Logo */}
                <div className="flex h-20 items-center border-b border-gray-200 px-6">
                    <Link
                        href="/"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <div className="flex items-center gap-3">
                            <ApplicationLogo className="block h-10 w-auto fill-current text-green-700" />

                            <div>
                                <div className="text-lg font-bold text-green-700">
                                    Farmer Market
                                </div>

                                <div className="text-xs capitalize text-gray-500">
                                    {role} Account
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Navigation */}
                <div className="flex-1 overflow-y-auto px-4 py-6">

                    <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
                        Navigation
                    </p>

                    <nav className="space-y-1">
                        {menuItems.map((item) => (
                            <Link
                                key={item.route}
                                href={route(item.route)}
                                onClick={() => setSidebarOpen(false)}
                                className={`
                                    flex items-center gap-3 rounded-lg px-4 py-3
                                    text-sm font-medium transition
                                    ${
                                        route().current(item.route)
                                            ? 'bg-green-100 text-green-700'
                                            : 'text-gray-700 hover:bg-green-50 hover:text-green-700'
                                    }
                                `}
                            >
                                <span className="text-lg">
                                    {item.icon}
                                </span>

                                <span>
                                    {item.name}
                                </span>
                            </Link>
                        ))}
                    </nav>

                    {/* Account */}
                    <div className="mt-8 border-t border-gray-200 pt-6">

                        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
                            Account
                        </p>

                        <Link
                            href={route('profile.edit')}
                            onClick={() => setSidebarOpen(false)}
                            className={`
                                flex items-center gap-3 rounded-lg px-4 py-3
                                text-sm font-medium transition
                                ${
                                    route().current('profile.edit')
                                        ? 'bg-green-100 text-green-700'
                                        : 'text-gray-700 hover:bg-green-50 hover:text-green-700'
                                }
                            `}
                        >
                            <span className="text-lg">
                                👤
                            </span>

                            <span>
                                My Profile
                            </span>
                        </Link>
                    </div>
                </div>

                {/* User / Logout */}
                <div className="border-t border-gray-200 p-4">

                    <div className="mb-3 px-2">
                        <p className="truncate text-sm font-semibold text-gray-800">
                            {user.name}
                        </p>

                        <p className="truncate text-xs text-gray-500">
                            {user.email}
                        </p>
                    </div>

                    <button
                        onClick={logout}
                        className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50"
                    >
                        <span className="text-lg">
                            🚪
                        </span>

                        <span>
                            Log Out
                        </span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="min-h-screen lg:ml-64">

                {/* Desktop Header */}
                {header && (
                    <header className="hidden border-b border-gray-200 bg-white shadow-sm lg:block">
                        <div className="px-8 py-5">
                            {header}
                        </div>
                    </header>
                )}

                {/* Page Content */}
                <main className="p-4 sm:p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}