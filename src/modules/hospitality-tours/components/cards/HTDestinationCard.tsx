import { useState } from 'react';
import { FiMapPin, FiCalendar, FiHeart } from 'react-icons/fi';
import { FaHeart, FaStar } from 'react-icons/fa';
import type { HTDestinationItem } from '../../data/hospitalityLandingData';

interface HTDestinationCardProps {
    item: HTDestinationItem;
    onClick?: () => void;
    className?: string;
}

export default function HTDestinationCard({
    item,
    onClick,
    className = '',
}: HTDestinationCardProps) {
    const [isFavorite, setIsFavorite] = useState(item.isFavorite ?? false);

    const getBadgeStyle = (variant?: string) => {
        switch (variant) {
            case 'green':
                return 'bg-[#43CC88E5] text-white';
            case 'red':
                return 'bg-[#FB2C36B2] text-white';
            case 'blue':
                return 'bg-[#2B7FFFB2] text-white';
            case 'purple':
                return 'bg-[#F6339A66] text-white';
            case 'amber':
                return 'bg-[#F59E0B] text-white';
            default:
                return 'bg-[#00D26A] text-white';
        }
    };

    return (
        <div
            onClick={onClick}
            className={`bg-white border border-[#CCE3FD] rounded-lg overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col group cursor-pointer ${className}`}
        >
            {/* Top Cover Image with Category Badge */}
            <div className="relative h-36 w-full overflow-hidden bg-slate-100">
                <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {item.categoryBadge && (
                    <div
                        className={`absolute top-3 right-3 text-[11px] px-2.5 py-0.5 rounded-lg shadow-xs ${getBadgeStyle(
                            item.badgeVariant
                        )}`}
                    >
                        {item.categoryBadge}
                    </div>
                )}
            </div>

            {/* Card Body */}
            <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                    <div className="flex items-start justify-between gap-2">
                        <h3 className="text-base font-medium text-[#091E42]  line-clamp-1">
                            {item.title}
                        </h3>
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsFavorite(!isFavorite);
                            }}
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

                    <div className="flex items-center gap-1.5 text-xs text-[#6A7282] mt-1">
                        <FiMapPin className="h-3.5 w-3.5 shrink-0 text-[#94A3B8]" />
                        <span className="truncate">{item.location}</span>
                    </div>

                    <p className="text-xs text-[#64748B] line-clamp-2 mt-2 ">
                        {item.description}
                    </p>

                    <div className="flex items-center gap-1.5 text-xs text-[#4A5565] mt-2">
                        <FiCalendar className="h-3.5 w-3.5 shrink-0 text-[#4A5565]" />
                        <span>{item.date}</span>
                    </div>
                </div>

                {/* Card Footer */}
                <div className="flex items-center justify-between pt-3 mt-3 ">
                    <div className="flex items-center gap-1 text-xs">
                        <FaStar className="h-3.5 w-3.5 text-amber-400" />
                        <span className="font-medium text-[#091E42]">{item.rating}</span>
                        <span className="text-[#64748B]">({item.reviewCount})</span>
                    </div>
                    <span className="text-xs font-semibold text-[#00A63E]">
                        {item.price}
                    </span>
                </div>
            </div>
        </div>
    );
}
