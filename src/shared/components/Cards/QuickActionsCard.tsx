import { HelpCircle, Plus } from 'lucide-react';
import type { ReactNode } from 'react';

export interface QuickActionItem {
    id: string;
    label: string;
    icon?: ReactNode;
    onClick?: () => void;
    href?: string;
}

export interface QuickActionsCardProps {
    title?: string;
    actions?: QuickActionItem[];
    className?: string;
}

export default function QuickActionsCard({
    title = 'Quick Actions',
    actions,
    className = '',
}: QuickActionsCardProps) {
    const defaultActions: QuickActionItem[] = [
        {
            id: 'create-request',
            label: 'Create New Requests',
            icon: <Plus className="h-6 w-6" />,
        },
        {
            id: 'contact-support',
            label: 'Contact Support',
            icon: <HelpCircle className="h-6 w-6" />,
        },
    ];

    const actionList = actions ?? defaultActions;

    return (
        <aside className={`rounded-md border border-[#E6E6E6] bg-white p-6 ${className}`}>
            <h3 className="text-lg font-medium text-[#002E62] flex items-center gap-2 mb-4">
                <img src="/assets/icons/info.svg" alt="" className="h-6 w-6" />
                {title}
            </h3>

            <div className="grid grid-cols-2 gap-3">
                {actionList.map((item) => {
                    const content = (
                        <>
                            <span className="flex items-center justify-center  text-[#093154] mb-1">
                                {item.icon}
                            </span>
                            <span className="text-xs font-medium text-[#71717A] text-center leading-snug">
                                {item.label}
                            </span>
                        </>
                    );

                    const classes =
                        'flex flex-col items-center justify-center p-3.5 rounded-md bg-[#F4F8FC] hover:bg-[#E8EFF6] border border-[#E6E6E6] hover:border-[#D0E0EE] transition-all cursor-pointer min-h-[76px]';

                    if (item.href) {
                        return (
                            <a key={item.id} href={item.href} className={classes}>
                                {content}
                            </a>
                        );
                    }

                    return (
                        <button
                            key={item.id}
                            type="button"
                            onClick={item.onClick}
                            className={classes}
                        >
                            {content}
                        </button>
                    );
                })}
            </div>
        </aside>
    );
}
