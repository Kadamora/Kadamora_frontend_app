import { useGetSupportTicketStatsQuery } from '@store/api/supportTicket.api';

const TicketList = ({ tickets, onSelectTicket, isLoading }: { tickets: any[], onSelectTicket: (id: string) => void, isLoading?: boolean }) => {
    const { data: statsData } = useGetSupportTicketStatsQuery();
    const stats = statsData?.data || {};

    const formatDate = (dateStr: string) => {
        if (!dateStr) return 'N/A';
        try {
            return new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
        } catch (e) {
            return dateStr;
        }
    };

    return (
        <div className="w-full bg-white rounded-xl shadow-sm border border-[#E4E7EC] p-8">
            <h2 className="text-[18px] font-bold text-[#002E62] mb-6">Support</h2>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="border border-[#E4E7EC] shadow-sm rounded-xl p-5 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-[45px] h-[45px] rounded-full bg-[#EBF5FF] flex items-center justify-center">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0077FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                <line x1="3" y1="9" x2="21" y2="9" />
                                <line x1="9" y1="21" x2="9" y2="9" />
                            </svg>
                        </div>
                        <div>
                            <div className="text-[20px] font-bold text-[#002E62]">{stats.total || '0'}</div>
                            <div className="text-[12px] font-medium text-[#71717A]">Total Ticket</div>
                        </div>
                    </div>
                </div>
                <div className="border border-[#E4E7EC] shadow-sm rounded-xl p-5 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-[45px] h-[45px] rounded-full bg-[#EBF9F1] flex items-center justify-center">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00C48C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="12" y1="16" x2="12" y2="12" />
                                <line x1="12" y1="8" x2="12.01" y2="8" />
                            </svg>
                        </div>
                        <div>
                            <div className="text-[20px] font-bold text-[#002E62]">{stats.open || '0'}</div>
                            <div className="text-[12px] font-medium text-[#71717A]">Open Tickets</div>
                        </div>
                    </div>
                </div>
                <div className="border border-[#E4E7EC] shadow-sm rounded-xl p-5 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-[45px] h-[45px] rounded-full bg-[#FFF5EB] flex items-center justify-center">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F5A623" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10" />
                                <polyline points="12 6 12 12 16 14" />
                            </svg>
                        </div>
                        <div>
                            <div className="text-[20px] font-bold text-[#002E62]">{stats.inProgress || '0'}</div>
                            <div className="text-[12px] font-medium text-[#71717A]">In-progress Tickets</div>
                        </div>
                    </div>
                </div>
                <div className="border border-[#E4E7EC] shadow-sm rounded-xl p-5 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-[45px] h-[45px] rounded-full bg-[#FFEBEF] flex items-center justify-center">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FF5470" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                <polyline points="22 4 12 14.01 9 11.01" />
                            </svg>
                        </div>
                        <div>
                            <div className="text-[20px] font-bold text-[#002E62]">{stats.closed || '0'}</div>
                            <div className="text-[12px] font-medium text-[#71717A]">Closed Tickets</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                    <h3 className="text-[16px] font-bold text-[#002E62]">Manage Tickets</h3>
                    <p className="text-[13px] text-[#71717A]">View and manage all support tickets</p>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-3">
                    <div className="relative w-full sm:w-[220px]">
                        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input 
                            type="text" 
                            placeholder="Search" 
                            className="w-full pl-9 pr-4 py-2 border border-[#E4E7EC] rounded-lg text-[14px] focus:outline-none focus:border-[#0A66B2]"
                        />
                    </div>
                    <select className="w-full sm:w-auto py-2 px-3 border border-[#E4E7EC] rounded-lg text-[14px] text-[#002E62] bg-white focus:outline-none focus:border-[#0A66B2]">
                        <option>All Priority</option>
                        <option>High</option>
                        <option>Medium</option>
                        <option>Low</option>
                    </select>
                    <select className="w-full sm:w-auto py-2 px-3 border border-[#E4E7EC] rounded-lg text-[14px] text-[#002E62] bg-white focus:outline-none focus:border-[#0A66B2]">
                        <option>All Status</option>
                        <option>Open</option>
                        <option>In progress</option>
                        <option>Closed</option>
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left text-[14px] whitespace-nowrap">
                    <thead>
                        <tr className="border-b border-[#E4E7EC] text-[#71717A] text-[13px]">
                            <th className="py-3 px-2 font-medium">Ticket ID</th>
                            <th className="py-3 px-2 font-medium">Title</th>
                            <th className="py-3 px-2 font-medium">Category</th>
                            <th className="py-3 px-2 font-medium">Priority</th>
                            <th className="py-3 px-2 font-medium">Created Date</th>
                            <th className="py-3 px-2 font-medium">Status</th>
                            <th className="py-3 px-2 font-medium">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F1F4F7]">
                        {isLoading ? (
                            [1, 2, 3, 4, 5].map((i) => (
                                <tr key={i} className="animate-pulse">
                                    <td className="py-4 px-2"><div className="h-4 bg-gray-100 rounded w-16" /></td>
                                    <td className="py-4 px-2"><div className="h-4 bg-gray-100 rounded w-48" /></td>
                                    <td className="py-4 px-2"><div className="h-4 bg-gray-100 rounded w-20" /></td>
                                    <td className="py-4 px-2"><div className="h-4 bg-gray-100 rounded w-16" /></td>
                                    <td className="py-4 px-2"><div className="h-4 bg-gray-100 rounded w-24" /></td>
                                    <td className="py-4 px-2"><div className="h-6 bg-gray-100 rounded-full w-20" /></td>
                                    <td className="py-4 px-2"><div className="h-8 w-8 bg-gray-100 rounded-full" /></td>
                                </tr>
                            ))
                        ) : tickets.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="py-10 text-center text-[#71717A]">No support tickets found.</td>
                            </tr>
                        ) : (
                            tickets.map((t, idx) => (
                                <tr key={idx} className={idx % 2 === 0 ? "bg-[#F8FAFC]" : "bg-white"}>
                                    <td className="py-3 px-2 text-[#71717A]">#{t.id.slice(-6)}</td>
                                    <td className="py-3 px-2 text-[#002E62] font-medium">{t.subject}</td>
                                    <td className="py-3 px-2 text-[#002E62]">{t.category || 'General'}</td>
                                    <td className="py-3 px-2">
                                        <span className={`text-[12px] font-medium 
                                            ${t.priority === 'High' ? 'text-red-500' : ''}
                                            ${t.priority === 'Medium' ? 'text-amber-500' : ''}
                                            ${t.priority === 'Low' ? 'text-blue-500' : ''}
                                        `}>
                                            {t.priority}
                                        </span>
                                    </td>
                                    <td className="py-3 px-2 text-[#71717A]">{formatDate(t.createdAt)}</td>
                                    <td className="py-3 px-2">
                                        <span className={`px-2.5 py-1 rounded-full text-[12px] font-semibold
                                            ${t.status === 'Open' ? 'bg-[#E8F8F2] text-[#00C48C]' : ''}
                                            ${t.status === 'Pending' || t.status === 'In-progress' ? 'bg-[#FFF5EB] text-[#F5A623]' : ''}
                                            ${t.status === 'Closed' ? 'bg-[#FFEBEF] text-[#FF5470]' : ''}
                                        `}>
                                            {t.status}
                                        </span>
                                    </td>
                                    <td className="py-3 px-2">
                                        <button 
                                            onClick={() => onSelectTicket(t.id)}
                                            className="w-8 h-8 flex items-center justify-center rounded-full border border-[#E4E7EC] hover:bg-[#F1F5F9] transition text-[#71717A]"
                                        >
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                                <circle cx="12" cy="12" r="3" />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TicketList;
