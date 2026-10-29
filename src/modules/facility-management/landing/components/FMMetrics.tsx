import { FM_METRICS } from '../data/landingData';
import { CountUp } from '@shared/components/Animations';

export default function FMMetrics() {
    return (
        <section className="py-14 sm:py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#002E62] tracking-tight">
                        Proven Results & Benefits
                    </h2>
                    <p className="mt-3 text-xs sm:text-sm text-[#64748B] max-w-xl mx-auto leading-relaxed">
                        Join Thousands Of Property Managers Who Have Transformed Their Operations And Achieved Measurable Improvements With Kadamora.
                    </p>
                </div>

                {/* Metrics Grid */}
                <div className="mt-12 sm:mt-16 max-w-5xl mx-auto">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x divide-[#E2E8F0]">
                        {FM_METRICS.map((metric) => (
                            <div
                                key={metric.id}
                                className="flex flex-col items-center justify-center text-center px-4"
                            >
                                <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#12B76A] tracking-tight">
                                    <CountUp value={metric.value} duration={2000} />
                                </span>
                                <span className="mt-2 text-xs sm:text-sm font-semibold text-[#091E42]">
                                    {metric.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
