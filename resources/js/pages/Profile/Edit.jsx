import { Head, useForm, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Edit({ status }) {
    const { auth } = usePage().props;

    const user = auth.user;

    const isFarmer = user?.role === 'farmer';
    const isBuyer = user?.role === 'buyer';

    /*
    |--------------------------------------------------------------------------
    | Profile Form
    |--------------------------------------------------------------------------
    */

    const {
        data,
        setData,
        patch,
        processing,
        errors,
    } = useForm({
        name: user?.name || '',
        email: user?.email || '',

        farm_name:
            user?.farmer?.farm_name || '',

        farm_location:
            user?.farmer?.farm_location || '',

        phone_number:
            user?.buyer?.phone_number || '',

        address:
            user?.buyer?.address || '',
    });

    /*
    |--------------------------------------------------------------------------
    | Password Form
    |--------------------------------------------------------------------------
    */

    const passwordForm = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    /*
    |--------------------------------------------------------------------------
    | Submit Profile
    |--------------------------------------------------------------------------
    */

    const submitProfile = (e) => {
        e.preventDefault();

        patch(route('profile.update'));
    };

    /*
    |--------------------------------------------------------------------------
    | Submit Password
    |--------------------------------------------------------------------------
    */

    const submitPassword = (e) => {
        e.preventDefault();

        passwordForm.patch(
            route('profile.password.update'),
            {
                preserveScroll: true,

                onSuccess: () => {
                    passwordForm.reset();
                },
            }
        );
    };

    return (
        <AuthenticatedLayout>
            <Head title="My Profile" />

            <div className="mx-auto max-w-4xl">

                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">
                        My Profile
                    </h1>

                    <p className="mt-1 text-gray-600">
                        Manage your account information and password.
                    </p>
                </div>

                {/* Profile Updated */}
                {status === 'profile-updated' && (
                    <div className="mb-6 rounded-md border border-green-200 bg-green-50 p-4">
                        <p className="text-sm font-medium text-green-700">
                            Profile updated successfully.
                        </p>
                    </div>
                )}

                {/* Password Updated */}
                {status === 'password-updated' && (
                    <div className="mb-6 rounded-md border border-green-200 bg-green-50 p-4">
                        <p className="text-sm font-medium text-green-700">
                            Password changed successfully.
                        </p>
                    </div>
                )}

                {/* Profile Information */}
                <form
                    onSubmit={submitProfile}
                    className="rounded-lg bg-white p-6 shadow"
                >
                    <h2 className="text-lg font-bold text-gray-800">
                        Account Information
                    </h2>

                    <div className="mt-5 space-y-5">

                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Name
                            </label>

                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) =>
                                    setData(
                                        'name',
                                        e.target.value
                                    )
                                }
                                className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                            />

                            {errors.name && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Email
                            </label>

                            <input
                                type="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData(
                                        'email',
                                        e.target.value
                                    )
                                }
                                className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                            />

                            {errors.email && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        {/* Account Type */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Account Type
                            </label>

                            <input
                                type="text"
                                value={
                                    user?.role === 'farmer'
                                        ? 'Farmer'
                                        : user?.role === 'admin'
                                            ? 'Admin'
                                            : 'Buyer'
                                }
                                disabled
                                className="mt-1 w-full rounded-md border-gray-300 bg-gray-100 text-gray-500 shadow-sm"
                            />

                            <p className="mt-1 text-xs text-gray-500">
                                Account type cannot be changed.
                            </p>
                        </div>

                    </div>

                    {/* Farmer Information */}
                    {isFarmer && (
                        <div className="mt-8 border-t pt-6">

                            <h2 className="text-lg font-bold text-gray-800">
                                Farm Information
                            </h2>

                            <div className="mt-5 space-y-5">

                                {/* BIR */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        BIR Registration Number
                                    </label>

                                    <input
                                        type="text"
                                        value={
                                            user?.farmer
                                                ?.bir_registration_number || ''
                                        }
                                        disabled
                                        className="mt-1 w-full rounded-md border-gray-300 bg-gray-100 text-gray-500 shadow-sm"
                                    />

                                    <p className="mt-1 text-xs text-gray-500">
                                        BIR registration number cannot be
                                        changed from the profile page.
                                    </p>
                                </div>

                                {/* Farm Name */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Farm Name
                                    </label>

                                    <input
                                        type="text"
                                        value={data.farm_name}
                                        onChange={(e) =>
                                            setData(
                                                'farm_name',
                                                e.target.value
                                            )
                                        }
                                        className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                                    />

                                    {errors.farm_name && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.farm_name}
                                        </p>
                                    )}
                                </div>

                                {/* Farm Location */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Farm Location
                                    </label>

                                    <input
                                        type="text"
                                        value={data.farm_location}
                                        onChange={(e) =>
                                            setData(
                                                'farm_location',
                                                e.target.value
                                            )
                                        }
                                        className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                                    />

                                    {errors.farm_location && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.farm_location}
                                        </p>
                                    )}
                                </div>

                            </div>
                        </div>
                    )}

                    {/* Buyer Information */}
                    {isBuyer && (
                        <div className="mt-8 border-t pt-6">

                            <h2 className="text-lg font-bold text-gray-800">
                                Buyer Information
                            </h2>

                            <div className="mt-5 space-y-5">

                                {/* Phone */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Phone Number
                                    </label>

                                    <input
                                        type="text"
                                        value={data.phone_number}
                                        onChange={(e) =>
                                            setData(
                                                'phone_number',
                                                e.target.value
                                            )
                                        }
                                        className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                                    />

                                    {errors.phone_number && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.phone_number}
                                        </p>
                                    )}
                                </div>

                                {/* Address */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Address
                                    </label>

                                    <textarea
                                        value={data.address}
                                        onChange={(e) =>
                                            setData(
                                                'address',
                                                e.target.value
                                            )
                                        }
                                        rows="3"
                                        className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                                    />

                                    {errors.address && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.address}
                                        </p>
                                    )}
                                </div>

                            </div>
                        </div>
                    )}

                    {/* Save Profile */}
                    <div className="mt-8 flex justify-end">
                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded-md bg-green-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-green-700 disabled:opacity-50"
                        >
                            {processing
                                ? 'Saving...'
                                : 'Save Changes'}
                        </button>
                    </div>

                </form>

                {/* Change Password */}
                <form
                    onSubmit={submitPassword}
                    className="mt-6 rounded-lg bg-white p-6 shadow"
                >
                    <h2 className="text-lg font-bold text-gray-800">
                        Change Password
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        Update your password to keep your account secure.
                    </p>

                    <div className="mt-5 space-y-5">

                        {/* Current Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Current Password
                            </label>

                            <input
                                type="password"
                                value={
                                    passwordForm.data.current_password
                                }
                                onChange={(e) =>
                                    passwordForm.setData(
                                        'current_password',
                                        e.target.value
                                    )
                                }
                                className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                            />

                            {passwordForm.errors.current_password && (
                                <p className="mt-1 text-sm text-red-600">
                                    {
                                        passwordForm.errors
                                            .current_password
                                    }
                                </p>
                            )}
                        </div>

                        {/* New Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                New Password
                            </label>

                            <input
                                type="password"
                                value={
                                    passwordForm.data.password
                                }
                                onChange={(e) =>
                                    passwordForm.setData(
                                        'password',
                                        e.target.value
                                    )
                                }
                                className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                            />

                            <p className="mt-1 text-xs text-gray-500">
                                Password must be at least 8 characters.
                            </p>

                            {passwordForm.errors.password && (
                                <p className="mt-1 text-sm text-red-600">
                                    {
                                        passwordForm.errors.password
                                    }
                                </p>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Confirm New Password
                            </label>

                            <input
                                type="password"
                                value={
                                    passwordForm.data
                                        .password_confirmation
                                }
                                onChange={(e) =>
                                    passwordForm.setData(
                                        'password_confirmation',
                                        e.target.value
                                    )
                                }
                                className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                            />

                            {passwordForm.errors
                                .password_confirmation && (
                                <p className="mt-1 text-sm text-red-600">
                                    {
                                        passwordForm.errors
                                            .password_confirmation
                                    }
                                </p>
                            )}
                        </div>

                    </div>

                    {/* Change Password Button */}
                    <div className="mt-6 flex justify-end">
                        <button
                            type="submit"
                            disabled={passwordForm.processing}
                            className="rounded-md bg-green-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-green-700 disabled:opacity-50"
                        >
                            {passwordForm.processing
                                ? 'Changing...'
                                : 'Change Password'}
                        </button>
                    </div>

                </form>

            </div>
        </AuthenticatedLayout>
    );
}