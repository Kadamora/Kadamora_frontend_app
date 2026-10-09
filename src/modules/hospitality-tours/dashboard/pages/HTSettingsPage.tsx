import { useState } from 'react';
import ProfileTabView from '../../components/settings/ProfileTabView';
import SupportTabView from '../../components/settings/SupportTabView';
import UserManagementTabView from '../../components/settings/UserManagementTabView';
import ActivityLogTabView from '../../components/settings/ActivityLogTabView';
import NotificationsTabView from '../../components/settings/NotificationsTabView';

export type SettingsTab = 'profile' | 'support' | 'user-management' | 'notifications' | 'activity-log';

export default function HTSettingsPage() {
    const [activeTab, setActiveTab] = useState<SettingsTab>('profile');

    return (
        <div className="space-y-6 max-w-7xl mx-auto pb-12 animate-fade-in">
            {/* Page Header */}
            <div>
                <h1 className="text-2xl font-bold text-[#002E62]">Settings</h1>
                <p className="text-sm text-[#52525B] mt-1">
                    Choose the type of listing you want to create on Kadamora and start reaching thousands of travelers
                </p>
            </div>

            {/* Navigation Tabs Bar */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {[
                    { key: 'profile', label: 'Profile' },
                    { key: 'support', label: 'Support' },
                    { key: 'user-management', label: 'User Management' },
                    { key: 'notifications', label: 'Notifications' },
                    { key: 'activity-log', label: 'Activity Log' },
                ].map((tab) => {
                    const isActive = activeTab === tab.key;
                    return (
                        <button
                            key={tab.key}
                            type="button"
                            onClick={() => setActiveTab(tab.key as SettingsTab)}
                            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap border ${
                                isActive
                                    ? 'bg-[#F0F5FF] text-[#002E62] border-[#BFDBFE] shadow-2xs'
                                    : 'bg-white text-[#52525B] border-[#E2E8F0] hover:bg-slate-50 hover:text-[#002E62]'
                            }`}
                        >
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            {/* Active Tab Content */}
            {activeTab === 'profile' && <ProfileTabView />}
            {activeTab === 'support' && <SupportTabView />}
            {activeTab === 'user-management' && <UserManagementTabView />}
            {activeTab === 'notifications' && <NotificationsTabView />}
            {activeTab === 'activity-log' && <ActivityLogTabView />}
        </div>
    );
}
