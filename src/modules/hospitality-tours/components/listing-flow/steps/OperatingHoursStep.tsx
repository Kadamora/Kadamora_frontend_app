import Textarea from '@shared/components/Forms/Textarea';
import Label from '@shared/components/Forms/Label';
import { useHTListingForm } from '../useHTListingForm';

const TIME_OPTIONS_HOURS = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, '0');
    const display = i === 0 ? '12:00 AM' : i < 12 ? `${i}:00 AM` : i === 12 ? '12:00 PM' : `${i - 12}:00 PM`;
    return { label: display, value: `${hour}:00` };
});

const CANCELLATION_POLICIES = [
    { label: 'Free cancellation up to 24 hours', value: 'free_24h' },
    { label: 'Free cancellation up to 48 hours', value: 'free_48h' },
    { label: 'Free cancellation up to 7 days', value: 'free_7d' },
    { label: 'Non-refundable', value: 'non_refundable' },
    { label: 'Custom policy', value: 'custom' },
];

/**
 * Operating Hours & Policies step — used exclusively by Hotel & Resorts
 */
export default function OperatingHoursStep() {
    const { state, updateField } = useHTListingForm();

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-[18px] font-semibold text-[#002E62]">Operating Hours & Policies</h2>
            </div>

            {/* Check-in / Check-out */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label>Check-in Time</Label>
                    <select
                        value={state.checkInTime}
                        onChange={(e) => updateField('checkInTime', e.target.value)}
                        className="w-full py-3 px-4 border border-[#E0DEF7] rounded-lg focus:ring-2 focus:ring-[#002E62]/70 focus:border-transparent outline-none transition-colors bg-[#F7F7FD] focus:bg-white text-[14px] font-medium text-[#52525B] cursor-pointer"
                    >
                        <option value="">Select time</option>
                        {TIME_OPTIONS_HOURS.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <Label>Check-out Time</Label>
                    <select
                        value={state.checkOutTime}
                        onChange={(e) => updateField('checkOutTime', e.target.value)}
                        className="w-full py-3 px-4 border border-[#E0DEF7] rounded-lg focus:ring-2 focus:ring-[#002E62]/70 focus:border-transparent outline-none transition-colors bg-[#F7F7FD] focus:bg-white text-[14px] font-medium text-[#52525B] cursor-pointer"
                    >
                        <option value="">Select time</option>
                        {TIME_OPTIONS_HOURS.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Cancellation Policy */}
            <div>
                <Label>Cancellation Policy</Label>
                <select
                    value={state.cancellationPolicy}
                    onChange={(e) => updateField('cancellationPolicy', e.target.value)}
                    className="w-full py-3 px-4 border border-[#E0DEF7] rounded-lg focus:ring-2 focus:ring-[#002E62]/70 focus:border-transparent outline-none transition-colors bg-[#F7F7FD] focus:bg-white text-[14px] font-medium text-[#52525B] cursor-pointer"
                >
                    <option value="">Select a policy</option>
                    {CANCELLATION_POLICIES.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            </div>

            {/* House Rules — toggles */}
            <div className="space-y-4">
                <p className="text-[15px] font-semibold text-[#002E62]">House Rules</p>

                {/* Pets Allowed */}
                <div className="flex items-center justify-between py-3 border-b border-[#F1F5F9]">
                    <span className="text-sm font-medium text-[#374151]">Pets Allowed</span>
                    <button
                        type="button"
                        role="switch"
                        aria-checked={state.petsAllowed}
                        onClick={() => updateField('petsAllowed', !state.petsAllowed)}
                        className={`relative h-6 w-11 rounded-full transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#359F6A]/50 ${
                            state.petsAllowed ? 'bg-[#359F6A]' : 'bg-[#D1D5DB]'
                        }`}
                    >
                        <span
                            className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
                                state.petsAllowed ? 'translate-x-5' : 'translate-x-0'
                            }`}
                        />
                    </button>
                </div>

                {/* Smoking Allowed */}
                <div className="flex items-center justify-between py-3 border-b border-[#F1F5F9]">
                    <span className="text-sm font-medium text-[#374151]">Smoking Allowed</span>
                    <button
                        type="button"
                        role="switch"
                        aria-checked={state.smokingAllowed}
                        onClick={() => updateField('smokingAllowed', !state.smokingAllowed)}
                        className={`relative h-6 w-11 rounded-full transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#359F6A]/50 ${
                            state.smokingAllowed ? 'bg-[#359F6A]' : 'bg-[#D1D5DB]'
                        }`}
                    >
                        <span
                            className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
                                state.smokingAllowed ? 'translate-x-5' : 'translate-x-0'
                            }`}
                        />
                    </button>
                </div>
            </div>

            {/* Extra Policies */}
            <Textarea
                id="extra-policies"
                title="Additional Policies"
                placeholder="Enter any additional house rules or policies (optional)"
                value={state.extraPolicies}
                onChange={(e) => updateField('extraPolicies', e.target.value)}
                rows={4}
            />
        </div>
    );
}
