import { FiClock } from 'react-icons/fi';
import type { EnergyEntry } from '../../types/energyParking';

export interface RecentEnergyEntriesCardProps {
    entries: EnergyEntry[];
    onViewDetails: (entry: EnergyEntry) => void;
    onSeeAll?: () => void;
    className?: string;
}

export default function RecentEnergyEntriesCard({
    entries,
    onViewDetails,
    onSeeAll,
    className = '',
}: RecentEnergyEntriesCardProps) {
    return (
        <div
            className={`bg-white rounded-2xl border border-[#BED3EB] p-5 sm:p-6 shadow-xs flex flex-col justify-between ${className}`}
        >
            <div>
                {/* Header */}
                <div className="flex items-center justify-between gap-3 mb-4">
                    <div>
                        <h3 className="text-base sm:text-lg font-bold text-[#002E62]">
                            Recent Entries
                        </h3>
                        <p className="text-xs text-[#71717A] mt-0.5">
                            you have made 12 entries this month.
                        </p>
                    </div>

                    {onSeeAll && (
                        <button
                            type="button"
                            onClick={onSeeAll}
                            className="border border-[#B4B4B4] rounded-lg px-3 py-1.5 text-xs font-semibold text-[#71717A] hover:bg-slate-50 transition-colors cursor-pointer"
                        >
                            See All
                        </button>
                    )}
                </div>

                {/* List */}
                <div className="space-y-3">
                    {entries.slice(0, 4).map((entry) => (
                        <div
                            key={entry.id}
                            className="border border-[#CCE3FD] rounded-xl p-3 sm:p-4 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#FAFDFE] transition-colors"
                        >
                            <div className="space-y-1">
                                <h4 className="text-sm sm:text-base font-bold text-[#002E62]">
                                    {entry.code}
                                </h4>
                                <p className="text-xs font-medium text-[#71717A]">
                                    {entry.totalKwh} KWH | {entry.gridPercentage}% GRID,{' '}
                                    {entry.generatorPercentage}% GENERATOR
                                </p>
                                <div className="flex items-center gap-1.5 text-[11px] text-[#71717A] pt-0.5">
                                    <FiClock className="h-3 w-3 shrink-0" />
                                    <span>{entry.timestamp}</span>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={() => onViewDetails(entry)}
                                className="border border-[#BED3EB] text-[#002E62] hover:bg-[#F3F9FF] rounded-lg px-4 py-2 text-xs font-semibold transition-colors cursor-pointer self-start sm:self-center shrink-0"
                            >
                                View Details
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
