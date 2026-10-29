import { useState, lazy, Suspense } from 'react';
import SettingsLayout, {
    type SettingsTabItem,
} from '@shared/components/Settings/SettingsLayout';
import FloatingChatButton from '@shared/components/Dashboard/FloatingChatButton';

// Code splitting tabs with lazy imports
const FMProfileTabView = lazy(
    () => import('../../components/settings/FMProfileTabView')
);
const FMSupportTabView = lazy(
    () => import('../../components/settings/FMSupportTabView')
);
const FMUserManagementTabView = lazy(
    () => import('../../components/settings/FMUserManagementTabView')
);
const FMActivityLogTabView = lazy(
    () => import('../../components/settings/FMActivityLogTabView')
);
const FMNotificationTabView = lazy(
    () => import('../../components/settings/FMNotificationTabView')
);

const SETTINGS_TABS: SettingsTabItem[] = [
    {
        id: 'profile',
        label: 'Profile',
        description:
            'Overview of your profile, including personal details and password update',
        icon: (
            <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <circle cx="12" cy="8" r="4" />
                <path d="M20 21a8 8 0 0 0-16 0" />
            </svg>
        ),
    },
    {
        id: 'support',
        label: 'Support',
        description:
            'Manage your notification preferences to stay updated on important activities.',
        icon: (
            <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="10" r="0.5" fill="currentColor" />
                <path d="M12 13v-1a1.5 1.5 0 0 1 1.5-1.5A1.5 1.5 0 0 0 15 9a3 3 0 0 0-6 0" />
            </svg>
        ),
    },
    {
        id: 'users',
        label: 'User Management',
        description:
            'Manage your notification preferences to stay updated on important activities.',
        icon: (
            <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
        ),
    },
    {
        id: 'activity',
        label: 'Activity Log',
        description:
            'Manage your notification preferences to stay updated on important activities.',
        icon: (
            <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
            </svg>
        ),
    },
    {
        id: 'notifications',
        label: 'Notification',
        description:
            'Manage your notification preferences to stay updated on important activities.',
        icon: (
            <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M7 15h4" />
                <path d="M7 11h10" />
            </svg>
        ),
    },
];

export default function FMSettingsPage() {
    const [activeTab, setActiveTab] = useState('profile');

    return (
        <SettingsLayout
            title="Settings"
            tabs={SETTINGS_TABS}
            activeTab={activeTab}
            onTabChange={(tabId) => setActiveTab(tabId)}
        >
            <Suspense
                fallback={
                    <div className="flex items-center justify-center py-20 bg-white rounded-2xl border border-[#BED3EB]">
                        <div className="h-8 w-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
                    </div>
                }
            >
                {activeTab === 'profile' && <FMProfileTabView />}
                {activeTab === 'support' && <FMSupportTabView />}
                {activeTab === 'users' && <FMUserManagementTabView />}
                {activeTab === 'activity' && <FMActivityLogTabView />}
                {activeTab === 'notifications' && <FMNotificationTabView />}
            </Suspense>

            {/* Floating Chat FAB */}
            <FloatingChatButton />
        </SettingsLayout>
    );
}
