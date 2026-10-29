import SEO from '@shared/components/SEO/SEO';
import Blogs from '@modules/real-estate/landing/Blogs/Blogs';
import { HT_NAV_LINKS } from '../data/hospitalityLandingData';

export default function HTBlogsPage() {
    return (
        <>
            <SEO
                title="Kadamora Hospitality Blog - Insights, Tourism & Travel Guides"
                description="Your inside look at hospitality, travel guides, Nigerian cultural festivals, and community stories on Kadamora."
            />
            <Blogs navLinks={HT_NAV_LINKS} />
        </>
    );
}
