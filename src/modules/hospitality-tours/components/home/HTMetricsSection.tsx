import { HT_METRICS } from '../../data/hospitalityLandingData';
import { CountUp } from '@shared/components/Animations';

interface HTMetricsSectionProps {
    className?: string;
}

export default function HTMetricsSection({ className = '' }: HTMetricsSectionProps) {
    return (
        <section className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center ${className}`}>
            {/* Header */}
            <div className="max-w-2xl mx-auto space-y-3 mb-12 ">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#002E62] tracking-tight">
                    Proven Results &amp; Benefits
                </h2>
                <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                    Discover our numbers that reflect our commitment to real results and positive customer
                    experiences across our various digital services.
                </p>
            </div>

            {/* 4 Metrics Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6  ">
                {HT_METRICS.map((metric) => (
                    <div
                        key={metric.id}
                        className="  flex flex-col items-center justify-center "
                    >
                        <span className="text-3xl sm:text-5xl font-bold text-[#43CC88] tracking-tight">
                            <CountUp value={metric.value} duration={2000} />
                        </span>
                        <span className="text-xs sm:text-sm font-semibold text-[#091E42] max-w-[180px]">
                            {metric.label}
                        </span>
                    </div>
                ))}
            </div>
        </section>
    );
}
