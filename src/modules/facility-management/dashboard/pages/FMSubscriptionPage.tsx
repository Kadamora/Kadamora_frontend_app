import { useState } from 'react';
import {
    FiHome,
    FiGrid,
    FiTool,
    FiLayers,
    FiAward,
} from 'react-icons/fi';
import FreeServicesCard from '@shared/components/Subscription/FreeServicesCard';
import SubscriptionServiceCard from '@shared/components/Subscription/SubscriptionServiceCard';
import PricingAccordion from '@shared/components/Subscription/PricingAccordion';
import type { BillingCycle } from '@shared/components/Subscription/pricing';
import FloatingChatButton from '@shared/components/Dashboard/FloatingChatButton';
import { showSuccessToast } from '@shared/components/Toast/Toast';
import PaymentModal from '../../../real-estate/dashboard/subscription/component/PaymentModal';
import { fmPricingTiers } from '../../data/subscriptionMock';

export default function FMSubscriptionPage() {
    const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');
    const [isFmActive, setIsFmActive] = useState(true);
    const [selectedTierId, setSelectedTierId] = useState<string>('tier-estate-plan');

    // Collapsed service cards toggle states
    const [isPropertyActive, setIsPropertyActive] = useState(false);
    const [isConstructionActive, setIsConstructionActive] = useState(false);
    const [isTwoServicesActive, setIsTwoServicesActive] = useState(false);
    const [isPremiumActive, setIsPremiumActive] = useState(false);

    // Payment Modal
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);

    // Price calculation
    const currentTier = fmPricingTiers.find((t) => t.id === selectedTierId);
    // const basePrice = currentTier ? currentTier.prices[billingCycle] : 475000;
    // In screenshot it shows: "Proceed to Pay 475,000"
    const displayAmount = 475000;

    const handleProceedPayment = async () => {
        setIsPaymentProcessing(true);
        await new Promise((r) => setTimeout(r, 800));
        setIsPaymentProcessing(false);
        setIsPaymentModalOpen(false);
        showSuccessToast(
            'Payment Successful',
            `Your subscription for ${currentTier?.name || 'Facility Management'} has been activated!`
        );
    };

    return (
        <div className="space-y-6 pb-28 animate-fade-in">
            {/* Header with Title and Billing Cycle Radio Group */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-[#002E62]">
                        Subscription
                    </h1>
                    <p className="text-xs sm:text-sm text-[#71717A] mt-0.5">
                        All Subscription
                    </p>
                </div>

                {/* Billing Cycle Radio Options (Monthly, Quarterly, Annually) */}
                <div className="flex items-center gap-6">
                    {(['monthly', 'quarterly', 'annually'] as const).map((cycle) => {
                        const isSelected = billingCycle === cycle;
                        return (
                            <label
                                key={cycle}
                                className="flex items-center gap-2 cursor-pointer group"
                            >
                                <div
                                    className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                                        isSelected
                                            ? 'border-[#12B76A]'
                                            : 'border-[#CBD5E1] group-hover:border-[#94A3B8]'
                                    }`}
                                >
                                    {isSelected && (
                                        <div className="w-2 h-2 rounded-full bg-[#12B76A]" />
                                    )}
                                </div>
                                <span
                                    className={`text-xs sm:text-sm capitalize transition-colors ${
                                        isSelected
                                            ? 'text-[#002E62] font-semibold'
                                            : 'text-[#64748B]'
                                    }`}
                                >
                                    {cycle}
                                </span>
                                <input
                                    type="radio"
                                    name="billingCycle"
                                    value={cycle}
                                    checked={isSelected}
                                    onChange={() => setBillingCycle(cycle)}
                                    className="hidden"
                                />
                            </label>
                        );
                    })}
                </div>
            </div>

            {/* Card 1: Free Services Card */}
            <FreeServicesCard />

            {/* Paid Service Cards List */}
            <div className="space-y-4">
                {/* Card 2: Facility Management (Expanded Accordion) */}
                <SubscriptionServiceCard
                    title="Facility Management"
                    description="Subscribe to exactly what you need. Manage your space, book services, or build projects—all in one place"
                    icon={<FiHome className="h-5 w-5" />}
                    active={isFmActive}
                    onToggle={() => setIsFmActive(!isFmActive)}
                >
                    <PricingAccordion
                        open={isFmActive}
                        pricing={fmPricingTiers}
                        billingCycle={billingCycle}
                        selectedTierId={selectedTierId}
                        onSelectTier={(tierId) =>
                            setSelectedTierId(selectedTierId === tierId ? '' : tierId)
                        }
                    />
                </SubscriptionServiceCard>

                {/* Card 3: Property Management (Collapsed) */}
                <SubscriptionServiceCard
                    title="Property Management"
                    description="Subscribe to exactly what you need. Manage your space, book services, or build projects—all in one place"
                    icon={<FiGrid className="h-5 w-5" />}
                    active={isPropertyActive}
                    onToggle={() => setIsPropertyActive(!isPropertyActive)}
                />

                {/* Card 4: Project and Construction Management (Collapsed) */}
                <SubscriptionServiceCard
                    title="Project and Construction Management"
                    description="Subscribe to exactly what you need. Manage your space, book services, or build projects—all in one place"
                    icon={<FiTool className="h-5 w-5" />}
                    active={isConstructionActive}
                    onToggle={() => setIsConstructionActive(!isConstructionActive)}
                />

                {/* Card 5: Up to 2 Services from 3 (Collapsed) */}
                <SubscriptionServiceCard
                    title="Up to 2 Services from 3"
                    description="Subscribe to exactly what you need. Manage your space, book services, or build projects—all in one place"
                    icon={<FiLayers className="h-5 w-5" />}
                    active={isTwoServicesActive}
                    onToggle={() => setIsTwoServicesActive(!isTwoServicesActive)}
                />

                {/* Card 6: Premium access(All 3 services) (Collapsed) */}
                <SubscriptionServiceCard
                    title="Premium access(All 3 services)"
                    description="Subscribe to exactly what you need. Manage your space, book services, or build projects—all in one place"
                    icon={<FiAward className="h-5 w-5" />}
                    active={isPremiumActive}
                    onToggle={() => setIsPremiumActive(!isPremiumActive)}
                />
            </div>

            {/* Bottom Sticky Payment Bar */}
            <div className="fixed bottom-0 right-0 left-0 bg-white/95 backdrop-blur-md border-t border-[#E2E8F0] p-4 shadow-lg z-20">
                <div className="max-w-7xl mx-auto flex justify-end items-center px-4">
                    <button
                        type="button"
                        onClick={() => setIsPaymentModalOpen(true)}
                        className="bg-[#002E62] hover:bg-[#072440] text-white px-8 py-3 rounded-xl font-bold text-sm sm:text-base transition-colors cursor-pointer shadow-md flex items-center gap-2"
                    >
                        <span>Proceed to Pay</span>
                        <span>{displayAmount.toLocaleString()}</span>
                    </button>
                </div>
            </div>

            {/* Payment Modal */}
            <PaymentModal
                isOpen={isPaymentModalOpen}
                isLoading={isPaymentProcessing}
                onClose={() => setIsPaymentModalOpen(false)}
                onProceed={handleProceedPayment}
            />

            {/* Floating Chat FAB */}
            <FloatingChatButton />
        </div>
    );
}
