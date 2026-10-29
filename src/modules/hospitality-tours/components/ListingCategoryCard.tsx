import React from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { LuCalendar, LuTrees, LuBuilding2, LuPalette } from 'react-icons/lu';

export type CategoryAccent = 'purple' | 'blue' | 'sky' | 'pink' | 'green';

export interface ListingCategoryCardProps {
    id?: string;
    title: string;
    description: string;
    accent?: CategoryAccent;
    icon?: React.ReactNode;
    iconSrc?: string;
    onClick?: () => void;
    className?: string;
}

const CATEGORY_STYLES: Record<CategoryAccent, { iconBg: string; text: string }> = {
    purple: { iconBg: 'bg-[#F3E8FF]', text: 'text-[#9333EA]' },
    blue: { iconBg: 'bg-[#E0F2FE]', text: 'text-[#0284C7]' },
    sky: { iconBg: 'bg-[#E0F2FE]', text: 'text-[#0284C7]' },
    pink: { iconBg: 'bg-[#FCE7F3]', text: 'text-[#DB2777]' },
    green: { iconBg: 'bg-[#DCFCE7]', text: 'text-[#16A34A]' },
};

const DEFAULT_CATEGORY_ICONS: Record<string, React.ReactNode> = {
    'cities & destinations': <LuCalendar className="h-5 w-5" />,
    'events & festival': <LuCalendar className="h-5 w-5" />,
    'park & nature': <LuTrees className="h-5 w-5" />,
    'hotel & resorts': <LuBuilding2 className="h-5 w-5" />,
    'arts & culture': <LuPalette className="h-5 w-5" />,
};

export default function ListingCategoryCard({
    title,
    description,
    accent = 'purple',
    icon,
    iconSrc,
    onClick,
    className = '',
}: ListingCategoryCardProps) {
    const style = CATEGORY_STYLES[accent] ?? CATEGORY_STYLES.purple;
    const keyLower = title.toLowerCase();

    const renderedIconNode = iconSrc ? (
        <img
            src={iconSrc}
            alt={title}
            className="w-[50px] h-[50px] object-contain transition-transform group-hover:scale-105"
        />
    ) : icon ? (
        <div className={`p-3 rounded-full ${style.iconBg} ${style.text} transition-transform group-hover:scale-105`}>
            {icon}
        </div>
    ) : (
        <div className={`p-3 rounded-full ${style.iconBg} ${style.text} transition-transform group-hover:scale-105`}>
            {DEFAULT_CATEGORY_ICONS[keyLower] ?? <LuCalendar className="h-5 w-5" />}
        </div>
    );

    return (
        <div
            onClick={onClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') onClick?.();
            }}
            className={`group relative flex flex-col justify-start py-4 px-5 bg-white border border-[#E4E4E7] rounded-[15px] hover:border-[#CBD5E1] transition-all cursor-pointer select-none ${className}`}
        >
            <div className="flex items-start justify-between">
                {renderedIconNode}
                <span className="p-1 text-[#002E62] transition-colors">
                    <FiChevronRight className="h-5 w-5" />
                </span>
            </div>

            <div className="mt-4 max-w-[300px]">
                <h3 className="text-base font-semibold text-[#002E62] transition-colors">
                    {title}
                </h3>
                <p className="text-xs sm:text-sm text-[#71717A] line-clamp-2">
                    {description}
                </p>
            </div>
        </div>
    );
}
