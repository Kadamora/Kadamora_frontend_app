import React, { useState } from 'react';
import CommentCard from './CommentCard';
import ImageViewer from './ImageViewer';
import PostBody from './PostBody';
import Modal from './Modal';
import { useCreateLikeUnlikePostMutation, useGetCommentsByPostIdQuery, useCreateCommentMutation } from '../../../store/api/timeline.api';

interface TimelinePost {
    id: string;
    title?: string;
    content: string;
    images?: string[];
    createdBy: {
        id: string;
        firstName: string;
        lastName: string;
        imgUrl: string | null;
    };
    likesCount: number;
    commentsCount: number;
    createdAt: string;
    updatedAt: string;
    type: string;
    // Legacy fields for backward compatibility
    user?: {
        name: string;
        avatar: string;
        role: string;
    };
    timestamp?: string;
    likes?: number;
    comments?: {
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
    }[];
    shares?: number;
    image?: string;
}

interface TimelineCardProps {
    post: TimelinePost;
    onClose?: () => void;
    onLike?: (id: number) => void;
}

const TimelineCard: React.FC<TimelineCardProps> = ({ post, onClose }) => {
    
    const [liked, setLiked] = useState(false);
    const [commentText, setCommentText] = useState('');
    const [likeCount, setLikeCount] = useState(post.likesCount ?? post.likes ?? 0);
    const [showMenu, setShowMenu] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [isModalClosing, setIsModalClosing] = useState(false);
    const [showImageViewer, setShowImageViewer] = useState(false);
    const [isImageViewerClosing, setIsImageViewerClosing] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const menuRef = React.useRef<HTMLDivElement>(null);
    const [createLikeUnlikePost] = useCreateLikeUnlikePostMutation();
    const [createComment, { isLoading: isCommenting }] = useCreateCommentMutation();
    const { data: commentsData} = useGetCommentsByPostIdQuery(
        post.id,
        { skip: !showModal }
    );

    // Map API comments to UI format
    const comments = React.useMemo(() => {
        if (!commentsData?.data) return [];
        return commentsData.data.map((c: any) => ({
            id: c.id,
            user: {
                name: `${c.user.firstName} ${c.user.lastName}`,
                avatar: c.user.imgUrl,
            },
            date: c.createdAt,
            content: c.content,
            likes: 0, // content doesn't have likes count yet
            replies: c.replies?.length || 0,
            showLike: false,
            showHeart: false,
        }));
    }, [commentsData]);

    // Computed values with fallbacks
    const user = post.createdBy ?? post.user;
    const userName = user ? `${(user as any).firstName || ''} ${(user as any).lastName || ''}`.trim() || (user as any).name || 'Unknown User' : 'Unknown User';
    const userAvatar = (user as any)?.imgUrl ?? (user as any)?.avatar ?? null;
    const postTimestamp = post.createdAt ?? post.timestamp ?? new Date().toISOString();

    const handleLike = async () => {
        try {
            await createLikeUnlikePost(post.id).unwrap();
            setLiked(!liked);
            setLikeCount(liked ? likeCount - 1 : likeCount + 1);
        } catch (error) {
            console.error("Failed to like post:", error);
        }
    };

    const handleCreateComment = async () => {
        if (!commentText.trim()) return;
        try {
            await createComment({
                postId: post.id,
                data: { content: commentText.trim() },
            }).unwrap();
            setCommentText('');
        } catch (error) {
            console.error('Failed to post comment:', error);
        }
    };

    const handleCloseModal = () => {
        setIsModalClosing(true);
        setTimeout(() => {
            setShowModal(false);
            setIsModalClosing(false);
        }, 200); // Match the animation duration
    };

    const handleCloseImageViewer = () => {
        setIsImageViewerClosing(true);
        setTimeout(() => {
            setShowImageViewer(false);
            setIsImageViewerClosing(false);
        }, 200);
    };

    const handleImageClick = (imageIndex: number) => {
        setCurrentImageIndex(imageIndex);
        setShowImageViewer(true);
    };

    const handleNextImage = () => {
        const allImages = post.images || (post.image ? [post.image] : []);
        if (currentImageIndex < allImages.length - 1) {
            setCurrentImageIndex(currentImageIndex + 1);
        }
    };

    const handlePreviousImage = () => {
        if (currentImageIndex > 0) {
            setCurrentImageIndex(currentImageIndex - 1);
        }
    };

    const handleTimelineClick = (e: React.MouseEvent) => {
        // Don't open modal if clicking on interactive elements
        const target = e.target as HTMLElement;
        if (
            target.tagName === 'BUTTON' ||
            target.tagName === 'A' ||
            target.closest('button') ||
            target.closest('a') ||
            target.closest('[role="button"]')
        ) {
            return;
        }
        setShowModal(true);
    };

    // Format date as '16 June, 2025'
    const formatDate = (timestamp: string) => {
        if (!timestamp) return '';
        const date = new Date(timestamp);
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        });
    };

    React.useEffect(() => {
        if (!showMenu) return;
        function handleClick(e: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setShowMenu(false);
            }
        }
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, [showMenu]);

    const handleMenuClick = (action: string) => {
        setShowMenu(false);
        if (action === 'Report') {
            alert('Reported!');
        } else if (action === 'Block') {
            alert('Blocked!');
        }
    };

    // Comment interaction handlers
    const handleCommentMenuClick = (commentId: string | number, action: string) => {
        console.log(`Comment ${commentId} action: ${action}`);
        // Handle comment menu actions here
    };

    const handleCommentLike = (commentId: string | number) => {
        // Optimistic update for comment likes if we interpret "Like" button as local state until API supports it
        console.log('Like comment', commentId);
    };

    const handleCommentReply = (commentId: string | number) => {
        console.log(`Reply to comment ${commentId}`);
        // Handle comment reply here
    };

    return (
        <div
            className={`bg-white rounded-2xl mb-8 overflow-hidden shadow-border cursor-pointer 
                ${!showModal ? 'hover:shadow-lg hover:bg-gray-50' : ''}`}
            onClick={handleTimelineClick}
        >
            {/* Header */}
            <div className="flex items-center px-6 pt-6 pb-2">
                <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center mr-3 shrink-0">
                    {userAvatar ? (
                        <img
                            src={userAvatar}
                            alt={userName}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                e.currentTarget.nextElementSibling?.classList.remove('hidden');
                            }}
                        />
                    ) : (
                        <span className="text-base font-semibold text-gray-600">
                             {userName
                                .split(' ')
                                .map((n: string) => n[0])
                                .join('')
                                .toUpperCase()
                                .slice(0, 2)}
                        </span>
                    )}
                     <span className="hidden text-base font-semibold text-gray-600">
                             {userName
                                .split(' ')
                                .map((n: string) => n[0])
                                .join('')
                                .toUpperCase()
                                .slice(0, 2)}
                    </span>
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                        <span className="font-semibold text-base text-gray-800 truncate">{userName}</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">{formatDate(postTimestamp)}</div>
                </div>
                <div className="flex items-center space-x-2" ref={menuRef}>
                    <div className="relative">
                        <button
                            title="More options"
                            className="w-8 h-8 flex items-center justify-center border border-[#D4D4D8] rounded-full hover:bg-gray-100 transition-colors"
                            onClick={() => setShowMenu((v) => !v)}
                        >
                            <svg
                                width="20"
                                height="20"
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
                        {showMenu && (
                            <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                                <button
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    onClick={() => handleMenuClick('Report')}
                                >
                                    Report
                                </button>
                                <button
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    onClick={() => handleMenuClick('Block')}
                                >
                                    Block
                                </button>
                            </div>
                        )}
                    </div>
                    <button
                        title="Close"
                        className="w-8 h-8 flex items-center justify-center border border-[#D4D4D8] rounded-full hover:bg-gray-100 transition-colors"
                        onClick={onClose}
                    >
                        <svg
                            width="20"
                            height="20"
                            fill="none"
                            stroke="currentColor"
                            className="text-gray-400"
                            viewBox="0 0 24 24"
                        >
                            <line x1="6" y1="6" x2="18" y2="18" strokeWidth="2" strokeLinecap="round" />
                            <line x1="6" y1="18" x2="18" y2="6" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Reused post body */}
            <PostBody
                post={post}
                liked={liked}
                likeCount={likeCount}
                onLike={handleLike}
                onOpenModal={() => setShowModal(true)}
                onImageClick={handleImageClick}
                paddingX
            />

            {/* Modal for post details and comments */}
            <Modal
                isOpen={showModal}
                isClosing={isModalClosing}
                title={post?.title || userName}
                onClose={handleCloseModal}
                footer={
                    <div className="p-4">
                        <div className="flex gap-3">
                            <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center flex-shrink-0">
                                {userAvatar ? (
                                    <img
                                        src={userAvatar}
                                        alt={userName}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.currentTarget.style.display = 'none';
                                            e.currentTarget.nextElementSibling?.classList.remove('hidden');
                                        }}
                                    />
                                ) : (
                                    <span className="text-base font-semibold text-gray-600">
                                         {userName
                                            .split(' ')
                                            .map((n: string) => n[0])
                                            .join('')
                                            .toUpperCase()
                                            .slice(0, 2)}
                                    </span>
                                )}
                                <span className="hidden text-base font-semibold text-gray-600">
                                         {userName
                                            .split(' ')
                                            .map((n: string) => n[0])
                                            .join('')
                                            .toUpperCase()
                                            .slice(0, 2)}
                                </span>
                            </div>
                            <div className="flex-1 bg-gray-50 rounded-2xl p-4 border border-[#E4E4E7]">
                                <textarea
                                    placeholder="Comment here ..."
                                    rows={2}
                                    value={commentText}
                                    onChange={(e) => setCommentText(e.target.value)}
                                    className="w-full bg-transparent placeholder:text-gray-400 outline-none resize-none text-base"
                                    onInput={(e) => {
                                        const target = e.target as HTMLTextAreaElement;
                                        target.style.height = 'auto';
                                        target.style.height = `${target.scrollHeight}px`;
                                    }}
                                />

                                <div className="flex items-center justify-between mt-3">
                                    {/* <div className="flex items-center gap-4">
                                        <button
                                            title="Add"
                                            aria-label="Add attachment"
                                            className="p-2 hover:text-gray-600 transition-colors bg-[#F4F4F4] "
                                        >
                                            <img src="/assets/icons/plus.svg" alt="Add" width="20" height="20" className="" />
                                        </button>
                                        <button
                                            title="Emoji"
                                            aria-label="Insert emoji"
                                            className="p-1 hover:text-gray-600 transition-colors"
                                        >
                                            <img src="/assets/icons/emoji.png" alt="Emoji" width="20" height="20" className="" />
                                        </button>
                                        <button
                                            title="Mention"
                                            aria-label="Mention someone"
                                            className="p-1 hover:text-gray-600 transition-colors"
                                        >
                                            <img
                                                src="/assets/icons/mention.png"
                                                alt="Mention"
                                                width="20"
                                                height="20"
                                                className=""
                                            />
                                        </button>
                                        <button
                                            title="Video"
                                            aria-label="Add video"
                                            className="p-1 hover:text-gray-600 transition-colors"
                                        >
                                            <img src="/assets/icons/video.png" alt="Video" width="20" height="20" className="" />
                                        </button>
                                        <button
                                            title="Voice"
                                            aria-label="Add voice message"
                                            className="p-1 hover:text-gray-600 transition-colors"
                                        >
                                            <img
                                                src="/assets/icons/microphone.png"
                                                alt="Microphone"
                                                width="20"
                                                height="20"
                                                className=""
                                            />
                                        </button>
                                        <button
                                            title="Document"
                                            aria-label="Add document"
                                            className="p-1 hover:text-gray-600 transition-colors"
                                        >
                                            <img
                                                src="/assets/icons/document.png"
                                                alt="Document"
                                                width="20"
                                                height="20"
                                                className=""
                                            />
                                        </button>
                                    </div> */}
                                    <div></div>
                                    <button
                                        className={`h-10 px-6 rounded-full flex items-center gap-2 text-white font-medium transition-colors ${
                                            !commentText.trim() || isCommenting
                                                ? 'bg-gray-400 cursor-not-allowed'
                                                : 'bg-[#43CC88] hover:bg-green-600'
                                        }`}
                                        title="Send comment"
                                        aria-label="Send comment"
                                        onClick={handleCreateComment}
                                        disabled={!commentText.trim() || isCommenting}
                                    >
                                        {isCommenting ? (
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        ) : (
                                            <span>Send</span>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            >
                <div className="p-8">
                    {/* Post Header (avatar, name, date) */}
                    <div className="flex items-center mb-2">
                        <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center mr-3 shrink-0">
                            {userAvatar ? (
                                <img
                                    src={userAvatar}
                                    alt={userName}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.currentTarget.style.display = 'none';
                                        e.currentTarget.nextElementSibling?.classList.remove('hidden');
                                    }}
                                />
                            ) : (
                                <span className="text-sm font-semibold text-gray-600">
                                     {userName
                                        .split(' ')
                                        .map((n: string) => n[0])
                                        .join('')
                                        .toUpperCase()
                                        .slice(0, 2)}
                                </span>
                            )}
                             <span className="hidden text-sm font-semibold text-gray-600">
                                     {userName
                                        .split(' ')
                                        .map((n: string) => n[0])
                                        .join('')
                                        .toUpperCase()
                                        .slice(0, 2)}
                            </span>
                        </div>
                        <div>
                            <div className="font-semibold text-base text-gray-800">{userName}</div>
                            <div className="text-xs text-gray-500">{formatDate(postTimestamp)}</div>
                        </div>
                    </div>

                    {/* Reuse the existing post body inside modal (non-clickable stats, no extra x-padding) */}
                    <PostBody
                        post={post}
                        liked={liked}
                        likeCount={likeCount}
                        onLike={handleLike}
                        onImageClick={handleImageClick}
                        paddingX={false}
                    />

                    {/* Recent Comments */}
                    <div className="mt-6">
                        <h3 className="text-sm font-semibold text-gray-800 mb-3">Recent Comment</h3>
                        <div className="space-y-6">
                            {comments.map((comment: any) => (
                                <CommentCard
                                    key={comment.id}
                                    comment={comment}
                                    onMenuClick={handleCommentMenuClick}
                                    onLike={handleCommentLike}
                                    onReply={handleCommentReply}
                                    formatDate={formatDate}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </Modal>

            {/* Image Viewer */}
            {showImageViewer && (
                <ImageViewer
                    isOpen={showImageViewer}
                    isClosing={isImageViewerClosing}
                    images={post.images || (post.image ? [post.image] : [])}
                    currentIndex={currentImageIndex}
                    onClose={handleCloseImageViewer}
                    onNext={handleNextImage}
                    onPrevious={handlePreviousImage}
                />
            )}
        </div>
    );
};

export default TimelineCard;
