import React from 'react';
import { Link } from 'react-router';
import { FaRegBell } from 'react-icons/fa';
import UserMenuDropdown, { type UserMenuItem } from './UserMenuDropdown';

export interface DashboardHeaderProps {
    sidebarOpen: boolean;
    onToggleSidebar: () => void;
    logoUrl?: string;
    logoAlt?: string;
    logoLink?: string;
    searchValue?: string;
    onSearchChange?: (value: string) => void;
    searchPlaceholder?: string;
    unreadCount?: number;
    onToggleNotif?: () => void;
    userName: string;
    userEmail: string;
    userInitials: string;
    userImgUrl?: string | null;
    userMenuItems: UserMenuItem[];
    onUserMenuItemSelect: (item: UserMenuItem) => void;
    customLogoNode?: React.ReactNode;
}

export default function DashboardHeader({
    sidebarOpen,
    onToggleSidebar,
    logoUrl = '/assets/logo/logo-small-black.png',
    logoAlt = 'Kadamora Logo',
    logoLink = '/dashboard/property-listing',
    searchValue = '',
    onSearchChange,
    searchPlaceholder = 'Search anything',
    unreadCount = 0,
    onToggleNotif,
    userName,
    userEmail,
    userInitials,
    userImgUrl,
    userMenuItems,
    onUserMenuItemSelect,
    customLogoNode,
}: DashboardHeaderProps) {
    return (
        <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-[#E4E7EC]/60">
            <div className="mx-auto flex h-[70px] max-w-[1240px] w-full items-center px-3 md:px-6">
                {/* Sidebar Hamburger Button */}
                <button
                    type="button"
                    onClick={onToggleSidebar}
                    aria-label={sidebarOpen ? 'Close navigation menu' : 'Open navigation menu'}
                    aria-controls="dashboard-sidebar"
                    data-expanded={sidebarOpen ? 'true' : 'false'}
                    className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white shadow hover:bg-emerald-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40 transition-colors"
                >
                    {sidebarOpen ? (
                        <svg
                            className="h-6 w-6 transition-transform duration-300 rotate-90"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M6 18L18 6" />
                        </svg>
                    ) : (
                        <svg
                            className="h-6 w-6 transition-transform duration-300"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h10" />
                        </svg>
                    )}
                </button>

                {/* Header Logo */}
                <div className="hidden lg:flex items-center gap-2 shrink-0 ml-4">
                    {customLogoNode ? (
                        customLogoNode
                    ) : (
                        <Link to={logoLink}>
                            <img src={logoUrl} alt={logoAlt} className="h-10 w-auto object-contain" />
                        </Link>
                    )}
                </div>

                {/* Search Bar */}
                {onSearchChange && (
                    <div className="relative flex-1 hidden md:block ml-6 max-w-md">
                        <svg
                            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#98A2B3]"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.2-5.2" />
                            <circle cx="11" cy="11" r="7" />
                        </svg>
                        <input
                            value={searchValue}
                            onChange={(e) => onSearchChange(e.target.value)}
                            placeholder={searchPlaceholder}
                            className="w-full rounded-lg border border-[#AFC7B9] bg-white pl-9 pr-3 py-2 text-sm focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/30 outline-none transition"
                        />
                    </div>
                )}

                {/* Right Actions Cluster */}
                <div className="ml-auto flex items-center gap-3 md:gap-4">
                    {onToggleNotif && (
                        <button
                            type="button"
                            onClick={onToggleNotif}
                            className="relative inline-flex h-11 w-11 md:h-12 md:w-12 items-center justify-center rounded-full border border-[#AFC7B9] bg-white text-[#093154] hover:text-emerald-600 hover:border-emerald-400 transition shadow-xs"
                            aria-label="Notifications"
                        >
                            <FaRegBell className="h-5 w-5 md:h-6 md:w-6" />
                            {unreadCount > 0 && (
                                <span className="absolute top-2 right-2 inline-flex items-center justify-center rounded-full bg-rose-500 text-white text-[10px] leading-none h-4 px-1 font-semibold">
                                    {unreadCount}
                                </span>
                            )}
                        </button>
                    )}

                    <UserMenuDropdown
                        name={userName}
                        email={userEmail}
                        initials={userInitials}
                        imgUrl={userImgUrl}
                        menuItems={userMenuItems}
                        onItemSelect={onUserMenuItemSelect}
                    />
                </div>
            </div>
        </header>
    );
}
