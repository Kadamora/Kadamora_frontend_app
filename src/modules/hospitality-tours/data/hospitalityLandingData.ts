export interface HTDestinationItem {
    id: string;
    title: string;
    location: string;
    description: string;
    date: string;
    rating: number;
    reviewCount: number;
    price: string;
    image: string;
    categoryBadge?: string;
    badgeVariant?: 'green' | 'red' | 'blue' | 'purple' | 'amber';
    isFavorite?: boolean;
}

export interface HTFeaturedEventItem {
    id: string;
    title: string;
    location: string;
    date: string;
    time: string;
    expectedAttendees: string;
    image: string;
    isFavorite?: boolean;
}

export interface HTMetricItem {
    id: string;
    value: string;
    label: string;
}

export interface HTCategoryCardItem {
    id: string;
    title: string;
    description: string;
    icon: string;
    slug: string;
}

export const HT_NAV_LINKS = [
    { label: 'Home', path: '/hospitality-tours' },
    { label: 'Explore', path: '/hospitality-tours/explore' },
    { label: 'Events', path: '/hospitality-tours/events' },
    { label: 'Timeline', path: '/hospitality-tours/timeline' },
    { label: 'Blogs', path: '/hospitality-tours/blogs' },
    { label: 'Contact Us', path: '/contact' },
];

export const HT_HERO_CATEGORIES: HTCategoryCardItem[] = [
    {
        id: 'festival-seasons',
        title: 'Festival & Seasons',
        description: "Celebrate Nigeria's vibrant traditions and colorful festivities.",
        icon: '🎉',
        slug: 'festivals',
    },
    {
        id: 'cities-parks',
        title: 'Cities & Parks',
        description: 'Explore bustling cities and serene parks filled with natural beauty.',
        icon: '🌳',
        slug: 'parks',
    },
    {
        id: 'hotels-resorts',
        title: 'Hotels & Resorts',
        description: 'Relax in top-rated hotels and luxurious resorts across the country.',
        icon: '🏡',
        slug: 'resorts',
    },
    {
        id: 'arts-culture',
        title: 'Arts & Cultures',
        description: "Experience Nigeria's creative spirit through art, music, and heritage.",
        icon: '🎨',
        slug: 'culture',
    },
];

export const HT_FEATURED_DESTINATIONS: HTDestinationItem[] = [
    {
        id: 'dest-ojude-oba',
        title: 'Ojude Oba Festival',
        location: 'Ijebu-Ode, Ogun State',
        description: 'Lorem ipsum dolor sit amet consectetur. amet quis fermentum praesent eget velit eu ipsum dui.',
        date: 'June 20-21, 2025',
        rating: 4.9,
        reviewCount: 324,
        price: 'Free Entry',
        image: '/assets/icons/timeline5.png',
        categoryBadge: 'Special Event',
        badgeVariant: 'green',
        isFavorite: false,
    },
    {
        id: 'dest-detty-december',
        title: 'Detty December',
        location: 'Lagos State',
        description: 'Lorem ipsum dolor sit amet consectetur. amet quis fermentum praesent eget velit eu ipsum dui.',
        date: 'June 20-21, 2025',
        rating: 4.9,
        reviewCount: 324,
        price: '₦ 35,000/Day',
        image: '/assets/images/HTDestination1.png',
        categoryBadge: 'Special Event',
        badgeVariant: 'red',
        isFavorite: true,
    },
    {
        id: 'dest-lagos-experience',
        title: 'Lagos City Experience',
        location: 'Lagos State',
        description: 'Lorem ipsum dolor sit amet consectetur. amet quis fermentum praesent eget velit eu ipsum dui.',
        date: 'June 20-21, 2025',
        rating: 4.9,
        reviewCount: 324,
        price: '₦ 87,200/Night',
        image: '/assets/images/HTDestination2.png',
        categoryBadge: 'Popular',
        badgeVariant: 'blue',
        isFavorite: true,
    },
    {
        id: 'dest-lekki-arts',
        title: 'Lekki Arts & Craft Market',
        location: 'Lagos State',
        description: 'Lorem ipsum dolor sit amet consectetur. amet quis fermentum praesent eget velit eu ipsum dui.',
        date: 'June 20-21, 2025',
        rating: 4.9,
        reviewCount: 324,
        price: '₦ 35,000/Day',
        image: '/assets/images/HTDestination3.png',
        categoryBadge: 'Arts & Culture',
        badgeVariant: 'purple',
        isFavorite: false,
    },
];

export const HT_METRICS: HTMetricItem[] = [
    {
        id: 'm1',
        value: '1000+',
        label: 'Event and Tour Managed',
    },
    {
        id: 'm2',
        value: '100+',
        label: 'Businesses',
    },
    {
        id: 'm3',
        value: '99.9%',
        label: 'Uptime Guarantee',
    },
    {
        id: 'm4',
        value: '4.2/5',
        label: 'Customer Rating',
    },
];

export const HT_FEATURED_EVENTS: HTFeaturedEventItem[] = [
    {
        id: 'fe-durbar-2025',
        title: 'Durbar Festival 2025',
        location: 'Ilorin, Kwara State',
        date: 'June 20-21, 2025',
        time: '8:00 AM - 6:00 PM',
        expectedAttendees: '15,000 expected',
        image: '/assets/images/listing_data_5.png',
        isFavorite: true,
    },
    {
        id: 'fe-eyo-2025',
        title: 'Eyo Festival 2025',
        location: 'Lekki Peninsula, Lagos State',
        date: 'June 20-21, 2025',
        time: '8:00 AM - 6:00 PM',
        expectedAttendees: '15,000 expected',
        image: '/assets/images/listing_data_6.png',
        isFavorite: true,
    },
    {
        id: 'fe-ojude-oba-2025',
        title: 'Ojude Oba Festival 2025',
        location: 'Ijebu-Ode, Ogun State',
        date: 'June 20-21, 2025',
        time: '8:00 AM - 6:00 PM',
        expectedAttendees: '15,000 expected',
        image: '/assets/images/listing_data_1.png',
        isFavorite: true,
    },
    {
        id: 'fe-calabar-carnival-2025',
        title: 'Calabar Carnival 2025',
        location: 'Lekki Peninsula, Lagos State',
        date: 'June 20-21, 2025',
        time: '8:00 AM - 6:00 PM',
        expectedAttendees: '15,000 expected',
        image: '/assets/images/listing_data_7.png',
        isFavorite: true,
    },
];

export const HT_EXPLORE_LISTINGS: HTDestinationItem[] = [
    {
        id: 'exp-ojude-oba-1',
        title: 'Ojude Oba Festival',
        location: 'Ijebu-Ode, Ogun State',
        description: 'Lorem ipsum dolor sit amet consectetur. amet quis fermentum praesent eget velit eu ipsum dui.',
        date: 'June 20-21, 2025',
        rating: 4.9,
        reviewCount: 324,
        price: 'Free Entry',
        image: '/assets/images/listing_data_1.png',
        categoryBadge: 'Festival',
        badgeVariant: 'green',
        isFavorite: false,
    },
    {
        id: 'exp-idanre-hill',
        title: 'Idanre Hill',
        location: 'Ondo State',
        description: 'Lorem ipsum dolor sit amet consectetur. orci magna consectetur pharetra in sit in sed.',
        date: 'June 20-21, 2025',
        rating: 4.3,
        reviewCount: 324,
        price: '₦ 80,000',
        image: '/assets/images/listing_data_3.png',
        categoryBadge: 'Destination',
        badgeVariant: 'purple',
        isFavorite: false,
    },
    {
        id: 'exp-lekki-arts',
        title: 'Lekki Arts & Craft Market',
        location: 'Lagos State',
        description: 'Lorem ipsum dolor sit amet consectetur. orci magna consectetur pharetra in sit in sed.',
        date: 'Always Available',
        rating: 4.3,
        reviewCount: 324,
        price: 'Free Entry',
        image: '/assets/images/listing_data_4.png',
        categoryBadge: 'Arts & Culture',
        badgeVariant: 'red',
        isFavorite: true,
    },
    {
        id: 'exp-obudu-ranch',
        title: 'Obudu Ranch',
        location: 'Igbokoda, Calabar',
        description: 'Lorem ipsum dolor sit amet consectetur. amet quis fermentum praesent eget velit eu ipsum dui.',
        date: 'Always Available',
        rating: 4.9,
        reviewCount: 354,
        price: '₦ 65,000/Day',
        image: '/assets/images/listing_data_2.png',
        categoryBadge: 'Resorts',
        badgeVariant: 'green',
        isFavorite: true,
    },
    {
        id: 'exp-ojaja-park',
        title: 'Ojaja Park, Ondo',
        location: 'Akure, Ondo State',
        description: 'Lorem ipsum dolor sit amet consectetur. orci magna consectetur pharetra in sit in sed.',
        date: 'Always Available',
        rating: 4.3,
        reviewCount: 324,
        price: '₦ 1,000/Person',
        image: '/assets/images/listing_data_8.png',
        categoryBadge: 'Park',
        badgeVariant: 'red',
        isFavorite: true,
    },
    {
        id: 'exp-lagos-island-resort',
        title: 'Lagos Island Resort',
        location: 'Lagos State',
        description: 'Lorem ipsum dolor sit amet consectetur. orci magna consectetur pharetra in sit in sed.',
        date: 'June 20-21, 2025',
        rating: 4.3,
        reviewCount: 334,
        price: '₦ 35,000/Day',
        image: '/assets/images/listing_data_6.png',
        categoryBadge: 'Resorts',
        badgeVariant: 'green',
        isFavorite: false,
    },
    {
        id: 'exp-ojude-oba-2',
        title: 'Ojude Oba Festival',
        location: 'Ijebu-Ode, Ogun State',
        description: 'Lorem ipsum dolor sit amet consectetur. amet quis fermentum praesent eget velit eu ipsum dui.',
        date: 'June 20-21, 2025',
        rating: 4.9,
        reviewCount: 354,
        price: 'Free Entry',
        image: '/assets/images/listing_data_1.png',
        categoryBadge: 'Festival',
        badgeVariant: 'green',
        isFavorite: true,
    },
    {
        id: 'exp-molete-carnival',
        title: 'Molete Carnival',
        location: 'Ibadan State',
        description: 'Lorem ipsum dolor sit amet consectetur. orci magna consectetur pharetra in sit in sed.',
        date: 'June 20-21, 2025',
        rating: 4.3,
        reviewCount: 324,
        price: 'Free Entry',
        image: '/assets/images/listing_data_7.png',
        categoryBadge: 'Festival',
        badgeVariant: 'green',
        isFavorite: false,
    },
    {
        id: 'exp-abuja-mall',
        title: 'Abuja City Mall',
        location: 'Abuja',
        description: 'Lorem ipsum dolor sit amet consectetur. orci magna consectetur pharetra in sit in sed.',
        date: 'Always Available',
        rating: 4.3,
        reviewCount: 324,
        price: '₦ 25,000/Night',
        image: '/assets/images/listing_data_5.png',
        categoryBadge: 'Park',
        badgeVariant: 'red',
        isFavorite: false,
    },
];

export const HT_EXPLORE_CATEGORIES = [
    { key: 'seasons', label: 'Seasons', count: '02' },
    { key: 'festival', label: 'Festival', count: '04' },
    { key: 'cities-parks', label: 'Cities & Parks', count: '12' },
    { key: 'hotels', label: 'Hotels', count: '20' },
    { key: 'resorts', label: 'Resorts', count: '05' },
    { key: 'arts-cultures', label: 'Arts & Cultures', count: '34' },
    { key: 'party', label: 'Party', count: '04' },
];

export const HT_EVENTS_TABS = [
    { key: 'all', label: 'All' },
    { key: 'resorts-hotels', label: 'Resorts & Hotels' },
    { key: 'cities-destination', label: 'Cities & Destination' },
    { key: 'art-culture', label: 'Art & Culture' },
    { key: 'park-nature', label: 'Park & Nature' },
];

export const HT_EXPLORE_LOCATIONS = [
    { label: 'All (Nigeria)', value: 'all' },
    { label: 'Lagos State', value: 'Lagos' },
    { label: 'Abuja (FCT)', value: 'Abuja' },
    { label: 'Ogun State', value: 'Ogun' },
    { label: 'Ondo State', value: 'Ondo' },
    { label: 'Calabar', value: 'Calabar' },
    { label: 'Ibadan', value: 'Ibadan' },
    { label: 'Kwara State', value: 'Kwara' },
];

