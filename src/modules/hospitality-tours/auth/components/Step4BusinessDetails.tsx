import { useState } from 'react';
import Input from '@shared/components/Forms/Input';
import Select from '@shared/components/Forms/Select';
import PhoneNumberInput from '@shared/components/Forms/PhoneNumberInput';
import StepProgressIndicator from './StepProgressIndicator';

export interface BusinessDetailsFormData {
    businessName: string;
    businessPhone: string;
    address: string;
    state: string;
}

export interface Step4BusinessDetailsProps {
    initialData: BusinessDetailsFormData;
    onPrevious: () => void;
    onNext: (data: BusinessDetailsFormData) => void;
}

const NIGERIAN_STATES = [
    { label: 'Abia', value: 'Abia' },
    { label: 'Adamawa', value: 'Adamawa' },
    { label: 'Akwa Ibom', value: 'Akwa Ibom' },
    { label: 'Anambra', value: 'Anambra' },
    { label: 'Bauchi', value: 'Bauchi' },
    { label: 'Bayelsa', value: 'Bayelsa' },
    { label: 'Benue', value: 'Benue' },
    { label: 'Borno', value: 'Borno' },
    { label: 'Cross River', value: 'Cross River' },
    { label: 'Delta', value: 'Delta' },
    { label: 'Ebonyi', value: 'Ebonyi' },
    { label: 'Edo', value: 'Edo' },
    { label: 'Ekiti', value: 'Ekiti' },
    { label: 'Enugu', value: 'Enugu' },
    { label: 'FCT - Abuja', value: 'Abuja' },
    { label: 'Gombe', value: 'Gombe' },
    { label: 'Imo', value: 'Imo' },
    { label: 'Jigawa', value: 'Jigawa' },
    { label: 'Kaduna', value: 'Kaduna' },
    { label: 'Kano', value: 'Kano' },
    { label: 'Katsina', value: 'Katsina' },
    { label: 'Kebbi', value: 'Kebbi' },
    { label: 'Kogi', value: 'Kogi' },
    { label: 'Kwara', value: 'Kwara' },
    { label: 'Lagos', value: 'Lagos' },
    { label: 'Nasarawa', value: 'Nasarawa' },
    { label: 'Niger', value: 'Niger' },
    { label: 'Ogun', value: 'Ogun' },
    { label: 'Ondo', value: 'Ondo' },
    { label: 'Osun', value: 'Osun' },
    { label: 'Oyo', value: 'Oyo' },
    { label: 'Plateau', value: 'Plateau' },
    { label: 'Rivers', value: 'Rivers' },
    { label: 'Sokoto', value: 'Sokoto' },
    { label: 'Taraba', value: 'Taraba' },
    { label: 'Yobe', value: 'Yobe' },
    { label: 'Zamfara', value: 'Zamfara' },
];

export default function Step4BusinessDetails({
    initialData,
    onPrevious,
    onNext,
}: Step4BusinessDetailsProps) {
    const [formData, setFormData] = useState<BusinessDetailsFormData>(initialData);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePhoneChange = (phone: string) => {
        setFormData({ ...formData, businessPhone: phone });
    };

    const handleStateChange = (selectedState: string) => {
        setFormData({ ...formData, state: selectedState });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.businessName.trim()) {
            setErrorMessage('Please enter your business name.');
            return;
        }

        if (!formData.businessPhone.trim()) {
            setErrorMessage('Please enter your business phone number.');
            return;
        }

        if (!formData.address.trim()) {
            setErrorMessage('Please enter your business address.');
            return;
        }

        if (!formData.state) {
            setErrorMessage('Please select a state.');
            return;
        }

        setErrorMessage(null);
        onNext(formData);
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <StepProgressIndicator currentStep={2} />

            <h1 className="text-[30px] sm:text-3xl lg:text-[42px] font-bold text-secondary leading-tight">
                Your Business Details
            </h1>
            <p className="text-gray-600 mt-1.5 text-sm sm:text-base">
                Unlock a seamless experience designed around your needs.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                {errorMessage ? (
                    <div
                        role="alert"
                        className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600"
                    >
                        {errorMessage}
                    </div>
                ) : null}

                <Input
                    id="businessName"
                    name="businessName"
                    title="Business Name"
                    placeholder="Enter business name"
                    value={formData.businessName}
                    onChange={handleChange}
                    required
                />

                <PhoneNumberInput
                    id="businessPhone"
                    name="businessPhone"
                    title="Business Phone Number"
                    value={formData.businessPhone}
                    onChange={handlePhoneChange}
                    required
                />

                <Input
                    id="address"
                    name="address"
                    title="Address"
                    placeholder="Enter Address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                />

                <Select
                    id="state"
                    name="state"
                    title="State"
                    options={NIGERIAN_STATES}
                    placeholder="Select State"
                    value={formData.state}
                    onChange={handleStateChange}
                    required
                />

                <div className="flex items-center gap-4 pt-4">
                    <button
                        type="button"
                        onClick={onPrevious}
                        className="w-1/2 border border-[#CCE3FD] bg-[#EBF3FC] text-secondary font-medium py-3 rounded-xl hover:bg-[#DDEBFA] transition-colors"
                    >
                        Previous
                    </button>

                    <button
                        type="submit"
                        className="w-1/2 bg-[#002D62] text-white font-medium py-3 rounded-xl hover:bg-[#002550] transition-colors shadow-sm"
                    >
                        Proceed
                    </button>
                </div>
            </form>
        </div>
    );
}
