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
}

interface CommentCardProps {
    comment: Comment;
    onMenuClick?: (commentId: string | number, action: string) => void;
    onLike?: (commentId: string | number) => void;
    onReply?: (commentId: string | number) => void;
    formatDate: (timestamp: string) => string;
}

const CommentCard: React.FC<CommentCardProps> = ({ comment, onMenuClick, onLike, onReply, formatDate }) => {
    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <div className="flex gap-3 p-3 rounded-xl transition-all duration-300 hover:bg-gray-50 cursor-pointer">
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
                 {/* Fallback for error case if needed, or just handle via condition above. 
                     Actually simpler: just render conditionally. 
                     If onError triggers, we can't easily switch to text without state. 
                     For simplicity effectively: assume valid URL or null. 
                     If null, show initials. */}
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
                        <button 
                            className={`hover:text-gray-800 ${comment.showLike ? 'text-blue-600 font-medium' : ''}`} 
                            onClick={() => onLike?.(comment.id)}
                        >
                            Like
                        </button>
                        <span className="mx-3 inline-block h-4 w-px bg-gray-300" />
                        <button className="hover:text-gray-800" onClick={() => onReply?.(comment.id)}>
                            Reply
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommentCard;
