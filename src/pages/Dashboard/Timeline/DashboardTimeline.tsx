import React, { useState } from 'react';
import TimelineCard from '@components/cards/timeline/TimelineCard';
import { fakeDb } from '@components/fakeDB/fakeDb';
import CreatePostModal from './components/CreatePostModal';
import CreateAnnouncementModal from './components/CreateAnnouncementModal';
import CreateEventModal from './components/CreateEventModal';
import { AnnouncementWidget, LiveWidget } from './components/RightSidebarWidgets';
import AdsWidget from '@components/cards/timeline/AdsWidget';
import {  ListFilter } from 'lucide-react';

const DashboardTimeline: React.FC = () => {
    // State for modals
    const [isPostModalOpen, setIsPostModalOpen] = useState(false);
    const [isAnnouncementModalOpen, setIsAnnouncementModalOpen] = useState(false);
    const [isEventModalOpen, setIsEventModalOpen] = useState(false);

    // State for tabs
    // const [activeTab, setActiveTab] = useState('Activity Feed');

    // Posts data (filtering logic can be added later)
    const posts = fakeDb.timelinePosts;

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
                             <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                                <img 
                                    src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80" 
                                    alt="User" 
                                    className="w-full h-full object-cover" 
                                />
                            </div>
                            <button 
                                // onClick={handleOpenPostModal}
                                className="flex justify-start text-left flex-1 border border-[#D4D4D8] text-[#5E6C84] px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors text-sm"
                            >
                                <span className="w-full text-left">
                                    Start a post
                                </span>
                            </button>
                           </div>

                             {/* Filter Tabs & Modals Trigger */}
                        <div className="flex flex-wrap items-center gap-2">
                            <button 
                                // onClick={() => setActiveTab('Activity Feed')}
                                onClick={() => {
                                    handleOpenPostModal()
                                }}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-[#F3F9FF] border border-[#CCE3FD] text-[#002E62]`}
                            >
                                Activity Feed
                            </button>
                            <button 
                                onClick={() => {
                                    // setActiveTab('Announcements');
                                    handleOpenAnnouncementModal();
                                }}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-[#F2EAFA] border border-[#C9A9E9] text-[#6020A0]`}
                            >
                                Announcements
                            </button>
                            <button 
                                onClick={() => {
                                    // setActiveTab('Events');
                                    handleOpenEventModal();
                                }}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-[#E8FAF0] border border-[#A2E9C1] text-[#0E793C]`}
                            >
                                Events
                            </button>
                        </div>
                        </div>

                       

                        {/* Search & Filter Bar */}
                        <div className="flex items-center justify-between gap-4">
                            <h2 className="text-[#172B4D] font-bold text-lg">All Timeline</h2>
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
                             {posts.map((post: any) => (
                                <TimelineCard
                                    key={post.id}
                                    post={post}
                                    onLike={(id: any) => console.log('Like', id)}
                                    // onDelete={(id: any) => console.log('Delete', id)} onComment={function (id: number): void {
                                    //     throw new Error('Function not implemented.');
                                    // } }                                
                                />
                            ))}
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
