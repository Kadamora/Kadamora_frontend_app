import React, { useState } from 'react';
import { X } from 'lucide-react';
import Select from '@components/forms/Select';

interface PaymentMethodModalProps {
    isOpen: boolean;
    onClose: () => void;
    amount: number;
    onNext: (method: string) => void;
}

const PaymentMethodModal: React.FC<PaymentMethodModalProps> = ({ isOpen, onClose, amount, onNext }) => {
    const [paymentMethod, setPaymentMethod] = useState<string>('');

    if (!isOpen) return null;

    const paymentOptions = [
        { label: 'Credit Card', value: 'credit_card' },
        { label: 'Bank Transfer', value: 'bank_transfer' },
    ];

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
                   <div>
                       <p className='text-gray-500 text-sm leading-relaxed'>Payment Amount</p>
                       <h3 className="text-2xl font-bold text-[var(--color-secondary)] mt-1">
                           ₦{amount.toLocaleString()}
                       </h3>
                   </div>

                   <div>
                        <Select
                            title="Payment Method"
                            placeholder="Select payment method"
                            options={paymentOptions}
                            value={paymentMethod}
                            onChange={(value) => setPaymentMethod(value)}
                            required
                        />
                   </div>
                </div>

                {/* Footer */}
                <div className="px-6 pb-10 flex gap-4 items-center justify-start">
                    <button 
                        onClick={() => onNext(paymentMethod)}
                        disabled={!paymentMethod}
                        className="px-6 py-2.5 bg-[var(--color-secondary)] text-white rounded-lg font-medium hover:opacity-90 transition-all shadow-lg shadow-blue-900/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                       Done
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentMethodModal;
