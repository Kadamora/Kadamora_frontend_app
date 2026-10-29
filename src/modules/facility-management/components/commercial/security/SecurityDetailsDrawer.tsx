import { useEffect } from 'react';
import { FiX, FiVideo, FiArrowUpRight, FiEdit3 } from 'react-icons/fi';
import type {
    SecuritySystem,
    SecurityVideoRecording,
} from '../../../types/commercialFacilities';

interface SecurityDetailsDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    system: SecuritySystem | null;
    onEditDetails: (system: SecuritySystem) => void;
    onPlayRecording: (system: SecuritySystem, recording: SecurityVideoRecording) => void;
}

export default function SecurityDetailsDrawer({
    isOpen,
    onClose,
    system,
    onEditDetails,
    onPlayRecording,
}: SecurityDetailsDrawerProps) {
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

    if (!isOpen || !system) return null;

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
            <div className="fixed top-0 right-0 h-full w-full max-w-xl bg-white shadow-2xl z-50 overflow-y-auto flex flex-col p-6 sm:p-8 space-y-6 animate-[slideInRight_.25s_ease-out] text-left">
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-[#F0F2F5]">
                    <h3 className="text-xl font-bold text-[#002E62]">
                        {system.id} Details
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

                {/* Camera Image Banner */}
                <div
                    onClick={() => {
                        const firstCapture = system.captures[0] || {
                            id: 'live',
                            fileName: `${system.id} Live Stream`,
                            timestamp: 'Live Feed',
                            duration: '15:28',
                        };
                        onPlayRecording(system, firstCapture);
                    }}
                    className="group relative h-52 sm:h-56 w-full rounded-xl overflow-hidden border border-[#E0E8F2] bg-[#F4F6F9] cursor-pointer shadow-xs shrink-0"
                >
                    <img
                        src={system.imageUrl}
                        alt={system.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Badge top-left */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-full shadow-xs">
                        <FiVideo className="w-3.5 h-3.5 text-[#002E62]" />
                        <span className="text-[11px] font-bold text-[#002E62]">
                            {system.id}
                        </span>
                    </div>

                    {/* Live dot top-right */}
                    <div className="absolute top-3 right-3 flex items-center gap-1.5">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#12B76A] opacity-75" />
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#12B76A]" />
                        </span>
                    </div>

                    {/* Hover text */}
                    <div className="absolute inset-0 bg-[#002E62]/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold">
                        Click to Play Stream
                    </div>
                </div>

                {/* System Title & Status Pill */}
                <div className="flex items-center justify-between">
                    <h4 className="text-lg font-bold text-[#002E62]">
                        {system.name}
                    </h4>
                    <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                            system.status === 'Online'
                                ? 'bg-[#ECFDF3] text-[#12B76A] border border-[#ABEFC6]'
                                : system.status === 'Maintenance'
                                ? 'bg-[#FEF3F2] text-[#F04438] border border-[#FECDCA]'
                                : 'bg-[#F4F4F5] text-[#71717A] border border-[#E4E4E7]'
                        }`}
                    >
                        {system.status}
                    </span>
                </div>

                {/* System Details Card */}
                <div className="border border-[#E0E8F2] rounded-xl p-4 bg-white space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-[#F0F2F5]">
                        <h5 className="text-xs font-bold text-[#002E62]">
                            System Details
                        </h5>
                        <button
                            type="button"
                            onClick={() => onEditDetails(system)}
                            className="flex items-center gap-1 text-xs font-semibold text-[#002E62] border border-[#BED3EB] rounded-md px-2.5 py-1 hover:bg-[#F4F6F9] transition-colors cursor-pointer"
                        >
                            <FiEdit3 className="w-3 h-3" />
                            <span>Edit Details</span>
                        </button>
                    </div>

                    <div className="space-y-2.5 text-xs">
                        <div className="flex items-center">
                            <span className="w-36 text-[#71717A] font-medium">Type:</span>
                            <span className="font-semibold text-[#18181B]">{system.type}</span>
                        </div>
                        <div className="flex items-center">
                            <span className="w-36 text-[#71717A] font-medium">Resolution:</span>
                            <span className="font-semibold text-[#18181B] uppercase">{system.resolution}</span>
                        </div>
                        <div className="flex items-center">
                            <span className="w-36 text-[#71717A] font-medium">Attached Property:</span>
                            <span className="font-semibold text-[#18181B]">{system.property}</span>
                        </div>
                        <div className="flex items-center">
                            <span className="w-36 text-[#71717A] font-medium">Location:</span>
                            <span className="font-semibold text-[#18181B]">{system.location}</span>
                        </div>
                    </div>
                </div>

                {/* Capture History Section */}
                <div className="space-y-2">
                    <h5 className="text-xs font-bold text-[#002E62]">
                        Capture History
                    </h5>
                    <div className="border border-[#E0E8F2] rounded-xl divide-y divide-[#F0F2F5] overflow-hidden">
                        {system.captures.map((cap) => (
                            <button
                                key={cap.id}
                                type="button"
                                onClick={() => onPlayRecording(system, cap)}
                                className="w-full flex items-center justify-between px-3.5 py-2.5 text-left hover:bg-[#F9FAFC] transition-colors cursor-pointer group"
                            >
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-mono font-medium text-[#18181B] group-hover:text-[#002E62]">
                                        {cap.fileName}
                                    </span>
                                </div>
                                <FiArrowUpRight className="w-4 h-4 text-[#71717A] group-hover:text-[#002E62] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                            </button>
                        ))}
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
