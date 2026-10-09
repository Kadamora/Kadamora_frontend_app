import { useState, useMemo } from 'react';
import { FiSearch, FiChevronDown, FiChevronLeft, FiChevronRight, FiX, FiClock, FiMapPin, FiUser } from 'react-icons/fi';

interface CalendarEvent {
    id: string;
    guest: string;
    location: string;
    subLocation?: string;
    category: 'park-nature' | 'cities-destination' | 'hotel-resort' | 'events-festival' | 'art-culture';
    dayIndex: number; 
    spanDays?: number;
    startHour: number; 
    durationHours: number;
}

const CATEGORY_CONFIG: Record<
    CalendarEvent['category'],
    { label: string; dotColor: string; bg: string; border: string; text: string; subText: string; accentBar: string }
> = {
    'park-nature': {
        label: 'Park & Nature',
        dotColor: 'bg-[#0070F3]',
        bg: 'bg-[#EFF6FF]',
        border: 'border-[#BFDBFE]',
        text: '#0070F3',
        subText: '#3B82F6',
        accentBar: 'bg-[#0070F3]',
    },
    'cities-destination': {
        label: 'Cities & Destination',
        dotColor: 'bg-[#7C3AED]',
        bg: 'bg-[#F5F3FF]',
        border: 'border-[#DDD6FE]',
        text: '#6D28D9',
        subText: '#7C3AED',
        accentBar: 'bg-[#7C3AED]',
    },
    'hotel-resort': {
        label: 'Hotel & Resort',
        dotColor: 'bg-[#F43F5E]',
        bg: 'bg-[#FFF1F2]',
        border: 'border-[#FECDD3]',
        text: '#E11D48',
        subText: '#F43F5E',
        accentBar: 'bg-[#F43F5E]',
    },
    'events-festival': {
        label: 'Events & Festival',
        dotColor: 'bg-[#06B6D4]',
        bg: 'bg-[#ECFEFF]',
        border: 'border-[#A5F3FC]',
        text: '#0891B2',
        subText: '#06B6D4',
        accentBar: 'bg-[#06B6D4]',
    },
    'art-culture': {
        label: 'Art & Culture',
        dotColor: 'bg-[#16A34A]',
        bg: 'bg-[#F0FDF4]',
        border: 'border-[#BBF7D0]',
        text: '#15803D',
        subText: '#16A34A',
        accentBar: 'bg-[#16A34A]',
    },
};

const MOCK_EVENTS: CalendarEvent[] = [
    {
        id: 'ev-1',
        guest: 'Wellington David',
        location: 'Yankari Game Reserve - Resort',
        subLocation: 'G1',
        category: 'hotel-resort',
        dayIndex: 0,
        spanDays: 3,
        startHour: 12,
        durationHours: 2.5,
    },
    {
        id: 'ev-2',
        guest: 'Samuel Richard',
        location: 'Transcorp Hilton Hotel',
        category: 'hotel-resort',
        dayIndex: 1,
        spanDays: 2,
        startHour: 15,
        durationHours: 2.5,
    },
    {
        id: 'ev-3',
        guest: 'Dolapo Ade',
        location: 'Lekki Arts & Craft Market',
        category: 'art-culture',
        dayIndex: 1,
        spanDays: 1,
        startHour: 16,
        durationHours: 1.5,
    },
    {
        id: 'ev-4',
        guest: 'Godwin Friday',
        location: 'Ojaja Park',
        category: 'park-nature',
        dayIndex: 2,
        spanDays: 1,
        startHour: 16,
        durationHours: 4,
    },
    {
        id: 'ev-5',
        guest: 'Charles Daniel',
        location: 'Lekki Arts & Craft Market',
        category: 'art-culture',
        dayIndex: 3,
        spanDays: 1,
        startHour: 14,
        durationHours: 2,
    },
    {
        id: 'ev-6',
        guest: 'Adeoye Racheal',
        location: 'Ojude Oba Festival',
        category: 'events-festival',
        dayIndex: 4,
        spanDays: 1,
        startHour: 12,
        durationHours: 4,
    },
    {
        id: 'ev-7',
        guest: 'Francis Peter',
        location: 'Ojude Oba Festival',
        category: 'events-festival',
        dayIndex: 4,
        spanDays: 1,
        startHour: 16,
        durationHours: 4,
    },
    {
        id: 'ev-8',
        guest: 'Adeolu Daniel',
        location: 'Transcorp Hilton',
        subLocation: 'RoomB',
        category: 'hotel-resort',
        dayIndex: 0,
        spanDays: 3,
        startHour: 19,
        durationHours: 2,
    },
    {
        id: 'ev-9',
        guest: 'John David',
        location: 'Cultural Hub Lagos',
        category: 'cities-destination',
        dayIndex: 4,
        spanDays: 1,
        startHour: 20,
        durationHours: 2,
    },
];

const DAYS = [
    { label: 'Mon 15', date: '2025-06-15' },
    { label: 'Tue 16', date: '2025-06-16' },
    { label: 'Wed 17', date: '2025-06-17' },
    { label: 'Thu 18', date: '2025-06-18' },
    { label: 'Fri 19', date: '2025-06-19' },
];

const HOURS = [
    { label: '12 PM', hour: 12 },
    { label: '1 PM', hour: 13 },
    { label: '2 PM', hour: 14 },
    { label: '3 PM', hour: 15 },
    { label: '4 PM', hour: 16 },
    { label: '5 PM', hour: 17 },
    { label: '6 PM', hour: 18 },
    { label: '7 PM', hour: 19 },
    { label: '8 PM', hour: 20 },
    { label: '9 PM', hour: 21 },
    { label: '10 PM', hour: 22 },
];

type ViewMode = 'Week' | 'Day' | 'Month';

export default function HTCalendarPage() {
    const [viewMode, setViewMode] = useState<ViewMode>('Week');
    const [search, setSearch] = useState('');
    const [selectedBusiness, setSelectedBusiness] = useState('all');
    const [selectedListing, setSelectedListing] = useState('all');
    const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

    const filteredEvents = useMemo(() => {
        return MOCK_EVENTS.filter((ev) => {
            const matchesSearch =
                ev.guest.toLowerCase().includes(search.toLowerCase()) ||
                ev.location.toLowerCase().includes(search.toLowerCase());
            const matchesBusiness =
                selectedBusiness === 'all' || ev.location.toLowerCase().includes(selectedBusiness.toLowerCase());
            const matchesListing =
                selectedListing === 'all' || ev.category === selectedListing;
            return matchesSearch && matchesBusiness && matchesListing;
        });
    }, [search, selectedBusiness, selectedListing]);

    return (
        <div className="space-y-6 max-w-7xl mx-auto pb-12 animate-fade-in">
            {/* Page Header */}
            <div>
                <h1 className="text-2xl font-bold text-[#002E62]">Calendar</h1>
                <p className="text-sm text-[#52525B] mt-1">
                    Choose the type of listing you want to create on Kadamora and start reaching thousands of travelers
                </p>
            </div>

            {/* Main Calendar Container */}
            <div className="bg-white border border-[#BED3EB] rounded-2xl overflow-hidden shadow-2xs">
                {/* Top Control Bar */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 sm:p-5 border-b border-[#E4E4E7] bg-white">
                    {/* Left: View Mode & Date Navigation */}
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <select
                                value={viewMode}
                                onChange={(e) => setViewMode(e.target.value as ViewMode)}
                                className="appearance-none pl-3.5 pr-8 py-1.5 text-xs sm:text-sm font-semibold bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[#0F172A] cursor-pointer focus:outline-none focus:border-[#002E62]"
                            >
                                <option value="Week">Week</option>
                                <option value="Day">Day</option>
                                <option value="Month">Month</option>
                            </select>
                            <FiChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#64748B] pointer-events-none" />
                        </div>

                        <button
                            type="button"
                            className="px-3.5 py-1.5 text-xs sm:text-sm font-semibold bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[#0F172A] hover:bg-slate-100 transition-colors"
                        >
                            Today
                        </button>

                        <div className="flex items-center gap-1 text-[#64748B]">
                            <button
                                type="button"
                                className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors"
                                title="Previous week"
                            >
                                <FiChevronLeft className="h-4 w-4" />
                            </button>
                            <button
                                type="button"
                                className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors"
                                title="Next week"
                            >
                                <FiChevronRight className="h-4 w-4" />
                            </button>
                        </div>
                    </div>

                    {/* Right: Search & Filters */}
                    <div className="flex items-center gap-3 w-full md:w-auto flex-wrap sm:flex-nowrap">
                        {/* Search Input */}
                        <div className="relative flex-1 sm:w-56">
                            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#94A3B8]" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search"
                                className="w-full pl-9 pr-4 py-1.5 text-xs sm:text-sm bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-slate-800 placeholder-[#94A3B8] focus:outline-none focus:border-[#002E62]"
                            />
                        </div>

                        {/* All Businesses Filter */}
                        <div className="relative">
                            <select
                                value={selectedBusiness}
                                onChange={(e) => setSelectedBusiness(e.target.value)}
                                className="appearance-none pl-3.5 pr-8 py-1.5 text-xs sm:text-sm font-medium bg-[#F3F9FF] border border-[#CCE3FD] rounded-lg text-[#002E62] cursor-pointer focus:outline-none"
                            >
                                <option value="all">All Businesses</option>
                                <option value="Yankari">Yankari Game Reserve</option>
                                <option value="Transcorp">Transcorp Hilton</option>
                                <option value="Ojaja">Ojaja Park</option>
                                <option value="Lekki">Lekki Arts & Craft</option>
                                <option value="Ojude Oba">Ojude Oba Festival</option>
                            </select>
                            <FiChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#002E62] pointer-events-none" />
                        </div>

                        {/* All Listing Filter */}
                        <div className="relative">
                            <select
                                value={selectedListing}
                                onChange={(e) => setSelectedListing(e.target.value)}
                                className="appearance-none pl-3.5 pr-8 py-1.5 text-xs sm:text-sm font-medium bg-[#F3F9FF] border border-[#CCE3FD] rounded-lg text-[#002E62] cursor-pointer focus:outline-none"
                            >
                                <option value="all">All Listing</option>
                                <option value="park-nature">Park & Nature</option>
                                <option value="cities-destination">Cities & Destination</option>
                                <option value="hotel-resort">Hotel & Resort</option>
                                <option value="events-festival">Events & Festival</option>
                                <option value="art-culture">Art & Culture</option>
                            </select>
                            <FiChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#002E62] pointer-events-none" />
                        </div>
                    </div>
                </div>

                {/* Calendar Schedule Grid Area */}
                <div className="overflow-x-auto">
                    <div className="min-w-[800px]">
                        {/* Days Header Row */}
                        <div className="grid grid-cols-[80px_repeat(5,1fr)] border-b border-[#E2E8F0] bg-[#FAFAFA]">
                            <div className="p-3 text-xs font-semibold text-[#64748B] flex items-center justify-center border-r border-[#E2E8F0]">
                                EST
                            </div>
                            {DAYS.map((d) => (
                                <div
                                    key={d.label}
                                    className="p-3 text-center text-xs font-bold text-[#1E293B] border-r last:border-r-0 border-[#E2E8F0]"
                                >
                                    {d.label}
                                </div>
                            ))}
                        </div>

                        {/* Grid Content Area with Time Slots */}
                        <div className="relative">
                            {/* Grid Lines background */}
                            <div className="divide-y divide-[#E2E8F0]/70">
                                {HOURS.map((h) => (
                                    <div
                                        key={h.hour}
                                        className="grid grid-cols-[80px_repeat(5,1fr)] h-14"
                                    >
                                        <div className="px-3 text-xs font-medium text-[#64748B] flex items-center justify-center border-r border-[#E2E8F0] bg-[#FAFAFA]/50">
                                            {h.label}
                                        </div>
                                        <div className="border-r border-[#E2E8F0]/60" />
                                        <div className="border-r border-[#E2E8F0]/60" />
                                        <div className="border-r border-[#E2E8F0]/60" />
                                        <div className="border-r border-[#E2E8F0]/60" />
                                        <div className="border-r-0" />
                                    </div>
                                ))}
                            </div>

                            {/* Positioned Overlay Events */}
                            <div className="absolute inset-0 left-[80px] pointer-events-none">
                                <div className="grid grid-cols-5 h-full relative">
                                    {filteredEvents.map((ev) => {
                                        const config = CATEGORY_CONFIG[ev.category];

                                        // Calculate top & height based on hour range (12pm = 0, 10pm = 10, total 10 slots * 56px = 560px)
                                        const startOffset = ev.startHour - 12;
                                        const topPx = startOffset * 56;
                                        const heightPx = ev.durationHours * 56;

                                        // Calculate left column & width span
                                        const span = ev.spanDays ?? 1;
                                        const leftPercent = ev.dayIndex * 20;
                                        const widthPercent = span * 20;

                                        return (
                                            <div
                                                key={ev.id}
                                                onClick={() => setSelectedEvent(ev)}
                                                style={{
                                                    top: `${topPx + 2}px`,
                                                    height: `${heightPx - 4}px`,
                                                    left: `${leftPercent}%`,
                                                    width: `calc(${widthPercent}% - 4px)`,
                                                }}
                                                className={`absolute z-10 rounded-lg p-2.5 border ${config.bg} ${config.border} transition-all duration-200 hover:shadow-md cursor-pointer pointer-events-auto overflow-hidden flex flex-col justify-start group`}
                                            >
                                                {/* Accent Left Bar */}
                                                <div
                                                    className={`absolute left-0 top-0 bottom-0 w-1.5 ${config.accentBar} rounded-l-lg`}
                                                />

                                                <div className="pl-1.5">
                                                    <h5
                                                        className="text-xs font-bold leading-tight truncate"
                                                        style={{ color: config.text }}
                                                    >
                                                        {ev.guest}
                                                    </h5>
                                                    <p
                                                        className="text-[11px] font-medium leading-tight truncate mt-0.5"
                                                        style={{ color: config.subText }}
                                                    >
                                                        {ev.location}
                                                    </p>
                                                    {ev.subLocation && (
                                                        <span
                                                            className="text-[10px] font-semibold block leading-tight truncate"
                                                            style={{ color: config.subText }}
                                                        >
                                                            {ev.subLocation}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Legend Bar */}
                <div className="p-4 sm:px-6 border-t border-[#E4E4E7] bg-white flex items-center gap-6 flex-wrap text-xs font-semibold text-[#002E62]">
                    {(Object.keys(CATEGORY_CONFIG) as Array<keyof typeof CATEGORY_CONFIG>).map((key) => {
                        const item = CATEGORY_CONFIG[key];
                        return (
                            <div key={key} className="flex items-center gap-2">
                                <span className={`h-3 w-3 rounded-full ${item.dotColor} shrink-0`} />
                                <span>{item.label}</span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Event Detail Modal */}
            {selectedEvent && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-fade-in">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 space-y-4 animate-scale-in">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold text-[#002E62] bg-[#EBF3FF]">
                                <span
                                    className={`h-2 w-2 rounded-full ${
                                        CATEGORY_CONFIG[selectedEvent.category].dotColor
                                    }`}
                                />
                                {CATEGORY_CONFIG[selectedEvent.category].label}
                            </span>
                            <button
                                type="button"
                                onClick={() => setSelectedEvent(null)}
                                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
                            >
                                <FiX className="h-4 w-4" />
                            </button>
                        </div>

                        <div className="space-y-3 pt-1">
                            <div className="flex items-center gap-3 text-slate-700">
                                <FiUser className="h-5 w-5 text-[#002E62] shrink-0" />
                                <div>
                                    <p className="text-xs text-slate-400">Guest Name</p>
                                    <p className="text-sm font-bold text-[#0F172A]">{selectedEvent.guest}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 text-slate-700">
                                <FiMapPin className="h-5 w-5 text-[#002E62] shrink-0" />
                                <div>
                                    <p className="text-xs text-slate-400">Location / Venue</p>
                                    <p className="text-sm font-semibold text-[#0F172A]">
                                        {selectedEvent.location} {selectedEvent.subLocation ? `(${selectedEvent.subLocation})` : ''}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 text-slate-700">
                                <FiClock className="h-5 w-5 text-[#002E62] shrink-0" />
                                <div>
                                    <p className="text-xs text-slate-400">Schedule Time</p>
                                    <p className="text-sm font-semibold text-[#0F172A]">
                                        {HOURS.find((h) => h.hour === selectedEvent.startHour)?.label ?? '12 PM'} - {selectedEvent.durationHours} Hours duration
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-2">
                            <button
                                type="button"
                                onClick={() => setSelectedEvent(null)}
                                className="w-full py-2.5 bg-[#002E62] hover:bg-[#072440] text-white font-semibold text-sm rounded-xl transition-colors cursor-pointer"
                            >
                                Close Details
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
