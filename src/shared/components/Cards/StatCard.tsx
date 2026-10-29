import React from 'react';
import { FiArrowUpRight } from 'react-icons/fi';

export type StatAccent = 'blue' | 'green' | 'sky' | 'pink' | 'amber';

export interface StatCardProps {
    title: string;
    value: string | number;
    /**
     * Tint used for the icon bubble. Only applied when `icon` (a ReactNode) is passed;
     * `iconSrc` images are rendered as-is because they ship with their own colours.
     */
    accent?: StatAccent;
    icon?: React.ReactNode;
    iconSrc?: string;
    isPrimary?: boolean;
    onActionClick?: () => void;
    className?: string;
    /** `compact` is the original dense card, `comfortable` has roomier padding. */
    variant?: 'compact' | 'comfortable';
}

const ACCENT_STYLES: Record<StatAccent, string> = {
    blue: 'bg-[#E8F1FD] text-[#2563EB]',
    green: 'bg-[#E6F6EE] text-[#12B76A]',
    sky: 'bg-[#E6F4FB] text-[#0EA5E9]',
    pink: 'bg-[#FDECF3] text-[#EC4899]',
    amber: 'bg-[#FFF4DB] text-[#F59E0B]',
};

export default function StatCard({
    title,
    value,
    accent,
    icon,
    iconSrc,
    isPrimary = false,
    onActionClick,
    className = '',
    variant = 'compact',
}: StatCardProps) {
    const renderedIcon = icon ? (
        accent ? (
            <span
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${ACCENT_STYLES[accent]}`}
            >
                {icon}
            </span>
        ) : (
            icon
        )
    ) : iconSrc ? (
        <img src={iconSrc} alt={title} className="w-11 h-11 object-contain shrink-0" />
    ) : null;

    const handleKeyDown = onActionClick
        ? (e: React.KeyboardEvent<HTMLDivElement>) => {
              if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onActionClick();
              }
          }
        : undefined;

    const interactiveClasses = onActionClick
        ? 'cursor-pointer group hover:shadow-md hover:border-[#9FBEDC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#002E62]'
        : '';

    if (isPrimary) {
        return (
            <div
                onClick={onActionClick}
                onKeyDown={handleKeyDown}
                role={onActionClick ? 'button' : undefined}
                tabIndex={onActionClick ? 0 : undefined}
                aria-label={onActionClick ? `${title}, ${value}` : undefined}
                className={`relative flex flex-col justify-center bg-white p-6 sm:py-7 sm:px-5 border border-[#BED3EB] rounded-lg shadow-xs transition-all ${interactiveClasses} ${className}`}
            >
                <div className="flex items-start justify-between">{renderedIcon}</div>
                <div className="mt-4">
                    <span className="text-sm text-[#52525B] block">{title}</span>
                    <h3 className="text-2xl font-semibold text-[#002E62] block">{value}</h3>
                </div>
                {onActionClick && (
                    <div
                        className="absolute top-1 right-1 p-1.5 text-slate-300 group-hover:text-slate-600 rounded-lg transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden="true"
                    >
                        <FiArrowUpRight className="h-6 w-6" />
                    </div>
                )}
            </div>
        );
    }

    const padding = variant === 'comfortable' ? 'px-5 py-4' : 'px-3 py-2';

    return (
        <div
            onClick={onActionClick}
            onKeyDown={handleKeyDown}
            role={onActionClick ? 'button' : undefined}
            tabIndex={onActionClick ? 0 : undefined}
            aria-label={onActionClick ? `${title}, ${value}` : undefined}
            className={`relative flex justify-between ${padding} bg-white border border-[#BED3EB] rounded-lg shadow-xs transition-all ${interactiveClasses} ${className}`}
        >
            <div className="flex items-center gap-3">
                {renderedIcon}
                <div>
                    <span className="text-xs text-[#52525B] block">{title}</span>
                    <span className="text-xl font-semibold text-[#002E62] block">{value}</span>
                </div>
            </div>
            {onActionClick && (
                <div
                    className="absolute top-1 right-1 p-1 text-[#78899D] group-hover:text-slate-500 rounded-lg transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                >
                    <FiArrowUpRight className="h-4 w-4" />
                </div>
            )}
        </div>
    );
}
