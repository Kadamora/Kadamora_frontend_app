import { FiChevronDown } from 'react-icons/fi';
import type { LeasePropertyFormData } from '../../../types/commercialFacilities';

interface LeaseTermPricingStepProps {
    formData: LeasePropertyFormData;
    onChange: (updated: Partial<LeasePropertyFormData>) => void;
    onPrevious: () => void;
    onNext: () => void;
}

const RENEWAL_OPTIONS = ['Yes', 'No'];
const MAINTENANCE_RESPONSIBILITIES = ['Tenant', 'Landlord', 'Shared'];

export default function LeaseTermPricingStep({
    formData,
    onChange,
    onPrevious,
    onNext,
}: LeaseTermPricingStepProps) {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onNext();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 pt-1">
            {/* Row 1: Lease Price & Lease Duration */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#002E62] block">
                        Lease Price
                    </label>
                    <input
                        type="text"
                        required
                        value={formData.leasePrice}
                        onChange={(e) => onChange({ leasePrice: e.target.value })}
                        placeholder="Enter lease price"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E0E8F2] bg-[#F7F9FC] text-xs text-[#091E42] placeholder-[#71717A] focus:outline-none focus:ring-1 focus:ring-[#002E62] focus:bg-white transition-all"
                    />
                </div>

                <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#002E62] block">
                        Lease Duration
                    </label>
                    <input
                        type="text"
                        required
                        value={formData.leaseDuration}
                        onChange={(e) => onChange({ leaseDuration: e.target.value })}
                        placeholder="Enter lease duration"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E0E8F2] bg-[#F7F9FC] text-xs text-[#091E42] placeholder-[#71717A] focus:outline-none focus:ring-1 focus:ring-[#002E62] focus:bg-white transition-all"
                    />
                </div>
            </div>

            {/* Row 2: Renewal Option & Maintenance Responsibility */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#002E62] block">
                        Renewal Option
                    </label>
                    <div className="relative">
                        <select
                            value={formData.renewalOption}
                            onChange={(e) =>
                                onChange({
                                    renewalOption: e.target.value as 'Yes' | 'No' | '',
                                })
                            }
                            className="w-full px-3.5 py-2.5 rounded-xl border border-[#E0E8F2] bg-[#F7F9FC] text-xs text-[#091E42] focus:outline-none focus:ring-1 focus:ring-[#002E62] focus:bg-white transition-all appearance-none cursor-pointer pr-10"
                        >
                            <option value="" disabled>
                                Select renewal option
                            </option>
                            {RENEWAL_OPTIONS.map((opt) => (
                                <option key={opt} value={opt}>
                                    {opt}
                                </option>
                            ))}
                        </select>
                        <FiChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#71717A] pointer-events-none" />
                    </div>
                </div>

                <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#002E62] block">
                        Maintenance Responsibility
                    </label>
                    <div className="relative">
                        <select
                            value={formData.maintenanceResponsibility}
                            onChange={(e) =>
                                onChange({
                                    maintenanceResponsibility: e.target.value as
                                        | 'Tenant'
                                        | 'Landlord'
                                        | 'Shared'
                                        | '',
                                })
                            }
                            className="w-full px-3.5 py-2.5 rounded-xl border border-[#E0E8F2] bg-[#F7F9FC] text-xs text-[#091E42] focus:outline-none focus:ring-1 focus:ring-[#002E62] focus:bg-white transition-all appearance-none cursor-pointer pr-10"
                        >
                            <option value="" disabled>
                                Select maintenance option
                            </option>
                            {MAINTENANCE_RESPONSIBILITIES.map((resp) => (
                                <option key={resp} value={resp}>
                                    {resp}
                                </option>
                            ))}
                        </select>
                        <FiChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#71717A] pointer-events-none" />
                    </div>
                </div>
            </div>

            {/* Row 3: Security Deposit */}
            <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#002E62] block">
                    Security Deposit
                </label>
                <input
                    type="text"
                    value={formData.securityDeposit}
                    onChange={(e) => onChange({ securityDeposit: e.target.value })}
                    placeholder="Enter security deposit"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E0E8F2] bg-[#F7F9FC] text-xs text-[#091E42] placeholder-[#71717A] focus:outline-none focus:ring-1 focus:ring-[#002E62] focus:bg-white transition-all"
                />
            </div>

            {/* Row 4: Additional Charges */}
            <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#002E62] block">
                    Additional Charges
                </label>
                <textarea
                    rows={3}
                    value={formData.additionalCharges}
                    onChange={(e) => onChange({ additionalCharges: e.target.value })}
                    placeholder="Enter additional charges here"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E0E8F2] bg-[#F7F9FC] text-xs text-[#091E42] placeholder-[#71717A] focus:outline-none focus:ring-1 focus:ring-[#002E62] focus:bg-white resize-none transition-all"
                />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-3">
                <button
                    type="button"
                    onClick={onPrevious}
                    className="bg-[#E6F4FB] hover:bg-[#D4EDFA] text-[#0062D2] px-6 py-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                >
                    Previous
                </button>
                <button
                    type="submit"
                    className="bg-[#002E62] hover:bg-[#002047] text-white px-6 py-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer shadow-xs"
                >
                    Proceed
                </button>
            </div>
        </form>
    );
}
