import AreaTrendChart from '@shared/components/Charts/AreaTrendChart';
import { mockEnergyData } from '../data/mock';

export interface EnergyConsumptionCardProps {
    className?: string;
}

export default function EnergyConsumptionCard({ className = '' }: EnergyConsumptionCardProps) {
    return (
        <AreaTrendChart
            title="Energy Consumption Overview"
            subtitle="Estate energy consumption breakdown"
            data={mockEnergyData}
            trendText="Trending up by 5.2% this month"
            dateRangeText="January - October"
            generatorLabel="Generator Energy (Kwh)"
            gridLabel="Grid Energy (Kwh)"
            className={className}
        />
    );
}
