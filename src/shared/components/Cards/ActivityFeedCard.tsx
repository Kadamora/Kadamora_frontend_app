import React from 'react';
import paymentIcon from '@shared/assets/activity/payment.svg';
import maintenanceIcon from '@shared/assets/activity/maintainance_report.svg';
import noticeIcon from '@shared/assets/activity/rent.svg';

export interface ActivityItem {
    id: number | string;
    title: string;
    subtitle?: string;
    date?: string;
    amount?: string;
    type?: 'payment' | 'maintenance' | 'notice' | 'other';
}

const ICONS: Record<string, string> = {
    payment: paymentIcon,
    maintenance: maintenanceIcon,
    notice: noticeIcon,
    other: paymentIcon,
};

const COLORS: Record<string, string> = {
    payment: 'bg-[#E6F6F3] text-[#256D51]',
    maintenance: 'bg-[#FFF7E6] text-[#B27A0A]',
    notice: 'bg-[#FFF0F0] text-[#D02929]',
    other: 'bg-[#F9F9FB] text-[#4B5563]',
};

const LABELS: Record<string, string> = {
    payment: 'Payment',
    maintenance: 'Maintenance',
    notice: 'Lease',
    other: 'Other',
};

const getInitials = (subtitle?: string) => {
    const parts = (subtitle ?? '').split(' ').filter(Boolean);
    return `${parts[0]?.[0] ?? ''}${parts[1]?.[0] ?? ''}`.toUpperCase();
};

const ActivityRow: React.FC<{ a: ActivityItem; compact: boolean }> = ({ a, compact }) => {
    const type = a.type ?? 'other';
    return (
        <div className={`flex items-center gap-4 border-b border-[#D4D4D8] last:border-b-0 ${compact ? 'py-3' : 'py-4'}`}>
            <span
                className={`${compact ? 'h-9 w-9' : 'h-11 w-11'} shrink-0 rounded-full flex items-center justify-center ${COLORS[type]}`}
            >
                <img src={ICONS[type]} alt={type} className={compact ? 'h-9 w-9' : 'h-11 w-11'} />
            </span>
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                    <span className={`${compact ? 'text-sm' : 'text-[17px]'} font-medium text-[#000000] truncate`}>
                        {a.title}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-[#FAFAFA] text-[#002E62] text-xs border border-[#F4F4F5]">
                        {LABELS[type]}
                    </span>
                </div>
                <div className={`${compact ? 'text-xs' : 'text-[15px]'} text-[#52525B] truncate`}>{a.subtitle}</div>
                <div className={`${compact ? 'text-[11px]' : 'text-[13px]'} text-[#52525B]`}>{a.date}</div>
            </div>
            <span className="h-9 w-9 shrink-0 rounded-full bg-[#F4F4F5] flex items-center justify-center text-[#002E62] font-medium text-sm border border-[#E4E4E7] ">
                {getInitials(a.subtitle)}
            </span>
        </div>
    );
};

export interface ActivityFeedCardProps {
    items?: ActivityItem[];
    title?: string;
    /** Renders a "View All" link in the header when provided. */
    onViewAll?: () => void;
    emptyText?: string;
    compact?: boolean;
    className?: string;
}

const ActivityFeedCard: React.FC<ActivityFeedCardProps> = ({
    items,
    title = 'Recent Activities',
    onViewAll,
    emptyText = 'No recent activities.',
    compact = false,
    className = '',
}) => {
    const list = items ?? [];
    return (
        <aside className={`rounded-md border border-[#E4E4E7] bg-white ${compact ? 'p-5' : 'p-6'} ${className}`}>
            <div className="flex justify-between items-center mb-2">
                <h3
                    className={`${compact ? 'text-lg' : 'text-[20px]'} font-medium text-[#093154] flex items-center gap-2`}
                >
                    <img src="/assets/icons/info.svg" alt="" className="h-6 w-6" />
                    {title}
                </h3>
                {onViewAll && (
                    <button
                        type="button"
                        onClick={onViewAll}
                        className="text-sm text-[#3F3F46] font-medium hover:underline"
                    >
                        View All
                    </button>
                )}
            </div>
            <div className="mt-2 divide-y divide-[#F3F6F9]">
                {list.map((it) => (
                    <ActivityRow key={String(it.id)} a={it} compact={compact} />
                ))}
                {list.length === 0 && <div className="text-sm text-[#94A3B8] py-8 text-center">{emptyText}</div>}
            </div>
        </aside>
    );
};

export default ActivityFeedCard;
