import { useEffect } from 'react';
import { FiX, FiStar, FiInbox, FiInfo } from 'react-icons/fi';
import type { ServiceArtisan } from '../../types/services';

interface ArtisanDetailsDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    artisan: ServiceArtisan | null;
}

export default function ArtisanDetailsDrawer({
    isOpen,
    onClose,
    artisan,
}: ArtisanDetailsDrawerProps) {
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

    if (!isOpen || !artisan) return null;

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

            {/* Slide-over Drawer anchored to the right (Image 4 Left) */}
            <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 overflow-y-auto flex flex-col p-6 sm:p-8 space-y-6 animate-[slideInRight_.25s_ease-out] text-left">
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-[#F0F2F5]">
                    <h3 className="text-xl font-bold text-[#002E62]">
                        {artisan.name} Details
                    </h3>
                    <button
                        type="button"
                        onClick={onClose}
                        className="h-8 w-8 rounded-full bg-[#F2F5F8] text-[#71717A] hover:bg-[#E4E9EF] hover:text-[#002E62] flex items-center justify-center transition-colors cursor-pointer"
                        aria-label="Close details"
                    >
                        <FiX className="w-4 h-4" />
                    </button>
                </div>

                {/* Profile Card */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <img
                            src={artisan.avatarUrl || '/assets/images/charles.png'}
                            alt={artisan.name}
                            className="h-12 w-12 rounded-full object-cover border border-[#E0E8F2]"
                        />
                        <div>
                            <h4 className="text-sm font-bold text-[#18181B]">
                                {artisan.name}
                            </h4>
                            <p className="text-xs text-[#71717A] mt-0.5">
                                {artisan.profession || 'Plumber'}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-1 px-2.5 py-1 rounded-md border border-[#ABEFC6] text-xs font-semibold text-[#12B76A] bg-[#ECFDF3]">
                        <FiStar className="w-3.5 h-3.5 fill-[#12B76A]" />
                        <span>{artisan.rating?.toFixed(1) || '4.7'}</span>
                    </div>
                </div>

                {/* Stat Box: Total Request Completed */}
                <div className="border border-[#E0E8F2] rounded-xl p-4 flex items-center gap-3.5 bg-white">
                    <div className="h-10 w-10 rounded-full bg-[#F3E8FF] text-[#9333EA] flex items-center justify-center shrink-0">
                        <FiInbox className="w-5 h-5" />
                    </div>
                    <div>
                        <div className="text-base font-bold text-[#18181B] font-mono">
                            {artisan.requestCompleted}
                        </div>
                        <div className="text-xs text-[#71717A] mt-0.5">
                            Total Request Completed
                        </div>
                    </div>
                </div>

                {/* Recent Reviews Section */}
                <div className="space-y-3 pt-1">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#002E62]">
                        <FiInfo className="w-3.5 h-3.5 text-[#002E62]" />
                        <span>Recent Review</span>
                    </div>

                    <div className="space-y-3">
                        {artisan.reviews && artisan.reviews.length > 0 ? (
                            artisan.reviews.map((rev) => (
                                <div
                                    key={rev.id}
                                    className="border border-[#E0E8F2] rounded-xl p-4 space-y-2 bg-[#FDFDFE]"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="text-xs font-bold text-[#18181B]">
                                            {rev.author}{' '}
                                            <span className="font-normal text-[#71717A]">
                                                ({rev.location})
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1 px-2 py-0.5 rounded border border-[#BFDBFE] text-[11px] font-semibold text-[#2563EB] bg-[#EFF6FF]">
                                            <FiStar className="w-3 h-3 fill-[#2563EB]" />
                                            <span>{rev.rating.toFixed(1)}</span>
                                        </div>
                                    </div>

                                    <p className="text-xs text-[#52525B] leading-relaxed">
                                        {rev.comment}
                                    </p>

                                    <div className="text-[10px] text-[#A1A1AA] pt-1">
                                        <span className="font-semibold text-[#71717A]">
                                            {rev.date}
                                        </span>{' '}
                                        • Review Date
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-xs text-[#71717A] italic">
                                No customer reviews yet.
                            </p>
                        )}
                    </div>
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
