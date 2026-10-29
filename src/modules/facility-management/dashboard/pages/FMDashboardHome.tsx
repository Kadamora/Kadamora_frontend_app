import { useState } from 'react';
import { useNavigate } from 'react-router';
import WelcomeBanner from '@shared/components/Dashboard/WelcomeBanner';
import StatCard from '@shared/components/Cards/StatCard';
import ActivityFeedCard from '@shared/components/Cards/ActivityFeedCard';
import QuickActionsCard from '@shared/components/Cards/QuickActionsCard';
import FloatingChatButton from '@shared/components/Dashboard/FloatingChatButton';
import EnergyConsumptionCard from '../../components/EnergyConsumptionCard';
import { mockActivities } from '../../data/mock';
import { useAppSelector } from '@store/hooks';
import {  MessageSquareText, Plus } from 'lucide-react';

export default function FMDashboardHome() {
    const navigate = useNavigate();
    const user = useAppSelector((s) => s.auth.user);
    const [bannerVisible, setBannerVisible] = useState(true);

    const displayName = user?.firstName
        ? `${user.firstName} ${user.lastName ?? ''}`.trim()
        : 'Charles John';

    return (
        <div className="space-y-6 pb-12">
            {/* Welcome banner */}
            {bannerVisible && (
                <WelcomeBanner
                    title={`Hi, ${displayName} 👋`}
                    description="Welcome aboard! We're thrilled to have you here. Our all-in-one real estate management system is built to simplify your workflow — from property listings and tenant communication to maintenance tracking and financial reporting."
                    onDismiss={() => setBannerVisible(false)}
                    dismissLabel="Okay, Got It"
                    className="bg-transparent mb-4"
                />
            )}

            {/* Main 2-column Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left Section: Stat cards + Energy chart */}
                <div className="lg:col-span-7 space-y-6">
                    {/* 4 Stat Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <StatCard
                            title="Expected Yearly Revenue"
                            value="NGN 2,450,000"
                            iconSrc="/assets/icons/yearlyRevenue.svg"
                            variant="comfortable"
                            onActionClick={() => navigate('/facility-management/dashboard/payments')}
                        />
                        <StatCard
                            title="Total Property"
                            value="04"
                            iconSrc="/assets/icons/totalProperty.svg"
                            variant="comfortable"
                            onActionClick={() => navigate('/facility-management/dashboard/properties')}
                        />
                        <StatCard
                            title="Total Energy Consumption"
                            value="15,657.00 Kwh"
                            iconSrc="/assets/icons/totalEnergy.svg"
                            variant="comfortable"
                            onActionClick={() => navigate('/facility-management/dashboard/energy-parking')}
                        />
                        <StatCard
                            title="Total Tenants"
                            value="25"
                            iconSrc="/assets/icons/totalTenants.svg"
                            variant="comfortable"
                            onActionClick={() => navigate('/facility-management/dashboard/tenants')}
                        />
                    </div>

                    {/* Energy Consumption Overview Chart */}
                    <EnergyConsumptionCard />
                </div>

                {/* Right Section: Activities + Quick actions */}
                <div className="lg:col-span-5 space-y-5">
                    <ActivityFeedCard
                        items={mockActivities}
                        title="Recent Activities"
                        compact={true}
                        onViewAll={() => navigate('/facility-management/dashboard/timeline')}
                    />

                    <QuickActionsCard
                        actions={[
                            {
                                id: 'new-request',
                                label: 'Create New Request',
                                icon: <Plus className="h-4 w-4" />,
                                onClick: () => navigate('/facility-management/dashboard/services'),
                            },
                            {
                                id: 'support',
                                label: 'Contact Support',
                                icon: <MessageSquareText className="h-4 w-4" />,
                                onClick: () => navigate('/facility-management/dashboard/communication'),
                            },
                        ]}
                    />
                </div>
            </div>

            {/* Floating Support Chat FAB */}
            <FloatingChatButton onClick={() => navigate('/facility-management/dashboard/communication')} />
        </div>
    );
}
