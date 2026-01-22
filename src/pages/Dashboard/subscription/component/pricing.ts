export type BillingCycle = "monthly" | "quarterly" | "annually";

export interface PricingTier {
  id: string;
  name: string;
  tierLabel: string;
  targetUsers: string;
  features: string;
  prices: {
    monthly: number;
    quarterly: number;
    annually: number;
  };
}
