import { useState } from 'react';
import Input from '@shared/components/Forms/Input';
import Select from '@shared/components/Forms/Select';
import Textarea from '@shared/components/Forms/Textarea';
import { useHTListingForm } from '../useHTListingForm';
import type { HTCategoryId } from '../HTListingFlowTypes';

// ─── Category-specific field configs ─────────────────────────────────────────

const CATEGORY_CONFIGS: Record<
    HTCategoryId,
    {
        nameLabel: string;
        namePlaceholder: string;
        showDatesAndPrice: boolean;
        categoryOptions: { label: string; value: string }[];
    }
> = {
    'cities-destinations': {
        nameLabel: 'City/Destination Name',
        namePlaceholder: 'Enter name',
        showDatesAndPrice: true,
        categoryOptions: [
            { label: 'Tourist Destination', value: 'tourist_destination' },
            { label: 'Coastal City', value: 'coastal_city' },
            { label: 'Cultural Hub', value: 'cultural_hub' },
            { label: 'Historical Town', value: 'historical_town' },
        ],
    },
    'events-festivals': {
        nameLabel: 'Event/Festival Name',
        namePlaceholder: 'Enter event name',
        showDatesAndPrice: false,
        categoryOptions: [
            { label: 'Cultural Festival', value: 'cultural_festival' },
            { label: 'Concert', value: 'concert' },
            { label: 'Exhibition', value: 'exhibition' },
            { label: 'Sports Event', value: 'sports_event' },
            { label: 'Religious Festival', value: 'religious_festival' },
        ],
    },
    'parks-nature': {
        nameLabel: 'Park/Reserve Name',
        namePlaceholder: 'Enter name',
        showDatesAndPrice: false,
        categoryOptions: [
            { label: 'National Park', value: 'national_park' },
            { label: 'Nature Reserve', value: 'nature_reserve' },
            { label: 'Wildlife Sanctuary', value: 'wildlife_sanctuary' },
            { label: 'Game Reserve', value: 'game_reserve' },
        ],
    },
    'hotel-resorts': {
        nameLabel: 'Hotel/Resort Name',
        namePlaceholder: 'Enter hotel name',
        showDatesAndPrice: false,
        categoryOptions: [
            { label: 'Luxury Hotel', value: 'luxury_hotel' },
            { label: 'Boutique Hotel', value: 'boutique_hotel' },
            { label: 'Beach Resort', value: 'beach_resort' },
            { label: 'Safari Lodge', value: 'safari_lodge' },
            { label: 'Budget Hotel', value: 'budget_hotel' },
        ],
    },
    'arts-culture': {
        nameLabel: 'City/Destination Name',
        namePlaceholder: 'Enter name',
        showDatesAndPrice: true,
        categoryOptions: [
            { label: 'Museum', value: 'museum' },
            { label: 'Art Gallery', value: 'art_gallery' },
            { label: 'Cultural Center', value: 'cultural_center' },
            { label: 'Heritage Site', value: 'heritage_site' },
        ],
    },
};

const DATE_OPTIONS = [
    { label: 'January 2025', value: '2025-01' },
    { label: 'February 2025', value: '2025-02' },
    { label: 'March 2025', value: '2025-03' },
    { label: 'June 2025', value: '2025-06' },
    { label: 'July 2025', value: '2025-07' },
    { label: 'December 2025', value: '2025-12' },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function BasicInfoStep() {
    const { categoryId, state, updateField, addTag, removeTag } = useHTListingForm();
    const config = CATEGORY_CONFIGS[categoryId];

    const [tagInput, setTagInput] = useState('');

    const handleSaveTag = () => {
        if (tagInput.trim()) {
            addTag(tagInput.trim());
            setTagInput('');
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-[18px] font-semibold text-[#002E62]">Basic Information</h2>
            </div>

            {/* Name */}
            <Input
                id="listing-name"
                title={config.nameLabel}
                placeholder={config.namePlaceholder}
                value={state.name}
                onChange={(e) => updateField('name', e.target.value)}
            />

            {/* Category */}
            <Select
                id="listing-category"
                title="Category"
                placeholder="Select a category"
                options={config.categoryOptions}
                value={state.category}
                onChange={(val) => updateField('category', val)}
            />

            {/* From/To Dates + Price/Expected — Cities & Destinations + Arts & Culture only */}
            {config.showDatesAndPrice && (
                <>
                    <div className="grid grid-cols-2 gap-4">
                        <Select
                            id="from-date"
                            title="From Date"
                            placeholder="Select Date"
                            options={DATE_OPTIONS}
                            value={state.fromDate}
                            onChange={(val) => updateField('fromDate', val)}
                        />
                        <Select
                            id="to-date"
                            title="To Date"
                            placeholder="Select Date"
                            options={DATE_OPTIONS}
                            value={state.toDate}
                            onChange={(val) => updateField('toDate', val)}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            id="price"
                            title="Price"
                            placeholder="Enter Price"
                            value={state.price}
                            onChange={(e) => updateField('price', e.target.value)}
                        />
                        <Input
                            id="expected-number"
                            title="Expected Number"
                            placeholder="Enter Number"
                            type="number"
                            value={state.expectedNumber}
                            onChange={(e) => updateField('expectedNumber', e.target.value)}
                        />
                    </div>
                </>
            )}

            {/* Description */}
            <Textarea
                id="description"
                title="Description"
                placeholder={`Enter a description of the ${config.nameLabel.toLowerCase().replace(' name', '')}`}
                value={state.description}
                onChange={(e) => updateField('description', e.target.value)}
                rows={4}
            />

            {/* Tags */}
            <div>
                <label className="block mb-1 text-[#002E62] font-semibold text-[15px]">Tags</label>
                {/* Existing tags */}
                {state.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-2">
                        {state.tags.map((tag) => (
                            <span
                                key={tag}
                                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F5EF] text-[#359F6A] text-xs font-medium"
                            >
                                {tag}
                                <button
                                    type="button"
                                    onClick={() => removeTag(tag)}
                                    className="hover:text-[#002E62] transition-colors"
                                    aria-label={`Remove tag ${tag}`}
                                >
                                    ×
                                </button>
                            </span>
                        ))}
                    </div>
                )}
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Enter tag"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleSaveTag())}
                        className="flex-1 py-3 px-4 border border-[#E0DEF7] rounded-lg focus:ring-2 focus:ring-[#002E62]/70 focus:border-transparent outline-none transition-colors bg-[#F7F7FD] focus:bg-white placeholder-[#52525B] text-[14px] font-medium"
                    />
                    <button
                        type="button"
                        onClick={handleSaveTag}
                        className="px-5 py-3 bg-[#002E62] hover:bg-[#072440] text-white text-sm font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                    >
                        Save Tag
                    </button>
                </div>
            </div>

            {/* Post On Timeline toggle */}
            <div className="flex items-start justify-between gap-4 py-2">
                <div>
                    <p className="text-[15px] font-semibold text-[#002E62]">Post On Timeline</p>
                    <p className="text-xs text-[#71717A] mt-0.5 max-w-sm">
                        Lorem ipsum dolor sit amet consectetur. Pellentesque pellentesque nunc ut ante id ac vel.
                        Sagittis diam penatibus magna scelerisque amet.
                    </p>
                </div>
                <button
                    type="button"
                    role="switch"
                    aria-checked={state.postOnTimeline}
                    onClick={() => updateField('postOnTimeline', !state.postOnTimeline)}
                    className={`relative shrink-0 mt-0.5 h-6 w-11 rounded-full transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#359F6A]/50 ${
                        state.postOnTimeline ? 'bg-[#359F6A]' : 'bg-[#D1D5DB]'
                    }`}
                >
                    <span
                        className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
                            state.postOnTimeline ? 'translate-x-5' : 'translate-x-0'
                        }`}
                    />
                </button>
            </div>
        </div>
    );
}
