import { useState } from 'react';
import LandingPageContainer from '@components/container/LandingPage/LandingPageContainer';
import PropertyPricingAccordion from '../../Dashboard/subscription/component/PropertyPricingAccordion';
import type { PricingTier } from '../../Dashboard/subscription/component/pricing';
import { useGetAllSubscriptionPlansQuery } from '@store/api/subscription.api';
import type { SubscriptionPlan } from '@store/api/subscription.api';
import { Link } from 'react-router';
import { Fence } from 'lucide-react';

function mapPlanToTier(plan: SubscriptionPlan, index: number): PricingTier {
    const featureList: string[] = [];
    if (plan.maxProperties !== undefined) featureList.push(`${plan.maxProperties === 1000000 ? 'Unlimited' : plan.maxProperties} Max Properties`);
    if (plan.maxTenants !== undefined) featureList.push(`${plan.maxTenants} Max Tenants`);
    if (plan.canCreateRentListings) featureList.push(`Create Rent Listings`);
    if (plan.canCreateLeaseListings) featureList.push(`Create Lease Listings`);
    if (plan.canCreateSaleListings) featureList.push(`Create Sale Listings`);
    if (plan.canCreateShortLetListings) featureList.push(`Create Short Let Listings`);
    if (plan.canUsePremiumFeatures) featureList.push(`Premium Features`);
    if (plan.canUseAnalytics) featureList.push(`Analytics`);
    if (plan.canUsePrioritySupport) featureList.push(`Priority Support`);

    if (Array.isArray(plan.features)) {
        featureList.push(...plan.features);
    } else if (typeof plan.features === 'string') {
        featureList.push(plan.features);
    }

    return {
        id: plan.id,
        name: plan.displayName || plan.name,
        tierLabel: plan.tierLabel ?? ((plan.displayName?.includes('Plan') || plan.displayName?.includes('Commercial')) ? 'Tier' : `Tier ${index + 1}`),
        targetUsers: plan.targetUsers ?? plan.description ?? '—',
        features: featureList.length > 0 ? featureList : ['—'],
        prices: plan.prices ?? {
            monthly: Number(plan.monthlyPrice ?? 0),
            quarterly: Number(plan.quarterlyPrice ?? 0),
            annually: Number(plan.yearlyPrice ?? plan.annualPrice ?? 0),
        },
    };
}

function PricingSkeletonLoader() {
    return (
        <div className="animate-pulse mt-6 border border-[#E9F3EC] rounded-xl overflow-hidden shadow-sm">
            <div className="bg-[#F8FDF9] p-4 grid grid-cols-4 gap-4">
                <div className="h-5 bg-[#E9F3EC] rounded" />
                {[0, 1, 2].map((i) => (
                    <div key={i} className="h-5 bg-[#E9F3EC] rounded" />
                ))}
            </div>
            {[0, 1, 2].map((row) => (
                <div key={row} className="p-4 grid grid-cols-4 gap-4 border-t border-[#E9F3EC]">
                    <div className="h-4 bg-[#F8FDF9] rounded" />
                    {[0, 1, 2].map((col) => (
                        <div key={col} className="h-4 bg-[#F8FDF9] rounded" />
                    ))}
                </div>
            ))}
        </div>
    );
}

export default function Pricing() {
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'quarterly' | 'annually'>('monthly');

    const { data: plansData, isLoading: plansLoading, isError: plansError } = useGetAllSubscriptionPlansQuery();

    const rawPlans: SubscriptionPlan[] = Array.isArray(plansData?.data)
        ? plansData.data.filter((plan) => plan.name?.toLowerCase() !== 'free' && plan.displayName !== 'Free Plan')
        : [];
    const mappedPricing: PricingTier[] = rawPlans.map(mapPlanToTier);

    return (
        <LandingPageContainer>
            {/* Top Pattern Background Section */}
            <div className="relative border-b border-[#E9E9E9] bg-[#F8FDFC] pt-12 pb-24 overflow-hidden">
                {/* Thin vertical grid lines mimicking the image */}
                <div className="absolute inset-0 z-0 flex justify-between px-10 opacity-30 pointer-events-none">
                    <div className="w-px h-full bg-[#D1EBD9]"></div>
                    <div className="w-px h-full bg-[#D1EBD9]"></div>
                    <div className="w-px h-full bg-[#D1EBD9]"></div>
                    <div className="w-px h-full bg-[#D1EBD9]"></div>
                    <div className="w-px h-full bg-[#D1EBD9]"></div>
                </div>
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row md:items-end justify-between">
                    <div>
                        <h1 className="text-[54px] font-bold text-[#002E62]">Pricing Plan</h1>
                    </div>
                    {/* Billing Cycle Toggle */}
                    <div className="flex items-center gap-6 mt-6 md:mt-0 pb-4">
                        {(['monthly', 'quarterly', 'annually'] as const).map((cycle) => (
                            <label key={cycle} className="flex items-center gap-2 cursor-pointer">
                                <div className={`w-[18px] h-[18px] rounded-full border-[1.5px] flex items-center justify-center ${billingCycle === cycle ? 'border-[#16C784]' : 'border-gray-400'}`}>
                                    {billingCycle === cycle && <div className="w-2.5 h-2.5 rounded-full bg-[#16C784]" />}
                                </div>
                                <span className={`text-[15px] capitalize font-medium ${billingCycle === cycle ? 'text-[#001731]' : 'text-[#475467]'}`}>
                                    {cycle}
                                </span>
                                <input type="radio" name="billing" className="hidden" checked={billingCycle === cycle} onChange={() => setBillingCycle(cycle)} />
                            </label>
                        ))}
                    </div>
                </div>
            </div>

            {/* Pricing Section Overlaying the grid background slightly */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20 pb-24">
                
                {plansError && (
                    <div role="alert" className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
                        Failed to load subscription plans. Please refresh and try again.
                    </div>
                )}

                <div className="bg-white rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-[#E4E7EC] p-6 mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="h-10 w-10 rounded bg-[#F0FDF4] flex items-center justify-center text-[#16C784]">
                            <Fence size={20} />
                        </div>
                        <div>
                            <h2 className="text-[17px] font-bold text-[#002E62]">Property Management</h2>
                            <p className="text-[#71717A] text-[13px] mt-0.5">Subscribe to exactly what you need. Manage your space, book services, or build projects—all in one place</p>
                        </div>
                        <div className="ml-auto">
                            <div className="w-10 h-5 bg-[#16C784] rounded-full flex items-center justify-end px-0.5 opacity-90">
                                <div className="w-4 h-4 bg-white rounded-full"></div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6">
                        {plansLoading ? (
                            <PricingSkeletonLoader />
                        ) : (
                            <PropertyPricingAccordion
                                open={true}
                                pricing={mappedPricing}
                                billingCycle={billingCycle}
                                onSelectTier={() => console.log('selected tier')}
                            />
                        )}
                    </div>
                </div>

                <div className="flex justify-end">
                    <Link
                        to="/auth/signup"
                        className="bg-[#002E62] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#002E62]/90 transition-colors shadow-sm"
                    >
                        Get Started Now
                    </Link>
                </div>
            </div>
        </LandingPageContainer>
    );
}
