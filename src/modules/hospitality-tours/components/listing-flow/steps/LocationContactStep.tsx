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
    { label: 'Ebonyi', value: 'ebonyi' },
    { label: 'Edo', value: 'edo' },
    { label: 'Ekiti', value: 'ekiti' },
    { label: 'Enugu', value: 'enugu' },
    { label: 'FCT Abuja', value: 'fct' },
    { label: 'Gombe', value: 'gombe' },
    { label: 'Imo', value: 'imo' },
    { label: 'Jigawa', value: 'jigawa' },
    { label: 'Kaduna', value: 'kaduna' },
    { label: 'Kano', value: 'kano' },
    { label: 'Katsina', value: 'katsina' },
    { label: 'Kebbi', value: 'kebbi' },
    { label: 'Kogi', value: 'kogi' },
    { label: 'Kwara', value: 'kwara' },
    { label: 'Lagos', value: 'lagos' },
    { label: 'Nasarawa', value: 'nasarawa' },
    { label: 'Niger', value: 'niger' },
    { label: 'Ogun', value: 'ogun' },
    { label: 'Ondo', value: 'ondo' },
    { label: 'Osun', value: 'osun' },
    { label: 'Oyo', value: 'oyo' },
    { label: 'Plateau', value: 'plateau' },
    { label: 'Rivers', value: 'rivers' },
    { label: 'Sokoto', value: 'sokoto' },
    { label: 'Taraba', value: 'taraba' },
    { label: 'Yobe', value: 'yobe' },
    { label: 'Zamfara', value: 'zamfara' },
];

export default function LocationContactStep() {
    const { state, updateField } = useHTListingForm();

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-[18px] font-semibold text-[#002E62]">Location & Contact</h2>
            </div>

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
                    onClick={() => {/* Map modal would open here */}}
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

            {/* Social Media */}
            <div>
                <p className="block mb-2 text-[#002E62] font-semibold text-[15px]">Social Media</p>
                <div className="space-y-3">
                    <input
                        type="url"
                        placeholder="Facebook Link"
                        value={state.socialMedia.facebook}
                        onChange={(e) =>
                            updateField('socialMedia', { ...state.socialMedia, facebook: e.target.value })
                        }
                        className="w-full py-3 px-4 border border-[#E0DEF7] rounded-lg focus:ring-2 focus:ring-[#002E62]/70 focus:border-transparent outline-none transition-colors bg-[#F7F7FD] focus:bg-white placeholder-[#52525B] text-[14px] font-medium"
                    />
                    <input
                        type="url"
                        placeholder="Instagram Link"
                        value={state.socialMedia.instagram}
                        onChange={(e) =>
                            updateField('socialMedia', { ...state.socialMedia, instagram: e.target.value })
                        }
                        className="w-full py-3 px-4 border border-[#E0DEF7] rounded-lg focus:ring-2 focus:ring-[#002E62]/70 focus:border-transparent outline-none transition-colors bg-[#F7F7FD] focus:bg-white placeholder-[#52525B] text-[14px] font-medium"
                    />
                    <input
                        type="url"
                        placeholder="Twitter Link"
                        value={state.socialMedia.twitter}
                        onChange={(e) =>
                            updateField('socialMedia', { ...state.socialMedia, twitter: e.target.value })
                        }
                        className="w-full py-3 px-4 border border-[#E0DEF7] rounded-lg focus:ring-2 focus:ring-[#002E62]/70 focus:border-transparent outline-none transition-colors bg-[#F7F7FD] focus:bg-white placeholder-[#52525B] text-[14px] font-medium"
                    />
                </div>
            </div>
        </div>
    );
}
