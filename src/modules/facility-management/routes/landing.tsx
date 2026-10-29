import { lazy } from 'react';
import { Route } from 'react-router';

const FMLandingPage = lazy(() => import('../landing/FMLandingPage'));

/** Public / landing routes for the Facility Management vertical */
export function FacilityManagementLandingRoutes() {
    return (
        <>
            <Route path="facility-management" element={<FMLandingPage />} />
            <Route path="services/facility-management" element={<FMLandingPage />} />
        </>
    );
}
