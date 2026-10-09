import React from 'react';
import type { ScheduleItemData } from '../../types/listingDetailsTypes';

interface HTListingScheduleSectionProps {
    title?: string;
    items?: ScheduleItemData[];
}

export default function HTListingScheduleSection({
    title = 'Event Schedule',
    items = [],
}: HTListingScheduleSectionProps) {
    return (
        <div className="bg-white border border-[#E4E4E7] rounded-2xl p-6 sm:p-8 shadow-2xs space-y-6">
            <h3 className="text-lg sm:text-xl font-bold text-[#002E62]">{title}</h3>

            <div className="divide-y divide-slate-100">
                {items.map((item) => (
                    <div
                        key={item.id}
                        className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-8"
                    >
                        {/* Time tag */}
                        <div className="w-24 shrink-0 text-xs sm:text-sm font-extrabold text-[#359F6A]">
                            {item.time}
                        </div>

                        {/* Title & Description */}
                        <div className="space-y-0.5 flex-1">
                            <h4 className="text-xs sm:text-sm font-bold text-[#101828]">
                                {item.title}
                            </h4>
                            <p className="text-[11px] sm:text-xs text-slate-500">
                                {item.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
