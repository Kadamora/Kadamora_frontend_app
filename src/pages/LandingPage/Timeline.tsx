import TimelineCard from '@components/cards/timeline/TimelineCard';
import AdsWidget from '@components/cards/timeline/AdsWidget';
import LandingPageContainer from '@components/container/LandingPage/LandingPageContainer';
import { fakeDb } from '@components/fakeDB/fakeDb';
import { TimelineSEO } from '@components/SEO/SEO';
import React, { useState } from 'react';
import { useGetPostsQuery } from '@store/api/timeline.api';

const Timeline: React.FC = () => {
    // const [posts, setPosts] = useState(fakeDb.timelinePosts); // Replaced by API
    const { data: postsData, isLoading } = useGetPostsQuery({});
    const posts = postsData?.data || [];
    
    const filterType: string = 'all';
    const searchTerm: string = '';

    // Note: Deleting posts locally might not be persistent or applicable if fetching from API. 
    // For now, I'll remove the local delete functionality or implement it via API if needed.
    // The original code had `handleClose` which filtered the local state. 
    // I will keep a local state initialized with API data? No, that's complex with RTK Query.
    // I'll just rely on the API data. If "closing" a post is a UI-only thing (hiding it), I can use a local set of hidden IDs.
    
    const [hiddenPostIds, setHiddenPostIds] = useState<Set<number>>(new Set());

    const handleClose = (id: number) => {
        setHiddenPostIds(prev => {
            const next = new Set(prev);
            next.add(id);
            return next;
        });
    };

    const filteredPosts = posts.filter((post: any) => {
        if (hiddenPostIds.has(post.id)) return false;

        const matchesFilter = filterType === 'all' || post.type === filterType;
        const matchesSearch =
            searchTerm === '' ||
            post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.user.role.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesFilter && matchesSearch;
    });

    return (
        <>
            <TimelineSEO />
            <LandingPageContainer>
                <div className="min-h-screen bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Timeline 2-column Layout */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
                            {/* Left: Posts */}
                            <div className="w-full lg:col-span-2">
                                {/* Posts */}
                                {isLoading ? (
                                    <div className="text-center py-12">Loading...</div>
                                ) : filteredPosts.length > 0 ? (
                                    filteredPosts.map((post:any) => (
                                        <TimelineCard key={post.id} post={post} onClose={() => handleClose(post.id)} />
                                    ))
                                ) : (
                                    <div className="text-center py-12">
                                        <div className="text-gray-400 mb-4">
                                            <svg
                                                className="w-16 h-16 mx-auto"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33"
                                                />
                                            </svg>
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-600 mb-2">No posts found</h3>
                                        <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                                    </div>
                                )}

                                {/* Load More Button */}
                                {filteredPosts.length > 0 && (
                                    <div className="text-center mt-8">
                                        <button className="px-6 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                                            Load More Posts
                                        </button>
                                    </div>
                                )}
                            </div>
                            {/* Right: Ads Column */}
                            <div className="hidden md:block lg:col-span-1">
                                <AdsWidget ads={fakeDb.ads} />
                            </div>
                        </div>
                    </div>
                </div>
            </LandingPageContainer>
        </>
    );
};

export default Timeline;
