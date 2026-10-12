import { lazy } from 'react';
import { Route } from 'react-router';
// import RequireAuth from '@shared/guards/RequireAuth';
import HTDashboardLayout from '../dashboard/layouts/HTDashboardLayout';

const HTDashboardHome = lazy(() => import('../dashboard/pages/HTDashboardHome'));
const HTTimelineFeedPage = lazy(() => import('../dashboard/pages/HTTimelineFeedPage'));
const HTTimelinePostDetailPage = lazy(() => import('../dashboard/pages/HTTimelinePostDetailPage'));
const HTMyListingsPage = lazy(() => import('../dashboard/pages/HTMyListingsPage'));
const HTCategoryDetailPage = lazy(() => import('../dashboard/pages/HTCategoryDetailPage'));
const HTListingDetailPage = lazy(() => import('../dashboard/pages/HTListingDetailPage'));
const HTStorybookPage = lazy(() => import('../dashboard/pages/HTStorybookPage'));
const HTReviewsPage = lazy(() => import('../dashboard/pages/HTReviewsPage'));
const HTBookingMgtPage = lazy(() => import('../dashboard/pages/HTBookingMgtPage'));
const HTCalendarPage = lazy(() => import('../dashboard/pages/HTCalendarPage'));
const HTSettingsPage = lazy(() => import('../dashboard/pages/HTSettingsPage'));
const HTWalletPage = lazy(() => import('../dashboard/pages/HTWalletPage'));

/** Dashboard routes for the Hospitality & Tours vertical */
export function HospitalityToursDashboardRoutes() {
    return (
        <Route
            path="hospitality-tours/dashboard"
            element={
                /* <RequireAuth> */
                <HTDashboardLayout />
                /* </RequireAuth> */
            }
        >
            <Route index element={<HTDashboardHome />} />
            <Route path="timeline" element={<HTTimelineFeedPage />} />
            <Route path="timeline/:postId" element={<HTTimelinePostDetailPage />} />
            <Route path="my-listings" element={<HTMyListingsPage />} />
            <Route path="my-listings/:categoryId" element={<HTCategoryDetailPage />} />
            <Route path="my-listings/:categoryId/:listingId" element={<HTListingDetailPage />} />
            <Route path="bookings" element={<HTBookingMgtPage />} />
            <Route path="wallet" element={<HTWalletPage />} />
            <Route path="calendar" element={<HTCalendarPage />} />
            <Route path="reviews" element={<HTReviewsPage />} />
            <Route path="settings" element={<HTSettingsPage />} />
            <Route path="storybook" element={<HTStorybookPage />} />
        </Route>
    );
}
