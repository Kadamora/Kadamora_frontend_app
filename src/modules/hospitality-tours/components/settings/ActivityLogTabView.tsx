import React, { useState } from 'react';
import { FiSearch, FiChevronDown } from 'react-icons/fi';

interface ActivityLogItem {
    id: string;
    initials: string;
    user: string;
    action: string;
    meta: string;
    date: string;
}

const MOCK_LOGS: ActivityLogItem[] = [
    {
        id: 'log-1',
        initials: 'EC',
        user: 'Jackson Hall',
        action: 'initiated and completed the download of a receipt',
        meta: 'Tour guide',
        date: '9th June, 2025 01:50 PM',
    },
    {
        id: 'log-2',
        initials: 'JH',
        user: 'Noah Hill',
        action: 'was invited by Emily Carter.',
        meta: 'Admin',
        date: '17th June, 2025 10:50 AM',
    },
    {
        id: 'log-3',
        initials: 'IW',
        user: 'Liam King',
        action: 'was successfully created a park (Mungo Jung Park)',
        meta: 'Owner',
        date: '5th June, 2025 02:50 PM',
    },
    {
        id: 'log-4',
        initials: 'NH',
        user: 'Noah Hall',
        action: 'initiated and completed the receipt download',
        meta: 'Admin',
        date: '30th May, 2025 10:50 AM',
    },
    {
        id: 'log-5',
        initials: 'SW',
        user: 'Shawn White',
        action: 'initiated and completed the creation of a new timeline',
        meta: 'Admin',
        date: '24th May, 2025 10:50 AM',
    },
    {
        id: 'log-6',
        initials: 'BJ',
        user: 'Ben John',
        action: 'added Ojude Oba Festival Event to the timeline',
        meta: 'Event Manager',
        date: '19th May, 2025 10:50 PM',
    },
    {
        id: 'log-7',
        initials: 'JH',
        user: 'Jackson Hall',
        action: 'initiated and completed the download of a receipt',
        meta: 'Owner',
        date: '16th May, 2025 11:55 AM',
    },
];

export default function ActivityLogTabView() {
    const [search, setSearch] = useState('');
    const [selectedService, setSelectedService] = useState('');
    const [selectedUnit, setSelectedUnit] = useState('');
    const [selectedUser, setSelectedUser] = useState('');
    const [selectedDate, setSelectedDate] = useState('');

    return (
        <div className="bg-white border border-[#BED3EB] rounded-2xl p-6 sm:p-8 shadow-2xs animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column: Search & Filter Controls */}
                <div className="lg:col-span-5 space-y-6">
                    {/* Search Logs */}
                    <div className="space-y-2">
                        <h4 className="text-sm font-bold text-[#0F172A]">Search Logs</h4>
                        <div className="relative">
                            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#94A3B8]" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search"
                                className="w-full pl-9 pr-4 py-2.5 text-xs sm:text-sm bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-slate-800 focus:outline-none focus:border-[#002E62]"
                            />
                        </div>
                    </div>

                    {/* Filter Logs Form */}
                    <div className="space-y-4 pt-2">
                        <h4 className="text-sm font-bold text-[#0F172A]">Filter Logs</h4>

                        {/* Service & Unit Row */}
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs font-semibold text-[#0F172A] mb-1">Service</label>
                                <div className="relative">
                                    <select
                                        value={selectedService}
                                        onChange={(e) => setSelectedService(e.target.value)}
                                        className="w-full appearance-none px-3 py-2 text-xs bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-[#0F172A] focus:outline-none cursor-pointer"
                                    >
                                        <option value="">Select service type</option>
                                        <option value="Timeline">Timeline</option>
                                        <option value="Listings">Listings</option>
                                        <option value="Bookings">Bookings</option>
                                    </select>
                                    <FiChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#64748B] pointer-events-none" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-[#0F172A] mb-1">Unit</label>
                                <div className="relative">
                                    <select
                                        value={selectedUnit}
                                        onChange={(e) => setSelectedUnit(e.target.value)}
                                        className="w-full appearance-none px-3 py-2 text-xs bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-[#0F172A] focus:outline-none cursor-pointer"
                                    >
                                        <option value="">Select Unit</option>
                                        <option value="Unit 1">Unit 1</option>
                                        <option value="Unit 2">Unit 2</option>
                                    </select>
                                    <FiChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#64748B] pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        {/* User Select */}
                        <div>
                            <label className="block text-xs font-semibold text-[#0F172A] mb-1">User</label>
                            <div className="relative">
                                <select
                                    value={selectedUser}
                                    onChange={(e) => setSelectedUser(e.target.value)}
                                    className="w-full appearance-none px-3.5 py-2 text-xs sm:text-sm bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-[#0F172A] focus:outline-none cursor-pointer"
                                >
                                    <option value="">Select user</option>
                                    <option value="Jackson Hall">Jackson Hall</option>
                                    <option value="Noah Hill">Noah Hill</option>
                                    <option value="Liam King">Liam King</option>
                                </select>
                                <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#64748B] pointer-events-none" />
                            </div>
                        </div>

                        {/* Date Select */}
                        <div>
                            <label className="block text-xs font-semibold text-[#0F172A] mb-1">Date</label>
                            <div className="relative">
                                <select
                                    value={selectedDate}
                                    onChange={(e) => setSelectedDate(e.target.value)}
                                    className="w-full appearance-none px-3.5 py-2 text-xs sm:text-sm bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-[#0F172A] focus:outline-none cursor-pointer"
                                >
                                    <option value="">Select Date</option>
                                    <option value="Today">Today</option>
                                    <option value="This Week">This Week</option>
                                    <option value="This Month">This Month</option>
                                </select>
                                <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#64748B] pointer-events-none" />
                            </div>
                        </div>

                        {/* Filter Button */}
                        <div className="pt-2">
                            <button
                                type="button"
                                onClick={() => alert('Filters applied')}
                                className="px-7 py-2.5 bg-[#002E62] hover:bg-[#072440] text-white text-xs sm:text-sm font-bold rounded-xl transition-colors cursor-pointer shadow-2xs"
                            >
                                Filter Log
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Column: Activity Log Timeline */}
                <div className="lg:col-span-7 border-t lg:border-t-0 lg:border-l border-[#E2E8F0] pt-6 lg:pt-0 lg:pl-8">
                    <div className="relative pl-6 space-y-6 before:absolute before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-[#E2E8F0]">
                        {MOCK_LOGS.map((item) => (
                            <div key={item.id} className="relative flex items-start gap-4">
                                {/* Initials Badge Circle */}
                                <div className="absolute -left-[30px] top-0 w-8 h-8 rounded-full bg-[#F8FAFC] border border-[#CBD5E1] text-[#0F172A] font-semibold text-xs flex items-center justify-center shrink-0 z-10">
                                    {item.initials}
                                </div>

                                <div className="pl-3">
                                    <p className="text-xs sm:text-sm text-[#334155] leading-snug">
                                        <strong className="font-bold text-[#0F172A]">{item.user}</strong> {item.action}
                                    </p>
                                    <p className="text-[11px] text-[#94A3B8] font-medium mt-1">
                                        {item.meta} • {item.date}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
