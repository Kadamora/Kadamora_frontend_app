export type BookingStatus = "Confirmed" | "Pending" | "Cancelled";
export type TransactionStatus = "Completed" | "Pending" | "Failed";
export type TransactionType = "Deposit" | "Withdraw";

export interface Booking {
  id: string; 
  guest: string;
  event: string;
  date: string; 
  tickets: number;
  amount: number;
  status: BookingStatus;
}

export interface Transaction {
  id: string;
  type: TransactionType;
  date: string; // ISO datetime string
  amount: number;
  status: TransactionStatus;
}

export interface Review {
  id: string;
  author: string;
  listing: string;
  category: string;
  rating: number;
  body: string;
  date: string;
}

export interface TimelineComment {
  id: string;
  authorName: string;
  authorHandle: string;
  authorAvatar?: string;
  postedAgo: string;
  body: string;
  likesCount?: number;
}

export interface TimelinePost {
  id: string;
  title: string;
  channel: string;
  channelAvatarUrl?: string;
  category: "Events" | "Festival" | "Season" | "Documentary" | "Gist" | "Interview";
  coverUrl: string;
  heroImages?: string[];
  views: number;
  postedAgo: string;
  durationLabel?: string;
  description?: string;
  likesCount?: number;
  commentsCount?: number;
  comments?: TimelineComment[];
  isWide?: boolean;
  isNew?: boolean;
}

export interface ListingType {
  id: string;
  title: string;
  description: string;
  icon: string; // icon key resolved by <Icon />
  accent: "purple" | "blue" | "sky" | "pink" | "green";
}

export interface CurrentUser {
  name: string;
  role: string;
  avatarUrl?: string;
}
