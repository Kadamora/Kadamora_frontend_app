import { useState, useRef, useEffect } from 'react';
import {
    FiSearch,
    FiChevronDown,
    FiMoreHorizontal,
    FiEye,
    FiEdit2,
    FiPlay,
} from 'react-icons/fi';
import type { SecuritySystem } from '../../../types/commercialFacilities';

interface SecuritySystemsInventoryTableProps {
    systems: SecuritySystem[];
    onPreview: (system: SecuritySystem) => void;
    onViewDetails: (system: SecuritySystem) => void;
    onEdit: (system: SecuritySystem) => void;
}

export default function SecuritySystemsInventoryTable({
    systems,
    onPreview,
    onViewDetails,
    onEdit,
}: SecuritySystemsInventoryTableProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedProperty, setSelectedProperty] = useState('All');
    const [isPropertyDropdownOpen, setIsPropertyDropdownOpen] = useState(false);
    const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

    const menuRef = useRef<HTMLDivElement>(null);
    const propertyDropdownRef = useRef<HTMLDivElement>(null);

    // Extract unique properties for filtering
    const propertyOptions = [
        'All',
        ...Array.from(new Set(systems.map((s) => s.property))),
    ];

    // Filter systems
    const filteredSystems = systems.filter((item) => {
        const matchesSearch =
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.property.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesProperty =
            selectedProperty === 'All' || item.property === selectedProperty;

        return matchesSearch && matchesProperty;
    });

    // Close menu on click outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setActiveMenuId(null);
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

    const getStatusBadge = (status: SecuritySystem['status']) => {
        switch (status) {
            case 'Online':
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#ECFDF3] text-[#12B76A] border border-[#ABEFC6]">
                        Online
                    </span>
                );
            case 'Maintenance':
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#FEF3F2] text-[#F04438] border border-[#FECDCA]">
                        Maintenance
                    </span>
                );
            case 'Offline':
            default:
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#F4F4F5] text-[#71717A] border border-[#E4E4E7]">
                        Offline
                    </span>
                );
        }
    };

    return (
        <div className="bg-white rounded-2xl border border-[#BED3EB] p-6 shadow-xs space-y-6">
            {/* Header with Title and Search/Filters */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-lg font-bold text-[#002E62]">
                        Security Systems Inventory
                    </h2>
                    <p className="text-xs text-[#71717A] mt-0.5">
                        Manage and monitor all installed security equipment
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    {/* Search Bar */}
                    <div className="relative w-48 sm:w-64">
                        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#71717A] w-4 h-4" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search"
                            className="w-full pl-9 pr-3 py-2 bg-[#F7F7FD] border border-[#E0DEF7] rounded-lg text-xs text-[#18181B] placeholder-[#71717A] focus:outline-none focus:ring-2 focus:ring-[#002E62]/40 focus:bg-white transition-all"
                        />
                    </div>

                    {/* Property Filter Dropdown */}
                    <div className="relative" ref={propertyDropdownRef}>
                        <button
                            type="button"
                            onClick={() => setIsPropertyDropdownOpen(!isPropertyDropdownOpen)}
                            className="flex items-center gap-2 px-3.5 py-2 bg-[#F7F7FD] border border-[#E0DEF7] rounded-lg text-xs font-medium text-[#18181B] hover:bg-white transition-colors cursor-pointer"
                        >
                            <span>
                                {selectedProperty === 'All' ? 'Property' : selectedProperty}
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
                                            setSelectedProperty(prop);
                                            setIsPropertyDropdownOpen(false);
                                        }}
                                        className={`w-full text-left px-3.5 py-2 text-xs transition-colors hover:bg-[#F4F6F9] cursor-pointer ${
                                            selectedProperty === prop
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
                <table className="w-full text-left border-collapse min-w-[850px]">
                    <thead>
                        <tr className="border-b border-[#F0F2F5] text-[11px] font-bold text-[#71717A] uppercase tracking-wider">
                            <th className="py-3 px-3">System ID</th>
                            <th className="py-3 px-3">System Name</th>
                            <th className="py-3 px-3">Type</th>
                            <th className="py-3 px-3">Property</th>
                            <th className="py-3 px-3">Location</th>
                            <th className="py-3 px-3">Resolution</th>
                            <th className="py-3 px-3">Status</th>
                            <th className="py-3 px-3 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F0F2F5]">
                        {filteredSystems.length > 0 ? (
                            filteredSystems.map((system) => (
                                <tr
                                    key={system.id}
                                    className="hover:bg-[#F9FAFC] transition-colors text-xs text-[#18181B]"
                                >
                                    <td className="py-4 px-3 font-semibold text-[#002E62]">
                                        {system.id}
                                    </td>
                                    <td className="py-4 px-3 font-bold text-[#18181B]">
                                        {system.name}
                                    </td>
                                    <td className="py-4 px-3 text-[#52525B]">
                                        {system.type}
                                    </td>
                                    <td className="py-4 px-3 text-[#52525B]">
                                        {system.property}
                                    </td>
                                    <td className="py-4 px-3 text-[#52525B]">
                                        {system.location}
                                    </td>
                                    <td className="py-4 px-3 text-[#52525B] uppercase">
                                        {system.resolution}
                                    </td>
                                    <td className="py-4 px-3">
                                        {getStatusBadge(system.status)}
                                    </td>
                                    <td className="py-4 px-3 text-center relative">
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setActiveMenuId(
                                                    activeMenuId === system.id ? null : system.id
                                                );
                                            }}
                                            className="h-8 w-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-[#71717A] hover:text-[#002E62] transition-colors cursor-pointer mx-auto"
                                            aria-label="Actions menu"
                                        >
                                            <FiMoreHorizontal className="w-4 h-4" />
                                        </button>

                                        {/* Action Dropdown Menu */}
                                        {activeMenuId === system.id && (
                                            <div
                                                ref={menuRef}
                                                className="absolute right-6 top-10 w-40 bg-white rounded-xl shadow-xl border border-[#E0E8F2] py-1.5 z-40 text-left animate-[fadeIn_.15s_ease-out]"
                                            >
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setActiveMenuId(null);
                                                        onPreview(system);
                                                    }}
                                                    className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-[#18181B] hover:bg-[#F4F6F9] hover:text-[#002E62] transition-colors cursor-pointer"
                                                >
                                                    <FiPlay className="w-3.5 h-3.5 text-[#002E62]" />
                                                    <span>Preview</span>
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setActiveMenuId(null);
                                                        onViewDetails(system);
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
                                                        onEdit(system);
                                                    }}
                                                    className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-[#18181B] hover:bg-[#F4F6F9] hover:text-[#002E62] transition-colors cursor-pointer"
                                                >
                                                    <FiEdit2 className="w-3.5 h-3.5 text-[#002E62]" />
                                                    <span>Edit</span>
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={8}
                                    className="py-10 text-center text-xs text-[#71717A]"
                                >
                                    No security systems found matching your search.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
