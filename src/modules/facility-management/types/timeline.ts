export interface TimelineAuthor {
    name: string;
    avatar: string;
    role?: string;
    date: string;
}

export interface TimelinePost {
    id: string;
    author: TimelineAuthor;
    content: string;
    singleImage?: string;
    images?: string[];
    likesCount: number;
    commentsCount: number;
    sharesCount?: number;
    isLiked?: boolean;
    type?: 'general' | 'announcement' | 'event';
}

export interface AnnouncementItem {
    id: string;
    title: string;
    content: string;
    date?: string;
}

export interface LiveSession {
    id: string;
    hostName: string;
    title: string;
    avatars: string[];
    othersCount: number;
    linkText?: string;
}

export interface TimelineAd {
    id: string;
    title: string;
    price: string;
    description: string;
    imageUrl: string;
    tag?: string; // e.g. "Sell", "Rent"
    badge?: string; // "Ads"
}
