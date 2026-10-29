import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router';
import PageHeader from '@shared/components/Dashboard/PageHeader';
import Table, { type Column } from '@shared/components/Table/Table';
import TableToolbar from '@shared/components/Table/TableToolbar';
import StatusBadge from '@shared/components/Tag/StatusBadge';
import FloatingChatButton from '@shared/components/Dashboard/FloatingChatButton';
import ContextMenu from '@shared/components/ContextMenu/ContextMenu';
import AddTenantModal from '../../components/AddTenantModal';
import TenantDetailsDrawer from '../../components/TenantDetailsDrawer';
import { mockTenants, mockPropertiesFilter } from '../../data/mock';
import type { Tenant, NewTenantInput } from '../../types';
import { FiMoreHorizontal, FiPlus, FiEye, FiMessageCircle } from 'react-icons/fi';

export default function FMTenantsPage() {
    const navigate = useNavigate();
    const [tenants, setTenants] = useState<Tenant[]>(mockTenants);
    const [search, setSearch] = useState('');
    const [selectedProperty, setSelectedProperty] = useState('all');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [selectedTenantForDetails, setSelectedTenantForDetails] = useState<Tenant | null>(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const filteredTenants = useMemo(() => {
        return tenants.filter((item) => {
            const matchesProperty =
                selectedProperty === 'all' ||
                item.property.toLowerCase() === selectedProperty.toLowerCase();
            const q = search.toLowerCase().trim();
            const matchesSearch =
                !q ||
                item.fullName.toLowerCase().includes(q) ||
                item.unitNo.toLowerCase().includes(q) ||
                item.property.toLowerCase().includes(q) ||
                item.phone.includes(q);
            return matchesProperty && matchesSearch;
        });
    }, [tenants, search, selectedProperty]);

    const handleAddTenant = (data: NewTenantInput) => {
        const newTenant: Tenant = {
            id: String(Date.now()),
            unitNo: data.unit,
            property: data.property,
            fullName: data.email.split('@')[0].replace(/[._]/g, ' ') || 'New Tenant',
            phone: data.phone,
            leaseStart: data.leaseStartDate,
            leaseEnd: 'One Year Later',
            type: 'Residential',
            status: 'Active',
        };
        setTenants((prev) => [newTenant, ...prev]);
    };

    const handleViewTenant = (tenant: Tenant) => {
        setSelectedTenantForDetails(tenant);
        setIsDrawerOpen(true);
    };

    const handleChatTenant = () => {
        navigate('/facility-management/dashboard/communication');
    };

    const columns: Column<Tenant>[] = [
        {
            key: 'unitNo',
            label: 'UNIT NO',
            cellClassName: 'text-sm text-[#52525B]  py-4 px-4',
            render: (val) => val,
        },
        {
            key: 'property',
            label: 'PROPERTY',
            cellClassName: 'text-sm text-[#52525B]  py-4 px-4',
            render: (val) => val,
        },
        {
            key: 'fullName',
            label: 'FULL NAME',
            cellClassName: 'text-sm  text-[#52525B] py-4 px-4',
            render: (val) => val,
        },
        {
            key: 'phone',
            label: 'PHONE NUMBER',
            cellClassName: 'text-sm text-[#52525B] py-4 px-4',
            render: (val) => val,
        },
        {
            key: 'leaseStart',
            label: 'LEASE START',
            cellClassName: 'text-sm text-[#52525B] py-4 px-4',
            render: (val) => val,
        },
        {
            key: 'leaseEnd',
            label: 'LEASE END',
            cellClassName: 'text-sm text-[#52525B] py-4 px-4',
            render: (val) => val,
        },
        {
            key: 'type',
            label: 'TYPE',
            cellClassName: 'text-sm text-[#52525B] py-4 px-4',
            render: (val) => val,
        },
        {
            key: 'status',
            label: 'STATUS',
            cellClassName: 'py-4 px-4',
            render: (_, item) => <StatusBadge status={item.status} />,
        },
        {
            key: 'action',
            label: 'ACTION',
            align: 'center',
            cellClassName: 'py-4 px-4 text-center',
            render: (_, item) => (
                <div className="flex justify-center">
                    <ContextMenu
                        trigger={
                            <button
                                type="button"
                                className="inline-flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#848484] text-[#52525B] hover:text-slate-700 hover:border-gray-300 transition-colors cursor-pointer"
                                aria-label="Actions"
                            >
                                <FiMoreHorizontal className="h-4 w-4" />
                            </button>
                        }
                        align="right"
                        items={[
                            {
                                label: 'View Tenant',
                                icon: <FiEye className="h-4 w-4 text-[#093154]" />,
                                onClick: () => handleViewTenant(item),
                            },
                            {
                                label: 'Chat Tenant',
                                icon: <FiMessageCircle className="h-4 w-4 text-[#093154]" />,
                                onClick: handleChatTenant,
                            },
                        ]}
                    />
                </div>
            ),
        },
    ];

    return (
        <div className="space-y-4 pb-12">
            {/* Header with Title and Breadcrumb */}
            <PageHeader
                title="All Tenants"
                crumbs={[
                    { label: 'Dashboard', path: '/facility-management/dashboard' },
                    { label: 'All Tenants' },
                ]}
            />

            {/* Main Table Card */}
            <div className="bg-white border border-[#E4E7EC] rounded-2xl shadow-xs overflow-hidden">
                <TableToolbar
                    reverse={true}
                    searchValue={search}
                    onSearchChange={setSearch}
                    searchPlaceholder="Search"
                    selectedFilter={selectedProperty}
                    filterOptions={mockPropertiesFilter}
                    onFilterChange={setSelectedProperty}
                    action={
                        <button
                            type="button"
                            onClick={() => setIsAddModalOpen(true)}
                            className="inline-flex items-center gap-2 bg-[#093154] hover:bg-[#072440] text-white text-xs sm:text-sm font-semibold rounded-lg px-4 py-2 transition shadow-xs cursor-pointer"
                        >
                            <FiPlus className="h-4 w-4" />
                            <span>Add Tenant</span>
                        </button>
                    }
                />

                <Table
                    columns={columns}
                    data={filteredTenants}
                    showPagination={false}
                    headerRowClassName="bg-[#F8FAFC] border-b border-[#E4E7EC] text-[11px] font-semibold text-[#667085] tracking-wider"
                    rowClassName="border-b border-[#F2F4F7] hover:bg-[#F9FAFB] transition-colors"
                />
            </div>

            {/* Add Tenant Modal */}
            <AddTenantModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSubmit={handleAddTenant}
            />

            {/* Tenant Details Slide-over Drawer */}
            <TenantDetailsDrawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                tenant={selectedTenantForDetails}
            />

            {/* Floating Support Chat FAB */}
            <FloatingChatButton />
        </div>
    );
}
