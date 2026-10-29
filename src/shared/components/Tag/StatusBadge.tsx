
export type StatusType =
    | 'Confirmed'
    | 'Pending'
    | 'Cancelled'
    | 'Completed'
    | 'Failed'
    | 'Active'
    | 'Inactive'
    | 'Assigned'
    | 'Scheduled'
    | 'In- Progress'
    | string;

export interface StatusBadgeProps {
    status: StatusType;
    className?: string;
}

const STATUS_STYLES: Record<string, { bg: string; text: string; border: string }> = {
    confirmed: { bg: 'bg-[#E8F8F0]', text: 'text-[#12B76A]', border: 'border-[#ABECD0]' },
    completed: { bg: 'bg-[#EDFCF4]', text: 'text-[#17C964]', border: 'border-[#6EE6AA]' },
    active: { bg: 'bg-[#E8F8F0]', text: 'text-[#12B76A]', border: 'border-[#ABECD0]' },
    pending: { bg: 'bg-[#FFF8E7]', text: 'text-[#F59E0B]', border: 'border-[#FDE68A]' },
    assigned: { bg: 'bg-[#E8FAF0]', text: 'text-[#0E793C]', border: 'border-[#A2E9C1]' },
    scheduled: { bg: 'bg-[#E0F2FE]', text: 'text-[#0284C7]', border: 'border-[#BAE6FD]' },
    cancelled: { bg: 'bg-[#FFF1F3]', text: 'text-[#F43F5E]', border: 'border-[#FECDD3]' },
    failed: { bg: 'bg-[#FFF1F3]', text: 'text-[#F43F5E]', border: 'border-[#FECDD3]' },
    inactive: { bg: 'bg-[#F2F4F7]', text: 'text-[#667085]', border: 'border-[#EAECF0]' },
    'in-active': { bg: 'bg-[#FFE4E6]', text: 'text-[#E11D48]', border: 'border-[#FECDD3]' },
    open: { bg: 'bg-[#E0F2FE]', text: 'text-[#0284C7]', border: 'border-[#BAE6FD]' },
    'in progress': { bg: 'bg-[#FEF3C7]', text: 'text-[#D97706]', border: 'border-[#FDE68A]' },
    'in- progress': { bg: 'bg-[#FEF3C7]', text: 'text-[#D97706]', border: 'border-[#FDE68A]' },
    'in-progress': { bg: 'bg-[#FEF3C7]', text: 'text-[#D97706]', border: 'border-[#FDE68A]' },
    closed: { bg: 'bg-[#DCFCE7]', text: 'text-[#16A34A]', border: 'border-[#BBF7D0]' },
    expiring: { bg: 'bg-[#FFE4EC]', text: 'text-[#E11D48]', border: 'border-[#FECDD3]' },
    paid: { bg: 'bg-[#E8F8F0]', text: 'text-[#12B76A]', border: 'border-[#ABECD0]' },
    due: { bg: 'bg-[#FFF8E7]', text: 'text-[#F59E0B]', border: 'border-[#FDE68A]' },
};

export default function StatusBadge({ status, className = '' }: StatusBadgeProps) {
    const key = (status ?? '').toLowerCase();
    const style = STATUS_STYLES[key] ?? {
        bg: 'bg-[#F2F4F7]',
        text: 'text-[#344054]',
        border: 'border-[#D0D5DD]',
    };

    return (
        <span
            className={`inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-medium border transition-colors ${style.bg} ${style.text} ${style.border} ${className}`}
        >
            {status}
        </span>
    );
}
