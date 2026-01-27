import React from 'react';
import { X, Copy } from 'lucide-react';

interface BankTransferModalProps {
    isOpen: boolean;
    onClose: () => void;
    amount: number;
    onConfirm: () => void;
}

const BankTransferModal: React.FC<BankTransferModalProps> = ({ isOpen, onClose, amount, onConfirm }) => {
    if (!isOpen) return null;

    const bankDetails = {
        bankName: "Guaranty Trust Bank",
        accountNumber: "0123456789",
        accountName: "Kadamora Limited"
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        // Could add a toast here
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-0 relative animate-scale-in overflow-hidden mx-4">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-3 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-[var(--color-secondary)]">Bank Transfer</h2>
                    <button 
                        onClick={onClose}
                        className="p-1.5 hover:bg-gray-100 border border-gray-200 rounded-full transition-colors text-gray-400 hover:text-gray-600"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                   

                    <div className="space-y-4">
                        <div>
                            <label className="text-xs font-medium text-[var(--color-secondary)] ">Amount to Pay</label>
                            <div className="flex items-center justify-between ">
                                <span className="text-xl font-bold text-[var(--color-secondary)]">₦{amount.toLocaleString()}</span>
                                {/* <button 
                                    onClick={() => copyToClipboard(amount.toString())}
                                    className="p-2 hover:bg-gray-200 rounded-md transition-colors text-gray-500"
                                    title="Copy Amount"
                                >
                                    <Copy size={16} />
                                </button> */}
                            </div>
                        </div>

                        <div className='border-t border-gray-200 pt-2'>
                            <div className=" rounded-lg font-semibold text-[var(--color-secondary)]">
                                {bankDetails.bankName}
                            </div>
                            <label className="text-xs font-medium  text-[var(--color-secondary)]">Bank Name</label>
                        </div>

                        <div className='border-t border-gray-200 pt-2'>
                            <div className="flex items-center justify-between ">
                                <span className="text-lg font-mono font-semibold text-[var(--color-secondary)]">{bankDetails.accountNumber}</span>
                                <button 
                                    onClick={() => copyToClipboard(bankDetails.accountNumber)}
                                    className="p-2 hover:bg-gray-200 rounded-md transition-colors text-gray-500"
                                    title="Copy Account Number"
                                >
                                    <Copy size={16} />
                                </button>
                            </div>
                            <label className="text-xs font-medium  text-[var(--color-secondary)]">Account Number</label>
                        </div>

                        <div className='border-t border-gray-200 pt-2'>
                            <div className=" rounded-lg  font-semibold text-[var(--color-secondary)]">
                                {bankDetails.accountName}
                            </div>
                            <label className="text-xs font-medium text-[var(--color-secondary)] ">Account Name</label>
                        </div>
                    </div>
                     <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 flex gap-3">
                        <div className="shrink-0 mt-0.5">
                            <div className="w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-xs">!</div>
                        </div>
                        <p className="text-sm text-orange-800">
                            Please ensure you transfer the exact amount above; sending anything more or less could cause the transaction to be rejected and ultimately fail.
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 pb-8 pt-2">
                    <button 
                        onClick={onConfirm}
                        className="text-sm px-6 py-3 bg-[var(--color-secondary)] text-white rounded-xl font-medium hover:opacity-90 transition-all shadow-lg shadow-blue-900/20 active:scale-95 flex items-center justify-center gap-2"
                    >
                        I've Made Payment
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BankTransferModal;
