export interface ServiceItem {
    id: number | string;
    title: string;
    category?: string;
    description: string;
    icon: string;
    active: boolean;
    url?: string;
    badge?: string;
    ctaText?: string;
}

export const services: ServiceItem[] = [
    {
        id: 'real-estate',
        title: 'Property Listing, Management & Investment',
        category: 'Real Estate',
        description:
            'Explore verified property listings, manage tenants, handle maintenance and leases, and monitor your real estate portfolio.',
        icon: '/assets/icons/property_listing.svg',
        active: true,
        url: '/dashboard/property-listing',
        badge: 'Available',
        ctaText: 'Open Real Estate',
    },
    {
        id: 'hospitality-tours',
        title: 'Hospitality & Tours',
        category: 'Travel & Stays',
        description:
            'Book luxury short-lets, boutique stays, curated tour packages, and manage guest reservations and travel wallets.',
        icon: '/assets/icons/hospitality.svg',
        active: true,
        url: '/hospitality-tours/dashboard',
        badge: 'Available',
        ctaText: 'Open Hospitality',
    },
    {
        id: 'facility-management',
        title: 'Facility Management',
        category: 'Operations',
        description:
            'Comprehensive facility maintenance, asset tracking, utility monitoring, security, and premises management.',
        icon: '/assets/icons/facility_management.svg',
        active: false,
        badge: 'Coming Soon',
        ctaText: 'Coming Soon',
    },
    {
        id: 'services-marketplace',
        title: 'Professional Services Marketplace',
        category: 'Services',
        description:
            'Connect with verified industry professionals including certified architects, legal consultants, and building surveyors.',
        icon: '/assets/icons/professional_service.svg',
        active: false,
        badge: 'Coming Soon',
        ctaText: 'Coming Soon',
    },
    {
        id: 'construction-supplies',
        title: 'Construction Supplies & Equipment Hubs',
        category: 'Procurement',
        description:
            'Direct procurement of certified building materials, heavy construction machinery, and industrial contractor equipment.',
        icon: '/assets/icons/construction_supplies.svg',
        active: false,
        badge: 'Coming Soon',
        ctaText: 'Coming Soon',
    },
    {
        id: 'project-constructions',
        title: 'Project Constructions Management',
        category: 'Development',
        description:
            'End-to-end development oversight, architectural milestones, contractor task management, and progress reporting.',
        icon: '/assets/icons/project_constructions.svg',
        active: false,
        badge: 'Coming Soon',
        ctaText: 'Coming Soon',
    },
];
