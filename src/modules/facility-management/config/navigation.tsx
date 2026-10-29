import type { DashboardNavItem } from '@shared/components/Dashboard/DashboardSidebar';
import type { UserMenuItem } from '@shared/components/Dashboard/UserMenuDropdown';
import { FiUser, FiCreditCard, FiHelpCircle, FiLogOut } from 'react-icons/fi';

export const fmNavItems: DashboardNavItem[] = [
    {
        label: 'All Services',
        to: '/dashboard',
        end: true,
        iconClass: 'icon-services',
    },
    {
        label: 'Dashboard',
        to: '/facility-management/dashboard',
        end: true,
        iconClass: 'icon-dashboard',
    },
    {
        label: 'Timeline',
        to: '/facility-management/dashboard/timeline',
        iconClass: 'icon-fm-timeline',
    },
    {
        label: 'Property Management',
        to: '/facility-management/dashboard/property-management',
        iconClass: 'icon-fm-property',
    },
    {
        label: 'Energy & Parking Mgt',
        to: '/facility-management/dashboard/energy-parking',
        iconClass: 'icon-fm-energy',
    },
    {
        label: 'Commercial Facilities',
        to: '/facility-management/dashboard/commercial-facilities',
        iconClass: 'icon-fm-commercial',
    },
    {
        label: 'Communication',
        to: '/facility-management/dashboard/communication',
        iconClass: 'icon-fm-chat',
    },
    {
        label: 'Services',
        to: '/facility-management/dashboard/services',
        iconClass: 'icon-fm-services',
    },
    {
        label: 'Marketplace',
        to: '/facility-management/dashboard/marketplace',
        iconClass: 'icon-fm-market',
    },
    {
        label: 'Subscription',
        to: '/facility-management/dashboard/subscription',
        iconClass: 'icon-fm-sub',
    },
    {
        label: 'Settings',
        to: '/facility-management/dashboard/settings',
        iconClass: 'icon-fm-settings',
    },
];

export const fmUserMenuItems: UserMenuItem[] = [
    {
        label: 'All Services',
        icon: <img src="/assets/icons/services.svg" alt="All Services" className="h-5 w-5" />,
        path: '/dashboard',
    },
    {
        label: 'Profile',
        icon: <FiUser className="h-5 w-5 text-[#12B76A]" strokeWidth={2} />,
        path: '/dashboard/profile',
    },
    {
        label: 'My Wallet',
        icon: <FiCreditCard className="h-5 w-5 text-[#12B76A]" strokeWidth={2} />,
        path: '/hospitality-tours/dashboard/wallet',
    },
    {
        label: 'Help Center',
        icon: <FiHelpCircle className="h-5 w-5 text-[#12B76A]" strokeWidth={2} />,
        path: '/help',
    },
    {
        label: 'Sign Out',
        icon: <FiLogOut className="h-5 w-5 text-[#12B76A]" strokeWidth={2} />,
        action: 'signout',
    },
];
