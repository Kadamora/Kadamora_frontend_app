import React, { useState } from 'react';
import PropertyCard2 from '../../../../components/cards/card/PropertyCard2';
import { useGetManagedPropertiesQuery, useDeletePropertyMutation } from '@store/api/propertyMgt.api';
import AddTenantModal from '../Tenant/components/AddTenantModal';
import EmptyState from '../../PropertyListing/Home/components/EmptyState';

const PropertySkeleton = () => (
    <div className="rounded-2xl border border-gray-100 bg-white p-4 animate-pulse flex flex-col gap-4 min-w-[320px] h-40">
        <div className="flex justify-between">
            <div className="h-6 bg-gray-200 rounded w-1/2"></div>
            <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
        </div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="flex items-center gap-4 mt-auto">
            <div className="h-10 w-10 rounded-full bg-gray-200"></div>
            <div className="flex flex-col gap-1">
                <div className="h-4 bg-gray-200 rounded w-8"></div>
                <div className="h-3 bg-gray-200 rounded w-12"></div>
            </div>
        </div>
    </div>
);

const PropertiesPage: React.FC = () => {
    const { data: propertiesData, isLoading } = useGetManagedPropertiesQuery();
    const [deleteProperty] = useDeletePropertyMutation();
    const [addTenantModalOpen, setAddTenantModalOpen] = useState(false);
    const [selectedPropertyId, setSelectedPropertyId] = useState<string | undefined>(undefined);

    const properties = propertiesData?.data || [];
    
    const handleAddTenant = (id: number | string) => {
        setSelectedPropertyId(id.toString());
        setAddTenantModalOpen(true);
    };

    const handleDeleteProperty = async (id: number | string) => {
        try {
            await deleteProperty({ propertyId: id.toString() }).unwrap();
        } catch (error) {
            console.error("Failed to delete property:", error);
        }
    };

    return (
        <div className="pb-10">
            <AddTenantModal 
                open={addTenantModalOpen} 
                onClose={() => setAddTenantModalOpen(false)} 
                defaultPropertyId={selectedPropertyId} 
            />
            <div className="mb-6 mt-4 max-w-300 mx-auto">
                {/* Remove grid class if empty state is showing to allow centering */}
                <div className={isLoading || properties.length > 0 ? "mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "mt-6"}>
                    {isLoading ? (
                        Array(6).fill(0).map((_, idx) => <PropertySkeleton key={idx} />)
                    ) : properties.length === 0 ? (
                        <div className="py-12 flex justify-center w-full col-span-full">
                            <EmptyState
                                title="No Properties Managed"
                                description="You haven't listed or managed any properties yet."
                                actionLabel="List New Property"
                            />
                        </div>
                    ) : (
                        properties.map((p: any) => (
                            <PropertyCard2 
                                key={p.id} 
                                id={p.id} 
                                name={p.name} 
                                address={p.address} 
                                tenantCount={p.tenantCount || 0} 
                                onAddTenant={handleAddTenant}
                                onDelete={handleDeleteProperty}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default PropertiesPage;
