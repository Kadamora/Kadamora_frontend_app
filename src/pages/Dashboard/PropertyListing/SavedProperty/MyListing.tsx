import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import Select from '@components/forms/Select';
import ProductCard from '@components/cards/product/ProductCard';
import Input from '@components/forms/Input';
import { useGetFavoritesQuery } from '@store/api/favorites.api';

// Use strict types for the API response
interface FavoriteProperty {
    id: string;
    title: string;
    price: string | number;
    location: string;
    propertyCategory: string;
    propertyType: string;
    propertySubType: string;
    amenities: string[];
    description: string;
    image?: string; // Adjust based on actual API response structure if needed
    media?: { url: string }[];
    [key: string]: any;
}

const normalize = (value: string) => value?.trim().toLowerCase() ?? '';

export default function MyListing() {
    const [categoryFilter, setCategoryFilter] = useState<string>('all');
    const [typeFilter, setTypeFilter] = useState<string>('all');
    const [searchTerm, setSearchTerm] = useState<string>('');
    const navigate = useNavigate()

    const {
        data,
        isLoading,
        isError,
        error,
    } = useGetFavoritesQuery({});

    const favoriteListing: FavoriteProperty[] = data?.data?.userFavorites ?? [];
    const hasFavorite = favoriteListing.length > 0;

    /* ========================
       Category & Type Options
    ======================== */

    const categories = useMemo(() => {
        if (hasFavorite) {
            return [
                'all',
                ...Array.from(
                    new Set(favoriteListing.map((l) => l.propertyCategory).filter(Boolean)),
                ),
            ];
        }
        return ['all'];
    }, [favoriteListing, hasFavorite]);

    const types = useMemo(() => {
        if (hasFavorite) {
            return [
                'all',
                ...Array.from(
                    new Set(favoriteListing.map((l) => l.propertyType).filter(Boolean)),
                ),
            ];
        }
        return ['all'];
    }, [favoriteListing, hasFavorite]);

    /* ========================
       Filtering Logic
    ======================== */

    const filteredFavoriteListings = useMemo(() => {
        if (!hasFavorite) return [];
        const search = normalize(searchTerm);
        return favoriteListing.filter((listing) => {
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
                ].some((field) => normalize(field || '').includes(search)) ||
                listing.amenities?.some((tag: any) => normalize(tag).includes(search));

            return matchesCategory && matchesType && matchesSearch;
        });
    }, [favoriteListing, categoryFilter, typeFilter, searchTerm, hasFavorite]);


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

    const noResults = filteredFavoriteListings.length === 0;

    return (
        <div className="pb-10">
            <header className="mb-10 flex flex-col gap-6">
                <div className="mb-1 mt-4">
                    <h1 className="text-[25px] font-semibold text-[#002E62] leading-snug">My Saved</h1>
                    {/* <nav className="mb-2 text-[13px] flex items-center gap-1">
                        <Link to="/dashboard/home" className="hover:underline">
                            Home
                        </Link>
                        <span>{'>'}</span>
                        <span className="text-primary">My Saved</span>
                    </nav> */}
                     <nav className="flex">
                        <span onClick={() => navigate('/')} className="cursor-pointer text-sm">Home</span>
                        <span className="mx-2 text-sm">›</span>
                        <span onClick={() => navigate(-1)} className="cursor-pointer text-sm">Listings</span>
                        <span className="mx-2 text-sm">›</span>
                        <span className="text-primary text-sm">My Saved</span>
                    </nav>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="text-[25px] font-semibold leading-snug w-full md:w-auto mb-4 md:mb-0">
                        All Saved
                    </div>
                    <div className="grid gap-4 sm:grid-cols-[minmax(0,180px)_minmax(0,180px)_minmax(0,1fr)] w-full md:w-auto">
                        <Select
                            containerClassName="relative"
                            placeholder="Category (All)"
                            value={categoryFilter}
                            onChange={setCategoryFilter}
                            options={categories.map((category) => ({
                                label: category === 'all' ? 'Category (All)' : category,
                                value: category,
                            }))}
                            className="rounded-full border-[#D8E3F2] bg-white px-5 py-3 text-[13px] font-medium text-[#0F172A] shadow-sm"
                        />

                        <Select
                            containerClassName="relative"
                            placeholder="Type (All)"
                            value={typeFilter}
                            onChange={setTypeFilter}
                            options={types.map((type) => ({
                                label: type === 'all' ? 'Type (All)' : type,
                                value: type,
                            }))}
                            className="rounded-full border-[#D8E3F2] bg-white px-5 py-3 text-[13px] font-medium text-[#0F172A] shadow-sm"
                        />

                        <div className="relative">
                            <Input
                                type="search"
                                value={searchTerm}
                                onChange={(event) => setSearchTerm(event.target.value)}
                                placeholder="Search listings..."
                                aria-label="Search listings"
                                className="rounded-full border-[#D8E3F2] bg-white pl-12 pr-4 text-[13px] font-medium text-[#0F172A] shadow-sm placeholder:text-[#94A3B8]"
                            />
                            <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-[#94A3B8]">
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 18 18"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M7.875 14.25C11.0115 14.25 13.625 11.6365 13.625 8.5C13.625 5.36351 11.0115 2.75 7.875 2.75C4.73851 2.75 2.125 5.36351 2.125 8.5C2.125 11.6365 4.73851 14.25 7.875 14.25Z"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M12.25 12.75L15.5 16"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </span>
                        </div>
                    </div>
                </div>
            </header>

            <section>
                {!hasFavorite ? (
                     <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="mb-4 h-24 w-24 rounded-full bg-gray-50 flex items-center justify-center">
                           <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                           </svg>
                        </div>
                        <h3 className="text-xl font-medium text-gray-900 mb-2">No favorites yet</h3>
                        <p className="text-gray-500 max-w-sm">
                            Items you mark as favorite will appear here. Browse properties to find your dream home.
                        </p>
                        <Link to="/dashboard/home" className="mt-6 text-[#002E62] font-semibold hover:underline">
                            Browse Properties
                        </Link>
                    </div>
                ) : noResults ? (
                    <div className="rounded-xl border border-dashed p-16 text-center text-gray-500">
                        No listings match your filters.
                    </div>
                ) : (
                    <div className="grid gap-7 sm:grid-cols-2 xl:grid-cols-4">
                        {filteredFavoriteListings.map((listing) => (
                            <ProductCard
                                key={listing.id}
                                property={{
                                    id: listing.id,
                                    name: listing.title,
                                    price: formatCurrency(listing.price),
                                    description: listing.description,
                                    category: listing.propertyCategory,
                                    subCategory: listing.propertySubType,
                                    image: listing.image || (listing.media && listing.media[0]?.url) || '', // Fallback for image
                                }}
                                // showAvailabilityToggle={true} 
                                // available={true} 
                            />
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}

function formatCurrency(value: number | string): string {
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(numValue)) return '₦ 0.00';
    return `₦ ${numValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}