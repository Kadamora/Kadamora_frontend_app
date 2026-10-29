import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import logo from '/assets/images/logo.png';
import { useRequestPasswordResetMutation } from '@shared/api/auth.api';
import { showSuccessToast, showErrorToast } from '@shared/components/Toast/Toast';


export default function AdminForgotPasswordVerify() {
    const navigate = useNavigate();
    const [code, setCode] = useState<string[]>(['', '', '', '']);
    const [seconds, setSeconds] = useState(60);
    const inputs = useRef<Array<HTMLInputElement | null>>([]);
    const [triggerPasswordReset] = useRequestPasswordResetMutation();

    useEffect(() => {
        if (seconds <= 0) return;
        const t = setInterval(() => setSeconds((s) => s - 1), 1000);
        return () => clearInterval(t);
    }, [seconds]);

    const onChange = (idx: number, value: string) => {
        const digit = value.replace(/\D/g, '').slice(0, 1);
        const next = [...code];
        next[idx] = digit;
        setCode(next);
        if (digit && idx < inputs.current.length - 1) {
            inputs.current[idx + 1]?.focus();
        }
    };

    const onKeyDown = (idx: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !code[idx] && idx > 0) {
            inputs.current[idx - 1]?.focus();
        }
    };

    const canContinue = code.every((c) => c.length === 1);

    const handleResend = async () => {
        const email = sessionStorage.getItem('resetEmail') || '';
        if (!email) {
            showErrorToast('Error', 'No email found in session. Please restart password reset.');
            return;
        }
        try {
            const res = await triggerPasswordReset({ email }).unwrap();
            setCode(['', '', '', '']);
            setSeconds(60);
            inputs.current[0]?.focus();
            showSuccessToast('Code Resent', res.message || 'A new verification code has been sent to your email.');
        } catch (err: any) {
            showErrorToast('Resend Failed', err?.data?.message || err?.message || 'Failed to resend code.');
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const pinCode = code.join('');
        navigate(`/admin/auth/reset-password/${pinCode}`);
    };

    const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
    const ss = String(seconds % 60).padStart(2, '0');

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-[#041b2d] via-[#052c46] to-[#042f23] flex items-center justify-center px-4">
            <a href="/">
                <img
                    src={logo}
                    alt="Kadamora logo"
                    className="absolute top-[24px] left-[24px] w-[200px] h-auto z-20"
                />
            </a>
            <div className='w-full max-w-lg bg-white rounded-2xl shadow-xl px-10 py-16'>
            <h1 className="text-3xl font-semibold text-secondary">Forget Password</h1>
            <p className="text-gray-600 mt-2">
                Enter the four digit pin we sent to your email to proceed with setting a new password.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div className="flex gap-3">
                    {code.map((c, idx) => (
                        <input
                            key={idx}
                            ref={(el) => {
                                inputs.current[idx] = el;
                            }}
                            value={c}
                            onChange={(e) => onChange(idx, e.target.value)}
                            onKeyDown={(e) => onKeyDown(idx, e)}
                            inputMode="numeric"
                            pattern="[0-9]*"
                            maxLength={1}
                            aria-label={`OTP digit ${idx + 1}`}
                            className="w-12 h-12 text-center rounded-lg bg-[#F5F7FB] border border-[#E6EAF2] focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-base"
                        />
                    ))}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>
                        Your verification code expires in:{' '}
                        <span className="text-green-600 font-medium">
                            {mm}:{ss}
                        </span>
                    </span>
                    <button type="button" onClick={handleResend} className="text-gray-600 hover:underline">
                        Resend Code
                    </button>
                </div>

                <button
                    type="submit"
                    className={`w-full py-3 mt-10 rounded-lg transition-colors ${
                        canContinue
                            ? 'bg-secondary text-white hover:opacity-95'
                            : 'bg-gray-300 text-white cursor-not-allowed'
                    }`}
                    disabled={!canContinue}
                >
                    Continue
                </button>
            </form>
        </div>
        </div>
    );
}
