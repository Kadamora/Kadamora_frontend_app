import ForgotPassword from '@shared/pages/auth/ForgotPassword';

export default function HTForgotPasswordPage() {
    return (
        <ForgotPassword
            title="Forget Password"
            subtitle="Enter your email to receive password reset instructions for your Hospitality & Tours account."
            loginUrl="/hospitality-tours/auth/login"
            verifyUrl="/hospitality-tours/auth/forgot-password/verify"
            onSuccessToastTitle="Reset Email Sent"
            onSuccessToastMessage="Password reset instructions have been sent to your email."
        />
    );
}
