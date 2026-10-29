import type { PricingTier } from '@shared/components/Subscription/pricing';

export const fmPricingTiers: PricingTier[] = [
    {
        id: 'tier-basics',
        name: 'Basics',
        tierLabel: 'Tier 1',
        targetUsers: 'Individual /tenants/ Homeowner(1- 5 UNITS)',
        features: [
            'Access to facility request, complaint logging, and service updates',
        ],
        prices: {
            monthly: 3000,
            quarterly: 7000,
            annually: 25000,
        },
    },
    {
        id: 'tier-estate-plan',
        name: 'Estate Plan',
        tierLabel: 'Tier 2',
        targetUsers:
            'Residential Estates (up to 50 households); Association and commercial property',
        features: [
            'Admin dashboard, broadcast messages, vendor access, and facility schedules',
        ],
        prices: {
            monthly: 10000,
            quarterly: 35000,
            annually: 130000,
        },
    },
    {
        id: 'tier-estate-plus',
        name: 'Estate Plus',
        tierLabel: 'Tier 3',
        targetUsers:
            'Larger Estates (50-200 households); Corporate/Association and Large commercial property',
        features: [
            'All features in Estate Plan + billing system + multi-admin + other services',
        ],
        prices: {
            monthly: 50000,
            quarterly: 140000,
            annually: 520000,
        },
    },
];
