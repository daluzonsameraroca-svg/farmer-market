import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index({ farmers }) {
    const [processing, setProcessing] = useState(false);

    const updateVerification = (farmer, verified) => {
        setProcessing(true);

        router.put(
            route('admin.farmers.update', farmer.id),
            {
                bir_verified: verified,
            },
            {
                preserveScroll: true,

                onFinish: () => {
                    setProcessing(false);
                },
            }
        );
    };

    return (
        <AuthenticatedLayout>
            <Head title="Farmer Verification" />

            <div className="mx-auto max-w-7xl">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Farmer Verification
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Review and verify farmer BIR registration information.
                    </p>
                </div>

                {/* Farmer List */}
                {farmers.length === 0 ? (
                    <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
                        <div className="text-4xl">👨‍🌾</div>

                        <p className="mt-3 font-semibold text-gray-700">
                            No farmers have registered yet.
                        </p>

                        <p className="mt-1 text-sm text-gray-500">
                            Registered farmers will appear here.
                        </p>
                    </div>
                ) : (
                    <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                {/* Table Header */}
                                <thead className="bg-green-50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                                            Farmer
                                        </th>

                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                                            Email
                                        </th>

                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                                            BIR Registration Status
                                        </th>

                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                                            BIR Registration Number
                                        </th>

                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                                            Farm Name
                                        </th>

                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                                            Farm Location
                                        </th>

                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                                            Verification
                                        </th>

                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                                            Action
                                        </th>
                                    </tr>
                                </thead>

                                {/* Table Body */}
                                <tbody className="divide-y divide-gray-100">
                                    {farmers.map((farmer) => (
                                        <tr
                                            key={farmer.id}
                                            className="transition hover:bg-gray-50"
                                        >
                                            {/* Farmer */}
                                            <td className="whitespace-nowrap px-6 py-4">
                                                <div className="text-sm font-semibold text-gray-800">
                                                    {farmer.user?.name || 'N/A'}
                                                </div>
                                            </td>

                                            {/* Email */}
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                                                {farmer.user?.email || 'N/A'}
                                            </td>

                                            {/* BIR Registration Status */}
                                            <td className="whitespace-nowrap px-6 py-4">
                                                {farmer.bir_registered ? (
                                                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                                                        BIR Registered
                                                    </span>
                                                ) : (
                                                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
                                                        Not Registered
                                                    </span>
                                                )}
                                            </td>

                                            {/* BIR Registration Number */}
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">
                                                {farmer.bir_registered &&
                                                farmer.bir_registration_number ? (
                                                    farmer.bir_registration_number
                                                ) : (
                                                    <span className="text-gray-400">
                                                        Not provided
                                                    </span>
                                                )}
                                            </td>

                                            {/* Farm Name */}
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">
                                                {farmer.farm_name || 'N/A'}
                                            </td>

                                            {/* Farm Location */}
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                                                {farmer.farm_location || 'N/A'}
                                            </td>

                                            {/* Verification Status */}
                                            <td className="whitespace-nowrap px-6 py-4">
                                                {farmer.bir_verified ? (
                                                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                                                        Verified
                                                    </span>
                                                ) : (
                                                    <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                                                        Pending
                                                    </span>
                                                )}
                                            </td>

                                            {/* Action */}
                                            <td className="whitespace-nowrap px-6 py-4">
                                                {farmer.bir_verified ? (
                                                    <button
                                                        type="button"
                                                        disabled={processing}
                                                        onClick={() =>
                                                            updateVerification(
                                                                farmer,
                                                                false
                                                            )
                                                        }
                                                        className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                                                    >
                                                        {processing
                                                            ? 'Updating...'
                                                            : 'Unverify'}
                                                    </button>
                                                ) : (
                                                    <button
                                                        type="button"
                                                        disabled={processing}
                                                        onClick={() =>
                                                            updateVerification(
                                                                farmer,
                                                                true
                                                            )
                                                        }
                                                        className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                                                    >
                                                        {processing
                                                            ? 'Updating...'
                                                            : 'Verify'}
                                                    </button>
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