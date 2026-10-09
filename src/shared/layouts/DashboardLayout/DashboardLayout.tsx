import React, { useState, useCallback, useMemo } from 'react';
import { Outlet, useNavigate } from 'react-router';
import './dashboardLayout.css';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import type { NotificationItem } from '@shared/components/NotificationPanel/NotificationPanel';
import NotificationPanel from '@shared/components/NotificationPanel/NotificationPanel';
import { logout } from '@store/auth/auth.slice';
import {
    useGetNotificationsQuery,
    useGetUnreadNotificationCountQuery,
    useMarkAllNotificationsReadMutation,
    notificationApi,
} from '@shared/api/notification.api';
import { useNotificationSocket } from '@shared/hooks/useNotificationSocket';
import type { Notification } from '@shared/api/notification.api';

import DashboardHeader from '@shared/components/Dashboard/DashboardHeader';
import DashboardSidebar, { type DashboardNavItem } from '@shared/components/Dashboard/DashboardSidebar';
import { type UserMenuItem } from '@shared/components/Dashboard/UserMenuDropdown';

export interface DashboardLayoutProps {
    children?: React.ReactNode;
    searchValue?: string;
    onSearchChange?: (value: string) => void;
    userName?: string;
    userEmail?: string;
    userInitials?: string;
}

const navItems: DashboardNavItem[] = [
    { label: 'Home', to: '/dashboard/property-listing', iconClass: 'icon-home' },
    { label: 'Timeline', to: '/dashboard/timeline', iconClass: 'icon-timeline' },
    { label: 'Chat', to: '/dashboard/chat', iconClass: 'icon-chat' },
    { label: 'Subscription', to: '/dashboard/subscription', iconClass: 'icon-subscription' },
    { label: 'Settings', to: '/dashboard/settings', iconClass: 'icon-settings' },
];

const userMenuItems: UserMenuItem[] = [
    {
        label: 'Profile',
        icon: <img src="/assets/icons/circle-user-round.svg" alt="Profile" className="h-6 w-6" />,
        disabled: true,
        path: '/dashboard/profile',
    },
    {
        label: 'My Listing',
        icon: <img src="/assets/icons/list-check.svg" alt="My Listing" className="h-6 w-6" />,
        path: '/dashboard/my-listing',
    },
    {
        label: 'Saved',
        icon: <img src="/assets/icons/heart-plus.svg" alt="Saved" className="h-6 w-6" />,
        path: '/dashboard/saved',
    },
    {
        label: 'My Investment',
        icon: <img src="/assets/icons/sprout.svg" alt="Investment" className="h-6 w-6 opacity-70" />,
        path: '/dashboard/investment',
        disabled: true,
        badge: 'Coming Soon',
    },
    {
        label: 'Settings',
        icon: <img src="/assets/icons/settings2.svg" alt="Settings" className="h-6 w-6" />,
        path: '/dashboard/settings',
    },
    {
        label: 'Help Center',
        icon: <img src="/assets/icons/circle-question-mark.svg" alt="Help" className="h-6 w-6" />,
        disabled: true,
        path: '/help',
    },
    {
        label: 'Sign Out',
        icon: <img src="/assets/icons/log-out.svg" alt="Sign Out" className="h-6 w-6" />,
        action: 'signout',
    },
];

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
    children,
    searchValue = '',
    onSearchChange,
    userName: fallbackName = '',
    userEmail: fallbackEmail = '',
    userInitials: fallbackInitials = '',
}) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const account = useAppSelector((s) => s.auth.user);

    const derivedName = useMemo(() => {
        if (!account) return fallbackName;
        const fullName = `${account.firstName ?? ''} ${account.lastName ?? ''}`.trim();
        return fullName || fallbackName;
    }, [account, fallbackName]);

    const derivedEmail = account?.email ?? fallbackEmail;

    const derivedInitials = useMemo(() => {
        if (account) {
            const initialSource = `${account.firstName ?? ''} ${account.lastName ?? ''}`.trim();
            if (initialSource) {
                const parts = initialSource.split(' ').filter(Boolean);
                return parts
                    .slice(0, 2)
                    .map((part) => part[0]?.toUpperCase() ?? '')
                    .join('') || fallbackInitials;
            }
        }
        return fallbackInitials;
    }, [account, fallbackInitials]);

    const [notifOpen, setNotifOpen] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Notification API & WebSocket integration
    const { data: notificationsData, refetch: refetchNotifications } = useGetNotificationsQuery({
        page: 1,
        limit: 20,
    });
    const { data: unreadCountData, refetch: refetchUnreadCount } = useGetUnreadNotificationCountQuery();
    const [markAllReadMutation] = useMarkAllNotificationsReadMutation();

    useNotificationSocket({
        onNotification: useCallback(
            (incoming: Notification) => {
                dispatch(
                    notificationApi.util.updateQueryData('getNotifications', { page: 1, limit: 20 }, (draft) => {
                        const alreadyExists = draft.data?.some((n) => n.id === incoming.id);
                        if (!alreadyExists) {
                            draft.data = [incoming, ...(draft.data ?? [])];
                            draft.total = (draft.total ?? 0) + 1;
                        }
                    }),
                );
                dispatch(
                    notificationApi.util.updateQueryData('getUnreadNotificationCount', undefined, (draft) => {
                        if (draft.data) draft.data.unreadCount += 1;
                    }),
                );
            },
            [dispatch],
        ),
        onUnreadCountUpdate: useCallback(
            (payload: { unreadCount: number }) => {
                dispatch(
                    notificationApi.util.updateQueryData('getUnreadNotificationCount', undefined, (draft) => {
                        if (draft.data) draft.data.unreadCount = payload.unreadCount;
                    }),
                );
            },
            [dispatch],
        ),
    });

    const notifications: NotificationItem[] = useMemo(() => {
        if (!notificationsData?.data) return [];
        return notificationsData.data.map((n) => ({
            id: n.id,
            title: n.title || 'Notification',
            body: n.body,
            date: n.createdAt
                ? new Date(n.createdAt).toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                  })
                : '',
            read: n.isRead,
        }));
    }, [notificationsData]);

    const unreadCount = unreadCountData?.data?.unreadCount ?? 0;

    const markAllRead = useCallback(async () => {
        try {
            await markAllReadMutation().unwrap();
            refetchNotifications();
            refetchUnreadCount();
        } catch (error) {
            console.error('Failed to mark all as read', error);
        }
    }, [markAllReadMutation, refetchNotifications, refetchUnreadCount]);

    const handleUserMenuItemSelect = useCallback(
        (item: UserMenuItem) => {
            if (item.action === 'signout') {
                dispatch(logout());
                navigate('/auth/login', { replace: true });
                return;
            }
            if (item.path) {
                navigate(item.path);
            }
        },
        [dispatch, navigate],
    );

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#f2fcf7] via-[#fcfcfc] to-white text-[#101828] flex">
            {/* Reusable Sidebar */}
            <DashboardSidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                navItems={navItems}
            />

            {/* Main Content Area */}
            <div className="flex min-h-screen flex-1 flex-col sticky top-0 max-h-screen overflow-y-auto">
                <DashboardHeader
                    sidebarOpen={sidebarOpen}
                    onToggleSidebar={() => setSidebarOpen((o) => !o)}
                    searchValue={searchValue}
                    onSearchChange={onSearchChange}
                    unreadCount={unreadCount}
                    onToggleNotif={() => setNotifOpen((o) => !o)}
                    userName={derivedName}
                    userEmail={derivedEmail}
                    userInitials={derivedInitials}
                    userImgUrl={account?.imgUrl}
                    userMenuItems={userMenuItems}
                    onUserMenuItemSelect={handleUserMenuItemSelect}
                />

                <main className="mx-auto max-w-[1240px] px-3 pt-4 w-full">
                    {children ? children : <Outlet />}
                </main>
            </div>

            {/* Notification Drawer */}
            <NotificationPanel
                open={notifOpen}
                onClose={() => setNotifOpen(false)}
                notifications={notifications}
                onMarkAllRead={markAllRead}
            />
        </div>
    );
};

export default DashboardLayout;
