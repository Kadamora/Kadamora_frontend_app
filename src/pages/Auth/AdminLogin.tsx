import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { IoEye } from 'react-icons/io5';
import { IoIosEyeOff } from 'react-icons/io';
import { useLoginMutation, type LoginPayload } from '@store/api/auth.api';
import { LoginSEO } from '@components/SEO/SEO';
import { useAppDispatch } from '@store/hooks';
import { setCredentials } from '@store/slices/auth.slice';
import Input from '@components/forms/Input';
import logo from '/assets/images/logo.png';


export default function AdminLogin() {
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();
    const [triggerLogin] = useLoginMutation();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const payload: LoginPayload = {
            email: String(formData.get('email') ?? '').trim().toLowerCase(),
            password: String(formData.get('password') ?? ''),
        };

        setIsSubmitting(true);
        setErrorMessage(null);

        try {
            const response = await triggerLogin(payload).unwrap();
            const data = response.data;

            if (data.user?.isVerified === false) {
                setErrorMessage('Your email is not verified. Please verify your email before logging in.');
                return;
            }

            dispatch(
                setCredentials({
                    user: data.user,
                    accessToken: data.accessToken,
                    refreshToken: data.refreshToken,
                }),
            );

            const role = data.user?.role;
            const from = (location.state as { from?: string } | null)?.from;
            navigate(from || (role === 'admin' ? '/admin' : '/dashboard'), { replace: true });
        } catch (err: any) {
            setErrorMessage(
                err?.data?.message ||
                    err?.error ||
                    'Unable to log you in with those details. Please try again.',
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <LoginSEO />

            {/* Background */}
            <div className="min-h-screen w-full bg-gradient-to-br from-[#041b2d] via-[#052c46] to-[#042f23] flex items-center justify-center px-4">

                {/* Brand */}
               
                 <a href="/">
                        <img
                            src={logo}
                            alt="Kadamora logo"
                            className="absolute top-[24px] left-[24px] w-[200px] h-auto z-20"
                        />
                    </a>

                {/* Card */}
                <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl px-10 py-16">
                    <h1 className="text-3xl font-semibold text-secondary">Login</h1>
                    <p className="text-gray-500 mt-2 text-sm leading-relaxed">
                        Enter your login details to access your admin dashboard.
                    </p>

                    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                        {errorMessage && (
                            <div
                                role="alert"
                                className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600"
                            >
                                {errorMessage}
                            </div>
                        )}

                        <Input
                            id="email"
                            name="email"
                            title="Email"
                            placeholder="Enter your email"
                            type="email"
                            required
                            autoComplete="email"
                        />

                        <div className="relative">
                            <Input
                                id="password"
                                name="password"
                                title="Password"
                                placeholder="Enter your password"
                                type={showPassword ? 'text' : 'password'}
                                required
                                autoComplete="current-password"
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword((s) => !s)}
                                className="absolute right-3 top-[42px] text-gray-500 hover:text-gray-700"
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                            >
                                {showPassword ? <IoIosEyeOff /> : <IoEye />}
                            </button>
                        </div>

                        {/* <div className="flex justify-end">
                            <a
                                href="/admin/auth/forgot-password"
                                className="text-sm text-green-600 hover:underline"
                            >
                                Forget Password?
                            </a>
                        </div> */}

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-secondary text-white py-3 mt-6 rounded-lg font-medium flex items-center justify-center gap-2 hover:opacity-95 transition disabled:opacity-70"
                        >
                            {isSubmitting ? (
                                <span className="h-4 w-4 rounded-full border-2 border-white/70 border-t-white animate-spin" />
                            ) : (
                                'Login'
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
