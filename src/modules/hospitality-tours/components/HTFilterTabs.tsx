export interface HTFilterTabOption<T extends string = string> {
    key: T;
    label: string;
    count?: number;
}

export interface HTFilterTabsProps<T extends string = string> {
    tabs: HTFilterTabOption<T>[];
    activeTab: T;
    onTabChange: (key: T) => void;
    variant?: 'navy' | 'white';
    className?: string;
}

export default function HTFilterTabs<T extends string = string>({
    tabs,
    activeTab,
    onTabChange,
    variant = 'navy',
    className = '',
}: HTFilterTabsProps<T>) {
    return (
        <div
            className={`flex flex-wrap items-center gap-1.5 self-start lg:self-auto ${className}`}
        >
            {tabs.map((tab) => {
                const isActive = activeTab === tab.key;
                const activeClasses =
                    variant === 'navy'
                        ? 'bg-[#002E62] text-white shadow-xs'
                        : 'bg-white text-[#101828] shadow-xs';
                const inactiveClasses = 'text-[#0A0A0A] bg-white hover:text-[#101828] hover:bg-white border border-[#0000001A]';

                return (
                    <button
                        key={tab.key}
                        type="button"
                        onClick={() => onTabChange(tab.key)}
                        className={`px-4 py-2 rounded-[8px] text-xs sm:text-sm  transition-all cursor-pointer inline-flex items-center gap-1.5 ${
                            isActive ? activeClasses : inactiveClasses
                        }`}
                    >
                        <span>{tab.label}</span>
                        {tab.count !== undefined && (
                            <span
                                className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                                    isActive
                                        ? 'bg-white/20 text-white'
                                        : 'bg-slate-200 text-slate-600'
                                }`}
                            >
                                {tab.count}
                            </span>
                        )}
                    </button>
                );
            })}
        </div>
    );
}
