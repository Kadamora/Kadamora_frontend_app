import { useState } from 'react';
import { useHTListingForm } from '../useHTListingForm';
import { FiPlus } from 'react-icons/fi';

// Default amenity chips matching design
const DEFAULT_AMENITIES: Record<string, string[]> = {
    'cities-destinations': [
        'Airport', 'Beach', 'Garden', 'Restaurant', 'Museums', 'Parking Space',
        'Public Transport', 'Nightlife', 'Shopping Mall', 'Hospital', 'Schools',
    ],
    'parks-nature': [
        'Hiking Trails', 'Wildlife Viewing', 'Camping', 'Fishing', 'Bird Watching',
        'Picnic Areas', 'Visitor Center', 'Car Park', 'Restrooms', 'Tour Guides',
    ],
    'hotel-resorts': [
        'Swimming Pool', 'Gym', 'Spa', 'Restaurant', 'Bar', 'Free WiFi',
        'Room Service', 'Airport Shuttle', 'Parking', 'Conference Room',
        'Laundry', 'Concierge',
    ],
    'arts-culture': [
        'Guided Tours', 'Audio Guide', 'Gift Shop', 'Café', 'Parking',
        'Wheelchair Access', 'Photography Allowed', 'Library', 'Garden',
    ],
    // Events: uses Ticketing step instead — fallback to general
    'events-festivals': [
        'Security', 'First Aid', 'Food Vendors', 'Parking', 'Restrooms',
        'VIP Area', 'Live Streaming', 'ATM', 'Merchandise Stands',
    ],
};

export default function FeaturesAmenitiesStep() {
    const { categoryId, state, toggleAmenity, addCustomAmenity } = useHTListingForm();

    const [showCustomInput, setShowCustomInput] = useState(false);
    const [customInput, setCustomInput] = useState('');

    const presets = DEFAULT_AMENITIES[categoryId] ?? DEFAULT_AMENITIES['cities-destinations'];

    // Merge presets with any custom ones that aren't in presets
    const allAmenities = [...new Set([...presets, ...state.amenities])];

    const handleAddCustom = () => {
        if (customInput.trim()) {
            addCustomAmenity(customInput.trim());
            setCustomInput('');
            setShowCustomInput(false);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-[18px] font-semibold text-[#002E62]">Facilities & Amenities</h2>
            </div>

            <div>
                <p className="text-sm font-semibold text-[#002E62] mb-3">Amenities</p>
                <div className="flex flex-wrap gap-2">
                    {allAmenities.map((amenity) => {
                        const selected = state.amenities.includes(amenity);
                        return (
                            <button
                                key={amenity}
                                type="button"
                                onClick={() => toggleAmenity(amenity)}
                                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all cursor-pointer ${
                                    selected
                                        ? 'bg-[#002E62] text-white border-[#002E62] shadow-sm'
                                        : 'bg-white text-[#52525B] border-[#D1D5DB] hover:border-[#002E62] hover:text-[#002E62]'
                                }`}
                            >
                                {amenity}
                            </button>
                        );
                    })}
                </div>

                {/* Add custom amenity */}
                <div className="mt-4">
                    {showCustomInput ? (
                        <div className="flex gap-2 items-center">
                            <input
                                type="text"
                                placeholder="Enter amenity name"
                                value={customInput}
                                onChange={(e) => setCustomInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCustom())}
                                autoFocus
                                className="flex-1 py-2 px-3 border border-[#E0DEF7] rounded-lg focus:ring-2 focus:ring-[#002E62]/70 focus:border-transparent outline-none transition-colors bg-[#F7F7FD] focus:bg-white placeholder-[#94A3B8] text-[14px]"
                            />
                            <button
                                type="button"
                                onClick={handleAddCustom}
                                className="px-4 py-2 bg-[#002E62] text-white text-sm font-semibold rounded-lg hover:bg-[#072440] transition-colors cursor-pointer"
                            >
                                Add
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setShowCustomInput(false);
                                    setCustomInput('');
                                }}
                                className="px-3 py-2 text-sm text-[#52525B] hover:text-[#002E62] transition-colors cursor-pointer"
                            >
                                Cancel
                            </button>
                        </div>
                    ) : (
                        <button
                            type="button"
                            onClick={() => setShowCustomInput(true)}
                            className="flex items-center gap-1.5 text-sm font-semibold text-[#002E62] hover:text-[#359F6A] transition-colors cursor-pointer"
                        >
                            <FiPlus className="h-4 w-4" />
                            Add Amenities
                        </button>
                    )}
                </div>
            </div>

            {state.amenities.length > 0 && (
                <div className="bg-[#F7F7FD] border border-[#E0DEF7] rounded-xl p-4">
                    <p className="text-xs font-semibold text-[#002E62] mb-2">
                        Selected ({state.amenities.length})
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {state.amenities.map((amenity) => (
                            <span
                                key={amenity}
                                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F5EF] text-[#359F6A] text-xs font-medium"
                            >
                                {amenity}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
