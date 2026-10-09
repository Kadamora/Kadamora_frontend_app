
interface HTDeleteListingModalProps {
    isOpen: boolean;
    listingTitle: string;
    onClose: () => void;
    onConfirm: () => void;
}

export default function HTDeleteListingModal({
    isOpen,
    listingTitle,
    onClose,
    onConfirm,
}: HTDeleteListingModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
            {/* Backdrop click dismiss */}
            <div className="absolute inset-0" onClick={onClose} />

            {/* Modal Dialog Card */}
            <div className="relative z-10 w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 border border-slate-100">
                {/* Header Illustration Icon */}
                <div className="flex justify-center">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-emerald-400/30 bg-emerald-50/50 flex items-center justify-center relative p-3">
                        {/* Custom Teal Ring Cross Mark matching Screenshot 4 */}
                        <div className="w-full h-full rounded-full border-2 border-teal-500 flex items-center justify-center relative">
                            <span className="text-teal-500 font-bold text-xl sm:text-2xl">✕</span>
                            {/* Decorative dashes */}
                            <span className="absolute -top-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-teal-400" />
                            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-teal-400" />
                            <span className="absolute top-1/2 -left-2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-teal-400" />
                            <span className="absolute top-1/2 -right-2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-teal-400" />
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="space-y-2">
                    <h3 className="text-xl sm:text-2xl font-extrabold text-[#002E62]">
                        Delete Listing
                    </h3>
                    <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed">
                        Are you sure you want to delete <strong className="text-[#101828] font-bold">{listingTitle}</strong>? This action is permanent and cannot be undone.
                    </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 pt-2">
                    <button
                        type="button"
                        onClick={onConfirm}
                        className="px-6 py-2.5 sm:py-3 rounded-lg bg-[#002E62] hover:bg-[#072440] text-white text-xs sm:text-sm font-semibold transition-colors shadow-2xs cursor-pointer min-w-[90px]"
                    >
                        Yes
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-2.5 sm:py-3 rounded-lg bg-white border border-[#002E62] text-[#002E62] hover:bg-slate-50 text-xs sm:text-sm font-semibold transition-colors shadow-2xs cursor-pointer min-w-[90px]"
                    >
                        No
                    </button>
                </div>
            </div>
        </div>
    );
}
