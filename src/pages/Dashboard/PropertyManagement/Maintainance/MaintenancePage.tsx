import React, { useState, useEffect } from 'react';
import { useGetAllMaintenancesQuery } from '@store/api/propertyMgt.api';

import StatusCard from './StatusCard';
import pendingIcon from './icons/pendinf.svg';
import progressIcon from './icons/progress.svg';
import scheduledIcon from './icons/scheduled.svg';
import completedIcon from './icons/completed.svg';
import RequestCard from '@components/cards/card/RequestCard';
import type { RequestStatus, Priority } from '@components/cards/card/RequestCard';
import Input from '@components/forms/Input';

const tabList = ['Pending', 'In-Progress', 'Scheduled', 'Completed'] as const;

const MaintenancePage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<(typeof tabList)[number]>('Pending');
    const [search, setSearch] = useState('');

    const { data: allMaintenancesData, isLoading } = useGetAllMaintenancesQuery();
    const maintenanceRequests = allMaintenancesData?.data || [];

    // Calculate dynamic stats
    const stats = [
        {
            label: 'Pending',
            value: maintenanceRequests.filter((r: any) => r.status === 'Pending').length,
            icon: <img src={pendingIcon} alt="Pending" className="h-12 w-12" />,
        },
        {
            label: 'In-Progress',
            value: maintenanceRequests.filter((r: any) => r.status === 'In-progress').length,
            icon: <img src={progressIcon} alt="In-Progress" className="h-12 w-12" />,
        },
        {
            label: 'Scheduled',
            value: maintenanceRequests.filter((r: any) => r.status === 'Scheduled').length,
            icon: <img src={scheduledIcon} alt="Scheduled" className="h-12 w-12" />,
        },
        {
            label: 'Completed',
            value: maintenanceRequests.filter((r: any) => r.status === 'Completed').length,
            icon: <img src={completedIcon} alt="Completed" className="h-12 w-12" />,
        },
    ];

    // Filter requests for active tab and search query
    const filteredRequests = maintenanceRequests
        .filter((r: any) => {
            if (activeTab === 'In-Progress') return r.status === 'In-progress';
            return r.status === activeTab;
        })
        .filter((r: any) => {
            if (!search) return true;
            const q = search.toLowerCase();
            return (
                r.title?.toLowerCase().includes(q) ||
                r.description?.toLowerCase().includes(q) ||
                r.property?.name?.toLowerCase().includes(q) ||
                r.assignedToName?.toLowerCase().includes(q) ||
                r.serviceType?.toLowerCase().includes(q)
            );
        });

    const mappedRequests = filteredRequests.map((r: any) => ({
        title: r.title,
        description: r.description,
        status: (r.status === 'In-progress' ? 'In-progress' : r.status) as RequestStatus,
        priority: r.priority as Priority,
        assignee: r.assignedToName || 'Unassigned',
        avatar: r.imageUrls[0],
        ownerName: r.property?.accountName,
        property: r.property?.name || 'N/A',
        serviceType: r.serviceType || 'Not specified',
        cost: r.serviceCost ? r.serviceCost.toLocaleString() : undefined,
        scheduled: r.scheduledDate ? new Date(r.scheduledDate).toLocaleDateString() : undefined,
        createdAt: r.createdAt ? new Date(r.createdAt).toLocaleDateString() : undefined,
        showActions: r.status === 'Pending',
        percent: r.status === 'Completed' ? 100 : (r.status === 'In-progress' ? 50 : 0), // Defaulting progress percentages
    }));

    useEffect(() => {
        if (allMaintenancesData) {
            console.log('All Maintenances Data:', allMaintenancesData);
        }
    }, [allMaintenancesData]);

    return (
        <div className="pb-10">
            <div className="mb-6 mt-4 max-w-300 mx-auto">
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {stats.map((s) => (
                        <StatusCard key={s.label} label={s.label} value={s.value} icon={s.icon} />
                    ))}
                </div>
                <div className="mt-8 rounded-xl border border-[#E8F4F8] bg-white p-6">
                    <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center sm:gap-6 sm:overflow-x-auto sm:flex-nowrap">
                        <div className="flex gap-2 sm:gap-6 overflow-x-auto sm:overflow-visible pb-2 sm:pb-0">
                            {tabList.map((tab) => (
                                <button
                                    key={tab}
                                    className={`px-3 py-1.5 text-sm font-semibold border-b-2 whitespace-nowrap ${activeTab === tab ? 'border-[#002E62] text-[#002E62]' : 'border-transparent text-[#71717A]'}`}
                                    onClick={() => setActiveTab(tab)}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                        <div className="flex items-center gap-2 sm:ml-auto">
                            <div className="relative flex-1 max-w-xs m-1">
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
                                <Input
                                    title={undefined}
                                    containerClassName="w-full"
                                    className="pl-9 pr-3 py-2 text-[14px]"
                                    placeholder="Search ..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {isLoading ? (
                        <div className="flex justify-center items-center py-20">
                            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#002E62]"></div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {mappedRequests.length > 0 ? (
                                mappedRequests.map((r:any, idx:any) => (
                                    <RequestCard key={idx} {...r} />
                                ))
                            ) : (
                                <div className="col-span-full text-center py-10 text-[#71717A]">
                                    No maintenance requests found for this category.
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};


export default MaintenancePage;
