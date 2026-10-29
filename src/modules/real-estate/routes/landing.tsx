import { lazy } from 'react';
import { Route } from 'react-router';

const Home             = lazy(() => import('../landing/Home/Home'));
const About            = lazy(() => import('../landing/About/AboutUs'));
const Timeline         = lazy(() => import('../landing/Timeline'));
const ContactUs        = lazy(() => import('../landing/ContactUs'));
const PropertyListing  = lazy(() => import('../landing/PropertyListing'));
const PropertyView     = lazy(() => import('../landing/PropertyView'));
const Blogs            = lazy(() => import('../landing/Blogs/Blogs'));
const Pricing          = lazy(() => import('../landing/Pricing/Pricing'));

/** Public / landing routes for the Real Estate vertical */
export function RealEstateLandingRoutes() {
    return (
        <>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="timeline" element={<Timeline />} />
            <Route path="contact" element={<ContactUs />} />
            <Route path="property-listing" element={<PropertyListing />} />
            <Route path="property-view/:agentId" element={<PropertyView />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="pricing" element={<Pricing />} />
        </>
    );
}
