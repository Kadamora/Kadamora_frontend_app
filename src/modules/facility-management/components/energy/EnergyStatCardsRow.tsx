import { FiZap, FiDollarSign, FiTrendingUp } from 'react-icons/fi';
import type { EnergyMetric } from '../../types/energyParking';

export interface EnergyStatCardsRowProps {
    metrics: EnergyMetric[];
}

export default function EnergyStatCardsRow({ metrics }: EnergyStatCardsRowProps) {
    const renderIcon = (type: EnergyMetric['icon']) => {
        switch (type) {
            case 'lightning':
                return (
                    <div className="h-10 w-10 rounded-full bg-[#E0F7FA] text-[#00BCD4] flex items-center justify-center shrink-0">
                        <FiZap className="h-5 w-5 text-[#00BCD4]" />
                    </div>
                );
            case 'generator':
                return (
                    <div className="h-10 w-10 rounded-full bg-[#EDFCF4] text-[#12B76A] flex items-center justify-center shrink-0">
                        <FiDollarSign className="h-5 w-5 text-[#12B76A]" />
                    </div>
                );
            case 'fuel':
                return (
                    <div className="h-10 w-10 rounded-full bg-[#F0F6FF] text-[#0062D2] flex items-center justify-center shrink-0">
                        <FiTrendingUp className="h-5 w-5 text-[#0062D2]" />
                    </div>
                );
            case 'cost':
                return (
                    <div className="h-10 w-10 rounded-full bg-[#FFF1F3] text-[#F43F5E] flex items-center justify-center shrink-0">
                        <FiTrendingUp className="h-5 w-5 text-[#F43F5E]" />
                    </div>
                );
        }
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {metrics.map((metric, index) => (
                <div
                    key={index}
                    className="bg-white rounded-2xl border border-[#BED3EB] p-4 sm:p-5 shadow-xs flex items-center gap-3.5"
                >
                    {renderIcon(metric.icon)}
                    <div className="min-w-0 space-y-0.5">
                        <span className="text-xs text-[#71717A] font-medium block truncate">
                            {metric.title}
                        </span>
                        <h4 className="text-base sm:text-lg font-bold text-[#002E62] truncate">
                            {metric.value}
                        </h4>
                        <span
                            className={`text-[11px] font-semibold block ${
                                metric.isPositive ? 'text-[#12B76A]' : 'text-[#71717A]'
                            }`}
                        >
                            {metric.changeText}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
}
