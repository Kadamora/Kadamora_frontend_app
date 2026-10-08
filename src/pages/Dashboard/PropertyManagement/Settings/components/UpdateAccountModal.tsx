import React, { useState, useEffect } from 'react';
import Input from '@components/forms/Input';
import CloseButton from '@pages/Dashboard/PropertyListing/Home/components/OnboardingAgent/components/CloseButton';

interface UpdateAccountModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: { bankName: string; accountNumber: string; accountName: string }) => void;
    initialData?: { bankName: string; accountNumber: string; accountName: string };
    isLoading?: boolean;
}

const UpdateAccountModal: React.FC<UpdateAccountModalProps> = ({ open, onClose, onSubmit, initialData, isLoading }) => {
    const [bankName, setBankName] = useState(initialData?.bankName || '');
    const [accountNumber, setAccountNumber] = useState(initialData?.accountNumber || '');
    const [accountName, setAccountName] = useState(initialData?.accountName || '');

    useEffect(() => {
        if (open && initialData) {
            setBankName(initialData.bankName);
            setAccountNumber(initialData.accountNumber);
            setAccountName(initialData.accountName);
        }
    }, [open, initialData]);

    if (!open) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ bankName, accountNumber, accountName });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4">
            <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}`}</style>
            <div className="relative w-full max-w-lg bg-white rounded-xl shadow-xl overflow-hidden animate-[fadeIn_.25s_ease] p-8">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-[22px] font-semibold text-[#001731]">Update Account Details</h2>
                    <CloseButton onClick={onClose} />
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                        title="Bank Name"
                        placeholder="Enter bank name"
                        value={bankName}
                        onChange={(e) => setBankName(e.target.value)}
                        required
                    />
                    <Input
                        title="Account Number"
                        placeholder="Enter account number"
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                        required
                    />
                    <Input
                        title="Account Name"
                        placeholder="Enter account name"
                        value={accountName}
                        onChange={(e) => setAccountName(e.target.value)}
                        required
                    />

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="py-3 px-6 rounded-md bg-[#002E62] text-white font-semibold text-[15px] hover:bg-[#002E62]/90 transition-colors mt-4 disabled:opacity-50"
                    >
                        {isLoading ? 'Saving...' : 'Save Changes'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateAccountModal;
