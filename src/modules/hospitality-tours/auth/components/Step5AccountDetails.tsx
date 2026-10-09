import { useState } from 'react';
import Input from '@shared/components/Forms/Input';
import Select from '@shared/components/Forms/Select';
import StepProgressIndicator from './StepProgressIndicator';

export interface AccountDetailsFormData {
    bankName: string;
    accountNumber: string;
}

export interface Step5AccountDetailsProps {
    initialData: AccountDetailsFormData;
    onPrevious: () => void;
    onSubmit: (data: AccountDetailsFormData) => void;
    isSubmitting?: boolean;
}

const BANK_LIST = [
    { label: 'Access Bank', value: 'Access Bank' },
    { label: 'Access Bank (Diamond)', value: 'Access Bank (Diamond)' },
    { label: 'ALAT by WEMA', value: 'ALAT by WEMA' },
    { label: 'First Bank of Nigeria', value: 'First Bank' },
    { label: 'FCMB (First City Monument Bank)', value: 'FCMB' },
    { label: 'Fidelity Bank', value: 'Fidelity Bank' },
    { label: 'Guaranty Trust Bank (GTBank)', value: 'GTBank' },
    { label: 'Globus Bank', value: 'Globus Bank' },
    { label: 'Heritage Bank', value: 'Heritage Bank' },
    { label: 'Keystone Bank', value: 'Keystone Bank' },
    { label: 'Kuda Bank', value: 'Kuda Bank' },
    { label: 'Moniepoint MFB', value: 'Moniepoint' },
    { label: 'OPay Digital Services', value: 'OPay' },
    { label: 'Palmpay', value: 'Palmpay' },
    { label: 'Polaris Bank', value: 'Polaris Bank' },
    { label: 'Providus Bank', value: 'Providus Bank' },
    { label: 'Stanbic IBTC Bank', value: 'Stanbic IBTC' },
    { label: 'Standard Chartered Bank', value: 'Standard Chartered' },
    { label: 'Sterling Bank', value: 'Sterling Bank' },
    { label: 'Union Bank of Nigeria', value: 'Union Bank' },
    { label: 'United Bank for Africa (UBA)', value: 'UBA' },
    { label: 'Unity Bank', value: 'Unity Bank' },
    { label: 'Wema Bank', value: 'Wema Bank' },
    { label: 'Zenith Bank', value: 'Zenith Bank' },
];

export default function Step5AccountDetails({
    initialData,
    onPrevious,
    onSubmit,
    isSubmitting = false,
}: Step5AccountDetailsProps) {
    const [formData, setFormData] = useState<AccountDetailsFormData>(initialData);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleBankChange = (selectedBank: string) => {
        setFormData({ ...formData, bankName: selectedBank });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.bankName) {
            setErrorMessage('Please select your bank.');
            return;
        }

        if (!formData.accountNumber.trim()) {
            setErrorMessage('Please enter your account number.');
            return;
        }

        if (!/^\d{10}$/.test(formData.accountNumber.trim())) {
            setErrorMessage('Account number must be 10 digits.');
            return;
        }

        setErrorMessage(null);
        onSubmit(formData);
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <StepProgressIndicator currentStep={3} />

            <h1 className="text-[30px] sm:text-3xl lg:text-[42px] font-bold text-secondary leading-tight">
                Your Account Details
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

                <Select
                    id="bankName"
                    name="bankName"
                    title="Bank Name"
                    options={BANK_LIST}
                    placeholder="Select your bank"
                    value={formData.bankName}
                    onChange={handleBankChange}
                    required
                />

                <Input
                    id="accountNumber"
                    name="accountNumber"
                    title="Account Number"
                    placeholder="Enter Bank Account"
                    value={formData.accountNumber}
                    onChange={handleChange}
                    maxLength={10}
                    required
                />

                <div className="flex items-center gap-4 pt-4">
                    <button
                        type="button"
                        onClick={onPrevious}
                        className="w-1/2 border border-[#CCE3FD] bg-[#EBF3FC] text-secondary font-medium py-3 rounded-xl hover:bg-[#DDEBFA] transition-colors"
                        disabled={isSubmitting}
                    >
                        Previous
                    </button>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-1/2 bg-[#002D62] text-white font-medium py-3 rounded-xl hover:bg-[#002550] transition-colors shadow-sm disabled:opacity-60"
                    >
                        {isSubmitting ? (
                            <div className="flex items-center justify-center gap-2">
                                <span className="h-4 w-4 rounded-full border-2 border-white/70 border-t-white animate-spin" />
                                <span>Completing...</span>
                            </div>
                        ) : (
                            'Proceed'
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
