import { lazy } from 'react';
import { Route } from 'react-router';

const HTHomePage = lazy(() => import('../landing/HTHomePage'));
const HTExplorePage = lazy(() => import('../landing/HTExplorePage'));
const HTEventsPage = lazy(() => import('../landing/HTEventsPage'));
const HTTimelinePage = lazy(() => import('../landing/HTTimelinePage'));
const HTBlogsPage = lazy(() => import('../landing/HTBlogsPage'));

/** Landing routes for the Hospitality & Tours vertical */
export function HospitalityToursLandingRoutes() {
    return (
        <>
            <Route path="hospitality-tours" element={<HTHomePage />} />
            <Route path="hospitality-tours/explore" element={<HTExplorePage />} />
            <Route path="hospitality-tours/events" element={<HTEventsPage />} />
            <Route path="hospitality-tours/timeline" element={<HTTimelinePage />} />
            <Route path="hospitality-tours/blogs" element={<HTBlogsPage />} />
        </>
    );
}
