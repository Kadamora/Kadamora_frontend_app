import React, { useEffect, useRef } from 'react';
import { FiX, FiHome, FiTrash2, FiInfo } from 'react-icons/fi';
import type { Tenant } from '../types';
import { GlassWater, Lock } from 'lucide-react';

export interface TenantDetailsDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    tenant: Tenant | null;
}

interface ActivityItem {
    id: string;
    title: string;
    payer: string;
    date: string;
    amount: string;
    icon: React.ReactNode;
}

export default function TenantDetailsDrawer({
    isOpen,
    onClose,
    tenant,
}: TenantDetailsDrawerProps) {
    const drawerRef = useRef<HTMLDivElement | null>(null);

    // ESC key and body scroll lock
    useEffect(() => {
        if (!isOpen) return;

        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.style.overflow = prevOverflow;
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    const tenantName = tenant?.fullName || '';
    const tenantProperty = tenant?.property || '';

    const stats = [
        {
            label: 'Total Amount Paid',
            value: '₦5,550,000',
            icon: '/assets/icons/TenantPaid.svg',
        },
        {
            label: 'Ticket Raised',
            value: '05',
            icon: '/assets/icons/TenantTicket.svg',
        },
    ];

    const activities: ActivityItem[] = [
        {
            id: '1',
            title: 'House Rent',
            payer: `Femiayo Durochi - ${tenantProperty}`,
            date: '06 June, 2025',
            amount: '₦3,300,000.00',
            icon: <FiHome className="h-4 w-4 text-[#12B76A]" />,
        },
        {
            id: '2',
            title: 'Security Fee',
            payer: `Femiayo Durochi - ${tenantProperty}`,
            date: '06 June, 2025',
            amount: '₦30,000.00',
            icon: <Lock className="h-4 w-4 text-[#12B76A]" />,
        },
        {
            id: '3',
            title: 'Water Fee',
            payer: `Femiayo Durochi - ${tenantProperty}`,
            date: '06 June, 2025',
            amount: '₦3,000.00',
            icon: <GlassWater className="h-4 w-4 text-[#12B76A]" />,
        },
        {
            id: '4',
            title: 'Waste Fee',
            payer: `Femiayo Durochi - ${tenantProperty}`,
            date: '06 June, 2025',
            amount: '₦3,000.00',
            icon: <FiTrash2 className="h-4 w-4 text-[#12B76A]" />,
        },
        {
            id: '5',
            title: 'Waste Fee',
            payer: `Femiayo Durochi - ${tenantProperty}`,
            date: '06 June, 2025',
            amount: '₦3,000.00',
            icon: <FiTrash2 className="h-4 w-4 text-[#12B76A]" />,
        },
    ];

    return (
        <div
            className={`fixed inset-0 z-50 transition-all ${
                isOpen ? 'pointer-events-auto' : 'pointer-events-none'
            }`}
            role="presentation"
        >
            {/* Backdrop */}
            <div
                onClick={onClose}
                className={`absolute inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity duration-300 ${
                    isOpen ? 'opacity-100' : 'opacity-0'
                }`}
                aria-hidden="true"
            />

            {/* Sliding Panel */}
            <aside
                ref={drawerRef}
                className={`absolute right-0 top-0 flex h-full w-full max-w-[500px] flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
                role="dialog"
                aria-modal="true"
                aria-label={`${tenantName} Details`}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 pr-10 py-4 border-b border-[#F0F2F5]">
                    <h2 className="text-lg font-medium text-[#111827]">
                        {tenant?.fullName ? `${tenant.fullName} Details` : ''}
                    </h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="h-8 w-8 rounded-full bg-[#F2F5F8] text-[#71717A] hover:bg-[#E4E9EF] hover:text-[#093154] flex items-center justify-center transition-colors cursor-pointer"
                        aria-label="Close details"
                    >
                        <FiX className="h-4 w-4" />
                    </button>
                </div>

                {/* Content body */}
                <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
                    {/* User Profile Card */}
                    <div className="flex items-center gap-3">
                        <img
                            src="/assets/images/charles.png"
                            alt={tenantName}
                            className="h-12 w-12 rounded-full object-cover border border-[#E2E8F0] shadow-2xs"
                        />
                        <div>
                            <h3 className="text-base font-medium text-[#111827] leading-snug">
                                {tenantName}
                            </h3>
                            <p className="text-sm text-[#6B7280]">
                                {tenantProperty}
                            </p>
                        </div>
                    </div>

                    {/* 2 Metric Stat Cards */}
                    <div className="grid grid-cols-2 gap-3">
                        {stats.map((stat) => (
                            <div
                                key={stat.label}
                                className="rounded-lg border border-[#E4E4E7] p-3.5 bg-white flex items-center gap-3 shadow-2xs"
                            >
                                {typeof stat.icon === 'string' ? (
                                    <img
                                        src={stat.icon}
                                        alt={stat.label}
                                        className="h-10 w-10 shrink-0"
                                    />
                                ) : (
                                    <span className="h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                                        {stat.icon}
                                    </span>
                                )}
                                <div>
                                    <span className="text-base sm:text-lg font-semibold text-[#093154] block leading-tight">
                                        {stat.value}
                                    </span>
                                    <span className="text-[11px] text-[#6B7280] block mt-0.5">
                                        {stat.label}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Recent Activities Section */}
                    <div>
                        <div className="flex items-center gap-2 mb-3 text-sm font-semibold text-[#093154]">
                            <FiInfo className="h-4 w-4 text-[#004493]" />
                            <span>Recent Activities</span>
                        </div>

                        <div className="space-y-3">
                            {activities.map((act) => (
                                <div
                                    key={act.id}
                                    className="flex items-center justify-between py-3 border-b border-[#D4D4D8] hover:bg-[#F9FBFC] transition-colors"
                                >
                                    <div className="flex items-center gap-3 min-w-0">
                                        <span className="h-10 w-10 rounded-full bg-[#E6F6EE] flex items-center justify-center shrink-0 border border-[#86EAB8]">
                                            {act.icon}
                                        </span>
                                        <div className="min-w-0">
                                            <h4 className="text-sm font-semibold text-[#091E42] truncate">
                                                {act.title}
                                            </h4>
                                            <p className="text-xs text-[#6B7280] truncate">
                                                {act.payer}
                                            </p>
                                            <span className="text-[11px] text-[#98A2B3]">
                                                {act.date}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="text-right shrink-0 ml-3">
                                        <span className="text-sm font-semibold text-[#093154] block">
                                            {act.amount}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </aside>
        </div>
    );
}
