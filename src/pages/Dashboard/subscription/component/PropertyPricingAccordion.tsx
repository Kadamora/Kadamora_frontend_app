import { CircleCheckBig } from "lucide-react";
import type { BillingCycle, PricingTier } from "./pricing";

interface Props {
    open: boolean;
    pricing: PricingTier[];
    billingCycle: BillingCycle;
    selectedTierId?: string;
    onSelectTier: (tierId: string) => void;
    active?: boolean;
}

export default function PropertyPricingAccordion({
    open,
    pricing,
    onSelectTier,
    active,
}: Props) {
    return (
        <div
            className={`overflow-hidden transition-all duration-300 ${open ? "max-h-[600px] mt-6" : "max-h-0"
                }`}
        >
            <div className="border border-[#A2E9C1] rounded-xl bg-[#A2E9C1] overflow-hidden">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="text-primary-foreground">
                            <th className="p-4 w-36" />
                            {pricing.map((tier) => (
                                <th key={tier.id} className="p-4 text-left">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <span className="text-primary-100">{tier.tierLabel}: </span>
                                            <span className="font-semibold">{tier.name}</span>
                                        </div>
                                        <button
                                            onClick={() => onSelectTier(tier.id)}
                                            className={`relative w-11 h-5 rounded-full transition-colors ${active ? "bg-[var(--color-primary)]" : "bg-gray-300"
                                                }`}
                                        >
                                            <span
                                                className={`absolute top-[2px] left-[4px] h-4 w-4 rounded-full bg-white transition-transform ${active ? "translate-x-5" : ""
                                                    }`}
                                            />
                                        </button>
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody className="bg-white">

                        <tr className="border-b border-[#A2E9C1]">
                            <td className="p-4 font-medium text-muted-foreground bg-primary-50">
                                Target Users
                            </td>
                            {pricing.map((tier) => (
                                <td key={tier.id} className="p-4 border-l border-[#A2E9C1]">
                                    <div className="flex items-start gap-3">
                                        <CircleCheckBig />
                                        <span className="text-foreground">{tier.targetUsers}</span>
                                    </div>
                                </td>
                            ))}
                        </tr>

                        <tr className="border-b border-[#A2E9C1]">
                            <td className="p-4 font-medium text-muted-foreground bg-primary-50">
                                Features
                            </td>
                            {pricing.map((tier) => (
                                <td key={tier.id} className="p-4 border-l border-[#A2E9C1]">
                                    <div className="flex items-start gap-3">
                                        <CircleCheckBig />
                                        <span className="text-foreground">{tier.features}</span>
                                    </div>
                                </td>
                            ))}
                        </tr>

                        <tr>
                            <td className="p-4 font-medium text-muted-foreground bg-primary-50">
                                Pricing
                            </td>
                            {pricing.map((tier) => (
                                <td key={tier.id} className="p-4 border-l border-[#A2E9C1]">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-3">
                                            <CircleCheckBig />
                                            <span className="text-foreground">
                                                Monthly: {tier.prices.monthly.toLocaleString()}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <CircleCheckBig />
                                            <span className="text-foreground">
                                                Quarterly: {tier.prices.quarterly.toLocaleString()}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <CircleCheckBig />
                                            <span className="text-foreground">
                                                Annual: {tier.prices.annually.toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                </td>
                            ))}
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
