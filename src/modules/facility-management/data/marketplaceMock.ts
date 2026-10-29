import type { Product, CartItem } from '../types/marketplace';

export const mockMarketplaceProducts: Product[] = [
    {
        id: 'prod-1',
        title: 'Fresh Fruits Hamper',
        price: '₦9,732.00',
        numericPrice: 9550,
        description:
            'Felis sed amet eget aliquam cursus placerat. Risus morbi erat sed curabitur euismod a odio magna condimentum.',
        category: 'Groceries',
        imageUrl:
            'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?q=80&w=800&auto=format&fit=crop',
        rating: 5,
        isLiked: true,
        vendor: {
            name: 'Abel Johnson Charles',
            avatar: '/assets/images/charles.png',
            productsCount: 26,
        },
    },
    {
        id: 'prod-2',
        title: 'Denim Bag',
        price: '₦5,732.00',
        numericPrice: 5732,
        description:
            'Felis sed amet eget aliquam cursus placerat. Risus morbi erat sed curabitur euismod a odio magna condimentum.',
        category: 'Fashion',
        imageUrl:
            'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop',
        rating: 4.8,
        isLiked: false,
        vendor: {
            name: 'Abel Johnson Charles',
            avatar: '/assets/images/charles.png',
            productsCount: 26,
        },
    },
    {
        id: 'prod-3',
        title: 'Nike Air Max 270',
        price: '₦5,732.00',
        numericPrice: 4000,
        description:
            'Felis sed amet eget aliquam cursus placerat. Risus morbi erat sed curabitur euismod a odio magna condimentum.',
        category: 'Fashion',
        imageUrl:
            'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop',
        rating: 4.9,
        isLiked: true,
        vendor: {
            name: 'SportX Direct',
            avatar: '/assets/images/charles.png',
            productsCount: 18,
        },
    },
    {
        id: 'prod-4',
        title: 'Low Heel Slippers',
        price: '₦10,200.00',
        numericPrice: 10200,
        description:
            'Felis sed amet eget aliquam cursus placerat. Risus morbi erat sed curabitur euismod a odio magna condimentum.',
        category: 'Fashion',
        imageUrl:
            'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=800&auto=format&fit=crop',
        rating: 4.7,
        isLiked: false,
        vendor: {
            name: 'Elegance Shoes',
            avatar: '/assets/images/charles.png',
            productsCount: 14,
        },
    },
    {
        id: 'prod-5',
        title: 'Denim Short',
        price: '₦9,732.00',
        numericPrice: 9732,
        description:
            'Felis sed amet eget aliquam cursus placerat. Risus morbi erat sed curabitur euismod a odio magna condimentum.',
        category: 'Clothing',
        imageUrl:
            'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=800&auto=format&fit=crop',
        rating: 4.6,
        isLiked: false,
        vendor: {
            name: 'Denim Studio',
            avatar: '/assets/images/charles.png',
            productsCount: 32,
        },
    },
    {
        id: 'prod-6',
        title: 'Men 3-1 packing Shirt',
        price: '₦5,732.00',
        numericPrice: 5732,
        description:
            'Felis sed amet eget aliquam cursus placerat. Risus morbi erat sed curabitur euismod a odio magna condimentum.',
        category: 'Clothing',
        imageUrl:
            'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=800&auto=format&fit=crop',
        rating: 4.8,
        isLiked: false,
        vendor: {
            name: 'Kingsman Apparel',
            avatar: '/assets/images/charles.png',
            productsCount: 45,
        },
    },
    {
        id: 'prod-7',
        title: 'Glasses',
        price: '₦5,732.00',
        numericPrice: 5732,
        description:
            'Felis sed amet eget aliquam cursus placerat. Risus morbi erat sed curabitur euismod a odio magna condimentum.',
        category: 'Fashion',
        imageUrl:
            'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=800&auto=format&fit=crop',
        rating: 4.5,
        isLiked: false,
        vendor: {
            name: 'VisionOptics',
            avatar: '/assets/images/charles.png',
            productsCount: 22,
        },
    },
    {
        id: 'prod-8',
        title: 'Blonde Bone Straight',
        price: '₦10,200.00',
        numericPrice: 10200,
        description:
            'Felis sed amet eget aliquam cursus placerat. Risus morbi erat sed curabitur euismod a odio magna condimentum.',
        category: 'Fashion',
        imageUrl:
            'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800&auto=format&fit=crop',
        rating: 5,
        isLiked: false,
        vendor: {
            name: 'Luxe Hair Co',
            avatar: '/assets/images/charles.png',
            productsCount: 15,
        },
    },
    {
        id: 'prod-9',
        title: 'Oris Wrist Watch',
        price: '₦9,732.00',
        numericPrice: 9732,
        description:
            'Felis sed amet eget aliquam cursus placerat. Risus morbi erat sed curabitur euismod a odio magna condimentum.',
        category: 'Fashion',
        imageUrl:
            'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop',
        rating: 4.9,
        isLiked: false,
        isFeaturedWide: true,
        vendor: {
            name: 'Swiss Chrono LTD',
            avatar: '/assets/images/charles.png',
            productsCount: 19,
        },
    },
    {
        id: 'prod-10',
        title: 'Air Fresheners',
        price: '₦10,200.00',
        numericPrice: 10200,
        description:
            'Felis sed amet eget aliquam cursus placerat. Risus morbi erat sed curabitur euismod a odio magna condimentum.',
        category: 'Groceries',
        imageUrl:
            'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=800&auto=format&fit=crop',
        rating: 4.4,
        isLiked: false,
        vendor: {
            name: 'FreshHome Supplies',
            avatar: '/assets/images/charles.png',
            productsCount: 11,
        },
    },
    {
        id: 'prod-11',
        title: 'Jpearl Necklace',
        price: '₦9,732.00',
        numericPrice: 9732,
        description:
            'Felis sed amet eget aliquam cursus placerat. Risus morbi erat sed curabitur euismod a odio magna condimentum.',
        category: 'Jewelry',
        imageUrl:
            'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop',
        rating: 4.8,
        isLiked: false,
        vendor: {
            name: 'Crown Gems',
            avatar: '/assets/images/charles.png',
            productsCount: 30,
        },
    },
    {
        id: 'prod-12',
        title: 'Baseball FaceCap',
        price: '₦5,732.00',
        numericPrice: 5732,
        description:
            'Felis sed amet eget aliquam cursus placerat. Risus morbi erat sed curabitur euismod a odio magna condimentum.',
        category: 'Clothing',
        imageUrl:
            'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=800&auto=format&fit=crop',
        rating: 4.7,
        isLiked: false,
        vendor: {
            name: 'Urban Hats',
            avatar: '/assets/images/charles.png',
            productsCount: 20,
        },
    },
    {
        id: 'prod-13',
        title: 'Cookies',
        price: '₦5,732.00',
        numericPrice: 5732,
        description:
            'Felis sed amet eget aliquam cursus placerat. Risus morbi erat sed curabitur euismod a odio magna condimentum.',
        category: 'Groceries',
        imageUrl:
            'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=800&auto=format&fit=crop',
        rating: 4.9,
        isLiked: false,
        vendor: {
            name: 'Grand Bakehouse',
            avatar: '/assets/images/charles.png',
            productsCount: 16,
        },
    },
    {
        id: 'prod-14',
        title: 'Laundry Detergent',
        price: '₦10,200.00',
        numericPrice: 10200,
        description:
            'Felis sed amet eget aliquam cursus placerat. Risus morbi erat sed curabitur euismod a odio magna condimentum.',
        category: 'Groceries',
        imageUrl:
            'https://images.unsplash.com/photo-1583947215259-38e31be8751f?q=80&w=800&auto=format&fit=crop',
        rating: 4.8,
        isLiked: false,
        vendor: {
            name: 'CleanMax Nigeria',
            avatar: '/assets/images/charles.png',
            productsCount: 28,
        },
    },
    {
        id: 'prod-15',
        title: 'Sockings',
        price: '₦10,200.00',
        numericPrice: 10200,
        description:
            'Felis sed amet eget aliquam cursus placerat. Risus morbi erat sed curabitur euismod a odio magna condimentum.',
        category: 'Clothing',
        imageUrl:
            'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?q=80&w=800&auto=format&fit=crop',
        rating: 4.5,
        isLiked: false,
        vendor: {
            name: 'Comfort Wear',
            avatar: '/assets/images/charles.png',
            productsCount: 35,
        },
    },
    {
        id: 'prod-16',
        title: 'iPhone 12',
        price: '₦9,732.00',
        numericPrice: 9732,
        description:
            'Felis sed amet eget aliquam cursus placerat. Risus morbi erat sed curabitur euismod a odio magna condimentum.',
        category: 'Electronics',
        imageUrl:
            'https://images.unsplash.com/photo-1605236453806-6ff36851218e?q=80&w=1200&auto=format&fit=crop',
        rating: 5,
        isLiked: false,
        isFeaturedWide: true,
        vendor: {
            name: 'Apple Hub Lagos',
            avatar: '/assets/images/charles.png',
            productsCount: 42,
        },
    },
    {
        id: 'prod-17',
        title: 'Sunflower Oil',
        price: '₦5,732.00',
        numericPrice: 5732,
        description:
            'Felis sed amet eget aliquam cursus placerat. Risus morbi erat sed curabitur euismod a odio magna condimentum.',
        category: 'Groceries',
        imageUrl:
            'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=800&auto=format&fit=crop',
        rating: 4.7,
        isLiked: false,
        vendor: {
            name: 'Abel Johnson Charles',
            avatar: '/assets/images/charles.png',
            productsCount: 26,
        },
    },
    {
        id: 'prod-18',
        title: 'Denim Jacket',
        price: '₦4,500.00',
        numericPrice: 4500,
        description:
            'Felis sed amet eget aliquam cursus placerat. Risus morbi erat sed curabitur euismod a odio magna condimentum.',
        category: 'Clothing',
        imageUrl:
            'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=800&auto=format&fit=crop',
        rating: 4.8,
        isLiked: false,
        vendor: {
            name: 'Denim Studio',
            avatar: '/assets/images/charles.png',
            productsCount: 32,
        },
    },
];

export const initialCartItems: CartItem[] = [
    {
        id: 'cart-1',
        product: mockMarketplaceProducts[0], // Fresh Fruits Hamper
        quantity: 1,
    },
    {
        id: 'cart-2',
        product: mockMarketplaceProducts[2], // Nike Air Max 270
        quantity: 1,
    },
    {
        id: 'cart-3',
        product: mockMarketplaceProducts[17], // Denim Jacket
        quantity: 1,
    },
];
