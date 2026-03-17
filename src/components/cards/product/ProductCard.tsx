import { Link } from 'react-router';
import { useMarkFavoriteMutation, useGetFavoritesQuery } from '@store/api/favorites.api';

export interface ProductCardProps {
    property: {
        id: number | string;
        name: string;
        price: string;
        description: string;
        category: string;
        subCategory: string;
        image: string;
    };
    landingPage?: boolean;
    showAvailabilityToggle?: boolean;
    available?: boolean;
    availabilityLabel?: string;
    onToggleAvailability?: () => void;
}

export default function ProductCard({
    property,
    landingPage,
    showAvailabilityToggle = false,
    available = false,
    availabilityLabel,
    onToggleAvailability,
}: any) {
    const availabilityText = availabilityLabel ?? (available ? 'Visible to clients' : 'Hidden');

    const [markFavorite, { isLoading: isToggling }] = useMarkFavoriteMutation();
    const { data: favoritesData } = useGetFavoritesQuery({});
    
    // Check if current property is in favorites
    // Handle potential ID type mismatch (string vs number)
    const isFavorite = favoritesData?.data?.userFavorites?.some((fav: any) => String(fav.id) === String(property.id));

    const handleFavorite = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            await markFavorite(String(property.id)).unwrap();
            // Optional: Add simple console log or temporary UI feedback if needed
            // console.log('Favorite updated');
        } catch (error) {
            console.error('Failed to update favorite', error);
        }
    };

    return (
        <Link
            to={landingPage ? `/property-view/${property.id}` : `/dashboard/property-view/${property.id}`}
            className="group relative bg-white h-fit rounded-xl border border-[#CCE3FD] overflow-hidden shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-primary/40 block"
        >
            {/* Heart Icon */}
            {!landingPage && (
            <button
                aria-label={isFavorite ? "Remove from favourites" : "Add to favourites"}
                onClick={handleFavorite}
                disabled={isToggling}
                className="absolute top-3 right-3 z-10 w-9 h-9 bg-white/70 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm transition-transform duration-150 hover:scale-105 active:scale-95 disabled:opacity-50"
            >
                <svg 
                    className={`w-5 h-5 transition-colors duration-200 ${isFavorite ? 'text-red-500 fill-current' : 'text-gray-400'}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                </svg>
            </button>)}

            <div className="h-48 relative overflow-hidden">
                <img
                    src={property.image}
                    alt={property.name}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                {/* overlay gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />
            </div>

            <div className="p-4">
                <div className="mb-2">
                    <h3 className="font-semibold text-secondary transition-transform duration-300 group-hover:-translate-y-0.5">
                        {property.name}
                    </h3>
                    <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                        {property.price}
                    </span>
                </div>
                <p className="text-gray-500 text-xs mb-3 transition-colors duration-300 group-hover:text-gray-600">
                    {property.description}
                </p>
                <div className="flex gap-2 transition-transform duration-300 group-hover:-translate-y-0.5">
                    <span
                        className={`px-2 py-1 text-xs rounded-sm ${
                            property.category === 'Sell'
                                ? 'bg-red-100 text-red-600 border border-red-200'
                                : property.category === 'Rent'
                                  ? 'bg-blue-100 text-blue-600 border border-blue-200'
                                  : 'bg-green-100 text-green-600 border border-green-200'
                        }`}
                    >
                        {property.category}
                    </span>
                    <span className="px-2 py-1 text-xs rounded-sm bg-gray-100 text-gray-600 border border-gray-200">
                        {property.subCategory}
                    </span>
                </div>
                {showAvailabilityToggle && (
                    <div className="mt-5 flex items-center justify-between border-t border-[#E2E8F0] pt-4">
                        <div className="flex flex-col">
                            <span className="text-[11px] font-medium text-[#94A3B8] uppercase tracking-wide">
                                Availability
                            </span>
                            <span className="text-[12px] font-semibold text-[#0F172A]">{availabilityText}</span>
                        </div>
                        <button
                            type="button"
                            role="switch"
                            aria-checked={available}
                            aria-label={available ? 'Disable availability' : 'Enable availability'}
                            onClick={(event) => {
                                event.preventDefault();
                                event.stopPropagation();
                                onToggleAvailability?.();
                            }}
                            className={`relative inline-flex h-[20px] w-[44px] items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-secondary ${
                                available ? 'bg-[#43CC88]' : 'bg-[#CBD5E1]'
                            }`}
                        >
                            <span
                                className={`absolute left-[2px] top-1/2 h-[16px] w-[16px] -translate-y-1/2 rounded-full bg-white shadow transition-transform duration-200 ease-out ${
                                    available ? 'translate-x-[24px]' : 'translate-x-0'
                                }`}
                            />
                        </button>
                    </div>
                )}
            </div>
        </Link>
    );
}
