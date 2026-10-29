import { useState, useMemo } from 'react';
import { Link } from 'react-router';
import { FiPlus } from 'react-icons/fi';
import SEO from '@shared/components/SEO/SEO';
import LandingPageContainer from '@shared/layouts/LandingLayout/LandingPageContainer';
import Assistance from '@modules/real-estate/landing/Home/components/Assistance';
import HTFeaturedEventCard from '../components/cards/HTFeaturedEventCard';
import HTDestinationCard from '../components/cards/HTDestinationCard';
import HTFilterTabs from '../components/HTFilterTabs';
import {
    HT_NAV_LINKS,
    HT_EVENTS_TABS,
    HT_FEATURED_EVENTS,
    HT_FEATURED_DESTINATIONS,
} from '../data/hospitalityLandingData';

export default function HTEventsPage() {
    const [activeTab, setActiveTab] = useState('all');

    const filteredUpcoming = useMemo(() => {
        if (activeTab === 'all') return HT_FEATURED_DESTINATIONS;
        return HT_FEATURED_DESTINATIONS;
    }, [activeTab]);

    return (
        <LandingPageContainer
            headerTheme="light"
            navLinks={HT_NAV_LINKS}
            hero={() => (
                <div className="relative min-h-[520px] sm:min-h-[580px] w-full flex  pt-28 pb-20">
                    <img
                        src="/assets/images/ht_hero_slide_1.jpg"
                        alt="Nigerian cultural celebration"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/40 to-black/30" />

                    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-end ">
                        {/* Left Title */}
                        <div className="lg:col-span-7">
                            <h1 className="text-4xl sm:text-5xl lg:text-[60px] font-bold text-white leading-[1.1] tracking-tight drop-shadow-md">
                                Nigeria Events &amp; <br />
                                Festivals
                            </h1>
                        </div>

                        {/* Right Subtitle & CTA */}
                        <div className="lg:col-span-5 space-y-5 lg:pl-6">
                            <p className="text-sm  text-white/95 leading-relaxed drop-shadow-xs font-normal">
                                Experience the heart of Nigeria by uncovering its most captivating festivals,
                                thrilling events, and unforgettable destinations waiting to be explored.
                            </p>
                            <div>
                                <Link
                                    to="/auth/signup"
                                    className="inline-flex items-center gap-2 bg-[#00D26A] hover:bg-[#00B85C] text-white px-6 py-2.5 rounded-[8px] text-xs sm:text-sm font-medium shadow-md transition-colors"
                                >
                                    <FiPlus className="h-4 w-4" />
                                    <span>List Your Events</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                    
                </div>
            )}
            heroClassName="bg-transparent"
        >
            <SEO
                title="Nigeria Events & Festivals - Kadamora Hospitality"
                description="Discover upcoming Nigerian cultural festivals, carnivals, and grand celebrations across all states."
            />

            <div className="bg-[#FAFCFB] py-14 space-y-7 ">
                {/* 1. Category Filter Tabs */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <HTFilterTabs
                        tabs={HT_EVENTS_TABS}
                        activeTab={activeTab}
                        onTabChange={setActiveTab}
                    />
                </div>

                {/* 2. Featured Events (2x2 Grid) */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-xl sm:text-2xl font-semibold text-[#001731] tracking-tight mb-2 sm:mb-3">
                        Featured Events
                    </h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                        {HT_FEATURED_EVENTS.map((event) => (
                            <HTFeaturedEventCard key={event.id} event={event} />
                        ))}
                    </div>
                </section>

                {/* 3. Upcoming Events (4 Columns) */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-xl sm:text-2xl font-semibold text-[#001731] tracking-tight mb-2 sm:mb-3">
                        Upcoming Events
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {filteredUpcoming.map((dest) => (
                            <HTDestinationCard key={dest.id} item={dest} />
                        ))}
                    </div>
                </section>
            </div>
            {/* 4. Stay Close Assistance Section */}
            <Assistance />
        </LandingPageContainer>
    );
}
