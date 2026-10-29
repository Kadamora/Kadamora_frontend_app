import { useState } from 'react';
import Modal from '@shared/components/Modal/Modal';
import { FiInfo, FiCopy, FiCheck } from 'react-icons/fi';

export interface MarketplacePaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onPaymentSuccess: () => void;
    amount?: number;
    bankName?: string;
    accountNumber?: string;
    accountName?: string;
}

export default function MarketplacePaymentModal({
    isOpen,
    onClose,
    onPaymentSuccess,
    amount = 3500000,
    bankName = 'Wema Bank',
    accountNumber = '015119521001',
    accountName = 'Smart Valley',
}: MarketplacePaymentModalProps) {
    const [copied, setCopied] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(accountNumber);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleConfirmPayment = () => {
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            onPaymentSuccess();
        }, 800);
    };

    const formattedAmount = `NGN ${amount.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })}`;

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Payments"
            maxWidth="max-w-[480px]"
            className="p-6 sm:p-7"
        >
            <div className="space-y-4">
                {/* 1. Payment Amount */}
                <div className="space-y-1">
                    <span className="text-xs text-[#71717A] font-medium block">
                        Payment Amount
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#002E62]">
                        {formattedAmount}
                    </h3>
                </div>

                <div className="border-t border-[#F0F2F5]" />

                {/* 2. Bank Name */}
                <div className="space-y-1">
                    <h4 className="text-sm sm:text-base font-bold text-[#002E62]">
                        Bank Name
                    </h4>
                    <p className="text-xs sm:text-sm text-[#0062D2] font-medium">
                        {bankName}
                    </p>
                </div>

                <div className="border-t border-[#F0F2F5]" />

                {/* 3. Account Number */}
                <div className="flex items-center justify-between gap-3">
                    <div className="space-y-1">
                        <h4 className="text-sm sm:text-base font-bold text-[#002E62]">
                            {accountNumber}
                        </h4>
                        <p className="text-xs sm:text-sm text-[#0062D2] font-medium">
                            Account Number
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={handleCopy}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-[#CCE3FD] text-xs font-semibold text-[#002E62] hover:bg-[#F3F9FF] transition-colors cursor-pointer"
                        title="Copy account number"
                    >
                        {copied ? (
                            <>
                                <FiCheck className="h-3.5 w-3.5 text-emerald-600" />
                                <span className="text-emerald-600">Copied</span>
                            </>
                        ) : (
                            <>
                                <FiCopy className="h-3.5 w-3.5" />
                                <span>Copy</span>
                            </>
                        )}
                    </button>
                </div>

                <div className="border-t border-[#F0F2F5]" />

                {/* 4. Account Name */}
                <div className="space-y-1">
                    <h4 className="text-sm sm:text-base font-bold text-[#002E62]">
                        {accountName}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#0062D2] font-medium">
                        Account Name
                    </p>
                </div>

                {/* 5. Info Alert Notice */}
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-transparent border border-transparent pt-3">
                    <div className="h-6 w-6 rounded-full border border-[#0062D2] text-[#0062D2] flex items-center justify-center shrink-0 mt-0.5">
                        <FiInfo className="h-3.5 w-3.5" />
                    </div>
                    <p className="text-xs text-[#52525B] leading-relaxed">
                        Please ensure you transfer the exact amount above; sending anything more or
                        less could cause the transaction to be rejected and ultimately fail.
                    </p>
                </div>

                {/* 6. Action Button */}
                <div className="pt-2">
                    <button
                        type="button"
                        onClick={handleConfirmPayment}
                        disabled={isSubmitting}
                        className="bg-[#002E62] hover:bg-[#002047] disabled:opacity-60 text-white px-6 py-3 rounded-lg text-xs sm:text-sm font-semibold transition-colors cursor-pointer shadow-xs"
                    >
                        {isSubmitting ? 'Verifying Payment...' : "I've Made Payment"}
                    </button>
                </div>
            </div>
        </Modal>
    );
}
