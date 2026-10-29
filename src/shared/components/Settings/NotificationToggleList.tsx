import React from 'react';
import Toggle from '@shared/components/Forms/Toggle';

export interface NotificationOptionItem {
    id: string;
    label: string;
    description: string;
    icon?: React.ReactNode;
    enabled: boolean;
}

export interface NotificationToggleListProps {
    title?: string;
    items: NotificationOptionItem[];
    onToggle: (id: string) => void;
    className?: string;
}

export default function NotificationToggleList({
    title = 'Notification',
    items,
    onToggle,
    className = '',
}: NotificationToggleListProps) {
    return (
        <div className={`bg-white border border-[#BED3EB] rounded-2xl shadow-xs overflow-hidden ${className}`}>
            {title && (
                <div className="px-6 py-5 border-b border-[#F0F2F5]">
                    <h2 className="text-base sm:text-lg font-bold text-[#002E62]">{title}</h2>
                </div>
            )}

            <div className="p-6 sm:p-8 space-y-6">
                <div className="border border-[#E2E8F0] rounded-2xl p-4 sm:p-6 divide-y divide-[#F1F5F9] bg-white">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="py-5 first:pt-2 last:pb-2 flex items-center justify-between gap-6"
                        >
                            <div className="flex items-start gap-4">
                                {item.icon && (
                                    <div className="w-10 h-10 rounded-full bg-[#E8F8F0] border border-[#ABECD0] flex items-center justify-center shrink-0 mt-0.5 text-[#12B76A]">
                                        {item.icon}
                                    </div>
                                )}
                                <div className="space-y-1">
                                    <h4 className="text-sm font-bold text-[#002E62]">{item.label}</h4>
                                    <p className="text-xs text-[#64748B] max-w-xl leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            </div>

                            {/* Toggle Switch */}
                            <Toggle
                                checked={item.enabled}
                                onChange={() => onToggle(item.id)}
                                activeColor="bg-[#002E62]"
                                inactiveColor="bg-[#CBD5E1]"
                                ariaLabel={`Toggle ${item.label}`}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
