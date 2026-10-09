import React, { useState } from 'react';
import { HTListingFormProvider, type HTCategoryId } from './HTListingFlowContext';
import HTListingStepsSidebar, { type StepDef } from './HTListingStepsSidebar';

// Steps
import BasicInfoStep from './steps/BasicInfoStep';
import LocationContactStep from './steps/LocationContactStep';
import LocationDatesStep from './steps/LocationDatesStep';
import ScheduleStep from './steps/ScheduleStep';
import FeaturesAmenitiesStep from './steps/FeaturesAmenitiesStep';
import RoomPricingStep from './steps/RoomPricingStep';
import OperatingHoursStep from './steps/OperatingHoursStep';
import TicketingStep from './steps/TicketingStep';
import MediaGalleryStep from './steps/MediaGalleryStep';

// ─── Step definitions per category ───────────────────────────────────────────

const STEP_DESCRIPTIONS = {
    basic_info: 'Provide essential information about your listing to help travelers discover it.',
    location_contact: 'Specify the exact location and provide contact details for your listing.',
    location_dates: 'Tell us where and when your event will take place.',
    schedule: 'Plan out the activities and timings across the event days.',
    features_amenities: 'Highlight the facilities and amenities available at this listing.',
    room_pricing: 'List your room types, pricing, and available amenities.',
    operating_hours: 'Set your check-in/out times, policies, and house rules.',
    ticketing: 'Configure ticket types, pricing, and booking links.',
    media_gallery: 'Upload photos and videos to showcase your listing effectively.',
};

const STEPS_BY_CATEGORY: Record<HTCategoryId, StepDef[]> = {
    'cities-destinations': [
        { id: 'basic_info', title: 'Basic Information', description: STEP_DESCRIPTIONS.basic_info },
        { id: 'location_contact', title: 'Location & Contact', description: STEP_DESCRIPTIONS.location_contact },
        { id: 'features_amenities', title: 'Features & Amenities', description: STEP_DESCRIPTIONS.features_amenities },
        { id: 'media_gallery', title: 'Media & Gallery', description: STEP_DESCRIPTIONS.media_gallery },
    ],
    'events-festivals': [
        { id: 'basic_info', title: 'Basic Information', description: STEP_DESCRIPTIONS.basic_info },
        { id: 'location_dates', title: 'Location & Dates', description: STEP_DESCRIPTIONS.location_dates },
        { id: 'schedule', title: 'Schedule', description: STEP_DESCRIPTIONS.schedule },
        { id: 'ticketing', title: 'Ticketing', description: STEP_DESCRIPTIONS.ticketing },
        { id: 'media_gallery', title: 'Media', description: STEP_DESCRIPTIONS.media_gallery },
    ],
    'parks-nature': [
        { id: 'basic_info', title: 'Basic Information', description: STEP_DESCRIPTIONS.basic_info },
        { id: 'location_contact', title: 'Location & Contact', description: STEP_DESCRIPTIONS.location_contact },
        { id: 'features_amenities', title: 'Features & Amenities', description: STEP_DESCRIPTIONS.features_amenities },
        { id: 'media_gallery', title: 'Media & Gallery', description: STEP_DESCRIPTIONS.media_gallery },
        { id: 'ticketing', title: 'Ticketing', description: STEP_DESCRIPTIONS.ticketing },
    ],
    'hotel-resorts': [
        { id: 'basic_info', title: 'Basic Information', description: STEP_DESCRIPTIONS.basic_info },
        { id: 'location_contact', title: 'Location & Contact', description: STEP_DESCRIPTIONS.location_contact },
        { id: 'room_pricing', title: 'Room & Pricing / Amenities', description: STEP_DESCRIPTIONS.room_pricing },
        { id: 'media_gallery', title: 'Media & Gallery', description: STEP_DESCRIPTIONS.media_gallery },
        { id: 'operating_hours', title: 'Operating Hours & Policies', description: STEP_DESCRIPTIONS.operating_hours },
    ],
    'arts-culture': [
        { id: 'basic_info', title: 'Basic Information', description: STEP_DESCRIPTIONS.basic_info },
        { id: 'location_contact', title: 'Location & Contact', description: STEP_DESCRIPTIONS.location_contact },
        { id: 'features_amenities', title: 'Features & Amenities', description: STEP_DESCRIPTIONS.features_amenities },
        { id: 'media_gallery', title: 'Media & Gallery', description: STEP_DESCRIPTIONS.media_gallery },
    ],
};

const CATEGORY_TITLES: Record<HTCategoryId, string> = {
    'cities-destinations': 'Cities & Destinations',
    'events-festivals': 'Events & Festivals',
    'parks-nature': 'Parks & Nature',
    'hotel-resorts': 'Hotel & Resorts',
    'arts-culture': 'Arts & Culture',
};

// ─── Step panel renderer ──────────────────────────────────────────────────────

const StepPanel: React.FC<{ stepId: string }> = ({ stepId }) => {
    switch (stepId) {
        case 'basic_info': return <BasicInfoStep />;
        case 'location_contact': return <LocationContactStep />;
        case 'location_dates': return <LocationDatesStep />;
        case 'schedule': return <ScheduleStep />;
        case 'features_amenities': return <FeaturesAmenitiesStep />;
        case 'room_pricing': return <RoomPricingStep />;
        case 'operating_hours': return <OperatingHoursStep />;
        case 'ticketing': return <TicketingStep />;
        case 'media_gallery': return <MediaGalleryStep />;
        default: return null;
    }
};

// ─── Props ────────────────────────────────────────────────────────────────────

interface HTListingFlowStepperProps {
    categoryId: HTCategoryId;
    onComplete: () => void;
    onCancel: () => void;
}

// ─── Inner form (needs context) ──────────────────────────────────────────────

const FlowContent: React.FC<{
    categoryId: HTCategoryId;
    onComplete: () => void;
    onCancel: () => void;
}> = ({ categoryId, onComplete, onCancel }) => {
    const steps = STEPS_BY_CATEGORY[categoryId];
    const [currentIdx, setCurrentIdx] = useState(0);

    const activeStep = steps[currentIdx];
    const isFirst = currentIdx === 0;
    const isLast = currentIdx === steps.length - 1;

    const goPrev = () => {
        if (!isFirst) setCurrentIdx((i) => i - 1);
    };

    const goNext = () => {
        if (isLast) {
            onComplete();
        } else {
            setCurrentIdx((i) => i + 1);
        }
    };

    return (
        <div className="w-full flex flex-col md:flex-row gap-6 min-h-[600px]">
            {/* ── Left: Steps sidebar ── */}
            <HTListingStepsSidebar
                steps={steps}
                currentIdx={currentIdx}
                categoryTitle={CATEGORY_TITLES[categoryId]}
            />

            {/* ── Right: Form content ── */}
            <div className="flex-1 flex flex-col min-h-0 bg-white rounded-[8px] border border-[#E4E4E7]">
                {/* Mobile header */}
                <div className="md:hidden flex items-center justify-between px-6 py-4 border-b border-[#E2E8F0]">
                    <div>
                        <p className="text-xs text-[#71717A]">
                            Step {currentIdx + 1} of {steps.length}
                        </p>
                        <h2 className="text-base font-bold text-[#002E62]">{activeStep?.title}</h2>
                    </div>
                    <button
                        type="button"
                        onClick={onCancel}
                        className="text-sm text-[#71717A] hover:text-[#002E62] transition-colors cursor-pointer"
                    >
                        Cancel
                    </button>
                </div>

                {/* Desktop step title bar */}
                {/* <div className="hidden md:flex items-center justify-between px-10 py-5 border-b border-[#EDF1F5] bg-white/80 backdrop-blur-sm shrink-0">
                    <div>
                        <p className="text-xs text-[#71717A]">
                            Step {currentIdx + 1} of {steps.length}
                        </p>
                        <h3 className="text-[18px] font-semibold text-[#001731]">{activeStep?.title}</h3>
                    </div>
                    <button
                        type="button"
                        onClick={onCancel}
                        className="text-sm font-medium text-[#71717A] hover:text-[#002E62] transition-colors cursor-pointer"
                    >
                        Cancel
                    </button>
                </div> */}

                {/* Step content — scrollable */}
                <div className="flex-1 overflow-y-auto md:px-10 px-6 md:pt-8 pt-4 md:pb-6 pb-4">
                    <StepPanel stepId={activeStep?.id} />
                </div>

                {/* Navigation footer */}
                <div className="shrink-0 border-t border-[#E2E8F0] bg-white px-6 md:px-10 py-4">
                    <div className="flex items-center justify-between gap-3">
                        <button
                            type="button"
                            onClick={goPrev}
                            disabled={isFirst}
                            className={`px-6 py-2.5 rounded-lg border text-[14px] font-semibold transition-colors focus:outline-none ${
                                isFirst
                                    ? 'bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed'
                                    : 'bg-white text-[#002E62] border-[#E0DEF7] hover:bg-[#F7F7FD] cursor-pointer'
                            }`}
                        >
                            Previous
                        </button>

                        <button
                            type="button"
                            onClick={goNext}
                            className="px-6 py-2.5 rounded-lg bg-[#002E62] text-white text-[14px] font-semibold transition-colors hover:bg-[#072440] focus:outline-none focus:ring-2 focus:ring-[#002E62]/70 focus:ring-offset-2 cursor-pointer"
                        >
                            {isLast ? 'Submit' : 'Save & Continue'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ─── Public component (wraps provider) ───────────────────────────────────────

const HTListingFlowStepper: React.FC<HTListingFlowStepperProps> = ({
    categoryId,
    onComplete,
    onCancel,
}) => {
    return (
        <HTListingFormProvider categoryId={categoryId}>
            <FlowContent
                categoryId={categoryId}
                onComplete={onComplete}
                onCancel={onCancel}
            />
        </HTListingFormProvider>
    );
};

export default HTListingFlowStepper;
export { STEPS_BY_CATEGORY, CATEGORY_TITLES };
