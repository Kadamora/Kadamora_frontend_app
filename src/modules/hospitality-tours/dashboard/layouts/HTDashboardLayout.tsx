import { useState, useCallback, useMemo } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router';
import HTSidebar from '../components/HTSidebar';
import HTNavbar from '../components/HTNavbar';
import { type UserMenuItem } from '@shared/components/Dashboard/UserMenuDropdown';
import NotificationPanel, { type NotificationItem } from '@shared/components/NotificationPanel/NotificationPanel';
import SignOutModal from '@shared/components/Modal/SignOutModal';
import { BreadcrumbProvider } from '@shared/context/BreadcrumbContext';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { logout } from '@store/auth/auth.slice';
import {
    useGetNotificationsQuery,
    useGetUnreadNotificationCountQuery,
    useMarkAllNotificationsReadMutation,
    notificationApi,
} from '@shared/api/notification.api';
import { useNotificationSocket } from '@shared/hooks/useNotificationSocket';
import type { Notification } from '@shared/api/notification.api';

const htUserMenuItems: UserMenuItem[] = [
    {
        label: 'Profile',
        icon: <img src="/assets/icons/circle-user-round.svg" alt="Profile" className="h-5 w-5" />,
        disabled: true,
        path: '/hospitality-tours/dashboard/profile',
    },
    {
        label: 'My Wallet',
        icon: <img src="/assets/icons/list-check.svg" alt="My Listings" className="h-5 w-5" />,
        path: '/hospitality-tours/dashboard/my-listings',
    },
    {
        label: 'Resolve Ticket',
        icon: <img src="/assets/icons/settings2.svg" alt="Settings" className="h-5 w-5" />,
        path: '/hospitality-tours/dashboard/settings',
    },
    {
        label: 'Sign Out',
        icon: <img src="/assets/icons/log-out.svg" alt="Sign Out" className="h-5 w-5" />,
        action: 'signout',
    },
];

export default function HTDashboardLayout() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();
    const account = useAppSelector((s) => s.auth.user);

    const [notifOpen, setNotifOpen] = useState(false);
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
    const [signOutModalOpen, setSignOutModalOpen] = useState(false);

    // Compute dynamic Navbar title matching the active sidebar tab & mockups
    const navbarTitle = useMemo(() => {
        const path = location.pathname;
        if (path.includes('/timeline')) return 'Timeline';
        if (path.includes('/my-listings')) return 'Listings';
        if (path.includes('/bookings')) return 'Booking Management';
        if (path.includes('/wallet')) return 'Wallet';
        if (path.includes('/calendar')) return 'Calendar';
        if (path.includes('/reviews')) return 'Reviews';
        if (path.includes('/settings')) return 'Settings';
        return 'Dashboard';
    }, [location.pathname]);

    const derivedName = useMemo(() => {
        if (!account) return 'Charles John';
        const fullName = `${account.firstName ?? ''} ${account.lastName ?? ''}`.trim();
        return fullName || 'Charles John';
    }, [account]);

    const derivedSubtitle = (account as any)?.companyName || account?.email || 'Events TV';

    const derivedInitials = useMemo(() => {
        if (account) {
            const initialSource = `${account.firstName ?? ''} ${account.lastName ?? ''}`.trim();
            if (initialSource) {
                const parts = initialSource.split(' ').filter(Boolean);
                return parts
                    .slice(0, 2)
                    .map((part) => part[0]?.toUpperCase() ?? '')
                    .join('') || 'CJ';
            }
        }
        return 'CJ';
    }, [account]);

    // Notifications API + Realtime WebSocket
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
                setSignOutModalOpen(true);
                return;
            }
            if (item.path) {
                navigate(item.path);
            }
        },
        [navigate],
    );

    const handleSignOutConfirm = useCallback(() => {
        setSignOutModalOpen(false);
        dispatch(logout());
        navigate('/hospitality-tours/auth/login', { replace: true });
    }, [dispatch, navigate]);

    return (
        <BreadcrumbProvider>
            <div className="min-h-screen bg-gradient-to-b from-[#f2fcf7] via-[#fcfcfc] to-white text-[#101828] flex">
                {/* Desktop Left Sidebar (always visible and fixed on lg breakpoint) */}
                <div className="hidden lg:block sticky top-0 h-screen flex-shrink-0 z-30">
                    <HTSidebar />
                </div>

                {/* Mobile Sliding Drawer Sidebar */}
                {mobileSidebarOpen && (
                    <div className="fixed inset-0 z-50 flex lg:hidden">
                        <div
                            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
                            onClick={() => setMobileSidebarOpen(false)}
                        />
                        <div className="relative z-10 w-64 bg-white h-full ">
                            <HTSidebar />
                        </div>
                    </div>
                )}

                {/* Right Main Area */}
                <div className="flex-1 min-w-0 flex flex-col min-h-screen">
                    <HTNavbar
                        title={navbarTitle}
                        onToggleMobileSidebar={() => setMobileSidebarOpen((open) => !open)}
                        unreadCount={unreadCount}
                        onToggleNotif={() => setNotifOpen((open) => !open)}
                        userName={derivedName}
                        userSubtitle={derivedSubtitle}
                        userInitials={derivedInitials}
                        userImgUrl={account?.imgUrl}
                        userMenuItems={htUserMenuItems}
                        onUserMenuItemSelect={handleUserMenuItemSelect}
                    />

                    <main className="flex-1 min-w-0 p-6 lg:p-8 overflow-y-auto">
                        <Outlet />
                    </main>
                </div>

                {/* Notification Drawer */}
                <NotificationPanel
                    open={notifOpen}
                    onClose={() => setNotifOpen(false)}
                    notifications={notifications}
                    onMarkAllRead={markAllRead}
                />

                {/* Sign Out Modal */}
                <SignOutModal
                    isOpen={signOutModalOpen}
                    onClose={() => setSignOutModalOpen(false)}
                    onConfirm={handleSignOutConfirm}
                />
            </div>
        </BreadcrumbProvider>
    );
}
