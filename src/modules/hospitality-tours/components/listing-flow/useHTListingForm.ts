import { createContext, useContext } from 'react';
import type {
    HTCategoryId,
    HTListingFormState,
    ScheduleItem,
    TicketType,
    RoomType,
} from './HTListingFlowTypes';

export interface HTListingFormContextValue {
    categoryId: HTCategoryId;
    state: HTListingFormState;
    updateField: <K extends keyof HTListingFormState>(key: K, value: HTListingFormState[K]) => void;
    addTag: (tag: string) => void;
    removeTag: (tag: string) => void;
    toggleAmenity: (amenity: string) => void;
    addCustomAmenity: (amenity: string) => void;
    addScheduleItem: (item: Omit<ScheduleItem, 'id'>) => void;
    removeScheduleItem: (id: string) => void;
    addTicketType: (ticket: Omit<TicketType, 'id'>) => void;
    removeTicketType: (id: string) => void;
    updateTicketType: (id: string, updates: Partial<TicketType>) => void;
    addRoomType: (room: Omit<RoomType, 'id'>) => void;
    removeRoomType: (id: string) => void;
    setCoverPhoto: (file: File | null) => void;
    addGalleryPhotos: (files: File[]) => void;
    removeGalleryPhoto: (id: string) => void;
    setPromotionalVideo: (file: File | null) => void;
    resetForm: () => void;
}

export const HTListingFormContext = createContext<HTListingFormContextValue | null>(null);

export function useHTListingForm(): HTListingFormContextValue {
    const ctx = useContext(HTListingFormContext);
    if (!ctx) throw new Error('useHTListingForm must be used within HTListingFormProvider');
    return ctx;
}
