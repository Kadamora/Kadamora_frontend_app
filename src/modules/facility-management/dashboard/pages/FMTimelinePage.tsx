import { useState, useMemo } from 'react';
import PageHeader from '@shared/components/Dashboard/PageHeader';
import FloatingChatButton from '@shared/components/Dashboard/FloatingChatButton';
import FMTimelinePostCard from '../../components/timeline/FMTimelinePostCard';
import FMTimelineMarketplaceFeed from '../../components/timeline/FMTimelineMarketplaceFeed';
import FMTimelineAnnouncementsWidget from '../../components/timeline/FMTimelineAnnouncementsWidget';
import FMTimelineLiveWidget from '../../components/timeline/FMTimelineLiveWidget';
import FMTimelineAdsWidget from '../../components/timeline/FMTimelineAdsWidget';
import FMCreatePostModal from '../../components/timeline/FMCreatePostModal';
import { mockTimelinePosts } from '../../data/timelineMock';
import type { TimelinePost } from '../../types/timeline';
import { FiSearch, FiSliders } from 'react-icons/fi';
import { showSuccessToast } from '@shared/components/Toast/Toast';

export default function FMTimelinePage() {
    const [posts, setPosts] = useState<TimelinePost[]>(mockTimelinePosts);
    const [activeTab, setActiveTab] = useState<'Activity Feed' | 'Announcements' | 'Events'>(
        'Activity Feed'
    );
    const [searchQuery, setSearchQuery] = useState('');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const handleCreatePost = (data: { title: string; content: string; image?: string }) => {
        const newPost: TimelinePost = {
            id: `post-${Date.now()}`,
            author: {
                name: 'Charles John',
                avatar: '/assets/images/charles.png',
                role: 'Resident',
                date: 'Just now',
            },
            content: data.content,
            singleImage: data.image,
            likesCount: 0,
            commentsCount: 0,
            sharesCount: 0,
            isLiked: false,
            type: activeTab === 'Announcements' ? 'announcement' : activeTab === 'Events' ? 'event' : 'general',
        };

        setPosts((prev) => [newPost, ...prev]);
        showSuccessToast('Post Published', 'Your update is now live on the community timeline.');
    };

    const handleDismissPost = (id: string) => {
        setPosts((prev) => prev.filter((p) => p.id !== id));
    };

    const filteredPosts = useMemo(() => {
        return posts.filter((post) => {
            const matchesSearch =
                !searchQuery.trim() ||
                post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.author.name.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesSearch;
        });
    }, [posts, searchQuery]);

    return (
        <div className="space-y-6 pb-12">
            {/* Header: Title and Breadcrumbs */}
            <PageHeader
                title="Community Timeline"
                crumbs={[
                    { label: 'Home', path: '/facility-management/dashboard' },
                    { label: 'Community Timeline' },
                ]}
            />

            {/* Main 2-Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                {/* Left Stream: Posts & In-Feed Marketplace (Image 1) */}
                <div className="lg:col-span-8 space-y-6">
                    {/* Create Post Card */}
                    <div className="rounded-2xl border border-[#E4E4E7] bg-white p-4 sm:p-5 shadow-xs space-y-4">
                        <div className="flex items-center gap-3">
                            <img
                                src="/assets/images/charles.png"
                                alt="User avatar"
                                className="h-10 w-10 rounded-full object-cover border border-slate-200 shrink-0"
                            />
                            <button
                                type="button"
                                onClick={() => setIsCreateModalOpen(true)}
                                className="flex-1 text-left rounded-xl border border-[#D4D4D8] bg-white hover:bg-slate-50 px-4 py-2.5 text-xs sm:text-sm text-[#71717A] transition-colors cursor-pointer"
                            >
                                {activeTab === 'Activity Feed'
                                    ? 'Start a post'
                                    : activeTab === 'Announcements'
                                    ? 'Start an announcement'
                                    : 'Start an event'}
                            </button>
                        </div>

                        {/* Sub-filter Tabs */}
                        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-[#F1F5F9]">
                            <button
                                type="button"
                                onClick={() => setActiveTab('Activity Feed')}
                                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                                    activeTab === 'Activity Feed'
                                        ? 'bg-[#F3F9FF] border border-[#CCE3FD] text-[#002E62]'
                                        : 'bg-white border border-[#E4E4E7] text-[#71717A] hover:bg-slate-50'
                                }`}
                            >
                                Activity Feed
                            </button>
                            <button
                                type="button"
                                onClick={() => setActiveTab('Announcements')}
                                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                                    activeTab === 'Announcements'
                                        ? 'bg-[#F2EAFA] border border-[#C9A9E9] text-[#6020A0]'
                                        : 'bg-white border border-[#E4E4E7] text-[#71717A] hover:bg-slate-50'
                                }`}
                            >
                                Announcements
                            </button>
                            <button
                                type="button"
                                onClick={() => setActiveTab('Events')}
                                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                                    activeTab === 'Events'
                                        ? 'bg-[#E8FAF0] border border-[#A2E9C1] text-[#0E793C]'
                                        : 'bg-white border border-[#E4E4E7] text-[#71717A] hover:bg-slate-50'
                                }`}
                            >
                                Events
                            </button>
                        </div>
                    </div>

                    {/* Timeline Stream Header & Search */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <h3 className="text-base sm:text-lg font-bold text-[#091E42]">All Timeline</h3>

                        <div className="flex items-center gap-2">
                            <div className="relative flex-1 sm:w-64">
                                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-3.5 w-3.5" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search ..."
                                    className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-[#BED3EB] bg-white text-xs text-[#091E42] placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#002E62]"
                                />
                            </div>

                            <button
                                type="button"
                                className="p-2 rounded-lg border border-[#BED3EB] text-[#093154] hover:bg-slate-50 transition-colors cursor-pointer shrink-0"
                                aria-label="Filter timeline"
                            >
                                <FiSliders className="h-3.5 w-3.5" />
                            </button>
                        </div>
                    </div>

                    {/* Stream Posts with In-feed Marketplace section (Image 1) */}
                    <div className="space-y-6">
                        {filteredPosts.map((post, index) => (
                            <div key={post.id} className="space-y-6">
                                <FMTimelinePostCard post={post} onDismiss={handleDismissPost} />

                                {/* Insert In-Feed Marketplace Carousel after post 2 */}
                                {index === 1 && <FMTimelineMarketplaceFeed />}
                            </div>
                        ))}

                        {filteredPosts.length === 0 && (
                            <div className="py-16 text-center text-slate-400 bg-white rounded-2xl border border-[#E4E4E7]">
                                <p className="text-sm font-medium">No timeline posts found matching your search.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Widgets Column (Image 1) */}
                <div className="lg:col-span-4 space-y-6">
                    <FMTimelineAnnouncementsWidget />
                    <FMTimelineLiveWidget />
                    <FMTimelineAdsWidget />
                </div>
            </div>

            {/* Create Post Modal */}
            <FMCreatePostModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                postType={activeTab}
                onSubmitPost={handleCreatePost}
            />

            {/* Floating Chat Support FAB */}
            <FloatingChatButton />
        </div>
    );
}
