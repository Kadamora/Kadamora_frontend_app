import type { ReactNode } from 'react';

export interface TabObject<T extends string = string> {
    id: T;
    label: string;
    count?: number;
    icon?: ReactNode;
}

export type TabDefinition<T extends string = string> = T | TabObject<T>;

export interface TabsProps<T extends string = string> {
    tabs: readonly TabDefinition<T>[];
    activeTab: T;
    onChange: (tab: T) => void;
    className?: string;
    tabClassName?: string;
    activeClassName?: string;
    inactiveClassName?: string;
    ariaLabel?: string;
}

export default function Tabs<T extends string = string>({
    tabs,
    activeTab,
    onChange,
    className = '',
    tabClassName = '',
    activeClassName = 'bg-[#F3F9FF] text-[#002E62] shadow-xs border border-[#CCE3FD]',
    inactiveClassName = 'text-[#71717A] border border-[#E4E4E7] hover:bg-slate-50 hover:text-[#091E42]',
    ariaLabel = 'Navigation Tabs',
}: TabsProps<T>) {
    return (
        <div
            role="tablist"
            aria-label={ariaLabel}
            className={`inline-flex flex-wrap items-center gap-2 rounded-lg text-xs sm:text-sm font-medium ${className}`}
        >
            {tabs.map((tab) => {
                const isObject = typeof tab === 'object' && tab !== null;
                const id = (isObject ? (tab as TabObject<T>).id : tab) as T;
                const label = isObject ? (tab as TabObject<T>).label : (tab as string);
                const count = isObject ? (tab as TabObject<T>).count : undefined;
                const icon = isObject ? (tab as TabObject<T>).icon : undefined;
                const isActive = activeTab === id;

                return (
                    <button
                        key={id}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => onChange(id)}
                        className={`px-4 py-2 rounded-lg transition-all cursor-pointer flex items-center gap-2 ${
                            isActive ? activeClassName : inactiveClassName
                        } ${tabClassName}`}
                    >
                        {icon && <span className="shrink-0">{icon}</span>}
                        <span>{label}</span>
                        {typeof count === 'number' && (
                            <span
                                className={`text-[11px] px-1.5 py-0.2 rounded-full font-semibold ${
                                    isActive
                                        ? 'bg-[#CCE3FD] text-[#002E62]'
                                        : 'bg-gray-100 text-[#71717A]'
                                }`}
                            >
                                {count}
                            </span>
                        )}
                    </button>
                );
            })}
        </div>
    );
}
