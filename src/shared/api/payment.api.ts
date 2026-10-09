import { baseApi } from "./baseApi";

/* =======================
   Types
======================= */

export interface Bank {
    id: number;
    name: string;
    code: string;
    slug?: string;
    currency?: string;
}

export interface ResolvedAccount {
    accountName: string;
    accountNumber: string;
}

/* =======================
   API
======================= */

export const paymentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        /** GET /payments/banks — Get all supported banks */
        getBanks: builder.query<{ data: Bank[] }, void>({
            query: () => ({
                url: `/api/v1/payments/banks`,
                method: "GET",
            }),
        }),

        /** GET /payments/resolve-account — Resolve account number to get account name */
        resolveAccount: builder.query<{ data: ResolvedAccount }, { accountNumber: string; bankCode: string }>({
            query: ({ accountNumber, bankCode }) => ({
                url: `/api/v1/payments/resolve-account`,
                method: "GET",
                params: { accountNumber, bankCode },
            }),
        }),

        /** POST /payments/webhooks/paystack — Paystack Webhook Handler (internal use) */
        paystackWebhook: builder.mutation<void, Record<string, unknown>>({
            query: (body) => ({
                url: `/api/v1/payments/webhooks/paystack`,
                method: "POST",
                body,
            }),
        }),
    }),
});

/* =======================
   Hooks
======================= */

export const {
    useGetBanksQuery,
    useResolveAccountQuery,
    usePaystackWebhookMutation,
} = paymentApi;
