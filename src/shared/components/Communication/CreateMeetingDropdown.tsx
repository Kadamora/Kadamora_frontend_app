import { useState, useRef, useEffect } from 'react';
import { FiClock, FiVideo } from 'react-icons/fi';

export interface CreateMeetingDropdownProps {
    onScheduleLater?: () => void;
    onInstantMeeting?: () => void;
    className?: string;
}

export default function CreateMeetingDropdown({
    onScheduleLater,
    onInstantMeeting,
    className = '',
}: CreateMeetingDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target as Node)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className={`relative inline-block ${className}`} ref={dropdownRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="px-5 py-2.5 bg-[#002E62] hover:bg-[#072440] text-white font-bold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer shadow-xs flex items-center gap-2"
            >
                <span>Create Meeting</span>
            </button>

            {isOpen && (
                <div className="absolute right-0 top-full mt-2 w-60 bg-white rounded-2xl shadow-xl border border-[#E2E8F0] py-2 z-50 animate-scale-in">
                    <button
                        type="button"
                        onClick={() => {
                            setIsOpen(false);
                            onScheduleLater?.();
                        }}
                        className="w-full px-4 py-2.5 text-left text-xs sm:text-sm font-medium text-[#1E293B] hover:bg-[#F8FAFC] flex items-center gap-3 transition-colors cursor-pointer"
                    >
                        <FiClock className="h-4 w-4 text-[#64748B] shrink-0" />
                        <span>Schedule Meeting for Later</span>
                    </button>

                    <button
                        type="button"
                        onClick={() => {
                            setIsOpen(false);
                            onInstantMeeting?.();
                        }}
                        className="w-full px-4 py-2.5 text-left text-xs sm:text-sm font-medium text-[#1E293B] hover:bg-[#F8FAFC] flex items-center gap-3 transition-colors cursor-pointer"
                    >
                        <FiVideo className="h-4 w-4 text-[#64748B] shrink-0" />
                        <span>Instant Meeting</span>
                    </button>
                </div>
            )}
        </div>
    );
}
