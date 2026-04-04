import pendingIcon from './icons/pendinf.svg';
import progressIcon from './icons/progress.svg';
import scheduledIcon from './icons/scheduled.svg';
import completedIcon from './icons/completed.svg';
import React, { useState } from 'react';
import StatusCard from './StatusCard';

const gridData = [
    {
        name: 'Michael Chamberlain',
        property: 'Hilltop DiamondA',
        status: 'Pending',
        scheduled: '03 June, 2025 at 2 PM - 3 PM',
        type: 'Virtual',
    },
    {
        name: 'Michael Chamberlain',
        property: 'Hilltop DiamondA',
        status: 'Completed',
        scheduled: '03 June, 2025 at 2 PM - 3 PM',
        type: 'Virtual',
    },
    {
        name: 'Michael Chamberlain',
        property: 'Hilltop DiamondA',
        status: 'In-progress',
        scheduled: '03 June, 2025 at 2 PM - 3 PM',
        type: 'Virtual',
    },
    {
        name: 'Michael Chamberlain',
        property: 'Hilltop DiamondA',
        status: 'Scheduled',
        scheduled: '03 June, 2025 at 2 PM - 3 PM',
        type: 'Virtual',
    },
];
const statusColors: Record<string, string> = {
    'Pending': 'bg-[#E6F1FB] text-[#0A66B2]',
    'In-progress': 'bg-[#E9F7F1] text-[#12B76A]',
    'Scheduled': 'bg-[#F4F8FF] text-[#0A66B2]',
    'Completed': 'bg-[#FFF9E6] text-[#F7B500]',
};

// Dummy avatars, use gray background for images
const avatar = (
    <span className="inline-flex h-8 w-8 rounded-full bg-gray-200 items-center justify-center">
        <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <circle cx="12" cy="8" r="4" />
            <path d="M6 20c0-2.2 3.6-3.5 6-3.5s6 1.3 6 3.5" />
        </svg>
    </span>
);

const statCards = [
    {
        label: 'Pending',
        value: 8,
        icon: <img src={pendingIcon} alt="Pending" className="h-12 w-12" />,
    },
    {
        label: 'In-Progress',
        value: 4,
        icon: <img src={progressIcon} alt="In-Progress" className="h-12 w-12" />,
    },
    {
        label: 'Scheduled',
        value: 3,
        icon: <img src={scheduledIcon} alt="Scheduled" className="h-12 w-12" />,
    },
    {
        label: 'Completed',
        value: 9,
        icon: <img src={completedIcon} alt="Completed" className="h-12 w-12" />,
    },
];

const calendarData = [
    {
        name: 'John David',
        property: 'Hilltop DiamondA',
        type: 'Hybrid',
        day: 1,
        startTime: '12:00 PM',
        endTime: '02:00 PM',
    },
    {
        name: 'Miracle Stephen',
        property: 'Hilltop DiamondA',
        type: 'Physical',
        day: 2,
        startTime: '02:00 PM',
        endTime: '04:00 PM',
    },
    {
        name: 'Adeoye Adeniyi',
        property: 'Hilltop DiamondC',
        type: 'Physical',
        day: 1,
        startTime: '04:00 PM',
        endTime: '05:00 PM',
    },
    {
        name: 'Michael Chamberlain',
        property: 'Hilltop DiamondA',
        type: 'Virtual',
        day: 3,
        startTime: '12:00 PM',
        endTime: '01:00 PM',
    },
    {
        name: 'Faith Joshua',
        property: 'Hilltop DiamondA',
        type: 'Virtual',
        day: 3,
        startTime: '05:00 PM',
        endTime: '07:00 PM',
    },
    {
        name: 'Aishat Mohammed',
        property: 'Hilltop DiamondA',
        type: 'Physical',
        day: 4,
        startTime: '02:00 PM',
        endTime: '03:00 PM',
    },
    {
        name: 'Steve Daniella',
        property: 'Hilltop DiamondA',
        type: 'Physical',
        day: 5,
        startTime: '12:00 PM',
        endTime: '01:00 PM',
    },
    {
        name: 'John Phillip',
        property: 'Dominion DuplexC',
        type: 'Virtual',
        day: 5,
        startTime: '02:00 PM',
        endTime: '03:00 PM',
    },
    {
        name: 'Israel Daniel',
        property: 'Hilltop DiamondA',
        type: 'Physical',
        day: 6,
        startTime: '12:00 PM',
        endTime: '01:00 PM',
    },
    {
        name: 'Godwin Joseph',
        property: 'Hilltop GoldE',
        type: 'Hybrid',
        day: 6,
        startTime: '02:00 PM',
        endTime: '04:00 PM',
    },
    {
        name: 'Jacob Gabriel',
        property: 'Hilltop DiamondA',
        type: 'Hybrid',
        day: 4,
        startTime: '09:00 PM',
        endTime: '11:00 PM',
    },
];

const baseDate = new Date(2025, 10, 15); // Nov 15, 2025
function getWeekDays(offset: number): string[] {
    const daysArr: string[] = [];
    for (let i = 0; i < 6; i++) {
        const d = new Date(baseDate);
        d.setDate(baseDate.getDate() + offset * 7 + i);
        daysArr.push(`${d.toLocaleDateString('en-US', { weekday: 'short' })} ${d.getDate()}`);
    }
    return daysArr;
}

// Remove static days, use dynamic week days
const times = [
    '12:00 PM',
    '01:00 PM',
    '02:00 PM',
    '03:00 PM',
    '04:00 PM',
    '05:00 PM',
    '06:00 PM',
    '07:00 PM',
    '08:00 PM',
    '09:00 PM',
    '10:00 PM',
    '11:00 PM',
];

function getTimeIndex(time: string): number {
    return times.indexOf(time);
}
function getDuration(start: string, end: string): number {
    return getTimeIndex(end) - getTimeIndex(start) + 1;
}

const InspectionPage: React.FC = () => {
    const [tab, setTab] = useState<'calendar' | 'grid'>('calendar');
    const [weekOffset, setWeekOffset] = useState(0);
    const days = getWeekDays(weekOffset);
    return (
        <div className="pb-10">
            <div className="mb-6 mt-4 max-w-300 mx-auto">
                 <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {statCards.map((s) => (
                        <StatusCard key={s.label} label={s.label} value={s.value} icon={s.icon} />
                    ))}
                </div>

                <div className="rounded-xl border border-[#E4E4E7] bg-white py-6 mt-6">
                    <div className="flex items-center gap-6 mb-4 px-6">
                        <button
                            onClick={() => setTab('calendar')}
                            className={`text-[15px] font-semibold pb-1 border-b-2 ${tab === 'calendar' ? 'border-[#002E62] text-[#002E62]' : 'border-transparent text-[#71717A]'}`}
                        >
                            Calendar
                        </button>
                        <button
                            onClick={() => setTab('grid')}
                            className={`text-[15px] font-semibold pb-1 border-b-2 ${tab === 'grid' ? 'border-[#002E62] text-[#002E62]' : 'border-transparent text-[#71717A]'}`}
                        >
                            Grid
                        </button>
                        <div className="flex-1" />
                        <div className="relative max-w-xs">
                            <svg
                                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#98A2B3]"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.2-5.2" />
                                <circle cx="11" cy="11" r="7" />
                            </svg>
                            <input
                                className="w-full rounded-md border border-[#E4E4E7] bg-white pl-9 pr-3 py-2 text-[14px] focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 outline-none"
                                placeholder="Search ..."
                            />
                        </div>
                    </div>
                    {tab === 'calendar' && (
                        <div className="flex items-center justify-between gap-2 mb-6 px-6">
                            <div className="flex items-center gap-2">
                            <button
                                className="h-8 w-8 rounded bg-[#F1F4F7] text-[#475467] flex items-center justify-center"
                                title="Previous week"
                                aria-label="Previous week"
                                onClick={() => setWeekOffset(weekOffset - 1)}
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    className="h-4 w-4"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <button
                                className="h-8 w-8 rounded bg-[#F1F4F7] text-[#475467] flex items-center justify-center"
                                title="Next week"
                                aria-label="Next week"
                                onClick={() => setWeekOffset(weekOffset + 1)}
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    className="h-4 w-4"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                            </div>
                            <div className="flex items-center gap-2">
                            <button className="px-3 py-2 rounded-md border border-[#CCE3FD] bg-white text-[#0A66B2] hover:bg-[#F4F8FF] ml-2">
                                Week
                            </button>
                            <button className="px-3 py-2 rounded-md border border-[#CCE3FD] bg-white text-[#0A66B2] hover:bg-[#F4F8FF]">
                                Today
                            </button>
                        </div>
                        </div>
                    )}

                    {tab === 'calendar' ? (
                        <div className="overflow-x-auto px-4">
                            <table className="min-w-full text-left text-[14px] border-collapse">
                                <thead>
                                    <tr className="bg-[#F9FBFC] text-[#475467] border-b border-[#E4E7EC]">
                                        <th className="px-3 py-2 font-medium">Time</th>
                                        {days.map((day) => (
                                            <th key={day} className="px-3 py-2 font-medium">
                                                {day}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {times.map((time, rowIdx) => (
                                        <tr key={time} className="border-b border-[#F1F4F7]">
                                            <td className="px-3 py-3 font-medium text-[#475467] text-[12px] align-top whitespace-nowrap w-[100px] border-r border-[#E4E7EC]">{time}</td>
                                            {days.map((day, colIdx) => {
                                                // Find entry that starts at this time and day
                                                const entry = calendarData.find(
                                                    (e) => e.day === colIdx + 1 && e.startTime === time,
                                                );
                                                // Check if this cell is covered by a spanning entry
                                                const spanningEntry = calendarData.find((e) => {
                                                    const startIdx = getTimeIndex(e.startTime);
                                                    const endIdx = getTimeIndex(e.endTime);
                                                    return (
                                                        e.day === colIdx + 1 && rowIdx >= startIdx && rowIdx <= endIdx
                                                    );
                                                });
                                                // Only render the card at the start cell, empty for spanned cells
                                                if (entry) {
                                                    const duration = getDuration(entry.startTime, entry.endTime);
                                                    
                                                    let bgClass = '';
                                                    let borderClass = '';
                                                    let textClass = '';

                                                    if (entry.type === 'Virtual') {
                                                        bgClass = 'bg-[#E6F6FB]'; // Light cyan blue
                                                        borderClass = 'border-[#0AB6D7]'; // Cyan
                                                        textClass = 'text-[#0AB6D7]';
                                                    } else if (entry.type === 'Physical') {
                                                        bgClass = 'bg-[#E9F7F1]';
                                                        borderClass = 'border-[#12B76A]';
                                                        textClass = 'text-[#12B76A]';
                                                    } else if (entry.type === 'Hybrid') {
                                                        bgClass = 'bg-[#FFF9E6]';
                                                        borderClass = 'border-[#F7B500]';
                                                        textClass = 'text-[#F7B500]';
                                                    }

                                                    return (
                                                        <td
                                                            key={day}
                                                            className="px-1 py-1 align-top"
                                                            rowSpan={duration}
                                                        >
                                                            <div
                                                                className={`h-full w-full border-l-[4px] p-2 flex gap-2 ${bgClass} ${borderClass}`}
                                                                style={{ minHeight: `${duration * 48 - 8}px` }}
                                                            >
                                                                <div className="flex-shrink-0 mt-0.5">
                                                                    {avatar}
                                                                </div>
                                                                <div className="flex flex-col">
                                                                    <span className={`font-semibold text-[13px] leading-tight mb-0.5 ${textClass}`}>
                                                                        {entry.name}
                                                                    </span>
                                                                    <span className="text-[11px] text-[#475467] leading-tight mb-0.5">
                                                                        {entry.property}
                                                                    </span>
                                                                    <span className="text-[11px] text-[#64748B] leading-tight">
                                                                        {entry.type}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    );
                                                } else if (spanningEntry && spanningEntry.startTime !== time) {
                                                    // Empty cell for spanned rows
                                                    return null;
                                                } else {
                                                    return <td key={day} className="px-1 py-1 border-r border-[#F1F4F7]" />;
                                                }
                                            })}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 gap-6 px-3">
                            {/* @ts-ignore */}
                            {gridData &&
                                gridData.map((item: any, idx: number) => (
                                    <div
                                        key={idx}
                                        className="rounded-xl border border-[#E4E4E7] bg-white p-5 flex justify-between gap-4 items-center"
                                    >
                                        <div>
                                            <div className="flex items-center gap-2">

                                        {avatar}
                                        <div className="flex-1">
                                            <div className="font-semibold text-[#002E62] text-[15px] mb-1">
                                                {item.name}
                                            </div>
                                            <div className="text-[13px] text-[#71717A] mb-1 font-medium">{item.property}</div>
                                           
                                        </div>
                                        </div>
                                        <div className="flex flex-col gap-2 mt-3">
                                            <div className="text-[13px] text-[#002E62] font-semibold">
                                                Scheduled: <span className="text-[#71717A] font-normal">{item.scheduled}</span>
                                            </div>
                                            <div className="text-[13px] text-[#002E62] font-semibold">
                                                Inspection Type: <span className="text-[#71717A] font-normal">{item.type}</span>
                                            </div>
                                        </div>
                                        </div>
                                        <span
                                            className={`px-3 py-1 rounded-full text-[13px] font-medium ${statusColors ? statusColors[item.status] : ''}`}
                                        >
                                            {item.status}
                                        </span>
                                    </div>
                                ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default InspectionPage;
