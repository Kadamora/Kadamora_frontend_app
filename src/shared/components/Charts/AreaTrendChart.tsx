import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
} from 'recharts';
import { FiTrendingUp } from 'react-icons/fi';

export interface AreaDataPoint {
    month: string;
    generator: number;
    grid: number;
    trend?: string;
}

export interface AreaTrendChartProps {
    title?: string;
    subtitle?: string;
    data: AreaDataPoint[];
    trendText?: string;
    dateRangeText?: string;
    generatorLabel?: string;
    gridLabel?: string;
    className?: string;
}

interface CustomTooltipProps {
    active?: boolean;
    payload?: Array<{
        value: number;
        name: string;
        color: string;
        payload: AreaDataPoint;
    }>;
    label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
    if (!active || !payload || !payload.length) return null;
    const currentPoint = payload[0]?.payload;
    const total = (currentPoint?.generator ?? 0) + (currentPoint?.grid ?? 0);
    const trend = currentPoint?.trend ?? '+ 12.3%';

    return (
        <div className="bg-white/95 backdrop-blur-xs border border-gray-100 rounded-lg px-3.5 py-2.5 shadow-lg text-xs">
            <div className="flex items-center gap-1.5 mb-1 text-slate-500 font-medium">
                <span className="h-2 w-2 rounded-full bg-amber-500 inline-block" />
                <span>{label}</span>
            </div>
            <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-bold text-[#002E62]">
                    {total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Kwh
                </span>
                <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                    {trend}
                </span>
            </div>
        </div>
    );
};

export default function AreaTrendChart({
    title = 'Energy Consumption Overview',
    subtitle = 'Estate energy consumption breakdown',
    data,
    trendText = 'Trending up by 5.2% this month',
    dateRangeText = 'January - October',
    generatorLabel = 'Generator Energy (Kwh)',
    gridLabel = 'Grid Energy (Kwh)',
    className = '',
}: AreaTrendChartProps) {
    return (
        <div className={`bg-white rounded-lg border border-gray-200 p-6 ${className}`}>
            {/* Header */}
            <div className="mb-4">
                <h3 className="text-lg sm:text-[19px] font-bold text-[#002E62] leading-snug">{title}</h3>
                {subtitle && <p className="text-xs sm:text-sm text-[#71717A] ">{subtitle}</p>}
            </div>

            {/* Chart Area */}
            <div className="w-full h-[230px] sm:h-[260px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 15, right: 10, left: -25, bottom: 0 }}>
                        <defs>
                            <linearGradient id="generatorGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#FFCA8C" stopOpacity={0.35} />
                                <stop offset="95%" stopColor="#FFCA8C" stopOpacity={0.02} />
                            </linearGradient>
                            <linearGradient id="gridGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10B981" stopOpacity={0.35} />
                                <stop offset="95%" stopColor="#10B981" stopOpacity={0.02} />
                            </linearGradient>
                        </defs>
                        <XAxis
                            dataKey="month"
                            stroke="#A1A1AA"
                            tickLine={false}
                            axisLine={false}
                            tick={{ fontSize: 11, fill: '#71717A' }}
                            dy={8}
                        />
                        <YAxis hide domain={['dataMin - 200', 'dataMax + 400']} />
                        <Tooltip content={<CustomTooltip />} />
                        <Area
                            type="monotone"
                            dataKey="generator"
                            name={generatorLabel}
                            stroke="#FFCA8C"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#generatorGradient)"
                        />
                        <Area
                            type="monotone"
                            dataKey="grid"
                            name={gridLabel}
                            stroke="#10B981"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#gridGradient)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            {/* Footer Summary & Legend */}
            <div className="mt-4 pt-3 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                    <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#002E62]">
                        <span>{trendText}</span>
                        <FiTrendingUp className="h-4 w-4 text-[#002E62]" />
                    </div>
                    <span className="text-xs text-[#A1A1AA]">{dateRangeText}</span>
                </div>

                <div className="flex flex-col gap-2 text-xs font-medium text-[#002E62]">
                    <div className="flex items-center gap-1.5">
                        <span className="h-3 w-3 rounded-[2px] bg-[#FFCA8C] shrink-0" />
                        <span>{generatorLabel}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="h-3 w-3 rounded-[2px] bg-[#10B981] shrink-0" />
                        <span>{gridLabel}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
