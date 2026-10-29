import { useState } from 'react';
import { FiGitPullRequest, FiXOctagon, FiMessageSquare } from 'react-icons/fi';
import NotificationToggleList, {
    type NotificationOptionItem,
} from '@shared/components/Settings/NotificationToggleList';
import { mockNotificationOptions } from '../../data/settingsMock';
import { showSuccessToast } from '@shared/components/Toast/Toast';

export default function FMNotificationTabView() {
    const [items, setItems] = useState<NotificationOptionItem[]>([
        {
            ...mockNotificationOptions[0],
            icon: <FiGitPullRequest className="h-5 w-5 text-[#12B76A]" />,
        },
        {
            ...mockNotificationOptions[1],
            icon: <FiXOctagon className="h-5 w-5 text-[#12B76A]" />,
        },
        {
            ...mockNotificationOptions[2],
            icon: <FiMessageSquare className="h-5 w-5 text-[#12B76A]" />,
        },
    ]);

    const handleToggle = (id: string) => {
        setItems((prev) =>
            prev.map((item) => {
                if (item.id === id) {
                    const next = !item.enabled;
                    showSuccessToast(
                        'Preference Updated',
                        `${item.label} notifications are now ${next ? 'enabled' : 'disabled'}.`
                    );
                    return { ...item, enabled: next };
                }
                return item;
            })
        );
    };

    return (
        <NotificationToggleList
            title="Notification"
            items={items}
            onToggle={handleToggle}
        />
    );
}
