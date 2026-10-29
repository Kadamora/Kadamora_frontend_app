import Modal from '../Modal/Modal';

export interface DeleteChatModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export default function DeleteChatModal({
    isOpen,
    onClose,
    onConfirm,
}: DeleteChatModalProps) {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            showCloseButton={false}
            maxWidth="max-w-[420px]"
            className="p-8 text-center"
        >
            <div className="flex flex-col items-center">
                {/* Delete Chat Icon Graphic (Image 3) */}
                <div className="relative w-28 h-28 flex items-center justify-center">
                    <svg
                        className="w-24 h-24"
                        viewBox="0 0 100 100"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {/* Decorative background sparks */}
                        <circle cx="25" cy="28" r="1" fill="#475467" />
                        <circle cx="78" cy="30" r="1" fill="#475467" />
                        <line x1="26" y1="32" x2="29" y2="35" stroke="#E11D48" strokeWidth="1" strokeLinecap="round" />
                        <line x1="72" y1="28" x2="75" y2="31" stroke="#E11D48" strokeWidth="1" strokeLinecap="round" />
                        
                        {/* Outer circular frame */}
                        <circle cx="50" cy="46" r="26" stroke="#002E62" strokeWidth="2.5" />
                        
                        {/* Concentric inner magenta/red circle */}
                        <circle cx="50" cy="46" r="21" stroke="#E11D48" strokeWidth="1.5" strokeDasharray="3 2" />
                        <circle cx="50" cy="46" r="17" stroke="#E11D48" strokeWidth="2" />
                        
                        {/* Inner Red 'X' icon */}
                        <path
                            d="M44 40L56 52M56 40L44 52"
                            stroke="#E11D48"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                        />
                        
                        {/* Platform / shadow line at bottom */}
                        <line x1="26" y1="74" x2="74" y2="74" stroke="#002E62" strokeWidth="2" strokeLinecap="round" />
                        <line x1="34" y1="77" x2="66" y2="77" stroke="#E11D48" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-[#002E62] mt-3">
                    Delete Chat
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#475467] max-w-[280px] mx-auto mt-2 leading-relaxed">
                    Are you sure you want to delete this chat ? This action is permanent and cannot be undone.
                </p>

                {/* Action Buttons */}
                <div className="flex items-center justify-center gap-4 mt-6 w-full">
                    <button
                        type="button"
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                        className="w-28 py-2.5 bg-[#002E62] hover:bg-[#072440] text-white font-bold text-xs sm:text-sm rounded-lg transition-colors cursor-pointer shadow-xs"
                    >
                        Yes
                    </button>

                    <button
                        type="button"
                        onClick={onClose}
                        className="w-28 py-2.5 bg-white hover:bg-slate-50 border border-[#002E62] text-[#002E62] font-bold text-xs sm:text-sm rounded-lg transition-colors cursor-pointer"
                    >
                        No
                    </button>
                </div>
            </div>
        </Modal>
    );
}
