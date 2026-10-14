import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useVerifyAccountMutation, useResendVerificationMutation } from '@shared/api/auth.api';
import { saveTokens } from '@shared/services/auth/authStorage';
import { showSuccessToast, showErrorToast } from '@shared/components/Toast/Toast';

export default function SignupVerify() {
    const navigate = useNavigate();
    const location = useLocation();
    const [code, setCode] = useState<string[]>(['', '', '', '', '', '']);
    const [seconds, setSeconds] = useState(60);
    const [isVerifying, setIsVerifying] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [isTemporarilyDisabled, setIsTemporarilyDisabled] = useState(false);
    const inputs = useRef<Array<HTMLInputElement | null>>([]);
    const [triggerVerifyAccount] = useVerifyAccountMutation();
    const [triggerResendVerification, { isLoading: isResending }] = useResendVerificationMutation();

    const email = useMemo(() => {
        const stateEmail = (location.state as { email?: string } | null)?.email;
        if (stateEmail) return stateEmail;
        const params = new URLSearchParams(location.search);
        return params.get('email') ?? '';
    }, [location.state, location.search]);

    const initialMessage = useMemo(() => {
        const stateMsg = (location.state as { email?: string; message?: string } | null)?.message;
        return stateMsg || null;
    }, [location.state]);

    const redirectTo = useMemo(() => {
        const stateFrom = (location.state as { from?: string } | null)?.from;
        if (stateFrom) return stateFrom;
        const params = new URLSearchParams(location.search);
        return params.get('redirect') ?? '/dashboard';
    }, [location.state, location.search]);

    useEffect(() => {
        if (seconds <= 0) return;
        const t = setInterval(() => setSeconds((s) => s - 1), 1000);
        return () => clearInterval(t);
    }, [seconds]);

    const onChange = (idx: number, value: string) => {
        const char = value
            .replace(/[^a-zA-Z0-9]/g, '')
            .slice(-1)
            .toUpperCase();
        const next = [...code];
        next[idx] = char;
        setCode(next);
        if (char && idx < inputs.current.length - 1) {
            inputs.current[idx + 1]?.focus();
        }
    };

    const onKeyDown = (idx: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace') {
            if (!code[idx] && idx > 0) {
                inputs.current[idx - 1]?.focus();
            }
        } else if (e.key === 'ArrowLeft' && idx > 0) {
            inputs.current[idx - 1]?.focus();
        } else if (e.key === 'ArrowRight' && idx < inputs.current.length - 1) {
            inputs.current[idx + 1]?.focus();
        }
    };

    const onPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pasted = e.clipboardData
            .getData('text')
            .replace(/[^a-zA-Z0-9]/g, '')
            .slice(0, 6)
            .toUpperCase();
        if (!pasted) return;

        const next = [...code];
        for (let i = 0; i < 6; i++) {
            next[i] = pasted[i] || '';
        }
        setCode(next);

        const targetIndex = Math.min(pasted.length, 5);
        inputs.current[targetIndex]?.focus();
    };

    const canContinue = code.every((c) => c.length === 1);

    const handleResend = async () => {
        if (!email) {
            setErrorMessage('No email address found. Please return to signup and try again.');
            return;
        }
        if (isResending || seconds > 0) return;

        setErrorMessage(null);
        setSuccessMessage(null);

        try {
            // Strictly send { email } - extra fields return 400
            const result = await triggerResendVerification({ email }).unwrap();
            setCode(['', '', '', '', '', '']);
            setSeconds(60);
            const msg = result?.message || 'A new 6-character verification code has been sent to your email.';
            setSuccessMessage(msg);
            showSuccessToast('Code Resent', msg);
            inputs.current[0]?.focus();
        } catch (err: any) {
            const message =
                err?.data?.message ||
                err?.error ||
                'Unable to resend verification code. Please try again later.';
            setErrorMessage(message);
            showErrorToast('Resend Failed', message);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) {
            setErrorMessage('Verification link is missing an email. Please reopen the verification link.');
            return;
        }

        const token = code.join('').toUpperCase();
        if (token.length !== 6) {
            setErrorMessage('Please enter the complete 6-character verification code.');
            return;
        }

        setIsVerifying(true);
        setErrorMessage(null);
        setSuccessMessage(null);

        try {
            // Always send { email, token }
            const result = await triggerVerifyAccount({ otp: token, email }).unwrap();
            const data = result?.data;

            if (!data?.accessToken || !data?.refreshToken) {
                setErrorMessage('Verification response is missing credentials. Please try again.');
                return;
            }

            saveTokens({ accessToken: data.accessToken, refreshToken: data.refreshToken });

            navigate('/auth/signup/verified', {
                state: {
                    message: data?.message,
                    redirectTo,
                },
                replace: true,
            });
        } catch (err: any) {
            const message =
                err?.data?.message ||
                err?.error ||
                'Unable to verify your code. Please check the code or request a new one.';

            setErrorMessage(message);

            // Briefly disable submit to prevent hitting the 5-attempts rate limit rapidly
            setIsTemporarilyDisabled(true);
            setTimeout(() => {
                setIsTemporarilyDisabled(false);
            }, 2000);
        } finally {
            setIsVerifying(false);
        }
    };

    const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
    const ss = String(seconds % 60).padStart(2, '0');

    return (
        <div className="w-full max-w-md">
            <h1 className="text-[30px] sm:text-3xl lg:text-[50px] font-semibold text-secondary">Just One More Step</h1>
            <p className="text-gray-600 mt-2">
                {initialMessage || 'We’ve sent a 6-character code to your email. Enter it below to verify your account.'}
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                {email ? null : (
                    <div className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-700">
                        We could not detect your email address. Please return to signup and try again.
                    </div>
                )}

                {errorMessage ? (
                    <div
                        role="alert"
                        className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-600 flex flex-col gap-2"
                    >
                        <span>{errorMessage}</span>
                        <div className="flex items-center gap-1 text-xs text-red-700 font-medium">
                            <span>Didn’t receive the code or has it expired?</span>
                            <button
                                type="button"
                                onClick={handleResend}
                                disabled={isResending || seconds > 0}
                                className={`underline font-semibold ${
                                    seconds > 0 ? 'text-gray-500 cursor-not-allowed' : 'text-secondary hover:text-black cursor-pointer'
                                }`}
                            >
                                {isResending ? 'Resending...' : 'Resend code'}
                            </button>
                        </div>
                    </div>
                ) : null}

                {successMessage ? (
                    <div
                        role="status"
                        className="rounded-md border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700"
                    >
                        {successMessage}
                    </div>
                ) : null}

                <div className="flex gap-2 sm:gap-3 justify-center sm:justify-start">
                    {code.map((c, idx) => (
                        <input
                            key={idx}
                            ref={(el) => {
                                inputs.current[idx] = el;
                            }}
                            value={c}
                            onChange={(e) => onChange(idx, e.target.value)}
                            onKeyDown={(e) => onKeyDown(idx, e)}
                            onPaste={onPaste}
                            inputMode="text"
                            autoCapitalize="characters"
                            pattern="[A-Za-z0-9]*"
                            maxLength={1}
                            aria-label={`Verification character ${idx + 1}`}
                            className="w-11 h-12 sm:w-12 sm:h-12 text-center rounded-lg bg-[#F5F7FB] border border-[#E6EAF2] focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-base font-semibold uppercase"
                        />
                    ))}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>
                        Expires in:{' '}
                        <span className="text-green-600 font-medium font-mono">
                            {mm}:{ss}
                        </span>
                    </span>
                    <div className="flex items-center gap-1">
                        <span className="text-gray-500">Didn’t get a code?</span>
                        <button
                            type="button"
                            onClick={handleResend}
                            disabled={isResending || seconds > 0}
                            className={`font-semibold underline transition-colors ${
                                seconds > 0 || isResending
                                    ? 'text-gray-400 cursor-not-allowed'
                                    : 'text-secondary hover:text-black cursor-pointer'
                            }`}
                        >
                            {isResending ? 'Resending...' : 'Resend'}
                        </button>
                    </div>
                </div>

                <button
                    type="submit"
                    className={`w-full py-3 rounded-lg transition-all flex items-center justify-center gap-2 ${
                        canContinue && email && !isVerifying && !isTemporarilyDisabled
                            ? 'bg-secondary text-white hover:opacity-95 cursor-pointer'
                            : 'bg-gray-300 text-white cursor-not-allowed'
                    } ${isVerifying ? 'scale-[0.99] animate-pulse' : ''}`}
                    disabled={!canContinue || !email || isVerifying || isTemporarilyDisabled}
                    aria-busy={isVerifying ? 'true' : 'false'}
                >
                    {isVerifying ? (
                        <>
                            <span className="h-4 w-4 rounded-full border-2 border-white/70 border-t-white animate-spin" />
                            <span>Verifying…</span>
                        </>
                    ) : (
                        'Verify Now'
                    )}
                </button>
            </form>
        </div>
    );
}


