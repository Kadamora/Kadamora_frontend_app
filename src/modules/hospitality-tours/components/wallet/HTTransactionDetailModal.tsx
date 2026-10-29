import { FiX, FiCheckCircle, FiClock, FiArrowDownLeft, FiArrowUpRight } from 'react-icons/fi';
import type { Transaction } from '../../types';

interface HTTransactionDetailModalProps {
    transaction: Transaction | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function HTTransactionDetailModal({
    transaction,
    isOpen,
    onClose,
}: HTTransactionDetailModalProps) {
    if (!isOpen || !transaction) return null;

    const isDeposit = transaction.type.toLowerCase() === 'deposit';
    const isCompleted = transaction.status.toLowerCase() === 'completed';

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-fade-in">
            <div
                className="bg-white rounded-3xl shadow-xl w-full max-w-md overflow-hidden animate-scale-in"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-slate-100 bg-white">
                    <h2 className="text-lg font-bold text-[#002E62]">Transaction Details</h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="w-8 h-8 rounded-full bg-[#EBF3FF] hover:bg-[#DBEAFE] text-slate-500 hover:text-[#002E62] flex items-center justify-center transition-colors cursor-pointer"
                        title="Close modal"
                    >
                        <FiX className="h-4 w-4 stroke-[2.5]" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-6">
                    {/* Amount & Type Hero */}
                    <div className="text-center py-2 space-y-2">
                        <div
                            className={`w-12 h-12 rounded-full mx-auto flex items-center justify-center ${
                                isDeposit ? 'bg-[#E6F9F0] text-[#10B981]' : 'bg-[#FFF4ED] text-[#F97316]'
                            }`}
                        >
                            {isDeposit ? (
                                <FiArrowDownLeft className="h-6 w-6 stroke-[2.5]" />
                            ) : (
                                <FiArrowUpRight className="h-6 w-6 stroke-[2.5]" />
                            )}
                        </div>
                        <h3
                            className={`text-2xl font-black ${
                                isDeposit ? 'text-[#16A34A]' : 'text-[#EA580C]'
                            }`}
                        >
                            {isDeposit ? '+' : '-'}₦{Number(transaction.amount).toFixed(2)}
                        </h3>
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                            {transaction.type} Transaction
                        </p>
                    </div>

                    {/* Key Value Details */}
                    <div className="bg-[#F8FAFC] rounded-2xl p-4 space-y-3 text-xs sm:text-sm border border-slate-100">
                        <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                            <span className="text-slate-500">Transaction ID</span>
                            <span className="font-semibold text-slate-800">{transaction.id}</span>
                        </div>
                        <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                            <span className="text-slate-500">Date & Time</span>
                            <span className="font-medium text-slate-700">
                                {new Date(transaction.date).toLocaleString('en-US')}
                            </span>
                        </div>
                        <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                            <span className="text-slate-500">Status</span>
                            <span
                                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                                    isCompleted
                                        ? 'bg-[#E8F8EE] text-[#16A34A] border border-[#B6EAC4]'
                                        : 'bg-[#FDF2F2] text-[#E02424] border border-[#F8B4B4]'
                                }`}
                            >
                                {isCompleted ? (
                                    <FiCheckCircle className="h-3 w-3" />
                                ) : (
                                    <FiClock className="h-3 w-3" />
                                )}
                                <span>{transaction.status}</span>
                            </span>
                        </div>
                        <div className="flex justify-between items-center py-1">
                            <span className="text-slate-500">Channel</span>
                            <span className="font-medium text-slate-700">
                                {isDeposit ? 'Bank Transfer' : 'Direct Bank Payout'}
                            </span>
                        </div>
                    </div>

                    {/* Footer Close */}
                    <div className="pt-1">
                        <button
                            type="button"
                            onClick={onClose}
                            className="w-full py-2.5 bg-[#002E62] hover:bg-[#072440] text-white text-sm font-semibold rounded-lg transition-colors cursor-pointer"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
