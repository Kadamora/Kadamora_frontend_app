import React from 'react';
import AdsWidget from '@components/cards/timeline/AdsWidget';
import { useGetAnnouncementsQuery } from '@store/api/timeline.api';

interface RightSidebarWidgetsProps {
    ads: any[]; // Using any for simplicity as matching fakeDb type
}

export const AnnouncementWidget = () => {
    const { data: announcementsData } = useGetAnnouncementsQuery({});
    const recentAnnouncements = announcementsData?.data?.slice(0, 3) || [];

    return (
        <div className="bg-white rounded-[10px] p-4 border border-[#CCE3FD]  mb-6">
            <h3 className="text-[#091E42] font-semibold text-[15px] mb-4">Today's Announcement</h3>
            
            {recentAnnouncements.length > 0 ? (
                recentAnnouncements.map((announcement: any) => (
                    <div key={announcement.id} className="mb-2 border-b border-[#E4E4E7] pb-2 last:border-0">
                        <div className="text-[#172B4D] font-semibold text-xs mb-1">{announcement.title}</div>
                        <p className="text-[#5E6C84] text-xs leading-relaxed line-clamp-3">
                            {announcement.content}
                        </p>
                    </div>
                ))
            ) : (
                <p className="text-[#5E6C84] text-xs">No announcements today.</p>
            )}
        </div>
    );
};

export const LiveWidget = () => {
    return (
        <div className="bg-white rounded-[10px] p-4 border border-[#CCE3FD]  mb-6">
            <h3 className="text-[#091E42] border-b border-[#E4E4E7] pb-2 font-semibold text-[15px] mb-2">Live on Kadamora</h3>
            <div className="flex items-center justify-between">
                <div>
                     <div className="text-[#172B4D] font-semibold text-xs mb-1">Ayomide Bamidele is Hosting</div>
                     <div className="text-[#5E6C84] text-[10px]">Harmony Estate monthly facilities review for June, 2025</div>
                     <div className="flex -space-x-2 mt-2">
                        {[1, 2, 3].map((i) => (
                            <img key={i} className="w-6 h-6 rounded-full border-2 border-white" src={`https://i.pravatar.cc/100?img=${i + 10}`} alt={`User ${i}`} />
                        ))}
                        <div className="w-6 h-6 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[8px] text-gray-500 font-bold">
                            +50
                        </div>
                         <span className="text-[10px] text-gray-500 ml-2 self-center">Others</span>
                     </div>
                </div>
                 <button className="text-[#002E62] text-xs font-medium underline">
                    Join Now
                </button>
            </div>
        </div>
    );
};

export const SidebarWidgets: React.FC<RightSidebarWidgetsProps> = ({ ads }) => {
    return (
        <div className="w-full">
            <AnnouncementWidget />
            <LiveWidget />
            <AdsWidget ads={ads} />
        </div>
    );
};
