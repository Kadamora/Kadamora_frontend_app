import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useRequestPasswordResetMutation } from '@shared/api/auth.api';
import Input from '@shared/components/Forms/Input';
import { showSuccessToast } from '@shared/components/Toast/Toast';

export interface ForgotPasswordProps {
    title?: string;
    subtitle?: string;
    loginUrl?: string;
    verifyUrl?: string;
    customPasswordResetMutation?: any;
    onSuccessToastTitle?: string;
    onSuccessToastMessage?: string;
}

export default function ForgotPassword({
    title = "Forget Password",
    subtitle = "Enter your email to receive password reset instructions.",
    loginUrl = "/auth/login",
    verifyUrl = "/auth/forgot-password/verify",
    customPasswordResetMutation,
    onSuccessToastTitle = "Reset Email Sent",
    onSuccessToastMessage = "Password reset instructions have been sent to your email.",
}: ForgotPasswordProps) {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [standardResetMutation] = useRequestPasswordResetMutation();

    const triggerPasswordReset = customPasswordResetMutation || standardResetMutation;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        const email = String(formData.get('email') ?? '')
            .trim()
            .toLowerCase();

        if (!email) {
            setErrorMessage('Email is required.');
            return;
        }

        setErrorMessage(null);
        setIsSubmitting(true);

        try {
            const response = await triggerPasswordReset({ email }).unwrap();
            
            // Show custom toast matching design system
            showSuccessToast(
                onSuccessToastTitle,
                response.message || onSuccessToastMessage
            );
            
            form.reset();
            sessionStorage.setItem('resetEmail', email);
            setTimeout(() => navigate(verifyUrl), 1500);
        } catch (err: any) {
            const message =
                err?.data?.message ||
                err?.error ||
                'Unable to process password reset request. Please try again.';

            setErrorMessage(message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full max-w-md">
            <h1 className="text-[30px] sm:text-3xl lg:text-[50px] font-semibold text-secondary">
                {title}
            </h1>
            <p className="text-gray-600 mt-2">
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

                <Input
                    id="email"
                    name="email"
                    title="Email"
                    placeholder="Enter your email"
                    type="email"
                    required
                    autoComplete="email"
                />

                <button
                    type="submit"
                    className={`w-full bg-secondary text-white py-3 rounded-lg hover:opacity-95 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed ${
                        isSubmitting ? 'scale-[0.99] animate-pulse' : ''
                    }`}
                    disabled={isSubmitting}
                    aria-busy={isSubmitting ? 'true' : 'false'}
                >
                    {isSubmitting ? (
                        <span className="h-4 w-4 rounded-full border-2 border-white/70 border-t-white animate-spin" />
                    ) : (
                        'Send'
                    )}
                </button>

                <p className="text-center text-gray-600">
                    Remember password ?, Sign in{' '}
                    <a href={loginUrl} className="text-green-700 hover:underline">
                        here
                    </a>
                </p>
            </form>
        </div>
    );
}
