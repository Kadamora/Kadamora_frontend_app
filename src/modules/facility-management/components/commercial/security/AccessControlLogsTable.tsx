import { useState, useRef, useEffect } from 'react';
import {
    FiSearch,
    FiChevronDown,
    FiMoreHorizontal,
    FiEye,
    FiEdit2,
} from 'react-icons/fi';
import type { AccessControlEntry } from '../../../types/commercialFacilities';

interface AccessControlLogsTableProps {
    entries: AccessControlEntry[];
    onViewDetails: (entry: AccessControlEntry) => void;
    onEditEntry: (entry: AccessControlEntry) => void;
}

export default function AccessControlLogsTable({
    entries,
    onViewDetails,
    onEditEntry,
}: AccessControlLogsTableProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDateFilter, setSelectedDateFilter] = useState('All');
    const [selectedPropertyFilter, setSelectedPropertyFilter] = useState('All');

    const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);
    const [isPropertyDropdownOpen, setIsPropertyDropdownOpen] = useState(false);
    const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

    const menuRef = useRef<HTMLDivElement>(null);
    const dateDropdownRef = useRef<HTMLDivElement>(null);
    const propertyDropdownRef = useRef<HTMLDivElement>(null);

    const dateOptions = ['All', 'Today', 'Yesterday', 'Last 7 Days'];
    const propertyOptions = [
        'All',
        'Hilcreast',
        'Diamond',
        'Sunny Estate',
        'Blesssed',
        'Swift',
    ];

    // Close popovers on click outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setActiveMenuId(null);
            }
            if (
                dateDropdownRef.current &&
                !dateDropdownRef.current.contains(e.target as Node)
            ) {
                setIsDateDropdownOpen(false);
            }
            if (
                propertyDropdownRef.current &&
                !propertyDropdownRef.current.contains(e.target as Node)
            ) {
                setIsPropertyDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const filteredEntries = entries.filter((entry) => {
        const matchesSearch =
            entry.visitorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            entry.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            entry.unit.toLowerCase().includes(searchTerm.toLowerCase()) ||
            entry.purpose.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesProperty =
            selectedPropertyFilter === 'All' ||
            entry.unit.toLowerCase().includes(selectedPropertyFilter.toLowerCase()) ||
            (entry.property &&
                entry.property.toLowerCase().includes(selectedPropertyFilter.toLowerCase()));

        const matchesDate =
            selectedDateFilter === 'All' ||
            (entry.date && entry.date.toLowerCase() === selectedDateFilter.toLowerCase());

        return matchesSearch && matchesProperty && matchesDate;
    });

    return (
        <div className="bg-white rounded-2xl border border-[#BED3EB] p-6 shadow-xs space-y-6">
            {/* Header with Title and Search/Filters */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-lg font-bold text-[#002E62]">
                        Access Control Logs
                    </h2>
                    <p className="text-xs text-[#71717A] mt-0.5">
                        Monitor building access and entry/exit records
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    {/* Search Bar */}
                    <div className="relative w-44 sm:w-60">
                        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#71717A] w-4 h-4" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search"
                            className="w-full pl-9 pr-3 py-2 bg-[#F7F7FD] border border-[#E0DEF7] rounded-lg text-xs text-[#18181B] placeholder-[#71717A] focus:outline-none focus:ring-2 focus:ring-[#002E62]/40 focus:bg-white transition-all"
                        />
                    </div>

                    {/* Date Filter Dropdown */}
                    <div className="relative" ref={dateDropdownRef}>
                        <button
                            type="button"
                            onClick={() => {
                                setIsDateDropdownOpen(!isDateDropdownOpen);
                                setIsPropertyDropdownOpen(false);
                            }}
                            className="flex items-center gap-2 px-3.5 py-2 bg-[#F7F7FD] border border-[#E0DEF7] rounded-lg text-xs font-medium text-[#18181B] hover:bg-white transition-colors cursor-pointer"
                        >
                            <span>
                                {selectedDateFilter === 'All' ? 'Date' : selectedDateFilter}
                            </span>
                            <FiChevronDown className="w-3.5 h-3.5 text-[#71717A]" />
                        </button>

                        {isDateDropdownOpen && (
                            <div className="absolute right-0 mt-1 w-36 bg-white border border-[#BED3EB] rounded-xl shadow-lg py-1 z-30 animate-[fadeIn_.15s_ease-out]">
                                {dateOptions.map((opt) => (
                                    <button
                                        key={opt}
                                        type="button"
                                        onClick={() => {
                                            setSelectedDateFilter(opt);
                                            setIsDateDropdownOpen(false);
                                        }}
                                        className={`w-full text-left px-3.5 py-2 text-xs transition-colors hover:bg-[#F4F6F9] cursor-pointer ${
                                            selectedDateFilter === opt
                                                ? 'font-bold text-[#002E62] bg-[#F4F6F9]'
                                                : 'text-[#52525B]'
                                        }`}
                                    >
                                        {opt === 'All' ? 'All Dates' : opt}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Property Filter Dropdown */}
                    <div className="relative" ref={propertyDropdownRef}>
                        <button
                            type="button"
                            onClick={() => {
                                setIsPropertyDropdownOpen(!isPropertyDropdownOpen);
                                setIsDateDropdownOpen(false);
                            }}
                            className="flex items-center gap-2 px-3.5 py-2 bg-[#F7F7FD] border border-[#E0DEF7] rounded-lg text-xs font-medium text-[#18181B] hover:bg-white transition-colors cursor-pointer"
                        >
                            <span>
                                {selectedPropertyFilter === 'All'
                                    ? 'Property'
                                    : selectedPropertyFilter}
                            </span>
                            <FiChevronDown className="w-3.5 h-3.5 text-[#71717A]" />
                        </button>

                        {isPropertyDropdownOpen && (
                            <div className="absolute right-0 mt-1 w-44 bg-white border border-[#BED3EB] rounded-xl shadow-lg py-1 z-30 animate-[fadeIn_.15s_ease-out]">
                                {propertyOptions.map((prop) => (
                                    <button
                                        key={prop}
                                        type="button"
                                        onClick={() => {
                                            setSelectedPropertyFilter(prop);
                                            setIsPropertyDropdownOpen(false);
                                        }}
                                        className={`w-full text-left px-3.5 py-2 text-xs transition-colors hover:bg-[#F4F6F9] cursor-pointer ${
                                            selectedPropertyFilter === prop
                                                ? 'font-bold text-[#002E62] bg-[#F4F6F9]'
                                                : 'text-[#52525B]'
                                        }`}
                                    >
                                        {prop === 'All' ? 'All Properties' : prop}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[780px]">
                    <thead>
                        <tr className="border-b border-[#F0F2F5] text-[11px] font-bold text-[#71717A] uppercase tracking-wider">
                            <th className="py-3 px-3">Entry ID</th>
                            <th className="py-3 px-3">Visitor</th>
                            <th className="py-3 px-3">Unit</th>
                            <th className="py-3 px-3">Purpose</th>
                            <th className="py-3 px-3">Entry Time</th>
                            <th className="py-3 px-3">Exit Time</th>
                            <th className="py-3 px-3 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F0F2F5]">
                        {filteredEntries.length > 0 ? (
                            filteredEntries.map((entry) => (
                                <tr
                                    key={entry.id}
                                    className="hover:bg-[#F9FAFC] transition-colors text-xs text-[#18181B]"
                                >
                                    <td className="py-4 px-3 font-medium text-[#71717A]">
                                        {entry.id}
                                    </td>
                                    <td className="py-4 px-3 font-bold text-[#18181B]">
                                        {entry.visitorName}
                                    </td>
                                    <td className="py-4 px-3 text-[#52525B]">
                                        {entry.unit}
                                    </td>
                                    <td className="py-4 px-3 text-[#52525B]">
                                        {entry.purpose}
                                    </td>
                                    <td className="py-4 px-3 text-[#52525B] font-mono">
                                        {entry.entryTime}
                                    </td>
                                    <td className="py-4 px-3 text-[#52525B] font-mono">
                                        {entry.exitTime}
                                    </td>
                                    <td className="py-4 px-3 text-center relative">
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setActiveMenuId(
                                                    activeMenuId === entry.id ? null : entry.id
                                                );
                                            }}
                                            className="h-8 w-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-[#71717A] hover:text-[#002E62] transition-colors cursor-pointer mx-auto"
                                            aria-label="Actions menu"
                                        >
                                            <FiMoreHorizontal className="w-4 h-4" />
                                        </button>

                                        {/* Action Dropdown Menu (matching Frame 2147224584) */}
                                        {activeMenuId === entry.id && (
                                            <div
                                                ref={menuRef}
                                                className="absolute right-6 top-10 w-36 bg-white rounded-xl shadow-xl border border-[#E0E8F2] py-1.5 z-40 text-left animate-[fadeIn_.15s_ease-out]"
                                            >
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setActiveMenuId(null);
                                                        onViewDetails(entry);
                                                    }}
                                                    className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-[#18181B] hover:bg-[#F4F6F9] hover:text-[#002E62] transition-colors cursor-pointer"
                                                >
                                                    <FiEye className="w-3.5 h-3.5 text-[#002E62]" />
                                                    <span>View Details</span>
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setActiveMenuId(null);
                                                        onEditEntry(entry);
                                                    }}
                                                    className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-[#18181B] hover:bg-[#F4F6F9] hover:text-[#002E62] transition-colors cursor-pointer"
                                                >
                                                    <FiEdit2 className="w-3.5 h-3.5 text-[#002E62]" />
                                                    <span>Edit Entry</span>
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={7}
                                    className="py-10 text-center text-xs text-[#71717A]"
                                >
                                    No access control logs found matching your filters.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
