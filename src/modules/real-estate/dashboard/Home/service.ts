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
        title: 'Property listing, management and investment',
        category: 'Real Estate',
        description: 'Professionals listing properties on behalf of others or managing sales/rentals.',
        icon: '/assets/icons/property_listing.svg',
        active: true,
        url: '/dashboard/property-listing',
        badge: 'Available',
        ctaText: 'Open Real Estate',
    },
    {
        id: 'facility-management',
        title: 'Facility Management',
        category: 'Operations',
        description: 'Individuals or firms interested in purchasing or investing in properties.',
        icon: '/assets/icons/facility_management.svg',
        active: true,
        url: '/facility-management',
        badge: 'Available',
        ctaText: 'Open Facility Management',
    },
    {
        id: 'project-constructions',
        title: 'Project Constructions Management',
        category: 'Development',
        description: 'Firms involved in construction, project management, or estate development.',
        icon: '/assets/icons/project_constructions.svg',
        active: false,
        badge: 'Coming Soon',
        ctaText: 'Coming Soon',
    },
    {
        id: 'services-marketplace',
        title: 'Professional Services Marketplace',
        category: 'Services',
        description: 'Individuals or businesses actively searching for residential or commercial properties',
        icon: '/assets/icons/professional_service.svg',
        active: false,
        badge: 'Coming Soon',
        ctaText: 'Coming Soon',
    },
    {
        id: 'construction-supplies',
        title: 'Construction Supplies & Equipment Hubs',
        category: 'Procurement',
        description: 'Vendors offering services like facility management, procurement, cleaning, security, repairs, etc.',
        icon: '/assets/icons/construction_supplies.svg',
        active: false,
        badge: 'Coming Soon',
        ctaText: 'Coming Soon',
    },
    {
        id: 'hospitality-tours',
        title: 'Hospitality and Tour',
        category: 'Travel & Stays',
        description: 'Vendors offering services like facility management, procurement, cleaning, security, repairs, etc.',
        icon: '/assets/icons/hospitality.svg',
        active: true,
        url: '/hospitality-tours',
        badge: 'Available',
        ctaText: 'Open Hospitality',
    },
];
