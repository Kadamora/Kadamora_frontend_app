import React from 'react';

export interface SettingsTabItem {
    id: string;
    label: string;
    description: string;
    icon: React.ReactNode;
}

export interface SettingsLayoutProps {
    title?: string;
    tabs: SettingsTabItem[];
    activeTab: string;
    onTabChange: (tabId: string) => void;
    children: React.ReactNode;
    className?: string;
}

export default function SettingsLayout({
    title = 'Settings',
    tabs,
    activeTab,
    onTabChange,
    children,
    className = '',
}: SettingsLayoutProps) {
    return (
        <div className={`pb-12 min-h-screen ${className}`}>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-[#002E62] leading-snug mb-6">
                    {title}
                </h1>

                <div className="flex flex-col lg:flex-row gap-6 items-start">
                    {/* Settings Sidebar */}
                    <div className="w-full lg:w-[320px] shrink-0 space-y-3">
                        {tabs.map((tab) => {
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    type="button"
                                    onClick={() => onTabChange(tab.id)}
                                    className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-200 cursor-pointer ${
                                        isActive
                                            ? 'border-[#12B76A] bg-white ring-1 ring-[#12B76A]/20 shadow-xs'
                                            : 'border-[#E4E7EC] bg-white hover:border-[#12B76A]/40 hover:shadow-xs'
                                    }`}
                                >
                                    <div className="flex items-start gap-3.5">
                                        <div
                                            className={`mt-0.5 rounded-full p-2 shrink-0 ${
                                                isActive
                                                    ? 'text-[#12B76A] bg-[#E8F8F0]'
                                                    : 'text-[#71717A] bg-[#F4F4F5]'
                                            }`}
                                        >
                                            {tab.icon}
                                        </div>
                                        <div>
                                            <h3
                                                className={`text-sm sm:text-base font-bold mb-1 transition-colors ${
                                                    isActive ? 'text-[#12B76A]' : 'text-[#002E62]'
                                                }`}
                                            >
                                                {tab.label}
                                            </h3>
                                            <p className="text-xs text-[#71717A] leading-relaxed">
                                                {tab.description}
                                            </p>
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {/* Settings Content Area */}
                    <div className="flex-1 min-w-0 w-full">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
