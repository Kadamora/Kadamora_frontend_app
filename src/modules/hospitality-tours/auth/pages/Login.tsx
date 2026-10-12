import Login from '@shared/pages/auth/Login';

export default function HTLoginPage() {
    return (
        <Login
            title="Welcome back!"
            subtitle="Sign in to Kadamora by entering your details below or continue with Google."
            forgotPasswordUrl="/hospitality-tours/auth/forgot-password"
            signupUrl="/hospitality-tours/auth/signup"
            defaultRedirectPath="/hospitality-tours/dashboard"
            onSuccessToastTitle="Logged In Successfully"
            onSuccessToastMessage="Welcome to Kadamora Hospitality & Tours"
        />
    );
}
