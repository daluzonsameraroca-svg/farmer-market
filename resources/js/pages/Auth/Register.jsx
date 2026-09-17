import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        role: 'buyer',

        // Buyer
        phone_number: '',
        address: '',

        // Farmer
        bir_registered: false,
        bir_registration_number: '',
        farm_name: '',
        farm_location: '',

        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => {
                reset('password', 'password_confirmation');
            },
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <div className="mb-6 text-center">
                <h1 className="text-2xl font-bold text-green-700">
                    Create Your Account
                </h1>

                <p className="mt-1 text-sm text-gray-600">
                    Join Farmer Market and connect directly with farmers.
                </p>
            </div>

            <form onSubmit={submit}>

                {/* Name */}
                <div>
                    <InputLabel
                        htmlFor="name"
                        value="Full Name"
                    />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
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

                {/* Email */}
                <div className="mt-4">
                    <InputLabel
                        htmlFor="email"
                        value="Email Address"
                    />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) =>
                            setData('email', e.target.value)
                        }
                        required
                    />

                    <InputError
                        message={errors.email}
                        className="mt-2"
                    />
                </div>

                {/* Account Type */}
                <div className="mt-4">
                    <InputLabel
                        htmlFor="role"
                        value="Account Type"
                    />

                    <select
                        id="role"
                        name="role"
                        value={data.role}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                        onChange={(e) =>
                            setData('role', e.target.value)
                        }
                        required
                    >
                        <option value="buyer">
                            Buyer
                        </option>

                        <option value="farmer">
                            Farmer
                        </option>
                    </select>

                    <InputError
                        message={errors.role}
                        className="mt-2"
                    />
                </div>

                {/* ===================================================== */}
                {/* BUYER FIELDS */}
                {/* ===================================================== */}

                {data.role === 'buyer' && (
                    <div className="mt-5 rounded-lg border border-gray-200 bg-gray-50 p-4">

                        <h2 className="text-base font-semibold text-gray-800">
                            Buyer Information
                        </h2>

                        {/* Phone Number */}
                        <div className="mt-4">
                            <InputLabel
                                htmlFor="phone_number"
                                value="Phone Number"
                            />

                            <TextInput
                                id="phone_number"
                                name="phone_number"
                                value={data.phone_number}
                                className="mt-1 block w-full"
                                onChange={(e) =>
                                    setData(
                                        'phone_number',
                                        e.target.value
                                    )
                                }
                            />

                            <InputError
                                message={errors.phone_number}
                                className="mt-2"
                            />
                        </div>

                        {/* Address */}
                        <div className="mt-4">
                            <InputLabel
                                htmlFor="address"
                                value="Address"
                            />

                            <TextInput
                                id="address"
                                name="address"
                                value={data.address}
                                className="mt-1 block w-full"
                                onChange={(e) =>
                                    setData(
                                        'address',
                                        e.target.value
                                    )
                                }
                                required
                            />

                            <InputError
                                message={errors.address}
                                className="mt-2"
                            />
                        </div>

                    </div>
                )}

                {/* ===================================================== */}
                {/* FARMER FIELDS */}
                {/* ===================================================== */}

                {data.role === 'farmer' && (
                    <div className="mt-5 rounded-lg border border-gray-200 bg-gray-50 p-4">

                        <h2 className="text-base font-semibold text-gray-800">
                            Farmer Information
                        </h2>

                        {/* BIR Registration Status */}
                        <div className="mt-4">
                            <InputLabel
                                value="BIR Registration Status"
                            />

                            <div className="mt-3 space-y-3">

                                {/* Already Registered */}
                                <label className="flex cursor-pointer items-center">
                                    <input
                                        type="radio"
                                        name="bir_registered"
                                        checked={
                                            data.bir_registered === true
                                        }
                                        onChange={() =>
                                            setData(
                                                'bir_registered',
                                                true
                                            )
                                        }
                                        className="border-gray-300 text-green-600 shadow-sm focus:ring-green-500"
                                    />

                                    <span className="ms-2 text-sm text-gray-700">
                                        I am already BIR registered
                                    </span>
                                </label>

                                {/* Not Registered */}
                                <label className="flex cursor-pointer items-center">
                                    <input
                                        type="radio"
                                        name="bir_registered"
                                        checked={
                                            data.bir_registered === false
                                        }
                                        onChange={() => {
                                            setData(
                                                'bir_registered',
                                                false
                                            );

                                            setData(
                                                'bir_registration_number',
                                                ''
                                            );
                                        }}
                                        className="border-gray-300 text-green-600 shadow-sm focus:ring-green-500"
                                    />

                                    <span className="ms-2 text-sm text-gray-700">
                                        I am not yet BIR registered
                                    </span>
                                </label>

                            </div>

                            <InputError
                                message={errors.bir_registered}
                                className="mt-2"
                            />
                        </div>

                        {/* BIR Registered */}
                        {data.bir_registered === true && (
                            <div className="mt-4 rounded-md border border-green-200 bg-green-50 p-4">

                                <InputLabel
                                    htmlFor="bir_registration_number"
                                    value="BIR Registration Number"
                                />

                                <TextInput
                                    id="bir_registration_number"
                                    name="bir_registration_number"
                                    value={
                                        data.bir_registration_number
                                    }
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData(
                                            'bir_registration_number',
                                            e.target.value
                                        )
                                    }
                                    required
                                />

                                <InputError
                                    message={
                                        errors.bir_registration_number
                                    }
                                    className="mt-2"
                                />

                                <p className="mt-2 text-xs text-gray-600">
                                    Enter your actual BIR registration
                                    number. Your registration will be
                                    verified by the administrator.
                                </p>

                            </div>
                        )}

                        {/* Not BIR Registered */}
                        {data.bir_registered === false && (
                            <div className="mt-4 rounded-md border border-yellow-200 bg-yellow-50 p-4">

                                <h3 className="font-semibold text-gray-800">
                                    BIR Registration Required
                                </h3>

                                <p className="mt-2 text-sm text-gray-600">
                                    You need to be BIR registered before
                                    selling products on Farmer Market.
                                </p>

                                <p className="mt-2 text-sm text-gray-600">
                                    You can complete your registration
                                    through the official BIR Online
                                    Registration and Update System (ORUS).
                                </p>

                                <a
                                    href="https://orus.bir.gov.ph/home"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-3 inline-flex rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
                                >
                                    Open BIR ORUS
                                </a>

                                <p className="mt-3 text-xs text-gray-500">
                                    After completing your BIR registration,
                                    return here and select "I am already
                                    BIR registered."
                                </p>

                            </div>
                        )}

                        {/* Farm Name */}
                        <div className="mt-4">
                            <InputLabel
                                htmlFor="farm_name"
                                value="Farm Name"
                            />

                            <TextInput
                                id="farm_name"
                                name="farm_name"
                                value={data.farm_name}
                                className="mt-1 block w-full"
                                onChange={(e) =>
                                    setData(
                                        'farm_name',
                                        e.target.value
                                    )
                                }
                                required
                            />

                            <InputError
                                message={errors.farm_name}
                                className="mt-2"
                            />
                        </div>

                        {/* Farm Location */}
                        <div className="mt-4">
                            <InputLabel
                                htmlFor="farm_location"
                                value="Farm Location"
                            />

                            <TextInput
                                id="farm_location"
                                name="farm_location"
                                value={data.farm_location}
                                className="mt-1 block w-full"
                                onChange={(e) =>
                                    setData(
                                        'farm_location',
                                        e.target.value
                                    )
                                }
                                required
                            />

                            <InputError
                                message={errors.farm_location}
                                className="mt-2"
                            />
                        </div>

                    </div>
                )}

                {/* ===================================================== */}
                {/* PASSWORD */}
                {/* ===================================================== */}

                <div className="mt-5">
                    <InputLabel
                        htmlFor="password"
                        value="Password"
                    />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData('password', e.target.value)
                        }
                        required
                    />

                    <InputError
                        message={errors.password}
                        className="mt-2"
                    />
                </div>

                {/* Confirm Password */}
                <div className="mt-4">
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Confirm Password"
                    />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData(
                                'password_confirmation',
                                e.target.value
                            )
                        }
                        required
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                {/* Buttons */}
                <div className="mt-6 flex items-center justify-between">

                    <Link
                        href={route('login')}
                        className="text-sm text-gray-600 underline hover:text-gray-900"
                    >
                        Already registered?
                    </Link>

                    <PrimaryButton
                        className="bg-green-600 hover:bg-green-700"
                        disabled={processing}
                    >
                        {processing
                            ? 'Registering...'
                            : 'Create Account'}
                    </PrimaryButton>

                </div>

            </form>
        </GuestLayout>
    );
}