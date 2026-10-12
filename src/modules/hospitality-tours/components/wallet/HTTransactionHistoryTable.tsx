import { useState, useMemo } from 'react';
import { FiArrowDownLeft, FiArrowUpRight, FiEye } from 'react-icons/fi';
import Table, { type Column } from '@shared/components/Table/Table';
import StatusBadge from '@shared/components/Tag/StatusBadge';
import TableToolbar, { type FilterOption } from '@modules/hospitality-tours/components/TableToolbar';
import type { Transaction } from '../../types';

export interface HTTransactionHistoryTableProps {
    transactions: Transaction[];
    onViewTransaction?: (transaction: Transaction) => void;
    className?: string;
}

function formatTransactionDate(dateStr: string): string {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const month = months[d.getMonth()];
    const day = String(d.getDate()).padStart(2, '0');
    const year = d.getFullYear();
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    return `${month} ${day}, ${year} - ${hours}:${minutes}`;
}

export default function HTTransactionHistoryTable({
    transactions,
    onViewTransaction,
    className = '',
}: HTTransactionHistoryTableProps) {
    const [search, setSearch] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 8;

    const handleSearchChange = (value: string) => {
        setSearch(value);
        setCurrentPage(1);
    };

    const handleFilterChange = (value: string) => {
        setFilterStatus(value);
        setCurrentPage(1);
    };

    const filterOptions: FilterOption[] = [
        { label: 'All Transactions', value: 'all' },
        { label: 'Deposit', value: 'deposit' },
        { label: 'Withdraw', value: 'withdraw' },
        { label: 'Completed', value: 'completed' },
        { label: 'Pending', value: 'pending' },
        { label: 'Failed', value: 'failed' },
    ];

    const filteredTransactions = useMemo(() => {
        return transactions.filter((tx) => {
            const query = search.trim().toLowerCase();
            const matchesSearch =
                !query ||
                tx.id.toLowerCase().includes(query) ||
                tx.type.toLowerCase().includes(query) ||
                tx.status.toLowerCase().includes(query) ||
                String(tx.amount).includes(query);

            let matchesFilter = true;
            if (filterStatus !== 'all') {
                const lowerFilter = filterStatus.toLowerCase();
                matchesFilter =
                    tx.type.toLowerCase() === lowerFilter ||
                    tx.status.toLowerCase() === lowerFilter;
            }

            return matchesSearch && matchesFilter;
        });
    }, [transactions, search, filterStatus]);

    const totalEntries = filteredTransactions.length;
    const startEntry = totalEntries > 0 ? (currentPage - 1) * pageSize + 1 : 0;
    const endEntry = Math.min(currentPage * pageSize, totalEntries);
    const paginatedTransactions = useMemo(() => {
        return filteredTransactions.slice((currentPage - 1) * pageSize, currentPage * pageSize);
    }, [filteredTransactions, currentPage, pageSize]);

    const columns: Column<Transaction>[] = [
        {
            key: 'id',
            label: 'TRANSACTION ID',
            cellClassName: 'px-6 py-4 text-xs sm:text-sm text-[#535856] whitespace-nowrap',
        },
        {
            key: 'type',
            label: 'TYPE',
            cellClassName: 'px-6 py-4 text-xs sm:text-sm whitespace-nowrap',
            render: (_, item) => {
                const isDeposit = item.type.toLowerCase() === 'deposit';
                return (
                    <div className="inline-flex items-center gap-2">
                        <div
                            className={`w-7 h-7 rounded-full flex border items-center justify-center shrink-0 ${
                                isDeposit
                                    ? 'bg-[#E6F9F0] text-[#00A63E] border-[#BAF0CE]'
                                    : 'bg-[#FFF4ED] text-[#F54900] border-[#FBE2D7]'
                            }`}
                        >
                            {isDeposit ? (
                                <FiArrowDownLeft className="h-3.5 w-3.5 stroke-[2.5]" />
                            ) : (
                                <FiArrowUpRight className="h-3.5 w-3.5 stroke-[2.5]" />
                            )}
                        </div>
                        <span className="text-[#0A0A0A] text-xs sm:text-sm">
                            {item.type}
                        </span>
                    </div>
                );
            },
        },
        {
            key: 'date',
            label: 'DATE',
            cellClassName: 'px-6 py-4 text-xs sm:text-sm text-[#3F3F46] whitespace-nowrap',
            render: (val) => formatTransactionDate(val),
        },
        {
            key: 'amount',
            label: 'AMOUNT',
            cellClassName: 'px-6 py-4 text-xs sm:text-sm font-medium whitespace-nowrap',
            render: (val, item) => {
                const isDeposit = item.type.toLowerCase() === 'deposit';
                return (
                    <span className={isDeposit ? 'text-[#00A63E]' : 'text-[#F54900]'}>
                        {isDeposit ? '+' : '-'}₦{Number(val).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                );
            },
        },
        {
            key: 'status',
            label: 'STATUS',
            cellClassName: 'px-6 py-4 whitespace-nowrap',
            render: (val) => <StatusBadge status={val} />,
        },
        {
            key: 'action',
            label: 'ACTION',
            align: 'center',
            cellClassName: 'px-6 py-4 text-center whitespace-nowrap',
            render: (_, item) => (
                <button
                    type="button"
                    onClick={() => onViewTransaction?.(item)}
                    className="p-1.5 text-[#71717A] hover:text-[#002E62] transition-colors cursor-pointer rounded-md hover:bg-slate-200/60 inline-flex items-center justify-center"
                    title="View transaction receipt"
                >
                    <FiEye className="h-4 w-4" />
                </button>
            ),
        },
    ];

    return (
        <div className={`bg-white border border-[#BED3EB] rounded-xl overflow-hidden shadow-2xs ${className}`}>
            <TableToolbar
                title=' '   
                boldTitle="Transaction History"
                subTitle="Recent transaction in your wallet"
                searchValue={search}
                onSearchChange={handleSearchChange}
                searchPlaceholder="Search "
                selectedFilter={filterStatus}
                filterOptions={filterOptions}
                onFilterChange={handleFilterChange}
            />
            <div className="p-2 sm:p-4">
                <Table
                    columns={columns}
                    data={paginatedTransactions}
                    showPagination={totalEntries > pageSize}
                    start={startEntry}
                    end={endEntry}
                    total={totalEntries}
                    hasPrev={currentPage > 1}
                    hasNext={endEntry < totalEntries}
                    onPageChange={(dir) => {
                        if (dir === 'prev') {
                            setCurrentPage((prev) => Math.max(1, prev - 1));
                        } else {
                            setCurrentPage((prev) => prev + 1);
                        }
                    }}
                    emptyText="No transactions found matching your criteria"
                />
            </div>
        </div>
    );
}
