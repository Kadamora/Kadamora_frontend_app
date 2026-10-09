import React from 'react';
import { FiMoreHorizontal, FiSlash, FiFlag } from 'react-icons/fi';
import type { TimelinePost } from '../../types';
import ContextMenu from '@shared/components/ContextMenu/ContextMenu';

export interface HTTimelineRelatedCardProps {
    post: TimelinePost;
    onClick?: () => void;
    className?: string;
}

function formatViews(count: number): string {
    if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`;
    if (count >= 1_000) return `${(count / 1_000).toFixed(1)}K`;
    return count.toString();
}

export default function HTTimelineRelatedCard({
    post,
    onClick,
    className = '',
}: HTTimelineRelatedCardProps) {
    const contextMenuItems = [
        {
            label: 'Not Interested',
            icon: <FiSlash className="h-4 w-4" />,
            onClick: () => alert('Marked as not interested'),
        },
        {
            label: 'Report',
            icon: <FiFlag className="h-4 w-4" />,
            onClick: () => alert('Report submitted'),
        },
    ];

    return (
        <div
            onClick={onClick}
            className={`flex items-start justify-between gap-3 py-1 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group ${className}`}
        >
            <div className="flex items-center gap-3.5 flex-1 min-w-0 ">
                {/* Thumbnail */}
                <div className="relative w-36 sm:w-48 h-28 rounded-[12px] overflow-hidden shrink-0 bg-slate-100">
                    <img
                        src={post.coverUrl}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute bottom-1.5 right-1.5 bg-[#52525B]/90 backdrop-blur-xs text-white text-[11px] font-medium px-2 py-0.5 rounded-[8px]">
                        {post.durationLabel || '20:08'}
                    </span>
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1 space-y-0.5">
                    <h4 className="text-sm sm:text-[15px] font-semibold text-[#002E62] truncate group-hover:text-[#072440] transition-colors">
                        {post.title}
                    </h4>
                    <p className="text-xs sm:text-[13px] text-[#52525B] truncate">
                        {post.channel}
                    </p>
                    <p className="text-xs text-[#71717A] truncate">
                        {formatViews(post.views)} Views • {post.postedAgo}
                    </p>
                    {post.isNew && (
                        <div className="pt-1">
                            <span className="inline-block px-3 py-1 bg-[#ECECF0] text-[#18181B] text-xs font-medium rounded-[6px] border border-[#0000001A]">
                                New
                            </span>
                        </div>
                    )}
                </div>
            </div>

            {/* Options Dropdown */}
            <div
                onClick={(e) => {
                    e.stopPropagation();
                }}
                className="shrink-0 pl-1"
            >
                <ContextMenu
                    trigger={
                        <button
                            type="button"
                            className="h-8 w-8 rounded-full mt-1 border border-[#D4D4D8] flex items-center justify-center text-[#71717A] hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                            aria-label="Options"
                        >
                            <FiMoreHorizontal className="h-4 w-4" />
                        </button>
                    }
                    items={contextMenuItems}
                />
            </div>
        </div>
    );
}
