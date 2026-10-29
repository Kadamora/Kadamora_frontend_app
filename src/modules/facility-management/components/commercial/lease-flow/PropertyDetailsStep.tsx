import { useState, useRef, useEffect } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import type { LeasePropertyFormData } from '../../../types/commercialFacilities';

interface PropertyDetailsStepProps {
    formData: LeasePropertyFormData;
    onChange: (updated: Partial<LeasePropertyFormData>) => void;
    onNext: () => void;
}

const CATEGORY_TYPES = [
    'Residential',
    'Commercial',
    'Mixed-Use Properties',
    'Land Listings',
    'Others',
];

const PROPERTY_TYPES = [
    'Warehouse',
    'Office Space',
    'Apartment',
    'Shop',
];

const FURNISHING_STATUSES = [
    'Furnished',
    'Unfurnished',
    'Partly Furnished',
];

const AMENITIES_LIST = [
    'Swimming Pool',
    'AC',
    'Garden',
    'Elevator',
    'Gym',
    'Parking Space',
    'Parking',
    'Wifi',
];

const DEFAULT_FACILITIES = [
    { key: 'Living Room', defaultUnits: 1 },
    { key: 'Bedroom', defaultUnits: 5 },
    { key: 'Bathroom/ Toilet', defaultUnits: 5 },
    { key: 'Kitchen', defaultUnits: 1 },
    { key: 'Store', defaultUnits: 1 },
];

export default function PropertyDetailsStep({
    formData,
    onChange,
    onNext,
}: PropertyDetailsStepProps) {
    const [isFacilitiesDropdownOpen, setIsFacilitiesDropdownOpen] = useState(false);
    const facilitiesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (facilitiesRef.current && !facilitiesRef.current.contains(event.target as Node)) {
                setIsFacilitiesDropdownOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleAmenity = (amenity: string) => {
        const current = [...formData.amenities];
        const index = current.indexOf(amenity);
        if (index > -1) {
            current.splice(index, 1);
        } else {
            current.push(amenity);
        }
        onChange({ amenities: current });
    };

    const toggleFacility = (facilityKey: string, defaultUnits: number) => {
        const currentFacilities = { ...formData.facilities };
        if (currentFacilities[facilityKey] !== undefined && currentFacilities[facilityKey] !== null) {
            delete currentFacilities[facilityKey];
        } else {
            currentFacilities[facilityKey] = defaultUnits;
        }
        onChange({ facilities: currentFacilities });
    };

    const updateFacilityUnit = (facilityKey: string, units: number) => {
        const currentFacilities = { ...formData.facilities };
        currentFacilities[facilityKey] = units;
        onChange({ facilities: currentFacilities });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onNext();
    };

    // Summary of selected facilities for the trigger button
    const selectedFacilityCount = Object.keys(formData.facilities).length;
    const facilitiesSummary =
        selectedFacilityCount > 0
            ? `${selectedFacilityCount} facilities selected`
            : 'Select facilities';

    return (
        <form onSubmit={handleSubmit} className="space-y-4 pt-1">
            {/* Property Category Radio Buttons */}
            <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#002E62] block">
                    Property Category
                </label>
                <div className="flex items-center gap-6 pt-1">
                    {(['AFFORDABLE', 'LUXURIOUS', 'ULTRA-LUXURIOUS'] as const).map((cat) => (
                        <label
                            key={cat}
                            className="flex items-center gap-2 text-xs font-medium text-[#091E42] cursor-pointer select-none"
                        >
                            <input
                                type="radio"
                                name="propertyCategory"
                                value={cat}
                                checked={formData.category === cat}
                                onChange={() => onChange({ category: cat })}
                                className="h-4 w-4 text-[#12B76A] border-[#D1D5DB] focus:ring-[#12B76A] cursor-pointer accent-[#12B76A]"
                            />
                            <span>{cat}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Row 1: Category Type & Property Type */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Category Type */}
                <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#002E62] block">
                        Category Type
                    </label>
                    <div className="relative">
                        <select
                            value={formData.categoryType}
                            onChange={(e) => onChange({ categoryType: e.target.value })}
                            required
                            className="w-full px-3.5 py-2.5 rounded-xl border border-[#E0E8F2] bg-[#F7F9FC] text-xs text-[#091E42] focus:outline-none focus:ring-1 focus:ring-[#002E62] focus:bg-white transition-all appearance-none cursor-pointer pr-10"
                        >
                            <option value="" disabled>
                                Select property category
                            </option>
                            {CATEGORY_TYPES.map((type) => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                        <FiChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#71717A] pointer-events-none" />
                    </div>
                </div>

                {/* Property Type */}
                <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#002E62] block">
                        Property Type
                    </label>
                    <div className="relative">
                        <select
                            value={formData.propertyType}
                            onChange={(e) => onChange({ propertyType: e.target.value })}
                            required
                            className="w-full px-3.5 py-2.5 rounded-xl border border-[#E0E8F2] bg-[#F7F9FC] text-xs text-[#091E42] focus:outline-none focus:ring-1 focus:ring-[#002E62] focus:bg-white transition-all appearance-none cursor-pointer pr-10"
                        >
                            <option value="" disabled>
                                Select property type
                            </option>
                            {PROPERTY_TYPES.map((type) => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                        <FiChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#71717A] pointer-events-none" />
                    </div>
                </div>
            </div>

            {/* Row 2: Property Title & Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#002E62] block">
                        Property Title
                    </label>
                    <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) => onChange({ title: e.target.value })}
                        placeholder="Enter property title"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E0E8F2] bg-[#F7F9FC] text-xs text-[#091E42] placeholder-[#71717A] focus:outline-none focus:ring-1 focus:ring-[#002E62] focus:bg-white transition-all"
                    />
                </div>

                <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#002E62] block">
                        Location
                    </label>
                    <input
                        type="text"
                        required
                        value={formData.location}
                        onChange={(e) => onChange({ location: e.target.value })}
                        placeholder="Enter location"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E0E8F2] bg-[#F7F9FC] text-xs text-[#091E42] placeholder-[#71717A] focus:outline-none focus:ring-1 focus:ring-[#002E62] focus:bg-white transition-all"
                    />
                </div>
            </div>

            {/* Row 3: Size & Furnishing Status */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#002E62] block">
                        Size (e.g., sqm or square feet)
                    </label>
                    <input
                        type="text"
                        value={formData.size}
                        onChange={(e) => onChange({ size: e.target.value })}
                        placeholder="Enter size"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E0E8F2] bg-[#F7F9FC] text-xs text-[#091E42] placeholder-[#71717A] focus:outline-none focus:ring-1 focus:ring-[#002E62] focus:bg-white transition-all"
                    />
                </div>

                <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#002E62] block">
                        Furnishing Status
                    </label>
                    <div className="relative">
                        <select
                            value={formData.furnishingStatus}
                            onChange={(e) => onChange({ furnishingStatus: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-[#E0E8F2] bg-[#F7F9FC] text-xs text-[#091E42] focus:outline-none focus:ring-1 focus:ring-[#002E62] focus:bg-white transition-all appearance-none cursor-pointer pr-10"
                        >
                            <option value="" disabled>
                                Select furnish status
                            </option>
                            {FURNISHING_STATUSES.map((status) => (
                                <option key={status} value={status}>
                                    {status}
                                </option>
                            ))}
                        </select>
                        <FiChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#71717A] pointer-events-none" />
                    </div>
                </div>
            </div>

            {/* Row 4: Facilities with Unit Counter Dropdown (Frame 2147224172) */}
            <div className="space-y-1.5" ref={facilitiesRef}>
                <label className="text-xs font-semibold text-[#002E62] block">
                    Facilities
                </label>
                <div className="relative">
                    <button
                        type="button"
                        onClick={() => setIsFacilitiesDropdownOpen((prev) => !prev)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E0E8F2] bg-[#F7F9FC] text-xs text-left text-[#091E42] focus:outline-none focus:ring-1 focus:ring-[#002E62] focus:bg-white transition-all flex items-center justify-between cursor-pointer"
                    >
                        <span className={selectedFacilityCount > 0 ? 'text-[#091E42]' : 'text-[#71717A]'}>
                            {facilitiesSummary}
                        </span>
                        <FiChevronDown
                            className={`h-4 w-4 text-[#71717A] transition-transform ${
                                isFacilitiesDropdownOpen ? 'rotate-180' : ''
                            }`}
                        />
                    </button>

                    {/* Popover table matching Frame 2147224172 */}
                    {isFacilitiesDropdownOpen && (
                        <div className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-[#E0E8F2] rounded-xl shadow-xl z-30 p-3 max-h-60 overflow-y-auto animate-[fadeIn_.15s_ease-out]">
                            <div className="flex items-center justify-between pb-2 border-b border-[#F1F5F9] text-xs font-semibold text-[#71717A] px-2">
                                <span>Facilities</span>
                                <span>Unit</span>
                            </div>
                            <div className="divide-y divide-[#F8FAFC]">
                                {DEFAULT_FACILITIES.map((item) => {
                                    const isChecked =
                                        formData.facilities[item.key] !== undefined &&
                                        formData.facilities[item.key] !== null;
                                    const unitValue = formData.facilities[item.key] ?? '';

                                    return (
                                        <div
                                            key={item.key}
                                            className="flex items-center justify-between py-2.5 px-2 hover:bg-[#F9FAFC] transition-colors"
                                        >
                                            <label className="flex items-center gap-2.5 text-xs text-[#091E42] cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={isChecked}
                                                    onChange={() =>
                                                        toggleFacility(item.key, item.defaultUnits)
                                                    }
                                                    className="h-4 w-4 rounded border-[#D1D5DB] text-[#12B76A] focus:ring-[#12B76A] accent-[#12B76A]"
                                                />
                                                <span>{item.key}</span>
                                            </label>

                                            <input
                                                type="number"
                                                min={1}
                                                max={99}
                                                disabled={!isChecked}
                                                value={unitValue}
                                                onChange={(e) =>
                                                    updateFacilityUnit(
                                                        item.key,
                                                        parseInt(e.target.value) || 1
                                                    )
                                                }
                                                className={`w-14 px-2 py-1 text-center text-xs rounded-md border text-[#002E62] font-semibold transition-all ${
                                                    isChecked
                                                        ? 'border-[#CCE3FD] bg-[#F3F9FF]'
                                                        : 'border-[#E2E8F0] bg-gray-50 text-gray-400'
                                                }`}
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Row 5: Amenities selectable pills */}
            <div className="space-y-2">
                <label className="text-xs font-semibold text-[#002E62] block">
                    Amenities
                </label>
                <div className="flex flex-wrap gap-2 pt-0.5">
                    {AMENITIES_LIST.map((amenity) => {
                        const isSelected = formData.amenities.includes(amenity);
                        return (
                            <button
                                key={amenity}
                                type="button"
                                onClick={() => toggleAmenity(amenity)}
                                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer border ${
                                    isSelected
                                        ? 'border-[#12B76A] bg-[#EDFCF4] text-[#12B76A] font-semibold shadow-xs'
                                        : 'border-[#E0E8F2] bg-[#F7F9FC] text-[#52525B] hover:bg-slate-100'
                                }`}
                            >
                                {amenity}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Bottom Button */}
            <div className="pt-3">
                <button
                    type="submit"
                    className="bg-[#002E62] hover:bg-[#002047] text-white px-6 py-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer shadow-xs"
                >
                    Save & Continue
                </button>
            </div>
        </form>
    );
}
