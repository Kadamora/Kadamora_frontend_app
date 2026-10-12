import { lazy } from 'react';
import { Route } from 'react-router';
import AuthLayout from '@shared/layouts/AuthLayout/AuthLayout';
import RedirectIfAuthenticated from '@shared/guards/RedirectIfAuthenticated';
import { tourAuth, HTLogo } from '../auth/assets';

const HTLogin                = lazy(() => import('../auth/pages/Login'));
const HTSignup               = lazy(() => import('../auth/pages/Signup'));
const HTForgotPassword       = lazy(() => import('../auth/pages/ForgotPassword'));
const HTForgotPasswordVerify = lazy(() => import('../auth/pages/ForgotPasswordVerify'));
const HTResetPassword        = lazy(() => import('../auth/pages/ResetPassword'));

/** Auth routes for the Hospitality & Tours vertical.
 *  Uses the shared AuthLayout with Hospitality & Tours branding (HTLogo & tourAuth image). */
export function HospitalityToursAuthRoutes() {
    return (
        <Route
            path="hospitality-tours/auth"
            element={
                <RedirectIfAuthenticated>
                    <AuthLayout leftImage={tourAuth} logoImage={HTLogo} />
                </RedirectIfAuthenticated>
            }
        >
            <Route index element={<HTLogin />} />
            <Route path="login" element={<HTLogin />} />
            <Route path="signup" element={<HTSignup />} />
            <Route path="forgot-password" element={<HTForgotPassword />} />
            <Route path="forgot-password/verify" element={<HTForgotPasswordVerify />} />
            <Route path="reset-password/:code" element={<HTResetPassword />} />
            <Route path="reset-password" element={<HTResetPassword />} />
        </Route>
    );
}
