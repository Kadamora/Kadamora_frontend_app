import React from 'react';
import { FiSearch, FiChevronDown } from 'react-icons/fi';

export interface FilterOption {
    label: string;
    value: string;
}

export interface TableToolbarProps {
    title?: string;
    boldTitle?: string;
    subTitle?: string;
    searchValue?: string;
    onSearchChange?: (val: string) => void;
    searchPlaceholder?: string;
    selectedFilter?: string;
    filterOptions?: FilterOption[];
    onFilterChange?: (val: string) => void;
    action?: React.ReactNode;
    children?: React.ReactNode;
    className?: string;
}

export default function TableToolbar({
    title = 'RECENT BOOKINGS',
    boldTitle = '',
    subTitle = '',
    searchValue = '',
    onSearchChange,
    searchPlaceholder = 'Search...',
    selectedFilter = 'all',
    filterOptions = [
        { label: 'All Bookings', value: 'all' },
        { label: 'Confirmed', value: 'confirmed' },
        { label: 'Pending', value: 'pending' },
        { label: 'Cancelled', value: 'cancelled' },
    ],
    onFilterChange,
    action,
    children,
    className = '',
}: TableToolbarProps) {
    return (
        <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:px-6 sm:py-5 border-b border-[#E4E4E7] bg-white ${className}`}>
            <div>
                <h3 className="text-sm text-[#1E262A] ">
                {title}
            </h3>
            <h3 className="text-lg font-semibold text-[#002E62] ">
                {boldTitle}
            </h3>
            <p className="text-sm text-[#71717A] ">
                {subTitle}
            </p>     
            </div>   

            <div className="flex items-center gap-3 w-full sm:w-auto">
                {/* Search Input */}
                <div className="relative flex-1 sm:w-64">
                    <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#3F3F46]" />
                    <input
                        type="text"
                        value={searchValue}
                        onChange={(e) => onSearchChange?.(e.target.value)}
                        placeholder={searchPlaceholder}
                        className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-[#F8FAFC] border border-[#E0DEF7] rounded-[5px] text-slate-800 placeholder-[#3F3F46] focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
                    />
                </div>

                {/* Filter Dropdown */}
                {filterOptions && filterOptions.length > 0 && (
                    <div className="relative">
                        <select
                            value={selectedFilter}
                            onChange={(e) => onFilterChange?.(e.target.value)}
                            className="appearance-none pl-4 pr-9 py-2 text-xs sm:text-sm font-medium bg-[#F3F9FF] border border-[#cce3fd] rounded-[5px] text-[#002E62] cursor-pointer focus:outline-none transition-all"
                        >
                            {filterOptions.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                        <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#002E62] pointer-events-none" />
                    </div>
                )}

                {action}
                {children}
            </div>
        </div>
    );
}
