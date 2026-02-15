import React from 'react';
import AdsWidget from '@components/cards/timeline/AdsWidget';

interface RightSidebarWidgetsProps {
    ads: any[]; // Using any for simplicity as matching fakeDb type
}

export const AnnouncementWidget = () => {
    return (
        <div className="bg-white rounded-[10px] p-4 border border-[#CCE3FD]  mb-6">
            <h3 className="text-[#091E42] font-semibold text-[15px] mb-4">Today's Announcement</h3>
            
            <div className="mb-2 border-b border-[#E4E4E7] pb-2">
                <div className="text-[#172B4D] font-semibold text-xs mb-1">Water Maintenance Scheduled</div>
                <p className="text-[#5E6C84] text-xs leading-relaxed">
                    Please be advised that water will be temporarily shut off on December 22nd from 9:00 AM to 1:00 PM for routine maintenance of the building's plumbing system.
                </p>
            </div>

            <div>
                <div className="text-[#172B4D] font-semibold text-xs mb-1">New Visitor Parking Rules</div>
                <p className="text-[#5E6C84] text-xs leading-relaxed">
                    Effective immediately, visitor parking is limited to 2 hours during weekdays. Please inform your guests to register at the front desk upon arrival.
                </p>
            </div>
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
