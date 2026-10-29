import { useEffect } from 'react';
import {
    FiX,
    FiUser,
    FiHome,
    FiClock,
    FiShield,
    FiInfo,
} from 'react-icons/fi';
import type { AccessControlEntry } from '../../../types/commercialFacilities';

interface EntryDetailsDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    entry: AccessControlEntry | null;
}

export default function EntryDetailsDrawer({
    isOpen,
    onClose,
    entry,
}: EntryDetailsDrawerProps) {
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        window.addEventListener('keydown', handleKeyDown);
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = prevOverflow;
        };
    }, [isOpen, onClose]);

    if (!isOpen || !entry) return null;

    const details = [
        {
            icon: FiUser,
            title: entry.visitorName,
            subtitle: "Visitor's Name",
        },
        {
            icon: FiHome,
            title: entry.unit,
            subtitle: 'Unit',
        },
        {
            icon: FiClock,
            title: entry.entryTime,
            subtitle: 'Entry Time',
        },
        {
            icon: FiClock,
            title: entry.exitTime,
            subtitle: 'Exit Time',
        },
        {
            icon: FiShield,
            title: entry.purpose,
            subtitle: 'Purpose',
        },
    ];

    return (
        <div
            className="fixed inset-0 z-50 overflow-hidden"
            role="dialog"
            aria-modal="true"
        >
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity animate-[fadeIn_.2s_ease-out]"
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Slide-over Drawer anchored to the right */}
            <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 overflow-y-auto flex flex-col p-6 sm:p-8 space-y-6 animate-[slideInRight_.25s_ease-out] text-left">
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-[#F0F2F5]">
                    <h3 className="text-xl font-bold text-[#002E62]">
                        Entry Details
                    </h3>
                    <button
                        type="button"
                        onClick={onClose}
                        className="h-8 w-8 rounded-full bg-[#F2F5F8] text-[#71717A] hover:bg-[#E4E9EF] hover:text-[#002E62] flex items-center justify-center transition-colors cursor-pointer"
                        aria-label="Close entry details"
                    >
                        <FiX className="w-4 h-4" />
                    </button>
                </div>

                {/* Entry Metadata Items */}
                <div className="space-y-5">
                    {details.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <div key={index} className="flex items-center gap-3.5">
                                <div className="h-10 w-10 rounded-full bg-[#ECFDF3] text-[#12B76A] flex items-center justify-center shrink-0 border border-[#ABEFC6]/40">
                                    <Icon className="w-5 h-5" />
                                </div>
                                <div className="min-w-0">
                                    <div className="text-sm font-bold text-[#18181B] truncate">
                                        {item.title}
                                    </div>
                                    <div className="text-xs text-[#71717A] mt-0.5">
                                        {item.subtitle}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Security Note Alert Banner */}
                <div className="bg-[#EFF8FF] border border-[#B2DDFF] rounded-xl p-4.5 space-y-1.5 text-left">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#002E62]">
                        <FiInfo className="w-4 h-4 text-[#002E62]" />
                        <span>Security Note:</span>
                    </div>
                    <p className="text-xs text-[#52525B] leading-relaxed">
                        {entry.securityNote ||
                            'Lorem ipsum dolor sit amet consectetur. Nibh odio egestas tortor lorem laoreet eu volutpat. Adipiscing odio erat ac ridiculus imperdiet.Lorem ipsum dolor sit amet consectetur.'}
                    </p>
                </div>
            </div>

            <style>{`
                @keyframes slideInRight {
                    0% { transform: translateX(100%); }
                    100% { transform: translateX(0); }
                }
                @keyframes fadeIn {
                    0% { opacity: 0; }
                    100% { opacity: 1; }
                }
            `}</style>
        </div>
    );
}
