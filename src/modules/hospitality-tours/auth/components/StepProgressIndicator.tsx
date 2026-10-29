export interface StepProgressIndicatorProps {
    currentStep: number; // 1: User details, 2: Business details, 3: Account details, 4: Complete
    totalSteps?: number;
}

export default function StepProgressIndicator({
    currentStep,
    totalSteps = 4,
}: StepProgressIndicatorProps) {
    return (
        <div className="w-full flex items-center gap-1 mb-6" aria-label="Registration Progress">
            {Array.from({ length: totalSteps }).map((_, idx) => {
                const stepNum = idx + 1;
                const isCurrent = stepNum === currentStep;
                const isPassed = stepNum < currentStep;

                return (
                    <div
                        key={idx}
                        className={`h-1 rounded-full transition-all duration-300 ${
                            isCurrent
                                ? 'w-32 bg-green-700'
                                : isPassed
                                ? 'w-12 bg-green-700'
                                : 'w-12 bg-green-700/20'
                        }`}
                    />
                );
            })}
        </div>
    );
}
