import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';

import Select from '@components/forms/Select';
import Input from '@components/forms/Input';
import PropertyCard from '@components/cards/property/PropertyCard';

import {
    useGetAgentPropertyListingsQuery,
    useDeletePropertyListingMutation,
    useDisablePropertyListingMutation,
    type AgentPropertyListing,
} from '@store/api/propertyListings.api';
import { Search } from 'lucide-react';
import DeleteConfirmationModal from '@components/cards/card/DeleteConfirmationModal';
import ListPropertyFlowModal from '../Home/components/ListPropertyFlow/ListPropertyFlowModal';

const normalize = (value?: string | null) => value?.trim().toLowerCase() ?? '';

export default function MyListing() {
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [typeFilter, setTypeFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    // Modal States
    const [propertyToDelete, setPropertyToDelete] = useState<AgentPropertyListing | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    
    const [propertyToEdit, setPropertyToEdit] = useState<AgentPropertyListing | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    
    const [deleteProperty] = useDeletePropertyListingMutation();
    const [disableProperty, { isLoading: isDisabling }] = useDisablePropertyListingMutation();
    const [togglingId, setTogglingId] = useState<string | null>(null);

    /* ========================
       Fetch Agent Listings
    ======================== */

    const {
        data,
        isLoading,
        isError,
        error,
    } = useGetAgentPropertyListingsQuery();

    const agentListings: AgentPropertyListing[] = data?.data ?? [];

    /* ========================
       Category & Type Options
    ======================== */

    const categories = useMemo(() => {
        return [
            'all',
            ...Array.from(
                new Set(
                    agentListings
                        .map((l) => l.propertyCategory)
                        .filter((c): c is string => !!c),
                ),
            ),
        ];
    }, [agentListings]);

    const types = useMemo(() => {
        return [
            'all',
            ...Array.from(
                new Set(
                    agentListings
                        .map((l) => l.propertyType)
                        .filter((t): t is string => !!t),
                ),
            ),
        ];
    }, [agentListings]);

    /* ========================
       Filtering Logic
    ======================== */

    const filteredAgentListings = useMemo(() => {
        const search = normalize(searchTerm);

        return agentListings.filter((listing) => {
            const matchesCategory =
                categoryFilter === 'all' || listing.propertyCategory === categoryFilter;

            const matchesType =
                typeFilter === 'all' || listing.propertyType === typeFilter;

            const matchesSearch =
                !search ||
                [
                    listing.title,
                    listing.location,
                    listing.propertyCategory,
                    listing.propertyType,
                    listing.propertySubType,
                ].some((field) => normalize(field).includes(search)) ||
                listing.amenities?.some((tag) => normalize(tag).includes(search));

            return matchesCategory && matchesType && matchesSearch;
        });
    }, [agentListings, categoryFilter, typeFilter, searchTerm]);

    /* ========================
       UI States
    ======================== */
    const backendErrorMessage =
        (error as any)?.data?.message ||
        (error as any)?.error ||
        'Something went wrong while loading listings';

    const handleDeleteClick = (property: AgentPropertyListing) => {
        setPropertyToDelete(property);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (!propertyToDelete) return;
        try {
            await deleteProperty(propertyToDelete.id).unwrap();
            setIsDeleteModalOpen(false);
            setPropertyToDelete(null);
        } catch (err: any) {
            console.error('Failed to delete listing:', err);
            alert(err?.data?.message || 'Failed to delete listing');
        }
    };

    const handleEditClick = (property: AgentPropertyListing) => {
        setPropertyToEdit(property);
        setIsEditModalOpen(true);
    };

    const handleToggleAvailability = async (id: string) => {
        setTogglingId(id);
        try {
            await disableProperty(id).unwrap();
        } catch (err: any) {
            console.error('Failed to toggle availability:', err);
            alert(err?.data?.message || 'Failed to update availability');
        } finally {
            setTogglingId(null);
        }
    };

    if (isLoading) {
        return (
             <div className="flex items-center justify-center py-20">
                <div className="h-10 w-10 animate-spin rounded-full border-2 border-gray-300 border-t-[#002E62]" />
            </div>
        );
    }

   if (isError) {
  return (
    <div className="flex items-center justify-center py-24">
      <div className="max-w-md rounded-xl border border-red-200 bg-red-50 p-6 text-center">
        <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
          <svg
            className="h-5 w-5 text-red-600"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01M12 3a9 9 0 100 18 9 9 0 000-18z"
            />
          </svg>
        </div>

        <h3 className="mb-1 text-sm font-semibold text-red-700">
          Unable to load listings
        </h3>

        <p className="text-sm text-red-600">
          {backendErrorMessage}
        </p>

        <button
          onClick={() => window.location.reload()}
          className="mt-4 rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    </div>
  );
}


    /* ========================
       Render
    ======================== */
    
    // 1. Initial Empty State (No listings at all)
    if (!isLoading && !isError && agentListings.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                 <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">No Properties Listed Yet</h2>
                <p className="text-gray-500 max-w-md mb-8">
                    Your property portfolio is currently empty. Start managing your real estate listings by adding your first property.
                </p>
               
            </div>
        );
    }

    return (
        <div className="pb-10">
            <header className="mb-10 flex flex-col gap-6">
                <div>
                    <h1 className="text-[25px] font-semibold text-[#002E62]">
                        My Listing
                    </h1>
                     <nav className="flex">
                        <span onClick={() => navigate('/')} className="cursor-pointer text-sm">Home</span>
                        <span className="mx-2 text-sm">›</span>
                        <span onClick={() => navigate(-1)} className="cursor-pointer text-sm">Listings</span>
                        <span className="mx-2 text-sm">›</span>
                        <span className="text-primary text-sm">My Listing</span>
                    </nav>
                </div>
                
                <div className="flex gap-4 items-center justify-between">
                    <h1 className="text-[23px] font-semibold text-[#002E62]">All Listing</h1>
                <div className="flex gap-4">
                    <Select
                        value={categoryFilter}
                        onChange={setCategoryFilter}
                        options={categories.map((c) => ({
                            label: c === 'all' ? 'Category (All)' : formatOptionLabel(c),
                            value: c,
                        }))}
                    />

                    <Select
                        containerClassName="relative w-24"
                        placeholder="Type"
                        value={typeFilter}
                        onChange={setTypeFilter}
                        options={types.map((t) => ({
                            label: t === 'all' ? 'Type' : formatOptionLabel(t),
                            value: t,
                        }))}
                    />

                    <Input
                        type="search"
                        placeholder="Search ..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        leftIcon={<Search size={18} />}
                    />
                </div>
                </div>
            </header>

            {filteredAgentListings.length === 0 ? (
                <div className="rounded-xl border border-dashed p-16 text-center text-gray-500">
                    No listings match your filters.
                </div>
            ) : (
                <div className="grid gap-7 sm:grid-cols-2 xl:grid-cols-4">
                    {filteredAgentListings.map((listing) => (
                        <PropertyCard
                            key={listing.id}
                            property={listing}
                            showAvailabilityToggle
                            isTogglingAvailability={isDisabling && togglingId === listing.id}
                            onToggleAvailability={() => handleToggleAvailability(listing.id)}
                            onEdit={handleEditClick}
                            onDelete={handleDeleteClick}
                        />
                    ))}
                </div>
            )}

            <DeleteConfirmationModal
                isOpen={isDeleteModalOpen}
                title="Delete Listing"
                message="Are you sure you want to delete this property? This action is permanent and cannot be undone."
                onConfirm={handleDeleteConfirm}
                onClose={() => {
                    setIsDeleteModalOpen(false);
                    setPropertyToDelete(null);
                }}
            />

            <ListPropertyFlowModal
                open={isEditModalOpen}
                editingProperty={propertyToEdit}
                onClose={() => {
                    setIsEditModalOpen(false);
                    setPropertyToEdit(null);
                }}
            />
        </div>
    );
}



function formatOptionLabel(value: string): string {
    return value
        .replace(/_/g, ' ')
        .replace(/\b\w/g, (l) => l.toUpperCase());
}