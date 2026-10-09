import React, { useState, useMemo } from 'react';
import { FiSearch, FiChevronDown, FiMessageSquare, FiInfo, FiClock, FiCheckCircle, FiEye } from 'react-icons/fi';
import Table, { type Column } from '@shared/components/Table/Table';
import HTTicketDetailView from './HTTicketDetailView';

interface SupportTicket {
    id: string;
    title: string;
    user: string;
    createdDate: string;
    status: 'Open' | 'In progress' | 'Closed';
    priority?: 'High' | 'Medium' | 'Low';
    description?: string;
}

const MOCK_TICKETS: SupportTicket[] = [
    {
        id: '#ticket-001',
        title: 'Request for maintenance in common areas',
        user: 'Charles John',
        createdDate: '14 Jun, 2025',
        status: 'Open',
        priority: 'High',
        description: 'Light fixtures in the main lobby need urgent replacement and routine maintenance.',
    },
    {
        id: '#ticket-002',
        title: 'Urgent plumbing issues in unit 3B',
        user: 'Felix Ayobami',
        createdDate: '30 Jun, 2025',
        status: 'In progress',
        priority: 'High',
        description: 'Water leak detected under bathroom sink causing minor flooding.',
    },
    {
        id: '#ticket-003',
        title: 'Security concerns in the parking lot',
        user: 'Alice Marie',
        createdDate: '28 May, 2025',
        status: 'In progress',
        priority: 'Medium',
        description: 'CCTV camera near entrance gate 2 is intermittently flickering.',
    },
    {
        id: '#ticket-004',
        title: 'Noise complaint from neighboring tenant',
        user: 'Robert James',
        createdDate: '20 May, 2025',
        status: 'Open',
        priority: 'Low',
        description: 'Late night loud music reported on weekends from floor 4.',
    },
    {
        id: '#ticket-005',
        title: 'Request for additional storage space',
        user: 'Sophia Grace',
        createdDate: '26 Apr, 2025',
        status: 'Open',
        priority: 'Low',
        description: 'Inquiry regarding availability of extra storage lockers in basement.',
    },
    {
        id: '#ticket-006',
        title: 'Inquiry about lease renewal process',
        user: 'Michael Andrew',
        createdDate: '12 Apr, 2025',
        status: 'Closed',
        priority: 'Medium',
        description: 'Confirmation requested for standard renewal terms for annual agreement.',
    },
    {
        id: '#ticket-007',
        title: 'Report of unauthorized access to facilities',
        user: 'Emily Rose',
        createdDate: '05 Mar, 2025',
        status: 'Closed',
        priority: 'High',
        description: 'Access keycard log audit requested for gym facility after hours.',
    },
    {
        id: '#ticket-008',
        title: 'Feedback on recent building improvements',
        user: 'David Thomas',
        createdDate: '22 Mar, 2025',
        status: 'Open',
        priority: 'Low',
        description: 'Positive feedback submitted regarding upgraded rooftop garden seating.',
    },
];

export default function SupportTabView() {
    const [search, setSearch] = useState('');
    const [priorityFilter, setPriorityFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [viewTicket, setViewTicket] = useState<SupportTicket | null>(null);

    const filteredTickets = useMemo(() => {
        return MOCK_TICKETS.filter((t) => {
            const matchesSearch =
                t.title.toLowerCase().includes(search.toLowerCase()) ||
                t.user.toLowerCase().includes(search.toLowerCase()) ||
                t.id.toLowerCase().includes(search.toLowerCase());
            const matchesPriority =
                priorityFilter === 'all' || (t.priority ?? '').toLowerCase() === priorityFilter.toLowerCase();
            const matchesStatus =
                statusFilter === 'all' || t.status.toLowerCase() === statusFilter.toLowerCase();
            return matchesSearch && matchesPriority && matchesStatus;
        });
    }, [search, priorityFilter, statusFilter]);

    const columns: Column<SupportTicket>[] = [
        {
            key: 'id',
            label: 'Ticket ID',
            cellClassName: 'px-6 py-4 text-xs font-semibold text-[#52525B]',
        },
        {
            key: 'title',
            label: 'Title',
            cellClassName: 'px-6 py-4 text-xs sm:text-sm font-semibold text-[#1E293B]',
        },
        {
            key: 'user',
            label: 'Users',
            cellClassName: 'px-6 py-4 text-xs sm:text-sm font-medium text-[#52525B]',
        },
        {
            key: 'createdDate',
            label: 'Created Date',
            cellClassName: 'px-6 py-4 text-xs sm:text-sm text-[#64748B]',
        },
        {
            key: 'status',
            label: 'Status',
            cellClassName: 'px-6 py-4',
            render: (val: string) => {
                const s = val.toLowerCase();
                let badgeStyle = 'bg-[#E6F0FF] text-[#0A66B2] border-[#BFDBFE]';
                if (s === 'in progress') badgeStyle = 'bg-[#FEF3C7] text-[#D97706] border-[#FDE68A]';
                if (s === 'closed') badgeStyle = 'bg-[#DCFCE7] text-[#16A34A] border-[#BBF7D0]';

                return (
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${badgeStyle}`}>
                        {val}
                    </span>
                );
            },
        },
        {
            key: 'action',
            label: 'Action',
            align: 'center',
            cellClassName: 'px-6 py-4',
            render: (_, item) => (
                <button
                    type="button"
                    onClick={() => setViewTicket(item)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-[#002E62] hover:bg-slate-100 transition-colors cursor-pointer"
                    title="View Ticket Details"
                >
                    <FiEye className="h-4 w-4" />
                </button>
            ),
        },
    ];

    if (viewTicket) {
        return (
            <HTTicketDetailView
                ticketId={viewTicket.id}
                ticketTitle={viewTicket.title}
                onBack={() => setViewTicket(null)}
            />
        );
    }

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Top Stat Cards Grid (4 Cards) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Total Ticket */}
                <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 flex items-center gap-4 shadow-2xs">
                    <div className="w-12 h-12 rounded-xl bg-[#EFF6FF] text-[#0070F3] flex items-center justify-center shrink-0">
                        <FiMessageSquare className="h-6 w-6 stroke-[2.2]" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-[#0F172A]">56</h3>
                        <p className="text-xs text-[#64748B] font-medium">Total Ticket</p>
                    </div>
                </div>

                {/* Open Tickets */}
                <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 flex items-center gap-4 shadow-2xs">
                    <div className="w-12 h-12 rounded-xl bg-[#F0FDF4] text-[#16A34A] flex items-center justify-center shrink-0">
                        <FiInfo className="h-6 w-6 stroke-[2.2]" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-[#0F172A]">12</h3>
                        <p className="text-xs text-[#64748B] font-medium">Open Tickets</p>
                    </div>
                </div>

                {/* In-progress Tickets */}
                <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 flex items-center gap-4 shadow-2xs">
                    <div className="w-12 h-12 rounded-xl bg-[#FFFBEB] text-[#D97706] flex items-center justify-center shrink-0">
                        <FiClock className="h-6 w-6 stroke-[2.2]" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-[#0F172A]">02</h3>
                        <p className="text-xs text-[#64748B] font-medium">In-progress Tickets</p>
                    </div>
                </div>

                {/* Closed Tickets */}
                <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 flex items-center gap-4 shadow-2xs">
                    <div className="w-12 h-12 rounded-xl bg-[#FFF1F2] text-[#E11D48] flex items-center justify-center shrink-0">
                        <FiCheckCircle className="h-6 w-6 stroke-[2.2]" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-[#0F172A]">20</h3>
                        <p className="text-xs text-[#64748B] font-medium">Closed Tickets</p>
                    </div>
                </div>
            </div>

            {/* Manage Tickets Section */}
            <div className="bg-white border border-[#BED3EB] rounded-2xl overflow-hidden shadow-2xs">
                {/* Header & Controls */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 sm:px-6 border-b border-[#E2E8F0]">
                    <div>
                        <h3 className="text-base font-bold text-[#0F172A]">Manage Tickets</h3>
                        <p className="text-xs text-[#64748B]">View and manage all support tickets</p>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        <div className="relative flex-1 sm:w-56">
                            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#94A3B8]" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search"
                                className="w-full pl-9 pr-4 py-1.5 text-xs sm:text-sm bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-slate-800 focus:outline-none focus:border-[#002E62]"
                            />
                        </div>

                        <div className="relative">
                            <select
                                value={priorityFilter}
                                onChange={(e) => setPriorityFilter(e.target.value)}
                                className="appearance-none pl-3.5 pr-8 py-1.5 text-xs sm:text-sm font-medium bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[#0F172A] cursor-pointer focus:outline-none"
                            >
                                <option value="all">All Priority</option>
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </select>
                            <FiChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#64748B] pointer-events-none" />
                        </div>

                        <div className="relative">
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="appearance-none pl-3.5 pr-8 py-1.5 text-xs sm:text-sm font-medium bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[#0F172A] cursor-pointer focus:outline-none"
                            >
                                <option value="all">All Status</option>
                                <option value="Open">Open</option>
                                <option value="In progress">In progress</option>
                                <option value="Closed">Closed</option>
                            </select>
                            <FiChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#64748B] pointer-events-none" />
                        </div>
                    </div>
                </div>

                {/* Table */}
                <Table
                    columns={columns}
                    data={filteredTickets}
                    showPagination={false}
                />
            </div>

            {/* Ticket Details Modal */}
            {viewTicket && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-fade-in">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 space-y-4 animate-scale-in">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                            <div>
                                <span className="text-xs font-bold text-[#002E62]">{viewTicket.id}</span>
                                <h3 className="text-base font-bold text-[#0F172A] mt-0.5">{viewTicket.title}</h3>
                            </div>
                            <button
                                type="button"
                                onClick={() => setViewTicket(null)}
                                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center"
                            >
                                <FiX className="h-4 w-4" />
                            </button>
                        </div>

                        <div className="space-y-3 text-xs sm:text-sm text-[#52525B]">
                            <div className="flex justify-between border-b border-slate-100 pb-2">
                                <span className="text-slate-400">Submitted By:</span>
                                <span className="font-semibold text-[#0F172A]">{viewTicket.user}</span>
                            </div>
                            <div className="flex justify-between border-b border-slate-100 pb-2">
                                <span className="text-slate-400">Created Date:</span>
                                <span className="font-semibold text-[#0F172A]">{viewTicket.createdDate}</span>
                            </div>
                            <div className="flex justify-between border-b border-slate-100 pb-2">
                                <span className="text-slate-400">Priority:</span>
                                <span className="font-semibold text-[#002E62]">{viewTicket.priority}</span>
                            </div>
                            <div>
                                <span className="text-slate-400 block mb-1">Description:</span>
                                <p className="p-3 bg-[#F8FAFC] rounded-xl border border-slate-200 leading-relaxed text-[#334155]">
                                    {viewTicket.description}
                                </p>
                            </div>
                        </div>

                        <div className="pt-2">
                            <button
                                type="button"
                                onClick={() => setViewTicket(null)}
                                className="w-full py-2.5 bg-[#002E62] text-white font-semibold text-sm rounded-xl hover:bg-[#072440] transition-colors"
                            >
                                Close Ticket View
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
