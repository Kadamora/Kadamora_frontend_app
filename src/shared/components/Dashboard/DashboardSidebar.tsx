import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router';

export interface DashboardNavItem {
    label: string;
    to: string;
    iconClass?: string;
    iconUrl?: string;
    icon?: React.ReactNode | ((active: boolean) => React.ReactNode);
    /** Only mark active on an exact path match (use for module root routes). */
    end?: boolean;
}

export interface DashboardSidebarProps {
    isOpen: boolean;
    onClose: () => void;
    logoUrl?: string;
    logoAlt?: string;
    logoLink?: string;
    navItems: DashboardNavItem[];
    customLogoNode?: React.ReactNode;
}

export default function DashboardSidebar({
    isOpen,
    onClose,
    logoUrl = '/assets/logo/logo-small-black.png',
    logoAlt = 'Kadamora Logo',
    logoLink = '/dashboard',
    navItems,
    customLogoNode,
}: DashboardSidebarProps) {
    const location = useLocation();
    const [sidebarAnimating, setSidebarAnimating] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setSidebarAnimating(true);
            const t = setTimeout(() => setSidebarAnimating(false), 600);
            return () => clearTimeout(t);
        }
    }, [isOpen]);

    const isNavItemActive = (item: DashboardNavItem) => {
        const path = item.to;
        if (item.end) {
            return location.pathname === path;
        }
        if (path === '/dashboard' || path === '/dashboard/home') {
            return location.pathname === '/dashboard' || location.pathname === '/dashboard/home';
        }
        return location.pathname === path || location.pathname.startsWith(path + '/');
    };

    return (
        <>
            {/* Sidebar Panel */}
            <aside
                id="dashboard-sidebar"
                className={`sidebar-panel fixed inset-y-0 left-0 z-40 w-[300px] flex flex-col overflow-y-auto hide-scrollbar border-r border-[#E4E7EC] bg-white px-6 pt-6 pb-8 shadow-sm transition-transform duration-300 ease-[cubic-bezier(.4,.0,.2,1)] will-change-transform ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                } ${isOpen && sidebarAnimating ? 'sidebar-opening' : ''}`}
            >
                <div className="w-full">
                    <div className="flex items-center gap-3 mb-10 sticky top-0 bg-white pt-2">
                        {customLogoNode ? (
                            customLogoNode
                        ) : (
                            <Link to={logoLink}>
                                <img src={logoUrl} alt={logoAlt} className="h-10 w-auto object-contain" />
                            </Link>
                        )}
                    </div>

                    <nav className="space-y-2" aria-label="Primary Navigation">
                        {navItems.map((item) => {
                            const active = isNavItemActive(item);
                            return (
                                <Link
                                    key={item.to}
                                    to={item.to}
                                    onClick={onClose}
                                    className={`menu-link group relative flex items-center gap-3 rounded-xl px-5 py-3 font-medium transition ${
                                        active
                                            ? 'bg-emerald-50 text-[#359F6A]'
                                            : 'text-[#093154] hover:bg-emerald-50/60 hover:text-[#359F6A]'
                                    }`}
                                >
                                    <span
                                        className={`absolute left-0 top-1/2 -translate-y-1/2 h-10 w-[6px] rounded-full bg-emerald-500 transition-opacity ${
                                            active ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'
                                        }`}
                                    />
                                    <span className="flex items-center justify-center">
                                        {typeof item.icon === 'function' ? (
                                            item.icon(active)
                                        ) : item.icon ? (
                                            item.icon
                                        ) : item.iconUrl ? (
                                            <span
                                                aria-hidden="true"
                                                style={{
                                                    WebkitMaskImage: `url(${item.iconUrl})`,
                                                    maskImage: `url(${item.iconUrl})`,
                                                }}
                                                className={`mask-icon h-[26px] w-[26px] transition-colors duration-300 ${
                                                    active ? 'bg-[#359F6A]' : 'bg-[#093154] group-hover:bg-[#359F6A]'
                                                }`}
                                            />
                                        ) : item.iconClass ? (
                                            <span
                                                aria-hidden="true"
                                                className={`mask-icon h-[26px] w-[26px] ${item.iconClass} transition-colors duration-300 ${
                                                    active ? 'bg-[#359F6A]' : 'bg-[#093154] group-hover:bg-[#359F6A]'
                                                }`}
                                            />
                                        ) : null}
                                    </span>
                                    <span>{item.label}</span>
                                </Link>
                            );
                        })}
                    </nav>
                </div>
            </aside>

            {/* Backdrop overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black/30 backdrop-blur-[2px]"
                    onClick={onClose}
                    aria-hidden="true"
                />
            )}
        </>
    );
}
