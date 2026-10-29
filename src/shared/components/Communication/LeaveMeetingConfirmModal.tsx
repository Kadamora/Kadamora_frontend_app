import { FiX } from 'react-icons/fi';

export interface LeaveMeetingConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirmLeave: () => void;
}

export default function LeaveMeetingConfirmModal({
    isOpen,
    onClose,
    onConfirmLeave,
}: LeaveMeetingConfirmModalProps) {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-60 flex items-center justify-center p-4 overflow-y-auto"
            role="dialog"
            aria-modal="true"
        >
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity animate-fade-in"
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Modal Card (Image 2) */}
            <div className="relative w-full max-w-[360px] sm:max-w-[380px] bg-white rounded-[24px] p-6 sm:p-8 z-10 text-center shadow-2xl animate-scale-in">
                {/* Close Button X */}
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                    aria-label="Close"
                >
                    <FiX className="h-4 w-4 stroke-[2.5]" />
                </button>

                {/* Dual-Tone Info Icon (Image 2) */}
                <div className="w-16 h-16 mx-auto flex items-center justify-center">
                    <svg
                        className="w-14 h-14"
                        viewBox="0 0 60 60"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {/* Navy Arc (Top/Right) */}
                        <path
                            d="M30 6C43.2548 6 54 16.7452 54 30C54 36.6274 51.3137 42.6274 46.9706 46.9706"
                            stroke="#002E62"
                            strokeWidth="4"
                            strokeLinecap="round"
                        />
                        {/* Green Arc (Bottom/Left) */}
                        <path
                            d="M46.9706 46.9706C42.6274 51.3137 36.6274 54 30 54C16.7452 54 6 43.2548 6 30C6 16.7452 16.7452 6 30 6"
                            stroke="#12B76A"
                            strokeWidth="4"
                            strokeLinecap="round"
                        />
                        {/* 'i' dot */}
                        <circle cx="30" cy="22" r="3" fill="#002E62" />
                        {/* 'i' vertical stem */}
                        <rect x="27.5" y="28" width="5" height="15" rx="2.5" fill="#002E62" />
                    </svg>
                </div>

                {/* Title */}
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-4 leading-snug max-w-[240px] mx-auto">
                    Are you sure you want to leave the meeting ?
                </h3>

                {/* Action Buttons */}
                <div className="flex items-center justify-center gap-4 mt-6">
                    <button
                        type="button"
                        onClick={onClose}
                        className="w-28 py-2.5 bg-white hover:bg-emerald-50/50 border border-[#12B76A] text-[#12B76A] font-bold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer"
                    >
                        No
                    </button>

                    <button
                        type="button"
                        onClick={() => {
                            onClose();
                            onConfirmLeave();
                        }}
                        className="w-28 py-2.5 bg-[#12B76A] hover:bg-[#0EA25B] text-white font-bold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer shadow-xs"
                    >
                        Yes
                    </button>
                </div>
            </div>
        </div>
    );
}
