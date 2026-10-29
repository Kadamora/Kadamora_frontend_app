import { useState, useRef, useEffect } from 'react';
import { FiMoreHorizontal, FiEye, FiRefreshCw } from 'react-icons/fi';
import type { ActiveLeaseAgreement } from '../../types/commercialFacilities';
import { showSuccessToast } from '@shared/components/Toast/Toast';

interface ActiveLeasesTableProps {
    leases: ActiveLeaseAgreement[];
    onViewProperty?: (lease: ActiveLeaseAgreement) => void;
    onRenewLease?: (lease: ActiveLeaseAgreement) => void;
}

export default function ActiveLeasesTable({
    leases,
    onViewProperty,
    onRenewLease,
}: ActiveLeasesTableProps) {
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setOpenMenuId(null);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const renderStatusBadge = (status: ActiveLeaseAgreement['status']) => {
        if (status === 'Active') {
            return (
                <span className="inline-block px-3 py-0.5 rounded-full text-xs font-semibold bg-[#EDFCF4] text-[#12B76A] border border-[#A6F4C5]">
                    Active
                </span>
            );
        }
        return (
            <span className="inline-block px-3 py-0.5 rounded-full text-xs font-semibold bg-[#FFECF2] text-[#F31260] border border-[#FDD0DF]">
                Expiring
            </span>
        );
    };

    return (
        <div className="bg-white rounded-2xl border border-[#BED3EB] p-5 sm:p-6 shadow-xs space-y-5">
            {/* Header */}
            <div>
                <h3 className="text-base sm:text-lg font-bold text-[#002E62]">
                    Active Leases
                </h3>
                <p className="text-xs text-[#71717A] mt-0.5">
                    Monitor and manage all current lease agreements
                </p>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                    <thead>
                        <tr className="border-b border-[#F0F2F5] text-[#71717A] font-semibold">
                            <th className="py-3 px-3">LEASE ID</th>
                            <th className="py-3 px-3">TENANTS</th>
                            <th className="py-3 px-3">START DATE</th>
                            <th className="py-3 px-3">END DATE</th>
                            <th className="py-3 px-3">AMOUNT / YEAR</th>
                            <th className="py-3 px-3">STATUS</th>
                            <th className="py-3 px-3 text-center">ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leases.map((lease, idx) => (
                            <tr
                                key={lease.id}
                                className={`transition-colors ${
                                    idx % 2 === 0 ? 'bg-[#F9FAFC]' : 'bg-white'
                                } hover:bg-[#F0F6FF]/60`}
                            >
                                <td className="py-3.5 px-3 text-[#71717A] font-medium">
                                    {lease.leaseId}
                                </td>
                                <td className="py-3.5 px-3 font-bold text-[#002E62]">
                                    {lease.tenantName}
                                </td>
                                <td className="py-3.5 px-3 text-[#52525B]">
                                    {lease.startDate}
                                </td>
                                <td className="py-3.5 px-3 text-[#52525B]">
                                    {lease.endDate}
                                </td>
                                <td className="py-3.5 px-3 font-semibold text-[#091E42]">
                                    {lease.amountPerYear}
                                </td>
                                <td className="py-3.5 px-3">
                                    {renderStatusBadge(lease.status)}
                                </td>
                                <td className="py-3.5 px-3 text-center relative">
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setOpenMenuId(openMenuId === lease.id ? null : lease.id);
                                        }}
                                        className="h-7 w-7 rounded-full border border-[#E2E8F0] text-[#71717A] hover:text-[#002E62] hover:bg-slate-100 inline-flex items-center justify-center transition-colors cursor-pointer"
                                        aria-label="Actions"
                                    >
                                        <FiMoreHorizontal className="h-4 w-4" />
                                    </button>

                                    {/* Action Dropdown Menu (Frame 2147224228) */}
                                    {openMenuId === lease.id && (
                                        <div
                                            ref={menuRef}
                                            onClick={(e) => e.stopPropagation()}
                                            className="absolute right-4 top-10 w-36 bg-white rounded-xl border border-[#E0E8F2] shadow-xl py-1.5 z-30 animate-[fadeIn_.15s_ease-out] text-left"
                                        >
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setOpenMenuId(null);
                                                    if (onViewProperty) onViewProperty(lease);
                                                    else showSuccessToast('View Property', `Viewing lease details for ${lease.tenantName}.`);
                                                }}
                                                className="w-full px-3.5 py-2 text-xs text-[#091E42] hover:bg-[#F0F6FF] hover:text-[#002E62] font-medium flex items-center gap-2 transition-colors cursor-pointer text-left"
                                            >
                                                <FiEye className="h-3.5 w-3.5 text-[#002E62]" />
                                                <span>View Property</span>
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setOpenMenuId(null);
                                                    if (onRenewLease) onRenewLease(lease);
                                                    else showSuccessToast('Renewal Initiated', `Lease renewal initiated for ${lease.tenantName}.`);
                                                }}
                                                className="w-full px-3.5 py-2 text-xs text-[#091E42] hover:bg-[#F0F6FF] hover:text-[#002E62] font-medium flex items-center gap-2 transition-colors cursor-pointer text-left"
                                            >
                                                <FiRefreshCw className="h-3.5 w-3.5 text-[#12B76A]" />
                                                <span>Renew Lease</span>
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
