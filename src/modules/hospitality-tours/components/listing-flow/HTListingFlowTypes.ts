// ─── Hospitality Tours Listing Flow — Shared Types ────────────────────────────
// Extracted here so that HTListingFlowContext.tsx only exports React components
// and hooks, satisfying Vite's Fast Refresh constraint.

export type HTCategoryId =
    | 'cities-destinations'
    | 'events-festivals'
    | 'parks-nature'
    | 'hotel-resorts'
    | 'arts-culture';

export interface SocialMedia {
    facebook: string;
    instagram: string;
    twitter: string;
}

export interface ScheduleItem {
    id: string;
    time: string;
    activity: string;
    day: string;
}

export interface RoomType {
    id: string;
    name: string;
    price: string;
    capacity: string;
    amenities: string[];
}

export interface TicketType {
    id: string;
    name: string;
    price: string;
    description: string;
}

export interface GalleryItem {
    id: string;
    file: File;
    previewUrl: string;
}

export interface HTListingFormState {
    // Basic Info (all categories)
    name: string;
    category: string;
    description: string;
    tags: string[];
    postOnTimeline: boolean;

    // Cities & Destinations / Arts & Culture specific
    fromDate: string;
    toDate: string;
    price: string;
    expectedNumber: string;

    // Location & Contact (all categories)
    state: string;
    city: string;
    address: string;
    pinLocation: string;
    phone: string;
    email: string;
    socialMedia: SocialMedia;

    // Events & Festivals — Location & Dates
    eventFromDate: string;
    eventToDate: string;
    eventVenue: string;

    // Events & Festivals — Schedule
    scheduleItems: ScheduleItem[];

    // Features & Amenities (Cities, Parks, Arts)
    amenities: string[];

    // Hotel & Resorts — Room & Pricing
    roomTypes: RoomType[];
    hotelAmenities: string[];

    // Hotel & Resorts — Operating Hours & Policies
    checkInTime: string;
    checkOutTime: string;
    cancellationPolicy: string;
    petsAllowed: boolean;
    smokingAllowed: boolean;
    extraPolicies: string;

    // Ticketing (Parks & Nature, Events & Festivals)
    ticketTypes: TicketType[];
    ticketingPlatform: string;
    bookingLink: string;

    // Media & Gallery
    coverPhoto: File | null;
    photoGallery: File[];
    promotionalVideo: File | null;
    coverPhotoPreview: string | null;
    galleryPreviews: GalleryItem[];
    videoPreview: string | null;
}
