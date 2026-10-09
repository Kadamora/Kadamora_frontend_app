import React from 'react';

export interface StepDef {
    id: string;
    title: string;
    description: string;
}

interface Props {
    steps: StepDef[];
    currentIdx: number;
    categoryTitle: string;
}

const CircleBullet: React.FC<{ active: boolean; completed: boolean }> = ({ active, completed }) => (
    <div className="relative flex items-center justify-center shrink-0 mt-1">
        <div
            className={`h-4 w-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                active || completed ? 'bg-[#359F6A] border-[#359F6A]' : 'bg-[#CBD5E1] border-[#CBD5E1]'
            }`}
        >
            {(active || completed) && <div className="h-2 w-2 bg-white rounded-full" />}
        </div>
    </div>
);

const HTListingStepsSidebar: React.FC<Props> = ({ steps, currentIdx, categoryTitle }) => {
    return (
        <aside className="hidden md:flex w-[38%] shrink-0 h-full border border-[#E4E4E7] rounded-[8px] flex-col p-8 overflow-y-auto">
            <div className="mb-10">
                <p className="text-xs font-semibold text-[#359F6A] uppercase tracking-widest mb-1">
                    New Listing
                </p>
                <h1 className="text-[26px] font-bold text-[#002E62] leading-tight">
                    {categoryTitle}
                </h1>
                <p className="text-sm text-[#71717A] mt-1">
                    Choose the type of listing you want to create on Kadamora and start reaching thousands of travelers
                </p>
            </div>

            <div className="flex flex-col space-y-8">
                {steps.map((step, idx) => {
                    const active = idx === currentIdx;
                    const completed = idx < currentIdx;
                    return (
                        <div key={step.id} className="relative flex items-start space-x-4">
                            {/* Vertical connector line */}
                            {idx !== steps.length - 1 && (
                                <div
                                    className={`absolute left-[7px] top-6 w-0.5 h-14 transition-colors ${
                                        completed ? 'bg-[#359F6A]' : 'bg-[#E2E8F0]'
                                    }`}
                                />
                            )}
                            <CircleBullet active={active} completed={completed} />
                            <div className="flex-1">
                                <h3
                                    className={`text-[15px] font-semibold mb-1 transition-colors ${
                                        active ? 'text-[#002E62]' : completed ? 'text-[#359F6A]' : 'text-[#94A3B8]'
                                    }`}
                                >
                                    {step.title}
                                </h3>
                                <p className="text-[13px] text-[#71717A] leading-relaxed line-clamp-3">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </aside>
    );
};

export default HTListingStepsSidebar;
