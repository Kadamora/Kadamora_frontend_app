import { useNavigate } from "react-router";
import type { CategoryAccent } from "@modules/hospitality-tours/components/ListingCategoryCard";
import ListingCategoryCard from "@modules/hospitality-tours/components/ListingCategoryCard";
import WelcomeBanner from "@modules/hospitality-tours/components/WelcomeBanner";

interface ListingCategoryItem {
    id: string;
    title: string;
    description: string;
    accent: CategoryAccent;
    iconSrc: string;
}

const LISTING_CATEGORIES: ListingCategoryItem[] = [
    {
        id: 'cities-destinations',
        title: 'Cities & Destinations',
        description: 'List cities, towns, and tourist destinations across Nigeria',
        accent: 'purple',
        iconSrc: '/assets/icons/listing1.svg',
    },
    {
        id: 'events-festivals',
        title: 'Events & Festivals',
        description: 'List cultural festivals, concerts, and special events',
        accent: 'blue',
        iconSrc: '/assets/icons/listing2.svg',
    },
    {
        id: 'parks-nature',
        title: 'Parks & Nature',
        description: 'List national parks, nature reserves, and outdoor attractions',
        accent: 'sky',
        iconSrc: '/assets/icons/listing3.svg',
    },
    {
        id: 'hotel-resorts',
        title: 'Hotel & Resorts',
        description: 'List hotels, resorts, lodges, and accommodation facilities',
        accent: 'pink',
        iconSrc: '/assets/icons/listing4.svg',
    },
    {
        id: 'arts-culture',
        title: 'Arts & Culture',
        description: 'List museums, galleries, cultural centers, and art spaces',
        accent: 'green',
        iconSrc: '/assets/icons/listing5.svg',
    },
];

export default function HTMyListingsPage() {
    const navigate = useNavigate();

    const handleCategoryClick = (category: ListingCategoryItem) => {
        navigate(`/hospitality-tours/dashboard/my-listings/${category.id}`);
    };

    return (
        <div className="space-y-8 max-w-7xl mx-auto pb-12">
            <WelcomeBanner
                title="My Listings"
                subtitle="Choose the type of listing you want to create on Kadamora and start reaching thousands of travelers"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {LISTING_CATEGORIES.map((cat) => (
                    <ListingCategoryCard
                        key={cat.id}
                        title={cat.title}
                        description={cat.description}
                        accent={cat.accent}
                        iconSrc={cat.iconSrc}
                        onClick={() => handleCategoryClick(cat)}
                    />
                ))}
            </div>
        </div>
    );
}
