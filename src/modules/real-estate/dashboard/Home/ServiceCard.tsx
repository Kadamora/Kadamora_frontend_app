import React from 'react';
import { Link } from 'react-router';
import type { ServiceItem } from './service';

interface Props {
    item: ServiceItem;
}

export const ServiceCard: React.FC<Props> = ({ item }) => {
    const isLocked = !item.active;
    const canNavigate = !isLocked && Boolean(item.url);

    const cardClasses = `group relative flex flex-col justify-between rounded-2xl border bg-white p-6 md:p-7 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 ${
        isLocked
            ? 'border-[#E4E7EC] bg-[#FAFCFF]/80 cursor-default shadow-xs'
            : 'border-[#E4E7EC] hover:border-emerald-500 hover:shadow-lg hover:-translate-y-1 cursor-pointer bg-white'
    }`;

    const cardContent = (
        <div className="flex flex-col h-full justify-between">
            {/* Top Row: Icon + Badge */}
            <div>
                <div className="flex items-center justify-between mb-5">
                    <div
                        className={`h-16 w-16 rounded-2xl flex items-center justify-center p-3 transition-transform duration-300 ${
                            isLocked ? 'bg-gray-100/80 grayscale' : 'bg-emerald-50/70 group-hover:scale-105'
                        }`}
                    >
                        <img
                            src={item.icon}
                            alt={item.title}
                            className="h-full w-full object-contain"
                            loading="lazy"
                        />
                    </div>

                    {/* Status Pill */}
                    {item.active ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/80">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            {item.badge || 'Available'}
                        </span>
                    ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-500 border border-gray-200">
                            <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            {item.badge || 'Coming Soon'}
                        </span>
                    )}
                </div>

                {/* Category tag */}
                {item.category && (
                    <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5 block">
                        {item.category}
                    </span>
                )}

                {/* Title */}
                <h3 className={`text-lg md:text-xl font-bold leading-snug mb-2.5 transition-colors ${
                    isLocked ? 'text-gray-500' : 'text-[#002E62] group-hover:text-emerald-700'
                }`}>
                    {item.title}
                </h3>

                {/* Description */}
                <p className={`text-sm leading-relaxed ${isLocked ? 'text-gray-400' : 'text-gray-600'}`}>
                    {item.description}
                </p>
            </div>

            {/* Bottom Row: Action CTA */}
            <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                {item.active ? (
                    <>
                        <span className="text-sm font-semibold text-emerald-600 group-hover:text-emerald-700 transition-colors">
                            {item.ctaText || 'Launch Service'}
                        </span>
                        <div className="h-8 w-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center transition-all duration-300 group-hover:bg-emerald-600 group-hover:text-white group-hover:translate-x-1">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    </>
                ) : (
                    <div className="flex items-center gap-2 text-xs font-medium text-gray-400">
                        <span>Under Active Development</span>
                    </div>
                )}
            </div>
        </div>
    );

    if (canNavigate && item.url) {
        return (
            <Link
                to={item.url}
                aria-label={item.title}
                className={cardClasses}
            >
                {cardContent}
            </Link>
        );
    }

    return (
        <div aria-label={item.title} aria-disabled="true" className={cardClasses}>
            {cardContent}
        </div>
    );
};

export default ServiceCard;
