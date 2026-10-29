import { FiSearch, FiSliders } from 'react-icons/fi';
import MaintenanceOverviewCards from './MaintenanceOverviewCards';
import MaintenanceCard from './MaintenanceCard';
import type { MaintenanceRequest } from '../types/propertyManagement';

export interface MaintenanceViewProps {
    requests: MaintenanceRequest[];
    activeStatusTab: 'Pending' | 'In- Progress' | 'Scheduled' | 'Completed';
    onChangeStatusTab: (status: 'Pending' | 'In- Progress' | 'Scheduled' | 'Completed') => void;
    searchQuery: string;
    onSearchChange: (query: string) => void;
    counts: {
        pending: string;
        inProgress: string;
        scheduled: string;
        completed: string;
    };
    onViewDetails: (request: MaintenanceRequest) => void;
    onAssign: (request: MaintenanceRequest) => void;
}

export default function MaintenanceView({
    requests,
    activeStatusTab,
    onChangeStatusTab,
    searchQuery,
    onSearchChange,
    counts,
    onViewDetails,
    onAssign,
}: MaintenanceViewProps) {
    const tabs: Array<'Pending' | 'In- Progress' | 'Completed'> = [
        'Pending',
        'In- Progress',
        'Completed',
    ];

    return (
        <div className="space-y-6">
            {/* Top 4 Overview Metric Cards */}
            <MaintenanceOverviewCards
                activeStatus={activeStatusTab}
                onSelectStatus={onChangeStatusTab}
                counts={counts}
            />

            {/* Inner Main Card Container */}
            <div className="rounded-lg border border-[#E4E4E7] bg-white p-5 sm:p-6 shadow-xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#F1F5F9] pb-3">
                    {/* Sub-tabs: Pending, In- Progress, Completed */}
                    <div className="flex items-center gap-6 sm:gap-8">
                        {tabs.map((tab) => {
                            const isActive = activeStatusTab === tab;
                            return (
                                <button
                                    key={tab}
                                    type="button"
                                    onClick={() => onChangeStatusTab(tab)}
                                    className={`relative text-xs sm:text-sm transition-colors cursor-pointer pb-2 ${
                                        isActive
                                            ? 'font-bold text-[#091E42] border-b-2 border-[#002E62]'
                                            : 'font-medium text-[#64748B] hover:text-[#091E42]'
                                    }`}
                                >
                                    {tab}
                                </button>
                            );
                        })}
                    </div>

                    {/* Search & Filter */}
                    <div className="flex items-center gap-2 self-stretch sm:self-auto">
                        <div className="relative flex-1 sm:w-64">
                            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-3.5 w-3.5" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => onSearchChange(e.target.value)}
                                placeholder="Search ..."
                                className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-[#BED3EB] bg-white text-xs text-[#091E42] placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#002E62] focus:border-[#002E62]"
                            />
                        </div>

                        <button
                            type="button"
                            className="p-2 rounded-lg border border-[#BED3EB] text-[#093154] hover:bg-slate-50 transition-colors cursor-pointer shrink-0"
                            aria-label="Filter requests"
                        >
                            <FiSliders className="h-3.5 w-3.5" />
                        </button>
                    </div>
                </div>

                {/* Maintenance Request Cards Grid */}
                {requests.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                        {requests.map((req) => (
                            <MaintenanceCard
                                key={req.id}
                                request={req}
                                onViewDetails={onViewDetails}
                                onAssign={onAssign}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="py-16 text-center text-slate-400">
                        <p className="text-sm font-medium">
                            No requests found for <span className="font-semibold text-slate-600">"{activeStatusTab}"</span>
                            {searchQuery ? ` matching "${searchQuery}"` : ''}.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
