export interface ListingItem {
    id: string;
    title: string;
    location: string;
    description: string;
    date: string;
    rating: number;
    reviewCount: number;
    price: string;
    image: string;
}

export interface ListingCategoryDetail {
    id: string;
    title: string;
    description: string;
    subtitle: string;
    accent: 'purple' | 'blue' | 'sky' | 'pink' | 'green';
    iconSrc: string;
    examples: string[];
    features: string[];
    buttonLabel: string;
    items?: ListingItem[];
}

export const CATEGORY_DETAILS: Record<string, ListingCategoryDetail> = {
    'cities-destinations': {
        id: 'cities-destinations',
        title: 'Cities & Destinations',
        description: 'List cities, towns, and tourist destinations across Nigeria',
        subtitle: 'Choose the type of listing you want to create on Kadamora and start reacing thousands of travelers',
        accent: 'purple',
        iconSrc: '/assets/icons/listing1.svg',
        examples: ['Olumo Rock', 'Idanre Hills', 'Ikogosi Water', 'Obudu Mountain Resort'],
        features: [
            'Showcase city attractions',
            'Highlight local culture',
            'Feature tourist spots',
            'Share city guides',
        ],
        buttonLabel: 'List Cities & Destination',
        items: [],
    },
    'events-festivals': {
        id: 'events-festivals',
        title: 'Events & Festivals',
        description: 'List cultural festivals, concerts, and special events',
        subtitle: 'Choose the type of listing you want to create on Kadamora and start reacing thousands of travelers',
        accent: 'blue',
        iconSrc: '/assets/icons/listing2.svg',
        examples: ['Ojude Oba', 'Calabar Carnival', 'Detty December', 'Durbar Festival'],
        features: [
            'Event scheduling',
            'Ticket sales',
            'Live streaming',
            'Attendee management',
        ],
        buttonLabel: 'List Events & Festivals',
        items: [
            {
                id: 'ojude-oba-festival',
                title: 'Ojude Oba Festival',
                location: 'Ijebu-Ode, Ogun State',
                description:
                    'Lorem ipsum dolor sit amet consectetur. amet quis fermentum praesent eget velit eu ipsum dui.',
                date: 'June 20-21, 2025',
                rating: 4.9,
                reviewCount: 324,
                price: 'Free Entry',
                image: '/assets/images/listing_data_1.png',
            },
            {
                id: 'evt-2',
                title: 'Eyo Fastival',
                location: 'Idumota, Lagos State',
                description:
                    'Lorem ipsum dolor sit amet consectetur. amet quis fermentum praesent eget velit eu ipsum dui.',
                date: 'June 20-21, 2025',
                rating: 4.9,
                reviewCount: 324,
                price: 'Free Entry',
                image: '/assets/images/listing_data_2.png',
            },
            {
                id: 'evt-3',
                title: 'Molete Canival',
                location: 'Ibadan State',
                description:
                    'Lorem ipsum dolor sit amet consectetur. orci magna consectetur pharetra in sit in sed.',
                date: 'June 20-21, 2025',
                rating: 4.3,
                reviewCount: 324,
                price: 'Free Entry',
                image: '/assets/images/listing_data_3.png',
            },
        ],
    },
    'parks-nature': {
        id: 'parks-nature',
        title: 'Parks & Nature',
        description: 'List national parks, nature reserves, and outdoor attractions',
        subtitle: 'List national parks, nature reserves, and outdoor attractions',
        accent: 'sky',
        iconSrc: '/assets/icons/listing3.svg',
        examples: ['Lekki Conservative', 'Obudu Mountain', 'Yankari Game Reserve'],
        features: [
            'Wildlife information',
            'Hiking trails',
            'Conservation efforts',
            'Visitor facilities',
        ],
        buttonLabel: 'List Parks & Nature',
        items: [],
    },
    'hotel-resorts': {
        id: 'hotel-resorts',
        title: 'Hotel & Resorts',
        description: 'List hotels, resorts, lodges, and accommodation facilities',
        subtitle: 'Choose the type of listing you want to create on Kadamora and start reacing thousands of travelers',
        accent: 'pink',
        iconSrc: '/assets/icons/listing4.svg',
        examples: ['Luxury Hotels', 'Beach Resorts', ' Safari Lodges', 'Boutique Hotels', ''],
        features: [
            'Room listings',
            'Amenities showcase',
            'Real-time booking',
            'Photo galleries',
        ],
        buttonLabel: 'List Hotel & Resorts',
        items: [],
    },
    'arts-culture': {
        id: 'arts-culture',
        title: 'Arts & Culture',
        description: 'List museums, galleries, cultural centers, and art spaces',
        subtitle: 'Choose the type of listing you want to create on Kadamora and start reacing thousands of travelers',
        accent: 'green',
        iconSrc: '/assets/icons/listing5.svg',
        examples: ['Freedom Park', 'National Museum', 'Terra Kulture', 'Nike Art Gallery'],
        features: [
            'Exhibition listings',
            'Collection showcase',
            'Event calendar',
            'Virtual tours',
        ],
        buttonLabel: 'List Arts & Culture',
        items: [],
    },
};

export const DEFAULT_MOCK_ITEMS = [
    {
        id: 'ojude-oba-festival',
        title: 'Ojude Oba Festival',
        location: 'Ijebu-Ode, Ogun State',
        description:
            'Lorem ipsum dolor sit amet consectetur. amet quis fermentum praesent eget velit eu ipsum dui.',
        date: 'June 20-21, 2025',
        rating: 4.9,
        reviewCount: 324,
        price: 'Free Entry',
        image: '/assets/images/listing_data_1.png',
    },
    {
        id: 'evt-2',
        title: 'Eyo Fastival',
        location: 'Idumota, Lagos State',
        description:
            'Lorem ipsum dolor sit amet consectetur. amet quis fermentum praesent eget velit eu ipsum dui.',
        date: 'June 20-21, 2025',
        rating: 4.9,
        reviewCount: 324,
        price: 'Free Entry',
        image: '/assets/images/listing_data_2.png',
    },
    {
        id: 'evt-3',
        title: 'Molete Canival',
        location: 'Ibadan State',
        description:
            'Lorem ipsum dolor sit amet consectetur. orci magna consectetur pharetra in sit in sed.',
        date: 'June 20-21, 2025',
        rating: 4.3,
        reviewCount: 324,
        price: 'Free Entry',
        image: '/assets/images/listing_data_3.png',
    },
];