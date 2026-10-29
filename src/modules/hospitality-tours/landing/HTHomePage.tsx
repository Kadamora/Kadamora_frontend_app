import { Link } from 'react-router';
import SEO from '@shared/components/SEO/SEO';
import LandingPageContainer from '@shared/layouts/LandingLayout/LandingPageContainer';
import Assistance from '@modules/real-estate/landing/Home/components/Assistance';
import HTHomeHero from '../components/hero/HTHomeHero';
import HTVibrantSpirit from '../components/home/HTVibrantSpirit';
import HTMetricsSection from '../components/home/HTMetricsSection';
import HTAdventureBanner from '../components/cta/HTAdventureBanner';
import HTDestinationCard from '../components/cards/HTDestinationCard';
import { HT_NAV_LINKS, HT_FEATURED_DESTINATIONS } from '../data/hospitalityLandingData';

export default function HTHomePage() {
    return (
        <LandingPageContainer
            headerTheme="light"
            navLinks={HT_NAV_LINKS}
            hero={() => <HTHomeHero />}
            heroClassName="bg-transparent"
        >
            <SEO
                title="Kadamora Hospitality & Tours - Experience Nigeria's Rich Culture"
                description="Explore breathtaking Nigerian festivals, scenic resorts, cultural landmarks and top travel destinations with Kadamora."
            />

            <div className="space-y-24 sm:space-y-28 pt-20 sm:pt-24 pb-16 sm:pb-24 bg-[#FAFCFB]">
                {/* 1. Vibrant Spirit Showcase */}
                <HTVibrantSpirit />

                {/* 2. Featured Destinations */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002E62] tracking-tight">
                                Featured Destinations
                            </h2>
                            <p className="text-xs sm:text-sm text-[#666666] mt-1">
                               Popular Events and Experiences
                            </p>
                        </div>
                        <Link
                            to="/hospitality-tours/explore"
                            className="inline-flex items-center justify-center border border-slate-300 hover:border-slate-400 bg-white text-[#091E42] px-5 py-2 rounded-full text-xs font-semibold shadow-2xs hover:bg-slate-50 transition-colors w-fit"
                        >
                            View All
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {HT_FEATURED_DESTINATIONS.map((dest) => (
                            <HTDestinationCard key={dest.id} item={dest} />
                        ))}
                    </div>
                </section>

                {/* 3. Proven Results & Benefits */}
                <HTMetricsSection />

                {/* 4. Ready To Start Your Adventure CTA */}
                <HTAdventureBanner />

            </div>
                {/* 5. Stay Close Assistance Section */}
                <Assistance />
        </LandingPageContainer>
    );
}
