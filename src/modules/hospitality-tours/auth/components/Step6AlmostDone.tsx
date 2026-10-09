import { useState } from 'react';
import StepProgressIndicator from './StepProgressIndicator';
import { type UserDetailsFormData } from './Step1UserDetails';
import { type BusinessDetailsFormData } from './Step4BusinessDetails';
import { type AccountDetailsFormData } from './Step5AccountDetails';

export interface Step6AlmostDoneProps {
    userData: UserDetailsFormData;
    businessData: BusinessDetailsFormData;
    accountData: AccountDetailsFormData;
    onPrevious: () => void;
    onDone: () => void;
    isSubmitting?: boolean;
}

export default function Step6AlmostDone({
    userData,
    businessData,
    accountData,
    onPrevious,
    onDone,
    isSubmitting = false,
}: Step6AlmostDoneProps) {
    const [termsAccepted, setTermsAccepted] = useState(true);
    const [marketingAccepted, setMarketingAccepted] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const fullName = `${userData.firstName || 'Charles'} ${userData.lastName || 'John'}`.trim();
    const businessName = businessData.businessName || 'Monaliza';
    const location = businessData.state ? `${businessData.state}` : (businessData.address || 'Abuja');

    const accountHolderName = businessData.businessName ? `${businessData.businessName}` : fullName;
    const accountNumber = accountData.accountNumber || '0122367890';
    const bankName = accountData.bankName || 'WEMA BANK';

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!termsAccepted) {
            setErrorMessage('Please agree to the Terms and conditions and Privacy policy to continue.');
            return;
        }

        setErrorMessage(null);
        onDone();
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <StepProgressIndicator currentStep={4} />

            <h1 className="text-[30px] sm:text-3xl lg:text-[42px] font-bold text-secondary leading-tight">
                Almost Done
            </h1>
            <p className="text-gray-600 mt-1.5 text-sm sm:text-base">
                Review your information and accept our terms
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

                {/* Card 1: User & Business Summary */}
                <div className="bg-[#F7F7FD] rounded-xl p-4 sm:p-5 space-y-3 border border-[#E0DEF7]/50">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500 font-medium">Name</span>
                        <span className="text-secondary font-bold">{fullName}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500 font-medium">Business</span>
                        <span className="text-secondary font-bold">{businessName}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500 font-medium">Location</span>
                        <span className="text-secondary font-bold">{location}</span>
                    </div>
                </div>

                {/* Card 2: Account Details Summary */}
                <div className="bg-[#F7F7FD] rounded-xl p-4 sm:p-5 space-y-3 border border-[#E0DEF7]/50">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500 font-medium">Account Name</span>
                        <span className="text-secondary font-bold">{accountHolderName}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500 font-medium">Account Number</span>
                        <span className="text-secondary font-bold">{accountNumber}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500 font-medium">Bank Name</span>
                        <span className="text-secondary font-bold uppercase">{bankName}</span>
                    </div>
                </div>

                {/* Checkboxes */}
                <div className="space-y-3 pt-2">
                    <label className="flex items-start gap-3 cursor-pointer text-xs sm:text-sm text-gray-600 leading-snug">
                        <input
                            type="checkbox"
                            checked={termsAccepted}
                            onChange={(e) => setTermsAccepted(e.target.checked)}
                            className="mt-0.5 w-4 h-4 rounded border-gray-300 text-green-700 focus:ring-green-700/30 accent-green-700"
                        />
                        <span>
                            I agree to the{' '}
                            <a href="#" className="text-green-700 font-medium underline">
                                Terms and conditions
                            </a>{' '}
                            and{' '}
                            <a href="#" className="text-green-700 font-medium underline">
                                Privacy policy
                            </a>{' '}
                            of Kadamora
                        </span>
                    </label>

                    <label className="flex items-start gap-3 cursor-pointer text-xs sm:text-sm text-gray-600 leading-snug">
                        <input
                            type="checkbox"
                            checked={marketingAccepted}
                            onChange={(e) => setMarketingAccepted(e.target.checked)}
                            className="mt-0.5 w-4 h-4 rounded border-gray-300 text-green-700 focus:ring-green-700/30 accent-green-700"
                        />
                        <span>
                            I would like to receive marketing communication and service update via mail
                        </span>
                    </label>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-4 pt-4">
                    <button
                        type="button"
                        onClick={onPrevious}
                        className="w-1/2 border border-[#CCE3FD] bg-[#EBF3FC] text-secondary font-medium py-3 rounded-xl hover:bg-[#DDEBFA] transition-colors"
                        disabled={isSubmitting}
                    >
                        Previous
                    </button>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-1/2 bg-[#002D62] text-white font-medium py-3 rounded-xl hover:bg-[#002550] transition-colors shadow-sm disabled:opacity-60"
                    >
                        {isSubmitting ? (
                            <div className="flex items-center justify-center gap-2">
                                <span className="h-4 w-4 rounded-full border-2 border-white/70 border-t-white animate-spin" />
                                <span>Completing...</span>
                            </div>
                        ) : (
                            'Done'
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
