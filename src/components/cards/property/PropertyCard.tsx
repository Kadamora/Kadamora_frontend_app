import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router';
import { MoreHorizontal, Edit2, Trash2 } from 'lucide-react';
import type { AgentPropertyListing, AgentPropertyMedia } from '@store/api/propertyListings.api';

export interface PropertyCardProps {
    property: AgentPropertyListing;
    landingPage?: boolean;
    showAvailabilityToggle?: boolean;
    isTogglingAvailability?: boolean;
    availabilityLabel?: string;
    onToggleAvailability?: () => void;
    onEdit?: (property: AgentPropertyListing) => void;
    onDelete?: (property: AgentPropertyListing) => void;
}

export default function PropertyCard({
    property,
    landingPage,
    showAvailabilityToggle = false,
    isTogglingAvailability = false,
    // availabilityLabel,
    onToggleAvailability,
    onEdit,
    onDelete,
}: PropertyCardProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    const available = property.isAvailable ?? true;
    // const availabilityText = availabilityLabel ?? (available ? 'Visible to clients' : 'Hidden from clients');
    const coverMedia = selectPrimaryMedia(property.media);
    const coverImage = coverMedia?.url ?? '';
    const priceLabel = formatCurrency(property.price);
    const typeLabel = humanize(property.propertyType ?? '');
    const categoryLabel = humanize(property.propertyCategory ?? property.categoryType ?? 'Uncategorized');
    const subCategoryLabel = humanize(property.propertySubType ?? property.categoryType ?? '');
    const description = deriveDescription(property);

    return (
        <Link
            to={landingPage ? `/property-view/${property.id}` : `/dashboard/property-view/${property.id}`}
            className="group relative bg-white rounded-xl border border-[#CCE3FD] overflow-hidden shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-primary/40 block"
        >
            {/* Action Menu (Ellipsis) */}
            {!landingPage && (
                <div className="absolute top-3 right-3 z-20" ref={menuRef}>
                    <button
                        aria-label="Actions"
                        onClick={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                            setIsMenuOpen(!isMenuOpen);
                        }}
                        className="w-9 h-9 bg-white/70 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm transition-all duration-150 hover:bg-white hover:scale-105 active:scale-95"
                    >
                        <MoreHorizontal size={20} className="text-[#002E62]" />
                    </button>

                    {isMenuOpen && (
                        <div className="absolute right-0 mt-1 w-28 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-30 animate-in fade-in zoom-in duration-200">
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setIsMenuOpen(false);
                                    onEdit?.(property);
                                }}
                                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 text-left transition-colors"
                            >
                                <Edit2 size={14} />
                                <span>Edit</span>
                            </button>
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setIsMenuOpen(false);
                                    onDelete?.(property);
                                }}
                                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 text-left transition-colors font-medium"
                            >
                                <Trash2 size={14} />
                                <span>Delete</span>
                            </button>
                        </div>
                    )}
                </div>
            )}

            {landingPage && (
                <button
                    aria-label="Add to favourites"
                    onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                    }}
                    className="absolute top-3 right-3 z-10 w-9 h-9 bg-white/70 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm transition-transform duration-150 hover:scale-105 active:scale-95"
                >
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                    </svg>
                </button>
            )}

            <div className="h-48 relative overflow-hidden bg-slate-100">
                {coverImage ? (
                    <img
                        src={coverImage}
                        alt={coverMedia?.altText ?? property.title}
                        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center px-4 text-center text-xs font-medium text-slate-500">
                        Media preview unavailable
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />
            </div>

            <div className="p-4">
                <div className="mb-2">
                    <h3 className="font-semibold text-secondary transition-transform duration-300 group-hover:-translate-y-0.5">
                        {property.title}
                    </h3>
                    <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                        {priceLabel}
                    </span>
                </div>
                <p className="text-gray-500 text-xs mb-3 transition-colors duration-300 group-hover:text-gray-600 line-clamp-2">
                    {description}
                </p>
                <div className="flex flex-wrap gap-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-sm ${getTypePillClass()}`}>{typeLabel}</span>
                    {categoryLabel && (
                        <span className={`px-2 py-1 text-xs font-medium rounded-sm ${getTypePillClass()}`}>{categoryLabel}</span>
                    )}
                    {subCategoryLabel && subCategoryLabel !== categoryLabel && (
                        <span className={`px-2 py-1 text-xs font-medium rounded-sm ${getTypePillClass()}`}>
                            {subCategoryLabel}
                        </span>
                    )}
                </div>
                {showAvailabilityToggle && (
                    <div className="mt-5 flex items-center justify-between border-t border-[#E2E8F0] pt-4">
                        <div className="flex flex-col">
                            <span className="text-[14px] font-medium text-gray-800">
                                Availability
                            </span>
                            {/* <span className="text-[12px] font-semibold text-[#0F172A]">{availabilityText}</span> */}
                        </div>
                        <button
                            type="button"
                            role="switch"
                            disabled={isTogglingAvailability}
                            aria-checked={available}
                            aria-label={available ? 'Disable availability' : 'Enable availability'}
                            onClick={(event) => {
                                event.preventDefault();
                                event.stopPropagation();
                                onToggleAvailability?.();
                            }}
                            className={`relative inline-flex h-[20px] w-[44px] items-center rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-secondary ${
                                available ? 'bg-[#43CC88]' : 'bg-[#CBD5E1]'
                            } ${isTogglingAvailability ? 'opacity-60 cursor-not-allowed' : ''}`}
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

function selectPrimaryMedia(media?: AgentPropertyMedia[]): AgentPropertyMedia | undefined {
    if (!Array.isArray(media) || media.length === 0) {
        return undefined;
    }

    const sortedMedia = [...media].sort((a, b) => {
        const orderA = typeof a.sortOrder === 'number' ? a.sortOrder : Number.MAX_SAFE_INTEGER;
        const orderB = typeof b.sortOrder === 'number' ? b.sortOrder : Number.MAX_SAFE_INTEGER;
        return orderA - orderB;
    });

    return sortedMedia.find((item) => item.mediaType === 'image') ?? sortedMedia[0];
}

function formatCurrency(value?: string | number | null): string {
    if (value === null || value === undefined || value === '') {
        return 'Price on request';
    }

    const numericValue = typeof value === 'string' ? Number(value) : value;

    if (Number.isNaN(numericValue)) {
        return 'Price on request';
    }

    return `₦ ${numericValue.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })}`;
}

function humanize(value?: string | null): string {
    if (!value) {
        return '';
    }

    return value
        .split('_')
        .join(' ')
        .split(' ')
        .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
        .join(' ')
        .trim();
}

function deriveDescription(property: AgentPropertyListing): string {
    const preferredDescription = property.description?.trim();
    if (preferredDescription) {
        return preferredDescription;
    }

    if (property.location) {
        return property.location;
    }

    if (Array.isArray(property.amenities) && property.amenities.length > 0) {
        return `Amenities: ${property.amenities.slice(0, 3).map(humanize).join(', ')}`;
    }

    return 'No description provided';
}

const TYPE_PILL_CLASSES = [
    'bg-blue-100 text-[#002E62] border border-blue-200',
    'bg-green-100 text-[#002E62] border border-green-200',
    'bg-amber-100 text-[#002E62] border border-amber-200',
    'bg-purple-100 text-[#002E62] border border-purple-200',
    'bg-teal-100 text-[#002E62] border border-teal-200',
    'bg-indigo-100 text-[#002E62] border border-indigo-200',
    'bg-slate-100 text-[#002E62] border border-slate-200',
    'bg-cyan-100 text-[#002E62] border border-cyan-200',
];

function getTypePillClass(): string {
    if (TYPE_PILL_CLASSES.length === 0) {
        return 'bg-gray-100 text-gray-900 border border-gray-200';
    }

    const randomIndex = Math.floor(Math.random() * TYPE_PILL_CLASSES.length);
    return TYPE_PILL_CLASSES[randomIndex];
}
