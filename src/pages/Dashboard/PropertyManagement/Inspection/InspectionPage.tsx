import pendingIcon from './icons/pendinf.svg';
import progressIcon from './icons/progress.svg';
import scheduledIcon from './icons/scheduled.svg';
import completedIcon from './icons/completed.svg';
import React, { useState } from 'react';
import StatusCard from './StatusCard';
import { useGetAllInspectionsQuery } from '@store/api/propertyMgt.api';

const statusColors: Record<string, string> = {
    'Pending': 'bg-[#E6F1FB] text-[#0A66B2]',
    'In-progress': 'bg-[#E9F7F1] text-[#12B76A]',
    'Scheduled': 'bg-[#F4F8FF] text-[#0A66B2]',
    'Completed': 'bg-[#FFF9E6] text-[#F7B500]',
};

const typeColors: Record<string, { bg: string; border: string; text: string }> = {
    Virtual: { bg: 'bg-[#E6F6FB]', border: 'border-[#0AB6D7]', text: 'text-[#0AB6D7]' },
    Physical: { bg: 'bg-[#E9F7F1]', border: 'border-[#12B76A]', text: 'text-[#12B76A]' },
    Hybrid: { bg: 'bg-[#FFF9E6]', border: 'border-[#F7B500]', text: 'text-[#F7B500]' },
};

const avatar = (
    <span className="inline-flex h-8 w-8 rounded-full bg-gray-200 items-center justify-center flex-shrink-0">
        <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <circle cx="12" cy="8" r="4" />
            <path d="M6 20c0-2.2 3.6-3.5 6-3.5s6 1.3 6 3.5" />
        </svg>
    </span>
);

// Build 7-day week starting from Monday of given offset
function getWeekDays(offset: number): Date[] {
    const today = new Date();
    const monday = new Date(today);
    const day = today.getDay();
    const diff = day === 0 ? -6 : 1 - day; // adjust to Monday
    monday.setDate(today.getDate() + diff + offset * 7);
    return Array.from({ length: 7 }, (_, i) => {
        const d = new Date(monday);
        d.setDate(monday.getDate() + i);
        return d;
    });
}

function formatWeekDay(d: Date): string {
    return `${d.toLocaleDateString('en-US', { weekday: 'short' })} ${d.getDate()}`;
}

function toDateString(d: Date): string {
    return d.toISOString().split('T')[0];
}

// Generate time slots from 06:00 to 23:00
const timeSlots: string[] = [];
for (let h = 6; h <= 23; h++) {
    timeSlots.push(`${String(h).padStart(2, '0')}:00`);
}

function timeToSlotIndex(t: string): number {
    // t is "HH:MM"
    const [h] = t.split(':').map(Number);
    return h - 6;
}

function formatTime12(t: string): string {
    const [h, m] = t.split(':').map(Number);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    return `${h12}:${String(m).padStart(2, '0')} ${ampm}`;
}

function formatScheduledDate(date: string, time: string): string {
    const d = new Date(`${date}T${time}`);
    return d.toLocaleDateString('en-US', { day: '2-digit', month: 'long', year: 'numeric' }) + ' at ' + formatTime12(time);
}

const CalendarSkeleton = () => (
    <div className="animate-pulse w-full border border-[#E4E7EC] rounded-lg overflow-hidden mt-4">
        <div className="flex border-b border-[#E4E7EC] bg-[#F9FBFC]">
            <div className="w-[80px] p-3"><div className="h-4 bg-gray-200 rounded w-full"></div></div>
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                <div key={i} className="flex-1 p-3"><div className="h-4 bg-gray-200 rounded w-full"></div></div>
            ))}
        </div>
        {[1, 2, 3, 4].map((row) => (
            <div key={row} className="flex border-b border-[#F1F4F7]">
                <div className="w-[80px] p-3 border-r border-[#E4E7EC]"><div className="h-4 bg-gray-200 rounded w-full"></div></div>
                {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                    <div key={i} className="flex-1 border-r border-[#F1F4F7] p-2 h-24">
                        {(row + i) % 5 === 0 ? <div className="w-full h-full bg-gray-100 rounded"></div> : null}
                    </div>
                ))}
            </div>
        ))}
    </div>
);

const GridSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mt-4">
        {[1, 2, 3, 4].map((i) => (
            <div key={i} className="animate-pulse flex items-start gap-4 p-5 border border-[#E4E4E7] rounded-xl bg-white shadow-sm">
                <div className="w-10 h-10 rounded-full bg-gray-200 shrink-0"></div>
                <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
                    <div className="space-y-2">
                        <div className="h-3 bg-gray-100 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-100 rounded w-2/3"></div>
                        <div className="h-3 bg-gray-100 rounded w-1/2"></div>
                    </div>
                </div>
            </div>
        ))}
    </div>
);

const InspectionPage: React.FC = () => {
    const [tab, setTab] = useState<'calendar' | 'grid'>('calendar');
    const [weekOffset, setWeekOffset] = useState(0);
    const [search, setSearch] = useState('');

    const weekDays = getWeekDays(weekOffset);

    const { data: allInspectionsData, isLoading } = useGetAllInspectionsQuery();
    const inspections: any[] = allInspectionsData?.data || [];

    // Stat card counts from real data
    const pendingCount = inspections.filter((i) => i.status === 'Pending').length;
    const inProgressCount = inspections.filter((i) => i.status === 'In-progress').length;
    const scheduledCount = inspections.filter((i) => i.status === 'Scheduled').length;
    const completedCount = inspections.filter((i) => i.status === 'Completed').length;

    const statCards = [
        { label: 'Pending', value: pendingCount, icon: <img src={pendingIcon} alt="Pending" className="h-12 w-12" /> },
        { label: 'In-Progress', value: inProgressCount, icon: <img src={progressIcon} alt="In-Progress" className="h-12 w-12" /> },
        { label: 'Scheduled', value: scheduledCount, icon: <img src={scheduledIcon} alt="Scheduled" className="h-12 w-12" /> },
        { label: 'Completed', value: completedCount, icon: <img src={completedIcon} alt="Completed" className="h-12 w-12" /> },
    ];

    // Filter inspections that fall within the current week view
    const calendarInspections = inspections.filter((insp) =>
        weekDays.some((d) => toDateString(d) === insp.scheduledDate)
    );

    // For grid: filter by search
    const gridInspections = inspections.filter((insp) => {
        if (!search) return true;
        const q = search.toLowerCase();
        return (
            insp.property?.name?.toLowerCase().includes(q) ||
            insp.type?.toLowerCase().includes(q) ||
            insp.status?.toLowerCase().includes(q) ||
            insp.unitName?.toLowerCase().includes(q)
        );
    });

    return (
        <div className="pb-10">
            <div className="mb-6 mt-4 max-w-300 mx-auto">
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {statCards.map((s) => (
                        <StatusCard key={s.label} label={s.label} value={s.value} icon={s.icon} />
                    ))}
                </div>

                <div className="rounded-xl border border-[#E4E4E7] bg-white py-6 mt-6">
                    {/* Tab + Search bar */}
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
                                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.2-5.2" />
                                <circle cx="11" cy="11" r="7" />
                            </svg>
                            <input
                                className="w-full rounded-md border border-[#E4E4E7] bg-white pl-9 pr-3 py-2 text-[14px] focus:border-[#002E62] focus:ring-2 focus:ring-[#002E62]/10 outline-none"
                                placeholder="Search..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Calendar week nav */}
                    {tab === 'calendar' && (
                        <div className="flex items-center justify-between gap-2 mb-6 px-6">
                            <div className="flex items-center gap-2">
                                <button
                                    className="h-8 w-8 rounded bg-[#F1F4F7] text-[#475467] flex items-center justify-center"
                                    onClick={() => setWeekOffset(weekOffset - 1)}
                                    aria-label="Previous week"
                                >
                                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                                <span className="text-[14px] font-medium text-[#475467]">
                                    {weekDays[0].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} –{' '}
                                    {weekDays[6].toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                </span>
                                <button
                                    className="h-8 w-8 rounded bg-[#F1F4F7] text-[#475467] flex items-center justify-center"
                                    onClick={() => setWeekOffset(weekOffset + 1)}
                                    aria-label="Next week"
                                >
                                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="px-3 py-2 rounded-md border border-[#CCE3FD] bg-white text-[#0A66B2] hover:bg-[#F4F8FF] text-[13px]">Week</button>
                                <button
                                    className="px-3 py-2 rounded-md border border-[#CCE3FD] bg-white text-[#0A66B2] hover:bg-[#F4F8FF] text-[13px]"
                                    onClick={() => setWeekOffset(0)}
                                >
                                    Today
                                </button>
                            </div>
                        </div>
                    )}

                    {/* =========== CALENDAR VIEW =========== */}
                    {tab === 'calendar' ? (
                        <div className="overflow-x-auto px-4">
                            {isLoading ? (
                                <CalendarSkeleton />
                            ) : (
                                <table className="min-w-full text-left text-[14px] border-collapse">
                                    <thead>
                                        <tr className="bg-[#F9FBFC] text-[#475467] border-b border-[#E4E7EC]">
                                            <th className="px-3 py-2 font-medium w-[80px] whitespace-nowrap">Time</th>
                                            {weekDays.map((d) => (
                                                <th
                                                    key={toDateString(d)}
                                                    className={`px-3 py-2 font-medium min-w-[110px] ${toDateString(d) === toDateString(new Date()) ? 'text-[#002E62]' : ''}`}
                                                >
                                                    {formatWeekDay(d)}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {timeSlots.map((slot, rowIdx) => (
                                            <tr key={slot} className="border-b border-[#F1F4F7]">
                                                <td className="px-3 py-3 font-medium text-[#475467] text-[12px] align-top whitespace-nowrap border-r border-[#E4E7EC]">
                                                    {formatTime12(slot)}
                                                </td>
                                                {weekDays.map((d) => {
                                                    const dateStr = toDateString(d);
                                                    // Find inspection starting at this exact slot on this day
                                                    const entry = calendarInspections.find(
                                                        (insp) =>
                                                            insp.scheduledDate === dateStr &&
                                                            timeToSlotIndex(insp.scheduledTime) === rowIdx
                                                    );
                                                    // Check if this cell is covered by a spanning entry (started earlier)
                                                    const spanning = calendarInspections.find((insp) => {
                                                        if (insp.scheduledDate !== dateStr) return false;
                                                        const startIdx = timeToSlotIndex(insp.scheduledTime);
                                                        return rowIdx > startIdx && rowIdx < startIdx + 2;
                                                    });

                                                    if (entry) {
                                                        const colors = typeColors[entry.type] || typeColors.Virtual;
                                                        return (
                                                            <td key={dateStr} className="px-1 py-1 align-top" rowSpan={2}>
                                                                <div
                                                                    className={`h-full w-full border-l-4 p-2 flex gap-2 rounded-sm ${colors.bg} ${colors.border}`}
                                                                    style={{ minHeight: '88px' }}
                                                                >
                                                                    {avatar}
                                                                    <div className="flex flex-col min-w-0">
                                                                        <span className={`font-semibold text-[12px] leading-tight mb-0.5 truncate ${colors.text}`}>
                                                                            {entry.property?.name || 'Unknown Property'}
                                                                        </span>
                                                                        <span className="text-[11px] text-[#475467] leading-tight mb-0.5 truncate">
                                                                            {entry.unitName}
                                                                        </span>
                                                                        <span className="text-[11px] text-[#64748B] leading-tight">
                                                                            {entry.type}
                                                                        </span>
                                                                        <span className={`mt-1 text-[10px] font-semibold px-1.5 py-0.5 rounded-full self-start ${statusColors[entry.status] || 'bg-gray-100 text-gray-500'}`}>
                                                                            {entry.status}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        );
                                                    } else if (spanning) {
                                                        return null; // covered by rowSpan
                                                    } else {
                                                        return <td key={dateStr} className="px-1 py-1 border-r border-[#F1F4F7]" />;
                                                    }
                                                })}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                            {!isLoading && calendarInspections.length === 0 && (
                                <div className="flex flex-col items-center justify-center py-16 text-[#71717A]">
                                    <svg className="h-12 w-12 mb-3 text-[#CBD5E1]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                                        <rect x="3" y="4" width="18" height="18" rx="2" />
                                        <path d="M16 2v4M8 2v4M3 10h18" strokeLinecap="round" />
                                    </svg>
                                    <p className="text-[14px] font-medium">No inspections this week</p>
                                    <p className="text-[12px] mt-1">Navigate to another week or add a new inspection.</p>
                                </div>
                            )}
                        </div>
                    ) : (
                        /* =========== GRID VIEW =========== */
                        <div className="px-3">
                            {isLoading ? (
                                <GridSkeleton />
                            ) : gridInspections.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-16 text-[#71717A]">
                                    <svg className="h-12 w-12 mb-3 text-[#CBD5E1]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                                        <rect x="3" y="4" width="18" height="18" rx="2" />
                                        <path d="M16 2v4M8 2v4M3 10h18" strokeLinecap="round" />
                                    </svg>
                                    <p className="text-[14px] font-medium">No inspections found</p>
                                    <p className="text-[12px] mt-1">Try a different search or add a new inspection.</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {gridInspections.map((item: any) => {
                                        const colors = typeColors[item.type] || typeColors.Virtual;
                                        return (
                                            <div
                                                key={item.id}
                                                className="rounded-xl border border-[#E4E4E7] bg-white p-5 flex justify-between gap-4 items-start"
                                            >
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        {avatar}
                                                        <div className="min-w-0">
                                                            <div className="font-semibold text-[#002E62] text-[15px] truncate">
                                                                {item.property?.name || 'Unknown Property'}
                                                            </div>
                                                            <div className="text-[13px] text-[#71717A] font-medium truncate">
                                                                {item.property?.address || ''}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col gap-1 mt-2 pl-10">
                                                        <div className="text-[13px] text-[#002E62] font-semibold">
                                                            Unit: <span className="text-[#71717A] font-normal">{item.unitName}</span>
                                                        </div>
                                                        <div className="text-[13px] text-[#002E62] font-semibold">
                                                            Scheduled: <span className="text-[#71717A] font-normal">
                                                                {formatScheduledDate(item.scheduledDate, item.scheduledTime)}
                                                            </span>
                                                        </div>
                                                        <div className="text-[13px] text-[#002E62] font-semibold">
                                                            Inspection Type: <span className={`font-semibold ${colors.text}`}>{item.type}</span>
                                                        </div>
                                                        {item.hostingLink && (
                                                            <div className="text-[13px] text-[#002E62] font-semibold">
                                                                Link: <a
                                                                    href={item.hostingLink.startsWith('http') ? item.hostingLink : `https://${item.hostingLink}`}
                                                                    target="_blank" rel="noopener noreferrer"
                                                                    className="text-[#0A66B2] font-normal underline truncate"
                                                                >
                                                                    {item.hostingLink}
                                                                </a>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <span className={`px-3 py-1 rounded-full text-[12px] font-medium whitespace-nowrap flex-shrink-0 ${statusColors[item.status] || 'bg-gray-100 text-gray-500'}`}>
                                                    {item.status}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default InspectionPage;
