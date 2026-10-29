import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from 'recharts';

export interface DailyUsagePoint {
    day: string;
    kwh: number;
    date?: string;
}

export interface DailyUsageBarChartProps {
    title?: string;
    subtitle?: string;
    data: DailyUsagePoint[];
    className?: string;
}

interface CustomBarTooltipProps {
    active?: boolean;
    payload?: Array<{
        value: number;
        payload: DailyUsagePoint;
    }>;
}

const CustomBarTooltip = ({ active, payload }: CustomBarTooltipProps) => {
    if (!active || !payload || !payload.length) return null;
    const item = payload[0]?.payload;

    return (
        <div className="bg-white/95 backdrop-blur-xs border border-gray-100 rounded-lg px-3 py-2 shadow-md text-xs">
            <span className="font-semibold text-slate-500 block mb-0.5">
                {item?.date || item?.day}
            </span>
            <span className="font-bold text-[#002E62] text-sm">
                {item?.kwh} kWh
            </span>
        </div>
    );
};

export default function DailyUsageBarChart({
    title = 'Daily Usage Pattern',
    subtitle = "Today's energy consumption weekly",
    data,
    className = '',
}: DailyUsageBarChartProps) {
    return (
        <div
            className={`bg-white rounded-2xl border border-[#BED3EB] p-5 sm:p-6 shadow-xs ${className}`}
        >
            <div className="mb-4">
                <h3 className="text-base sm:text-lg font-bold text-[#002E62]">
                    {title}
                </h3>
                {subtitle && (
                    <p className="text-xs text-[#71717A] mt-0.5">{subtitle}</p>
                )}
            </div>

            <div className="w-full h-[240px] sm:h-[260px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient
                                id="dailyBarGradient"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop offset="0%" stopColor="#34C759" stopOpacity={0.9} />
                                <stop offset="100%" stopColor="#A6F4C5" stopOpacity={0.25} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                            stroke="#F1F5F9"
                        />
                        <XAxis
                            dataKey="day"
                            stroke="#A1A1AA"
                            tickLine={false}
                            axisLine={false}
                            tick={{ fontSize: 11, fill: '#71717A' }}
                            dy={6}
                        />
                        <YAxis
                            ticks={[80, 160, 240, 320, 400]}
                            domain={[0, 400]}
                            stroke="#A1A1AA"
                            tickLine={false}
                            axisLine={false}
                            tick={{ fontSize: 11, fill: '#71717A' }}
                        />
                        <Tooltip
                            content={<CustomBarTooltip />}
                            cursor={{ fill: 'rgba(0, 46, 98, 0.03)' }}
                        />
                        <Bar
                            dataKey="kwh"
                            fill="url(#dailyBarGradient)"
                            radius={[6, 6, 0, 0]}
                            barSize={24}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
