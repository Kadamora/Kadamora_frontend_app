import { FiCheckCircle } from 'react-icons/fi';
import type { BillingCycle, PricingTier } from './pricing';

export interface PricingAccordionProps {
    open: boolean;
    pricing: PricingTier[];
    billingCycle: BillingCycle;
    selectedTierId?: string;
    onSelectTier: (tierId: string) => void;
    className?: string;
}

export default function PricingAccordion({
    open,
    pricing,
    selectedTierId,
    onSelectTier,
    className = '',
}: PricingAccordionProps) {
    if (!open) return null;

    return (
        <div className={`overflow-x-auto rounded-xl border border-[#A2E9C1] ${className}`}>
            <table className="w-full text-xs sm:text-sm border-collapse">
                <thead>
                    <tr className="bg-[#EBFBF3] border-b border-[#A2E9C1]">
                        <th className="p-4 w-32 sm:w-40 text-left font-bold text-[#002E62]" />
                        {pricing.map((tier) => {
                            const isSelected = selectedTierId === tier.id;
                            return (
                                <th
                                    key={tier.id}
                                    className="p-4 text-left border-l border-[#A2E9C1] min-w-[200px]"
                                >
                                    <div className="flex items-center justify-between gap-3">
                                        <div className="text-left">
                                            {tier.tierLabel && (
                                                <span className="text-[#12B76A] font-semibold">
                                                    {tier.tierLabel}:{' '}
                                                </span>
                                            )}
                                            <span className="font-bold text-[#002E62]">{tier.name}</span>
                                        </div>

                                        {/* Toggle button */}
                                        <button
                                            type="button"
                                            onClick={() => onSelectTier(tier.id)}
                                            role="switch"
                                            aria-checked={isSelected}
                                            aria-label={`Select ${tier.name}`}
                                            className={`relative w-11 h-5.5 rounded-full shrink-0 transition-colors duration-200 cursor-pointer ${
                                                isSelected ? 'bg-[#12B76A]' : 'bg-[#94A3B8]'
                                            }`}
                                        >
                                            <span
                                                className={`absolute top-0.5 left-0.5 h-4.5 w-4.5 rounded-full bg-white shadow-sm transition-transform duration-200 ${
                                                    isSelected ? 'translate-x-5.5' : 'translate-x-0'
                                                }`}
                                            />
                                        </button>
                                    </div>
                                </th>
                            );
                        })}
                    </tr>
                </thead>

                <tbody className="bg-white divide-y divide-[#A2E9C1]">
                    {/* Row 1: Target Users */}
                    <tr>
                        <td className="p-4 font-bold text-[#002E62] bg-[#F7FDF9] align-top">
                            Target Users
                        </td>
                        {pricing.map((tier) => (
                            <td key={tier.id} className="p-4 border-l border-[#A2E9C1] align-top">
                                <div className="flex items-start gap-2.5">
                                    <FiCheckCircle className="h-4 w-4 text-[#12B76A] shrink-0 mt-0.5" />
                                    <span className="text-[#334155] leading-relaxed">
                                        {tier.targetUsers}
                                    </span>
                                </div>
                            </td>
                        ))}
                    </tr>

                    {/* Row 2: Features */}
                    <tr>
                        <td className="p-4 font-bold text-[#002E62] bg-[#F7FDF9] align-top">
                            Features
                        </td>
                        {pricing.map((tier) => (
                            <td key={tier.id} className="p-4 border-l border-[#A2E9C1] align-top">
                                <div className="flex items-start gap-2.5">
                                    <FiCheckCircle className="h-4 w-4 text-[#12B76A] shrink-0 mt-0.5" />
                                    <div className="space-y-1.5 text-[#334155] leading-relaxed">
                                        {tier.features.map((feat, i) => (
                                            <div key={i}>{feat}</div>
                                        ))}
                                    </div>
                                </div>
                            </td>
                        ))}
                    </tr>

                    {/* Row 3: Pricing */}
                    <tr>
                        <td className="p-4 font-bold text-[#002E62] bg-[#F7FDF9] align-top">
                            Pricing
                        </td>
                        {pricing.map((tier) => (
                            <td key={tier.id} className="p-4 border-l border-[#A2E9C1] align-top">
                                <div className="space-y-2 text-[#334155]">
                                    <div className="flex items-center gap-2">
                                        <FiCheckCircle className="h-4 w-4 text-[#12B76A] shrink-0" />
                                        <span>Monthly: {tier.prices.monthly.toLocaleString()}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <FiCheckCircle className="h-4 w-4 text-[#12B76A] shrink-0" />
                                        <span>Quarterly: {tier.prices.quarterly.toLocaleString()}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <FiCheckCircle className="h-4 w-4 text-[#12B76A] shrink-0" />
                                        <span>Annual: {tier.prices.annually.toLocaleString()}</span>
                                    </div>
                                </div>
                            </td>
                        ))}
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
