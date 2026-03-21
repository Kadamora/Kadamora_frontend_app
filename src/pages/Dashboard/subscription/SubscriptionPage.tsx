import { useState } from 'react';
import PaymentModal from './component/PaymentModal';
import PaymentMethodModal from './component/PaymentMethodModal';
import BankTransferModal from './component/BankTransferModal';
import CreditCardModal from './component/CreditCardModal';
import { CircleCheckBig, Fence } from 'lucide-react';
import type { PricingTier } from './component/pricing';
import SubscriptionServiceCard from './component/SubscriptionServiceCard';
import PropertyPricingAccordion from './component/PropertyPricingAccordion';
import { useGetAllSubscriptionPlansQuery, useSubscribeToPlanMutation, useInitializeSubscriptionMutation } from '@store/api/subscription.api';
import type { SubscriptionPlan } from '@store/api/subscription.api';

/* -------------------------------------------------------
   Helper: map API plan → PricingTier used by accordion
-------------------------------------------------------- */
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

    // Fallback if the API ever provides a raw string array in `features` or simple string
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

/* -------------------------------------------------------
   Skeleton loader for the pricing accordion area
-------------------------------------------------------- */
function PricingSkeletonLoader() {
    return (
        <div className="animate-pulse mt-6 border border-gray-200 rounded-xl overflow-hidden">
            <div className="bg-gray-100 p-4 grid grid-cols-4 gap-4">
                <div className="h-5 bg-gray-200 rounded" />
                {[0, 1, 2].map((i) => (
                    <div key={i} className="h-5 bg-gray-200 rounded" />
                ))}
            </div>
            {[0, 1, 2].map((row) => (
                <div key={row} className="p-4 grid grid-cols-4 gap-4 border-t border-gray-100">
                    <div className="h-4 bg-gray-100 rounded" />
                    {[0, 1, 2].map((col) => (
                        <div key={col} className="h-4 bg-gray-100 rounded" />
                    ))}
                </div>
            ))}
        </div>
    );
}

/* -------------------------------------------------------
   Skeleton loader for the whole services section
-------------------------------------------------------- */
function ServiceCardSkeletonLoader() {
    return (
        <div className="animate-pulse bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-200 shrink-0" />
                <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-1/3" />
                    <div className="h-3 bg-gray-100 rounded w-2/3" />
                </div>
                <div className="w-11 h-5 rounded-full bg-gray-200" />
            </div>
        </div>
    );
}

const SubscriptionPage = () => {
    const [modalStep, setModalStep] = useState<'none' | 'info' | 'method' | 'bank_transfer' | 'credit_card'>('none');
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'quarterly' | 'annually'>('monthly');
    const [activeService, setActiveService] = useState<string | null>(null);
    const [selectedPropertyTier, setSelectedPropertyTier] = useState<string | null>(null);
    const [subscribeError, setSubscribeError] = useState<string | null>(null);
    const [subscribeSuccess, setSubscribeSuccess] = useState(false);

    /* ---- API ---- */
    const { data: plansData, isLoading: plansLoading, isError: plansError } = useGetAllSubscriptionPlansQuery();
    const [subscribeToPlan, { isLoading: subscribing }] = useSubscribeToPlanMutation();
    const [initializeSubscription, { isLoading: initializing }] = useInitializeSubscriptionMutation();

    const rawPlans: SubscriptionPlan[] = Array.isArray(plansData?.data)
        ? plansData.data.filter((plan) => plan.name?.toLowerCase() !== 'free' && plan.displayName !== 'Free Plan')
        : [];
    const mappedPricing: PricingTier[] = rawPlans.map(mapPlanToTier);

    /* ---- Computed total ---- */
    const totalAmount = (() => {
        if (!selectedPropertyTier) return 0;
        const tier = mappedPricing.find((t) => t.id === selectedPropertyTier);
        return tier ? tier.prices[billingCycle] : 0;
    })();

    /* ---- Handle payment initialization ---- */
    const handleInitializePayment = async () => {
        if (!selectedPropertyTier) return;
        setSubscribeError(null);
        try {
            const frequency = billingCycle.toUpperCase() as "MONTHLY" | "QUARTERLY" | "ANNUALLY";
            const res = await initializeSubscription({
                planId: selectedPropertyTier,
                frequency,
            }).unwrap();

            const responseData = res?.data;
            console.log("response data", responseData)

            if (responseData?.paymentUrl) {
                window.location.href = responseData.paymentUrl;
            } else if (responseData?.authorization_url || responseData?.authorizationUrl) {
                window.location.href = responseData.authorization_url || responseData.authorizationUrl;
            } else if (responseData?.checkoutUrl) {
                window.location.href = responseData.checkoutUrl;
            } else if (typeof responseData === 'string') {
                try {
                    new URL(responseData);
                    window.location.href = responseData;
                } catch {
                    setSubscribeSuccess(true);
                    setModalStep('none');
                    setActiveService(null);
                }
            } else {
                setSubscribeSuccess(true);
                setModalStep('none');
                setActiveService(null);
            }
        } catch (err: any) {
            const msg =
                err?.data?.message ?? err?.message ?? 'Payment initialization failed. Please try again.';
            setSubscribeError(msg);
            setModalStep('none');
        }
    };

    /* ---- Handle final payment confirm (Fallback if needed) ---- */
    const handleConfirmPayment = async () => {
        if (!selectedPropertyTier) return;
        setSubscribeError(null);
        try {
            await subscribeToPlan({
                planId: selectedPropertyTier,
                billingCycle,
            }).unwrap();
            setSubscribeSuccess(true);
            setModalStep('none');
            setSelectedPropertyTier(null);
            setActiveService(null);
        } catch (err: any) {
            const msg =
                err?.data?.message ?? err?.message ?? 'Subscription failed. Please try again.';
            setSubscribeError(msg);
        }
    };

    const services = [
        {
            id: 'property',
            title: 'Property Management',
            description: 'Subscribe to exactly what you need. Manage your space, book services, or build projects—all in one place',
            icon: <Fence size={20} />,
            active: false,
        },
    ];

    return (
        <div className="min-h-screen py-8 pb-32">
            <div className="max-w-full mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-[var(--color-secondary)]">Subscription</h1>
                        <p className="text-gray-500 text-sm mt-1">All Subscription</p>
                    </div>

                    {/* Billing Cycle Toggle */}
                    <div className="flex items-center gap-4 mt-4 md:mt-0">
                        {(['monthly', 'quarterly', 'annually'] as const).map((cycle) => (
                            <label key={cycle} className="flex items-center gap-2 cursor-pointer">
                                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${billingCycle === cycle ? 'border-[var(--color-primary)]' : 'border-gray-300'}`}>
                                    {billingCycle === cycle && <div className="w-2 h-2 rounded-full bg-[var(--color-primary)]" />}
                                </div>
                                <span className={`text-sm capitalize ${billingCycle === cycle ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>{cycle}</span>
                                <input type="radio" name="billing" className="hidden" checked={billingCycle === cycle} onChange={() => setBillingCycle(cycle)} />
                            </label>
                        ))}
                    </div>
                </div>

                {/* Success banner */}
                {subscribeSuccess && (
                    <div className="mb-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700 flex items-center gap-2">
                        <CircleCheckBig size={18} className="shrink-0" />
                        You have successfully subscribed! Your plan is now active.
                    </div>
                )}

                {/* Error banner */}
                {subscribeError && (
                    <div role="alert" className="mb-6 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
                        {subscribeError}
                    </div>
                )}

                {/* Free Services Card */}
                {/* <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-8 relative overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--color-primary)] rounded-r-full"></div>
                    <h2 className="text-lg font-bold text-[var(--color-secondary)] mb-2">Free Services</h2>
                    <p className="text-gray-500 text-sm mb-6">Subscribe to exactly what you need. Manage your space, book services, or build projects—all in one place</p>

                    <div className="grid gap-3">
                        {[
                            'Hospitality and Tours',
                            'Procurement and Supply',
                            'Property listing for sale/rent/short stay lease',
                            'Equipment listing for rent & sale',
                            'Equipment services and spare parts sales',
                            'Professional services'
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <CircleCheckBig className="text-[var(--color-primary)]" size={20} />
                                <span className="text-black text-sm font-medium">{item}</span>
                            </div>
                        ))}
                    </div>
                </div> */}

                {/* API error state */}
                {plansError && (
                    <div role="alert" className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
                        Failed to load subscription plans. Please refresh and try again.
                    </div>
                )}

                {/* Paid Services List */}
                <div className="space-y-4">
                    {plansLoading ? (
                        <>
                            <ServiceCardSkeletonLoader />
                            <ServiceCardSkeletonLoader />
                        </>
                    ) : (
                        services.map((service) => {
                            const isOpen = activeService === service.id;
                            return (
                                <SubscriptionServiceCard
                                    key={service.id}
                                    title={service.title}
                                    description={service.description}
                                    icon={service.icon}
                                    active={isOpen}
                                    onToggle={() => setActiveService(isOpen ? null : service.id)}
                                >
                                    {service.id === 'property' && (
                                        plansLoading ? (
                                            <PricingSkeletonLoader />
                                        ) : (
                                            <PropertyPricingAccordion
                                                open={isOpen}
                                                pricing={mappedPricing}
                                                billingCycle={billingCycle}
                                                selectedTierId={selectedPropertyTier ?? undefined}
                                                onSelectTier={(tierId) =>
                                                    setSelectedPropertyTier((prev) =>
                                                        prev === tierId ? null : tierId
                                                    )
                                                }
                                            />
                                        )
                                    )}
                                </SubscriptionServiceCard>
                            );
                        })
                    )}
                </div>

                {/* Bottom Bar */}
                <div className="fixed bottom-0 right-0 left-0  bg-white border-t border-gray-100 p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-20">
                    <div className="max-w-6xl mx-auto flex justify-end items-center">
                        <button
                            onClick={() => setModalStep('info')}
                            disabled={!totalAmount || subscribing}
                            className="bg-[var(--color-secondary)] disabled:opacity-50 text-white px-8 py-3 rounded-lg font-semibold"
                        >
                            Proceed to Pay{" "}
                            <span className="font-bold ml-1">
                                ₦{totalAmount.toLocaleString()}
                            </span>
                        </button>
                    </div>
                </div>

                <PaymentModal
                    isOpen={modalStep === 'info'}
                    isLoading={initializing}
                    onClose={() => setModalStep('none')}
                    onProceed={handleInitializePayment}
                />

                <PaymentMethodModal
                    isOpen={modalStep === 'method'}
                    onClose={() => setModalStep('none')}
                    amount={totalAmount}
                    onNext={(method) => {
                        if (method === 'bank_transfer') {
                            setModalStep('bank_transfer');
                        } else if (method === 'credit_card') {
                            setModalStep('credit_card');
                        }
                    }}
                />

                <BankTransferModal
                    isOpen={modalStep === 'bank_transfer'}
                    onClose={() => setModalStep('none')}
                    amount={totalAmount}
                    onConfirm={handleConfirmPayment}
                />

                <CreditCardModal
                    isOpen={modalStep === 'credit_card'}
                    onClose={() => setModalStep('none')}
                    amount={totalAmount}
                    onPay={handleConfirmPayment}
                />
            </div>
        </div>
    );
};

export default SubscriptionPage;