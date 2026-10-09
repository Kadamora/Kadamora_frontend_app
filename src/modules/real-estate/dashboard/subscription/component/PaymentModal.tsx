import React from 'react';
import { X, ShieldCheck, Lock, FileText, Info } from 'lucide-react';

interface PaymentModalProps {
    isOpen: boolean;
    isLoading?: boolean;
    onClose: () => void;
    onProceed: () => void;
}

export const paymentInfoSections = [
  {
    icon: FileText,
    title: "Purpose of the Payment",
    description:
      "You are about to make a payment for the subscription of facility management Basic plan.",
  },
  {
    icon: Info,
    title: "Non-Refundable Policy",
    description:
      "Payments are non-refundable once completed. Lectus tempus donec nibh eros lectus tristique turpis.",
  },
  {
    icon: ShieldCheck,
    title: "Data & Privacy",
    description:
      "Your personal details will only be used for this subscription and will not be shared with third parties.",
  },
  {
    icon: Lock,
    title: "Card Security",
    description:
      "Card details are encrypted and handled via a PCI-compliant system. We do not store or access your card information.",
  },
];

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, isLoading, onClose, onProceed }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-0 relative animate-scale-in overflow-hidden mx-4">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-3 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-[var(--color-secondary)]">Make Payment</h2>
                    <button 
                        onClick={onClose}
                        className="p-1.5 hover:bg-gray-100 border border-gray-200 rounded-full transition-colors text-gray-400 hover:text-gray-600"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto custom-scrollbar">
                    {paymentInfoSections.map((section, index) => (
                        <div key={index} className="flex gap-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-[var(--color-primary-600)]">
                            <section.icon size={20} />
                        </div>
                        <div>
                            <h3 className="text-base font-semibold text-[var(--color-secondary)] mb-1">{section.title}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                {section.description}
                            </p>
                        </div>
                    </div>
                    ))}

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
                <div className="px-6 pb-10 flex gap-4 items-center">
                    <button 
                        onClick={onClose}
                        className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-600 font-medium hover:bg-gray-50 transition-colors"
                    >
                        Close
                    </button>
                    <button 
                        onClick={onProceed}
                        disabled={isLoading}
                        className="px-6 py-2.5 bg-[var(--color-secondary)] disabled:opacity-50 text-white rounded-lg font-medium hover:opacity-90 transition-all shadow-lg shadow-blue-900/20 active:scale-95 flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                Processing...
                            </>
                        ) : (
                            "Proceed to Payment"
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentModal;
