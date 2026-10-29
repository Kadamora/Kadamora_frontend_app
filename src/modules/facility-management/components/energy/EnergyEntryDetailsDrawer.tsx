import { useEffect, useRef } from 'react';
import { FiX, FiClock, FiZap, FiCheckCircle } from 'react-icons/fi';
import type { EnergyEntry } from '../../types/energyParking';
import Button from '@shared/components/Button/Button';
import { showSuccessToast } from '@shared/components/Toast/Toast';

export interface EnergyEntryDetailsDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    entry: EnergyEntry | null;
}

export default function EnergyEntryDetailsDrawer({
    isOpen,
    onClose,
    entry,
}: EnergyEntryDetailsDrawerProps) {
    const drawerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!isOpen) return;

        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.style.overflow = prevOverflow;
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    if (!entry) return null;

    const gridKwh = Math.round((entry.totalKwh * entry.gridPercentage) / 100);
    const generatorKwh = Math.round((entry.totalKwh * entry.generatorPercentage) / 100);

    const handleExport = () => {
        showSuccessToast('Log Exported', `Detailed energy breakdown for ${entry.code} exported.`);
    };

    return (
        <div
            className={`fixed inset-0 z-50 transition-all ${
                isOpen ? 'pointer-events-auto' : 'pointer-events-none'
            }`}
            role="presentation"
        >
            {/* Backdrop */}
            <div
                onClick={onClose}
                className={`absolute inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity duration-300 ${
                    isOpen ? 'opacity-100' : 'opacity-0'
                }`}
                aria-hidden="true"
            />

            {/* Slide-over Drawer */}
            <aside
                ref={drawerRef}
                className={`absolute top-0 right-0 h-full w-full max-w-[500px] bg-white shadow-2xl transition-transform duration-300 ease-out flex flex-col z-10 ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-5 sm:p-6 border-b border-[#F0F2F5]">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-[#E0F7FA] text-[#00BCD4] flex items-center justify-center">
                            <FiZap className="h-5 w-5" />
                        </div>
                        <div>
                            <h3 className="text-base sm:text-lg font-bold text-[#002E62]">
                                Entry Details &bull; {entry.code}
                            </h3>
                            <div className="flex items-center gap-1.5 text-xs text-[#71717A]">
                                <FiClock className="h-3 w-3" />
                                <span>{entry.timestamp}</span>
                            </div>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="h-8 w-8 rounded-full bg-[#F2F5F8] text-[#71717A] hover:bg-[#E4E9EF] flex items-center justify-center transition-colors cursor-pointer"
                        aria-label="Close drawer"
                    >
                        <FiX className="h-4 w-4" />
                    </button>
                </div>

                {/* Body Content */}
                <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
                    {/* Status Badge & Facility */}
                    <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                        <div>
                            <span className="text-[11px] text-[#71717A] block font-medium">Facility / Substation</span>
                            <span className="text-xs sm:text-sm font-bold text-[#002E62]">{entry.facility || 'Main Substation Alpha'}</span>
                        </div>
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#EBFDF5] text-[#12B76A] border border-[#A6F4C5] flex items-center gap-1">
                            <FiCheckCircle className="h-3 w-3" />
                            <span>{entry.status || 'Optimal'}</span>
                        </span>
                    </div>

                    {/* Total Consumption Overview */}
                    <div className="rounded-2xl border border-[#CCE3FD] bg-[#F9FBFF] p-4 sm:p-5 space-y-3">
                        <span className="text-xs font-semibold text-[#71717A] uppercase tracking-wider block">
                            Total Consumption
                        </span>
                        <div className="flex items-baseline justify-between">
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002E62]">
                                {entry.totalKwh.toLocaleString()} <span className="text-sm font-semibold text-[#71717A]">kWh</span>
                            </h2>
                            <span className="text-xs font-semibold text-[#12B76A] bg-emerald-50 px-2 py-0.5 rounded">
                                Verified Reading
                            </span>
                        </div>

                        {/* Power Distribution Bar */}
                        <div className="space-y-1.5 pt-2">
                            <div className="flex justify-between text-xs font-medium text-[#52525B]">
                                <span className="text-emerald-700 font-semibold">Grid Supply ({entry.gridPercentage}%)</span>
                                <span className="text-amber-700 font-semibold">Generator ({entry.generatorPercentage}%)</span>
                            </div>
                            <div className="h-2.5 w-full bg-amber-100 rounded-full overflow-hidden flex">
                                <div
                                    style={{ width: `${entry.gridPercentage}%` }}
                                    className="bg-[#12B76A] h-full"
                                />
                                <div
                                    style={{ width: `${entry.generatorPercentage}%` }}
                                    className="bg-[#FFCA8C] h-full"
                                />
                            </div>
                            <div className="flex justify-between text-[11px] text-[#71717A]">
                                <span>{gridKwh} kWh</span>
                                <span>{generatorKwh} kWh</span>
                            </div>
                        </div>
                    </div>

                    {/* Generator & Fuel Metrics */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="rounded-xl border border-[#E4E4E7] p-3.5 bg-white space-y-1">
                            <span className="text-[11px] text-[#71717A] font-medium block">Generator Runtime</span>
                            <span className="text-sm sm:text-base font-bold text-[#002E62]">
                                {entry.generatorHours || 4.5} Hours
                            </span>
                        </div>

                        <div className="rounded-xl border border-[#E4E4E7] p-3.5 bg-white space-y-1">
                            <span className="text-[11px] text-[#71717A] font-medium block">Fuel Consumed</span>
                            <span className="text-sm sm:text-base font-bold text-[#002E62]">
                                {entry.fuelLitres || 120} Litres
                            </span>
                        </div>

                        <div className="rounded-xl border border-[#E4E4E7] p-3.5 bg-white space-y-1">
                            <span className="text-[11px] text-[#71717A] font-medium block">Fuel Expense</span>
                            <span className="text-sm sm:text-base font-bold text-[#002E62]">
                                NGN {(entry.fuelCost || 32400).toLocaleString()}
                            </span>
                        </div>

                        <div className="rounded-xl border border-[#E4E4E7] p-3.5 bg-white space-y-1">
                            <span className="text-[11px] text-[#71717A] font-medium block">Meter Differential</span>
                            <span className="text-sm sm:text-base font-bold text-[#002E62]">
                                {(entry.meterEnd || 12900) - (entry.meterStart || 12450)} kWh
                            </span>
                        </div>
                    </div>

                    {/* Meter Readings */}
                    <div className="rounded-xl border border-[#E4E4E7] p-4 bg-white space-y-3">
                        <h4 className="text-xs font-bold text-[#002E62] uppercase tracking-wider">
                            Meter Readings
                        </h4>
                        <div className="space-y-2 text-xs">
                            <div className="flex items-center justify-between text-[#52525B] pb-2 border-b border-[#F1F5F9]">
                                <span>Start Meter Reading</span>
                                <span className="font-bold text-[#002E62]">{entry.meterStart?.toLocaleString() || '12,450'} kWh</span>
                            </div>
                            <div className="flex items-center justify-between text-[#52525B] pb-2 border-b border-[#F1F5F9]">
                                <span>End Meter Reading</span>
                                <span className="font-bold text-[#002E62]">{entry.meterEnd?.toLocaleString() || '12,900'} kWh</span>
                            </div>
                            <div className="flex items-center justify-between text-[#52525B] pt-1">
                                <span>Logged By</span>
                                <span className="font-semibold text-[#0062D2]">{entry.loggedBy || 'Engr. Daniel Okafor'}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="p-4 sm:p-5 border-t border-[#F0F2F5] flex items-center justify-end gap-3 bg-white">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={handleExport}
                        className="px-4 py-2 text-xs font-semibold rounded-lg"
                    >
                        Export Summary
                    </Button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="bg-[#002E62] hover:bg-[#002047] text-white px-5 py-2 text-xs font-semibold rounded-lg cursor-pointer"
                    >
                        Done
                    </button>
                </div>
            </aside>
        </div>
    );
}
