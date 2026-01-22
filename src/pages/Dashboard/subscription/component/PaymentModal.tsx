import React from 'react';
import { X, ShieldCheck, Lock, FileText, Info } from 'lucide-react';

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl p-0 relative animate-scale-in overflow-hidden mx-4">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <h2 className="text-2xl font-bold text-[var(--color-secondary)]">Make Payment</h2>
                    <button 
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                    
                    {/* Item 1: Purpose */}
                    <div className="flex gap-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-[var(--color-primary-600)]">
                            <FileText size={24} />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-[var(--color-secondary)] mb-1">Purpose of the Payment</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                You are about to make a payment for the subscription of facility management Basic plan.
                            </p>
                        </div>
                        <div className="ml-auto">
                            {/* Toggle or Status Icon could go here */}
                        </div>
                    </div>

                    {/* Item 2: Policy */}
                    <div className="flex gap-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-[var(--color-primary-600)]">
                            <Info size={24} />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-[var(--color-secondary)] mb-1">Non-Refundable Policy</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                Payments are non-refundable once completed. Lectus tempus donec nibh eros lectus tristique turpis.
                            </p>
                        </div>
                    </div>

                    {/* Item 3: Data & Privacy */}
                    <div className="flex gap-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-[var(--color-primary-600)]">
                            <ShieldCheck size={24} />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-[var(--color-secondary)] mb-1">Data & Privacy</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                Your personal details will only be used for this subscription and will not be shared with third parties.
                            </p>
                        </div>
                    </div>

                    {/* Item 4: Security */}
                    <div className="flex gap-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-[var(--color-primary-600)]">
                            <Lock size={24} />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-[var(--color-secondary)] mb-1">Card Security</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                Card details are encrypted and handled via a PCI-compliant system. We do not store or access your card information.
                            </p>
                        </div>
                    </div>

                    {/* Checkbox */}
                    <div className="flex items-start gap-3 mt-4 pt-4 border-t border-gray-50">
                        <input 
                            type="checkbox" 
                            id="agree" 
                            className="mt-1 w-5 h-5 text-[var(--color-primary)] border-gray-300 rounded focus:ring-[var(--color-primary)] cursor-pointer"
                        />
                        <label htmlFor="agree" className="text-sm text-gray-600 cursor-pointer">
                            I have read and understood the above information and agree to proceed with the payment.
                        </label>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <button 
                        onClick={onClose}
                        className="px-6 py-3 border border-gray-200 rounded-xl text-gray-600 font-medium hover:bg-gray-50 transition-colors"
                    >
                        Close
                    </button>
                    <button 
                        className="px-8 py-3 bg-[var(--color-secondary)] text-white rounded-xl font-semibold hover:opacity-90 transition-all shadow-lg shadow-blue-900/20 active:scale-95"
                    >
                        Proceed to Payment
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentModal;
