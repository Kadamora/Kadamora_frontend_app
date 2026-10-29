import type { FilterOption } from '@shared/components/Table/TableToolbar';

/** Status filter used by the booking tables (previously the shared toolbar default). */
export const BOOKING_FILTER_OPTIONS: FilterOption[] = [
    { label: 'All Bookings', value: 'all' },
    { label: 'Confirmed', value: 'confirmed' },
    { label: 'Pending', value: 'pending' },
    { label: 'Cancelled', value: 'cancelled' },
];
