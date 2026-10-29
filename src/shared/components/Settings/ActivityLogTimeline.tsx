import { useState, useMemo } from 'react';
import { FiSearch, FiSliders } from 'react-icons/fi';
import FilterLogsModal from './FilterLogsModal';

export interface ActivityLogEntry {
    id: string;
    initials: string;
    user: string;
    action: string;
    meta: string;
    date: string;
}

export interface ActivityLogTimelineProps {
    logs: ActivityLogEntry[];
    className?: string;
}

export default function ActivityLogTimeline({
    logs,
    className = '',
}: ActivityLogTimelineProps) {
    const [search, setSearch] = useState('');
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [activeFilter, setActiveFilter] = useState<{
        service?: string;
        unit?: string;
        user?: string;
        date?: string;
    }>({});

    const filteredLogs = useMemo(() => {
        return logs.filter((item) => {
            const matchesSearch =
                item.user.toLowerCase().includes(search.toLowerCase()) ||
                item.action.toLowerCase().includes(search.toLowerCase()) ||
                item.meta.toLowerCase().includes(search.toLowerCase());

            const matchesUser =
                !activeFilter.user || item.user.toLowerCase().includes(activeFilter.user.toLowerCase());

            return matchesSearch && matchesUser;
        });
    }, [logs, search, activeFilter]);

    return (
        <div className={`bg-white border border-[#BED3EB] rounded-2xl shadow-xs overflow-hidden ${className}`}>
            {/* Header */}
            <div className="px-6 py-5 border-b border-[#F0F2F5]">
                <h2 className="text-base sm:text-lg font-bold text-[#002E62]">Activity Log</h2>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
                {/* Search & Filter Toolbar */}
                <div className="flex items-center gap-3 max-w-md">
                    <div className="relative flex-1">
                        <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#94A3B8]" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search"
                            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-slate-800 placeholder-[#94A3B8] focus:outline-none focus:border-[#002E62]"
                        />
                    </div>

                    <button
                        type="button"
                        onClick={() => setIsFilterModalOpen(true)}
                        className="p-2.5 rounded-xl border border-[#BED3EB] bg-[#F4F8FC] hover:bg-[#E9F2FA] text-[#002E62] transition-colors cursor-pointer shrink-0 shadow-2xs"
                        title="Filter Logs"
                    >
                        <FiSliders className="h-4 w-4" />
                    </button>
                </div>

                {/* Timeline */}
                <div className="pt-2 pl-4">
                    <div className="relative pl-6 space-y-8 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E2E8F0]">
                        {filteredLogs.map((item) => (
                            <div key={item.id} className="relative flex items-start gap-4">
                                {/* Initials Badge Circle */}
                                <div className="absolute -left-[30px] top-0 w-8 h-8 rounded-full bg-[#F8FAFC] border border-[#CBD5E1] text-[#002E62] font-bold text-xs flex items-center justify-center shrink-0 z-10 shadow-2xs">
                                    {item.initials}
                                </div>

                                <div className="pl-3">
                                    <p className="text-xs sm:text-sm text-[#334155] leading-relaxed">
                                        <strong className="font-bold text-[#002E62]">{item.user}</strong>{' '}
                                        {item.action}
                                    </p>
                                    <p className="text-[11px] text-[#64748B] font-medium mt-1">
                                        {item.meta} • {item.date}
                                    </p>
                                </div>
                            </div>
                        ))}

                        {filteredLogs.length === 0 && (
                            <div className="py-8 text-center text-slate-400 text-sm">
                                No activity logs found matching your search.
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Filter Modal */}
            <FilterLogsModal
                isOpen={isFilterModalOpen}
                onClose={() => setIsFilterModalOpen(false)}
                onApplyFilter={(filters) => setActiveFilter(filters)}
            />
        </div>
    );
}
