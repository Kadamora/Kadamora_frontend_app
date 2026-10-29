import { useEffect, type ReactNode } from 'react';
import { FiX } from 'react-icons/fi';

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: ReactNode;
    children: ReactNode;
    maxWidth?: string;
    showCloseButton?: boolean;
    className?: string;
}

export default function Modal({
    isOpen,
    onClose,
    title,
    children,
    maxWidth = 'max-w-[480px]',
    showCloseButton = true,
    className = '',
}: ModalProps) {
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        document.addEventListener('keydown', handleKeyDown);
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = prevOverflow;
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-5 overflow-y-auto"
            role="dialog"
            aria-modal="true"
        >
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity animate-[fadeIn_.2s_ease-out]"
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Modal Card */}
            <div
                className={`relative w-full ${maxWidth} bg-white rounded-[18px] p-6 z-10 text-left shadow-xl animate-[fadeScale_.22s_ease-out] my-auto ${className}`}
            >
                {/* Header */}
                {(title || showCloseButton) && (
                    <div className="flex items-center justify-between pb-4 border-b border-[#F0F2F5] mb-5">
                        {typeof title === 'string' ? (
                            <h3 className="text-xl font-bold text-[#093154]">{title}</h3>
                        ) : (
                            title ?? <span />
                        )}

                        {showCloseButton && (
                            <button
                                type="button"
                                onClick={onClose}
                                aria-label="Close dialog"
                                className="h-6 w-6 rounded-full bg-[#E6F1FE] border border-[#D4D4D8] text-[#71717A] hover:bg-[#E4E9EF] hover:text-[#093154] flex items-center justify-center transition-colors focus:outline-none"
                            >
                                <FiX className="h-3 w-3" />
                            </button>
                        )}
                    </div>
                )}

                {/* Body */}
                <div>{children}</div>
            </div>

            <style>{`
                @keyframes fadeScale {
                    0% { opacity: 0; transform: scale(0.96); }
                    100% { opacity: 1; transform: scale(1); }
                }
                @keyframes fadeIn {
                    0% { opacity: 0; }
                    100% { opacity: 1; }
                }
            `}</style>
        </div>
    );
}
