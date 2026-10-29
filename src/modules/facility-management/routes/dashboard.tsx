import { lazy } from 'react';
import { Route } from 'react-router';
// import RequireAuth from '@shared/guards/RequireAuth';
import DashboardLayout from '@shared/layouts/DashboardLayout/DashboardLayout';
import { fmNavItems, fmUserMenuItems } from '../config/navigation';
import { MarketplaceProvider } from '../context/MarketplaceContext';

const FMDashboardHome = lazy(() => import('../dashboard/pages/FMDashboardHome'));
const FMTenantsPage = lazy(() => import('../dashboard/pages/FMTenantsPage'));
const FMPaymentsPage = lazy(() => import('../dashboard/pages/FMPaymentsPage'));
const FMPropertiesPage = lazy(() => import('../dashboard/pages/FMPropertiesPage'));
const FMPropertyManagementPage = lazy(() => import('../dashboard/pages/FMPropertyManagementPage'));
const FMTimelinePage = lazy(() => import('../dashboard/pages/FMTimelinePage'));
const FMMarketplacePage = lazy(() => import('../dashboard/pages/FMMarketplacePage'));
const FMProductDetailPage = lazy(() => import('../dashboard/pages/FMProductDetailPage'));
const FMCartPage = lazy(() => import('../dashboard/pages/FMCartPage'));
const FMComingSoonPage = lazy(() => import('../dashboard/pages/FMComingSoonPage'));
const FMEnergyParkingPage = lazy(() => import('../dashboard/pages/FMEnergyParkingPage'));
const FMCommercialFacilitiesPage = lazy(() => import('../dashboard/pages/FMCommercialFacilitiesPage'));
const FMServicesPage = lazy(() => import('../dashboard/pages/FMServicesPage'));
const FMSettingsPage = lazy(() => import('../dashboard/pages/FMSettingsPage'));
const FMSubscriptionPage = lazy(() => import('../dashboard/pages/FMSubscriptionPage'));
const FMCommunicationPage = lazy(() => import('../dashboard/pages/FMCommunicationPage'));

export function FacilityManagementDashboardRoutes() {
    return (
        <Route
            path="facility-management/dashboard"
            element={
                /* <RequireAuth> */
                <MarketplaceProvider>
                    <DashboardLayout
                        navItems={fmNavItems}
                        userMenuItems={fmUserMenuItems}
                        logoLink="/facility-management/dashboard"
                    />
                </MarketplaceProvider>
                /* </RequireAuth> */
            }
        >
            <Route index element={<FMDashboardHome />} />
            <Route path="tenants" element={<FMTenantsPage />} />
            <Route path="payments" element={<FMPaymentsPage />} />
            <Route path="timeline" element={<FMTimelinePage />} />
            <Route path="properties" element={<FMPropertiesPage />} />
            <Route path="property-management" element={<FMPropertyManagementPage />} />
            <Route path="energy-parking" element={<FMEnergyParkingPage />} />
            <Route path="commercial-facilities" element={<FMCommercialFacilitiesPage />} />
            <Route path="communication" element={<FMCommunicationPage />} />
            <Route path="services" element={<FMServicesPage />} />
            <Route path="marketplace" element={<FMMarketplacePage />} />
            <Route path="marketplace/product/:id" element={<FMProductDetailPage />} />
            <Route path="marketplace/cart" element={<FMCartPage />} />
            <Route path="subscription" element={<FMSubscriptionPage />} />
            <Route path="settings" element={<FMSettingsPage />} />
            <Route path="profile" element={<FMSettingsPage />} />
            <Route path="*" element={<FMComingSoonPage />} />
        </Route>
    );
}
