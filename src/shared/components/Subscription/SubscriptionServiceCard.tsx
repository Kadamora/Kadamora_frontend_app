import React from 'react';

export interface SubscriptionServiceCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    active: boolean;
    onToggle: () => void;
    children?: React.ReactNode;
    className?: string;
}

export default function SubscriptionServiceCard({
    title,
    description,
    icon,
    active,
    onToggle,
    children,
    className = '',
}: SubscriptionServiceCardProps) {
    return (
        <div className={`bg-white rounded-2xl p-5 sm:p-6 border border-[#E2E8F0] shadow-2xs transition-all ${className}`}>
            <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-[#E8F8F0] border border-[#ABECD0] flex items-center justify-center text-[#12B76A] shrink-0 mt-0.5">
                        {icon}
                    </div>

                    <div>
                        <h3 className="text-base sm:text-lg font-bold text-[#002E62] leading-snug">
                            {title}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#71717A] mt-1 leading-relaxed max-w-2xl">
                            {description}
                        </p>
                    </div>
                </div>

                {/* Toggle Switch */}
                <button
                    type="button"
                    onClick={onToggle}
                    role="switch"
                    aria-checked={active}
                    aria-label={`Toggle ${title}`}
                    className={`relative w-12 h-6.5 rounded-full shrink-0 transition-colors duration-200 cursor-pointer ${
                        active ? 'bg-[#12B76A]' : 'bg-[#CBD5E1]'
                    }`}
                >
                    <span
                        className={`absolute top-1 left-1 h-4.5 w-4.5 rounded-full bg-white shadow-sm transition-transform duration-200 ${
                            active ? 'translate-x-5.5' : 'translate-x-0'
                        }`}
                    />
                </button>
            </div>

            {/* Expanded Accordion Content */}
            {active && children && (
                <div className="mt-6 pt-6 border-t border-[#F1F5F9] animate-fade-in">
                    {children}
                </div>
            )}
        </div>
    );
}
