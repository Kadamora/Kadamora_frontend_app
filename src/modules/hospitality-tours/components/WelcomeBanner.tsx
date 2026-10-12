import React from 'react';

export interface WelcomeBannerProps {
    title?: string;
    subtitle?: string;
    action?: React.ReactNode;
    className?: string;
}

export default function WelcomeBanner({
    title = 'Welcome, Charles!',
    subtitle = "Here's what's happening with your business today",
    action,
    className = '',
}: WelcomeBannerProps) {
    return (
        <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 ${className}`}>
            <div>
                <h2 className="text-xl sm:text-2xl font-semibold text-[#002E62]">
                    {title}
                </h2>
                {subtitle && (
                    <p className="text-sm text-[#52525B] ">
                        {subtitle}
                    </p>
                )}
            </div>
            {action && <div>{action}</div>}
        </div>
    );
}
