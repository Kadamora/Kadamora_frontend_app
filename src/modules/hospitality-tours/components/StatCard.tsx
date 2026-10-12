import React from 'react';
import { FiArrowUpRight } from 'react-icons/fi';

export type StatAccent = 'blue' | 'green' | 'sky' | 'pink' | 'amber';

export interface StatCardProps {
    title: string;
    value: string | number;
    accent?: StatAccent;
    icon?: React.ReactNode;
    iconSrc?: string;
    isPrimary?: boolean;
    onActionClick?: () => void;
    className?: string;
}

export default function StatCard({
    title,
    value,
    icon,
    iconSrc,
    isPrimary = false,
    onActionClick,
    className = '',
}: StatCardProps) {
    const renderedIcon = icon ? (
        icon
    ) : iconSrc ? (
        <img src={iconSrc} alt={title} className="w-12 h-12" />
    ) : null;

    if (isPrimary) {
        return (
            <div
                className={`relative flex flex-col justify-center bg-white p-6 sm:py-7 sm:px-5 border border-[#BED3EB] rounded-[15px] shadow-xs transition-all ${className}`}
            >
                <div className="flex items-start justify-between">
                    {renderedIcon}
                </div>
                <div className="mt-4">
                    <span className="text-sm text-[#52525B] block">
                        {title}
                    </span>
                    <h3 className="text-2xl font-semibold text-[#002E62] block">
                        {value}
                    </h3>
                </div>
                {onActionClick && (
                    <div className="absolute top-1 right-1">

                        <button
                            type="button"
                            onClick={onActionClick}
                            className="p-1.5 text-slate-300 hover:text-slate-600 rounded-lg hover:bg-slate-50 transition-colors"
                            aria-label="View details"
                        >
                            <FiArrowUpRight className="h-6 w-6" />
                        </button>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div
            className={`relative flex justify-between px-3 py-2 bg-white border border-[#BED3EB] rounded-[15px] shadow-xs transition-all ${className}`}
        >
            <div className="flex items-center gap-2">
                {renderedIcon}
                <div className="">
                    <span className="text-xs text-[#52525B] block">
                        {title}
                    </span>
                    <span className="text-xl font-semibold text-[#002E62] block">
                        {value}
                    </span>
                </div>
            </div>
            <div className="absolute top-1 right-1">
                <button
                    type="button"
                    onClick={onActionClick}
                    className="p-1 text-slate-300 hover:text-slate-500 rounded-lg transition-colors"
                    aria-label="View details"
                >
                    <FiArrowUpRight className="h-4 w-4" />
                </button>
            </div>


        </div>
    );
}
