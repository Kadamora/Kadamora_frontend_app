import React, { useState } from 'react';
import { FiX, FiCheck } from 'react-icons/fi';

interface HTWithdrawModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentBalance?: number;
    onSuccessWithdraw?: (amount: number) => void;
}

export default function HTWithdrawModal({
    isOpen,
    onClose,
    currentBalance = 98370.80,
    onSuccessWithdraw,
}: HTWithdrawModalProps) {
    const [amount, setAmount] = useState('');
    const [bankName, setBankName] = useState('GTBank');
    const [accountNumber, setAccountNumber] = useState('');
    const [accountName, setAccountName] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    if (!isOpen) return null;

    const handleClose = () => {
        setAmount('');
        setAccountNumber('');
        setAccountName('');
        setIsSuccess(false);
        setIsSubmitting(false);
        onClose();
    };

    const handleWithdraw = (e: React.FormEvent) => {
        e.preventDefault();
        const numericAmount = Number(amount);
        if (!numericAmount || numericAmount <= 0) return;

        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
            onSuccessWithdraw?.(numericAmount);
        }, 1200);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-fade-in">
            <div
                className="bg-white rounded-3xl shadow-xl w-full max-w-lg overflow-hidden animate-scale-in"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 sm:px-8 pt-6 pb-4 border-b border-slate-100 bg-white">
                    <h2 className="text-xl font-bold text-[#002E62]">Withdraw Money</h2>
                    <button
                        type="button"
                        onClick={handleClose}
                        className="w-8 h-8 rounded-full bg-[#EBF3FF] hover:bg-[#DBEAFE] text-slate-500 hover:text-[#002E62] flex items-center justify-center transition-colors cursor-pointer"
                        title="Close modal"
                    >
                        <FiX className="h-4 w-4 stroke-[2.5]" />
                    </button>
                </div>

                {!isSuccess ? (
                    <form onSubmit={handleWithdraw} className="p-6 sm:p-8 space-y-5">
                        {/* Current Available Balance */}
                        <div className="bg-[#F8FAFC] p-4 rounded-xl border border-slate-100 flex items-center justify-between">
                            <div>
                                <span className="text-xs text-slate-500 font-medium">Available Balance</span>
                                <p className="text-lg font-bold text-[#002E62]">
                                    NGN {currentBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                </p>
                            </div>
                        </div>

                        {/* Amount */}
                        <div className="space-y-1.5">
                            <label className="text-xs sm:text-sm font-bold text-[#002E62]">
                                Withdrawal Amount (NGN)
                            </label>
                            <input
                                type="number"
                                required
                                min="100"
                                max={currentBalance}
                                placeholder="e.g. 15000"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E0DEF7] rounded-lg text-sm text-slate-800 placeholder-[#94A3B8] focus:outline-none focus:bg-white focus:border-[#002E62] transition-colors"
                            />
                        </div>

                        {/* Bank Select */}
                        <div className="space-y-1.5">
                            <label className="text-xs sm:text-sm font-bold text-[#002E62]">
                                Select Destination Bank
                            </label>
                            <select
                                value={bankName}
                                onChange={(e) => setBankName(e.target.value)}
                                className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E0DEF7] rounded-lg text-sm text-slate-800 focus:outline-none focus:bg-white focus:border-[#002E62] transition-colors"
                            >
                                <option value="GTBank">Guaranty Trust Bank (GTBank)</option>
                                <option value="Access Bank">Access Bank</option>
                                <option value="Zenith Bank">Zenith Bank</option>
                                <option value="First Bank">First Bank of Nigeria</option>
                                <option value="Wema Bank">Wema Bank</option>
                                <option value="Kuda Bank">Kuda Microfinance Bank</option>
                                <option value="OPay">OPay</option>
                            </select>
                        </div>

                        {/* Account Number */}
                        <div className="space-y-1.5">
                            <label className="text-xs sm:text-sm font-bold text-[#002E62]">
                                Account Number
                            </label>
                            <input
                                type="text"
                                required
                                maxLength={10}
                                placeholder="Enter 10-digit NUBAN"
                                value={accountNumber}
                                onChange={(e) => setAccountNumber(e.target.value)}
                                className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E0DEF7] rounded-lg text-sm text-slate-800 placeholder-[#94A3B8] focus:outline-none focus:bg-white focus:border-[#002E62] transition-colors"
                            />
                        </div>

                        {/* Account Name */}
                        <div className="space-y-1.5">
                            <label className="text-xs sm:text-sm font-bold text-[#002E62]">
                                Account Name
                            </label>
                            <input
                                type="text"
                                required
                                placeholder="Enter Account Holder Name"
                                value={accountName}
                                onChange={(e) => setAccountName(e.target.value)}
                                className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E0DEF7] rounded-lg text-sm text-slate-800 placeholder-[#94A3B8] focus:outline-none focus:bg-white focus:border-[#002E62] transition-colors"
                            />
                        </div>

                        {/* Action Buttons */}
                        <div className="pt-2 flex items-center justify-end gap-3">
                            <button
                                type="button"
                                onClick={handleClose}
                                className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting || !amount}
                                className="px-7 py-3 bg-[#002E62] hover:bg-[#072440] text-white text-xs sm:text-sm font-semibold rounded-lg transition-colors cursor-pointer shadow-xs disabled:opacity-50"
                            >
                                {isSubmitting ? 'Processing...' : 'Withdraw Funds'}
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="p-8 text-center space-y-4">
                        <div className="w-14 h-14 rounded-full bg-[#E6F9F0] text-[#10B981] mx-auto flex items-center justify-center">
                            <FiCheck className="h-8 w-8 stroke-[3]" />
                        </div>
                        <h3 className="text-xl font-bold text-[#002E62]">Withdrawal Initiated!</h3>
                        <p className="text-xs sm:text-sm text-[#64748B] max-w-sm mx-auto">
                            Your withdrawal of NGN {Number(amount).toLocaleString()} has been queued and will arrive in your bank account shortly.
                        </p>
                        <div className="pt-2">
                            <button
                                type="button"
                                onClick={handleClose}
                                className="px-8 py-2.5 bg-[#002E62] hover:bg-[#072440] text-white text-sm font-semibold rounded-lg transition-colors cursor-pointer"
                            >
                                Done
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
