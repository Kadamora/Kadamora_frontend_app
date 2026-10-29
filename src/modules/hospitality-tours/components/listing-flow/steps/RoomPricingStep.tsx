import { useState } from 'react';
import Input from '@shared/components/Forms/Input';
import Select from '@shared/components/Forms/Select';
import { useHTListingForm } from '../useHTListingForm';
import { FiPlus, FiTrash2 } from 'react-icons/fi';

const ROOM_AMENITY_PRESETS = [
    'Air Conditioning', 'TV', 'WiFi', 'Mini Bar', 'Safe', 'Bathtub',
    'King Bed', 'Twin Beds', 'Balcony', 'Ocean View', 'City View',
];

const CAPACITY_OPTIONS = [
    { label: '1 person', value: '1' },
    { label: '2 persons', value: '2' },
    { label: '3 persons', value: '3' },
    { label: '4 persons', value: '4' },
    { label: '5+ persons', value: '5+' },
];

/**
 * Room & Pricing / Amenities step — used exclusively by Hotel & Resorts
 */
export default function RoomPricingStep() {
    const { state, updateField, addRoomType, removeRoomType } = useHTListingForm();

    const [newRoom, setNewRoom] = useState({
        name: '',
        price: '',
        capacity: '',
        amenities: [] as string[],
    });
    const [roomAmenityInput, setRoomAmenityInput] = useState('');
    const [error, setError] = useState('');

    const toggleRoomAmenity = (amenity: string) => {
        setNewRoom((prev) => ({
            ...prev,
            amenities: prev.amenities.includes(amenity)
                ? prev.amenities.filter((a) => a !== amenity)
                : [...prev.amenities, amenity],
        }));
    };

    const handleAddRoom = () => {
        if (!newRoom.name.trim() || !newRoom.price.trim()) {
            setError('Please fill in room name and price.');
            return;
        }
        setError('');
        addRoomType(newRoom);
        setNewRoom({ name: '', price: '', capacity: '', amenities: [] });
    };

    // Hotel-wide amenities
    const HOTEL_AMENITIES = [
        'Swimming Pool', 'Gym', 'Spa', 'Restaurant', 'Bar', 'Free WiFi',
        'Room Service', 'Airport Shuttle', 'Parking', 'Conference Room',
        'Laundry', 'Concierge',
    ];

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-[18px] font-semibold text-[#002E62]">Room & Pricing / Amenities</h2>
            </div>

            {/* ── Add Room Type ── */}
            <div className="border border-[#E0DEF7] rounded-xl p-5 bg-[#F7F7FD] space-y-4">
                <h3 className="text-sm font-semibold text-[#002E62]">Add Room Type</h3>

                <div className="grid grid-cols-2 gap-4">
                    <Input
                        id="room-name"
                        title="Room Type Name"
                        placeholder="e.g. Deluxe Double Room"
                        value={newRoom.name}
                        onChange={(e) => setNewRoom((prev) => ({ ...prev, name: e.target.value }))}
                    />
                    <Input
                        id="room-price"
                        title="Price per Night (₦)"
                        placeholder="e.g. 45,000"
                        value={newRoom.price}
                        onChange={(e) => setNewRoom((prev) => ({ ...prev, price: e.target.value }))}
                    />
                </div>

                <Select
                    id="room-capacity"
                    title="Room Capacity"
                    placeholder="Select capacity"
                    options={CAPACITY_OPTIONS}
                    value={newRoom.capacity}
                    onChange={(val) => setNewRoom((prev) => ({ ...prev, capacity: val }))}
                />

                {/* Room Amenities */}
                <div>
                    <p className="text-sm font-semibold text-[#002E62] mb-2">Room Amenities</p>
                    <div className="flex flex-wrap gap-2 mb-2">
                        {ROOM_AMENITY_PRESETS.map((amenity) => (
                            <button
                                key={amenity}
                                type="button"
                                onClick={() => toggleRoomAmenity(amenity)}
                                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                                    newRoom.amenities.includes(amenity)
                                        ? 'bg-[#002E62] text-white border-[#002E62]'
                                        : 'bg-white text-[#52525B] border-[#D1D5DB] hover:border-[#002E62]'
                                }`}
                            >
                                {amenity}
                            </button>
                        ))}
                    </div>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Add custom amenity"
                            value={roomAmenityInput}
                            onChange={(e) => setRoomAmenityInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    if (roomAmenityInput.trim()) {
                                        toggleRoomAmenity(roomAmenityInput.trim());
                                        setRoomAmenityInput('');
                                    }
                                }
                            }}
                            className="flex-1 py-2 px-3 border border-[#E0DEF7] rounded-lg focus:ring-2 focus:ring-[#002E62]/70 focus:border-transparent outline-none bg-white placeholder-[#94A3B8] text-sm"
                        />
                        <button
                            type="button"
                            onClick={() => {
                                if (roomAmenityInput.trim()) {
                                    toggleRoomAmenity(roomAmenityInput.trim());
                                    setRoomAmenityInput('');
                                }
                            }}
                            className="px-3 py-2 bg-white border border-[#E0DEF7] rounded-lg text-sm text-[#002E62] hover:bg-[#F0F4FF] transition-colors cursor-pointer"
                        >
                            <FiPlus className="h-4 w-4" />
                        </button>
                    </div>
                </div>

                {error && <p className="text-xs text-red-500">{error}</p>}

                <button
                    type="button"
                    onClick={handleAddRoom}
                    className="flex items-center gap-2 px-5 py-2.5 bg-[#002E62] hover:bg-[#072440] text-white text-sm font-semibold rounded-lg transition-colors cursor-pointer"
                >
                    <FiPlus className="h-4 w-4" />
                    Add Room Type
                </button>
            </div>

            {/* ── Added Room Types ── */}
            {state.roomTypes.length > 0 && (
                <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-[#002E62]">Room Types Added</h3>
                    {state.roomTypes.map((room) => (
                        <div
                            key={room.id}
                            className="flex items-start justify-between p-4 border border-[#E2E8F0] rounded-xl bg-white"
                        >
                            <div className="space-y-1">
                                <p className="text-sm font-semibold text-[#002E62]">{room.name}</p>
                                <p className="text-xs text-[#52525B]">
                                    ₦{room.price}/night · {room.capacity} person(s)
                                </p>
                                {room.amenities.length > 0 && (
                                    <div className="flex flex-wrap gap-1 mt-1">
                                        {room.amenities.map((a) => (
                                            <span
                                                key={a}
                                                className="px-2 py-0.5 rounded-full bg-[#E8F5EF] text-[#359F6A] text-xs font-medium"
                                            >
                                                {a}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <button
                                type="button"
                                onClick={() => removeRoomType(room.id)}
                                className="p-1.5 rounded-lg text-[#94A3B8] hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer shrink-0"
                            >
                                <FiTrash2 className="h-4 w-4" />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* ── Hotel-wide Amenities ── */}
            <div>
                <p className="text-sm font-semibold text-[#002E62] mb-3">Hotel-wide Amenities</p>
                <div className="flex flex-wrap gap-2">
                    {HOTEL_AMENITIES.map((amenity) => {
                        const selected = state.hotelAmenities.includes(amenity);
                        return (
                            <button
                                key={amenity}
                                type="button"
                                onClick={() => {
                                    const updated = selected
                                        ? state.hotelAmenities.filter((a) => a !== amenity)
                                        : [...state.hotelAmenities, amenity];
                                    updateField('hotelAmenities', updated);
                                }}
                                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all cursor-pointer ${
                                    selected
                                        ? 'bg-[#002E62] text-white border-[#002E62]'
                                        : 'bg-white text-[#52525B] border-[#D1D5DB] hover:border-[#002E62]'
                                }`}
                            >
                                {amenity}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
