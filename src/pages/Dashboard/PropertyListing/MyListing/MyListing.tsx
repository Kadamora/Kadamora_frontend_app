import { useMemo, useState } from 'react';
import { Link } from 'react-router';

import Select from '@components/forms/Select';
import Input from '@components/forms/Input';
import PropertyCard from '@components/cards/property/PropertyCard';

import {
    useGetAgentPropertyListingsQuery,
    type AgentPropertyListing,
} from '@store/api/propertyListings.api';

const normalize = (value?: string | null) => value?.trim().toLowerCase() ?? '';

export default function MyListing() {
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [typeFilter, setTypeFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

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
                <Link 
                    to="/dashboard/property-listing/create" 
                    className="bg-[#002E62] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#003da1] transition-colors"
                >
                    Add New Property
                </Link>
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
                    <nav className="text-[13px] flex items-center gap-1">
                        <Link to="/dashboard/home" className="hover:underline">
                            Home
                        </Link>
                        <span>{'>'}</span>
                        <span className="text-primary">My Listing</span>
                    </nav>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                    <Select
                        value={categoryFilter}
                        onChange={setCategoryFilter}
                        options={categories.map((c) => ({
                            label: c === 'all' ? 'Category (All)' : formatOptionLabel(c),
                            value: c,
                        }))}
                    />

                    <Select
                        containerClassName="relative"
                        placeholder="Category (All)"
                        value={typeFilter}
                        onChange={setTypeFilter}
                        options={types.map((t) => ({
                            label: t === 'all' ? 'Type (All)' : formatOptionLabel(t),
                            value: t,
                        }))}
                    />

                    <Input
                        type="search"
                        placeholder="Search listings..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
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
                        />
                    ))}
                </div>
            )}
        </div>
    );
}



function formatOptionLabel(value: string): string {
    return value
        .replace(/_/g, ' ')
        .replace(/\b\w/g, (l) => l.toUpperCase());
}