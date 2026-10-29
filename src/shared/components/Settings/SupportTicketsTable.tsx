import { useState, useMemo } from 'react';
import { FiSearch, FiChevronDown, FiMessageSquare, FiInfo, FiClock, FiCheckCircle, FiEye } from 'react-icons/fi';
import Table, { type Column } from '../Table/Table';

export interface SupportTicketItem {
    id: string;
    title: string;
    user: string;
    type?: string;
    createdDate: string;
    status: 'Open' | 'In progress' | 'Closed';
    priority?: 'High' | 'Medium' | 'Low';
    description?: string;
}

export interface SupportTicketStats {
    total: number;
    open: number;
    inProgress: number;
    closed: number;
}

export interface SupportTicketsTableProps {
    tickets: SupportTicketItem[];
    stats?: SupportTicketStats;
    onViewTicket: (ticket: SupportTicketItem) => void;
    className?: string;
}

export default function SupportTicketsTable({
    tickets,
    stats,
    onViewTicket,
    className = '',
}: SupportTicketsTableProps) {
    const [search, setSearch] = useState('');
    const [priorityFilter, setPriorityFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');

    // Default computed stats if not explicitly passed
    const computedStats = useMemo(() => {
        if (stats) return stats;
        const total = tickets.length;
        const open = tickets.filter((t) => t.status.toLowerCase() === 'open').length;
        const inProgress = tickets.filter((t) => t.status.toLowerCase() === 'in progress').length;
        const closed = tickets.filter((t) => t.status.toLowerCase() === 'closed').length;
        return { total, open, inProgress, closed };
    }, [tickets, stats]);

    const filteredTickets = useMemo(() => {
        return tickets.filter((t) => {
            const matchesSearch =
                t.title.toLowerCase().includes(search.toLowerCase()) ||
                t.user.toLowerCase().includes(search.toLowerCase()) ||
                t.id.toLowerCase().includes(search.toLowerCase()) ||
                (t.type && t.type.toLowerCase().includes(search.toLowerCase()));

            const matchesPriority =
                priorityFilter === 'all' || (t.priority ?? '').toLowerCase() === priorityFilter.toLowerCase();

            const matchesStatus =
                statusFilter === 'all' || t.status.toLowerCase() === statusFilter.toLowerCase();

            return matchesSearch && matchesPriority && matchesStatus;
        });
    }, [tickets, search, priorityFilter, statusFilter]);

    const columns: Column<SupportTicketItem>[] = [
        {
            key: 'id',
            label: 'Ticket ID',
            cellClassName: 'px-6 py-4 text-xs font-semibold text-[#52525B]',
        },
        {
            key: 'title',
            label: 'Title',
            cellClassName: 'px-6 py-4 text-xs sm:text-sm font-semibold text-[#002E62]',
        },
        {
            key: 'user',
            label: 'Users',
            cellClassName: 'px-6 py-4 text-xs sm:text-sm font-medium text-[#52525B]',
        },
        {
            key: 'type',
            label: 'Type',
            cellClassName: 'px-6 py-4 text-xs sm:text-sm text-[#52525B]',
            render: (val) => val || '—',
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
                const s = (val || '').toLowerCase();
                let badgeStyle = 'bg-[#E0F2FE] text-[#0284C7] border-[#BAE6FD]';
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
                    onClick={() => onViewTicket(item)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-[#002E62] hover:bg-slate-100 transition-colors cursor-pointer"
                    title="View Ticket Details"
                >
                    <FiEye className="h-4 w-4" />
                </button>
            ),
        },
    ];

    return (
        <div className={`space-y-6 ${className}`}>
            {/* Top 4 Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Total Ticket */}
                <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 flex items-center gap-4 shadow-2xs">
                    <div className="w-12 h-12 rounded-xl bg-[#EFF6FF] text-[#0070F3] flex items-center justify-center shrink-0">
                        <FiMessageSquare className="h-6 w-6 stroke-[2.2]" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-[#0F172A]">
                            {String(computedStats.total).padStart(2, '0')}
                        </h3>
                        <p className="text-xs text-[#64748B] font-medium">Total Ticket</p>
                    </div>
                </div>

                {/* Open Tickets */}
                <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 flex items-center gap-4 shadow-2xs">
                    <div className="w-12 h-12 rounded-xl bg-[#F0FDF4] text-[#16A34A] flex items-center justify-center shrink-0">
                        <FiInfo className="h-6 w-6 stroke-[2.2]" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-[#0F172A]">
                            {String(computedStats.open).padStart(2, '0')}
                        </h3>
                        <p className="text-xs text-[#64748B] font-medium">Open Tickets</p>
                    </div>
                </div>

                {/* In-progress Tickets */}
                <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 flex items-center gap-4 shadow-2xs">
                    <div className="w-12 h-12 rounded-xl bg-[#FFFBEB] text-[#D97706] flex items-center justify-center shrink-0">
                        <FiClock className="h-6 w-6 stroke-[2.2]" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-[#0F172A]">
                            {String(computedStats.inProgress).padStart(2, '0')}
                        </h3>
                        <p className="text-xs text-[#64748B] font-medium">In-progress Tickets</p>
                    </div>
                </div>

                {/* Closed Tickets */}
                <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 flex items-center gap-4 shadow-2xs">
                    <div className="w-12 h-12 rounded-xl bg-[#FFF1F2] text-[#E11D48] flex items-center justify-center shrink-0">
                        <FiCheckCircle className="h-6 w-6 stroke-[2.2]" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-[#0F172A]">
                            {String(computedStats.closed).padStart(2, '0')}
                        </h3>
                        <p className="text-xs text-[#64748B] font-medium">Closed Tickets</p>
                    </div>
                </div>
            </div>

            {/* Manage Tickets Section */}
            <div className="bg-white border border-[#BED3EB] rounded-2xl overflow-hidden shadow-2xs">
                {/* Header & Controls Toolbar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 sm:px-6 border-b border-[#E2E8F0]">
                    <div>
                        <h3 className="text-base font-bold text-[#002E62]">Manage Tickets</h3>
                        <p className="text-xs text-[#64748B]">View and manage all support tickets</p>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto flex-wrap sm:flex-nowrap">
                        <div className="relative flex-1 sm:w-56">
                            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#94A3B8]" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search"
                                className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-slate-800 placeholder-[#94A3B8] focus:outline-none focus:border-[#002E62]"
                            />
                        </div>

                        <div className="relative">
                            <select
                                value={priorityFilter}
                                onChange={(e) => setPriorityFilter(e.target.value)}
                                className="appearance-none pl-3.5 pr-8 py-2 text-xs sm:text-sm font-medium bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-[#0F172A] cursor-pointer focus:outline-none"
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
                                className="appearance-none pl-3.5 pr-8 py-2 text-xs sm:text-sm font-medium bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-[#0F172A] cursor-pointer focus:outline-none"
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
        </div>
    );
}
