import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useVerifySubscriptionQuery } from '@store/api/subscription.api';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';

export default function VerifySubscription() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const reference = searchParams.get('reference') || '';
    
    const {  error, isLoading, isSuccess, isError } = useVerifySubscriptionQuery(
        { reference },
        { skip: !reference } // only fetch if reference exists
    );

    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (!reference) {
            setStatus('error');
            setErrorMessage('No payment reference found in URL.');
            return;
        }

        if (isLoading) {
            setStatus('loading');
        } else if (isSuccess) {
            setStatus('success');
            // Redirect after a short delay
            const timer = setTimeout(() => {
                navigate('/dashboard/subscription', { replace: true });
            }, 3000);
            return () => clearTimeout(timer);
        } else if (isError) {
            setStatus('error');
            const err = error as any;
            setErrorMessage(err?.data?.message || err?.message || 'Verification failed. Please contact support.');
        }
    }, [reference, isLoading, isSuccess, isError, error, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl text-center">
                {status === 'loading' && (
                    <div className="space-y-4 animate-fade-in">
                        <Loader2 className="w-16 h-16 mx-auto text-[var(--color-primary)] animate-spin" />
                        <h2 className="text-xl font-semibold text-gray-900">Verifying Payment...</h2>
                        <p className="text-gray-500">Please wait while we confirm your subscription payment.</p>
                    </div>
                )}

                {status === 'success' && (
                    <div className="space-y-4 animate-fade-in">
                        <CheckCircle2 className="w-16 h-16 mx-auto text-green-500" />
                        <h2 className="text-xl font-semibold text-gray-900">Payment Successful!</h2>
                        <p className="text-gray-500">Your subscription has been activated successfully. Redirecting you to the subscription page...</p>
                        <button 
                            onClick={() => navigate('/dashboard/subscription', { replace: true })}
                            className="mt-6 w-full py-2.5 bg-[var(--color-secondary)] text-white rounded-lg font-medium hover:opacity-90 transition-colors"
                        >
                            Return to Dashboard
                        </button>
                    </div>
                )}

                {status === 'error' && (
                    <div className="space-y-4 animate-fade-in">
                        <XCircle className="w-16 h-16 mx-auto text-red-500" />
                        <h2 className="text-xl font-semibold text-gray-900">Verification Failed</h2>
                        <p className="text-gray-500">{errorMessage}</p>
                        <button 
                            onClick={() => navigate('/dashboard/subscription', { replace: true })}
                            className="mt-6 w-full py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                        >
                            Back to Subscription Page
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
