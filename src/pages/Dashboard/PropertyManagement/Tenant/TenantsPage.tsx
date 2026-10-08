import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Select from '@components/forms/Select';
import Input from '@components/forms/Input';
import DeleteConfirmationModal from '@components/cards/card/DeleteConfirmationModal';
import CardMenuItem from '@components/cards/card/CardMenuItem';
import Table, { type TableHeader } from '@components/ui/Table/Table';
import { useGetAllTenantsQuery, useLeavePropertyMutation } from '@store/api/tenant.api';
import EmptyState from '../../PropertyListing/Home/components/EmptyState';
import toast from 'react-hot-toast';
import EditTenantModal from './components/EditTenantModal';

const SkeletonRow = () => (
    <tr className="animate-pulse bg-white border-b border-gray-100">
        <td className="px-4 py-3"><div className="h-4 w-4 bg-gray-200 rounded"></div></td>
        <td className="px-4 py-3"><div className="h-4 w-6 bg-gray-200 rounded"></div></td>
        <td className="px-4 py-3"><div className="h-4 w-32 bg-gray-200 rounded"></div></td>
        <td className="px-4 py-3"><div className="h-4 w-40 bg-gray-200 rounded"></div></td>
        <td className="px-4 py-3"><div className="h-4 w-24 bg-gray-200 rounded"></div></td>
        <td className="px-4 py-3"><div className="h-4 w-28 bg-gray-200 rounded"></div></td>
        <td className="px-4 py-3"><div className="h-4 w-20 bg-gray-200 rounded"></div></td>
        <td className="px-4 py-3"><div className="h-6 w-16 bg-gray-200 rounded-full"></div></td>
        <td className="px-4 py-3"><div className="h-6 w-8 bg-gray-200 rounded mx-auto"></div></td>
    </tr>
);

// const TenantsPage: React.FC = () => {
const TenantsPage: React.FC = () => {
    // State for filters
    const [property, setProperty] = useState('');
    const [status, setStatus] = useState('');
    const [search, setSearch] = useState('');

    const { data: tenantsData, isLoading } = useGetAllTenantsQuery();

    // Map API tenants to ui structure
    const mappedTenants = (tenantsData?.data?.tenants || []).map((t: any, idx: number) => ({
        ...t,
        sn: String(idx + 1).padStart(2, '0'),
        id: t.tenantId,
        propertyId: t.property?.id,
        name: t.user?.firstName ? `${t.user.firstName} ${t.user.lastName || ''}` : t.name || 'Unknown',
        email: t.user?.email || t.email?.toLowerCase() || 'N/A',
        phone: t.user?.phoneNumber || t.phone || 'N/A',
        property: t.property?.name || 'N/A',
        unit: t.unit || 'N/A',
        status: t.rent?.status || t.status || 'PENDING',
    }));

    // per-row menu state
    const [openMenuFor, setOpenMenuFor] = useState<any>(null);
    const [menuPos, setMenuPos] = useState({ top: 0, right: 0 });
    const menuRef = useRef<HTMLDivElement | null>(null);

    const [leaveProperty] = useLeavePropertyMutation();
    // delete modal state
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [deleteCandidate, setDeleteCandidate] = useState<any | null>(null);

    // edit modal state
    const [showEditModal, setShowEditModal] = useState(false);
    const [editCandidate, setEditCandidate] = useState<any | null>(null);

    // close menu on outside click / Escape
    useEffect(() => {
        if (!openMenuFor) return;

        const handleOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setOpenMenuFor(null);
            }
        };

        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setOpenMenuFor(null);
        };

        window.addEventListener('mousedown', handleOutside);
        window.addEventListener('keydown', handleKey);
        return () => {
            window.removeEventListener('mousedown', handleOutside);
            window.removeEventListener('keydown', handleKey);
        };
    }, [openMenuFor]);

    const handleConfirmDelete = async () => {
        if (!deleteCandidate) return;
        if (!deleteCandidate.propertyId) {
            toast.error("Missing property ID");
            return;
        }

        try {
            await leaveProperty({ 
                propertyId: deleteCandidate.propertyId, 
            }).unwrap();
            toast.success("Tenant removed successfully");
        } catch (error: any) {
            console.error("Failed to delete tenant:", error);
            toast.error(error?.data?.message || "Failed to remove tenant");
        } finally {
            setShowDeleteConfirm(false);
            setDeleteCandidate(null);
        }
    };

    // Filter tenants
    const filteredTenants = mappedTenants.filter((t: any) => {
        const matchesProperty = property ? t.property === property : true;
        const matchesStatus = status ? t.status === status : true;
        const matchesSearch = search
            ? t.name.toLowerCase().includes(search.toLowerCase()) ||
              t.email.toLowerCase().includes(search.toLowerCase()) ||
              t.phone.includes(search)
            : true;
        return matchesProperty && matchesStatus && matchesSearch;
    });

    return (
        <div className="pb-10">
            <div className="mb-6 mt-4 max-w-300 mx-auto">
                <div className="mt-6 rounded-2xl border border-[#E8F4F8] bg-white p-8 shadow-sm">
                    <div className="flex flex-col gap-3 mb-6 sm:flex-row sm:items-center">
                        <Select
                            title="Property"
                            options={[
                                { label: 'All Properties', value: '' },
                                ...Array.from(new Set(mappedTenants.map((t: any) => t.property))).map((p: any) => ({
                                    label: p,
                                    value: p,
                                })) as any,
                            ]}
                            value={property}
                            onChange={setProperty}
                            containerClassName="min-w-[160px]"
                        />
                        <Select
                            title="Status"
                            options={[
                                { label: 'All Status', value: '' },
                                { label: 'Paid', value: 'Paid' },
                                { label: 'Due', value: 'Due' },
                            ]}
                            value={status}
                            onChange={setStatus}
                            containerClassName="min-w-[120px]"
                        />
                        <div className="relative flex-1 max-w-xs mt-5.5">
                            <svg
                                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#98A2B3]"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.2-5.2" />
                                <circle cx="11" cy="11" r="7" />
                            </svg>
                            <Input
                                title={undefined}
                                className="pl-12 pr-4 py-2 text-[16px]"
                                containerClassName="w-full"
                                placeholder="Search ..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>

                    <DeleteConfirmationModal
                        isOpen={showDeleteConfirm}
                        title="Delete Tenant"
                        message={
                            deleteCandidate
                                ? `Are you sure you want to delete ${deleteCandidate.name}? This action cannot be undone.`
                                : undefined
                        }
                        onConfirm={handleConfirmDelete}
                        onClose={() => {
                            setShowDeleteConfirm(false);
                            setDeleteCandidate(null);
                        }}
                    />

                    {!isLoading && mappedTenants.length === 0 ? (
                        <div className="py-12 flex justify-center w-full">
                            <EmptyState
                                title="No Tenants Found"
                                description="You have not added any tenants to your properties yet."
                                icon={
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                        <circle cx="9" cy="7" r="4" />
                                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                    </svg>
                                }
                            />
                        </div>
                    ) : !isLoading && filteredTenants.length === 0 ? (
                        <div className="py-12 flex justify-center w-full">
                            <EmptyState
                                title="No Match Found"
                                description="Try adjusting your search terms or filters."
                                actionLabel="Clear Filters"
                                onAction={() => {
                                    setSearch('');
                                    setProperty('');
                                    setStatus('');
                                }}
                               
                            />
                        </div>
                    ) : (
                        <Table
                            className="text-[16px]"
                            responsive="stack"
                            renderCard={(t: any) => (
                                <div className="grid grid-cols-1 gap-3">
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex items-center gap-3">
                                            <div className="h-9 w-9 rounded-full bg-[#F4F7FB] flex items-center justify-center text-[#0A2D50] font-semibold">
                                                {t.name?.split(' ')
                                                    .map((s: string) => s[0])
                                                    .slice(0, 2)
                                                    .join('')}
                                            </div>
                                            <div>
                                                <div className="font-semibold text-[#0A2D50] text-[15px]">{t.name}</div>
                                                <div className="text-[13px] text-[#64748B]">
                                                    {t.email} • {t.phone}
                                                </div>
                                            </div>
                                        </div>                                        <div className="relative inline-block">
                                            <button
                                                aria-haspopup="menu"
                                                aria-expanded={openMenuFor?.sn === t.sn}
                                                onClick={(e) => {
                                                    const rect = e.currentTarget.getBoundingClientRect();
                                                    setMenuPos({ top: rect.bottom + window.scrollY, right: window.innerWidth - rect.right });
                                                    setOpenMenuFor(openMenuFor?.sn === t.sn ? null : t);
                                                }}
                                                className="inline-flex items-center justify-center text-[#6B7280] p-2 rounded-full"
                                                title="Tenant actions"
                                            >
                                                <svg
                                                    viewBox="0 0 24 24"
                                                    className="h-5 w-5"
                                                    fill="currentColor"
                                                    aria-hidden
                                                >
                                                    <circle cx="12" cy="12" r="1.5" />
                                                    <circle cx="19" cy="12" r="1.5" />
                                                    <circle cx="5" cy="12" r="1.5" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
    
                                    <div className="flex items-center justify-between gap-3 text-[13px] text-[#374151]">
                                        <div>
                                            <div className="font-medium">Property</div>
                                            <div className="text-[#64748B]">
                                                {t.property} • {t.unit}
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-medium">Status</div>
                                            <div
                                                className={`mt-1 inline-block px-3 py-1 rounded-full text-[14px] font-semibold ${t.status?.toLowerCase() === 'paid' ? 'bg-[#E6F6F3] text-[#256D51]' : t.status?.toLowerCase() === 'pending' ? 'bg-[#FFF3CD] text-[#856404]' : 'bg-[#FFF0F0] text-[#D02929]'}`}
                                            >
                                                {t.status}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            headers={
                                [
                                    {
                                        key: 'select',
                                        label: (
                                            <>
                                                <label className="sr-only" htmlFor="tenant-select-all">
                                                    Select all tenants
                                                </label>
                                                <input type="checkbox" id="tenant-select-all" title="Select all tenants" />
                                            </>
                                        ),
                                    },
                                    { key: 'sn', label: 'S/N' },
                                    { key: 'name', label: 'FULL NAME' },
                                    { key: 'email', label: 'EMAIL' },
                                    { key: 'phone', label: 'PHONE NUMBER' },
                                    { key: 'property', label: 'PROPERTY NAME' },
                                    { key: 'unit', label: 'UNIT NAME' },
                                    { key: 'status', label: 'RENT STATUS' },
                                    { key: 'action', label: 'ACTION' },
                                ] as TableHeader[]
                            }
                            items={isLoading ? Array(5).fill({}) : filteredTenants}
                            renderRow={(t: any, idx: number) => {
                                if (isLoading) return <SkeletonRow key={idx} />;
                                return (
                                    <tr
                                        key={t.sn}
                                        className={idx % 2 === 0 ? 'bg-white text-[#3F3F46]' : 'bg-[#F3F5F5] text-[#3F3F46]'}
                                    >
                                        <td className="px-4 py-3">
                                            <label className="sr-only" htmlFor={`tenant-row-select-${t.sn}`}>
                                                Select tenant row
                                            </label>
                                            <input type="checkbox" id={`tenant-row-select-${t.sn}`} title="Select tenant row" />
                                        </td>
                                        <td className="px-4 py-3">{t.sn}</td>
                                        <td className="px-4 py-3">{t.name}</td>
                                        <td className="px-4 py-3">{t.email}</td>
                                        <td className="px-4 py-3">{t.phone}</td>
                                        <td className="px-4 py-3">{t.property}</td>
                                        <td className="px-4 py-3">{t.unit}</td>
                                        <td className="px-4 py-3">
                                            <span
                                                className={`px-4 py-1 rounded-full text-[15px] font-semibold ${t.status?.toLowerCase() === 'paid' ? 'bg-[#E6F6F3] text-[#256D51]' : t.status?.toLowerCase() === 'pending' ? 'bg-[#FFF3CD] text-[#856404]' : 'bg-[#FFF0F0] text-[#D02929]'}`}
                                            >
                                                {t.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            <div className="relative inline-block">
                                                <button
                                                    aria-haspopup="menu"
                                                    aria-expanded={openMenuFor?.sn === t.sn}
                                                    onClick={(e) => {
                                                        const rect = e.currentTarget.getBoundingClientRect();
                                                        setMenuPos({ top: rect.bottom + window.scrollY, right: window.innerWidth - rect.right });
                                                        setOpenMenuFor(openMenuFor?.sn === t.sn ? null : t);
                                                    }}
                                                    className="inline-flex items-center justify-center text-[#6B7280]"
                                                    title="Tenant actions"
                                                >
                                                    <svg
                                                        viewBox="0 0 24 24"
                                                        className="h-5 w-5"
                                                        fill="currentColor"
                                                        aria-hidden
                                                    >
                                                        <circle cx="12" cy="12" r="1.5" />
                                                        <circle cx="19" cy="12" r="1.5" />
                                                        <circle cx="5" cy="12" r="1.5" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            }}
                            start={filteredTenants.length ? 1 : 0}
                            end={filteredTenants.length}
                            total={mappedTenants.length}
                        />
                    )}
                    {/* pagination + summary handled by Table component */}
                    {/* pagination + summary handled by Table component */}
                </div>
            </div>
            
            {openMenuFor && createPortal(
                <div
                    ref={menuRef}
                    role="menu"
                    aria-orientation="vertical"
                    style={{ position: 'absolute', top: menuPos.top + 8, right: menuPos.right }}
                    className="w-55 bg-white border border-[#E6EEF7] rounded-xl shadow-lg ring-1 ring-black/5 py-2 z-[9999] overflow-hidden"
                >
                    <CardMenuItem
                        label="Edit Tenant"
                        iconSrc="/assets/icons/pen-line.svg"
                        iconAlt="Edit Tenant"
                        onActivate={() => {
                            const candidate = openMenuFor;
                            setOpenMenuFor(null);
                            setEditCandidate(candidate);
                            setShowEditModal(true);
                        }}
                        className="text-[#0A2D50] hover:bg-[#F1F9FF]"
                    />

                    <CardMenuItem
                        label="Add Tenant"
                        iconSrc="/assets/icons/plus.svg"
                        iconAlt="Add Tenant"
                        onActivate={() => {
                            const tSn = openMenuFor.sn;
                            setOpenMenuFor(null);
                            console.log('Add tenant for', tSn);
                        }}
                        className="text-[#0A2D50] hover:bg-[#F1F9FF]"
                    />

                    <div className="h-px bg-[#EEF4FB] my-1" />

                    <CardMenuItem
                        label="Delete Tenant"
                        iconSrc="/assets/icons/trash-2.svg"
                        iconAlt="Delete"
                        onActivate={() => {
                            const c = openMenuFor;
                            setOpenMenuFor(null);
                            setDeleteCandidate(c);
                            setShowDeleteConfirm(true);
                        }}
                        className="text-[#D02929] hover:bg-[#FFF5F5]"
                    />
                </div>,
                document.body
            )}

            <EditTenantModal
                open={showEditModal}
                onClose={() => {
                    setShowEditModal(false);
                    setEditCandidate(null);
                }}
                tenant={editCandidate}
            />
        </div>
    );
};

export default TenantsPage;
