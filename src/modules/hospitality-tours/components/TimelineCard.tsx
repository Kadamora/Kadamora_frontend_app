import React from 'react';
import { FiEye, FiClock, FiPlay } from 'react-icons/fi';
import type { TimelinePost } from '../types';

export interface TimelineCardProps {
    post: TimelinePost;
    onClick?: () => void;
    className?: string;
}

export default function TimelineCard({ post, onClick, className = '' }: TimelineCardProps) {
    return (
        <div
            onClick={onClick}
            className={`group bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden shadow-2xs hover:shadow-md transition-all cursor-pointer ${className}`}
        >
            <div className="relative aspect-video w-full bg-slate-100 overflow-hidden">
                <img
                    src={post.coverUrl}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/90 text-[#093154] flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                        <FiPlay className="h-5 w-5 ml-0.5" />
                    </div>
                </div>
                <span className="absolute top-3 left-3 bg-[#093154]/80 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-1 rounded-full">
                    {post.category}
                </span>
            </div>

            <div className="p-4">
                <h4 className="font-bold text-sm text-[#093154] line-clamp-2 group-hover:text-emerald-600 transition-colors">
                    {post.title}
                </h4>
                <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                    <span className="font-medium text-slate-700">{post.channel}</span>
                    <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                            <FiEye className="h-3.5 w-3.5" />
                            {post.views.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1">
                            <FiClock className="h-3.5 w-3.5" />
                            {post.postedAgo}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
