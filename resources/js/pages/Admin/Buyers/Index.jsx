import { Head, Link } from '@inertiajs/react';

export default function Index({ buyers }) {
    return (
        <>
            <Head title="Buyer Management" />

            <div className="min-h-screen bg-gray-100 p-6">
                <div className="mx-auto max-w-7xl">

                    {/* Header */}
                    <div className="mb-6 flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">
                                Buyer Management
                            </h1>

                            <p className="mt-1 text-gray-600">
                                View registered buyers in the system.
                            </p>
                        </div>

                        <Link
                            href={route('admin.dashboard')}
                            className="rounded-md bg-gray-600 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-700"
                        >
                            Back to Dashboard
                        </Link>
                    </div>

                    {/* Buyers */}
                    {buyers.length === 0 ? (
                        <div className="rounded-lg bg-white p-6 text-center shadow">
                            <p className="text-gray-600">
                                No buyers have registered yet.
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-hidden rounded-lg bg-white shadow">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                                                Buyer
                                            </th>

                                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                                                Email
                                            </th>

                                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                                                Phone Number
                                            </th>

                                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                                                Address
                                            </th>

                                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                                                Registered
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-gray-200">
                                        {buyers.map((buyer) => (
                                            <tr key={buyer.id}>

                                                {/* Buyer Name */}
                                                <td className="px-6 py-4 text-sm font-medium text-gray-800">
                                                    {buyer.user?.name ||
                                                        'Unknown Buyer'}
                                                </td>

                                                {/* Email */}
                                                <td className="px-6 py-4 text-sm text-gray-600">
                                                    {buyer.user?.email ||
                                                        'No email'}
                                                </td>

                                                {/* Phone */}
                                                <td className="px-6 py-4 text-sm text-gray-600">
                                                    {buyer.phone_number ||
                                                        'Not provided'}
                                                </td>

                                                {/* Address */}
                                                <td className="px-6 py-4 text-sm text-gray-600">
                                                    {buyer.address ||
                                                        'Not provided'}
                                                </td>

                                                {/* Registration Date */}
                                                <td className="px-6 py-4 text-sm text-gray-600">
                                                    {buyer.created_at
                                                        ? new Date(
                                                              buyer.created_at
                                                          ).toLocaleDateString()
                                                        : 'N/A'}
                                                </td>

                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </>
    );
}