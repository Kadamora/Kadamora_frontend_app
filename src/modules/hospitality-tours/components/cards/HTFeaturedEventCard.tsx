import { useState } from 'react';
import { FiMapPin, FiCalendar, FiClock, FiUsers, FiHeart } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import type { HTFeaturedEventItem } from '../../data/hospitalityLandingData';

interface HTFeaturedEventCardProps {
    event: HTFeaturedEventItem;
    onViewDetails?: () => void;
    className?: string;
}

export default function HTFeaturedEventCard({
    event,
    onViewDetails,
    className = '',
}: HTFeaturedEventCardProps) {
    const [isFavorite, setIsFavorite] = useState(event.isFavorite ?? false);

    return (
        <div
            className={`bg-white border border-[#CCE3FD] rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row group ${className}`}
        >
            {/* Left Cover Image */}
            <div className="relative w-full sm:w-52 md:w-56 h-48 sm:h-auto shrink-0 overflow-hidden bg-slate-100">
                <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-[#E7000B] text-white text-[11px] px-2 py-0.5 rounded shadow-xs tracking-wide">
                    Featured
                </div>
            </div>

            {/* Right Content */}
            <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                <div>
                    <div className="flex items-start justify-between gap-2">
                        <h3 className="text-base font-semibold text-[#091E42]">
                            {event.title}
                        </h3>
                        <button
                            type="button"
                            onClick={() => setIsFavorite(!isFavorite)}
                            className="p-1 text-red-500 hover:scale-110 transition-transform cursor-pointer"
                            aria-label="Save to favorites"
                        >
                            {isFavorite ? (
                                <FaHeart className="h-4 w-4 text-[#EF4444]" />
                            ) : (
                                <FiHeart className="h-4 w-4 text-[#EF4444]" />
                            )}
                        </button>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-[#4A5565] mt-1.5">
                        <FiMapPin className="h-3.5 w-3.5 shrink-0 " />
                        <span>{event.location}</span>
                    </div>

                    <div className="space-y-1.5 mt-3 text-xs text-[#4A5565]">
                        <div className="flex items-center gap-2">
                            <FiCalendar className="h-3.5 w-3.5 shrink-0 " />
                            <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FiClock className="h-3.5 w-3.5 shrink-0 " />
                            <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FiUsers className="h-3.5 w-3.5 shrink-0 " />
                            <span>{event.expectedAttendees}</span>
                        </div>
                    </div>
                </div>

                {/* View Details Button */}
                <div className="pt-4 mt-2">
                    <button
                        type="button"
                        onClick={onViewDetails}
                        className="w-full sm:w-auto bg-[#00A63E] hover:bg-[#00B85C] text-white px-5 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer"
                    >
                        View Details
                    </button>
                    
                </div>
            </div>
        </div>
    );
}
