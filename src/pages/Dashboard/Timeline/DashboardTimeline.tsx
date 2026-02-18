import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import TimelineCard from '@components/cards/timeline/TimelineCard';
import { fakeDb } from '@components/fakeDB/fakeDb';
import CreatePostModal from './components/CreatePostModal';
import CreateAnnouncementModal from './components/CreateAnnouncementModal';
import CreateEventModal from './components/CreateEventModal';
import { AnnouncementWidget, LiveWidget } from './components/RightSidebarWidgets';
import AdsWidget from '@components/cards/timeline/AdsWidget';
import {  ListFilter } from 'lucide-react';
import { useGetPostsQuery, useGetAnnouncementsQuery, useGetEventsQuery } from '@store/api/timeline.api';

const DashboardTimeline: React.FC = () => {
    const { user } = useSelector((state: any) => state.auth);
    // State for modals
    const [isPostModalOpen, setIsPostModalOpen] = useState(false);
    const [isAnnouncementModalOpen, setIsAnnouncementModalOpen] = useState(false);
    const [isEventModalOpen, setIsEventModalOpen] = useState(false);

    // State for tabs
    const [activeTab, setActiveTab] = useState<'Activity Feed' | 'Announcements' | 'Events'>('Activity Feed');

    // API Hooks
    const { data: postsData, isLoading: isPostsLoading } = useGetPostsQuery({});
    const { data: announcementsData, isLoading: isAnnouncementsLoading } = useGetAnnouncementsQuery({});
    const { data: eventsData, isLoading: isEventsLoading } = useGetEventsQuery({});

     // Determine which data to display based on active tab
    const getDisplayData = () => {
        switch (activeTab) {
            case 'Activity Feed':
                return { data: postsData?.data || [], isLoading: isPostsLoading, emptyMessage: "No posts yet" };
            case 'Announcements':
                return { data: announcementsData?.data || [], isLoading: isAnnouncementsLoading, emptyMessage: "No announcements yet" };
            case 'Events':
                return { data: eventsData?.data || [], isLoading: isEventsLoading, emptyMessage: "No events yet" };
            default:
                return { data: [], isLoading: false, emptyMessage: "No data" };
        }
    };

    const { data: displayData, isLoading, emptyMessage } = getDisplayData();


    const handleOpenPostModal = () => setIsPostModalOpen(true);
    const handleOpenAnnouncementModal = () => setIsAnnouncementModalOpen(true);
    const handleOpenEventModal = () => setIsEventModalOpen(true);

    return (
        <div className="min-h-screen py-4 lg:py-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-[#091E42]">Timeline</h1>
                    <p className="text-sm text-[#5E6C84]">Posts and activity linked to this property</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Feed */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Start a post input */}
                        <div className="bg-white rounded-[15px] p-4 shadow-sm border border-[#E4E4E7] flex flex-col gap-4">
                           <div className='flex gap-4'>
                             <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex-shrink-0 flex items-center justify-center">
                                {user?.imgUrl ? (
                                    <img 
                                        src={user.imgUrl} 
                                        alt={user.firstName} 
                                        className="w-full h-full object-cover" 
                                    />
                                ) : (
                                    <span className="text-sm font-medium text-gray-600">
                                        {user?.firstName ? `${user.firstName[0]}${user.lastName?.[0] || ''}` : 'U'}
                                    </span>
                                )}
                            </div>
                            <button 
                                onClick={() => {
                                    if (activeTab === 'Activity Feed') handleOpenPostModal();
                                    else if (activeTab === 'Announcements') handleOpenAnnouncementModal();
                                    else if (activeTab === 'Events') handleOpenEventModal();
                                }}
                                className="flex justify-start text-left flex-1 border border-[#D4D4D8] text-[#5E6C84] px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors text-sm"
                            >
                                <span className="w-full text-left">
                                    {activeTab === 'Activity Feed' ? 'Start a post' : 
                                     activeTab === 'Announcements' ? 'Start an announcement' : 
                                     'Start an event'}
                                </span>
                            </button>
                           </div>

                             {/* Filter Tabs & Modals Trigger */}
                        <div className="flex flex-wrap items-center gap-2">
                            <button 
                                onClick={() => setActiveTab('Activity Feed')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                    activeTab === 'Activity Feed' 
                                    ? 'bg-[#F3F9FF] border border-[#CCE3FD] text-[#002E62]' 
                                    : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                                }`}
                            >
                                Activity Feed
                            </button>
                            <button 
                                onClick={() => {
                                     setActiveTab('Announcements');
                                    
                                }}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                    activeTab === 'Announcements'
                                    ? 'bg-[#F2EAFA] border border-[#C9A9E9] text-[#6020A0]'
                                    : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                                }`}
                            >
                                Announcements
                            </button>
                            <button 
                                onClick={() => {
                                     setActiveTab('Events');
                                    // handleOpenEventModal();
                                }}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                    activeTab === 'Events'
                                    ? 'bg-[#E8FAF0] border border-[#A2E9C1] text-[#0E793C]'
                                    : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                                }`}
                            >
                                Events
                            </button>
                        </div>
                        </div>

                        {/* Search & Filter Bar */}
                        <div className="flex items-center justify-between gap-4">
                            <h2 className="text-[#172B4D] font-bold text-lg">{activeTab}</h2>
                            <div className="flex items-center gap-2">
                                <div className="relative">
                                    <input 
                                        type="text" 
                                        placeholder="Search ..." 
                                        className="h-10 pl-10 pr-4 rounded-lg border border-gray-200 bg-white text-sm outline-none focus:border-blue-500 w-64"
                                    />
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                        <circle cx="11" cy="11" r="8"></circle>
                                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                    </svg>
                                </div>
                                <button className="h-10 w-10 flex items-center justify-center bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
                                     <ListFilter className="text-gray-500"/>
                                </button>
                            </div>
                        </div>

                        {/* Feed Stream */}
                        <div className="space-y-6">
                            {isLoading ? (
                                <div className="text-center py-10">Loading...</div>
                            ) : displayData.length > 0 ? (
                                displayData.map((post: any) => (
                                <TimelineCard
                                    key={post.id}
                                    post={post}
                                    onLike={(id: any) => console.log('Like', id)}
                                    // onDelete={(id: any) => console.log('Delete', id)} onComment={function (id: number): void {
                                    //     throw new Error('Function not implemented.');
                                    // } }                                
                                />
                            ))
                            ) : (
                                <div className="text-center py-10 text-gray-500">{emptyMessage}</div>
                            )}
                        
                        </div>
                    </div>

                    {/* Right Column: Widgets */}
                    <div className="lg:col-span-1 space-y-6">
                        <AnnouncementWidget />
                        <LiveWidget />
                        <AdsWidget ads={fakeDb.ads} />
                    </div>
                </div>

                {/* Modals */}
                <CreatePostModal 
                    isOpen={isPostModalOpen} 
                    onClose={() => setIsPostModalOpen(false)} 
                />
                <CreateAnnouncementModal 
                    isOpen={isAnnouncementModalOpen} 
                    onClose={() => setIsAnnouncementModalOpen(false)} 
                />
                <CreateEventModal 
                    isOpen={isEventModalOpen} 
                    onClose={() => setIsEventModalOpen(false)} 
                />
            </div>
        </div>
    );
};

export default DashboardTimeline;
