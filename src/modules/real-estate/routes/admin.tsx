import { lazy } from 'react';
import { Route } from 'react-router';
import AdminDashboardLayout from '@shared/layouts/AdminDashboardLayout/AdminDashboardLayout';

const AdminDashboard      = lazy(() => import('../admin/Dashboard'));
const AdminAgentRealtor   = lazy(() => import('../admin/AgentRealtors'));
const AgentDetailsPage    = lazy(() => import('../admin/AgentRealtor/component/NewAgentDetailsPage'));
const AdminChat           = lazy(() => import('../admin/Chat'));

/** Admin routes for the Real Estate vertical — uses shared AdminDashboardLayout */
export function RealEstateAdminRoutes() {
    return (
        <Route path="admin" element={<AdminDashboardLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="home" element={<AdminDashboard />} />
            <Route path="chat" element={<AdminChat />} />
            <Route path="agents" element={<AdminAgentRealtor />} />
            <Route path="agents/:id" element={<AgentDetailsPage />} />
        </Route>
    );
}
