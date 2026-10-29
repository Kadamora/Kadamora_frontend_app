export interface VendorInfo {
    name: string;
    avatar: string;
    productsCount: number;
}

export interface Product {
    id: string;
    title: string;
    price: string;
    numericPrice: number;
    description: string;
    category: string;
    imageUrl: string;
    rating?: number;
    isLiked?: boolean;
    isFeaturedWide?: boolean;
    vendor?: VendorInfo;
}

export interface CartItem {
    id: string;
    product: Product;
    quantity: number;
}
