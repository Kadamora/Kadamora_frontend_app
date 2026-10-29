import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router';
import { FiSearch } from 'react-icons/fi';
import SEO from '@shared/components/SEO/SEO';
import LandingPageContainer from '@shared/layouts/LandingLayout/LandingPageContainer';
import Assistance from '@modules/real-estate/landing/Home/components/Assistance';
import HTFilterSidebar from '../components/filters/HTFilterSidebar';
import HTDestinationCard from '../components/cards/HTDestinationCard';
import { HT_NAV_LINKS, HT_EXPLORE_LISTINGS } from '../data/hospitalityLandingData';
import { ChevronRight } from 'lucide-react';

export default function HTExplorePage() {
    const [searchParams] = useSearchParams();
    const initialCategory = searchParams.get('category') || 'all';

    const [selectedCategory, setSelectedCategory] = useState(initialCategory);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState<{
        location?: string;
        minPrice?: string;
        maxPrice?: string;
        startDate?: string;
        endDate?: string;
    }>({});

    const filteredItems = useMemo(() => {
        return HT_EXPLORE_LISTINGS.filter((item) => {
            const matchesSearch =
                item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.description.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesCategory =
                selectedCategory === 'all' ||
                item.categoryBadge?.toLowerCase().includes(selectedCategory.toLowerCase()) ||
                (selectedCategory === 'festival' && item.title.toLowerCase().includes('festival')) ||
                (selectedCategory === 'resorts' && item.categoryBadge === 'Resorts');

            const matchesLocation =
                !filters.location ||
                filters.location === 'all' ||
                item.location.toLowerCase().includes(filters.location.toLowerCase());

            return matchesSearch && matchesCategory && matchesLocation;
        });
    }, [searchTerm, selectedCategory, filters]);

    return (
        <LandingPageContainer headerTheme="light" navLinks={HT_NAV_LINKS}>
            <SEO
                title="Explore Events Lists & Destinations - Kadamora"
                description="Explore Nigeria's top events, festivals, parks, hotels, and destinations with interactive filters and reviews."
            />

            <div className="bg-[#FAFCFB] pt-8 sm:pt-12 pb-16 sm:pb-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header: Title, Breadcrumbs & Search */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 ">
                        <div>
                            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#002E62] tracking-tight">
                                Explore Events Lists
                            </h1>
                            <nav className="flex items-center gap-1.5 text-xs text-slate-500 mt-2 font-medium">
                                <Link to="/hospitality-tours" className="hover:text-primary transition-colors">
                                    Home
                                </Link>
                                <ChevronRight className='font-medium h-4 w-4'/>
                                <span className="text-[#00D26A] font-medium">Event Listings</span>
                            </nav>
                        </div>

                        {/* Search Input */}
                        <div className="w-full md:w-80">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Search anything"
                                    className="w-full bg-white border border-slate-200 rounded-lg py-2 pr-2 pl-10 text-xs sm:text-sm text-[#091E42] placeholder-slate-400 focus:outline-none focus:border-[#00D26A] shadow-2xs"
                                />
                                <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                            </div>
                        </div>
                    </div>

                    {/* Main Content Layout: Sidebar + Listings Grid */}
                    <div className="flex flex-col lg:flex-row gap-8 ">
                        {/* Sidebar Filter */}
                        <div className="w-full lg:w-72 shrink-0">
                            <HTFilterSidebar
                                selectedCategory={selectedCategory}
                                onSelectCategory={setSelectedCategory}
                                onFilterChange={(newFilters) => setFilters(newFilters)}
                            />
                        </div>

                        {/* 3x3 Listings Grid */}
                        <div className="flex-1 min-w-0">
                            {filteredItems.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {filteredItems.map((item) => (
                                        <HTDestinationCard key={item.id} item={item} />
                                    ))}
                                </div>
                            ) : (
                                <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center w-full mx-auto space-y-3">
                                    <p className="text-base font-semibold text-[#091E42]">
                                        No destinations or events found
                                    </p>
                                    <p className="text-xs text-slate-500 max-w-sm mx-auto">
                                        Try adjusting your search criteria or reset your filters to explore all available listings.
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setSelectedCategory('all');
                                            setSearchTerm('');
                                            setFilters({});
                                        }}
                                        className="bg-[#00D26A] hover:bg-[#00B85C] flex mx-auto text-white px-5 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-colors"
                                    >
                                        Reset All Filters
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
                    <Assistance />
        </LandingPageContainer>
    );
}
