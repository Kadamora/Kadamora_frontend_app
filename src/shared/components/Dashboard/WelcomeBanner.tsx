import React from 'react';

export interface WelcomeBannerProps {
    title?: string;
    subtitle?: string;
    /** Longer body text rendered under the title (e.g. onboarding blurb). */
    description?: React.ReactNode;
    action?: React.ReactNode;
    /** When provided, renders a dismiss link (e.g. "Okay, Got It") on the right. */
    onDismiss?: () => void;
    dismissLabel?: string;
    className?: string;
}

export default function WelcomeBanner({
    title = 'Welcome, Charles!',
    subtitle = "Here's what's happening with your business today",
    description,
    action,
    onDismiss,
    dismissLabel = 'Okay, Got It',
    className = '',
}: WelcomeBannerProps) {
    return (
        <div className={`flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6 ${className}`}>
            <div className="max-w-3xl">
                <h2 className="text-xl sm:text-2xl font-semibold text-[#002E62]">{title}</h2>
                {subtitle && <p className="text-sm text-[#52525B] ">{subtitle}</p>}
                {description && <p className="mt-3 text-sm leading-relaxed text-[#52525B]">{description}</p>}
            </div>
            {action && <div>{action}</div>}
            {onDismiss && (
                <button
                    type="button"
                    onClick={onDismiss}
                    className="shrink-0 text-sm font-semibold text-[#41A36E] hover:text-[#2f8a58] transition-colors"
                >
                    {dismissLabel}
                </button>
            )}
        </div>
    );
}
