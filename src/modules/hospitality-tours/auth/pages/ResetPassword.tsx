import ResetPassword from '@shared/pages/auth/ResetPassword';

export default function HTResetPasswordPage() {
    return (
        <ResetPassword
            title="Reset Password"
            subtitle="Please enter your new password below to update your Hospitality & Tours account credentials."
            buttonText="Save"
            loginUrl="/hospitality-tours/auth/login"
        />
    );
}
