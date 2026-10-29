export interface FMMetric {
    id: string;
    value: string;
    label: string;
}

export interface FMServiceFeature {
    id: string;
    title: string;
    description: string;
    icon: string;
}

export interface FMHomeService {
    id: string;
    title: string;
    description: string;
    image: string;
    features: string[];
    ctaText: string;
    ctaLink: string;
}

export const FM_METRICS: FMMetric[] = [
    {
        id: 'properties-managed',
        value: '1000+',
        label: 'Properties Managed',
    },
    {
        id: 'service-requests',
        value: '100+',
        label: 'Service Requests',
    },
    {
        id: 'uptime-guarantee',
        value: '99.9%',
        label: 'Uptime Guarantee',
    },
    {
        id: 'customer-rating',
        value: '4.8/5',
        label: 'Customer Rating',
    },
];

export const FM_COMPREHENSIVE_SERVICES: FMServiceFeature[] = [
    {
        id: 'property-management',
        title: 'Property Management',
        description: 'Enhanced Subscription-Based Property Management With Customizable Service Packages',
        icon: '/assets/icons/FMPropertyMgt.svg',
    },
    {
        id: 'commercial-facility-management',
        title: 'Commercial Facility Management',
        description: 'Comprehensive Workspace Leasing And Corporate Maintenance Services',
        icon: '/assets/icons/FMCMgt.svg',
    },
    {
        id: 'helpdesk-support',
        title: '24/7 Helpdesk Support',
        description: 'Round-The-Clock Assistance With AI Chatbots And Live Agents',
        icon: '/assets/icons/FMSupport.svg',
    },
    {
        id: 'energy-management',
        title: 'Energy Management',
        description: 'Smart Energy Solutions For Better Efficiency And Sustainability',
        icon: '/assets/icons/FMEnergyMgt.svg',
    },
    {
        id: 'parking-management',
        title: 'Parking Management',
        description: 'Automated Parking System With Booking And Reservation Capabilities',
        icon: '/assets/icons/FMParking.svg',
    },
    {
        id: 'enhanced-security',
        title: 'Enhanced Security',
        description: 'Advanced Surveillance And Security Solutions For Your Property',
        icon: '/assets/icons/FMSecurity.svg',
    },
    {
        id: 'virtual-meeting-rooms',
        title: 'Virtual Meeting Rooms',
        description: 'Digital Spaces For Residents, Facility Managers, And Vendors To Connect',
        icon: '/assets/icons/FMVirtual.svg',
    },
    {
        id: 'internal-messaging',
        title: 'Internal Messaging',
        description: 'In-App Communication System For connected Users And Management',
        icon: '/assets/icons/FMMessaging.svg',
    },
];

export const FM_HOME_SERVICES: FMHomeService[] = [
    {
        id: 'laundry-cleaning',
        title: 'Laundry & Cleaning',
        description: 'Professional laundry and deep cleaning services at your doorstep',
        image: '/assets/images/laundry_cleaning.jpg',
        features: [
            'Scheduled services',
            'Doorstep pickup & delivery',
            'Quality guarantee',
        ],
        ctaText: 'Get Started Now',
        ctaLink: '/auth/signup',
    },
    {
        id: 'food-grocery',
        title: 'Food Supply & Grocery',
        description: 'Fresh groceries and meals from trusted local vendors',
        image: '/assets/images/food_grocery.jpg',
        features: [
            'Local partnerships',
            'Doorstep pickup & delivery',
            '100% Availability',
        ],
        ctaText: 'Get Started Now',
        ctaLink: '/auth/signup',
    },
    {
        id: 'household-essentials',
        title: 'Household Essentials',
        description: 'Daily necessities and emergency supplies delivered fast',
        image: '/assets/images/household_essentials.jpg',
        features: [
            'Flexible ordering',
            'Emergency fulfillment',
            'Wide product range',
        ],
        ctaText: 'Get Started Now',
        ctaLink: '/auth/signup',
    },
];
