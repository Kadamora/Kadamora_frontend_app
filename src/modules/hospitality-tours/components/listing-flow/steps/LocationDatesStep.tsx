import Input from '@shared/components/Forms/Input';
import Select from '@shared/components/Forms/Select';
import { useHTListingForm } from '../useHTListingForm';
import { FiMapPin } from 'react-icons/fi';

const NIGERIA_STATES = [
    { label: 'Abia', value: 'abia' },
    { label: 'Adamawa', value: 'adamawa' },
    { label: 'Akwa Ibom', value: 'akwa_ibom' },
    { label: 'Anambra', value: 'anambra' },
    { label: 'Bauchi', value: 'bauchi' },
    { label: 'Bayelsa', value: 'bayelsa' },
    { label: 'Benue', value: 'benue' },
    { label: 'Borno', value: 'borno' },
    { label: 'Cross River', value: 'cross_river' },
    { label: 'Delta', value: 'delta' },
    { label: 'FCT Abuja', value: 'fct' },
    { label: 'Lagos', value: 'lagos' },
    { label: 'Ogun', value: 'ogun' },
    { label: 'Oyo', value: 'oyo' },
    { label: 'Rivers', value: 'rivers' },
];

const DATE_OPTIONS = [
    { label: 'January 2025', value: '2025-01' },
    { label: 'February 2025', value: '2025-02' },
    { label: 'March 2025', value: '2025-03' },
    { label: 'June 2025', value: '2025-06' },
    { label: 'July 2025', value: '2025-07' },
    { label: 'December 2025', value: '2025-12' },
];

/**
 * Location & Dates step — used exclusively by Events & Festivals
 * Combines the standard location fields with event-specific date & venue fields
 */
export default function LocationDatesStep() {
    const { state, updateField } = useHTListingForm();

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-[18px] font-semibold text-[#002E62]">Location & Dates</h2>
            </div>

            {/* Event Dates */}
            <div className="grid grid-cols-2 gap-4">
                <Select
                    id="event-from-date"
                    title="From Date"
                    placeholder="Select Date"
                    options={DATE_OPTIONS}
                    value={state.eventFromDate}
                    onChange={(val) => updateField('eventFromDate', val)}
                />
                <Select
                    id="event-to-date"
                    title="To Date"
                    placeholder="Select Date"
                    options={DATE_OPTIONS}
                    value={state.eventToDate}
                    onChange={(val) => updateField('eventToDate', val)}
                />
            </div>

            {/* Venue */}
            <Input
                id="event-venue"
                title="Venue/Location Name"
                placeholder="e.g. Tafawa Balewa Square, Lagos"
                value={state.eventVenue}
                onChange={(e) => updateField('eventVenue', e.target.value)}
            />

            {/* State + City */}
            <div className="grid grid-cols-2 gap-4">
                <Select
                    id="state"
                    title="State"
                    placeholder="Select State"
                    options={NIGERIA_STATES}
                    value={state.state}
                    onChange={(val) => updateField('state', val)}
                />
                <Input
                    id="city"
                    title="City"
                    placeholder="Enter City"
                    value={state.city}
                    onChange={(e) => updateField('city', e.target.value)}
                />
            </div>

            {/* Address */}
            <Input
                id="address"
                title="Address"
                placeholder="Enter Address"
                value={state.address}
                onChange={(e) => updateField('address', e.target.value)}
            />

            {/* Pin Location On Map */}
            <div>
                <p className="block mb-1 text-[#002E62] font-semibold text-[15px]">Pin Location On Map</p>
                <button
                    type="button"
                    className="w-full flex flex-col items-center justify-center gap-2 py-8 border border-dashed border-[#E0DEF7] rounded-lg bg-[#F7F7FD] hover:bg-[#F0F4FF] transition-colors cursor-pointer group"
                >
                    <FiMapPin className="h-6 w-6 text-[#94A3B8] group-hover:text-[#002E62] transition-colors" />
                    <span className="text-sm font-medium text-[#52525B] group-hover:text-[#002E62] transition-colors">
                        Click to set location on the map
                    </span>
                    <span className="text-xs text-[#94A3B8]">Drag the pin to adjust precise location</span>
                </button>
            </div>

            {/* Phone + Email */}
            <div className="grid grid-cols-2 gap-4">
                <Input
                    id="phone"
                    title="Phone Number"
                    placeholder="Enter Phone Number"
                    type="tel"
                    value={state.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                />
                <Input
                    id="email"
                    title="Email"
                    placeholder="Enter Email"
                    type="email"
                    value={state.email}
                    onChange={(e) => updateField('email', e.target.value)}
                />
            </div>
        </div>
    );
}
