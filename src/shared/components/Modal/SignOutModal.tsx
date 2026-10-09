import React from 'react';

interface SignOutModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const SignOutModal: React.FC<SignOutModalProps> = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop overlay */}
            <div
                className="absolute inset-0 bg-black/30 backdrop-blur-[2px] transition-opacity"
                onClick={onClose}
            />

            {/* Modal Card */}
            <div className="relative w-full max-w-[410px] bg-white rounded-[20px] p-6 sm:p-8 soverflow-hidden z-10 text-left animate-[fadeScale_.25s_ease-out]">
                {/* Icon */}
                <div className="mb-4">
                    <img
                        src="/assets/icons/signOut.svg"
                        alt="Sign Out"
                        className="w-14 h-14 object-contain"
                    />
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-[#002E62] mb-3">Sign Out</h3>

                {/* Description */}
                <p className="text-[#52525B] text-sm leading-relaxed mb-6">
                    By logging out, you will need to sign in again to access your account. If you are ready to proceed, click &quot;Yes&quot; to log out.
                </p>

                {/* Action Buttons */}
                <div className="flex items-center gap-4">
                    <button
                        type="button"
                        onClick={onConfirm}
                        className="bg-[#093154] hover:bg-[#072440] text-white font-semibold text-base rounded-xl px-8 py-2.5 transition-colors cursor-pointer min-w-[90px] shadow-xs"
                    >
                        Yes
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="border border-[#093154] hover:bg-slate-50 text-[#093154] font-semibold text-base rounded-xl px-8 py-2.5 transition-colors cursor-pointer min-w-[90px]"
                    >
                        No
                    </button>
                </div>
            </div>

            <style>{`
                @keyframes fadeScale {
                    0% { opacity: 0; transform: scale(0.95); }
                    100% { opacity: 1; transform: scale(1); }
                }
            `}</style>
        </div>
    );
};

export default SignOutModal;
