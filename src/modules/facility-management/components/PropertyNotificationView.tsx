import { useState } from 'react';
import {
    FiBell,
    FiMail,
    FiMessageSquare,
    FiDollarSign,
    FiHome,
    FiTool,
} from 'react-icons/fi';
import Button from '@shared/components/Button/Button';
import Toggle from '@shared/components/Forms/Toggle';
import { showSuccessToast } from '@shared/components/Toast/Toast';

type NotificationChannel = 'push' | 'email' | 'sms';

interface DeliveryPreference {
    id: NotificationChannel;
    label: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
}

const DELIVERY_PREFERENCES: DeliveryPreference[] = [
    {
        id: 'push',
        label: 'Push Notifications',
        description: 'Receive instant notifications in your browser',
        icon: FiBell,
    },
    {
        id: 'email',
        label: 'Email Notifications',
        description: 'Get updates via email',
        icon: FiMail,
    },
    {
        id: 'sms',
        label: 'SMS Alerts',
        description: 'Critical alerts sent via SMS',
        icon: FiMessageSquare,
    },
];

interface AlertItem {
    id: string;
    title: string;
    badge: string;
    badgeColor: string;
    description: string;
    date: string;
    initials: string;
    icon: React.ReactNode;
    iconBg: string;
}

const INITIAL_ALERTS: AlertItem[] = [
    {
        id: '1',
        title: 'Rent Payment received',
        badge: 'Payment',
        badgeColor: 'bg-[#E6F4FB] text-[#0EA5E9] border-[#BAE6FD]',
        description: 'Femiayo Durochi - Hilltop Diamond A - ₦ 340,000',
        date: '06 June, 2025',
        initials: 'FD',
        icon: <FiDollarSign className="h-4 w-4 text-[#12B76A]" />,
        iconBg: 'bg-[#E6F6EE]',
    },
    {
        id: '2',
        title: 'Rent Payment received',
        badge: 'Payment',
        badgeColor: 'bg-[#E6F4FB] text-[#0EA5E9] border-[#BAE6FD]',
        description: 'Femiayo Durochi - Hilltop Gold C - ₦ 530,000',
        date: '06 June, 2025',
        initials: 'FD',
        icon: <FiDollarSign className="h-4 w-4 text-[#12B76A]" />,
        iconBg: 'bg-[#E6F6EE]',
    },
    {
        id: '3',
        title: 'Lease expiry notice sent',
        badge: 'Lease',
        badgeColor: 'bg-[#F0F4FA] text-[#002E62] border-[#BED3EB]',
        description: 'Emmanuel Davis - Dominion Estate Gold F - 30 days',
        date: '06 June, 2025',
        initials: 'ED',
        icon: <FiHome className="h-4 w-4 text-[#EF4444]" />,
        iconBg: 'bg-[#FEE2E2]',
    },
    {
        id: '4',
        title: 'Maintenance Report submitted',
        badge: 'Maintenance',
        badgeColor: 'bg-[#E6F4FB] text-[#0EA5E9] border-[#BAE6FD]',
        description: 'Chukwudi Abayomi - CityVille Block K - Faulty AC',
        date: '06 June, 2025',
        initials: 'CA',
        icon: <FiTool className="h-4 w-4 text-[#D97706]" />,
        iconBg: 'bg-[#FEF3C7]',
    },
    {
        id: '5',
        title: 'Rent Payment received',
        badge: 'Payment',
        badgeColor: 'bg-[#E6F4FB] text-[#0EA5E9] border-[#BAE6FD]',
        description: 'Femiayo Durochi - CityVille Block A - ₦ 340,000',
        date: '06 June, 2025',
        initials: 'FD',
        icon: <FiDollarSign className="h-4 w-4 text-[#12B76A]" />,
        iconBg: 'bg-[#E6F6EE]',
    },
];

export default function PropertyNotificationView() {
    const [preferences, setPreferences] = useState<Record<NotificationChannel, boolean>>({
        push: false,
        email: false,
        sms: false,
    });

    const handleTogglePreference = (channel: NotificationChannel) => {
        setPreferences((prev) => ({
            ...prev,
            [channel]: !prev[channel],
        }));
    };

    const handleSavePreferences = () => {
        showSuccessToast(
            'Preferences Saved',
            'Your delivery preferences have been successfully updated.'
        );
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Recent Alerts (Image 1) */}
            <div className="lg:col-span-7 rounded-lg border border-[#E4E4E7] bg-white p-5 sm:p-6 shadow-xs space-y-4">
                <div>
                    <h3 className="text-base sm:text-lg font-semibold text-[#091E42]">Recent Alerts</h3>
                    <p className="text-xs text-[#64748B]">Latest notifications and updates</p>
                </div>

                <div className="divide-y divide-[#F1F5F9] pt-2">
                    {INITIAL_ALERTS.map((alert) => (
                        <div
                            key={alert.id}
                            className="py-4 first:pt-2 last:pb-2 flex items-center justify-between gap-3"
                        >
                            <div className="flex items-start gap-3 min-w-0">
                                {/* Icon container */}
                                <div
                                    className={`h-9 w-9 rounded-full ${alert.iconBg} flex items-center justify-center shrink-0 mt-0.5`}
                                >
                                    {alert.icon}
                                </div>

                                <div className="min-w-0 space-y-1">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <h4 className="text-xs sm:text-sm font-semibold text-[#091E42]">
                                            {alert.title}
                                        </h4>
                                        <span
                                            className={`text-[12px] text-[#002E62] px-2 py-0.5 rounded-sm border border-[#F4F4F5] bg-[#FAFAFA] `}
                                        >
                                            {alert.badge}
                                        </span>
                                    </div>

                                    <p className="text-xs text-[#52525B] truncate">
                                        {alert.description}
                                    </p>

                                    <span className="text-xs text-[#52525B] block">
                                        {alert.date}
                                    </span>
                                </div>
                            </div>

                            {/* Initials badge */}
                            <div className="h-9 w-9 rounded-full bg-[#F4F4F5] border border-[#E4E4E7] text-xs font-medium text-[#002E62] flex items-center justify-center shrink-0">
                                {alert.initials}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Column: Delivery Preferences (Image 1) */}
            <div className="lg:col-span-5 rounded-lg border border-[#E4E4E7] bg-white p-5 sm:p-6 shadow-xs space-y-6">
                <div>
                    <h3 className="text-base sm:text-lg font-semibold text-[#091E42]">
                        Delivery Preferences
                    </h3>
                    <p className="text-xs text-[#64748B]">
                        Choose how you want to receive notifications
                    </p>
                </div>

                <div className="space-y-5">
                    {DELIVERY_PREFERENCES.map(({ id, label, description, icon: Icon }) => (
                        <div
                            key={id}
                            className="flex items-center justify-between gap-4"
                        >
                            <div className="space-y-0.5 min-w-0">
                                <div className="flex items-center gap-2">
                                    <Icon className="h-4 w-4 text-[#64748B] shrink-0" />
                                    <h4 className="text-xs sm:text-sm font-bold text-[#091E42]">
                                        {label}
                                    </h4>
                                </div>
                                <p className="text-xs text-[#64748B] pl-6">
                                    {description}
                                </p>
                            </div>

                            <Toggle
                                checked={preferences[id]}
                                onChange={() => handleTogglePreference(id)}
                                ariaLabel={`Toggle ${label}`}
                            />
                        </div>
                    ))}
                </div>

                <div className="pt-2 border-t border-[#F1F5F9]">
                    <Button
                        type="button"
                        variant="primary"
                        onClick={handleSavePreferences}
                        className="rounded-lg px-6 py-2.5 text-xs sm:text-sm font-semibold cursor-pointer"
                    >
                        Save Changes
                    </Button>
                </div>
            </div>
        </div>
    );
}
