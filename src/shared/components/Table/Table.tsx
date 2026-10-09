import React from 'react';

export type TableHeader = { key: string; label: React.ReactNode; className?: string };

export interface Column<T = any> {
    key: string;
    label: React.ReactNode;
    align?: 'left' | 'center' | 'right';
    className?: string;
    headerClassName?: string;
    cellClassName?: string;
    render?: (value: any, item: T, index: number) => React.ReactNode;
}

interface TableProps<T = any> {
    /**
     * Array of column definitions or legacy TableHeader array
     */
    headers?: TableHeader[] | Column<T>[];
    columns?: Column<T>[];
    items?: T[];
    data?: T[];
    renderRow?: (item: T, idx: number) => React.ReactNode;
    responsive?: 'scroll' | 'stack';
    renderCard?: (item: T, idx: number) => React.ReactNode;
    className?: string;
    headerRowClassName?: string;
    rowClassName?: string | ((item: T, idx: number) => string);
    containerClassName?: string;
    emptyText?: string;
    // pagination / summary
    start?: number;
    end?: number;
    total?: number;
    showPagination?: boolean;
    onPageChange?: (direction: 'prev' | 'next') => void;
    hasPrev?: boolean;
    hasNext?: boolean;
}

export default function Table<T>({
    headers,
    columns: columnsProp,
    items: itemsProp,
    data: dataProp,
    renderRow,
    className = '',
    headerRowClassName = 'bg-white border-b border-[#F0F4F8]',
    rowClassName = 'border-b border-[#F5F7FA] hover:bg-[#E8ECEE]/60 transition-colors',
    containerClassName = '',
    emptyText = 'No data available',
    start,
    end,
    total,
    responsive = 'scroll',
    renderCard,
    showPagination = true,
    onPageChange,
    hasPrev = false,
    hasNext = true,
}: TableProps<T>) {
    const rawColumns = columnsProp ?? (headers as Column<T>[]) ?? [];
    const itemList = dataProp ?? itemsProp ?? [];

    const startVal = start ?? (itemList.length > 0 ? 1 : 0);
    const endVal = end ?? itemList.length;
    const totalVal = total ?? itemList.length;

    return (
        <div className={`${containerClassName}`}>
            {/* Desktop / wide screens - table */}
            <div className={responsive === 'stack' ? 'hidden sm:block overflow-x-auto' : 'overflow-x-auto'}>
                <table className={`min-w-full text-left text-sm ${className}`}>
                    <thead>
                        <tr className={`bg-white ${headerRowClassName}`}>
                            {rawColumns.map((col) => {
                                const alignClass =
                                    col.align === 'center'
                                        ? 'text-center'
                                        : col.align === 'right'
                                        ? 'text-right'
                                        : 'text-left';
                                return (
                                    <th
                                        key={col.key}
                                        className={`${col.headerClassName ?? col.className ?? 'px-4 py-3.5 text-[#1E262A] uppercase font-normal text-sm '} ${alignClass}`}
                                    >
                                        {col.label}
                                    </th>
                                );
                            })}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F1F5F9]">
                        {itemList.length === 0 ? (
                            <tr>
                                <td colSpan={rawColumns.length || 1} className="py-12 text-center text-slate-400 font-medium">
                                    {emptyText}
                                </td>
                            </tr>
                        ) : renderRow ? (
                            itemList.map((item, idx) => renderRow(item, idx))
                        ) : (
                            itemList.map((item, idx) => {
                                const bgClass = idx % 2 === 0 ? 'bg-[#F3F5F5]' : 'bg-white';
                                const computedRowClass =
                                    typeof rowClassName === 'function'
                                        ? rowClassName(item, idx)
                                        : `${bgClass} ${rowClassName}`;
                                return (
                                    <tr key={(item as any).id ?? (item as any).key ?? idx} className={computedRowClass}>
                                        {rawColumns.map((col) => {
                                            const val = (item as any)[col.key];
                                            const alignClass =
                                                col.align === 'center'
                                                    ? 'text-center'
                                                    : col.align === 'right'
                                                    ? 'text-right'
                                                    : 'text-left';
                                            return (
                                                <td
                                                    key={col.key}
                                                    className={`${col.cellClassName ?? col.className ?? 'px-4 py-4 text-[#535856] font-normal'} ${alignClass}`}
                                                >
                                                    {col.render ? col.render(val, item, idx) : (val ?? '—')}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>

            {/* Mobile stacked cards when responsive='stack' */}
            {responsive === 'stack' && renderCard ? (
                <div className="block sm:hidden space-y-3">
                    {itemList.map((item, idx) => (
                        <div
                            key={(item as any).id ?? (item as any).sn ?? idx}
                            className="rounded-xl border border-[#E8F4F8] bg-white p-4 shadow-xs"
                        >
                            {renderCard(item, idx)}
                        </div>
                    ))}
                </div>
            ) : null}

            {showPagination && (
                <div className="flex items-center justify-between mt-6 text-sm text-[#475467] px-1">
                    <span>
                        Showing {startVal} to {endVal} of {totalVal} entries
                    </span>
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() => onPageChange?.('prev')}
                            className="h-9 w-9 rounded-lg border border-[#E2E8F0] bg-white text-[#344054] hover:bg-slate-50 flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                            disabled={!hasPrev && startVal <= 1}
                            title="Previous page"
                        >
                            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button
                            type="button"
                            onClick={() => onPageChange?.('next')}
                            className="h-9 w-9 rounded-lg bg-[#0A2D50] text-white hover:bg-[#08223d] flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                            disabled={!hasNext}
                            title="Next page"
                        >
                            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
