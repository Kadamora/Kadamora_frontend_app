import React, { useCallback, useMemo, useState } from 'react';
import type {
    HTCategoryId,
    HTListingFormState,
    ScheduleItem,
    TicketType,
    RoomType,
    GalleryItem,
} from './HTListingFlowTypes';
import { HTListingFormContext, type HTListingFormContextValue } from './useHTListingForm';

// Re-export types so existing consumers importing from this file keep working
export type {
    HTCategoryId,
    SocialMedia,
    HTListingFormState,
    ScheduleItem,
    RoomType,
    TicketType,
    GalleryItem,
} from './HTListingFlowTypes';

const createInitialState = (): HTListingFormState => ({
    name: '',
    category: '',
    description: '',
    tags: [],
    postOnTimeline: false,
    fromDate: '',
    toDate: '',
    price: '',
    expectedNumber: '',
    state: '',
    city: '',
    address: '',
    pinLocation: '',
    phone: '',
    email: '',
    socialMedia: { facebook: '', instagram: '', twitter: '' },
    eventFromDate: '',
    eventToDate: '',
    eventVenue: '',
    scheduleItems: [],
    amenities: [],
    roomTypes: [],
    hotelAmenities: [],
    checkInTime: '',
    checkOutTime: '',
    cancellationPolicy: '',
    petsAllowed: false,
    smokingAllowed: false,
    extraPolicies: '',
    ticketTypes: [],
    ticketingPlatform: '',
    bookingLink: '',
    coverPhoto: null,
    photoGallery: [],
    promotionalVideo: null,
    coverPhotoPreview: null,
    galleryPreviews: [],
    videoPreview: null,
});

// ─── Provider ─────────────────────────────────────────────────────────────────

interface ProviderProps {
    categoryId: HTCategoryId;
    children: React.ReactNode;
}

export const HTListingFormProvider: React.FC<ProviderProps> = ({ categoryId, children }) => {
    const [formState, setFormState] = useState<HTListingFormState>(createInitialState);

    const updateField = useCallback(<K extends keyof HTListingFormState>(
        key: K,
        value: HTListingFormState[K],
    ) => {
        setFormState((prev) => ({ ...prev, [key]: value }));
    }, []);

    const addTag = useCallback((tag: string) => {
        const trimmed = tag.trim();
        if (!trimmed) return;
        setFormState((prev) => ({
            ...prev,
            tags: prev.tags.includes(trimmed) ? prev.tags : [...prev.tags, trimmed],
        }));
    }, []);

    const removeTag = useCallback((tag: string) => {
        setFormState((prev) => ({ ...prev, tags: prev.tags.filter((t) => t !== tag) }));
    }, []);

    const toggleAmenity = useCallback((amenity: string) => {
        setFormState((prev) => ({
            ...prev,
            amenities: prev.amenities.includes(amenity)
                ? prev.amenities.filter((a) => a !== amenity)
                : [...prev.amenities, amenity],
        }));
    }, []);

    const addCustomAmenity = useCallback((amenity: string) => {
        const trimmed = amenity.trim();
        if (!trimmed) return;
        setFormState((prev) => ({
            ...prev,
            amenities: prev.amenities.includes(trimmed) ? prev.amenities : [...prev.amenities, trimmed],
        }));
    }, []);

    const addScheduleItem = useCallback((item: Omit<ScheduleItem, 'id'>) => {
        setFormState((prev) => ({
            ...prev,
            scheduleItems: [...prev.scheduleItems, { ...item, id: crypto.randomUUID() }],
        }));
    }, []);

    const removeScheduleItem = useCallback((id: string) => {
        setFormState((prev) => ({
            ...prev,
            scheduleItems: prev.scheduleItems.filter((s) => s.id !== id),
        }));
    }, []);

    const addTicketType = useCallback((ticket: Omit<TicketType, 'id'>) => {
        setFormState((prev) => ({
            ...prev,
            ticketTypes: [...prev.ticketTypes, { ...ticket, id: crypto.randomUUID() }],
        }));
    }, []);

    const removeTicketType = useCallback((id: string) => {
        setFormState((prev) => ({
            ...prev,
            ticketTypes: prev.ticketTypes.filter((t) => t.id !== id),
        }));
    }, []);

    const updateTicketType = useCallback((id: string, updates: Partial<TicketType>) => {
        setFormState((prev) => ({
            ...prev,
            ticketTypes: prev.ticketTypes.map((t) => (t.id === id ? { ...t, ...updates } : t)),
        }));
    }, []);

    const addRoomType = useCallback((room: Omit<RoomType, 'id'>) => {
        setFormState((prev) => ({
            ...prev,
            roomTypes: [...prev.roomTypes, { ...room, id: crypto.randomUUID() }],
        }));
    }, []);

    const removeRoomType = useCallback((id: string) => {
        setFormState((prev) => ({
            ...prev,
            roomTypes: prev.roomTypes.filter((r) => r.id !== id),
        }));
    }, []);

    const setCoverPhoto = useCallback((file: File | null) => {
        setFormState((prev) => {
            if (prev.coverPhotoPreview) URL.revokeObjectURL(prev.coverPhotoPreview);
            return {
                ...prev,
                coverPhoto: file,
                coverPhotoPreview: file ? URL.createObjectURL(file) : null,
            };
        });
    }, []);

    const addGalleryPhotos = useCallback((files: File[]) => {
        const newItems: GalleryItem[] = files.map((file) => ({
            id: crypto.randomUUID(),
            file,
            previewUrl: URL.createObjectURL(file),
        }));
        setFormState((prev) => ({
            ...prev,
            photoGallery: [...prev.photoGallery, ...files],
            galleryPreviews: [...prev.galleryPreviews, ...newItems],
        }));
    }, []);

    const removeGalleryPhoto = useCallback((id: string) => {
        setFormState((prev) => {
            const target = prev.galleryPreviews.find((g) => g.id === id);
            if (target) URL.revokeObjectURL(target.previewUrl);
            return {
                ...prev,
                galleryPreviews: prev.galleryPreviews.filter((g) => g.id !== id),
                photoGallery: prev.photoGallery.filter((_, i) => {
                    const idx = prev.galleryPreviews.findIndex((g) => g.id === id);
                    return i !== idx;
                }),
            };
        });
    }, []);

    const setPromotionalVideo = useCallback((file: File | null) => {
        setFormState((prev) => {
            if (prev.videoPreview) URL.revokeObjectURL(prev.videoPreview);
            return {
                ...prev,
                promotionalVideo: file,
                videoPreview: file ? URL.createObjectURL(file) : null,
            };
        });
    }, []);

    const resetForm = useCallback(() => {
        setFormState((prev) => {
            if (prev.coverPhotoPreview) URL.revokeObjectURL(prev.coverPhotoPreview);
            if (prev.videoPreview) URL.revokeObjectURL(prev.videoPreview);
            prev.galleryPreviews.forEach((g) => URL.revokeObjectURL(g.previewUrl));
            return createInitialState();
        });
    }, []);

    const value = useMemo<HTListingFormContextValue>(
        () => ({
            categoryId,
            state: formState,
            updateField,
            addTag,
            removeTag,
            toggleAmenity,
            addCustomAmenity,
            addScheduleItem,
            removeScheduleItem,
            addTicketType,
            removeTicketType,
            updateTicketType,
            addRoomType,
            removeRoomType,
            setCoverPhoto,
            addGalleryPhotos,
            removeGalleryPhoto,
            setPromotionalVideo,
            resetForm,
        }),
        [
            categoryId, formState, updateField, addTag, removeTag,
            toggleAmenity, addCustomAmenity, addScheduleItem, removeScheduleItem,
            addTicketType, removeTicketType, updateTicketType, addRoomType, removeRoomType,
            setCoverPhoto, addGalleryPhotos, removeGalleryPhoto, setPromotionalVideo, resetForm,
        ],
    );

    return <HTListingFormContext.Provider value={value}>{children}</HTListingFormContext.Provider>;
};
