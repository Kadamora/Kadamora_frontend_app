import OTPVerification from '@shared/components/Auth/OTPVerification';
import { useRequestPasswordResetMutation } from '@shared/api/auth.api';

export default function ForgotPasswordVerify() {
    const [triggerPasswordReset] = useRequestPasswordResetMutation();

    const handleResend = async () => {
        const email = sessionStorage.getItem('resetEmail') || '';
        if (!email) throw new Error('No email found in session. Please restart password reset.');
        return await triggerPasswordReset({ email }).unwrap();
    };

    return (
        <OTPVerification
            title="Forget Password"
            subtitle="Enter the six digit pin we sent to your email to proceed with setting a new password."
            pinLength={6}
            expiresInSeconds={60}
            buttonText="Continue"
            onResend={handleResend}
            nextUrlPattern={(code) => `/auth/reset-password/${code}`}
            onSuccessToastTitle="PIN Verified"
            onSuccessToastMessage="You may now proceed to set a new password."
        />
    );
}
