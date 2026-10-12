import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { IoEye } from 'react-icons/io5';
import { IoIosEyeOff } from 'react-icons/io';
import { useResetPasswordMutation } from '@shared/api/auth.api';
import { showSuccessToast, showErrorToast } from '@shared/components/Toast/Toast';

export interface ResetPasswordProps {
    title?: string;
    subtitle?: string;
    buttonText?: string;
    loginUrl?: string;
    customResetMutation?: any;
}

export default function ResetPassword({
    title = "Reset Password",
    subtitle = "Please enter your new password below. Ensure it is at least 8 characters long and matches the confirmation field.",
    buttonText = "Save",
    loginUrl = "/auth/login",
    customResetMutation,
}: ResetPasswordProps) {
    const navigate = useNavigate();
    const { code } = useParams<{ code: string }>();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [standardResetPassword] = useResetPasswordMutation();

    const triggerResetPassword = customResetMutation || standardResetPassword;
    const isCodeMissing = useMemo(() => !code || code.trim().length === 0, [code]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isSubmitting) return;

        const form = e.currentTarget;
        const formData = new FormData(form);
        const password = String(formData.get('password') ?? '');
        const confirm = String(formData.get('confirm') ?? '');
        const email = sessionStorage.getItem('resetEmail') || '';

        if (!email) {
            setErrorMessage('Email session expired. Please restart the password reset process.');
            return;
        }

        if (!password || !confirm) {
            setErrorMessage('Password and confirmation are required.');
            return;
        }

        if (password.length < 8) {
            setErrorMessage('Password must be at least 8 characters long.');
            return;
        }

        if (password !== confirm) {
            setErrorMessage('Passwords do not match.');
            return;
        }

        setIsSubmitting(true);
        setErrorMessage(null);

        try {
            const response = await triggerResetPassword({
                email,
                newPassword: password,
                confirmPassword: confirm,
                otp: code || '',
            }).unwrap();

            showSuccessToast(
                "Password Reset Successful",
                response.message || "Your password has been updated successfully."
            );

            form.reset();
            sessionStorage.removeItem('resetEmail');
            setTimeout(() => navigate(loginUrl), 1500);
        } catch (err: any) {
            const message =
                err?.data?.message ||
                err?.error ||
                'Unable to reset your password. Please try again.';

            setErrorMessage(message);
            showErrorToast("Reset Failed", message);
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        if (isCodeMissing) {
            setErrorMessage('This reset code is invalid or missing. Please request a new PIN.');
        }
    }, [isCodeMissing]);

    return (
        <div className="w-full max-w-md">
            <h1 className="text-[30px] sm:text-3xl lg:text-[44px] font-semibold text-secondary leading-tight">
                {title}
            </h1>
            <p className="text-gray-600 mt-2 text-sm sm:text-base leading-relaxed">
                {subtitle}
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                {errorMessage ? (
                    <div
                        className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600"
                        role="alert"
                    >
                        {errorMessage}
                    </div>
                ) : null}

                {/* Password */}
                <div>
                    <label htmlFor="password" className="block mb-1 text-secondary font-medium text-sm">
                        Password
                    </label>
                    <div className="relative">
                        <input
                            id="password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter password"
                            className="w-full px-4 py-3.5 pr-10 border border-[#E4E4E8] rounded-xl focus:ring-2 focus:ring-secondary/15 focus:border-secondary outline-none transition-all bg-[#F9FAFB] placeholder:text-gray-400 text-sm text-secondary"
                            required
                            disabled={isSubmitting}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((s) => !s)}
                            className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 hover:text-gray-700"
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                            title={showPassword ? 'Hide password' : 'Show password'}
                        >
                            <span className="text-lg" aria-hidden>
                                {showPassword ? <IoIosEyeOff /> : <IoEye />}
                            </span>
                        </button>
                    </div>
                </div>

                {/* Confirm Password */}
                <div>
                    <label htmlFor="confirm" className="block mb-1 text-secondary font-medium text-sm">
                        Confirm Password
                    </label>
                    <div className="relative">
                        <input
                            id="confirm"
                            name="confirm"
                            type={showConfirm ? 'text' : 'password'}
                            placeholder="Enter password"
                            className="w-full px-4 py-3.5 pr-10 border border-[#E4E4E8] rounded-xl focus:ring-2 focus:ring-secondary/15 focus:border-secondary outline-none transition-all bg-[#F9FAFB] placeholder:text-gray-400 text-sm text-secondary"
                            required
                            disabled={isSubmitting}
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirm((s) => !s)}
                            className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 hover:text-gray-700"
                            aria-label={showConfirm ? 'Hide password' : 'Show password'}
                            title={showConfirm ? 'Hide password' : 'Show password'}
                        >
                            <span className="text-lg" aria-hidden>
                                {showConfirm ? <IoIosEyeOff /> : <IoEye />}
                            </span>
                        </button>
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-[#002D62] text-white py-3.5 rounded-xl font-medium hover:bg-[#002550] transition-colors shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
                    disabled={isSubmitting}
                    aria-busy={isSubmitting}
                >
                    {isSubmitting ? (
                        <div className="flex items-center justify-center gap-2">
                            <span className="h-4 w-4 rounded-full border-2 border-white/70 border-t-white animate-spin" />
                            <span>Saving...</span>
                        </div>
                    ) : (
                        buttonText
                    )}
                </button>
            </form>
        </div>
    );
}
