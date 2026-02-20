import React from 'react';

interface Comment {
    id: string | number;
    user: {
        name: string;
        avatar: string | null;
    };
    date: string;
    content: string;
    likes: number;
    replies: number;
    showLike: boolean;
    showHeart: boolean;
    repliesData?: Comment[];
}

interface CommentCardProps {
    comment: Comment;
    onMenuClick?: (commentId: string | number, action: string) => void;
    onLike?: (commentId: string | number) => void;
    onReplySubmit?: (content: string, parentId: string | number) => Promise<void>;
    formatDate: (timestamp: string) => string;
    currentUserAvatar?: string | null;
    isReply?: boolean;
}

const CommentCard: React.FC<CommentCardProps> = ({ 
    comment, 
    onReplySubmit, 
    onMenuClick, 
    formatDate, 
    currentUserAvatar,
    isReply = false 
}) => {
    const [showReplyInput, setShowReplyInput] = React.useState(false);
    const [replyText, setReplyText] = React.useState('');
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    const handleReplySubmit = async () => {
        if (!replyText.trim() || !onReplySubmit) return;
        setIsSubmitting(true);
        try {
            await onReplySubmit(replyText, comment.id);
            setReplyText('');
            setShowReplyInput(false);
        } catch (error) {
            console.error('Failed to submit reply:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={`flex flex-col ${isReply ? 'ml-12 mt-2 border-l-2 border-gray-100 pl-4' : ''}`}>
            <div className="flex gap-3 p-3 rounded-xl transition-all duration-300 hover:bg-gray-50">
                <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center shrink-0">
                    {comment.user.avatar ? (
                        <img
                            src={comment.user.avatar}
                            alt={comment.user.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                e.currentTarget.nextElementSibling?.classList.remove('hidden');
                            }}
                        />
                    ) : (
                        <span className="text-sm font-medium text-gray-600">{getInitials(comment.user.name)}</span>
                    )}
                </div>
                <div className="flex-1">
                    <div className="flex items-start justify-between">
                        <div>
                            <div className="font-semibold text-base text-secondary">{comment.user.name}</div>
                            <div className="text-xs text-gray-500">{formatDate(comment.date)}</div>
                        </div>
                        <button
                            title="Comment options"
                            aria-label="Comment options"
                            className="ml-2 w-8 h-8 flex items-center justify-center border border-[#D4D4D8] rounded-full hover:bg-gray-100 transition-colors"
                            onClick={() => onMenuClick?.(comment.id, 'menu')}
                        >
                            <svg
                                width="18"
                                height="18"
                                fill="none"
                                stroke="currentColor"
                                className="text-gray-400"
                                viewBox="0 0 24 24"
                            >
                                <circle cx="5" cy="12" r="2" />
                                <circle cx="12" cy="12" r="2" />
                                <circle cx="19" cy="12" r="2" />
                            </svg>
                        </button>
                    </div>

                    <div className="mt-3 text-[#6E6D6D] text-base leading-relaxed">{comment.content}</div>

                    <div className="mt-3 flex items-center justify-between text-sm">
                        {/* Engagement Stats */}
                        <div className="flex items-center justify-start space-x-1 text-sm text-gray-500">
                            <span className="">
                                {comment.replies >= 1000 ? `${(comment.replies / 1000).toFixed(1)}k` : comment.replies}
                            </span>
                            <span>Replies</span>
                        </div>

                        <div className="flex items-center text-gray-600">
                            <span className="mx-3 inline-block h-4 w-px bg-gray-300" />
                            <button 
                                className={`hover:text-gray-800 ${showReplyInput ? 'font-medium' : ''}`}
                                onClick={() => setShowReplyInput(!showReplyInput)}
                            >
                                Comment
                            </button>
                        </div>
                    </div>

                    {/* Inline Reply Input */}
                    {showReplyInput && (
                        <div className="mt-4 flex gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                            <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center shrink-0">
                                {currentUserAvatar ? (
                                    <img src={currentUserAvatar} alt="Me" className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-xs text-gray-500">Me</span>
                                )}
                            </div>
                            <div className="flex-1">
                                <textarea
                                    autoFocus
                                    placeholder="Write a reply..."
                                    className="w-full p-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:border-blue-400 focus:ring-1 focus:ring-blue-100 outline-none resize-none"
                                    rows={2}
                                    value={replyText}
                                    onChange={(e) => setReplyText(e.target.value)}
                                />
                                <div className="mt-2 flex justify-end gap-2">
                                    <button
                                        className="px-3 py-1 text-xs text-gray-500 hover:text-gray-700 transition-colors"
                                        onClick={() => {
                                            setShowReplyInput(false);
                                            setReplyText('');
                                        }}
                                        disabled={isSubmitting}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className={`px-4 py-1 text-xs text-white rounded-full transition-all ${
                                            !replyText.trim() || isSubmitting 
                                            ? 'bg-gray-300 cursor-not-allowed' 
                                            : 'bg-primary hover:bg-primary-dark'
                                        }`}
                                        onClick={handleReplySubmit}
                                        disabled={!replyText.trim() || isSubmitting}
                                    >
                                        {isSubmitting ? 'Posting...' : 'Post'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Render nested replies if they exist */}
            {comment.repliesData && comment.repliesData.length > 0 && (
                <div className="space-y-2">
                    {comment.repliesData.map((reply) => (
                        <CommentCard
                            key={reply.id}
                            comment={reply}
                            onReplySubmit={onReplySubmit}
                            onMenuClick={onMenuClick}
                            formatDate={formatDate}
                            currentUserAvatar={currentUserAvatar}
                            isReply={true}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default CommentCard;
