import React from 'react';
import { Link } from 'react-router';
import { FaRegBell } from 'react-icons/fa';
import UserMenuDropdown, { type UserMenuItem } from '@shared/components/Dashboard/UserMenuDropdown';
import { useBreadcrumbContext } from '@shared/context/BreadcrumbContext';

export interface HTNavbarProps {
    title: string;
    onToggleMobileSidebar: () => void;
    unreadCount?: number;
    onToggleNotif?: () => void;
    userName: string;
    userSubtitle?: string;
    userInitials: string;
    userImgUrl?: string | null;
    userMenuItems: UserMenuItem[];
    onUserMenuItemSelect: (item: UserMenuItem) => void;
}

export default function HTNavbar({
    title,
    onToggleMobileSidebar,
    unreadCount = 0,
    onToggleNotif,
    userName,
    userSubtitle = 'Events TV',
    userInitials,
    userImgUrl,
    userMenuItems,
    onUserMenuItemSelect,
}: HTNavbarProps) {
    const { breadcrumbs } = useBreadcrumbContext();

    return (
        <header className="sticky top-0 z-20 bg-[#F8FAFC]/90 backdrop-blur-md px-6 py-3 flex items-center justify-between">
            {/* Left Side: Title & Mobile Menu Hamburger & Dynamic Breadcrumbs */}
            <div className="flex items-center gap-3">
                <div className="flex md:hidden">
                    <button
                        type="button"
                        onClick={onToggleMobileSidebar}
                        className="items-center justify-center p-2 rounded-lg text-gray-600 hover:bg-white hover:text-gray-900 border border-gray-200 transition-colors"
                        aria-label="Open sidebar menu"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>

                <div className="flex flex-col">
                    <h1 className="text-lg sm:text-lg font-bold text-[#002E62] leading-tight">
                        {title}
                    </h1>
                    {breadcrumbs && breadcrumbs.length > 0 && (
                        <div className="flex items-center gap-1.5 text-xs text-[#71717A] font-medium leading-tight mt-0.5">
                            {breadcrumbs.map((crumb, idx) => {
                                const isLast = idx === breadcrumbs.length - 1;
                                return (
                                    <React.Fragment key={crumb.label}>
                                        {idx > 0 && <span className="text-slate-400">&gt;</span>}
                                        {crumb.path && !isLast ? (
                                            <Link
                                                to={crumb.path}
                                                className="hover:text-[#002E62] transition-colors"
                                            >
                                                {crumb.label}
                                            </Link>
                                        ) : (
                                            <span className="text-[#359F6A] font-medium">{crumb.label}</span>
                                        )}
                                    </React.Fragment>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>

            {/* Right Side: Notifications Bell & User Profile Dropdown */}
            <div className="flex items-center gap-3 sm:gap-4">
                {onToggleNotif && (
                    <button
                        type="button"
                        onClick={onToggleNotif}
                        className="relative inline-flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-[#D5E3F0] bg-white text-[#093154] hover:border-[#00D67B] transition-colors shadow-xs cursor-pointer"
                        aria-label="Notifications"
                    >
                        <FaRegBell className="h-5 w-5 text-[#093154]" />
                        {unreadCount > 0 && (
                            <span className="absolute top-1.5 right-1.5 inline-flex items-center justify-center rounded-full bg-rose-500 text-white text-[10px] leading-none h-4 px-1 font-semibold">
                                {unreadCount}
                            </span>
                        )}
                    </button>
                )}

                <UserMenuDropdown
                    name={userName}
                    subtitle={userSubtitle}
                    initials={userInitials}
                    imgUrl={userImgUrl}
                    menuItems={userMenuItems}
                    onItemSelect={onUserMenuItemSelect}
                />
            </div>
        </header>
    );
}
