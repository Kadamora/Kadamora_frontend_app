import React, { useState } from 'react';
import ProfileSettings from './components/ProfileSettings';
import SupportSettings from './components/SupportSettings';
import NotificationSettings from './components/NotificationSettings';
import { useGetAgentSettingsOverviewQuery } from '@store/api/agentSettings.api';

const tabs = [
    {
        id: 'profile',
        label: 'Profile',
        description: 'Overview of your profile, including personal details and password update.',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="5" />
                <path d="M20 21a8 8 0 0 0-16 0" />
            </svg>
        )
    },
    {
        id: 'support',
        label: 'Support',
        description: 'Manage your notification preferences to stay updated on important activities.',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                <path d="M12 9v2m0 4h.01" />
            </svg>
        )
    },
    {
        id: 'notification',
        label: 'Notification',
        description: 'Manage your notification preferences to stay updated on important activities.',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M7 15h4" />
                <path d="M7 11h10" />
            </svg>
        )
    }
];

const GlobalSettingsPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState('profile');

    const { data: settingsOverview, isLoading } = useGetAgentSettingsOverviewQuery();
    const profile = settingsOverview?.data?.profile;
    // const notifications = settingsOverview?.data?.notifications;

    return (
        <div className="pb-10 min-h-screen">
            <div className="mb-6 mt-4 max-w-[1200px] mx-auto">
                <h1 className="text-[25px] font-bold text-[#002E62] leading-snug mb-8">
                    General Settings
                </h1>
                
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Settings Sidebar */}
                    <div className="w-full lg:w-[320px] shrink-0 space-y-3">
                        {tabs.map((tab) => {
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full text-left p-5 rounded-xl border transition-all duration-200 ${
                                        isActive 
                                            ? 'border-[#00C48C] bg-white ring-1 ring-[#00C48C]/20 shadow-sm' 
                                            : 'border-[#E4E7EC] bg-white hover:border-[#00C48C]/50'
                                    }`}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className={`mt-0.5 rounded-full p-2 ${isActive ? 'text-[#00C48C] bg-[#E8F8F2]' : 'text-[#71717A] bg-[#F4F4F5]'}`}>
                                            {tab.icon}
                                        </div>
                                        <div>
                                            <h3 className={`text-[16px] font-bold mb-1 ${isActive ? 'text-[#00C48C]' : 'text-[#002E62]'}`}>
                                                {tab.label}
                                            </h3>
                                            <p className="text-[13px] text-[#71717A] leading-relaxed">
                                                {tab.description}
                                            </p>
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {/* Settings Content */}
                    <div className="flex-1 min-w-0">
                        {activeTab === 'profile' && <ProfileSettings user={profile} isLoading={isLoading} />}
                        {activeTab === 'support' && <SupportSettings />}
                        {/* {activeTab === 'notification' && <NotificationSettings initialToggles={notifications} />} */}
                        {activeTab === 'notification' && <NotificationSettings />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GlobalSettingsPage;
