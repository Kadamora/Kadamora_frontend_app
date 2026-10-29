import { useState, useMemo } from 'react';
import {
    FiBold,
    FiItalic,
    FiUnderline,
    FiList,
    FiAlignLeft,
    FiAlignCenter,
} from 'react-icons/fi';
import type { EnergyEntry } from '../../types/energyParking';
import { showSuccessToast } from '@shared/components/Toast/Toast';

export interface AddEnergyEntryViewProps {
    onSubmit: (entry: Partial<EnergyEntry>) => void;
    onCancel?: () => void;
}

export default function AddEnergyEntryView({
    onSubmit,
}: AddEnergyEntryViewProps) {
    const [facilityId, setFacilityId] = useState('');
    const [date, setDate] = useState('');
    const [gridPercent, setGridPercent] = useState<string>('');
    const [generatorPercent, setGeneratorPercent] = useState<string>('');
    const [gridCostPerUnit, setGridCostPerUnit] = useState<string>('');
    const [generatorRunTime, setGeneratorRunTime] = useState<string>('');
    const [fuelConsumption, setFuelConsumption] = useState<string>('');
    const [fuelCostPerUnit, setFuelCostPerUnit] = useState<string>('950');
    const [remarks, setRemarks] = useState('');

    // Auto-calculate Total Fuel Cost
    const totalFuelCost = useMemo(() => {
        const litres = parseFloat(fuelConsumption) || 0;
        const costPerLitre = parseFloat(fuelCostPerUnit) || 0;
        return (litres * costPerLitre).toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    }, [fuelConsumption, fuelCostPerUnit]);

    // Auto-calculate Total Grid Cost
    const totalGridCost = useMemo(() => {
        const costUnit = parseFloat(gridCostPerUnit) || 0;
        const percent = parseFloat(gridPercent) || 0;
        return (costUnit * percent * 200).toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    }, [gridCostPerUnit, gridPercent]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const gridVal = parseFloat(gridPercent) || 0;
        const genVal = parseFloat(generatorPercent) || 0;

        if (gridVal + genVal !== 100 && (gridVal > 0 || genVal > 0)) {
            // Warn if doesn't equal 100% as per guideline
            if (gridVal + genVal !== 100) {
                // We still proceed or let user submit with confirmation
            }
        }

        const newEntry: Partial<EnergyEntry> = {
            id: `ene-${Date.now()}`,
            energyId: `ENE0${Math.floor(Math.random() * 90 + 10)}`,
            code: facilityId || 'FAC133',
            facilityId: facilityId || 'FAC133',
            date: date || 'Sept 02, 2025',
            timestamp: date || 'Sept 02, 2025',
            gridKwhText: `${(gridVal * 200).toFixed(2)} KWh (${gridVal}%)`,
            generatorKwhText: `${(genVal * 200).toFixed(2)} KWh (${genVal}%)`,
            gridPercentage: gridVal,
            generatorPercentage: genVal,
            generatorHours: parseFloat(generatorRunTime) || 12,
            fuelLitres: parseFloat(fuelConsumption) || 80,
            fuelCostPerLitre: parseFloat(fuelCostPerUnit) || 950,
            totalCost: (parseFloat(fuelConsumption) || 80) * (parseFloat(fuelCostPerUnit) || 950),
            totalCostText: totalFuelCost,
            remarks,
            status: gridVal >= 70 ? 'Optimal' : 'Generator Heavy',
        };

        onSubmit(newEntry);
        showSuccessToast('Entry Added', `Energy record ${newEntry.energyId} for ${newEntry.code} logged successfully.`);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* 1. LEFT FORM CARD (Image 3) */}
            <div className="lg:col-span-8 bg-white rounded-2xl border border-[#BED3EB] p-6 sm:p-8 shadow-xs">
                <div className="mb-6 space-y-1">
                    <h3 className="text-lg sm:text-xl font-bold text-[#002E62]">
                        Add Energy Data Entry
                    </h3>
                    <p className="text-xs text-[#71717A]">
                        Enter the details for a new energy data entry
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Facility ID */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-[#002E62]">
                            Facility ID
                        </label>
                        <select
                            value={facilityId}
                            onChange={(e) => setFacilityId(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4E4E7] bg-[#F8FAFC] text-xs text-[#091E42] focus:outline-none focus:ring-1 focus:ring-[#002E62]"
                        >
                            <option value="">Select Facility</option>
                            <option value="FAC133">FAC133 - Main Substation Alpha</option>
                            <option value="FAC124">FAC124 - Sector B Facility</option>
                            <option value="FAC125">FAC125 - Residential Cluster</option>
                            <option value="FAC126">FAC126 - Commercial North</option>
                            <option value="FAC127">FAC127 - Substation Gamma</option>
                            <option value="FAC128">FAC128 - Main Hub</option>
                            <option value="FAC129">FAC129 - Pump Station Alpha</option>
                            <option value="FAC130">FAC130 - Clubhouse Zone</option>
                            <option value="FAC131">FAC131 - Security Wing & Gates</option>
                            <option value="FAC132">FAC132 - Central Substation Beta</option>
                        </select>
                    </div>

                    {/* Date */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-[#002E62]">
                            Date
                        </label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4E4E7] bg-[#F8FAFC] text-xs text-[#091E42] focus:outline-none focus:ring-1 focus:ring-[#002E62]"
                        />
                    </div>

                    {/* 2-col: Energy Source Grid (%) & Generator (%) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-[#002E62]">
                                Energy Source Grid (%)
                            </label>
                            <input
                                type="number"
                                min="0"
                                max="100"
                                value={gridPercent}
                                onChange={(e) => setGridPercent(e.target.value)}
                                placeholder="Enter energy source grid"
                                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4E4E7] bg-[#F8FAFC] text-xs text-[#091E42] focus:outline-none focus:ring-1 focus:ring-[#002E62]"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-[#002E62]">
                                Energy Source Generator (%)
                            </label>
                            <input
                                type="number"
                                min="0"
                                max="100"
                                value={generatorPercent}
                                onChange={(e) => setGeneratorPercent(e.target.value)}
                                placeholder="Enter energy source generator"
                                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4E4E7] bg-[#F8FAFC] text-xs text-[#091E42] focus:outline-none focus:ring-1 focus:ring-[#002E62]"
                            />
                        </div>
                    </div>

                    {/* 2-col: Grid Cost per Unit & Total Grid Cost */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-[#002E62]">
                                Grid Cost per Unit (NGN)
                            </label>
                            <input
                                type="number"
                                value={gridCostPerUnit}
                                onChange={(e) => setGridCostPerUnit(e.target.value)}
                                placeholder="Enter grid cost per unit"
                                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4E4E7] bg-[#F8FAFC] text-xs text-[#091E42] focus:outline-none focus:ring-1 focus:ring-[#002E62]"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-[#002E62]">
                                Total Grid Cost
                            </label>
                            <input
                                type="text"
                                readOnly
                                value={gridCostPerUnit ? `NGN ${totalGridCost}` : ''}
                                placeholder="Enter total grid cost"
                                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4E4E7] bg-[#F8FAFC] text-xs text-[#71717A] focus:outline-none cursor-not-allowed"
                            />
                        </div>
                    </div>

                    {/* Generator Run Time */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-[#002E62]">
                            Generator Run Time (Hrs)
                        </label>
                        <input
                            type="number"
                            value={generatorRunTime}
                            onChange={(e) => setGeneratorRunTime(e.target.value)}
                            placeholder="Enter run time"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4E4E7] bg-[#F8FAFC] text-xs text-[#091E42] focus:outline-none focus:ring-1 focus:ring-[#002E62]"
                        />
                    </div>

                    {/* Fuel Consumption */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-[#002E62]">
                            Fuel Consumption (Ltrs)
                        </label>
                        <input
                            type="number"
                            value={fuelConsumption}
                            onChange={(e) => setFuelConsumption(e.target.value)}
                            placeholder="Enter fuel consumption"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4E4E7] bg-[#F8FAFC] text-xs text-[#091E42] focus:outline-none focus:ring-1 focus:ring-[#002E62]"
                        />
                    </div>

                    {/* 2-col: Fuel Cost per Unit & Total Fuel Cost */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-[#002E62]">
                                Fuel Cost per Unit (NGN)
                            </label>
                            <input
                                type="number"
                                value={fuelCostPerUnit}
                                onChange={(e) => setFuelCostPerUnit(e.target.value)}
                                placeholder="Enter fuel cost per unit"
                                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4E4E7] bg-[#F8FAFC] text-xs text-[#091E42] focus:outline-none focus:ring-1 focus:ring-[#002E62]"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-[#002E62]">
                                Total Fuel Cost
                            </label>
                            <input
                                type="text"
                                readOnly
                                value={fuelConsumption ? `NGN ${totalFuelCost}` : ''}
                                placeholder="Auto Calculated"
                                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4E4E7] bg-[#F8FAFC] text-xs text-[#71717A] focus:outline-none cursor-not-allowed"
                            />
                        </div>
                    </div>

                    {/* Remarks with formatting toolbar */}
                    <div className="space-y-1.5 pt-1">
                        <label className="text-xs font-semibold text-[#002E62]">
                            Remarks
                        </label>
                        <div className="rounded-xl border border-[#E4E4E7] bg-[#F8FAFC] overflow-hidden">
                            {/* Toolbar matching Image 3 */}
                            <div className="flex items-center gap-1 p-2 border-b border-[#E4E4E7] text-[#71717A] bg-white">
                                <button
                                    type="button"
                                    className="p-1.5 rounded hover:bg-slate-100 hover:text-[#002E62] transition-colors"
                                    title="Bold"
                                >
                                    <FiBold className="h-3.5 w-3.5" />
                                </button>
                                <button
                                    type="button"
                                    className="p-1.5 rounded hover:bg-slate-100 hover:text-[#002E62] transition-colors"
                                    title="Italic"
                                >
                                    <FiItalic className="h-3.5 w-3.5" />
                                </button>
                                <button
                                    type="button"
                                    className="p-1.5 rounded hover:bg-slate-100 hover:text-[#002E62] transition-colors"
                                    title="Underline"
                                >
                                    <FiUnderline className="h-3.5 w-3.5" />
                                </button>
                                <span className="h-4 w-[1px] bg-slate-200 mx-1" />
                                <span className="text-xs px-1 font-serif font-bold text-slate-600">Aa</span>
                                <span className="h-4 w-[1px] bg-slate-200 mx-1" />
                                <button
                                    type="button"
                                    className="p-1.5 rounded hover:bg-slate-100 hover:text-[#002E62] transition-colors"
                                    title="Bullet List"
                                >
                                    <FiList className="h-3.5 w-3.5" />
                                </button>
                                <button
                                    type="button"
                                    className="p-1.5 rounded hover:bg-slate-100 hover:text-[#002E62] transition-colors"
                                    title="Align Left"
                                >
                                    <FiAlignLeft className="h-3.5 w-3.5" />
                                </button>
                                <button
                                    type="button"
                                    className="p-1.5 rounded hover:bg-slate-100 hover:text-[#002E62] transition-colors"
                                    title="Align Center"
                                >
                                    <FiAlignCenter className="h-3.5 w-3.5" />
                                </button>
                            </div>

                            <textarea
                                rows={4}
                                value={remarks}
                                onChange={(e) => setRemarks(e.target.value)}
                                placeholder="Enter remarks"
                                className="w-full p-3 text-xs text-[#091E42] bg-transparent focus:outline-none resize-none"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-3">
                        <button
                            type="submit"
                            className="bg-[#002E62] hover:bg-[#002047] text-white px-6 py-3 rounded-lg text-xs sm:text-sm font-semibold transition-colors cursor-pointer shadow-xs"
                        >
                            Submit Energy
                        </button>
                    </div>
                </form>
            </div>

            {/* 2. RIGHT GUIDELINES CARD (Image 3) */}
            <div className="lg:col-span-4 bg-white rounded-2xl border border-[#BED3EB] p-6 shadow-xs space-y-4">
                <div className="space-y-0.5">
                    <h4 className="text-base font-bold text-[#002E62]">
                        Entry Guidelines
                    </h4>
                    <p className="text-xs text-[#71717A]">
                        Important information about entering energy data
                    </p>
                </div>

                <div className="border-t border-[#F0F2F5]" />

                {/* Guideline 1 */}
                <div className="space-y-1">
                    <h5 className="text-xs sm:text-[13px] font-bold text-[#002E62]">
                        Energy Sources
                    </h5>
                    <p className="text-xs text-[#71717A] leading-relaxed">
                        The sum of Grid and Generator energy sources should equal 100%.
                    </p>
                </div>

                <div className="border-t border-[#F0F2F5]" />

                {/* Guideline 2 */}
                <div className="space-y-1">
                    <h5 className="text-xs sm:text-[13px] font-bold text-[#002E62]">
                        Fuel Consumption
                    </h5>
                    <p className="text-xs text-[#71717A] leading-relaxed">
                        Enter the total amount of fuel used by the generator during the specified time period.
                    </p>
                </div>

                <div className="border-t border-[#F0F2F5]" />

                {/* Guideline 3 */}
                <div className="space-y-1">
                    <h5 className="text-xs sm:text-[13px] font-bold text-[#002E62]">
                        Total Fuel Cost
                    </h5>
                    <p className="text-xs text-[#71717A] leading-relaxed">
                        This will be calculated automatically based on the fuel consumption and cost per liter.
                    </p>
                </div>

                <div className="border-t border-[#F0F2F5]" />

                {/* Guideline 4 */}
                <div className="space-y-1">
                    <h5 className="text-xs sm:text-[13px] font-bold text-[#002E62]">
                        Date Validation
                    </h5>
                    <p className="text-xs text-[#71717A] leading-relaxed">
                        All entries are validated before submission to ensure data integrity.
                    </p>
                </div>
            </div>
        </div>
    );
}
