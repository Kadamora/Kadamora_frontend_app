interface StepItem {
    id: number;
    title: string;
    description: string;
}

interface ListPropertySidebarProps {
    currentStep: number;
    isEditMode?: boolean;
}

const STEPS: StepItem[] = [
    {
        id: 1,
        title: 'Property Details',
        description:
            'Lorem ipsum dolor sit amet consectetur. Vulputate nec dictum quam congue massa.',
    },
    {
        id: 2,
        title: 'Lease Term And Pricing',
        description:
            'Lorem ipsum dolor sit amet consectetur. Tellus nunc odio enim ut sit rutrum morbi. Bibendum sed dictum egestas purus a porta sit.',
    },
    {
        id: 3,
        title: 'Media And Document',
        description:
            'Lorem ipsum dolor sit amet consectetur. Tellus nunc odio enim ut sit rutrum morbi. Bibendum sed dictum egestas purus a porta sit.',
    },
];

export default function ListPropertySidebar({
    currentStep,
    isEditMode = false,
}: ListPropertySidebarProps) {
    return (
        <aside className="w-full md:w-80 shrink-0 bg-[#F6FAFF] p-6 sm:p-8 rounded-l-[20px] flex flex-col justify-between border-r border-[#E2E8F0]">
            <div>
                {/* Header Title */}
                <h2 className="text-xl sm:text-2xl font-bold text-[#002E62] leading-tight mb-8">
                    {isEditMode ? 'Edit' : 'List'} Property for{' '}
                    <span className="text-[#12B76A]">Lease</span>
                </h2>

                {/* Steps List */}
                <div className="space-y-8 relative">
                    {STEPS.map((step, idx) => {
                        const isActive = step.id === currentStep;
                        const isCompleted = step.id < currentStep;
                        const isLast = idx === STEPS.length - 1;

                        return (
                            <div key={step.id} className="relative flex items-start gap-4">
                                {/* Connecting Vertical Line */}
                                {!isLast && (
                                    <div
                                        className={`absolute left-[9px] top-6 w-0.5 h-16 sm:h-20 transition-colors ${
                                            isCompleted ? 'bg-[#12B76A]' : 'bg-[#CBD5E1]'
                                        }`}
                                    />
                                )}

                                {/* Circular Indicator */}
                                <div className="shrink-0 mt-0.5 z-10">
                                    <div
                                        className={`h-5 w-5 rounded-full border-2 flex items-center justify-center transition-all ${
                                            isActive || isCompleted
                                                ? 'bg-[#12B76A] border-[#12B76A]'
                                                : 'bg-white border-[#94A3B8]'
                                        }`}
                                    >
                                        {(isActive || isCompleted) && (
                                            <div className="h-2 w-2 rounded-full bg-white" />
                                        )}
                                    </div>
                                </div>

                                {/* Text Details */}
                                <div className="space-y-1.5 flex-1">
                                    <h3
                                        className={`text-sm font-bold transition-colors ${
                                            isActive || isCompleted
                                                ? 'text-[#002E62]'
                                                : 'text-[#64748B]'
                                        }`}
                                    >
                                        {step.title}
                                    </h3>
                                    <p className="text-[11px] text-[#71717A] leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </aside>
    );
}
