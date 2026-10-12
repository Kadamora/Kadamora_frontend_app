import OTPVerification from '@shared/components/Auth/OTPVerification';

export default function ForgotPasswordVerify() {
    return (
        <OTPVerification
            title="Forget Password"
            subtitle="Enter the four digit pin we sent to your email to proceed with setting a new password."
            pinLength={4}
            expiresInSeconds={60}
            buttonText="Continue"
            nextUrlPattern={(code) => `/auth/reset-password/${code}`}
            onSuccessToastTitle="PIN Verified"
            onSuccessToastMessage="You may now proceed to set a new password."
        />
    );
}
