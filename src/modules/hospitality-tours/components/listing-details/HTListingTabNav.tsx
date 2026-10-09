import React from 'react';
import { useNavigate } from 'react-router';
import { FiExternalLink } from 'react-icons/fi';
import type { ListingTabKey } from '../../types/listingDetailsTypes';

interface HTListingTabNavProps {
    activeTab: ListingTabKey;
    onTabChange: (tab: ListingTabKey) => void;
    tabs?: { key: ListingTabKey; label: string }[];
    viewPostUrl?: string;
}

const DEFAULT_TABS: { key: ListingTabKey; label: string }[] = [
    { key: 'about', label: 'About' },
    { key: 'gallery', label: 'Gallery' },
    { key: 'review', label: 'Review' },
];

export default function HTListingTabNav({
    activeTab,
    onTabChange,
    tabs = DEFAULT_TABS,
    viewPostUrl,
}: HTListingTabNavProps) {
    const navigate = useNavigate();

    const handleViewPostClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (viewPostUrl && viewPostUrl.startsWith('http')) {
            window.open(viewPostUrl, '_blank');
        } else {
            navigate(viewPostUrl || '/hospitality-tours/dashboard/timeline/ojude-oba-2025-horses-display');
        }
    };

    return (
        <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="inline-flex items-center gap-1 p-1 bg-[#F1F3F5] rounded-xl border border-slate-200/60">
                {tabs.map((t) => {
                    const isActive = activeTab === t.key;
                    return (
                        <button
                            key={t.key}
                            type="button"
                            onClick={() => onTabChange(t.key)}
                            className={`px-5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                                isActive
                                    ? 'bg-white text-[#101828] shadow-xs'
                                    : 'text-[#64748B] hover:text-[#101828] hover:bg-white/50'
                            }`}
                        >
                            {t.label}
                        </button>
                    );
                })}
            </div>

            {viewPostUrl && (
                <button
                    type="button"
                    onClick={handleViewPostClick}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#002E62] hover:underline cursor-pointer transition-colors"
                >
                    <span>View Post</span>
                    <FiExternalLink className="h-3.5 w-3.5" />
                </button>
            )}
        </div>
    );
}
