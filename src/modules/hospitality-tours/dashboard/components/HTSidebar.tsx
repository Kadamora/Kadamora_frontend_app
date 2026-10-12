import { NavLink } from 'react-router';
import HTLogo from '../../auth/assets/svg/HTLogo.svg';

export interface HTNavItem {
    label: string;
    path: string;
    icon?: React.ReactNode;
    iconClass?: string;
}

const HT_NAV_ITEMS: HTNavItem[] = [
    { label: 'Dashboard', path: '/hospitality-tours/dashboard', iconClass: 'icon-home' },
    { label: 'Timeline', path: '/hospitality-tours/dashboard/timeline', iconClass: 'icon-timeline' },
    { label: 'My Listings', path: '/hospitality-tours/dashboard/my-listings', iconClass: 'icon-listings' },
    { label: 'Booking Mgt', path: '/hospitality-tours/dashboard/bookings', iconClass: 'icon-booking' },
    { label: 'Wallet', path: '/hospitality-tours/dashboard/wallet', iconClass: 'icon-wallet' },
    { label: 'Calendar', path: '/hospitality-tours/dashboard/calendar', iconClass: 'icon-calendar' },
    { label: 'Reviews', path: '/hospitality-tours/dashboard/reviews', iconClass: 'icon-reviews' },
    { label: 'Settings', path: '/hospitality-tours/dashboard/settings', iconClass: 'icon-settings' },
    { label: 'Storybook', path: '/hospitality-tours/dashboard/storybook', iconClass: 'icon-settings' },
];

export default function HTSidebar() {
    return (
        <aside className="w-64 h-full bg-white border-r border-[#D6DBD8] flex flex-col py-6 px-4 select-none flex-shrink-0 overflow-y-auto">
            {/* Top Brand Logo */}
            <div className="px-3 mb-8">
                <a href="/hospitality-tours/dashboard">
                    <img
                        src={HTLogo}
                        alt="Kadamora Hospitality & Tours"
                        className="h-10 w-auto object-contain"
                    />
                </a>
            </div>

            {/* Navigation Menu */}
            <nav className="space-y-1.5" aria-label="Main Navigation">
                {HT_NAV_ITEMS.map((item) => {
                    return (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            end={item.path === '/hospitality-tours/dashboard'}
                            className={({ isActive }) =>
                                `relative flex items-center gap-3.5 px-4 py-3 rounded-2xl font-medium text-sm transition-all duration-200 ${
                                    isActive
                                        ? 'bg-emerald-50 text-[#359F6A]'
                                        : 'text-[#093154] hover:bg-emerald-50/60 hover:text-[#359F6A]'
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    {isActive && (
                                        <span className="absolute left-0 top-1/2 -translate-y-1/2 h-10 w-[6px] rounded-full bg-emerald-500 transition-opacity opacity-100" />
                                    )}
                                   <span className="flex items-center justify-center">
                                        {item.icon ? (
                                            item.icon
                                        ) : item.iconClass ? (
                                            <span
                                                aria-hidden="true"
                                                className={`mask-icon h-[30px] w-[30px] ${item.iconClass} transition-colors duration-300 ${
                                                    isActive ? 'bg-emerald-600' : 'bg-[#98A2B3] group-hover:bg-emerald-500'
                                                }`}
                                            />
                                        ) : null}
                                    </span>
                                    <span>{item.label}</span>
                                </>
                            )}
                        </NavLink>
                    );
                })}
            </nav>
        </aside>
    );
}
