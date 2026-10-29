import Modal from '@shared/components/Modal/Modal';

interface DeleteListingModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    propertyTitle?: string;
}

export default function DeleteListingModal({
    isOpen,
    onClose,
    onConfirm,
    propertyTitle,
}: DeleteListingModalProps) {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            showCloseButton={false}
            maxWidth="max-w-[420px]"
            className="p-8 sm:p-10 text-center"
        >
            <div className="flex flex-col items-center justify-center space-y-5">
                {/* Custom Delete Icon matching Image 5 */}
                <div className="relative w-24 h-24 flex items-center justify-center">
                    {/* SVG graphic of teal concentric circles with (X) and sparkles */}
                    <svg
                        viewBox="0 0 100 100"
                        className="w-full h-full"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {/* Sparkles around */}
                        <circle cx="20" cy="28" r="1" fill="#00D2A0" />
                        <circle cx="28" cy="20" r="1.5" fill="#00D2A0" />
                        <circle cx="80" cy="30" r="1" fill="#00D2A0" />
                        <line x1="17" y1="36" x2="21" y2="34" stroke="#00D2A0" strokeWidth="1.2" strokeLinecap="round" />
                        <line x1="82" y1="23" x2="84" y2="27" stroke="#00D2A0" strokeWidth="1.2" strokeLinecap="round" />

                        {/* Outer circular dashed/dotted ring */}
                        <circle cx="50" cy="50" r="38" stroke="#00A78E" strokeWidth="1.8" strokeDasharray="3 3" opacity="0.4" />

                        {/* Outer concentric solid ring */}
                        <circle cx="50" cy="50" r="33" stroke="#009688" strokeWidth="2.5" />

                        {/* Inner concentric ring */}
                        <circle cx="50" cy="50" r="27" stroke="#00D2A0" strokeWidth="2.5" />

                        {/* Centered cross icon */}
                        <path
                            d="M40 40 L60 60 M60 40 L40 60"
                            stroke="#00D2A0"
                            strokeWidth="3.2"
                            strokeLinecap="round"
                        />

                        {/* Shadow oval below */}
                        <ellipse cx="50" cy="90" rx="20" ry="2" fill="#00D2A0" opacity="0.3" />
                    </svg>
                </div>

                {/* Title */}
                <div className="space-y-2">
                    <h3 className="text-xl font-bold text-[#002E62]">
                        Delete Listing
                    </h3>
                    <p className="text-xs sm:text-sm text-[#71717A] leading-relaxed max-w-[280px] mx-auto">
                        Are you sure you want to delete {propertyTitle ? `"${propertyTitle}"` : 'this property'}? This action is permanent and cannot be undone.
                    </p>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-center gap-3.5 pt-2 w-full">
                    <button
                        type="button"
                        onClick={onConfirm}
                        className="flex-1 bg-[#002E62] hover:bg-[#002047] text-white py-2.5 px-6 rounded-lg text-xs font-semibold transition-colors cursor-pointer shadow-xs"
                    >
                        Yes
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 bg-white hover:bg-slate-50 border border-[#002E62] text-[#002E62] py-2.5 px-6 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                    >
                        No
                    </button>
                </div>
            </div>
        </Modal>
    );
}
