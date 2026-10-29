import Input from '@shared/components/Forms/Input';
import RadioGroup from '@shared/components/Forms/RadioGroup';
import Select from '@shared/components/Forms/Select';
import StepsSidebar from '@modules/real-estate/dashboard/PropertyListing/Home/components/ListPropertyFlow/components/StepsSidebar';
import CloseButton from '@modules/real-estate/dashboard/PropertyListing/Home/components/OnboardingAgent/components/CloseButton';
import React, { useState, useCallback, useEffect } from 'react';
import { useCreatePropertyMutation } from '@modules/real-estate/api/propertyMgt.api';
import { useAgentStatus } from '@modules/real-estate/hooks/useAgentStatus';
import { AgentApprovalBanner } from '@modules/real-estate/components/AgentApprovalBanner';
import { showErrorToast, showSuccessToast } from '@shared/components/Toast/Toast';
import { extractApiErrorMessage } from '@modules/real-estate/utils/errorUtils';

interface StepDef {
    id: string;
    title: string;
    description?: string;
}

const steps: StepDef[] = [
    {
        id: 'property_details',
        title: 'Property Details',
        description: 'Provide key information about the property to help potential clients understand what is being offered.',
    },
    // {
    //     id: 'invite_user',
    //     title: 'Invite User',
    //     description:
    //         'Lorem ipsum dolor sit amet consectetur. Tellus nunc odio enim ut sit rutrum morbi. Bibendum sed dictum egestas purus a porta sit.',
    // },
    {
        id: 'account_details',
        title: 'Property Account Details',
        description:
            'Enter the account and payment details associated with this property to enable transactions.',
    },
];

interface AddPropertyFlowModalProps {
    open: boolean;
    onClose: () => void;
    onUploadDocs?: () => void;
}

const AddPropertyFlowModal: React.FC<AddPropertyFlowModalProps> = ({ open, onClose, onUploadDocs }) => {
    const [currentIdx, setCurrentIdx] = useState(0);

    // Form State
    const [role, setRole] = useState<'owner' | 'property_manager' | 'tenant'>('owner');
    const [category, setCategory] = useState('');
    const [propertyName, setPropertyName] = useState('');
    const [address, setAddress] = useState('');
    const [estateManagerEmail, setEstateManagerEmail] = useState('');
    const [bankName, setBankName] = useState('');
    const [accountName, setAccountName] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [submitError, setSubmitError] = useState<string | null>(null);

    const { isApproved, isUnderReview, explanation } = useAgentStatus();
    const [createProperty, { isLoading }] = useCreatePropertyMutation();

    const handleClose = useCallback(() => {
        onClose();
        setTimeout(() => {
            setCurrentIdx(0);
            setRole('owner');
            setCategory('');
            setPropertyName('');
            setAddress('');
            setEstateManagerEmail('');
            setBankName('');
            setAccountName('');
            setAccountNumber('');
            setSubmitError(null);
        }, 250);
    }, [onClose]);

    const handleSubmit = async () => {
        setSubmitError(null);
        if (currentIdx < steps.length - 1) {
            setCurrentIdx((idx) => Math.min(idx + 1, steps.length - 1));
            return;
        }

        if (!isApproved) {
            const msg = explanation || 'Only verified agents can create properties. Please upload verification documents.';
            setSubmitError(msg);
            showErrorToast('Verification Required', msg);
            return;
        }

        try {
            await createProperty({
                role: role,
                name: propertyName,
                categoryType: category,
                address,
                estateManagerEmail,
                bankName,
                accountNumber,
                accountName,
            }).unwrap();

            showSuccessToast('Property Created', 'Property created successfully');
            handleClose();
        } catch (error: any) {
            console.error('Failed to create property:', error);
            const errorMsg = extractApiErrorMessage(error, 'Failed to create property');
            setSubmitError(errorMsg);
            showErrorToast(
                error?.status === 403 ? 'Verification Required' : 'Creation Failed',
                errorMsg
            );
        }
    };

    useEffect(() => {
        if (!open) return;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        const handler = (event: KeyboardEvent) => {
            if (event.key === 'Escape') handleClose();
        };
        window.addEventListener('keydown', handler);
        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener('keydown', handler);
        };
    }, [open, handleClose]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4">
            <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}`}</style>
            <div className="relative w-full max-w-225 min-h-[30vh] rounded-xl bg-white shadow-xl overflow-hidden animate-[fadeIn_.25s_ease] flex flex-col max-h-[90vh] md:max-h-none">
                <div className="w-full md:w-225 max-w-[96vw] rounded-xl overflow-hidden flex bg-white shadow-[0_4px_32px_-4px_rgba(15,23,42,0.12)] md:flex-row flex-col md:h-150">
                    <div className="hidden md:block w-[35%]">
                        <StepsSidebar steps={steps} currentIdx={currentIdx} listingType="Management" />
                    </div>
                    <div className="flex-1 flex flex-col md:max-h-none max-h-[80vh]">
                        <div className="h-17.5 md:flex hidden items-center justify-between pl-10 pr-6 border-b border-[#EDF1F5] bg-white/70 backdrop-blur-sm">
                            <h3 className="text-[20px] font-semibold text-[#001731]">{steps[currentIdx].title}</h3>
                            <CloseButton onClick={handleClose} />
                        </div>
                        <div className="md:hidden w-full px-6 pt-6 pb-2 flex items-center justify-between">
                            <h2 className="text-[22px] font-bold leading-tight text-[#0F172A]">
                                <span className="text-[#16A34A]">{steps[currentIdx].title}</span>
                            </h2>
                            <CloseButton onClick={handleClose} />
                        </div>
                        <div className="flex-1 overflow-y-auto md:px-10 px-6 md:pt-10 pt-2 md:pb-8 pb-2">
                            {!isApproved && (
                                <AgentApprovalBanner
                                    explanation={explanation}
                                    isUnderReview={isUnderReview}
                                    isApproved={isApproved}
                                    onUploadDocs={onUploadDocs}
                                    className="mb-4"
                                />
                            )}
                            {submitError && (
                                <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-2">
                                    <svg className="w-5 h-5 shrink-0 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>{submitError}</span>
                                </div>
                            )}
                            {currentIdx === 0 && <PropertyDetailsStep 
                                role={role} setRole={setRole} 
                                category={category} setCategory={setCategory} 
                                propertyName={propertyName} setPropertyName={setPropertyName} 
                                address={address} setAddress={setAddress} 
                                estateManagerEmail={estateManagerEmail} setEstateManagerEmail={setEstateManagerEmail} 
                            />}
                            {currentIdx === 1 && <AccountDetailsStep 
                                bankName={bankName} setBankName={setBankName}
                                accountName={accountName} setAccountName={setAccountName}
                                accountNumber={accountNumber} setAccountNumber={setAccountNumber}
                            />}
                        </div>
                        <div className="border-t border-[#E2E8F0] bg-white px-6 py-4">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                                <div className="flex items-center justify-between md:justify-end gap-3 w-full md:w-auto">
                                    <button
                                        type="button"
                                        onClick={() => setCurrentIdx((idx) => Math.max(idx - 1, 0))}
                                        disabled={currentIdx === 0}
                                        className={`px-6 py-3 rounded-lg border text-[14px] font-semibold transition-colors focus:ring-2 focus:ring-[#002E62]/70 focus:border-transparent outline-none ${currentIdx === 0 ? 'bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed' : 'bg-white text-[#002E62] border-[#E0DEF7] hover:bg-[#F7F7FD] focus:bg-[#F7F7FD]'}`}
                                    >
                                        Previous
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleSubmit}
                                        disabled={isLoading || (currentIdx === steps.length - 1 && !isApproved)}
                                        title={currentIdx === steps.length - 1 && !isApproved ? (explanation || 'Verification required') : undefined}
                                        className="px-6 py-3 rounded-lg bg-[#002E62] text-white text-[14px] font-semibold transition-colors hover:bg-[#002E62]/90 focus:ring-2 focus:ring-[#002E62]/70 focus:ring-offset-2 outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isLoading ? 'Loading...' : currentIdx === steps.length - 1 ? (isApproved ? 'Submit' : 'Verification Required') : 'Save & Continue'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Step 1: Property Details
const PropertyDetailsStep: React.FC<any> = ({ role, setRole, category, setCategory, propertyName, setPropertyName, address, setAddress, estateManagerEmail, setEstateManagerEmail }) => {
    return (
        <form className="space-y-6">
            <RadioGroup
                title="Tell us your role in this property?"
                name="role"
                value={role}
                onChange={setRole}
                options={[
                    { label: 'Owner', value: 'owner' },
                    { label: 'Property Manager', value: 'property_manager' },
                    { label: 'Tenant', value: 'tenant' },
                ]}
                className="mb-2"
            />
            <Input title="Property Name" value={propertyName} onChange={(e) => setPropertyName(e.target.value)} placeholder="Hilltop Estate" name="propertyName" required />
            <Select
                title="Category Name"
                placeholder="Select a category name"
                options={[
                    { label: 'Residential', value: 'residential' },
                    { label: 'Commercial', value: 'commercial' },
                    // { label: 'Industrial', value: 'industrial' },
                    // { label: 'Mixed-Use', value: 'mixed-use' },
                ]}
                value={category}
                onChange={setCategory}
                name="category"
                required
            />
            <Input title="Address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="12, Amino Kano Crescent, Wuse 2, Abuja" name="address" required />
             <Input
            title="Property Manager Email"
            type="email"
            placeholder="Enter property manager email"
            name="estateManagerEmail"
            value={estateManagerEmail}
            onChange={(e) => setEstateManagerEmail(e.target.value)}
            required
        />
        </form>
    );
};

// Step 2: Invite User
// const InviteUserStep: React.FC<any> = ({ estateManagerEmail, setEstateManagerEmail }) => (
//     <form className="space-y-6">
//         <div className="bg-[#F6FAFF] border border-[#B6E0FE] rounded-lg p-4 mb-4">
//             <span className="block text-[#0F62FE] font-semibold mb-1">Note:</span>
//             <span className="text-sm text-[#64748B]">
//                 The tenant you added will receive a welcome email with a temporary password to log in.
//             </span>
//         </div>
//         <Input
//             title="Estate Manager Email"
//             type="email"
//             placeholder="Enter estate manager email"
//             name="estateManagerEmail"
//             value={estateManagerEmail}
//             onChange={(e) => setEstateManagerEmail(e.target.value)}
//             required
//         />
//     </form>
// );

// Step 3: Account Details
const AccountDetailsStep: React.FC<any> = ({ bankName, setBankName, accountName, setAccountName, accountNumber, setAccountNumber }) => (
    <form className="space-y-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input title="Bank Name" value={bankName} onChange={(e) => setBankName(e.target.value)} placeholder="Enter bank name" name="bankName" required />
        <Input title="Account Name" value={accountName} onChange={(e) => setAccountName(e.target.value)} placeholder="Enter account name" name="accountName" required />
        <div className="md:col-span-2">
            <Input title="Account Number" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} placeholder="Enter account number" name="accountNumber" required />
        </div>
    </form>
);

export default AddPropertyFlowModal;


