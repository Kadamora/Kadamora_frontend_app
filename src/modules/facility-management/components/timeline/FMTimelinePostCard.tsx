import { useState } from 'react';
import {
    FiThumbsUp,
    FiMessageSquare,
    FiRepeat,
    FiShare2,
    FiMoreHorizontal,
    FiX,
    FiHeart,
} from 'react-icons/fi';
import type { TimelinePost } from '../../types/timeline';

export interface FMTimelinePostCardProps {
    post: TimelinePost;
    onDismiss?: (id: string) => void;
}

export default function FMTimelinePostCard({ post, onDismiss }: FMTimelinePostCardProps) {
    const [isLiked, setIsLiked] = useState(post.isLiked ?? false);
    const [likesCount, setLikesCount] = useState(post.likesCount);

    const handleToggleLike = () => {
        setIsLiked((prev) => {
            const next = !prev;
            setLikesCount((c) => (next ? c + 1 : Math.max(0, c - 1)));
            return next;
        });
    };

    return (
        <article className="rounded-2xl border border-[#E4E4E7] bg-white p-5 sm:p-6 shadow-xs space-y-4">
            {/* Post Header */}
            <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                    <img
                        src={post.author.avatar || '/assets/images/charles.png'}
                        alt={post.author.name}
                        className="h-10 w-10 rounded-full object-cover border border-slate-200 shrink-0"
                    />
                    <div>
                        <h4 className="text-sm font-bold text-[#091E42]">{post.author.name}</h4>
                        <span className="text-[11px] text-[#71717A] block">{post.author.date}</span>
                    </div>
                </div>

                {/* More & Close */}
                <div className="flex items-center gap-1 text-[#71717A]">
                    <button
                        type="button"
                        className="p-1 rounded-full hover:bg-slate-100 hover:text-[#091E42] transition-colors cursor-pointer"
                        aria-label="Post options"
                    >
                        <FiMoreHorizontal className="h-4 w-4" />
                    </button>
                    {onDismiss && (
                        <button
                            type="button"
                            onClick={() => onDismiss(post.id)}
                            className="p-1 rounded-full hover:bg-slate-100 hover:text-[#091E42] transition-colors cursor-pointer"
                            aria-label="Dismiss post"
                        >
                            <FiX className="h-4 w-4" />
                        </button>
                    )}
                </div>
            </div>

            {/* Post Content */}
            <p className="text-xs sm:text-[13px] text-[#52525B] leading-relaxed">
                {post.content}
            </p>

            {/* Single Image */}
            {post.singleImage && (
                <div className="rounded-xl overflow-hidden border border-slate-100">
                    <img
                        src={post.singleImage}
                        alt="Post media"
                        className="w-full max-h-[420px] object-cover hover:scale-[1.01] transition-transform duration-300"
                    />
                </div>
            )}

            {/* Multi-images Grid (3 images) */}
            {post.images && post.images.length >= 3 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 h-72 sm:h-80 rounded-xl overflow-hidden border border-slate-100">
                    <div className="h-full">
                        <img
                            src={post.images[0]}
                            alt="Construction site"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="grid grid-rows-2 gap-2 h-full">
                        <img
                            src={post.images[1]}
                            alt="Brick laying"
                            className="w-full h-full object-cover"
                        />
                        <img
                            src={post.images[2]}
                            alt="Building scaffold"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            )}

            {/* Reactions Count */}
            <div className="flex items-center justify-between text-xs text-[#71717A] pt-2">
                <div className="flex items-center gap-1.5">
                    <span className="flex items-center -space-x-1">
                        <span className="h-5 w-5 rounded-full bg-[#002E62] text-white flex items-center justify-center text-[10px]">
                            <FiThumbsUp className="h-2.5 w-2.5 fill-current" />
                        </span>
                        <span className="h-5 w-5 rounded-full bg-[#EF4444] text-white flex items-center justify-center text-[10px]">
                            <FiHeart className="h-2.5 w-2.5 fill-current" />
                        </span>
                    </span>
                    <span>{likesCount}</span>
                </div>
                <span>{post.commentsCount}+ Comments</span>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-4 gap-1 pt-3 border-t border-[#F1F5F9] text-xs font-semibold text-[#52525B]">
                <button
                    type="button"
                    onClick={handleToggleLike}
                    className={`flex items-center justify-center gap-2 py-2 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer ${
                        isLiked ? 'text-[#002E62] font-bold' : ''
                    }`}
                >
                    <FiThumbsUp className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
                    <span>Like</span>
                </button>

                <button
                    type="button"
                    className="flex items-center justify-center gap-2 py-2 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
                >
                    <FiMessageSquare className="h-4 w-4" />
                    <span>Comment</span>
                </button>

                <button
                    type="button"
                    className="flex items-center justify-center gap-2 py-2 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
                >
                    <FiRepeat className="h-4 w-4" />
                    <span>Repost</span>
                </button>

                <button
                    type="button"
                    className="flex items-center justify-center gap-2 py-2 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
                >
                    <FiShare2 className="h-4 w-4" />
                    <span>Share</span>
                </button>
            </div>
        </article>
    );
}
