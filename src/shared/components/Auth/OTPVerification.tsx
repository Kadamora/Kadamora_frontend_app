import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { showSuccessToast, showErrorToast } from '@shared/components/Toast/Toast';

export interface OTPVerificationProps {
    title?: string;
    subtitle?: string;
    pinLength?: number;
    expiresInSeconds?: number;
    buttonText?: string;
    onVerify?: (code: string) => Promise<void> | void;
    onResend?: () => Promise<void> | void;
    nextUrlPattern?: (code: string) => string;
    onSuccessToastTitle?: string;
    onSuccessToastMessage?: string;
}

export default function OTPVerification({
    title = "Forget Password",
    subtitle = "Enter the four digit pin we sent to your email to proceed with setting a new password.",
    pinLength = 4,
    expiresInSeconds = 60,
    buttonText = "Continue",
    onVerify,
    onResend,
    nextUrlPattern,
    onSuccessToastTitle = "PIN Verified",
    onSuccessToastMessage = "You may now set your new password.",
}: OTPVerificationProps) {
    const navigate = useNavigate();
    const [code, setCode] = useState<string[]>(Array(pinLength).fill(''));
    const [seconds, setSeconds] = useState(expiresInSeconds);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const inputs = useRef<Array<HTMLInputElement | null>>([]);

    useEffect(() => {
        if (seconds <= 0) return;
        const timer = setInterval(() => setSeconds((s) => s - 1), 1000);
        return () => clearInterval(timer);
    }, [seconds]);

    const handleChange = (idx: number, value: string) => {
        const char = value.replace(/[^a-zA-Z0-9]/g, '').slice(-1);
        const next = [...code];
        next[idx] = char;
        setCode(next);

        if (char && idx < pinLength - 1) {
            inputs.current[idx + 1]?.focus();
        }
    };

    const handleKeyDown = (idx: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !code[idx] && idx > 0) {
            inputs.current[idx - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pasted = e.clipboardData.getData('text').trim().slice(0, pinLength);
        if (!pasted) return;

        const next = [...code];
        for (let i = 0; i < pinLength; i++) {
            if (i < pasted.length) {
                next[i] = pasted[i];
            }
        }
        setCode(next);

        const focusIndex = Math.min(pasted.length - 1, pinLength - 1);
        inputs.current[focusIndex]?.focus();
    };

    const canContinue = code.every((digit) => digit.length === 1);

    const handleResendClick = async () => {
        if (seconds > 0) return;
        try {
            if (onResend) {
                await onResend();
            }
            setCode(Array(pinLength).fill(''));
            setSeconds(expiresInSeconds);
            inputs.current[0]?.focus();
            showSuccessToast("Code Resent", "A new verification PIN has been sent to your email.");
        } catch (err: any) {
            showErrorToast("Resend Failed", err?.message || "Failed to resend verification code.");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!canContinue || isSubmitting) return;

        const pinCode = code.join('');
        setIsSubmitting(true);
        setErrorMessage(null);

        try {
            if (onVerify) {
                await onVerify(pinCode);
            }
            
            showSuccessToast(onSuccessToastTitle, onSuccessToastMessage);

            if (nextUrlPattern) {
                navigate(nextUrlPattern(pinCode));
            }
        } catch (err: any) {
            const msg = err?.data?.message || err?.message || "Invalid PIN code. Please try again.";
            setErrorMessage(msg);
        } finally {
            setIsSubmitting(false);
        }
    };

    const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
    const ss = String(seconds % 60).padStart(2, '0');

    return (
        <div className="w-full max-w-md mx-auto text-left">
            <h1 className="text-[30px] sm:text-3xl lg:text-[44px] font-semibold text-secondary leading-tight">
                {title}
            </h1>
            <p className="text-gray-600 mt-2 text-left text-sm sm:text-base max-w-sm mx-auto">
                {subtitle}
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                {errorMessage ? (
                    <div
                        role="alert"
                        className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600 text-left"
                    >
                        {errorMessage}
                    </div>
                ) : null}

                {/* PIN Input grid */}
                <div className="flex justify-center gap-3 sm:gap-4 my-6">
                    {code.map((digit, idx) => (
                        <input
                            key={idx}
                            ref={(el) => {
                                inputs.current[idx] = el;
                            }}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleChange(idx, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(idx, e)}
                            onPaste={handlePaste}
                            aria-label={`Digit ${idx + 1}`}
                            className="w-13 h-13 sm:w-16 sm:h-16 text-center font-bold text-lg sm:text-xl text-secondary rounded-xl bg-[#F7F7FD] border border-[#E4E4E8] focus:border-secondary focus:bg-white focus:ring-2 focus:ring-secondary/15 outline-none transition-all"
                        />
                    ))}
                </div>

                {/* Expiry & Resend Line */}
                <div className="flex items-center justify-between text-xs sm:text-sm text-[#52525B]">
                    <div>
                        Your verification code expires in:{' '}
                        <span className="text-[#43CC88] font-medium font-mono">
                            {mm}:{ss}
                        </span>
                    </div>
                    <button
                        type="button"
                        onClick={handleResendClick}
                        disabled={seconds > 0}
                        className={`transition-colors  ${
                            seconds > 0
                                ? 'text-[#52525B] cursor-not-allowed'
                                : 'text-gray-600 hover:text-secondary hover:underline cursor-pointer'
                        }`}
                    >
                        Resend Code
                    </button>
                </div>

                {/* Primary Button */}
                <button
                    type="submit"
                    disabled={!canContinue || isSubmitting}
                    className={`w-full py-3.5 rounded-xl  transition-all text-white ${
                        canContinue && !isSubmitting
                            ? 'bg-[#002D62] hover:bg-[#002550] shadow-md cursor-pointer'
                            : 'bg-[#002D62]/50 cursor-not-allowed opacity-80'
                    }`}
                >
                    {isSubmitting ? (
                        <div className="flex items-center justify-center gap-2">
                            <span className="h-4 w-4 rounded-full border-2 border-white/70 border-t-white animate-spin" />
                            <span>Verifying...</span>
                        </div>
                    ) : (
                        buttonText
                    )}
                </button>
            </form>
        </div>
    );
}
