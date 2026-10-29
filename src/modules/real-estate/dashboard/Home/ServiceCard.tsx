import React from 'react';
import { Link } from 'react-router';
import type { ServiceItem } from './service';

interface Props {
    item: ServiceItem;
}

export const ServiceCard: React.FC<Props> = ({ item }) => {
    const isLocked = !item.active;
    const canNavigate = !isLocked && Boolean(item.url);

    const cardClasses = `group relative flex flex-col justify-between overflow-hidden rounded-xl border p-4 md:p-5 min-h-[160px] transition-all duration-300 text-left ${
        isLocked
            ? 'border-[#E5E7EB] bg-[#F8FAFC] cursor-default select-none'
            : 'border-[#E2E8F0] bg-white hover:border-[#CBD5E1] hover:shadow-md hover:-translate-y-0.5 cursor-pointer'
    }`;

    const cardContent = (
        <>
            {/* Background Watermark Illustration */}
            <div
                aria-hidden="true"
                className={`pointer-events-none absolute -right-3 -bottom-6 h-40 w-40 select-none transition-all duration-300 ${
                    isLocked
                        ? 'opacity-[0.04] grayscale'
                        : 'opacity-[0.06] group-hover:opacity-[0.12] group-hover:scale-105'
                }`}
            >
                <img
                    src={item.icon}
                    alt=""
                    className="h-full w-full object-contain"
                    loading="lazy"
                />
            </div>

            {/* Top Row: Icon + Indicator (Arrow or Padlock) */}
            <div className="relative z-10 flex items-start justify-between">
                <img
                    src={item.icon}
                    alt={item.title}
                    className={`h-13 w-13 sm:h-14 sm:w-14 object-contain transition-all duration-300 ${
                        isLocked ? 'grayscale opacity-60' : 'group-hover:scale-105'
                    }`}
                    loading="lazy"
                />

                {isLocked ? (
                    <div
                        className="text-gray-400 p-0.5"
                        title="Coming Soon"
                        aria-label="Coming Soon"
                    >
                        <svg
                            className="w-5 h-5 sm:w-5.5 sm:h-5.5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={1.8}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                        >
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                    </div>
                ) : (
                    <div className="text-[#93A8C1] transition-all duration-300 group-hover:text-[#002E62] group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                        <svg
                            className="w-5 h-5 sm:w-6 sm:h-6"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={1.6}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                        >
                            <path d="M7 17L17 7" />
                            <path d="M7 7h10v10" />
                        </svg>
                    </div>
                )}
            </div>

            {/* Bottom Content: Title + Description */}
            <div className="relative z-10 mt-2">
                <h3
                    className={`text-lg md:text-[19px] font-bold leading-snug tracking-tight transition-colors ${
                        isLocked ? 'text-gray-500' : 'text-[#002E62]'
                    }`}
                >
                    {item.title}
                </h3>
                <p
                    className={` text-xs sm:text-[13px] md:text-sm leading-relaxed ${
                        isLocked ? 'text-gray-400' : 'text-[#64748B]'
                    }`}
                >
                    {item.description}
                </p>
            </div>
        </>
    );

    if (canNavigate && item.url) {
        return (
            <Link to={item.url} aria-label={item.title} className={cardClasses}>
                {cardContent}
            </Link>
        );
    }

    return (
        <div aria-label={item.title} className={cardClasses}>
            {cardContent}
        </div>
    );
};

export default ServiceCard;

