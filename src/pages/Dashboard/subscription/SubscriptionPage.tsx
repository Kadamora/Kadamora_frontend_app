import { useState } from 'react';
import PaymentModal from './component/PaymentModal';
import { CircleCheckBig, Fence } from 'lucide-react';
import type { PricingTier } from './component/pricing';
import SubscriptionServiceCard from './component/SubscriptionServiceCard';
import PropertyPricingAccordion from './component/PropertyPricingAccordion';

export const PROPERTY_PRICING: PricingTier[] = [
    {
        id: "basic",
        name: "Basics",
        tierLabel: "Tier 1",
        targetUsers: "Owner/Agent 1–5 units",
        features: "Admin panel, tenant directory, maintenance",
        prices: {
            monthly: 3000,
            quarterly: 10000,
            annually: 25000,
        },
    },
    {
        id: "commercial",
        name: "Commercial Basic",
        tierLabel: "Tier 2",
        targetUsers: "Small buildings (5–15 offices/shops)",
        features: "Admin panel, tenant directory, maintenance",
        prices: {
            monthly: 20000,
            quarterly: 45000,
            annually: 165000,
        },
    },
    {
        id: "commercial-premium",
        name: "Commercial Premium",
        tierLabel: "Tier 3",
        targetUsers: "Developers/Construction companies/ Large buildings (15+ offices/shops)",
        features: "All features + service contracts + analytics",
        prices: {
            monthly: 50000,
            quarterly: 140000,
            annually: 520000,
        },
    },
];

const SubscriptionPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'quarterly' | 'annually'>('monthly');
    const [activeService, setActiveService] = useState<string | null>(null);
    const [selectedPropertyTier, setSelectedPropertyTier] = useState<string | null>(null);
    const totalAmount = (() => {
        let total = 0;

        if (activeService === "property" && selectedPropertyTier) {
            const tier = PROPERTY_PRICING.find(
                (t) => t.id === selectedPropertyTier
            );
            if (tier) {
                total += tier.prices[billingCycle];
            }
        }

        return total;
    })();
    const services = [
        // {
        //     id: 'facility',
        //     title: 'Facility Management',
        //     description: 'Subscribe to exactly what you need. Manage your space, book services, or build projects—all in one place',
        //     icon: <Home size={20} />,
        //     active: false
        // },
        {
            id: 'property',
            title: 'Property Management',
            description: 'Subscribe to exactly what you need. Manage your space, book services, or build projects—all in one place',
            icon: <Fence size={20} />,
            active: false
        },
        // {
        //     id: 'project',
        //     title: 'Project and Construction Management',
        //     description: 'Subscribe to exactly what you need. Manage your space, book services, or build projects—all in one place',
        //     icon: <HardHat size={20} />,
        //     active: false
        // },
        // {
        //     id: 'upto2',
        //     title: 'Up to 2 Services from 3',
        //     description: 'Subscribe to exactly what you need. Manage your space, book services, or build projects—all in one place',
        //     icon: <Layers size={20} />,
        //     active: false
        // },
        // {
        //     id: 'premium',
        //     title: 'Premium access(All 3 services)',
        //     description: 'Subscribe to exactly what you need. Manage your space, book services, or build projects—all in one place',
        //     icon: <Star size={20} />,
        //     active: false
        // }
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
                        <label className="flex items-center gap-2 cursor-pointer">
                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${billingCycle === 'monthly' ? 'border-[var(--color-primary)]' : 'border-gray-300'}`}>
                                {billingCycle === 'monthly' && <div className="w-2 h-2 rounded-full bg-[var(--color-primary)]" />}
                            </div>
                            <span className={`text-sm ${billingCycle === 'monthly' ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>Monthly</span>
                            <input type="radio" name="billing" className="hidden" checked={billingCycle === 'monthly'} onChange={() => setBillingCycle('monthly')} />
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${billingCycle === 'quarterly' ? 'border-[var(--color-primary)]' : 'border-gray-300'}`}>
                                {billingCycle === 'quarterly' && <div className="w-2 h-2 rounded-full bg-[var(--color-primary)]" />}
                            </div>
                            <span className={`text-sm ${billingCycle === 'quarterly' ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>Quarterly</span>
                            <input type="radio" name="billing" className="hidden" checked={billingCycle === 'quarterly'} onChange={() => setBillingCycle('quarterly')} />
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${billingCycle === 'annually' ? 'border-[var(--color-primary)]' : 'border-gray-300'}`}>
                                {billingCycle === 'annually' && <div className="w-2 h-2 rounded-full bg-[var(--color-primary)]" />}
                            </div>
                            <span className={`text-sm ${billingCycle === 'annually' ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>Annually</span>
                            <input type="radio" name="billing" className="hidden" checked={billingCycle === 'annually'} onChange={() => setBillingCycle('annually')} />
                        </label>
                    </div>
                </div>

                {/* Free Services Card */}
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-8 relative overflow-hidden">
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
                </div>

                {/* Paid Services List */}
                {/* <div className="space-y-4">
                    {services.map((service) => (
                        <div key={service.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-start gap-4 hover:shadow-md transition-shadow">
                            <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-[var(--color-primary-600)] flex-shrink-0">
                                {service.icon}
                            </div>
                            <div className="flex-1">
                                <h3 className="text-base font-bold text-[var(--color-secondary)]">{service.title}</h3>
                                <p className="text-gray-400 text-sm mt-1">{service.description}</p>
                            </div>
                            <div className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" />
                                <div className="w-11 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--color-primary)]"></div>
                            </div>
                        </div>
                    ))}
                </div> */}
                <div className="space-y-4">
                    {services.map((service) => {
                        const isOpen = activeService === service.id;

                        return (
                            <SubscriptionServiceCard
                                title={service.title}
                                description={service.description}
                                icon={service.icon}
                                active={isOpen}
                                onToggle={() => setActiveService(isOpen ? null : service.id)}
                            >
                                {service.id === "property" && (
                                    <PropertyPricingAccordion
                                        open={isOpen}
                                        pricing={PROPERTY_PRICING}
                                        billingCycle={billingCycle}
                                        selectedTierId={selectedPropertyTier ?? undefined}
                                        onSelectTier={setSelectedPropertyTier}
                                    />
                                )}
                            </SubscriptionServiceCard>

                        );
                    })}
                </div>


                {/* Bottom Bar */}
                <div className="  mt-6 ">
                    <div className="flex justify-end items-center ">
                        {/* <button 
                            onClick={() => setIsModalOpen(true)}
                            className="bg-[var(--color-secondary)] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#1a2548] transition-colors flex items-center gap-2 shadow-lg shadow-blue-900/20"
                        >
                            Proceed to Pay <span className="font-bold ml-1">475,000</span>
                        </button> */}
                        <button
                            onClick={() => setIsModalOpen(true)}
                            disabled={!totalAmount}
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
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                />
            </div>
        </div>
    );
};

export default SubscriptionPage;