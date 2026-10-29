import React, { useState } from 'react';
import { IoEye } from 'react-icons/io5';
import { IoIosEyeOff } from 'react-icons/io';
import Input from '@shared/components/Forms/Input';
import PhoneNumberInput from '@shared/components/Forms/PhoneNumberInput';
import StepProgressIndicator from './StepProgressIndicator';

export interface UserDetailsFormData {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    password: string;
}

export interface Step1UserDetailsProps {
    initialData: UserDetailsFormData;
    onSubmit: (data: UserDetailsFormData) => void;
    loginUrl?: string;
}

export default function Step1UserDetails({
    initialData,
    onSubmit,
    loginUrl = "/hospitality-tours/auth/login",
}: Step1UserDetailsProps) {
    const [formData, setFormData] = useState<UserDetailsFormData>(initialData);
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePhoneChange = (phone: string) => {
        setFormData({ ...formData, phoneNumber: phone });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.firstName.trim() || !formData.lastName.trim()) {
            setErrorMessage('Please enter your first and last name.');
            return;
        }

        if (!formData.email.trim()) {
            setErrorMessage('Please enter your email.');
            return;
        }

        if (!formData.phoneNumber.trim()) {
            setErrorMessage('Please enter your phone number.');
            return;
        }

        if (!formData.password || formData.password.length < 6) {
            setErrorMessage('Password must be at least 6 characters.');
            return;
        }

        setErrorMessage(null);
        onSubmit(formData);
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <StepProgressIndicator currentStep={1} />

            <h1 className="text-[30px] md:text-3xl lg:text-[42px] font-bold text-secondary leading-tight">
                Get Started with{' '}
                <span className="text-[#43CC88]">Kadamora</span>
            </h1>
            <p className="text-gray-600 mt-1.5 text-sm sm:text-base">
                Unlock a seamless experience designed around your needs.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                {errorMessage ? (
                    <div
                        role="alert"
                        className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600"
                    >
                        {errorMessage}
                    </div>
                ) : null}

                {/* First name & Last name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                        id="firstName"
                        name="firstName"
                        title="First name"
                        placeholder="Enter your firstname"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />

                    <Input
                        id="lastName"
                        name="lastName"
                        title="Last name"
                        placeholder="Enter your lastname"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Email */}
                <Input
                    id="email"
                    name="email"
                    title="Email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                {/* Phone Number */}
                <PhoneNumberInput
                    id="phoneNumber"
                    name="phoneNumber"
                    title="Phone Number"
                    value={formData.phoneNumber}
                    onChange={handlePhoneChange}
                    required
                />

                {/* Password */}
                <div>
                    <label htmlFor="password" className="block mb-1 text-secondary font-semibold text-[15px]">
                        Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <input
                            id="password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 pr-10 border border-[#E0DEF7] rounded-lg bg-[#F7F7FD] focus:bg-white focus:ring-2 focus:ring-secondary/20 focus:border-transparent outline-none transition-all placeholder:text-[#52525B] text-sm text-secondary"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((s) => !s)}
                            className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 hover:text-gray-700"
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                            <span className="text-lg" aria-hidden>
                                {showPassword ? <IoIosEyeOff /> : <IoEye />}
                            </span>
                        </button>
                    </div>
                </div>

                {/* Register Button */}
                <button
                    type="submit"
                    className="w-full bg-[#002D62] text-white py-3.5 rounded-xl font-medium hover:bg-[#002550] transition-colors shadow-sm mt-2"
                >
                    Register
                </button>

                {/* OR Divider */}
                <div className="relative py-2 text-center">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-[#E4E4E7]" />
                    </div>
                    <div className="relative inline-block bg-white px-3 font-medium">
                        OR
                    </div>
                </div>

                {/* Sign up with Google */}
                <button
                    type="button"
                    className="w-full bg-[#CCE3FD] py-3 rounded-lg flex items-center justify-center gap-3"
                >
                    <img src="/assets/icons/google.png" alt="Google icon" className="h-5 w-5" />
                    <span>Sign up with Google</span>
                </button>

                {/* Footer link */}
                <p className="text-center text-gray-600">
                    Already have an Account, Sign in{' '}
                    <a href={loginUrl} className="text-green-700 hover:underline">
                        here
                    </a>
                </p>
            </form>
        </div>
    );
}
