import { Head, Link, useForm } from '@inertiajs/react';

export default function Index({ complaints }) {

    const {
        data,
        setData,
        put,
        processing,
        errors,
    } = useForm({
        status: '',
        admin_notes: '',
    });

    const updateComplaint = (complaint, status) => {

        setData({
            status: status,
            admin_notes: complaint.admin_notes || '',
        });

        put(
            route(
                'admin.price-complaints.update',
                complaint.id
            ),
            {
                preserveScroll: true,
            }
        );
    };

    return (
        <>
            <Head title="Price Complaints" />

            <div className="min-h-screen bg-gray-100 p-6">

                <div className="mx-auto max-w-7xl">

                    {/* HEADER */}

                    <div className="mb-6 flex items-center justify-between">

                        <div>

                            <h1 className="text-2xl font-bold text-gray-800">
                                Price Complaints
                            </h1>

                            <p className="mt-1 text-gray-600">
                                Review price complaints submitted by buyers.
                            </p>

                        </div>

                        <Link
                            href={route('admin.dashboard')}
                            className="rounded-md bg-gray-600 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-700"
                        >
                            Back to Dashboard
                        </Link>

                    </div>

                    {/* COMPLAINTS */}

                    {complaints.length === 0 ? (

                        <div className="rounded-lg bg-white p-6 text-center shadow">

                            <p className="text-gray-600">
                                No price complaints have been submitted.
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
                                                Product
                                            </th>

                                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                                                Farmer
                                            </th>

                                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                                                Reported Price
                                            </th>

                                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                                                Reason
                                            </th>

                                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                                                Status
                                            </th>

                                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                                                Action
                                            </th>

                                        </tr>

                                    </thead>

                                    <tbody className="divide-y divide-gray-200">

                                        {complaints.map((complaint) => (

                                            <tr key={complaint.id}>

                                                {/* BUYER */}

                                                <td className="px-6 py-4 text-sm text-gray-800">
                                                    {complaint.buyer?.user?.name}
                                                </td>

                                                {/* PRODUCT */}

                                                <td className="px-6 py-4 text-sm text-gray-800">
                                                    {complaint.product?.name}
                                                </td>

                                                {/* FARMER */}

                                                <td className="px-6 py-4 text-sm text-gray-600">
                                                    {complaint.product?.farmer?.user?.name}
                                                </td>

                                                {/* REPORTED PRICE */}

                                                <td className="px-6 py-4 text-sm font-semibold text-gray-800">
                                                    ₱{Number(
                                                        complaint.reported_price
                                                    ).toFixed(2)}
                                                </td>

                                                {/* REASON */}

                                                <td className="max-w-xs px-6 py-4 text-sm text-gray-600">
                                                    {complaint.reason}
                                                </td>

                                                {/* STATUS */}

                                                <td className="px-6 py-4 text-sm">

                                                    {complaint.status === 'pending' && (
                                                        <span className="font-semibold text-yellow-600">
                                                            Pending
                                                        </span>
                                                    )}

                                                    {complaint.status === 'reviewing' && (
                                                        <span className="font-semibold text-blue-600">
                                                            Reviewing
                                                        </span>
                                                    )}

                                                    {complaint.status === 'resolved' && (
                                                        <span className="font-semibold text-green-600">
                                                            Resolved
                                                        </span>
                                                    )}

                                                    {complaint.status === 'rejected' && (
                                                        <span className="font-semibold text-red-600">
                                                            Rejected
                                                        </span>
                                                    )}

                                                </td>

                                                {/* ACTION */}

                                                <td className="px-6 py-4 text-sm">

                                                    {complaint.status === 'pending' && (

                                                        <button
                                                            type="button"
                                                            disabled={processing}
                                                            onClick={() =>
                                                                updateComplaint(
                                                                    complaint,
                                                                    'reviewing'
                                                                )
                                                            }
                                                            className="rounded-md bg-blue-600 px-3 py-1 text-white hover:bg-blue-700 disabled:opacity-50"
                                                        >
                                                            Review
                                                        </button>

                                                    )}

                                                    {complaint.status === 'reviewing' && (

                                                        <div className="flex gap-2">

                                                            <button
                                                                type="button"
                                                                disabled={processing}
                                                                onClick={() =>
                                                                    updateComplaint(
                                                                        complaint,
                                                                        'resolved'
                                                                    )
                                                                }
                                                                className="rounded-md bg-green-600 px-3 py-1 text-white hover:bg-green-700 disabled:opacity-50"
                                                            >
                                                                Resolve
                                                            </button>

                                                            <button
                                                                type="button"
                                                                disabled={processing}
                                                                onClick={() =>
                                                                    updateComplaint(
                                                                        complaint,
                                                                        'rejected'
                                                                    )
                                                                }
                                                                className="rounded-md bg-red-600 px-3 py-1 text-white hover:bg-red-700 disabled:opacity-50"
                                                            >
                                                                Reject
                                                            </button>

                                                        </div>

                                                    )}

                                                    {(complaint.status === 'resolved' ||
                                                        complaint.status === 'rejected') && (

                                                        <span className="text-gray-400">
                                                            No action
                                                        </span>

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

            </div>
        </>
    );
}