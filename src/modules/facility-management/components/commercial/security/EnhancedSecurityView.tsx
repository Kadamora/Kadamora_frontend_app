import { useState } from 'react';
import {
    FiChevronRight,
    FiVideo,
    FiUsers,
    FiChevronDown,
} from 'react-icons/fi';
import LiveCameraFeedCard from './LiveCameraFeedCard';
import RealTimeActivitiesCard from './RealTimeActivitiesCard';
import type {
    SecuritySystem,
    SecurityActivityItem,
    AccessControlLogItem,
} from '../../../types/commercialFacilities';

interface EnhancedSecurityViewProps {
    systems: SecuritySystem[];
    activities: SecurityActivityItem[];
    accessLogs: AccessControlLogItem[];
    onOpenInventory: () => void;
    onOpenAccessLogs: () => void;
    onPreviewSystem: (system: SecuritySystem) => void;
}

export default function EnhancedSecurityView({
    systems,
    activities,
    onOpenInventory,
    onOpenAccessLogs,
    onPreviewSystem,
}: EnhancedSecurityViewProps) {
    const [propertyFilter, setPropertyFilter] = useState('All');
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const properties = [
        'All Properties (04)',
        'Hilcreast',
        'Diamond',
        'Sunny Estate',
        'Blesssed',
    ];

    const displaySystems = systems.filter((s) => {
        if (propertyFilter === 'All' || propertyFilter === 'All Properties (04)') {
            return true;
        }
        return s.property === propertyFilter;
    });

    return (
        <div className="space-y-6">
            {/* Top Metric Cards Row (Image 1) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Metric Card 1: Active Camera */}
                <div className="bg-white rounded-2xl border border-[#BED3EB] p-6 shadow-xs flex items-center justify-between">
                    <div>
                        <span className="text-xs sm:text-sm font-medium text-[#52525B]">
                            Active Camera
                        </span>
                        <div className="text-3xl font-bold text-[#002E62] mt-1">12</div>
                        <p className="text-xs text-[#71717A] mt-2">
                            2 offline for maintenance
                        </p>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-[#FEE4E2] text-[#F04438] flex items-center justify-center shrink-0">
                        <FiVideo className="w-6 h-6" />
                    </div>
                </div>

                {/* Metric Card 2: Today's Access */}
                <div className="bg-white rounded-2xl border border-[#BED3EB] p-6 shadow-xs flex items-center justify-between">
                    <div>
                        <span className="text-xs sm:text-sm font-medium text-[#52525B]">
                            Today's Access
                        </span>
                        <div className="text-3xl font-bold text-[#002E62] mt-1">847</div>
                        <p className="text-xs text-[#12B76A] mt-2 font-medium">
                            +5% from yesterday
                        </p>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center shrink-0">
                        <FiUsers className="w-6 h-6" />
                    </div>
                </div>
            </div>

            {/* Main Content Layout: Live Monitoring (2 cols) & Right Sidebar (1 col) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                {/* Left Section: Live Monitoring */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-[#BED3EB] p-6 shadow-xs space-y-6">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div className="space-y-1">
                            <h2 className="text-lg font-bold text-[#002E62]">
                                Live Monitoring
                            </h2>
                            <p className="text-xs text-[#71717A] max-w-md leading-relaxed">
                                Lorem ipsum dolor sit amet consectetur. Nibh odio egestas tortor lorem laoreet eu volutpat.
                            </p>
                        </div>

                        {/* Property Filter Dropdown */}
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => setIsFilterOpen(!isFilterOpen)}
                                className="flex items-center gap-2 px-3.5 py-2 bg-[#F7F7FD] border border-[#E0DEF7] rounded-lg text-xs font-semibold text-[#18181B] hover:bg-white transition-colors cursor-pointer shrink-0"
                            >
                                <span>{propertyFilter === 'All' ? 'All Properties (04)' : propertyFilter}</span>
                                <FiChevronDown className="w-3.5 h-3.5 text-[#71717A]" />
                            </button>

                            {isFilterOpen && (
                                <div className="absolute right-0 mt-1 w-44 bg-white border border-[#BED3EB] rounded-xl shadow-lg py-1 z-30">
                                    {properties.map((prop) => (
                                        <button
                                            key={prop}
                                            type="button"
                                            onClick={() => {
                                                setPropertyFilter(prop);
                                                setIsFilterOpen(false);
                                            }}
                                            className="w-full text-left px-3.5 py-2 text-xs text-[#18181B] hover:bg-[#F4F6F9] hover:text-[#002E62] transition-colors cursor-pointer"
                                        >
                                            {prop}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* 2x2 Feeds Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {displaySystems.slice(0, 4).map((system) => (
                            <LiveCameraFeedCard
                                key={system.id}
                                system={system}
                                onPreview={onPreviewSystem}
                            />
                        ))}
                    </div>
                </div>

                {/* Right Section: Real Time Activities + Navigation Cards */}
                <div className="space-y-5">
                    {/* Real Time Activities Card */}
                    <RealTimeActivitiesCard
                        activities={activities}
                        onViewAll={onOpenInventory}
                    />

                    {/* Navigation Card 1: Security Systems Inventory */}
                    <div
                        onClick={onOpenInventory}
                        className="bg-white rounded-2xl border border-[#BED3EB] p-5 shadow-xs flex items-center justify-between cursor-pointer hover:shadow-md hover:border-[#002E62]/40 transition-all group"
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                onOpenInventory();
                            }
                        }}
                    >
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center shrink-0">
                                <FiVideo className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-[#002E62] group-hover:text-[#002047] transition-colors">
                                    Security Systems Inventory
                                </h4>
                                <p className="text-xs text-[#71717A] mt-0.5">
                                    Manage and monitor all installed security equipment
                                </p>
                            </div>
                        </div>
                        <FiChevronRight className="w-5 h-5 text-[#71717A] group-hover:text-[#002E62] group-hover:translate-x-0.5 transition-all shrink-0" />
                    </div>

                    {/* Navigation Card 2: Access Control Logs */}
                    <div
                        onClick={onOpenAccessLogs}
                        className="bg-white rounded-2xl border border-[#BED3EB] p-5 shadow-xs flex items-center justify-between cursor-pointer hover:shadow-md hover:border-[#002E62]/40 transition-all group"
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                onOpenAccessLogs();
                            }
                        }}
                    >
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-[#F3E8FF] text-[#9333EA] flex items-center justify-center shrink-0">
                                <FiUsers className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-[#002E62] group-hover:text-[#002047] transition-colors">
                                    Access Control Logs
                                </h4>
                                <p className="text-xs text-[#71717A] mt-0.5">
                                    Monitor building access and entry/exit records
                                </p>
                            </div>
                        </div>
                        <FiChevronRight className="w-5 h-5 text-[#71717A] group-hover:text-[#002E62] group-hover:translate-x-0.5 transition-all shrink-0" />
                    </div>
                </div>
            </div>
        </div>
    );
}
