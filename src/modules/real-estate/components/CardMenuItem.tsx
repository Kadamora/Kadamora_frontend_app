import React from 'react';

export interface CardMenuItemProps {
    label: string;
    iconSrc?: string;
    iconAlt?: string;
    icon?: React.ReactNode;
    className?: string; // additional classes
    onActivate?: () => void;
}

const CardMenuItem = React.forwardRef<HTMLDivElement, CardMenuItemProps>(
    ({ label, iconSrc, iconAlt = '', icon, className = '', onActivate }, ref) => {
        const handleKey = (e: React.KeyboardEvent) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onActivate?.();
            }
        };

        return (
            <div
                ref={ref}
                role="menuitem"
                tabIndex={0}
                className={`flex items-center justify-start gap-3 w-full px-4 py-3 transition-colors text-left cursor-pointer ${className}`}
                onClick={() => onActivate?.()}
                onKeyDown={handleKey}
            >
                {icon ? icon : (iconSrc ? <img src={iconSrc} alt={iconAlt} className="h-4 w-4" /> : null)}
                <span className="text-sm text-gray-600 ">{label}</span>
            </div>
        );
    },
);

CardMenuItem.displayName = 'CardMenuItem';
export default CardMenuItem;
