import type { ListingDetailData } from '../types/listingDetailsTypes';

export const IDANRE_HILL_MOCK: ListingDetailData = {
    id: 'idanre-hill',
    title: 'Idanre Hill',
    heroTitle: 'Idanre Hills',
    categoryId: 'cities-destinations',
    categoryTitle: 'Cities & Destination',
    description:
        'Lorem ipsum dolor sit amet consectetur. at sed viverra dui proin viverra purus nunc sed. neque diam ut mi sed nulla est bibendum mauris. phasellus porttitor congue sit in venenatis. sit amet consectetur.',
    coverImage: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=80',
    metadata: [
        { icon: 'location', label: 'Idanre, Ondo State' },
        { icon: 'calendar', label: 'June 20-25, 2025' },
        { icon: 'time', label: '10:00 AM' },
        { icon: 'attendance', label: '100 Expected' },
    ],
    aboutTitle: 'About This Destination',
    aboutParagraphs: [
        'Lorem ipsum dolor sit amet consectetur. at sed viverra dui proin viverra purus nunc sed. neque diam ut mi sed nulla est bibendum mauris. phasellus porttitor congue sit in venenatis. sit amet consectetur.',
        'Lorem ipsum dolor sit amet consectetur. at sed viverra dui proin viverra purus nunc sed. neque diam ut mi sed nulla est bibendum mauris. phasellus porttitor congue sit in venenatis. sit amet consectetur.',
        'Lorem ipsum dolor sit amet consectetur. at sed viverra dui proin viverra purus nunc sed. neque diam ut mi sed nulla est bibendum mauris. phasellus porttitor congue sit in venenatis. sit amet consectetur.',
        'Lorem ipsum dolor sit amet consectetur. at sed viverra dui proin viverra purus nunc sed. neque diam ut mi sed nulla est bibendum mauris. phasellus porttitor congue sit in venenatis. sit amet consectetur.',
    ],
    locationMap: {
        address: 'Idanre Town, Ondo State, Nigeria',
        mapImageUrl: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80',
    },
    galleryTitle: 'Park Gallery',
    galleryPhotos: [
        {
            id: 'g1',
            url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
            isHero: true,
            caption: 'Idanre Hills Scenic View',
        },
        {
            id: 'g2',
            url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
            caption: 'Mountain Trail',
        },
        {
            id: 'g3',
            url: 'https://images.unsplash.com/photo-1434394354979-a235cd36269d?auto=format&fit=crop&w=800&q=80',
            caption: 'High Peak Horizon',
        },
    ],
    reviewsTitle: 'Park Review',
    reviews: [
        {
            id: 'r1',
            authorName: 'Charles James Akinwale',
            authorEmail: 'charlesjames@gmail.com',
            rating: 4.7,
            date: '03 June, 2025',
            comment:
                'Lorem ipsum dolor sit amet consectetur. Nibh odio egestas tortor lorem laoreet eu volutpat. Adipiscing odio erat ac ridiculus imperdiet. Ut morbi tortor non fringilla nec urna. Purus eu erat nunc nisl. Massa commodo in sed mattis.Lorem ipsum dolor sit amet consectetur.',
        },
        {
            id: 'r2',
            authorName: 'Daisy Jane Thompson',
            authorEmail: 'daisy.thompson@example.com',
            rating: 4.9,
            date: '12 July, 2025',
            comment:
                'Praesent ultricies libero a nunc euismod, vitae ultrices libero bibendum. Curabitur a nisi sit amet orci posuere pharetra. Suspendisse potenti. Morbi ut vestibulum velit. Nunc id enim a lectus finibus gravida.',
        },
        {
            id: 'r3',
            authorName: 'Ethan Kyle Lewis',
            authorEmail: 'ethan.lewis@mail.com',
            rating: 4.5,
            date: '21 April, 2025',
            comment:
                'Maecenas in ex euismod, egestas justo a, accumsan felis. Fusce in ante ut purus rutrum suscipit. Sed accumsan mi vel erat malesuada, ut feugiat sapien gravida. Sed vitae nisl ac nulla fermentum luctus.',
        },
        {
            id: 'r4',
            authorName: 'Fiona Lily Carter',
            authorEmail: 'fiona.carter@domain.com',
            rating: 4.8,
            date: '30 August, 2025',
            comment:
                'Etiam nec magna a felis rhoncus accumsan non sed lectus. Cras vitae justo nec elit gravida facilisis in id dolor. Sed scelerisque justo nec nisl fermentum, at tincidunt purus dignissim. Vivamus euismod purus ac dui tempor.',
        },
    ],
    pricingCard: {
        title: 'General Admission',
        price: '₦80,000',
        perks: ['Entry to main venue', 'Standing area access', 'Event program guide'],
    },
};

export const OJUDE_OBA_MOCK: ListingDetailData = {
    id: 'ojude-oba-festival',
    title: 'Ojude Oba Festival',
    heroTitle: 'Ojude Oba 2025',
    categoryId: 'events-festivals',
    categoryTitle: 'Events & Festivals',
    description:
        'Lorem ipsum dolor sit amet consectetur. at sed viverra dui proin viverra purus nunc sed. neque diam ut mi sed nulla est bibendum mauris. phasellus porttitor congue sit in venenatis. sit amet consectetur.',
    coverImage: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1600&q=80',
    countdown: {
        days: 65,
        hours: 14,
        minutes: 7,
    },
    viewPostUrl: '/hospitality-tours/dashboard/timeline/ojude-oba-2025-horses-display',
    metadata: [
        { icon: 'location', label: 'Ijebu-Ode, Ogun State' },
        { icon: 'calendar', label: 'June 20-21, 2025' },
        { icon: 'time', label: '8:00 AM - 6:00 PM' },
    ],
    aboutTitle: 'About This Events',
    aboutParagraphs: [
        'Lorem ipsum dolor sit amet consectetur. at sed viverra dui proin viverra purus nunc sed. neque diam ut mi sed nulla est bibendum mauris. phasellus porttitor congue sit in venenatis. sit amet consectetur.',
        'Lorem ipsum dolor sit amet consectetur. at sed viverra dui proin viverra purus nunc sed. neque diam ut mi sed nulla est bibendum mauris. phasellus porttitor congue sit in venenatis. sit amet consectetur.',
        'Lorem ipsum dolor sit amet consectetur. at sed viverra dui proin viverra purus nunc sed. neque diam ut mi sed nulla est bibendum mauris. phasellus porttitor congue sit in venenatis. sit amet consectetur.',
        'Lorem ipsum dolor sit amet consectetur. at sed viverra dui proin viverra purus nunc sed. neque diam ut mi sed nulla est bibendum mauris. phasellus porttitor congue sit in venenatis. sit amet consectetur.',
    ],
    locationMap: {
        address: 'Ijebu Ode Local Government Secretariat, Ijebu-Ode, Ogun State',
        mapImageUrl: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80',
    },
    scheduleTitle: 'Event Schedule',
    scheduleItems: [
        {
            id: 's1',
            time: '8:00 AM',
            title: 'Opening Ceremony',
            description: 'Traditional prayers and welcome address',
        },
        {
            id: 's2',
            time: '8:00 AM',
            title: 'Giration Anthem',
            description: 'Traditional prayers and welcome address',
        },
        {
            id: 's3',
            time: '10:00 AM',
            title: 'Grand Parade',
            description: 'Age-grade groups parade in traditional attire',
        },
        {
            id: 's4',
            time: '12:00 PM',
            title: 'Horsemanship Display',
            description: 'Spectacular equestrian performances',
        },
        {
            id: 's5',
            time: '2:00 PM',
            title: 'Cultural Performances',
            description: 'Traditional music, dance, and drama',
        },
        {
            id: 's6',
            time: '3:00 PM',
            title: 'Refreshment Section',
            description: 'Traditional prayers and welcome address',
        },
        {
            id: 's7',
            time: '4:00 PM',
            title: 'Royal Homage',
            description: 'Paying homage to the Awujale',
        },
        {
            id: 's8',
            time: '6:00 PM',
            title: 'Closing Ceremony',
            description: 'Final blessings and closing remarks',
        },
    ],
    galleryTitle: 'Event Gallery',
    galleryPhotos: [
        {
            id: 'og1',
            url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',
            isHero: true,
            caption: 'Ojude Oba Main Parade',
        },
        {
            id: 'og2',
            url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
            caption: 'Traditional Riders',
        },
        {
            id: 'og3',
            url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
            caption: 'Regberegbe Groups',
        },
        {
            id: 'og4',
            url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80',
            caption: 'Cultural Procession',
        },
        {
            id: 'og5',
            url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80',
            caption: 'Royal Homage Display',
        },
    ],
    liveStreamTitle: 'Event Live Stream',
    liveStream: {
        startDateText: 'June 20-21, 2025',
        youtubeUrl: 'https://youtube.com',
    },
    reviewsTitle: 'Park Review',
    reviews: IDANRE_HILL_MOCK.reviews,
    sidebarTitle: 'Ticket Type',
    pricingCard: [
        {
            id: 't1',
            title: 'General Admission',
            price: 'Free Entry',
            isDefault: true,
            perks: ['Entry to main venue', 'Standing area access', 'Event program guide'],
        },
        {
            id: 't2',
            title: 'VIP Seating',
            price: '₦35,000',
            perks: ['Reserved seating', 'Closer view of performances', 'Complimentary refreshments', 'VIP badge'],
        },
        {
            id: 't3',
            title: 'Premium Package',
            price: '₦75,000',
            perks: ['Front row seating', 'Meet & greet access', 'Premium gift bag', 'Photo opportunities', 'Exclusive lounge access'],
        },
    ],
};

/**
 * Utility helper to retrieve listing detail data by ID or category fallback
 */
export function getListingDetailData(listingId?: string, categoryId?: string): ListingDetailData {
    if (listingId === 'ojude-oba-festival' || categoryId === 'events-festivals') {
        return OJUDE_OBA_MOCK;
    }
    if (listingId === 'idanre-hill' || !listingId) {
        return IDANRE_HILL_MOCK;
    }

    // Dynamic fallback for any listing ID/category
    const catName = categoryId
        ? categoryId.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
        : 'Listing';

    return {
        ...IDANRE_HILL_MOCK,
        id: listingId,
        title: listingId.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
        heroTitle: listingId.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
        categoryTitle: catName,
        aboutTitle: `About This ${catName}`,
        galleryTitle: `${catName} Gallery`,
        reviewsTitle: `${catName} Review`,
    };
}
