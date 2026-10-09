import type { Booking, CurrentUser, Review, Transaction, TimelinePost } from "../types";
import timeline1 from '/assets/icons/timeline1.png'
import timeline2 from '/assets/icons/timeline2.png'
import timeline3 from '/assets/icons/timeline3.png'
import timeline4 from '/assets/icons/timeline4.png'
import timeline5 from '/assets/icons/timeline5.png'
import timeline6 from '/assets/icons/timeline6.png'

export const currentUser: CurrentUser = {
  name: "Charles John",
  role: "Events TV",
};

export const bookings: Booking[] = [
  { id: "TXN-00123-4567", guest: "Alice Johnson", event: "Ojude Oba Festival", date: "2025-02-14", tickets: 3, amount: 15000, status: "Confirmed" },
  { id: "TXN-00124-4568", guest: "Michael Smith", event: "Lagos City Tour", date: "2025-03-21", tickets: 1, amount: 25500, status: "Pending" },
  { id: "TXN-00125-4569", guest: "Emily Davis", event: "Detty December", date: "2025-04-10", tickets: 10, amount: 30200, status: "Cancelled" },
  { id: "TXN-00126-4570", guest: "David Brown", event: "Lekki Arts Market", date: "2025-05-05", tickets: 9, amount: 45700, status: "Confirmed" },
  { id: "TXN-00127-4571", guest: "Sophia Wilson", event: "Beach Resort", date: "2025-06-15", tickets: 1, amount: 60900, status: "Confirmed" },
  { id: "TXN-00128-4572", guest: "James Taylor", event: "Ojude Oba Festival", date: "2025-07-30", tickets: 2, amount: 75300, status: "Cancelled" },
  { id: "TXN-00129-4573", guest: "Olivia Martinez", event: "Ojude Oba Festival", date: "2025-08-25", tickets: 8, amount: 85600, status: "Confirmed" },
  { id: "TXN-00130-4574", guest: "Liam Anderson", event: "Lekki Arts Market", date: "2025-09-17", tickets: 15, amount: 90100, status: "Cancelled" },
  { id: "TXN-00131-4575", guest: "Emma Thomas", event: "Beach Resort", date: "2025-10-12", tickets: 20, amount: 100000, status: "Pending" },
  { id: "TXN-00132-4576", guest: "Noah Jackson", event: "Lagos City Tour", date: "2025-11-29", tickets: 16, amount: 120500, status: "Pending" },
];

export const transactions: Transaction[] = [
  { id: "TXN-00123-4567", type: "Deposit", date: "2025-02-14T14:32:00", amount: 500, status: "Completed" },
  { id: "TXN-00124-4568", type: "Withdraw", date: "2025-03-21T14:32:00", amount: 150, status: "Completed" },
  { id: "TXN-00125-4569", type: "Withdraw", date: "2025-04-10T14:32:00", amount: 150, status: "Pending" },
  { id: "TXN-00126-4570", type: "Deposit", date: "2025-05-05T14:32:00", amount: 500, status: "Completed" },
  { id: "TXN-00127-4571", type: "Withdraw", date: "2025-06-15T14:32:00", amount: 150, status: "Completed" },
  { id: "TXN-00128-4572", type: "Deposit", date: "2025-07-30T14:32:00", amount: 500, status: "Pending" },
  { id: "TXN-00129-4573", type: "Withdraw", date: "2025-08-25T14:32:00", amount: 150, status: "Completed" },
  { id: "TXN-00130-4574", type: "Deposit", date: "2025-09-17T14:32:00", amount: 500, status: "Completed" },
  { id: "TXN-00131-4575", type: "Deposit", date: "2025-10-12T14:32:00", amount: 500, status: "Completed" },
  { id: "TXN-00132-4576", type: "Deposit", date: "2025-11-29T14:32:00", amount: 500, status: "Completed" },
];

export const reviews: Review[] = [
  {
    id: "rev-1",
    author: "John David",
    listing: "Ojude Oba Festival",
    category: "Event & Festive",
    rating: 4.7,
    body: "Lorem ipsum dolor sit amet consectetur. Nibh odio egestas tortor lorem laoreet eu volutpat. Adipiscing odio erat ac ridiculus imperdiet. Ut morbi tortor non fringilla nec urna. Purus eu erat nunc nisl.",
    date: "2025-11-03",
  },
  {
    id: "rev-2",
    author: "Shalom Destiny",
    listing: "Ojaja Park",
    category: "Park & Destination",
    rating: 4.7,
    body: "Lorem ipsum dolor sit amet consectetur. Nibh odio egestas tortor lorem laoreet eu volutpat. Adipiscing odio erat ac ridiculus imperdiet. Ut morbi tortor non fringilla nec urna. Purus eu erat nunc nisl.",
    date: "2025-11-03",
  },
  {
    id: "rev-3",
    author: "Adeolu Gbenga",
    listing: "Beach Resort",
    category: "Park & Destination",
    rating: 4.7,
    body: "Lorem ipsum dolor sit amet consectetur. Nibh odio egestas tortor lorem laoreet eu volutpat. Adipiscing odio erat ac ridiculus imperdiet. Ut morbi tortor non fringilla nec urna. Purus eu erat nunc nisl.",
    date: "2025-11-03",
  },
];

export const timelinePosts: TimelinePost[] = [
  {
    id: "ojude-oba-2025-horses-display",
    title: "Ojude Oba 2025 Horses Display",
    channel: "Events TV",
    category: "Festival",
    coverUrl: timeline1,
    heroImages: [
      timeline6,
      timeline5
    ],
    views: 2600,
    postedAgo: "5 days ago",
    durationLabel: "20:08",
    likesCount: 1240,
    commentsCount: 240,
    description: "The Ojude Oba Festival is an annual cultural celebration that brings together the Ijebu people of Ogun State to honor their king, the Awujale. This spectacular event showcases the rich heritage, traditions, and vibrant culture of the Yoruba people through colorful parades, traditional ceremonies, and cultural displays.",
    comments: [
      {
        id: "c1",
        authorName: "Bimbo",
        authorHandle: "@Bimbo",
        postedAgo: "5 days ago",
        body: "The vibrant display of horsemanship and cultural pride at the Ojude Oba festival is truly a sight to behold."
      },
      {
        id: "c2",
        authorName: "Yinka Samuel",
        authorHandle: "@Yinkasamuel",
        postedAgo: "5 days ago",
        body: "The presentation was well-structured, visually appealing, and delivered with enthusiasm, making it a truly engaging experience.",
        likesCount: 2
      },
      {
        id: "c3",
        authorName: "Charles John",
        authorHandle: "@Charlesjohn",
        postedAgo: "5 days ago",
        body: "Good job showcasing the rich heritage of the Ijebu people and their deep connection to tradition!"
      },
      {
        id: "c4",
        authorName: "David Jackson",
        authorHandle: "@Davidjackson",
        postedAgo: "5 days ago",
        body: "The vibrant display of horsemanship and cultural pride at the Ojude Oba festival is truly a sight to behold, showcasing the rich heritage of the Ijebu people and their deep connection to tradition."
      }
    ]
  },
  {
    id: "eyo-festival-2024",
    title: "Eyo Festival 2024",
    channel: "Events TV",
    category: "Festival",
    coverUrl: timeline2,
    views: 1200000,
    postedAgo: "300 days ago",
    durationLabel: "20:08",
    isNew: true
  },
  {
    id: "ojaja-children-ester-2025",
    title: "Ojaja Children Ester Celebration 2025",
    channel: "Ojaja channel",
    category: "Events",
    coverUrl: timeline3,
    views: 200,
    postedAgo: "5 days ago",
    durationLabel: "20:08"
  },
  {
    id: "upper-room-abuja",
    title: "Upper Room Abuja August Edition",
    channel: "ChurchGist TV",
    category: "Events",
    coverUrl: timeline4,
    views: 2300000,
    postedAgo: "120days ago",
    durationLabel: "20:08",
    isWide: true
  },
  {
    id: "the-experience-2024",
    title: "The Experience 2024",
    channel: "HOTR TV",
    category: "Events",
    coverUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80",
    views: 2300000,
    postedAgo: "1 year ago",
    durationLabel: "20:08"
  },
  {
    id: "ojude-oba-2025",
    title: "Ojude Oba 2025",
    channel: "Events TV",
    category: "Festival",
    coverUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80",
    views: 19700,
    postedAgo: "200 days ago",
    durationLabel: "20:08"
  },
  {
    id: "the-experience-2024-alt",
    title: "The Experience 2024",
    channel: "HOTR TV",
    category: "Events",
    coverUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80",
    views: 2300000,
    postedAgo: "1 year ago",
    durationLabel: "20:08"
  },
  {
    id: "obudu-resort-aerial",
    title: "Obudu Resort Aerial view",
    channel: "Obudu TV",
    category: "Documentary",
    coverUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    views: 200,
    postedAgo: "50 days ago",
    durationLabel: "20:08"
  }
];

export const bookingStatusOptions = [
  { value: "all", label: "All Bookings" },
  { value: "confirmed", label: "Confirmed" },
  { value: "pending", label: "Pending" },
  { value: "cancelled", label: "Cancelled" },
];
