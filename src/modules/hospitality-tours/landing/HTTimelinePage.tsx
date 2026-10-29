import { useState, useMemo } from 'react';
import { FiSearch } from 'react-icons/fi';
import SEO from '@shared/components/SEO/SEO';
import LandingPageContainer from '@shared/layouts/LandingLayout/LandingPageContainer';
import HTTimelineFeedCard from '../components/timeline/HTTimelineFeedCard';
import HTTimelinePostDetailView from '../components/timeline/HTTimelinePostDetailView';
import HTFilterTabs from '../components/HTFilterTabs';
import { HT_NAV_LINKS } from '../data/hospitalityLandingData';
import { timelinePosts } from '../data/mock';
import type { TimelinePost } from '../types';

const TIMELINE_CATEGORIES = [
    { key: 'all', label: 'All' },
    { key: 'events', label: 'Events' },
    { key: 'festival', label: 'Festival' },
    { key: 'season', label: 'Season' },
    { key: 'documentary', label: 'Documentary' },
    { key: 'gist', label: 'Gist' },
    { key: 'interview', label: 'Interview' },
];

export default function HTTimelinePage() {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPost, setSelectedPost] = useState<TimelinePost | null>(null);

    const filteredPosts = useMemo(() => {
        return timelinePosts.filter((post) => {
            const matchesCat =
                selectedCategory === 'all' ||
                post.category.toLowerCase() === selectedCategory.toLowerCase();
            const matchesSearch =
                post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.channel.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesCat && matchesSearch;
        });
    }, [selectedCategory, searchTerm]);

    const relatedPosts = useMemo(() => {
        if (!selectedPost) return [];
        return timelinePosts.filter((p) => p.id !== selectedPost.id);
    }, [selectedPost]);

    const handleSelectPostById = (postId: string) => {
        const found = timelinePosts.find((p) => p.id === postId);
        if (found) {
            setSelectedPost(found);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <LandingPageContainer headerTheme="light" navLinks={HT_NAV_LINKS}>
            <SEO
                title={
                    selectedPost
                        ? `${selectedPost.title} - Timeline | Kadamora`
                        : 'Explore Timeline - Video Feeds & Festival Highlights | Kadamora'
                }
                description="Watch the latest Nigerian festival highlights, horse displays, carnival parades and cultural moments on Kadamora Timeline."
            />

            <div className="bg-[#F8FAFC] min-h-screen pt-8 sm:pt-12 pb-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {selectedPost ? (
                        <HTTimelinePostDetailView
                            key={selectedPost.id}
                            post={selectedPost}
                            relatedPosts={relatedPosts}
                            onSelectPost={handleSelectPostById}
                            breadcrumbs={[
                                {
                                    label: 'Timeline',
                                    onClick: () => setSelectedPost(null),
                                },
                                {
                                    label:
                                        selectedPost.title.split(' ').slice(0, 3).join(' ') +
                                        (selectedPost.title.split(' ').length > 3 ? ' ...' : ''),
                                },
                            ]}
                        />
                    ) : (
                        <div className="space-y-8">
                            {/* Page Title */}
                            <div>
                                <h1 className="text-3xl sm:text-4xl font-extrabold text-[#002E62] tracking-tight">
                                    Explore Timeline
                                </h1>
                            </div>

                            {/* Toolbar: Category Filters + Search Input */}
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                {/* Filter Tabs */}
                                <HTFilterTabs
                                    tabs={TIMELINE_CATEGORIES}
                                    activeTab={selectedCategory}
                                    onTabChange={setSelectedCategory}
                                />

                                {/* Search Input */}
                                <div className="w-full md:w-72">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            placeholder="Search"
                                            className="w-full bg-white border border-slate-200 rounded-lg py-2 pl-9 pr-3 text-xs sm:text-sm text-[#091E42] placeholder-slate-400 focus:outline-none focus:border-[#00D26A] shadow-2xs"
                                        />
                                        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                                    </div>
                                </div>
                            </div>

                            {/* Timeline Feed Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
                                {filteredPosts.map((post) => (
                                    <HTTimelineFeedCard
                                        key={post.id}
                                        post={post}
                                        onClick={() => {
                                            setSelectedPost(post);
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }}
                                    />
                                ))}
                            </div>

                            {filteredPosts.length === 0 && (
                                <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 shadow-2xs">
                                    <p className="text-sm font-medium text-slate-500">
                                        No timeline videos found matching &ldquo;{searchTerm}&rdquo;.
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </LandingPageContainer>
    );
}
