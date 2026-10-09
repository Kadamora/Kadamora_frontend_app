import React, { useState, useRef } from 'react';
import { FiThumbsUp, FiMapPin, FiMoreHorizontal, FiSend, FiSlash, FiFlag, FiThumbsDown } from 'react-icons/fi';
import type { TimelinePost, TimelineComment } from '../../types';
import ContextMenu from '@shared/components/ContextMenu/ContextMenu';
import { SquareArrowOutUpRight } from 'lucide-react';
import timelineUser1 from '/assets/icons/timelineUser1.svg';
import timelineUser2 from '/assets/icons/timelineUser2.svg';
import HTTimelineRelatedCard from './HTTimelineRelatedCard';

interface HTTimelinePostDetailViewProps {
    post: TimelinePost;
    relatedPosts?: TimelinePost[];
    onSelectPost?: (postId: string) => void;
}


export default function HTTimelinePostDetailView({
    post,
    relatedPosts = [],
    onSelectPost,
}: HTTimelinePostDetailViewProps) {
    const idCounter = useRef(0);
    const nextId = () => `id-${++idCounter.current}`;

    const [likesCount, setLikesCount] = useState(post.likesCount || 1240);
    const [hasLiked, setHasLiked] = useState(false);
    const [comments, setComments] = useState<TimelineComment[]>(post.comments || []);
    const [newCommentText, setNewCommentText] = useState('');
    const [replyingToId, setReplyingToId] = useState<string | null>(null);
    const [replyText, setReplyText] = useState('');

    const handleToggleLike = () => {
        if (hasLiked) {
            setLikesCount((prev) => prev - 1);
            setHasLiked(false);
        } else {
            setLikesCount((prev) => prev + 1);
            setHasLiked(true);
        }
    };

    const handleAddComment = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newCommentText.trim()) return;

        const newComment: TimelineComment = {
            id: `c-${nextId()}`,
            authorName: 'Charles John',
            authorHandle: '@Charlesjohn',
            postedAgo: 'Just now',
            body: newCommentText.trim(),
        };

        setComments([newComment, ...comments]);
        setNewCommentText('');
    };

    const handleSendReply = (commentId: string) => {
        if (!replyText.trim()) return;

        const replyComment: TimelineComment = {
            id: `reply-${nextId()}`,
            authorName: 'Charles John',
            authorHandle: '@Charlesjohn',
            postedAgo: 'Just now',
            body: replyText.trim(),
        };

        // Insert reply right after the comment being replied to
        const idx = comments.findIndex((c) => c.id === commentId);
        if (idx !== -1) {
            const updated = [...comments];
            updated.splice(idx + 1, 0, replyComment);
            setComments(updated);
        } else {
            setComments([...comments, replyComment]);
        }

        setReplyText('');
        setReplyingToId(null);
    };

    const handleCancelReply = () => {
        setReplyText('');
        setReplyingToId(null);
    };

    const formatViews = (count: number) => {
        if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`;
        if (count >= 1_000) return `${(count / 1_000).toFixed(1)}K`;
        return count.toString();
    };

    /** Shared menu items for comment and related post dropdowns */
    const getContextMenuItems = () => [
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

    const heroImages = post.heroImages || [
        post.coverUrl,
        'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80',
    ];
    const actionButtons = [
        {
            id: 'like',
            label: `Like (${likesCount})`,
            icon: FiThumbsUp,
            onClick: handleToggleLike,
        },
        {
            id: 'location',
            label: 'Location',
            icon: FiMapPin,
            onClick: () => {
                // Add your location handler here
            },
        },
        {
            id: 'share',
            label: 'Share',
            icon: SquareArrowOutUpRight,
            onClick: () => alert('Share link copied to clipboard!'),
        },
    ];

    return (
        <div className="space-y-4 max-w-7xl mx-auto pb-12">
            {/* Top Page Title */}
            <div>
                <h1 className="text-2xl sm:text-3xl font-semibold text-[#002E62]">{post.title}</h1>
            </div>

            {/* Top Dual Media Showcase matching Screenshot 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-13 gap-4 sm:gap-6">
                {/* Main Hero Media (Left, 7 cols on lg) */}
                <div className="lg:col-span-8 h-64 sm:h-80 md:h-[350px] rounded-t-md overflow-hidden shadow-sm relative bg-slate-100">
                    <img
                        src={heroImages[0]}
                        alt={post.title}
                        className="w-full h-full "
                    />
                </div>
                {/* Secondary Media (Right, 5 cols on lg) */}
                <div className="lg:col-span-5 h-64 sm:h-80 md:h-[350px] rounded-t-md overflow-hidden shadow-sm relative bg-slate-100 hidden sm:block">
                    <img
                        src={heroImages[1] || heroImages[0]}
                        alt={`${post.title} showcase`}
                        className="w-full h-full "
                    />
                </div>
            </div>

            {/* Main Content Layout (Left: Post Details & Comments | Right: Related Events) */}
            <div className="grid grid-cols-1 lg:grid-cols-13 gap-6 items-start pt-2">
                {/* Left Column (~65% / 7 cols on lg) */}
                <div className="lg:col-span-8 px-4">
                    {/* Post Content Header */}
                    <div className="space-y-2">
                        <h2 className="text-xl sm:text-2xl font-semibold text-[#002E62]">{post.title}</h2>
                        <p className="text-xs sm:text-sm text-[#4A5565] leading-relaxed">
                            {post.description ||
                                'The Ojude Oba Festival is an annual cultural celebration that brings together the Ijebu people of Ogun State to honor their king, the Awujale.'}
                        </p>

                        {/* Publisher Channel Row */}
                        <div className="flex items-center gap-2 pt-1">
                            <div className="h-10 w-10 rounded-full bg-[#EBF3FF] border border-[#BFDBFE] text-[#002E62] font-bold text-xs flex items-center justify-center shrink-0">
                                {post.channel.slice(0, 2).toUpperCase()}
                            </div>
                            <div>
                                <h4 className="text-xs sm:text-sm font-semibold text-[#52525B]">
                                    {post.channel}
                                </h4>
                                <p className="text-[11px] sm:text-xs text-[#52525B]">
                                    {formatViews(post.views)} Views • {post.postedAgo}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Action Bar (Like, Location, Share & Comment Count) */}
                    <div className="flex items-center justify-between py-3 gap-3 flex-wrap">
                        <div className="flex items-center gap-3">
                            {/* Like Pill & Actions */}
                            {actionButtons.map(({ id, label, icon: Icon, onClick }) => {
                                const isLike = id === 'like';
                                return (
                                    <button
                                        key={id}
                                        type="button"
                                        onClick={onClick}
                                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#99C7FB] bg-[#E6F1FE] text-[#52525B] text-xs font-semibold hover:bg-[#d8e9fd] transition-colors cursor-pointer"
                                    >
                                        <Icon className={`h-4 w-4 transition-colors ${isLike && hasLiked ? 'text-[#5D80FF] fill-[#5D80FF]' : ''}`} />
                                        <span>{label}</span>
                                    </button>
                                );
                            })}


                        </div>

                        {/* Comments Count */}
                        <div className="text-xs sm:text-sm font-medium text-[#52525B]">
                            {comments.length} + Comments
                        </div>
                    </div>

                    {/* Comments Section */}
                    <div className="space-y-6 pt-2">
                        {/* Add Comment Input Form */}
                        <form onSubmit={handleAddComment} className="flex items-center gap-3">
                            <div className="">
                                <img src={timelineUser1} alt="" />
                            </div>
                            <div className="relative flex-1">
                                <input
                                    type="text"
                                    placeholder="Add a comment"
                                    value={newCommentText}
                                    onChange={(e) => setNewCommentText(e.target.value)}
                                    className="w-full pl-4 pr-10 py-2.5 bg-[#F8FAFC] border-b border-[#E4E4E7] text-xs sm:text-sm focus:outline-none focus:bg-white focus:border-[#002E62] transition-colors"
                                />
                                <button
                                    type="submit"
                                    disabled={!newCommentText.trim()}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#002E62] disabled:opacity-30 cursor-pointer"
                                >
                                    <FiSend className="h-4 w-4" />
                                </button>
                            </div>
                        </form>

                        {/* Comments List */}
                        <div className="space-y-6">
                            {comments.map((comment) => (
                                <div key={comment.id} className="space-y-3">
                                    {/* Comment Row */}
                                    <div className="flex items-start gap-3">
                                        <div className="">
                                            <img src={timelineUser2} alt="coment user" />
                                        </div>
                                        <div className="flex justify-between w-full gap-2 ">
                                            <div>
                                                <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2 text-xs">
                                                    <span className="font-semibold text-[#52525B] text-sm">
                                                        {comment.authorHandle}
                                                    </span>
                                                    <span className="text-[#52525B]">• {comment.postedAgo}</span>
                                                </div>

                                              
                                            </div>
                                            <p className="text-xs sm:text-sm text-[#71717A] leading-relaxed">
                                                {comment.body}
                                            </p>
                                            <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 pt-1">
                                                <button
                                                    type="button"
                                                    className="hover:text-[#002E62] flex items-center gap-1 cursor-pointer"
                                                >
                                                    <FiThumbsUp className="h-3.5 w-3.5" />
                                                    {comment.likesCount && <span>{comment.likesCount}</span>}
                                                </button>
                                                <button
                                                    type="button"
                                                    className="hover:text-[#002E62] flex items-center gap-1 cursor-pointer"
                                                >
                                                    <FiThumbsDown className="h-3.5 w-3.5" />
                                                    {comment.likesCount && <span>{comment.likesCount}</span>}
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setReplyingToId(
                                                            replyingToId === comment.id ? null : comment.id,
                                                        )
                                                    }
                                                    className="hover:text-[#002E62] cursor-pointer"
                                                >
                                                    Reply
                                                </button>
                                            </div>
                                            </div>
                                              {/* Comment Options Dropdown */}
                                                <ContextMenu
                                                    trigger={
                                                        <span className="text-slate-400 hover:text-slate-600  border border-[#D4D4D8] h-7 w-7 flex items-center justify-center rounded-full">
                                                            <FiMoreHorizontal className="h-4 w-4" />
                                                        </span>
                                                    }
                                                    items={getContextMenuItems()}
                                                />
                                        </div>
                                    </div>

                                    {/* Inline Reply Form (shown when Reply is clicked) */}
                                    {replyingToId === comment.id && (
                                        <div className="ml-12 space-y-2">
                                            <div className="flex items-center gap-3">
                                                <div className="h-7 w-7 rounded-full bg-[#002E62] text-white font-bold text-[10px] flex items-center justify-center shrink-0">
                                                    CJ
                                                </div>
                                                <span className="text-xs text-slate-500">Add a comment</span>
                                            </div>
                                            <input
                                                type="text"
                                                autoFocus
                                                value={replyText}
                                                onChange={(e) => setReplyText(e.target.value)}
                                                placeholder={`Reply to ${comment.authorHandle}...`}
                                                className="w-full pl-4 pr-4 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs sm:text-sm focus:outline-none focus:bg-white focus:border-[#002E62] transition-colors"
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter') {
                                                        e.preventDefault();
                                                        handleSendReply(comment.id);
                                                    }
                                                }}
                                            />
                                            <div className="flex items-center gap-2 pt-1">
                                                <button
                                                    type="button"
                                                    onClick={handleCancelReply}
                                                    className="px-4 py-1.5 text-xs font-semibold text-[#52525B] hover:text-[#101828] transition-colors cursor-pointer"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => handleSendReply(comment.id)}
                                                    disabled={!replyText.trim()}
                                                    className="px-4 py-1.5 bg-[#002E62] hover:bg-[#072440] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                                                >
                                                    Send
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column (~35% / 5 cols on lg) — Related Events */}
                <div className="lg:col-span-5 space-y-4">
                    <h3 className="text-xl sm:text-2xl font-semibold text-[#002E62]">Related Events</h3>

                    <div className="space-y-3">
                        {relatedPosts.slice(0, 4).map((rel) => (
                            <HTTimelineRelatedCard
                                key={rel.id}
                                post={rel}
                                onClick={() => onSelectPost?.(rel.id)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
