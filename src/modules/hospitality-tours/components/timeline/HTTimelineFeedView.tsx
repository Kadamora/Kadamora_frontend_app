import React, { useState, useMemo } from 'react';
import { FiSearch, FiPlus } from 'react-icons/fi';
import Input from '@shared/components/Forms/Input';
import type { TimelinePost } from '../../types';
import HTTimelineFeedCard from './HTTimelineFeedCard';
import HTNewPostModal from './HTNewPostModal';
import WelcomeBanner from '../WelcomeBanner';
import HTButton from '../HTButton';
import HTFilterTabs from '../HTFilterTabs';

interface HTTimelineFeedViewProps {
    posts: TimelinePost[];
    onSelectPost: (postId: string) => void;
    onMakePost?: () => void;
}

const CATEGORY_FILTERS = [
    { key: 'all', label: 'All' },
    { key: 'Events', label: 'Events' },
    { key: 'Festival', label: 'Festival' },
    { key: 'Season', label: 'Season' },
    { key: 'Documentary', label: 'Documentary' },
    { key: 'Gist', label: 'Gist' },
    { key: 'Interview', label: 'Interview' },
];

export default function HTTimelineFeedView({
    posts,
    onSelectPost,
    onMakePost,
}: HTTimelineFeedViewProps) {
    const [localPosts, setLocalPosts] = useState<TimelinePost[]>(posts);
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [isNewPostModalOpen, setIsNewPostModalOpen] = useState(false);

    const filteredPosts = useMemo(() => {
        return localPosts.filter((post) => {
            const matchesCat =
                selectedCategory === 'all' ||
                post.category.toLowerCase() === selectedCategory.toLowerCase();
            const matchesSearch =
                post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.channel.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesCat && matchesSearch;
        });
    }, [localPosts, selectedCategory, searchTerm]);

    const handleOpenModal = () => {
        if (onMakePost) {
            onMakePost();
        } else {
            setIsNewPostModalOpen(true);
        }
    };

    const handleAddPost = (newPostData: Partial<TimelinePost>) => {
        const createdPost: TimelinePost = {
            id: newPostData.id || `post-${Date.now()}`,
            title: newPostData.title || 'New Timeline Post',
            channel: newPostData.channel || 'Events TV',
            category: (newPostData.category as any) || 'Events',
            coverUrl: newPostData.coverUrl || 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80',
            views: newPostData.views || 0,
            postedAgo: newPostData.postedAgo || 'Just now',
            durationLabel: newPostData.durationLabel || '20:08',
            description: newPostData.description,
        };
        setLocalPosts([createdPost, ...localPosts]);
    };

    return (
        <div className="space-y-6 max-w-7xl mx-auto pb-12">
            {/* Title Header */}
                <WelcomeBanner title='Explorer Timeline' subtitle=''/>

            {/* Top Toolbar: Filter Pills, Search Bar, and Make a Post Button */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Left: Category Filter Pills */}
                <HTFilterTabs
                    tabs={CATEGORY_FILTERS}
                    activeTab={selectedCategory}
                    onTabChange={setSelectedCategory}
                />

                {/* Right: Search & Make a Post CTA */}
                <div className="flex items-center gap-3 w-full lg:w-auto">
                    {/* Search Input */}
                    <Input
                        containerClassName="flex-1 lg:w-64"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        leftIcon={<FiSearch className="h-4 w-4 text-slate-400" />}
                        className="!py-2.5 !text-xs sm:!text-sm !border-[#E4E4E7] bg-white rounded-lg"
                    />

                    {/* Make a Post Button */}
                    <HTButton
                        variant="primary"
                        size="md"
                        icon={<FiPlus className="h-4 w-4" />}
                        onClick={handleOpenModal}
                        className="whitespace-nowrap"
                    >
                        Make a Post
                    </HTButton>
                </div>
            </div>

            {/* Grid Layout of Timeline Posts */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                {filteredPosts.map((post) => (
                    <HTTimelineFeedCard
                        key={post.id}
                        post={post}
                        onClick={() => onSelectPost(post.id)}
                    />
                ))}
            </div>

            {filteredPosts.length === 0 && (
                <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
                    <p className="text-sm text-slate-500">No timeline posts found matching your filter.</p>
                </div>
            )}

            {/* New Post Modal */}
            <HTNewPostModal
                isOpen={isNewPostModalOpen}
                onClose={() => setIsNewPostModalOpen(false)}
                onSubmitPost={handleAddPost}
            />
        </div>
    );
}
