export type ListingTabKey = 'about' | 'schedule' | 'gallery' | 'livestream' | 'review';

export interface ListingReviewItem {
    id: string;
    authorName: string;
    authorEmail: string;
    authorAvatar?: string;
    rating: number; // e.g. 4.7
    comment: string;
    date: string; // e.g. "03 June, 2025"
}

export interface ListingGalleryPhoto {
    id: string;
    url: string;
    caption?: string;
    isHero?: boolean;
}

export interface ListingPricingCardData {
    id?: string;
    title: string; // e.g. "General Admission", "VIP Seating"
    price: string; // e.g. "Free Entry", "₦35,000", "₦80,000"
    perks: string[]; // e.g. ["Entry to main venue", "Standing area access"]
    isDefault?: boolean;
    ctaLabel?: string;
    ctaAction?: () => void;
}

export interface ListingMetadataBadge {
    icon: 'location' | 'calendar' | 'time' | 'attendance' | 'custom';
    label: string;
    customIcon?: React.ReactNode;
}

export interface CountdownTimerData {
    days: number;
    hours: number;
    minutes: number;
}

export interface ScheduleItemData {
    id: string;
    time: string; // e.g. "8:00 AM"
    title: string; // e.g. "Opening Ceremony"
    description: string; // e.g. "Traditional prayers and welcome address"
}

export interface LiveStreamData {
    startDateText: string; // e.g. "June 20-21, 2025"
    youtubeUrl?: string;
    reminderAction?: () => void;
}

export interface ListingDetailData {
    id: string;
    title: string; // e.g. "Ojude Oba Festival"
    heroTitle?: string; // e.g. "Ojude Oba 2025"
    categoryId: string; // e.g. "events-festivals"
    categoryTitle: string; // e.g. "Events & Festivals"
    description: string;
    coverImage: string;
    metadata: ListingMetadataBadge[];
    
    // Optional countdown timer on hero banner
    countdown?: CountdownTimerData;
    viewPostUrl?: string;

    // About section content
    aboutTitle?: string; // e.g. "About This Events"
    aboutParagraphs: string[];
    locationMap?: {
        address: string;
        mapImageUrl?: string;
    };

    // Schedule section content
    scheduleTitle?: string; // e.g. "Event Schedule"
    scheduleItems?: ScheduleItemData[];

    // Gallery section content
    galleryTitle?: string; // e.g. "Event Gallery"
    galleryPhotos: ListingGalleryPhoto[];

    // Live Stream section content
    liveStreamTitle?: string; // e.g. "Event Live Stream"
    liveStream?: LiveStreamData;

    // Reviews section content
    reviewsTitle?: string; // e.g. "Park Review"
    reviews: ListingReviewItem[];

    // Right sidebar pricing card or ticket packages
    sidebarTitle?: string; // e.g. "Ticket Type"
    pricingCard: ListingPricingCardData | ListingPricingCardData[];
}
