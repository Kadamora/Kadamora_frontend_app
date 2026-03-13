import type { NotificationItem } from '@components/widgets/NotificationPanel';
import NotificationPanel from '@components/widgets/NotificationPanel';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { logout } from '@store/slices/auth.slice';
import React, { useCallback, useMemo, useState, useRef, useEffect } from 'react';
import { FaRegBell } from 'react-icons/fa';
import { Link, Outlet, useLocation, useNavigate } from 'react-router';

const adminNav = [
    { label: 'Dashboard', to: '/admin', icon: '/assets/icons/grid.svg', iconClass: 'icon-home' },
    { label: 'Chat', to: '/admin/chat', icon: '/assets/icons/chat.svg', iconClass: 'icon-chat' },
    { label: 'Agents / Realtors', to: '/admin/agents', icon: '/assets/icons/users.svg', iconClass: 'icon-timeline' },
    { label: 'Properties', to: '/admin/properties', icon: '/assets/icons/building.svg', iconClass: 'icon-marketplace' },
    { label: 'Subscription', to: '/admin/subscription', icon: '/assets/icons/card.svg', iconClass: 'icon-subscription' },
    { label: 'Users', to: '/admin/users', icon: '/assets/icons/user.svg', iconClass: 'icon-services' },
    { label: 'Settings', to: '/admin/settings', icon: '/assets/icons/settings.svg', iconClass: 'icon-settings' },
]
const notificationsSample: NotificationItem[] = [
    {
        id: 1,
        title: 'Ayo Ola',
        body: 'Vorem ipsum dolor sit amet, consectetur adipiscing elit. Vorem ipsum dolor sit amet.',
        date: 'March 01, 2025 7:55 pm',
        read: false,
    },
    {
        id: 2,
        title: 'Dayo David',
        body: 'A property you follow has new updates. Check the dashboard for details.',
        date: 'March 01, 2025 7:50 pm',
        read: true,
    },
    {
        id: 3,
        title: 'Ope Ade',
        body: 'You have a new inquiry regarding one of your listings.',
        date: 'March 01, 2025 7:45 pm',
        read: false,
    },
];

const AdminDashboardLayout: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const account = useAppSelector((s) => s.auth.user);

    const fallbackInitials = "CJ"
    const fallbackName = "Charles John"
    const fallbackRole = "Super Admin"
      const derivedInitials = useMemo(() => {
            if (account) {
                const initialSource = `${account.firstName ?? ''} ${account.lastName ?? ''}`.trim();
                if (initialSource) {
                    const parts = initialSource.split(' ').filter(Boolean);
                    const initials = parts
                        .slice(0, 2)
                        .map((part) => part[0]?.toUpperCase() ?? '')
                        .join('');
                    return initials || fallbackInitials
                }
            }
            return fallbackInitials
        }, [account, fallbackInitials]);
         const derivedName = useMemo(() => {
                if (!account) return fallbackName;
                const fullName = `${account.firstName ?? ''} ${account.lastName ?? ''}`.trim();
                return fullName || fallbackName;
            }, [account, fallbackName]);
         const derivedRole = useMemo(() => {
                if (!account) return fallbackRole;
                const role = `${account.role ?? ''}`.trim();
                return role || fallbackRole;
            }, [account, fallbackRole]);

    const [notifications, setNotifications] = useState<NotificationItem[]>(notificationsSample);
    const [notifOpen, setNotifOpen] = useState(false);
    const unreadCount = notifications.filter((n) => !n.read).length;
    const toggleNotif = () => setNotifOpen((o) => !o);
    const markAllRead = useCallback(() => {
        setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    }, []);

    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const userMenuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
                setUserMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

   const activeNav = useMemo(() => {
    const currentPath = location.pathname.replace(/\/+$/, ''); 

    const matched = adminNav
        .slice()                          
        .sort((a, b) => b.to.length - a.to.length) 
        .find((item) => {
            const routeWithoutSlash = item.to.replace(/\/+$/, '');
            return (
                currentPath === routeWithoutSlash ||
                currentPath.startsWith(routeWithoutSlash + '/')
            );
        });

    return matched || adminNav[0];
}, [location.pathname, adminNav]);


    const handleLogout = () => {
        dispatch(logout());
        navigate('/admin/auth/login', { replace: true });
    };
    console.log(handleLogout)
    return (
        <div className="min-h-screen flex bg-gradient-to-b from-[#f2fcf7] via-[#fcfcfc] to-white text-[#101828] relative">
            {/* navigation sidebar */}
            <aside
                id="dashboard-sidebar"
                className={`sidebar-panel w-[300px] flex flex-col overflow-y-auto border-r border-[#E4E7EC] bg-white px-6 pt-6 pb-8 shadow-sm transition-transform duration-300 ease-[cubic-bezier(.4,.0,.2,1)] will-change-transform`}
            >
                <div className="w-full">
                    <div className="flex items-center gap-3 mb-10 sticky top-0 bg-white pt-2">
                        <a href="/dashboard">
                            <img src="/assets/logo/logo-small-black.png" alt="Kadamora Logo" className="h-10 w-auto" />
                        </a>
                    </div>
                    <nav className="space-y-2" aria-label="Primary">
                        {adminNav.map((item) => {
                            const active = activeNav.to === item.to;
                            return (
                                <Link
                                    key={item.to}
                                    to={item.to}
                                    className={`menu-link group relative flex items-center gap-3 rounded-xl px-5 py-3 font-medium transition
                                        ${active ? 'bg-emerald-50 text-[#359F6A]' : 'text-[#093154] hover:bg-emerald-50/60 hover:text-[#359F6A]'}
                                    `}
                                >
                                    <span
                                        className={`absolute left-0 top-1/2 -translate-y-1/2 h-10 w-[6px] rounded-full bg-emerald-500 transition-opacity ${active ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'
                                            }`}
                                    />
                                    <span className="flex items-center justify-center">
                                        <span
                                            aria-hidden="true"
                                            className={`mask-icon h-[30px] w-[30px] ${item.iconClass} transition-colors duration-300 ${active ? 'bg-emerald-600' : 'bg-[#98A2B3] group-hover:bg-emerald-500'
                                                }`}
                                        />
                                    </span>
                                    <span>{item.label}</span>
                                </Link>
                            );
                        })}
                    </nav>
                </div>
            </aside>
            <div className="flex-1 flex flex-col">
                <header className="h-[80px] flex items-center">
                    <div className="max-w-[1240px] mx-auto w-full flex items-center justify-between">
                        <h1 className="text-lg font-semibold">{activeNav.label}</h1>


                        <div className="flex items-center gap-4">
                             <button
                                onClick={toggleNotif}
                                className="relative inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#AFC7B9] bg-white text-[#093154] hover:text-emerald-600 hover:border-emerald-400 transition"
                                aria-label="Notifications"
                            >
                                <FaRegBell className="h-6 w-6" />
                                {unreadCount > 0 && (
                                    <span className="absolute top-2 right-2 inline-flex items-center justify-center rounded-full bg-rose-500 text-white text-[10px] leading-none h-4 px-1 font-semibold">
                                        {unreadCount}
                                    </span>
                                )}
                            </button>



                            <div className="relative" ref={userMenuRef}>
                                <button
                                    type="button"
                                    onClick={() => setUserMenuOpen((o) => !o)}
                                    className="flex items-center gap-3 rounded-full px-1 md:px-2 py-1 hover:bg-emerald-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40 transition"
                                    aria-haspopup="menu"
                                >
                                    <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#CCD5DD] bg-white text-sm font-semibold text-[#093154] overflow-hidden">
                                        {/* Fallback initials if no avatar image */}
                                        {derivedInitials}
                                    </span>
                                    <span className="hidden md:flex flex-col text-left leading-tight">
                                        <span className="text-sm font-bold text-[#091E42]">{derivedName}</span>
                                        <span className="text-[12px] text-[#505F79]">{derivedRole}</span>
                                    </span>
                                    <svg
                                        className={`hidden md:block h-4 w-4 text-primary transition-transform ${userMenuOpen ? 'rotate-180' : ''}`}
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                {userMenuOpen && (
                                    <div
                                        role="menu"
                                        aria-label="User menu"
                                        className="absolute right-0 mt-3 w-56 origin-top-right rounded-xl border border-[#E4E7EC] bg-white shadow-lg ring-1 ring-black/5 p-2 animate-[fadeIn_.18s_ease-out]"
                                    >
                                        <div
                                            role="menuitem"
                                            onClick={() => {
                                                setUserMenuOpen(false);
                                                handleLogout();
                                            }}
                                            className="w-full flex items-center gap-3 rounded-lg px-3 py-2 font-medium transition cursor-pointer text-[#52525B] hover:bg-[#F1FCF7] hover:text-[#359F6A] focus:outline-none focus:bg-[#F1FCF7]"
                                        >
                                            <div className="mr-[5px]">
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                                    <polyline points="16 17 21 12 16 7" />
                                                    <line x1="21" y1="12" x2="9" y2="12" />
                                                </svg>
                                            </div>
                                            <span>Logout</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </header>
                <main className="flex-1">
                    <div className="max-w-[1240px]  mx-auto ">
                        <Outlet />
                    </div>
                </main>
            </div>
             <NotificationPanel
                            open={notifOpen}
                            onClose={() => setNotifOpen(false)}
                            notifications={notifications}
                            onMarkAllRead={markAllRead}
                        />
        </div>
    );
};

export default AdminDashboardLayout;