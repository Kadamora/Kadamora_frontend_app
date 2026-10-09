import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router';
import { LazyErrorBoundary, EnhancedPageLoader } from '@shared/lib/lazyLoading';

//  Shared layouts & guards 
import AuthLayout from '@shared/layouts/AuthLayout/AuthLayout';
import AdminAuthLayout from '@shared/layouts/AuthLayout/AdminAuthLayout';
import RedirectIfAuthenticated from '@shared/guards/RedirectIfAuthenticated';

//  Real Estate module routes 
import { RealEstateLandingRoutes } from '@modules/real-estate/routes/landing';
import { RealEstateDashboardRoutes, RealEstateVerifyRoute } from '@modules/real-estate/routes/dashboard';
import { RealEstateAdminRoutes } from '@modules/real-estate/routes/admin';

//  Hospitality & Tours module routes 
import { HospitalityToursAuthRoutes } from '@modules/hospitality-tours/routes/auth';
import { HospitalityToursLandingRoutes } from '@modules/hospitality-tours/routes/landing';
import { HospitalityToursDashboardRoutes } from '@modules/hospitality-tours/routes/dashboard';

//  Shared auth pages 
const Login                = lazy(() => import('@shared/pages/auth/Login'));
const Signup               = lazy(() => import('@shared/pages/auth/Signup'));
const SignupVerify          = lazy(() => import('@shared/pages/auth/SignupVerify'));
const SignupVerified        = lazy(() => import('@shared/pages/auth/SignupVerified'));
const ForgotPassword       = lazy(() => import('@shared/pages/auth/ForgotPassword'));
const ForgotPasswordVerify = lazy(() => import('@shared/pages/auth/ForgotPasswordVerify'));
const ResetPassword        = lazy(() => import('@shared/pages/auth/ResetPassword'));
const VerifyTenantAcceptance = lazy(() => import('@shared/pages/auth/VerifyTenantAcceptance'));

//  Admin auth pages 
const AdminLogin           = lazy(() => import('@shared/pages/auth/AdminLogin'));
const AdminForgotPassword  = lazy(() => import('@shared/pages/auth/AdminForgotPassword'));
const AdminResetPassword   = lazy(() => import('@shared/pages/auth/AdminResetPassword'));

//  Misc 
const NotFound = lazy(() => import('@shared/pages/misc/NotFound'));

// Loading fallback
function PageLoader() {
    return (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-white/80 backdrop-blur-sm">
            <div className="flex items-center space-x-3">
                <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin"></div>
                <span className="text-gray-600 font-medium">Loading page...</span>
            </div>
        </div>
    );
}

export default function AppRoutes() {
    return (
        <LazyErrorBoundary fallback={<EnhancedPageLoader />}>
            <Suspense fallback={<PageLoader />}>
                <Routes>
                    {/*  Real Estate: Landing */}
                    {RealEstateLandingRoutes()}

                    {/*  Real Estate: Verify subscription */}
                    {RealEstateVerifyRoute()}

                    {/*  Tenant acceptance (shared invite flow) */}
                    <Route path="verify-acceptance/:tenantId" element={<VerifyTenantAcceptance />} />

                    {/*  Shared: User Auth */}
                    <Route
                        path="auth"
                        element={
                            <RedirectIfAuthenticated>
                                <AuthLayout />
                            </RedirectIfAuthenticated>
                        }
                    >
                        <Route index element={<Login />} />
                        <Route path="login" element={<Login />} />
                        <Route path="signup" element={<Signup />} />
                        <Route path="signup/verify" element={<SignupVerify />} />
                        <Route path="signup/verified" element={<SignupVerified />} />
                        <Route path="forgot-password" element={<ForgotPassword />} />
                        <Route path="forgot-password/verify" element={<ForgotPasswordVerify />} />
                        <Route path="reset-password/:code" element={<ResetPassword />} />
                    </Route>

                    {/*  Shared: Admin Auth */}
                    <Route
                        path="admin/auth"
                        element={
                            <RedirectIfAuthenticated>
                                <AdminAuthLayout />
                            </RedirectIfAuthenticated>
                        }
                    >
                        <Route index element={<AdminLogin />} />
                        <Route path="login" element={<AdminLogin />} />
                        <Route path="forgot-password" element={<AdminForgotPassword />} />
                        <Route path="reset-password/:code" element={<AdminResetPassword />} />
                    </Route>

                    {/*  Real Estate: Dashboard */}
                    {RealEstateDashboardRoutes()}

                    {/*  Real Estate: Admin */}
                    {RealEstateAdminRoutes()}

                    {/*  Hospitality & Tours: Auth  */}
                    {HospitalityToursAuthRoutes()}

                    {/*  Hospitality & Tours: Landing */}
                    {HospitalityToursLandingRoutes()}

                    {/*  Hospitality & Tours: Dashboard */}
                    {HospitalityToursDashboardRoutes()}

                    {/* Catch-all */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Suspense>
        </LazyErrorBoundary>
    );
}

