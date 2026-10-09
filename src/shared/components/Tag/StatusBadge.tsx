import React from 'react';

export type StatusType =
    | 'Confirmed'
    | 'Pending'
    | 'Cancelled'
    | 'Completed'
    | 'Failed'
    | 'Active'
    | 'Inactive'
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
    cancelled: { bg: 'bg-[#FFF1F3]', text: 'text-[#F43F5E]', border: 'border-[#FECDD3]' },
    failed: { bg: 'bg-[#FFF1F3]', text: 'text-[#F43F5E]', border: 'border-[#FECDD3]' },
    inactive: { bg: 'bg-[#F2F4F7]', text: 'text-[#667085]', border: 'border-[#EAECF0]' },
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
