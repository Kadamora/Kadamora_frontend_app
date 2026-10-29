import React from 'react';
import Button from '../Button';

interface DeleteConfirmationModalProps {
    isOpen: boolean;
    title?: string;
    message?: string;
    onConfirm: () => void;
    onClose: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
    isOpen,
    title = 'Delete Property',
    message,
    onConfirm,
    onClose,
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6">
            <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" onClick={onClose} />

            <div className="relative w-full sm:max-w-[450px] max-w-[100vw] bg-white backdrop-blur-sm rounded-[18px] shadow-[0_8px_40px_-4px_rgba(16,24,40,0.15)] overflow-hidden animate-[fadeScale_.35s_ease]">
                <div className="px-7 pt-10 pb-10">
                    <div className="mb-3 flex flex-col justify-center">
                        <img
                            src="/assets/icons/delete.svg"
                            alt="delete"
                            className="w-[90px] h-[90px] object-contain drop-shadow-sm animate-[popIn_.55s_cubic-bezier(.4,0,.2,1)_both,softFloat_5.5s_ease-in-out_1s_infinite]"
                            loading="lazy"
                        />
                    </div>
                    <h3 className="text-[20px] font-semibold text-[#002E62] tracking-tight mb-1">{title}</h3>
                    <p className="leading-relaxed text-[#52525B] mb-6 text-sm">
                        {message ??
                            'Are you sure you want to delete this property? This action is permanent and cannot be undone.'}
                    </p>
                    <div className="flex items-center gap-3">
                        <Button
                            onClick={onConfirm}
                        >
                            Yes
                        </Button>
                        <Button
                            onClick={onClose}
                            variant='reject'
                            className='border border-[#004493]'
                        >
                            No
                        </Button>
                       
                    </div>
                </div>
                <style>{`
@keyframes popIn {0%{opacity:0;transform:scale(.6) translateY(12px) rotate(-8deg);}60%{opacity:1;transform:scale(1.05) translateY(-4px) rotate(2deg);}100%{opacity:1;transform:scale(1) translateY(0) rotate(0);} }
@keyframes softFloat {0%{transform:translateY(0)}50%{transform:translateY(-8px)}100%{transform:translateY(0)} }
@keyframes fadeScale_ {0%{opacity:0;transform:scale(.97) translateY(6px);}100%{opacity:1;transform:scale(1) translateY(0);} }
                `}</style>
            </div>
        </div>
    );
};

export default DeleteConfirmationModal;
