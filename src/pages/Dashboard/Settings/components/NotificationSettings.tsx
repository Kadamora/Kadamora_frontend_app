import React, { useState, useEffect } from 'react';
import {
    useGetGeneralNotificationPreferencesQuery,
    useUpdateGeneralNotificationPreferencesMutation,
} from '@store/api/agentSettings.api';

const notificationOptions = [
    {
        id: 'notifyIncomingRequests',
        label: 'Incoming Request',
        description: 'Get notified whenever a new incoming request is submitted, so you can respond promptly and stay on top of every opportunity.',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00C48C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="16"></line>
                <line x1="8" y1="12" x2="16" y2="12"></line>
            </svg>
        ),
        iconBg: '#E8F8F2'
    },
    {
        id: 'notifyDeclinedRequests',
        label: 'Declined Request',
        description: 'Receive notifications when a request you submitted has been declined, allowing you to take appropriate follow-up actions.',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF5470" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="8" y1="8" x2="16" y2="16"></line>
                <line x1="16" y1="8" x2="8" y2="16"></line>
            </svg>
        ),
        iconBg: '#FFEBEF'
    },
    {
        id: 'notifyMessages',
        label: 'Messages',
        description: 'Stay informed with instant notifications whenever you receive a new message, ensuring you never miss an important conversation.',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00A2C9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
        ),
        iconBg: '#E6F6FB'
    }
];

const NotificationSettings: React.FC = () => {
    const { data: generalData, isLoading } = useGetGeneralNotificationPreferencesQuery();
    const [updateGeneralNotifications, { isLoading: isUpdating }] = useUpdateGeneralNotificationPreferencesMutation();

    const [toggles, setToggles] = useState<{ [key: string]: boolean }>({
        notifyIncomingRequests: false,
        notifyDeclinedRequests: false,
        notifyMessages: false,
    });

    // Sync state when general notification preferences are fetched
    useEffect(() => {
        if (generalData?.success && generalData.data) {
            const d = generalData.data;
            setToggles({
                notifyIncomingRequests: d.notifyIncomingRequests ?? false,
                notifyDeclinedRequests: d.notifyDeclinedRequests ?? false,
                notifyMessages: d.notifyMessages ?? false,
            });
        }
    }, [generalData]);

    const handleToggle = async (id: string) => {
        const newValue = !toggles[id];
        // Optimistic update
        setToggles(prev => ({ ...prev, [id]: newValue }));

        try {
            await updateGeneralNotifications({ [id]: newValue }).unwrap();
        } catch (err) {
            // Revert on failure
            setToggles(prev => ({ ...prev, [id]: !newValue }));
            console.error('Failed to update notification preference:', err);
        }
    };

    return (
        <div className="w-full space-y-6">
            {/* Main Notification Toggles */}
            <div className="w-full bg-white rounded-xl shadow-sm border border-[#E4E7EC] p-8">
                <h2 className="text-[18px] font-bold text-[#002E62] mb-2">Notification Preferences</h2>
                <p className="text-[13px] text-[#71717A] mb-8">Choose which notifications you'd like to receive.</p>

                {isLoading ? (
                    <div className="space-y-6">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="animate-pulse flex items-center gap-4 py-4">
                                <div className="w-10 h-10 rounded-full bg-gray-100 shrink-0" />
                                <div className="flex-1 space-y-2">
                                    <div className="h-4 bg-gray-200 rounded w-1/4" />
                                    <div className="h-3 bg-gray-100 rounded w-3/4" />
                                </div>
                                <div className="w-12 h-6 rounded-full bg-gray-200 shrink-0" />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="space-y-0">
                        {notificationOptions.map((item, index) => (
                            <div key={item.id}>
                                <div className="flex items-start gap-4 py-6">
                                    <div
                                        className="w-[40px] h-[40px] rounded-full flex items-center justify-center shrink-0"
                                        style={{ backgroundColor: item.iconBg }}
                                    >
                                        {item.icon}
                                    </div>
                                    <div className="flex-1 pr-6">
                                        <h3 className="text-[16px] font-bold text-[#002E62] mb-1">{item.label}</h3>
                                        <p className="text-[14px] text-[#71717A] leading-relaxed max-w-2xl">
                                            {item.description}
                                        </p>
                                    </div>
                                    <div className="shrink-0 pt-1">
                                        <button
                                            className={`relative w-12 h-6.5 rounded-full transition-colors duration-200 ${
                                                toggles[item.id] ? 'bg-[#0A66B2]' : 'bg-[#AEAEB2]'
                                            }`}
                                            onClick={() => handleToggle(item.id)}
                                            disabled={isUpdating}
                                            aria-pressed={toggles[item.id]}
                                            aria-label={`Toggle ${item.label}`}
                                        >
                                            <span
                                                className={`absolute left-1 top-1.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${
                                                    toggles[item.id] ? 'translate-x-6' : ''
                                                }`}
                                            />
                                        </button>
                                    </div>
                                </div>
                                {index < notificationOptions.length - 1 && (
                                    <hr className="border-[#F1F4F7]" />
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default NotificationSettings;
