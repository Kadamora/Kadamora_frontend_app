import type {
    TimelinePost,
    AnnouncementItem,
    LiveSession,
    TimelineAd,
} from '../types/timeline';

export const mockTimelinePosts: TimelinePost[] = [
    {
        id: 'post-1',
        author: {
            name: 'Charles Bankole',
            avatar: '/assets/images/charles.png',
            role: 'Property Manager',
            date: '20 May, 2025',
        },
        content:
            'Felis sed amet eget aliquam cursus placerat. Risus morbi erat sed curabitur euismod a odio magna condimentum. amet eget aliquam cursus placerat. Risus morbi erat sed curabitur euismod a odio magna condimentum. amet eget aliquam cursus placerat. Risus morbi erat sed curabitur euismod a odio magna condimentum.',
        likesCount: 1240,
        commentsCount: 240,
        sharesCount: 240,
        isLiked: true,
        type: 'general',
    },
    {
        id: 'post-2',
        author: {
            name: 'Benita Helles',
            avatar: '/assets/images/charles.png',
            role: 'Resident',
            date: '15 June, 2025',
        },
        content:
            'Felis sed amet eget aliquam cursus placerat. Risus morbi erat sed curabitur euismod a odio magna condimentum. amet eget aliquam cursus placerat.',
        singleImage:
            'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1471&auto=format&fit=crop',
        likesCount: 1540,
        commentsCount: 240,
        sharesCount: 240,
        isLiked: false,
        type: 'general',
    },
    {
        id: 'post-3',
        author: {
            name: 'Benita Helles',
            avatar: '/assets/images/charles.png',
            role: 'Resident',
            date: '14 June, 2025',
        },
        content:
            'Felis sed amet eget aliquam cursus placerat. Risus morbi erat sed curabitur euismod a odio magna condimentum. amet eget aliquam cursus placerat.',
        images: [
            'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=800&auto=format&fit=crop',
        ],
        likesCount: 1840,
        commentsCount: 240,
        sharesCount: 240,
        isLiked: false,
        type: 'general',
    },
    {
        id: 'post-4',
        author: {
            name: 'Benita Helles',
            avatar: '/assets/images/charles.png',
            role: 'Resident',
            date: '12 June, 2025',
        },
        content:
            'Felis sed amet eget aliquam cursus placerat. Risus morbi erat sed curabitur euismod a odio magna condimentum. amet eget aliquam cursus placerat.',
        likesCount: 980,
        commentsCount: 240,
        sharesCount: 240,
        isLiked: false,
        type: 'general',
    },
];

export const mockAnnouncements: AnnouncementItem[] = [
    {
        id: 'ann-1',
        title: 'Water Maintenance Scheduled',
        content:
            'Please be advised that water will be temporarily shut off on December 22nd from 8:30 AM to 1:00 PM for routine maintenance of the building’s plumbing system.',
        date: 'Today',
    },
    {
        id: 'ann-2',
        title: 'New Visitor Parking Rules',
        content:
            'Effective immediately, visitor parking is limited to 2 hours during weekdays. Please inform your guests to register at the front desk upon arrival.',
        date: 'Today',
    },
];

export const mockLiveSession: LiveSession = {
    id: 'live-1',
    hostName: 'Ayomide Bamidele is Hosting',
    title: 'Harmony Estate monthly facilities review for June, 2025',
    avatars: [
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=120&auto=format&fit=crop',
    ],
    othersCount: 142,
    linkText: 'Join Now',
};

export const mockTimelineAds: TimelineAd[] = [
    {
        id: 'ad-1',
        title: 'Sunflower Oil',
        price: '₦5,732.00',
        description:
            'Felis sed amet eget aliquam cursus placerat. Risus morbi erat sed curabitur euismod a odio magna condimentum.',
        imageUrl:
            'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=800&auto=format&fit=crop',
        badge: 'Ads',
    },
    {
        id: 'ad-2',
        title: '5 Bedroom Terrace',
        price: '₦90,000,000.00',
        description:
            'Felis sed amet eget aliquam cursus placerat. Risus morbi erat sed curabitur euismod a odio magna condimentum.',
        imageUrl:
            'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800&auto=format&fit=crop',
        tag: 'Sell',
        badge: 'Ads',
    },
];
