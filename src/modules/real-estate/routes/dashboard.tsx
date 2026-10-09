import { lazy } from 'react';
import { Route } from 'react-router';
import RequireAuth from '@shared/guards/RequireAuth';
import DashboardLayout from '@shared/layouts/DashboardLayout/DashboardLayout';

const PropertyListing     = lazy(() => import('../dashboard/PropertyListing/Home/PropertyManagementPage'));
const PropertyManagement  = lazy(() => import('../dashboard/PropertyManagement/PropertyManagementRoot'));
const PropertyView        = lazy(() => import('../dashboard/PropertyListing/PropertyView/PropertyView'));
const MyListing           = lazy(() => import('../dashboard/PropertyListing/MyListing/MyListing'));
const MySaved             = lazy(() => import('../dashboard/PropertyListing/SavedProperty/MyListing'));
const Subscription        = lazy(() => import('../dashboard/subscription/SubscriptionPage'));
const VerifySubscription  = lazy(() => import('../dashboard/subscription/VerifySubscription'));
const DashboardTimeline   = lazy(() => import('../dashboard/Timeline/DashboardTimeline'));
const ChatListPage        = lazy(() => import('../dashboard/Chat/ChatListPage'));
const ChatDetailPage      = lazy(() => import('../dashboard/Chat/ChatDetailPage'));
const GlobalSettings      = lazy(() => import('../dashboard/Settings/GlobalSettingsPage'));

/** Protected dashboard routes for the Real Estate vertical */
export function RealEstateDashboardRoutes() {
    return (
        <Route
            path="dashboard"
            element={
                // <RequireAuth>
                    <DashboardLayout />
                // </RequireAuth>
            }
        >
            <Route index element={<PropertyListing />} />
            <Route path="home" element={<PropertyListing />} />
            <Route path="property-listing" element={<PropertyListing />} />
            <Route path="property-management/*" element={<PropertyManagement />} />
            <Route path="my-listing" element={<MyListing />} />
            <Route path="property-view/:agentId" element={<PropertyView />} />
            <Route path="saved" element={<MySaved />} />
            <Route path="subscription" element={<Subscription />} />
            <Route path="timeline" element={<DashboardTimeline />} />
            <Route path="chat" element={<ChatListPage />} />
            <Route path="chat/:userId" element={<ChatDetailPage />} />
            <Route path="settings" element={<GlobalSettings />} />
        </Route>
    );
}

/** Standalone verify route (outside DashboardLayout) */
export function RealEstateVerifyRoute() {
    return (
        <Route
            path="verify"
            element={
                <RequireAuth>
                    <VerifySubscription />
                </RequireAuth>
            }
        />
    );
}
