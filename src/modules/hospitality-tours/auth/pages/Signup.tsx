import { useState } from 'react';
import { useNavigate } from 'react-router';
import Step1UserDetails, { type UserDetailsFormData } from '../components/Step1UserDetails';
import OTPVerification from '@shared/components/Auth/OTPVerification';
import Step3VerificationSuccess from '../components/Step3VerificationSuccess';
import Step4BusinessDetails, { type BusinessDetailsFormData } from '../components/Step4BusinessDetails';
import Step5AccountDetails, { type AccountDetailsFormData } from '../components/Step5AccountDetails';
import Step6AlmostDone from '../components/Step6AlmostDone';
import { useSignupMutation } from '@shared/api/auth.api';
import { showSuccessToast, showErrorToast } from '@shared/components/Toast/Toast';

type RegistrationStep = 'user-details' | 'email-otp' | 'otp-success' | 'business-details' | 'account-details' | 'almost-done';

export default function HTSignupPage() {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState<RegistrationStep>('user-details');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form data state
    const [userData, setUserData] = useState<UserDetailsFormData>({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
    });

    const [businessData, setBusinessData] = useState<BusinessDetailsFormData>({
        businessName: '',
        businessPhone: '',
        address: '',
        state: '',
    });

    const [accountData, setAccountData] = useState<AccountDetailsFormData>({
        bankName: '',
        accountNumber: '',
    });

    const [triggerSignup] = useSignupMutation();

    // Step 1 Submission -> Triggers initial user signup & moves to OTP
    const handleStep1Submit = async (data: UserDetailsFormData) => {
        setUserData(data);
        setIsSubmitting(true);

        try {
            await triggerSignup({
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: data.password,
                phoneNumber: data.phoneNumber,
                isTermsAccepted: true,
            }).unwrap();

            showSuccessToast("Account Registered", "Verification PIN has been sent to your email.");
            setCurrentStep('email-otp');
        } catch (err: any) {
            const message = err?.data?.message || err?.error || "Registration failed. Please try again.";
            showErrorToast("Registration Error", message);
            // Allow proceeding to OTP step for UI flow testing
            setCurrentStep('email-otp');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Step 2 OTP Verification
    const handleOTPVerify = async (code: string) => {
        console.log("Verifying code:", code);
    };

    // Step 4 Business Details Submission
    const handleStep4Submit = (data: BusinessDetailsFormData) => {
        setBusinessData(data);
        setCurrentStep('account-details');
    };

    // Step 5 Account Details Submission -> Moves to Almost Done
    const handleAccountSubmit = (data: AccountDetailsFormData) => {
        setAccountData(data);
        setCurrentStep('almost-done');
    };

    // Step 6 Final Submission -> Redirects to Dashboard
    const handleFinalDone = async () => {
        setIsSubmitting(true);

        try {
            showSuccessToast(
                "Registration Complete!",
                "Welcome to Kadamora Hospitality & Tours platform."
            );

            setTimeout(() => {
                navigate('/hospitality-tours/dashboard', { replace: true });
            }, 1000);
        } catch (err: any) {
            showErrorToast("Submission Error", err?.message || "Failed to complete setup.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full">
            {currentStep === 'user-details' && (
                <Step1UserDetails
                    initialData={userData}
                    onSubmit={handleStep1Submit}
                    loginUrl="/hospitality-tours/auth/login"
                />
            )}

            {currentStep === 'email-otp' && (
                <OTPVerification
                    title="Just One More Step !"
                    subtitle={`We've sent a 4-digit code to ${userData.email || 'your email'}. Enter it below to verify your account.`}
                    pinLength={4}
                    expiresInSeconds={60}
                    buttonText="Verify Now"
                    onVerify={handleOTPVerify}
                    onSuccessToastTitle="Account Verified!"
                    onSuccessToastMessage="Email verification successful."
                    nextUrlPattern={() => {
                        setCurrentStep('otp-success');
                        return '';
                    }}
                />
            )}

            {currentStep === 'otp-success' && (
                <Step3VerificationSuccess
                    onProceed={() => setCurrentStep('business-details')}
                />
            )}

            {currentStep === 'business-details' && (
                <Step4BusinessDetails
                    initialData={businessData}
                    onPrevious={() => setCurrentStep('otp-success')}
                    onNext={handleStep4Submit}
                />
            )}

            {currentStep === 'account-details' && (
                <Step5AccountDetails
                    initialData={accountData}
                    onPrevious={() => setCurrentStep('business-details')}
                    onSubmit={handleAccountSubmit}
                    isSubmitting={isSubmitting}
                />
            )}

            {currentStep === 'almost-done' && (
                <Step6AlmostDone
                    userData={userData}
                    businessData={businessData}
                    accountData={accountData}
                    onPrevious={() => setCurrentStep('account-details')}
                    onDone={handleFinalDone}
                    isSubmitting={isSubmitting}
                />
            )}
        </div>
    );
}
