import { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import ListPropertySidebar from './ListPropertySidebar';
import PropertyDetailsStep from './PropertyDetailsStep';
import LeaseTermPricingStep from './LeaseTermPricingStep';
import MediaDocumentStep from './MediaDocumentStep';
import type { WorkspaceProperty, LeasePropertyFormData } from '../../../types/commercialFacilities';
import { showSuccessToast } from '@shared/components/Toast/Toast';

interface ListPropertyForLeaseModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (property: WorkspaceProperty) => void;
    initialProperty?: WorkspaceProperty | null;
}

const DEFAULT_FORM_DATA: LeasePropertyFormData = {
    category: 'AFFORDABLE',
    categoryType: 'Commercial',
    propertyType: 'Office Space',
    title: '',
    location: '',
    size: '',
    furnishingStatus: 'Furnished',
    facilities: {
        'Living Room': 1,
        'Bedroom': 5,
        'Bathroom/ Toilet': 5,
    },
    amenities: ['AC', 'Garden', 'Gym', 'Parking Space'],
    leasePrice: '',
    leaseDuration: '',
    renewalOption: 'Yes',
    maintenanceResponsibility: 'Landlord',
    securityDeposit: '',
    additionalCharges: '',
    documents: [],
    photos: [],
};

export default function ListPropertyForLeaseModal({
    isOpen,
    onClose,
    onSave,
    initialProperty,
}: ListPropertyForLeaseModalProps) {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<LeasePropertyFormData>(DEFAULT_FORM_DATA);

    useEffect(() => {
        if (!isOpen) return;

        if (initialProperty) {
            setFormData({
                id: initialProperty.id,
                category: initialProperty.category || 'AFFORDABLE',
                categoryType: initialProperty.categoryType || 'Commercial',
                propertyType: initialProperty.tag || 'Office Space',
                title: initialProperty.title,
                location: initialProperty.location,
                size: initialProperty.size || '350 sqm',
                furnishingStatus: initialProperty.furnishingStatus || 'Furnished',
                facilities: {
                    'Living Room': 1,
                    'Bedroom': 5,
                    'Bathroom/ Toilet': 5,
                },
                amenities: initialProperty.amenities || ['AC', 'Garden', 'Gym', 'Parking Space'],
                leasePrice: initialProperty.price || '₦ 22,999,732.00',
                leaseDuration: initialProperty.leaseDuration || '1 Year',
                renewalOption: (initialProperty.renewalOption as 'Yes' | 'No') || 'Yes',
                maintenanceResponsibility:
                    (initialProperty.maintenanceResponsibility as
                        | 'Tenant'
                        | 'Landlord'
                        | 'Shared') || 'Landlord',
                securityDeposit: initialProperty.securityDeposit || '₦ 2,000,000.00',
                additionalCharges: initialProperty.additionalCharges || '',
                documents: initialProperty.documents || [],
                photos: initialProperty.photos || [initialProperty.imageUrl],
            });
        } else {
            setFormData(DEFAULT_FORM_DATA);
        }
        setCurrentStep(1);
    }, [isOpen, initialProperty]);

    // Handle Escape key
    useEffect(() => {
        if (!isOpen) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleKeyDown);
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = prevOverflow;
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const handleUpdateFormData = (updated: Partial<LeasePropertyFormData>) => {
        setFormData((prev) => ({ ...prev, ...updated }));
    };

    const handleFinalSubmit = () => {
        const savedProperty: WorkspaceProperty = {
            id: formData.id || `prop-ws-${Date.now()}`,
            tag: formData.propertyType || 'Office Space',
            title: formData.title || 'Executive Workspace Suite',
            price: formData.leasePrice.startsWith('₦')
                ? formData.leasePrice
                : `₦ ${formData.leasePrice || '22,999,732.00'}`,
            location:
                formData.location ||
                'Dalaba Street Aminu Kano Cresent, Wuse Zone 2 Abuja, Nigeria',
            imageUrl:
                formData.photos[0] ||
                'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
            features:
                formData.amenities.length > 0
                    ? formData.amenities.slice(0, 4)
                    : ['High-speed Internet', 'Conference Rooms', 'Kitchen Facilities', 'Parking'],
            category: formData.category,
            categoryType: formData.categoryType,
            size: formData.size,
            furnishingStatus: formData.furnishingStatus,
            leaseDuration: formData.leaseDuration,
            renewalOption: formData.renewalOption,
            maintenanceResponsibility: formData.maintenanceResponsibility,
            securityDeposit: formData.securityDeposit,
            additionalCharges: formData.additionalCharges,
            amenities: formData.amenities,
            documents: formData.documents,
            photos: formData.photos,
        };

        onSave(savedProperty);
        showSuccessToast(
            formData.id ? 'Property Updated' : 'Listing Published',
            `${savedProperty.title} is now active on Workspace Leasing.`
        );
        onClose();
    };

    const getStepTitle = () => {
        switch (currentStep) {
            case 1:
                return 'Property Details';
            case 2:
                return 'Lease Term And Pricing';
            case 3:
                return 'Media And Document';
            default:
                return 'Property Details';
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
            role="dialog"
            aria-modal="true"
        >
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity animate-[fadeIn_.2s_ease-out]"
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Modal Dialog Container */}
            <div className="relative w-full max-w-5xl bg-white rounded-[20px] shadow-2xl z-10 overflow-hidden flex flex-col md:flex-row max-h-[92vh] animate-[fadeScale_.22s_ease-out]">
                {/* Stepper Sidebar Left */}
                <ListPropertySidebar
                    currentStep={currentStep}
                    isEditMode={Boolean(formData.id)}
                />

                {/* Content Area Right */}
                <div className="flex-1 p-6 sm:p-8 overflow-y-auto flex flex-col justify-between">
                    <div>
                        {/* Header with Title and Circular Close Button */}
                        <div className="flex items-center justify-between pb-3 border-b border-[#F0F2F5] mb-5">
                            <h3 className="text-lg sm:text-xl font-bold text-[#002E62]">
                                {getStepTitle()}
                            </h3>

                            <button
                                type="button"
                                onClick={onClose}
                                aria-label="Close dialog"
                                className="h-8 w-8 rounded-full bg-[#F2F5F8] text-[#71717A] hover:bg-[#E4E9EF] hover:text-[#002E62] flex items-center justify-center transition-colors cursor-pointer focus:outline-none"
                            >
                                <FiX className="h-4 w-4" />
                            </button>
                        </div>

                        {/* Step 1: Property Details */}
                        {currentStep === 1 && (
                            <PropertyDetailsStep
                                formData={formData}
                                onChange={handleUpdateFormData}
                                onNext={() => setCurrentStep(2)}
                            />
                        )}

                        {/* Step 2: Lease Term And Pricing */}
                        {currentStep === 2 && (
                            <LeaseTermPricingStep
                                formData={formData}
                                onChange={handleUpdateFormData}
                                onPrevious={() => setCurrentStep(1)}
                                onNext={() => setCurrentStep(3)}
                            />
                        )}

                        {/* Step 3: Media And Document */}
                        {currentStep === 3 && (
                            <MediaDocumentStep
                                formData={formData}
                                onChange={handleUpdateFormData}
                                onPrevious={() => setCurrentStep(2)}
                                onSubmit={handleFinalSubmit}
                            />
                        )}
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes fadeScale {
                    0% { opacity: 0; transform: scale(0.96); }
                    100% { opacity: 1; transform: scale(1); }
                }
                @keyframes fadeIn {
                    0% { opacity: 0; }
                    100% { opacity: 1; }
                }
            `}</style>
        </div>
    );
}
