import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { useSelector } from 'react-redux';

import StepsSidebar from './components/StepsSidebar';
import { type StepDef } from './components/types';

import DetailsStep from './components/DetailsStep';
import RentPaymentStep from './components/RentPaymentStep';
import LeasePricingStep from './components/LeasePricingStep';
import PricingBookingStep from './components/PricingBookingStep';
import LocationRulesStep from './components/LocationRulesStep';
import PricingStep from './components/PricingStep';
import MediaStep from './components/MediaStep';

import ListingTypeSelection, { type ListingTypeInfo } from './components/ListingTypeSelection';
import ListingSuccessPrompt from './components/ListingSuccessPrompt.tsx';

import CloseButton from '../OnboardingAgent/components/CloseButton.tsx';
import { PropertyListingFormProvider, usePropertyListingForm, type FacilitySelection, type PropertyListingFormState } from './formContext.tsx';
import { type CreatePropertyListingPayload, type PropertyFacilitiesPayload, type PropertyMediaPayload, useCreatePropertyListingMutation } from '@store/api/propertyListings.api.ts';
import { useUploadFilesMutation } from '@store/api/upload.api';

// Listing types
const LISTING_TYPES: ListingTypeInfo[] = [
    {
        key: 'rent',
        title: 'Rent',
        desc: 'List your property for long-term rental and connect with tenants looking for a home to stay.',
    },
    {
        key: 'short_let',
        title: 'Short Let',
        desc: 'Post your fully furnished space for short-term rentals to travelers or temporary guests.',
    },
    {
        key: 'lease',
        title: 'Lease',
        desc: 'Offer your property on a fixed-term lease, ideal for businesses or tenants seeking extended stays.',
    },
    {
        key: 'sell',
        title: 'Sell',
        desc: 'Put your property up for sale and reach buyers interested in making a full purchase.',
    },
];

// Types
export type ListingType = 'rent' | 'lease' | 'short_let' | 'sell';

interface Props {
    open: boolean;
    step?: number;
    onClose: () => void;
    goTo?: (s: number) => void;
}

const getStepsForType = (type: ListingType): StepDef[] => {
    switch (type) {
        case 'rent':
            return [
                {
                    id: 'details',
                    title: 'Property Details',
                    description: 'Provide essential information about your property.',
                },
                {
                    id: 'rent_payment',
                    title: 'Rent And Payment Information',
                    description: 'Set your rental price and payment terms for potential tenants.',
                },
                {
                    id: 'media',
                    title: 'Media',
                    description: 'Upload photos and videos to showcase your property effectively.',
                },
            ];
        case 'lease':
            return [
                {
                    id: 'details',
                    title: 'Property Details',
                    description: 'Provide essential information about your property.',
                },
                {
                    id: 'lease_pricing',
                    title: 'Lease Term And Pricing',
                    description: 'Define the lease duration and set your pricing for long-term tenants.',
                },
                {
                    id: 'media_docs',
                    title: 'Media And Document',
                    description: 'Upload photos, videos, and necessary documents to attract serious lessees.',
                },
            ];
        case 'short_let':
            return [
                {
                    id: 'details',
                    title: 'Property Details',
                    description: 'Provide essential information about your property.',
                },
                {
                    id: 'pricing_booking',
                    title: 'Pricing And Booking Information',
                    description: 'Set your nightly rate and booking policies to attract short-term guests.',
                },
                {
                    id: 'location_rules',
                    title: 'Location And Rules',
                    description: 'Specify your property location and house rules for a smooth guest experience.',
                },
                {
                    id: 'media',
                    title: 'Media',
                    description: 'Upload photos and videos to showcase your property effectively.',
                },
            ];
        case 'sell':
            return [
                {
                    id: 'details',
                    title: 'Property Details',
                    description: 'Provide essential information about your property.',
                },
                {
                    id: 'pricing',
                    title: 'Pricing',
                    description: 'Set your sale price and any special offers to attract potential buyers.',
                },
                {
                    id: 'media_docs',
                    title: 'Media And Document',
                    description: 'Upload photos, videos, and necessary documents to facilitate the selling process.',
                },
            ];
    }
};

const ListPropertyFlowModal: React.FC<Props> = ({ open, onClose }) => {
    const [listingType, setListingType] = useState<ListingType | null>(null);
    const [currentIdx, setCurrentIdx] = useState(0);
    const [showSuccessPrompt, setShowSuccessPrompt] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const navigate = useNavigate();
    const token = useSelector((state: any) => state.auth.accessToken);
    const [videoUploadProgress, setVideoUploadProgress] = useState(0);

    const handleClose = useCallback(() => {
        onClose();
        setTimeout(() => {
            setListingType(null);
            setCurrentIdx(0);
            setShowSuccessPrompt(false);
            setSuccessMessage(null);
        }, 250);
    }, [onClose]);

    const handleListingCreated = useCallback((message?: string) => {
        setSuccessMessage(message ?? null);
        setShowSuccessPrompt(true);
        setListingType(null);
        setCurrentIdx(0);
    }, []);

    const handleSuccessRedirect = useCallback(() => {
        handleClose();
        navigate('/dashboard/my-listing');
    }, [handleClose, navigate]);

    useEffect(() => {
        if (!open) return;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        const handler = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                handleClose();
            }
        };
        window.addEventListener('keydown', handler);
        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener('keydown', handler);
        };
    }, [open, handleClose]);

    if (!open) return null;

    const steps = listingType ? getStepsForType(listingType) : [];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4">
            <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}`}</style>
            {!showSuccessPrompt && !listingType && (
                <div className="relative w-full max-w-200 min-h-[30vh] rounded-xl bg-white shadow-xl overflow-hidden animate-[fadeIn_.25s_ease] flex flex-col max-h-[90vh] md:max-h-none">
                    <ListingTypeSelection
                        listingTypes={LISTING_TYPES}
                        onSelect={(type) => {
                            setListingType(type);
                            setCurrentIdx(0);
                        }}
                        onClose={handleClose}
                    />
                </div>
            )}

            {!showSuccessPrompt && listingType && (
                <PropertyListingFormProvider key={listingType} listingType={listingType}>
                    <ListingFormContent
                        listingType={listingType}
                        steps={steps}
                        currentIdx={currentIdx}
                        setCurrentIdx={setCurrentIdx}
                        onClose={handleClose}
                        onSuccess={handleListingCreated}
                        token={token}
                        videoUploadProgress={videoUploadProgress}
                        setVideoUploadProgress={setVideoUploadProgress}
                    />
                </PropertyListingFormProvider>
            )}

            {showSuccessPrompt && (
                <ListingSuccessPrompt message={successMessage ?? undefined} onOkay={handleSuccessRedirect} />
            )}
        </div>
    );
};

interface ListingFormContentProps {
    listingType: ListingType;
    steps: StepDef[];
    currentIdx: number;
    setCurrentIdx: React.Dispatch<React.SetStateAction<number>>;
    onClose: () => void;
    onSuccess: (message?: string) => void;
    token: string | null;
    videoUploadProgress: number;
    setVideoUploadProgress: (progress: number) => void;
}

const ListingFormContent: React.FC<ListingFormContentProps> = ({
    listingType,
    steps,
    currentIdx,
    setCurrentIdx,
    onClose,
    onSuccess,
    token,
    videoUploadProgress,
    setVideoUploadProgress,
}) => {
    const { state, resetForm } = usePropertyListingForm();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [createPropertyListing] = useCreatePropertyListingMutation();
    const [uploadFiles] = useUploadFilesMutation();

    const activeStep = steps[currentIdx];
    const isLast = currentIdx === steps.length - 1;

    const goPrev = () => {
        if (isSubmitting) return;
        setSubmitError(null);
        setCurrentIdx((index) => Math.max(index - 1, 0));
    };

    const goNext = async () => {
        if (isSubmitting) return;
        if (!isLast) {
            setSubmitError(null);
            setCurrentIdx((index) => Math.min(index + 1, steps.length - 1));
            return;
        }

        const validationError = validateListingForm(listingType, state);
        if (validationError) {
            setSubmitError(validationError);
            return;
        }

        setIsSubmitting(true);
        setSubmitError(null);
        setVideoUploadProgress(0); // Reset progress

        try {
             const uploadFile = async (file: File) => {
                const formData = new FormData();
                formData.append('files', file);
                const res = await uploadFiles(formData).unwrap();
                return res.data.urls[0];
            };

            const uploadVideoWithProgress = async (file: File) => {
                const formData = new FormData();
                formData.append('video', file);

                const response = await axios.post('https://kadamora-test-app-38pdp.ondigitalocean.app/api/v1/upload/video', formData, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                    onUploadProgress: (progressEvent) => {
                        const total = progressEvent.total || file.size;
                        const percent = Math.round((progressEvent.loaded * 100) / total);
                        setVideoUploadProgress(percent);
                    },
                });
                const resultData = response.data.data;
                return resultData.url || resultData.urls?.[0];
            };


            const payload = await buildCreatePropertyPayload(listingType, state, uploadFile, uploadVideoWithProgress);
            // console.log('payload', payload);
            const response = await createPropertyListing(payload).unwrap();
            resetForm();
            console.log("response", response)
            const successMessage = response?.message || 'Property listed successfully';
            onSuccess(successMessage);
        } catch (error) {
            setSubmitError(resolveCreateError(error));
        } finally {
            setIsSubmitting(false);
            setVideoUploadProgress(0);
        }
    };

    return (
        <div className="w-full md:w-295 lg:w-310 max-w-[96vw] rounded-xl overflow-hidden flex bg-white shadow-[0_4px_32px_-4px_rgba(15,23,42,0.12)] md:flex-row flex-col md:h-175">
            {/* ... sidebar ... */}
            <div className="hidden md:block w-[35%]">
                <StepsSidebar steps={steps} currentIdx={currentIdx} listingType={listingType} />
            </div>

            {/* ... mobile header ... */}
             <div className="md:hidden w-full px-6 pt-6 pb-2 flex items-center justify-between">
                <h2 className="text-[22px] font-bold leading-tight text-[#0F172A]">
                    <span className="text-[#16A34A]">{activeStep?.title}</span>
                </h2>
                <CloseButton onClick={() => (!isSubmitting ? onClose() : undefined)} />
            </div>

            <div className="flex-1 flex flex-col md:max-h-none max-h-[80vh]">
                 {/* ... desktop header ... */}
                 <div className="h-17.5 md:flex hidden items-center justify-between pl-10 pr-6 border-b border-[#EDF1F5] bg-white/70 backdrop-blur-sm">
                    <h3 className="text-[20px] font-semibold text-[#001731]">{activeStep?.title}</h3>
                    <CloseButton onClick={() => (!isSubmitting ? onClose() : undefined)} />
                </div>

                {/* ... steps content ... */}
                 <div className="flex-1 overflow-y-auto md:px-10 px-6 md:pt-10 pt-2 md:pb-8 pb-2">
                    {activeStep?.id === 'details' && <DetailsStep />}
                    {activeStep?.id === 'rent_payment' && <RentPaymentStep />}
                    {activeStep?.id === 'lease_pricing' && <LeasePricingStep />}
                    {activeStep?.id === 'pricing_booking' && <PricingBookingStep />}
                    {activeStep?.id === 'location_rules' && <LocationRulesStep />}
                    {activeStep?.id === 'pricing' && <PricingStep />}
                    {(activeStep?.id === 'media' || activeStep?.id === 'media_docs') && (
                        <MediaStep includeDocs={activeStep?.id === 'media_docs'} />
                    )}
                </div>

                <div className="border-t border-[#E2E8F0] bg-white px-6 py-4">
                    {/* Progress Bar */}
                    {isSubmitting && videoUploadProgress > 0 && videoUploadProgress < 100 && (
                        <div className="mb-4">
                            <div className="flex justify-between text-xs mb-1 text-gray-600">
                                <span>Uploading Video...</span>
                                <span>{videoUploadProgress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                    className="bg-[#002E62] h-2 rounded-full transition-all duration-300" 
                                    style={{ width: `${videoUploadProgress}%` }}
                                ></div>
                            </div>
                        </div>
                    )}

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                        {submitError && (
                            <div
                                role="alert"
                                className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600 md:mr-auto"
                            >
                                {submitError}
                            </div>
                        )}
                        <div className="flex items-center justify-between md:justify-end gap-3">
                            <button
                                type="button"
                                onClick={goPrev}
                                disabled={currentIdx === 0 || isSubmitting}
                                className={`px-6 py-3 rounded-lg border text-[14px] font-semibold transition-colors focus:ring-2 focus:ring-[#002E62]/70 focus:border-transparent outline-none ${
                                    currentIdx === 0 || isSubmitting
                                        ? 'bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed'
                                        : 'bg-white text-[#002E62] border-[#E0DEF7] hover:bg-[#F7F7FD] focus:bg-[#F7F7FD]'
                                }`}
                            >
                                Previous
                            </button>

                            <button
                                type="button"
                                onClick={goNext}
                                disabled={isSubmitting}
                                className="px-6 py-3 rounded-lg bg-[#002E62] text-white text-[14px] font-semibold transition-colors hover:bg-[#002E62]/90 focus:ring-2 focus:ring-[#002E62]/70 focus:ring-offset-2 outline-none disabled:bg-[#7B8AA0] disabled:cursor-not-allowed"
                            >
                                {isLast ? (isSubmitting ? 'Submitting...' : 'Submit') : 'Proceed'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

function validateListingForm(listingType: ListingType, state: PropertyListingFormState): string | null {
    if (!state.title.trim()) return 'Please provide a property title.';
    if (!state.location.trim()) return 'Please provide the property location.';
    if (!state.price.trim()) return 'Please provide a price for the property.';
    if (state.photos.length === 0) return 'Upload at least one property photo before submitting.';
    if (!state.categoryType) return 'Select a category type to continue.';
    if (!state.propertySubType) return 'Select a property type to continue.';
    if (listingType === 'lease' && !state.leaseDuration.trim()) return 'Enter a lease duration to continue.';
    return null;
}

// ... types ...
type Uploader = (file: File) => Promise<string>;

async function buildCreatePropertyPayload(
    listingType: ListingType,
    state: PropertyListingFormState,
    uploadFile: Uploader,
    uploadVideo: Uploader,
): Promise<CreatePropertyListingPayload> {
    const facilities = mapFacilities(state.facilities);
    const media = await prepareMediaPayload(listingType, state, uploadFile, uploadVideo);
    // ... payload construction
     const payload: CreatePropertyListingPayload = {
        title: state.title.trim(),
        description: state.description.trim(),
        location: state.location.trim(),
        countryId: state.countryId || undefined,
        stateId: state.stateId || undefined,
        propertyType: listingType,
        propertyCategory: state.propertyCategory,
        categoryType: state.categoryType || 'land_listing',
        propertySubType: state.propertySubType || listingType,
        furnishingStatus: state.furnishingStatus || 'furnished',
        facilities,
        price: toNumber(state.price),
        renewalOption: state.renewalOption,
        negotiable: state.negotiable,
        amenities: state.amenities,
        media,
    };
    
     if (state.paymentTerm) payload.paymentTerm = state.paymentTerm;
    if (state.serviceCharge) payload.serviceCharge = toNumber(state.serviceCharge);
    if (state.additionalCharges.trim()) payload.additionalCharges = state.additionalCharges.trim();
    if (state.weeklyRate) payload.weeklyRate = toNumber(state.weeklyRate);
    if (state.monthlyRate) payload.monthlyRate = toNumber(state.monthlyRate);
    if (state.minimumNightsStay) payload.minimumNightsStay = toNumber(state.minimumNightsStay);
    if (state.houseRule.trim()) payload.houseRule = state.houseRule.trim();
    if (state.size.trim()) payload.size = state.size.trim();
    if (state.leaseDuration) payload.leaseDuration = toNumber(state.leaseDuration);
    if (state.maintenanceCharge.trim()) payload.maintenanceCharge = state.maintenanceCharge.trim();
    if (state.availablePropertyDocuments.length > 0)
        payload.availablePropertyDocuments = state.availablePropertyDocuments;
    if (state.maintenanceResponsibility) payload.maintenanceResponsibility = state.maintenanceResponsibility;
    if (state.securityDeposit.trim()) payload.securityDeposit = state.securityDeposit.trim();
    if (state.propertyConditions) payload.propertyConditions = state.propertyConditions;
    if (state.otherCharges.trim()) payload.otherCharges = state.otherCharges.trim();

    return payload;
}
// function mapFacilities(facilities: FacilitySelection): PropertyFacilitiesPayload {
//     return {
//         basicFacilities: facilities.basic
//             .filter((f) => f.selected)
//             .map((f) => ({
//                 id: f.id,
//                 name: f.name,
//                 count: f.count > 0 ? f.count : undefined,
//             })),
//         safetyFacilities: facilities.safety
//             .filter((f) => f.selected)
//             .map((f) => ({
//                 id: f.id,
//                 name: f.name,
//             })),
//         communityFacilities: facilities.community
//             .filter((f) => f.selected)
//             .map((f) => ({
//                 id: f.id,
//                 name: f.name,
//             })),
//     };

function mapFacilities(facilities: FacilitySelection[]): PropertyFacilitiesPayload {
    const payload: PropertyFacilitiesPayload = {
        livingRooms: 0,
        bedrooms: 0,
        bathrooms: 0,
        kitchens: 0,
        stores: 0
    };

    const mapping: Record<string, string> = {
        'living_room': 'livingRooms',
        'bedroom': 'bedrooms',
        'bathroom': 'bathrooms',
        'kitchen': 'kitchens',
        'store': 'stores'
    };

    facilities.forEach((facility) => {
        const key = mapping[facility.value];
        if (key) {
            payload[key] = Number(facility.units) || 0;
        }
    });

    return payload;
}

async function prepareMediaPayload(
    listingType: ListingType,
    state: PropertyListingFormState,
    uploadFile: Uploader,
    uploadVideo: Uploader,
): Promise<PropertyMediaPayload[]> {
    const photoUploads = await Promise.all(
        state.photos.map((photo, index) => {
            return uploadFile(photo.file).then((url): PropertyMediaPayload => ({
                url,
                altText: photo.file.name || `${state.title || 'property'}-${index + 1}`,
                mediaType: 'image',
                sortOrder: index + 1,
            }));
        }),
    );

    console.log(listingType)
    const media: PropertyMediaPayload[] = [...photoUploads];

    if (state.video) {
        // Use uploadVideo for video
        const videoUrl = await uploadVideo(state.video.file);
        media.push({
            url: videoUrl,
            altText: state.video.file.name || `${state.title || 'property'}-video`,
            mediaType: 'video',
            sortOrder: media.length + 1,
        });
    }

    return media;
}

function toNumber(value: string | number | undefined, defaultValue = 0): number {
    if (typeof value === 'number') {
        return Number.isNaN(value) ? defaultValue : value;
    }
    if (value === undefined || value === null || value === '') {
        return defaultValue;
    }
    const parsed = Number(value);
    return Number.isNaN(parsed) ? defaultValue : parsed;
}

function resolveCreateError(error: any): string {
    if (error?.data?.message) {
        return error.data.message;
    }
    if (error?.data?.response?.message) {
        return error.data.response.message;
    }
    if (error instanceof Error && error.message) {
        return error.message;
    }
    if (error?.message) {
        return error.message;
    }
    return 'Unable to submit property. Please try again.';
}

export default ListPropertyFlowModal;
