import React, { useState } from 'react';
import StatCard from './StatCard';
import Chat from './Chat';
import AnnouncementCard from './AnnouncementCard';
import { Mail, Megaphone, MessageSquare, Users } from 'lucide-react';
import { useGetAnnouncementsQuery } from '@store/api/announcement.api';

const statData = [
    {
        label: 'Today Messages',
        value: 8,
        icon: <MessageSquare className="w-[18px] h-[18px] text-[#A5EEFD]" />,
    },
    {
        label: 'Active Announcements',
        value: 4,
        icon: <Megaphone className="w-[18px] h-[18px] text-[#17c964]" />,
    },
    {
        label: 'Unread Messages',
        value: 3,
        icon: <Mail className="w-[18px] h-[18px] text-[#006fee]" />,
    },
    {
        label: 'Total Recipients',
        value: 9,
        icon: <Users className="w-[18px] h-[18px] text-[#f5a524]" />,
    },
];

const tabList = ['Messages', 'Announcements'] as const;

const AnnouncementSkeleton = () => (
    <div className="animate-pulse flex items-start gap-4 p-4 border border-[#EDF1F5] rounded-xl mb-4 bg-white">
        <div className="w-[45px] h-[45px] rounded-full bg-gray-200 shrink-0" />
        <div className="flex-1">
            <div className="h-5 bg-gray-200 rounded w-1/3 mb-2" />
            <div className="h-4 bg-gray-100 rounded w-1/4 mb-3" />
            <div className="space-y-2">
                <div className="h-3 bg-gray-100 rounded w-full" />
                <div className="h-3 bg-gray-100 rounded w-5/6" />
            </div>
            <div className="mt-4 flex gap-4">
                <div className="h-3 bg-gray-100 rounded w-20" />
                <div className="h-3 bg-gray-100 rounded w-16" />
            </div>
        </div>
    </div>
);

const CommunicationPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<(typeof tabList)[number]>('Messages');
    const { data: announcementsRes, isLoading: isLoadingAnnouncements } = useGetAnnouncementsQuery('');
    
    // Fallback array if no data
    const apiAnnouncements = announcementsRes?.data || [];

    return (
        <div className="pb-10">
            <div className="mb-6 mt-4 max-w-300 mx-auto">
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {statData.map((s) => (
                        <StatCard key={s.label} label={s.label} value={s.value} icon={s.icon} />
                    ))}
                </div>
                <div className="mt-8 rounded-xl border border-[#E8F4F8] bg-white p-6">
                    <div className="flex items-center gap-6 mb-6">
                        {tabList.map((tab) => (
                            <button
                                key={tab}
                                className={`px-3 py-1.5 text-sm font-semibold  border-b-2 ${activeTab === tab ? 'border-[#0A66B2] text-[#0A66B2] bg-[#F1F9FF]' : 'border-transparent text-[#475467] bg-[#FAFBFC]'}`}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                    <div>
                        {activeTab === 'Messages' && <Chat />}
                        {activeTab === 'Announcements' && (
                            <div>
                                {isLoadingAnnouncements ? (
                                    <>
                                        <AnnouncementSkeleton />
                                        <AnnouncementSkeleton />
                                        <AnnouncementSkeleton />
                                    </>
                                ) : apiAnnouncements.length === 0 ? (
                                    <div className="py-10 text-center text-[#71717A] text-[15px]">
                                        No announcements found.
                                    </div>
                                ) : (
                                    apiAnnouncements.map((a: any) => (
                                        <AnnouncementCard
                                            key={a.id}
                                            icon={
                                                <Megaphone className="w-[18px] h-[18px] text-[#17c964]" />
                                            }
                                            title={a.title || 'Announcement'}
                                            to={a.targetAudience ? `All ${a.targetAudience}` : 'All Tenants'}
                                            content={a.body || ''}
                                            date={new Date(a.createdAt).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}
                                            time={new Date(a.createdAt).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                                        />
                                    ))
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommunicationPage;
