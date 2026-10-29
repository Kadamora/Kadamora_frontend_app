import { useState } from 'react';
import Tabs from '@shared/components/Tabs';
import WorkspacePropertyCard from './WorkspacePropertyCard';
import ListPropertyForLeaseModal from './lease-flow/ListPropertyForLeaseModal';
import DeleteListingModal from './DeleteListingModal';
import ActiveLeasesTable from './ActiveLeasesTable';
import CustomizationRequestsView from './customization/CustomizationRequestsView';

import {
    mockWorkspaceProperties,
    mockActiveLeases,
} from '../../data/commercialFacilitiesMock';
import type {
    WorkspaceTab,
    WorkspaceProperty,
    ActiveLeaseAgreement,
} from '../../types/commercialFacilities';
import { showSuccessToast } from '@shared/components/Toast/Toast';

export default function WorkspaceLeasingView() {
    const [activeTab, setActiveTab] = useState<WorkspaceTab>('Available Properties');
    const [properties, setProperties] = useState<WorkspaceProperty[]>(mockWorkspaceProperties);
    const [activeLeases] = useState<ActiveLeaseAgreement[]>(mockActiveLeases);

    // Modal state for List/Edit Property
    const [isListModalOpen, setIsListModalOpen] = useState(false);
    const [editingProperty, setEditingProperty] = useState<WorkspaceProperty | null>(null);

    // Modal state for Delete Listing
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [propertyToDelete, setPropertyToDelete] = useState<WorkspaceProperty | null>(null);

    const handleSelectProperty = (property: WorkspaceProperty) => {
        showSuccessToast('Property Selected', `${property.title} details loaded.`);
    };

    const handleOpenCreateModal = () => {
        setEditingProperty(null);
        setIsListModalOpen(true);
    };

    const handleOpenEditModal = (property: WorkspaceProperty) => {
        setEditingProperty(property);
        setIsListModalOpen(true);
    };

    const handleOpenDeleteModal = (property: WorkspaceProperty) => {
        setPropertyToDelete(property);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = () => {
        if (!propertyToDelete) return;
        setProperties((prev) => prev.filter((p) => p.id !== propertyToDelete.id));
        showSuccessToast('Listing Deleted', `"${propertyToDelete.title}" has been removed.`);
        setIsDeleteModalOpen(false);
        setPropertyToDelete(null);
    };

    const handleSaveProperty = (saved: WorkspaceProperty) => {
        setProperties((prev) => {
            const exists = prev.some((p) => p.id === saved.id);
            if (exists) {
                return prev.map((p) => (p.id === saved.id ? saved : p));
            }
            return [saved, ...prev];
        });
    };

    return (
        <div className="space-y-6">
            {/* Tabs Row (Image 1, 2) */}
            <Tabs
                tabs={['Available Properties', 'Active Leases', 'Customization Request'] as const}
                activeTab={activeTab}
                onChange={(tab) => setActiveTab(tab as WorkspaceTab)}
            />

            {/* Tab 1: Available Properties */}
            {activeTab === 'Available Properties' && (
                <div className="bg-white rounded-2xl border border-[#BED3EB] p-5 sm:p-6 shadow-xs space-y-6">
                    {/* Header with Title and Lease Property button */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h3 className="text-base sm:text-lg font-bold text-[#002E62]">
                                Available Workspace Properties
                            </h3>
                            <p className="text-xs text-[#71717A] mt-0.5">
                                Manage commercial properties, leases, and tenant relationships.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={handleOpenCreateModal}
                            className="bg-[#002E62] hover:bg-[#002047] text-white px-5 py-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer shadow-xs shrink-0 self-start sm:self-auto"
                        >
                            Lease Property
                        </button>
                    </div>

                    {/* Properties 3-column Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {properties.map((property) => (
                            <WorkspacePropertyCard
                                key={property.id}
                                property={property}
                                onSelect={handleSelectProperty}
                                onEdit={handleOpenEditModal}
                                onDelete={handleOpenDeleteModal}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Tab 2: Active Leases (Image 1) */}
            {activeTab === 'Active Leases' && (
                <ActiveLeasesTable leases={activeLeases} />
            )}

            {/* Tab 3: Customization Request (Image 2) */}
            {activeTab === 'Customization Request' && (
                <CustomizationRequestsView />
            )}

            {/* Multi-Step Modal: List Property for Lease */}
            <ListPropertyForLeaseModal
                isOpen={isListModalOpen}
                onClose={() => {
                    setIsListModalOpen(false);
                    setEditingProperty(null);
                }}
                onSave={handleSaveProperty}
                initialProperty={editingProperty}
            />

            {/* Confirmation Modal: Delete Listing */}
            <DeleteListingModal
                isOpen={isDeleteModalOpen}
                onClose={() => {
                    setIsDeleteModalOpen(false);
                    setPropertyToDelete(null);
                }}
                onConfirm={handleConfirmDelete}
                propertyTitle={propertyToDelete?.title}
            />
        </div>
    );
}
