export type ArtisanCategory = 'Plumbers' | 'Electricians' | 'HVAC' | 'Mechanics';

export interface ServiceCategoryItem {
    id: ArtisanCategory;
    title: string;
    description: string;
    bubbleBg: string;
    bubbleColor: string;
}

export interface ArtisanReview {
    id: string;
    author: string;
    location: string;
    rating: number;
    comment: string;
    date: string;
}

export interface ServiceArtisan {
    id: string;
    name: string;
    businessName: string;
    phoneNumber: string;
    requestCompleted: number;
    activeRequest: number;
    status: 'Active' | 'In-Active';
    category: ArtisanCategory;
    avatarUrl?: string;
    rating?: number;
    profession?: string;
    reviews?: ArtisanReview[];
}
