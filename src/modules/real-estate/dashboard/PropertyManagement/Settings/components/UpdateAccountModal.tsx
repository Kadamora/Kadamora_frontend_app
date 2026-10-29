import React, { useState, useEffect } from 'react';
import Input from '@shared/components/Forms/Input';
import CloseButton from '@modules/real-estate/dashboard/PropertyListing/Home/components/OnboardingAgent/components/CloseButton';
import { Eye, EyeOff, Lock, AlertCircle } from 'lucide-react';

interface UpdateAccountModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: {
        bankName: string;
        accountNumber: string;
        accountName: string;
        currentPassword: string;
    }) => Promise<void> | void;
    initialData?: { bankName: string; accountNumber: string; accountName: string };
    isLoading?: boolean;
}

const UpdateAccountModal: React.FC<UpdateAccountModalProps> = ({
    open,
    onClose,
    onSubmit,
    initialData,
    isLoading = false,
}) => {
    const [bankName, setBankName] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [accountName, setAccountName] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        if (open) {
            setBankName(initialData?.bankName || '');
            setAccountNumber(initialData?.accountNumber || '');
            setAccountName(initialData?.accountName || '');
            setCurrentPassword('');
            setShowPassword(false);
            setErrorMessage(null);
        }
    }, [open, initialData]);

    if (!open) return null;

    const handleAccountNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Restrict strictly to digits up to 20 chars
        const digits = e.target.value.replace(/\D/g, '').slice(0, 20);
        setAccountNumber(digits);
        if (errorMessage) setErrorMessage(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage(null);

        const trimmedBank = bankName.trim();
        const trimmedAccountNum = accountNumber.trim();
        const trimmedAccountName = accountName.trim();

        // Validation according to backend security specifications:
        // - bankName: up to 100 characters
        // - accountNumber: 6 to 20 digits
        // - accountName: up to 150 characters
        // - currentPassword: required
        if (!trimmedBank) {
            setErrorMessage('Please enter the bank name.');
            return;
        }
        if (trimmedBank.length > 100) {
            setErrorMessage('Bank name cannot exceed 100 characters.');
            return;
        }

        if (!trimmedAccountNum) {
            setErrorMessage('Please enter the account number.');
            return;
        }
        if (trimmedAccountNum.length < 6 || trimmedAccountNum.length > 20 || !/^\d{6,20}$/.test(trimmedAccountNum)) {
            setErrorMessage('Account number must be between 6 and 20 digits.');
            return;
        }

        if (!trimmedAccountName) {
            setErrorMessage('Please enter the account name.');
            return;
        }
        if (trimmedAccountName.length > 150) {
            setErrorMessage('Account name cannot exceed 150 characters.');
            return;
        }

        if (!currentPassword) {
            setErrorMessage('Current password is required to change bank details.');
            return;
        }

        try {
            await onSubmit({
                bankName: trimmedBank,
                accountNumber: trimmedAccountNum,
                accountName: trimmedAccountName,
                currentPassword,
            });
        } catch (err: any) {
            const msg =
                err?.data?.message ||
                err?.message ||
                'Authentication failed. Please verify your current password.';
            setErrorMessage(msg);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
            <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}`}</style>
            <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden animate-[fadeIn_.25s_ease] p-6 sm:p-8">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-[22px] font-semibold text-[#001731]">Update Bank Details</h2>
                        <p className="text-xs sm:text-sm text-[#71717A] mt-1">
                            Your password is required to authorize modifications to payment details.
                        </p>
                    </div>
                    <CloseButton onClick={onClose} />
                </div>

                {errorMessage && (
                    <div
                        role="alert"
                        className="mb-6 flex items-start gap-2.5 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600"
                    >
                        <AlertCircle className="w-5 h-5 shrink-0 text-red-500 mt-0.5" />
                        <span>{errorMessage}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <Input
                        title="Bank Name"
                        placeholder="e.g. Access Bank, GTBank, Zenith"
                        value={bankName}
                        onChange={(e) => {
                            setBankName(e.target.value);
                            if (errorMessage) setErrorMessage(null);
                        }}
                        maxLength={100}
                        required
                    />

                    <div>
                        <Input
                            title="Account Number"
                            placeholder="6 to 20 digits"
                            value={accountNumber}
                            onChange={handleAccountNumberChange}
                            inputMode="numeric"
                            minLength={6}
                            maxLength={20}
                            required
                        />
                        <span className="text-[11px] text-[#71717A] mt-1 block">
                            Must be 6 to 20 digits ({accountNumber.length}/20)
                        </span>
                    </div>

                    <Input
                        title="Account Name"
                        placeholder="e.g. John Doe Enterprises"
                        value={accountName}
                        onChange={(e) => {
                            setAccountName(e.target.value);
                            if (errorMessage) setErrorMessage(null);
                        }}
                        maxLength={150}
                        required
                    />

                    <div className="pt-2 border-t border-gray-100">
                        <label className="text-[14px] font-medium text-[#27272E] mb-1.5 flex items-center gap-1.5">
                            <Lock className="w-3.5 h-3.5 text-[#002E62]" />
                            Current Password <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={currentPassword}
                                onChange={(e) => {
                                    setCurrentPassword(e.target.value);
                                    if (errorMessage) setErrorMessage(null);
                                }}
                                placeholder="Enter your current password"
                                required
                                className="w-full py-3 pl-4 pr-11 border border-[#E0DEF7] rounded-lg focus:ring-2 focus:ring-[#002E62]/70 bg-[#F7F7FD] focus:border-transparent outline-none transition-colors focus:bg-white placeholder-[#52525B] text-[14px]"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 p-1 cursor-pointer"
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                            >
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                        <p className="text-[12px] text-[#71717A] mt-1.5">
                            For security, an email notification will be sent to your account when bank details are updated.
                        </p>
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-3">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isLoading}
                            className="py-2.5 px-5 rounded-lg border border-gray-300 text-gray-700 font-medium text-[14px] hover:bg-gray-50 transition-colors cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="py-2.5 px-6 rounded-lg bg-[#002E62] text-white font-semibold text-[14px] hover:bg-[#002E62]/90 transition-colors disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <span className="h-4 w-4 rounded-full border-2 border-white/70 border-t-white animate-spin" />
                                    <span>Saving...</span>
                                </>
                            ) : (
                                'Save Bank Details'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateAccountModal;


