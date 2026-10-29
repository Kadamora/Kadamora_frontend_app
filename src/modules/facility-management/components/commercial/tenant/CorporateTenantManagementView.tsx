import { useState, useRef, useEffect } from 'react';
import { FiMoreHorizontal, FiEdit2, FiMessageSquare, FiUserPlus } from 'react-icons/fi';
import type { CorporateTenant } from '../../../types/commercialFacilities';

interface CorporateTenantManagementViewProps {
    tenants: CorporateTenant[];
    onAddTenant: () => void;
    onEditTenant: (tenant: CorporateTenant) => void;
    onChatTenant: (tenant: CorporateTenant) => void;
}

export default function CorporateTenantManagementView({
    tenants,
    onAddTenant,
    onEditTenant,
    onChatTenant,
}: CorporateTenantManagementViewProps) {
    const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    // Close menu on click outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setActiveMenuId(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const getStatusBadge = (status: CorporateTenant['status']) => {
        if (status === 'Active') {
            return (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#ECFDF3] text-[#12B76A] border border-[#ABEFC6]">
                    Active
                </span>
            );
        }
        return (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#FEF3F2] text-[#F04438] border border-[#FECDCA]">
                Expiring
            </span>
        );
    };

    return (
        <div className="bg-white rounded-2xl border border-[#BED3EB] p-6 shadow-xs space-y-6">
            {/* Header with Title and Add Tenant CTA (Image 1) */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-lg font-bold text-[#002E62]">
                        Tenant Directory
                    </h2>
                    <p className="text-xs text-[#71717A] mt-0.5">
                        Complete list of all tenants and their lease information
                    </p>
                </div>

                <div>
                    <button
                        type="button"
                        onClick={onAddTenant}
                        className="bg-[#002E62] hover:bg-[#002047] text-white px-5 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer shadow-xs"
                    >
                        <FiUserPlus className="w-4 h-4" />
                        <span>Add Tenant</span>
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[860px]">
                    <thead>
                        <tr className="border-b border-[#F0F2F5] text-[11px] font-bold text-[#71717A] uppercase tracking-wider">
                            <th className="py-3 px-3">ID</th>
                            <th className="py-3 px-3">Request Title</th>
                            <th className="py-3 px-3">Contact Person</th>
                            <th className="py-3 px-3">Property</th>
                            <th className="py-3 px-3">Lease Amount</th>
                            <th className="py-3 px-3">Lease Term</th>
                            <th className="py-3 px-3">Request Status</th>
                            <th className="py-3 px-3 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F0F2F5]">
                        {tenants.map((tenant) => (
                            <tr
                                key={tenant.id}
                                className="hover:bg-[#F9FAFC] transition-colors text-xs text-[#18181B]"
                            >
                                <td className="py-4 px-3 font-semibold text-[#002E62]">
                                    {tenant.id}
                                </td>
                                <td className="py-4 px-3 font-bold text-[#18181B]">
                                    {tenant.companyName}
                                </td>
                                <td className="py-4 px-3 text-[#52525B]">
                                    {tenant.contactPerson}
                                </td>
                                <td className="py-4 px-3 text-[#52525B]">
                                    {tenant.property}
                                </td>
                                <td className="py-4 px-3 text-[#18181B] font-mono">
                                    {tenant.leaseAmount}
                                </td>
                                <td className="py-4 px-3 text-[#52525B]">
                                    {tenant.leaseTerm}
                                </td>
                                <td className="py-4 px-3">
                                    {getStatusBadge(tenant.status)}
                                </td>
                                <td className="py-4 px-3 text-center relative">
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setActiveMenuId(
                                                activeMenuId === tenant.id ? null : tenant.id
                                            );
                                        }}
                                        className="h-8 w-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-[#71717A] hover:text-[#002E62] transition-colors cursor-pointer mx-auto"
                                        aria-label="Actions menu"
                                    >
                                        <FiMoreHorizontal className="w-4 h-4" />
                                    </button>

                                    {/* Action Dropdown Menu (matching Frame 2147225573 in Image 1) */}
                                    {activeMenuId === tenant.id && (
                                        <div
                                            ref={menuRef}
                                            className="absolute right-6 top-10 w-36 bg-white rounded-xl shadow-xl border border-[#E0E8F2] py-1.5 z-40 text-left animate-[fadeIn_.15s_ease-out]"
                                        >
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setActiveMenuId(null);
                                                    onEditTenant(tenant);
                                                }}
                                                className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-[#18181B] hover:bg-[#F4F6F9] hover:text-[#002E62] transition-colors cursor-pointer"
                                            >
                                                <FiEdit2 className="w-3.5 h-3.5 text-[#002E62]" />
                                                <span>Edit</span>
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setActiveMenuId(null);
                                                    onChatTenant(tenant);
                                                }}
                                                className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-[#18181B] hover:bg-[#F4F6F9] hover:text-[#002E62] transition-colors cursor-pointer"
                                            >
                                                <FiMessageSquare className="w-3.5 h-3.5 text-[#002E62]" />
                                                <span>Chat Tenant</span>
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
