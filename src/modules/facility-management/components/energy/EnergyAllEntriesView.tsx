import { useState } from 'react';
import { FiDownload, FiEdit2 } from 'react-icons/fi';
import type { EnergyEntry } from '../../types/energyParking';
import { mockEnergyDataEntries } from '../../data/energyParkingMock';
import { showSuccessToast } from '@shared/components/Toast/Toast';

export interface EnergyAllEntriesViewProps {
    entries?: EnergyEntry[];
    onViewDetails?: (entry: EnergyEntry) => void;
    onAddEntry?: () => void;
    onEditEntry?: (entry: EnergyEntry) => void;
}

export default function EnergyAllEntriesView({
    entries,
    onViewDetails,
    onEditEntry,
}: EnergyAllEntriesViewProps) {
    const [entryList] = useState<EnergyEntry[]>(
        entries && entries.length > 4 ? entries : mockEnergyDataEntries
    );

    const handleDownloadReport = () => {
        showSuccessToast('Download Report', 'Exporting all energy data entries to CSV...');
    };

    return (
        <div className="space-y-4">
            {/* Main Card */}
            <div className="bg-white rounded-2xl border border-[#BED3EB] p-5 sm:p-6 shadow-xs space-y-4">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                        <h3 className="text-base sm:text-lg font-bold text-[#002E62]">
                            Energy Data Entry
                        </h3>
                        <p className="text-xs text-[#71717A] mt-0.5">
                            Download or view your generated reports
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={handleDownloadReport}
                        className="border border-[#CCE3FD] text-[#0062D2] hover:bg-[#F3F9FF] rounded-lg px-4 py-2 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto shrink-0"
                    >
                        <FiDownload className="h-3.5 w-3.5" />
                        <span>Download Report</span>
                    </button>
                </div>

                {/* Table matching Image 2 */}
                <div className="overflow-x-auto -mx-5 sm:-mx-6">
                    <table className="w-full text-left border-collapse text-xs whitespace-nowrap min-w-[950px]">
                        <thead>
                            <tr className="border-b border-[#F0F2F5] text-[#71717A] uppercase text-[11px] font-semibold tracking-wider">
                                <th className="py-3.5 px-5 sm:px-6">ENERGY ID</th>
                                <th className="py-3.5 px-4">FACILITY ID</th>
                                <th className="py-3.5 px-4">DATE</th>
                                <th className="py-3.5 px-4">ENERGY SOURCE<br />(GRID)</th>
                                <th className="py-3.5 px-4">ENERGY SOURCE<br />(GENERATIR)</th>
                                <th className="py-3.5 px-4 text-center">GENERATOR RUN<br />TIME (HRS)</th>
                                <th className="py-3.5 px-4 text-center">FUEL<br />CONSUMPTION (LTR)</th>
                                <th className="py-3.5 px-4">FUEL COST<br />PER LITRES (NGN)</th>
                                <th className="py-3.5 px-4">TOTAL COST<br />(NGN)</th>
                                <th className="py-3.5 px-5 sm:px-6 text-center">ACTION</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#F1F5F9] text-xs">
                            {entryList.map((entry) => (
                                <tr
                                    key={entry.id}
                                    onClick={() => onViewDetails?.(entry)}
                                    className="hover:bg-[#F9FBFE] transition-colors cursor-pointer"
                                >
                                    {/* ENERGY ID */}
                                    <td className="py-3.5 px-5 sm:px-6 text-[#71717A] font-medium">
                                        {entry.energyId || 'ENE003'}
                                    </td>

                                    {/* FACILITY ID */}
                                    <td className="py-3.5 px-4 font-bold text-[#002E62]">
                                        {entry.facilityId || entry.code}
                                    </td>

                                    {/* DATE */}
                                    <td className="py-3.5 px-4 text-[#71717A]">
                                        {entry.date || 'Sept 02, 2025'}
                                    </td>

                                    {/* ENERGY SOURCE (GRID) */}
                                    <td className="py-3.5 px-4 text-[#091E42]">
                                        {entry.gridKwhText || `${entry.totalKwh} KWh (${entry.gridPercentage}%)`}
                                    </td>

                                    {/* ENERGY SOURCE (GENERATIR) */}
                                    <td className="py-3.5 px-4 text-[#091E42]">
                                        {entry.generatorKwhText || `${entry.totalKwh} KWh (${entry.generatorPercentage}%)`}
                                    </td>

                                    {/* GENERATOR RUN TIME (HRS) */}
                                    <td className="py-3.5 px-4 text-center text-[#091E42]">
                                        {entry.generatorHours || 12}
                                    </td>

                                    {/* FUEL CONSUMPTION (LTR) */}
                                    <td className="py-3.5 px-4 text-center text-[#091E42]">
                                        {String(entry.fuelLitres || 80).padStart(3, '0')}
                                    </td>

                                    {/* FUEL COST PER LITRES (NGN) */}
                                    <td className="py-3.5 px-4 text-[#091E42]">
                                        {entry.fuelCostPerLitre?.toFixed(2) || '950.00'}
                                    </td>

                                    {/* TOTAL COST (NGN) */}
                                    <td className="py-3.5 px-4 text-[#091E42]">
                                        {entry.totalCostText || (entry.totalCost ? entry.totalCost.toLocaleString('en-US', { minimumFractionDigits: 2 }) : '450,600.00')}
                                    </td>

                                    {/* ACTION: Edit icon */}
                                    <td
                                        className="py-3.5 px-5 sm:px-6 text-center"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onEditEntry?.(entry);
                                        }}
                                    >
                                        <button
                                            type="button"
                                            className="p-1.5 rounded-md text-[#71717A] hover:text-[#002E62] hover:bg-slate-100 transition-colors inline-flex items-center justify-center"
                                            title="Edit Entry"
                                        >
                                            <FiEdit2 className="h-4 w-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
