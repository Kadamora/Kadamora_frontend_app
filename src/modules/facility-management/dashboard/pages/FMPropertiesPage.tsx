import { useState } from 'react';
import PageHeader from '@shared/components/Dashboard/PageHeader';
import PropertyCard2 from '@shared/components/Cards/PropertyCard2';
import Button from '@shared/components/Button/Button';
import FloatingChatButton from '@shared/components/Dashboard/FloatingChatButton';
import AddPropertyModal, { type PropertyFormData } from '../../components/AddPropertyModal';
import AddTenantModal from '../../components/AddTenantModal';
import { showSuccessToast } from '@shared/components/Toast/Toast';
import type { NewTenantInput } from '../../types';
import { FiPlus } from 'react-icons/fi';

export interface PropertyItem {
    id: string;
    name: string;
    address: string;
    tenantCount: number;
    category?: string;
}

const INITIAL_PROPERTIES: PropertyItem[] = [
    {
        id: '1',
        name: 'Sunset Gardens',
        address: '112, Oak Street Yaba, Lagos',
        tenantCount: 32,
        category: 'Residential',
    },
    {
        id: '2',
        name: 'Hilltop',
        address: '02, Ademola Adetokunbo Crescent, Wuse 2 Abuja',
        tenantCount: 30,
        category: 'Residential',
    },
    {
        id: '3',
        name: 'Dominion Estate',
        address: 'Abacha Close, Gwarimpa, Abuja',
        tenantCount: 12,
        category: 'Residential',
    },
    {
        id: '4',
        name: 'Hilton Estate',
        address: 'Abacha Close, Gwarimpa, Abuja',
        tenantCount: 56,
        category: 'Residential',
    },
    {
        id: '5',
        name: 'De Villa',
        address: 'Abacha Close, Gwarimpa, Abuja',
        tenantCount: 8,
        category: 'Residential',
    },
    {
        id: '6',
        name: 'Oak City',
        address: 'Abacha Close, Gwarimpa, Abuja',
        tenantCount: 12,
        category: 'Residential',
    },
];

export default function FMPropertiesPage() {
    const [properties, setProperties] = useState<PropertyItem[]>(INITIAL_PROPERTIES);
    const [isAddPropertyModalOpen, setIsAddPropertyModalOpen] = useState(false);
    const [editingProperty, setEditingProperty] = useState<PropertyFormData | null>(null);

    // Add Tenant from card state
    const [isAddTenantModalOpen, setIsAddTenantModalOpen] = useState(false);
    const [selectedPropertyForTenant, setSelectedPropertyForTenant] = useState<string>('');

    const handleOpenAddProperty = () => {
        setEditingProperty(null);
        setIsAddPropertyModalOpen(true);
    };

    const handleEditProperty = (id: string | number) => {
        const found = properties.find((p) => String(p.id) === String(id));
        if (found) {
            setEditingProperty({
                id: found.id,
                name: found.name,
                category: found.category || 'Residential',
                address: found.address,
            });
            setIsAddPropertyModalOpen(true);
        }
    };

    const handleSaveProperty = (data: PropertyFormData) => {
        if (data.id) {
            // Update
            setProperties((prev) =>
                prev.map((p) =>
                    String(p.id) === String(data.id)
                        ? { ...p, name: data.name, address: data.address, category: data.category }
                        : p
                )
            );
            showSuccessToast('Property Updated', `${data.name} has been updated successfully.`);
        } else {
            // Create
            const newProperty: PropertyItem = {
                id: String(Date.now()),
                name: data.name,
                address: data.address,
                tenantCount: 0,
                category: data.category,
            };
            setProperties((prev) => [newProperty, ...prev]);
            showSuccessToast('Property Added', `${data.name} has been added successfully.`);
        }
    };

    const handleDeleteProperty = (id: string | number) => {
        const toDelete = properties.find((p) => String(p.id) === String(id));
        setProperties((prev) => prev.filter((p) => String(p.id) !== String(id)));
        showSuccessToast('Property Deleted', `${toDelete?.name || 'Property'} has been removed.`);
    };

    const handleAddTenantForProperty = (id: string | number) => {
        const found = properties.find((p) => String(p.id) === String(id));
        if (found) {
            setSelectedPropertyForTenant(found.name);
            setIsAddTenantModalOpen(true);
        }
    };

    const handleTenantAdded = (data: NewTenantInput) => {
        const targetProperty = data.property || selectedPropertyForTenant;
        if (targetProperty) {
            setProperties((prev) =>
                prev.map((p) =>
                    p.name.toLowerCase() === targetProperty.toLowerCase()
                        ? { ...p, tenantCount: p.tenantCount + 1 }
                        : p
                )
            );
        }
        showSuccessToast('Tenant Invited', 'Tenant invitation sent successfully.');
    };

    return (
        <div className="space-y-6 pb-12">
            {/* Header with Title, Breadcrumbs, and Add Property Action */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <PageHeader
                    title="All Properties"
                    crumbs={[
                        { label: 'Dashboard', path: '/facility-management/dashboard' },
                        { label: 'All Properties' },
                    ]}
                />

                <Button
                    type="button"
                    variant="primary"
                    onClick={handleOpenAddProperty}
                    className=""
                >
                    <FiPlus className="h-4 w-4" />
                    <span>Add New Property</span>
                </Button>
            </div>

            {/* Properties Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map((item) => (
                    <PropertyCard2
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        address={item.address}
                        tenantCount={item.tenantCount}
                        onEdit={handleEditProperty}
                        onAddTenant={handleAddTenantForProperty}
                        onDelete={handleDeleteProperty}
                    />
                ))}
            </div>

            {/* Add / Edit Property Modal */}
            <AddPropertyModal
                isOpen={isAddPropertyModalOpen}
                onClose={() => setIsAddPropertyModalOpen(false)}
                onSubmit={handleSaveProperty}
                initialData={editingProperty}
            />

            {/* Add Tenant Modal */}
            <AddTenantModal
                isOpen={isAddTenantModalOpen}
                onClose={() => setIsAddTenantModalOpen(false)}
                onSubmit={handleTenantAdded}
                defaultProperty={selectedPropertyForTenant}
            />

            {/* Floating Support Chat FAB */}
            <FloatingChatButton />
        </div>
    );
}
