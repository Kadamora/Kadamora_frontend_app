import { useState, useMemo } from 'react';
import PageHeader from '@shared/components/Dashboard/PageHeader';
import Table, { type Column } from '@shared/components/Table/Table';
import TableToolbar from '@shared/components/Table/TableToolbar';
import StatusBadge from '@shared/components/Tag/StatusBadge';
import FloatingChatButton from '@shared/components/Dashboard/FloatingChatButton';
import { mockPayments, mockPropertiesFilter } from '../../data/mock';
import type { Payment } from '../../types';
import { FiEye } from 'react-icons/fi';

export default function FMPaymentsPage() {
    const [payments] = useState<Payment[]>(mockPayments);
    const [search, setSearch] = useState('');
    const [selectedProperty, setSelectedProperty] = useState('all');

    const filteredPayments = useMemo(() => {
        return payments.filter((item) => {
            const matchesProperty =
                selectedProperty === 'all' ||
                item.property.toLowerCase() === selectedProperty.toLowerCase();
            const q = search.toLowerCase().trim();
            const matchesSearch =
                !q ||
                item.transactionId.toLowerCase().includes(q) ||
                item.unitNo.toLowerCase().includes(q) ||
                item.paymentType.toLowerCase().includes(q) ||
                item.date.toLowerCase().includes(q) ||
                String(item.amount).includes(q);
            return matchesProperty && matchesSearch;
        });
    }, [payments, search, selectedProperty]);

    const columns: Column<Payment>[] = [
        {
            key: 'transactionId',
            label: 'TRANSACTION ID',
            cellClassName: 'text-sm text-[#52525B] py-4 px-4',
            render: (val) => val,
        },
        {
            key: 'unitNo',
            label: 'UNIT NO',
            cellClassName: 'text-sm text-[#52525B] py-4 px-4',
            render: (val) => val,
        },
        {
            key: 'date',
            label: 'DATE',
            cellClassName: 'text-sm text-[#52525B] py-4 px-4',
            render: (val) => val,
        },
        {
            key: 'amount',
            label: 'AMOUNT',
            cellClassName: 'text-sm text-[#52525B] py-4 px-4',
            render: (val) => `₦${Number(val).toLocaleString()}`,
        },
        {
            key: 'paymentType',
            label: 'PAYMENT TYPE',
            cellClassName: 'text-sm text-[#52525B] py-4 px-4',
            render: (val) => val,
        },
        {
            key: 'status',
            label: 'STATUS',
            cellClassName: 'py-4 px-4',
            render: (_, item) => <StatusBadge status={item.status} />,
        },
        {
            key: 'action',
            label: 'ACTION',
            align: 'center',
            cellClassName: 'py-4 px-4 flex items-center justify-center',
            render: () => (
                <button
                    type="button"
                    className="inline-flex h-7 w-7 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                    aria-label="View transaction"
                >
                    <FiEye className="h-4 w-4" />
                </button>
            ),
        },
    ];

    return (
        <div className="space-y-4 pb-12">
            {/* Header with Title and Breadcrumb */}
            <PageHeader
                title="Payments"
                crumbs={[
                    { label: 'Dashboard', path: '/facility-management/dashboard' },
                    { label: 'Payments' },
                ]}
            />

            {/* Main Table Card */}
            <div className="bg-white border border-[#E4E7EC] rounded-2xl shadow-xs overflow-hidden">
                <TableToolbar
                    title="ALL PAYMENT"
                    searchValue={search}
                    onSearchChange={setSearch}
                    searchPlaceholder="Search"
                    selectedFilter={selectedProperty}
                    filterOptions={mockPropertiesFilter}
                    onFilterChange={setSelectedProperty}
                />

                <Table
                    columns={columns}
                    data={filteredPayments}
                    showPagination={false}
                    headerRowClassName="bg-[#F8FAFC] text-[11px] font-semibold text-[#667085] tracking-wider"
                    rowClassName="border-b border-[#F2F4F7] hover:bg-[#F9FAFB] transition-colors"
                />
            </div>

            {/* Floating Support Chat FAB */}
            <FloatingChatButton />
        </div>
    );
}
