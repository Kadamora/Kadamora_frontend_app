import { useState, useMemo } from 'react';
import WelcomeBanner from '@modules/hospitality-tours/components/WelcomeBanner';
import StatCard from '@modules/hospitality-tours/components/StatCard';
import TableToolbar from '@modules/hospitality-tours/components/TableToolbar';
import Table, { type Column } from '@shared/components/Table/Table';
import StatusBadge from '@shared/components/Tag/StatusBadge';
import { bookings as mockBookings, currentUser } from '@modules/hospitality-tours/data/mock';
import type { Booking } from '@modules/hospitality-tours/types';

export default function HTDashboardHome() {
    const [search, setSearch] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    const filteredBookings = useMemo(() => {
        return mockBookings.filter((b) => {
            const matchesSearch =
                b.id.toLowerCase().includes(search.toLowerCase()) ||
                b.guest.toLowerCase().includes(search.toLowerCase()) ||
                b.event.toLowerCase().includes(search.toLowerCase());
            const matchesFilter =
                filterStatus === 'all' || b.status.toLowerCase() === filterStatus.toLowerCase();
            return matchesSearch && matchesFilter;
        });
    }, [search, filterStatus]);

    const columns: Column<Booking>[] = [
        {
            key: 'id',
            label: 'BOOKING ID',
            cellClassName: 'px-6 py-4  text-xs sm:text-sm',
        },
        {
            key: 'guest',
            label: 'GUEST',
            cellClassName: 'px-6 py-4 text-xs sm:text-sm',
        },
        {
            key: 'event',
            label: 'EVENT/SERVICE',
            cellClassName: 'px-6 py-4 text-xs sm:text-sm',
        },
        {
            key: 'date',
            label: 'DATE',
            cellClassName: 'px-6 py-4 text-xs sm:text-sm',
        },
        {
            key: 'tickets',
            label: 'TICKETS',
            cellClassName: 'px-6 py-4 text-xs sm:text-sm text-center sm:text-left',
            render: (val) => String(val).padStart(2, '0'),
        },
        {
            key: 'amount',
            label: 'AMOUNT',
            cellClassName: 'px-6 py-4  text-xs sm:text-sm',
            render: (val) => `₦${Number(val).toLocaleString()}`,
        },
        {
            key: 'status',
            label: 'STATUS',
            cellClassName: 'px-6 py-4',
            render: (val) => <StatusBadge status={val} />,
        },
    ];

    return (
        <div className="space-y-8 max-w-7xl mx-auto pb-12">
            {/* Greeting Header */}
            <WelcomeBanner
                title={`Welcome, ${currentUser.name.split(' ')[0]}!`}
                subtitle="Here's what's happening with your business today"
            />

            {/* Metrics Overview Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                {/* Left Highlight Primary Revenue Card */}
                <div className="lg:col-span-5">
                    <StatCard
                        title="Total Revenue"
                        value="NGN 98,370.80"
                        accent="blue"
                        iconSrc="/assets/icons/dashboard1.svg"
                        isPrimary
                        onActionClick={() => {}}
                        className="h-full min-h-[220px]"
                    />
                </div>

                {/* Right 2x2 Grid of Stat Cards */}
                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <StatCard
                        title="Total Bookings"
                        value="435"
                        accent="green"
                        iconSrc="/assets/icons/dashboard2.svg"
                        onActionClick={() => {}}
                    />
                    <StatCard
                        title="Total Visitors"
                        value="800"
                        accent="sky"
                        iconSrc="/assets/icons/dashboard3.svg"
                        onActionClick={() => {}}
                    />
                    <StatCard
                        title="Businesses Listed"
                        value="4"
                        accent="pink"
                        iconSrc="/assets/icons/dashboard4.svg"
                        onActionClick={() => {}}
                    />
                    <StatCard
                        title="Average Ratings"
                        value="4.8"
                        accent="amber"
                        iconSrc="/assets/icons/dashboard5.svg"
                        onActionClick={() => {}}
                    />
                </div>
            </div>

            {/* Recent Bookings Reusable Table Section */}
            <div className="bg-white border border-[#BED3EB] rounded-xl overflow-hidden">
                <TableToolbar
                    title="RECENT BOOKINGS"
                    searchValue={search}
                    onSearchChange={setSearch}
                    searchPlaceholder="Search "
                    selectedFilter={filterStatus}
                    onFilterChange={setFilterStatus}
                />
                <div className="p-2 sm:p-4">
                    <Table
                        columns={columns}
                        data={filteredBookings}
                        showPagination={false}
                        start={1}
                        end={filteredBookings.length}
                        total={mockBookings.length}
                    />
                </div>
            </div>
        </div>
    );
}
