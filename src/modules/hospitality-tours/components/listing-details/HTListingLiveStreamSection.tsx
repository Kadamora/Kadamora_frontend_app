import React, { useState } from 'react';
import { FiPlayCircle, FiYoutube, FiBell, FiCheck } from 'react-icons/fi';
import type { LiveStreamData } from '../../types/listingDetailsTypes';

interface HTListingLiveStreamSectionProps {
    title?: string;
    data?: LiveStreamData;
}

export default function HTListingLiveStreamSection({
    title = 'Event Live Stream',
    data,
}: HTListingLiveStreamSectionProps) {
    const [isReminderSet, setIsReminderSet] = useState(false);

    const handleReminderClick = () => {
        setIsReminderSet(!isReminderSet);
        if (data?.reminderAction) {
            data.reminderAction();
        }
    };

    return (
        <div className="bg-white border border-[#E4E4E7] rounded-2xl p-6 sm:p-8 shadow-2xs space-y-6">
            <h3 className="text-lg sm:text-xl font-bold text-[#002E62]">{title}</h3>

            <div className="space-y-4">
                {/* Dark Stream Canvas Box */}
                <div className="w-full h-72 sm:h-96 rounded-2xl bg-[#0F172A] flex flex-col items-center justify-center text-center p-6 text-white relative overflow-hidden shadow-inner border border-slate-800">
                    {/* Play Icon Badge */}
                    <div className="mb-4 text-white/90 hover:scale-110 transition-transform cursor-pointer">
                        <FiPlayCircle className="h-14 w-14 sm:h-16 sm:w-16 stroke-1 fill-white/10" />
                    </div>

                    <h4 className="text-sm sm:text-base font-bold text-white">
                        Stream starts on {data?.startDateText || 'June 20-21, 2025'}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1 font-medium">
                        Watch live on Kadamora
                    </p>
                </div>

                {/* Stream Action Buttons */}
                <div className="flex items-center gap-3 pt-2">
                    <a
                        href={data?.youtubeUrl || 'https://youtube.com'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#FF0000] hover:bg-[#CC0000] text-white text-xs sm:text-sm font-semibold transition-colors shadow-2xs cursor-pointer"
                    >
                        <FiYoutube className="h-4 w-4" />
                        <span>Watch on YouTube</span>
                    </a>

                    <button
                        type="button"
                        onClick={handleReminderClick}
                        className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors border shadow-2xs cursor-pointer ${
                            isReminderSet
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                                : 'bg-[#F8FAFC] text-[#002E62] border-slate-200 hover:bg-slate-100'
                        }`}
                    >
                        {isReminderSet ? (
                            <>
                                <FiCheck className="h-4 w-4 text-emerald-600" />
                                <span>Reminder Set</span>
                            </>
                        ) : (
                            <>
                                <FiBell className="h-4 w-4" />
                                <span>Set Reminder</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
