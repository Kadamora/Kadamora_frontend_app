import React from 'react';
import { X, CreditCard } from 'lucide-react';
import Input from '@components/forms/Input'; 

interface CreditCardModalProps {
    isOpen: boolean;
    onClose: () => void;
    amount: number;
    onPay: () => void;
}

const CreditCardModal: React.FC<CreditCardModalProps> = ({ isOpen, onClose, amount, onPay }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-0 relative animate-scale-in overflow-hidden mx-4">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-3 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-[var(--color-secondary)]">Payment</h2>
                    <button 
                        onClick={onClose}
                        className="p-1.5 hover:bg-gray-100 border border-gray-200 rounded-full transition-colors text-gray-400 hover:text-gray-600"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">

                    <div className="flex flex-col">
                        <span className="text-gray-500 text-sm">Payment Amount</span>
                        <span className="text-xl font-medium text-[var(--color-secondary)]">NGN {amount.toLocaleString()}</span>
                    </div>

                    <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onPay(); }}>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                            <div className="relative">
                                <Input 
                                    type="text" 
                                    placeholder="0000 0000 0000 0000" 
                                    className="w-full pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all"
                                />
                                <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Card Holder Name</label>
                            <Input 
                                type="text" 
                                placeholder="Enter card holder name" 
                                className="w-full px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                                <Input 
                                    type="text" 
                                    placeholder="MM/YY" 
                                    className="w-full px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                                <Input 
                                    type="text" 
                                    placeholder="Enter CVV" 
                                    className="w-full px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all"
                                />
                            </div>
                        </div>
                    </form>
                    
                </div>

                {/* Footer */}
                <div className="px-6 pb-8 pt-2">
                    <button 
                        onClick={onPay}
                        className=" px-5 py-3 bg-[var(--color-secondary)] text-white rounded-xl font-semibold hover:opacity-90 transition-all shadow-lg shadow-blue-900/20 active:scale-95"
                    >
                        Pay ₦ {amount.toLocaleString()}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreditCardModal;
