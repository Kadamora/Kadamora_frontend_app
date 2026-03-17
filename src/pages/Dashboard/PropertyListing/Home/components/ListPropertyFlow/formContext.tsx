import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import type { ListingType } from './ListPropertyFlowModal';
import { type AgentPropertyListing, type AgentPropertyMedia } from '@store/api/propertyListings.api';
// import type { ListingType } from '.';

export interface FacilitySelection {
    label: string;
    value: string;
    units: number;
}

export type MediaType = 'image' | 'video';

export interface MediaItem {
    id: string;
    file?: File;
    url?: string;
    previewUrl: string;
    mediaType: MediaType;
}

export interface PropertyListingFormState {
    propertyCategory: 'affordable' | 'luxurious' | 'ultra_luxurious';
    categoryType: string;
    propertySubType: string;
    furnishingStatus: string;
    title: string;
    location: string;
    size: string;
    description: string;
    countryId: string;
    stateId: string;
    amenities: string[];
    facilities: FacilitySelection[];
    price: string;
    serviceCharge: string;
    additionalCharges: string;
    paymentTerm: string;
    weeklyRate: string;
    monthlyRate: string;
    minimumNightsStay: string;
    houseRule: string;
    leaseDuration: string;
    renewalOption: boolean;
    maintenanceCharge: string;
    maintenanceResponsibility: string;
    securityDeposit: string;
    availablePropertyDocuments: string[];
    propertyConditions: string;
    otherCharges: string;
    negotiable: boolean;
    photos: MediaItem[];
    video: MediaItem | null;
}

interface PropertyListingFormContextValue {
    listingType: ListingType;
    state: PropertyListingFormState;
    updateField: <K extends keyof PropertyListingFormState>(key: K, value: PropertyListingFormState[K]) => void;
    setFacilities: (facilities: FacilitySelection[]) => void;
    setAmenities: (amenities: string[]) => void;
    setAvailableDocuments: (docs: string[]) => void;
    addPhotos: (files: File[]) => void;
    removePhoto: (id: string) => void;
    reorderPhotos: (fromId: string, toId: string) => void;
    setVideo: (file: File | null) => void;
    resetForm: () => void;
}

const PropertyListingFormContext = createContext<PropertyListingFormContextValue | null>(null);

const createInitialState = (): PropertyListingFormState => ({
    propertyCategory: 'affordable',
    categoryType: '',
    propertySubType: '',
    furnishingStatus: 'furnished',
    title: '',
    location: '',
    size: '',
    description: '',
    countryId: '',
    stateId: '',
    amenities: [],
    facilities: [],
    price: '',
    serviceCharge: '',
    additionalCharges: '',
    paymentTerm: 'monthly',
    weeklyRate: '',
    monthlyRate: '',
    minimumNightsStay: '',
    houseRule: '',
    leaseDuration: '',
    renewalOption: true,
    maintenanceCharge: '',
    maintenanceResponsibility: 'landlord',
    securityDeposit: '',
    availablePropertyDocuments: [],
    propertyConditions: 'new',
    otherCharges: '',
    negotiable: false,
    photos: [],
    video: null,
});

const revokeMediaPreviews = (media: { photos: MediaItem[]; video: MediaItem | null }) => {
    media.photos.forEach((item) => URL.revokeObjectURL(item.previewUrl));
    if (media.video) {
        URL.revokeObjectURL(media.video.previewUrl);
    }
};

interface ProviderProps {
    listingType: ListingType;
    initialData?: AgentPropertyListing | null;
    children: React.ReactNode;
}

export const PropertyListingFormProvider: React.FC<ProviderProps> = ({ listingType, initialData, children }) => {
    const [state, setState] = useState<PropertyListingFormState>(() => createInitialState());
    const mediaRef = useRef<{ photos: MediaItem[]; video: MediaItem | null }>({ photos: [], video: null });

    useEffect(() => {
        mediaRef.current = { photos: state.photos, video: state.video };
    }, [state.photos, state.video]);

    useEffect(() => {
        return () => {
            revokeMediaPreviews(mediaRef.current);
        };
    }, []);

    useEffect(() => {
        if (initialData) {
            setState({
                propertyCategory: (initialData.propertyCategory as any) || 'affordable',
                categoryType: initialData.categoryType || '',
                propertySubType: initialData.propertySubType || '',
                furnishingStatus: initialData.furnishingStatus || 'furnished',
                title: initialData.title || '',
                location: initialData.location || '',
                size: initialData.size || '',
                description: initialData.description || '',
                countryId: initialData.country?.id || '',
                stateId: initialData.state?.id || '',
                amenities: initialData.amenities || [],
                facilities: [
                    { label: 'Living Room', value: 'living_room', units: initialData.livingRooms || 0 },
                    { label: 'Bedroom', value: 'bedroom', units: initialData.bedrooms || 0 },
                    { label: 'Bathroom', value: 'bathroom', units: initialData.bathrooms || 0 },
                    { label: 'Kitchen', value: 'kitchen', units: initialData.kitchens || 0 },
                    { label: 'Store', value: 'store', units: initialData.stores || 0 },
                ],
                price: initialData.price ? String(initialData.price) : '',
                serviceCharge: initialData.serviceCharge ? String(initialData.serviceCharge) : '',
                additionalCharges: initialData.additionalCharges || '',
                paymentTerm: initialData.paymentTerm || 'monthly',
                weeklyRate: initialData.weeklyRate ? String(initialData.weeklyRate) : '',
                monthlyRate: initialData.monthlyRate ? String(initialData.monthlyRate) : '',
                minimumNightsStay: initialData.minimumNightsStay ? String(initialData.minimumNightsStay) : '',
                houseRule: initialData.houseRule || '',
                leaseDuration: initialData.leaseDuration ? String(initialData.leaseDuration) : '',
                renewalOption: initialData.renewalOption ?? true,
                maintenanceCharge: initialData.maintenanceCharge || '',
                maintenanceResponsibility: initialData.maintenanceResponsibility || 'landlord',
                securityDeposit: initialData.securityDeposit || '',
                availablePropertyDocuments: initialData.availablePropertyDocuments || [],
                propertyConditions: initialData.propertyConditions || 'new',
                otherCharges: initialData.otherCharges || '',
                negotiable: initialData.negotiable ?? false,
                photos: (initialData.media || [])
                    .filter((m: AgentPropertyMedia) => m.mediaType === 'image')
                    .map((m: AgentPropertyMedia) => ({
                        id: m.id,
                        url: m.url,
                        previewUrl: m.url,
                        mediaType: 'image'
                    })),
                video: (initialData.media || []).find((m: AgentPropertyMedia) => m.mediaType === 'video') 
                    ? {
                        id: (initialData.media || []).find((m: AgentPropertyMedia) => m.mediaType === 'video')!.id,
                        url: (initialData.media || []).find((m: AgentPropertyMedia) => m.mediaType === 'video')!.url,
                        previewUrl: (initialData.media || []).find((m: AgentPropertyMedia) => m.mediaType === 'video')!.url,
                        mediaType: 'video'
                    } 
                    : null
            });
        } else {
            revokeMediaPreviews(mediaRef.current);
            setState(createInitialState());
        }
    }, [listingType, initialData]);

    const updateField = useCallback(
        <K extends keyof PropertyListingFormState>(key: K, value: PropertyListingFormState[K]) => {
            setState((prev) => ({ ...prev, [key]: value }));
        },
        [],
    );

    const setFacilities = useCallback((facilities: FacilitySelection[]) => {
        setState((prev) => ({ ...prev, facilities }));
    }, []);

    const setAmenities = useCallback((amenities: string[]) => {
        setState((prev) => ({ ...prev, amenities }));
    }, []);

    const setAvailableDocuments = useCallback((docs: string[]) => {
        setState((prev) => ({ ...prev, availablePropertyDocuments: docs }));
    }, []);

    const addPhotos = useCallback((files: File[]) => {
        if (!files.length) return;
        const newItems = files.map<MediaItem>((file) => ({
            id: crypto.randomUUID(),
            file,
            previewUrl: URL.createObjectURL(file),
            mediaType: 'image',
        }));
        setState((prev) => ({ ...prev, photos: [...prev.photos, ...newItems] }));
    }, []);

    const removePhoto = useCallback((id: string) => {
        setState((prev) => {
            const target = prev.photos.find((item) => item.id === id);
            if (target) {
                URL.revokeObjectURL(target.previewUrl);
            }
            return { ...prev, photos: prev.photos.filter((item) => item.id !== id) };
        });
    }, []);

    const reorderPhotos = useCallback((fromId: string, toId: string) => {
        if (fromId === toId) return;
        setState((prev) => {
            const fromIdx = prev.photos.findIndex((item) => item.id === fromId);
            const toIdx = prev.photos.findIndex((item) => item.id === toId);
            if (fromIdx === -1 || toIdx === -1) return prev;
            const photos = [...prev.photos];
            const [moved] = photos.splice(fromIdx, 1);
            photos.splice(toIdx, 0, moved);
            return { ...prev, photos };
        });
    }, []);

    const setVideo = useCallback((file: File | null) => {
        setState((prev) => {
            if (prev.video) {
                URL.revokeObjectURL(prev.video.previewUrl);
            }
            if (!file) {
                return { ...prev, video: null };
            }
            return {
                ...prev,
                video: {
                    id: crypto.randomUUID(),
                    file,
                    previewUrl: URL.createObjectURL(file),
                    mediaType: 'video',
                },
            };
        });
    }, []);

    const resetForm = useCallback(() => {
        revokeMediaPreviews(mediaRef.current);
        mediaRef.current = { photos: [], video: null };
        setState(createInitialState());
    }, []);

    const value = useMemo<PropertyListingFormContextValue>(
        () => ({
            listingType,
            state,
            updateField,
            setFacilities,
            setAmenities,
            setAvailableDocuments,
            addPhotos,
            removePhoto,
            reorderPhotos,
            setVideo,
            resetForm,
        }),
        [
            listingType,
            state,
            updateField,
            setFacilities,
            setAmenities,
            setAvailableDocuments,
            addPhotos,
            removePhoto,
            reorderPhotos,
            setVideo,
            resetForm,
        ],
    );

    return <PropertyListingFormContext.Provider value={value}>{children}</PropertyListingFormContext.Provider>;
};

export function usePropertyListingForm() {
    const context = useContext(PropertyListingFormContext);
    if (!context) {
        throw new Error('usePropertyListingForm must be used within PropertyListingFormProvider');
    }
    return context;
}
