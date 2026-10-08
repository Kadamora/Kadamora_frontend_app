import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAcceptInvitationMutation } from '@store/api/tenant.api';
import toast from 'react-hot-toast';

const VerifyTenantAcceptance = () => {
    const { tenantId } = useParams();
    const navigate = useNavigate();
    const [acceptInvitation] = useAcceptInvitationMutation();
    const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const verify = async () => {
            if (!tenantId) {
                setStatus('error');
                setErrorMessage('Invalid invitation link.');
                return;
            }
            try {
                await acceptInvitation(tenantId).unwrap();
                setStatus('success');
                toast.success('Invitation accepted successfully!');
                // Automatically redirect to home/login after a delay
                setTimeout(() => {
                    navigate('/auth/login');
                }, 3000);
            } catch (error: any) {
                setStatus('error');
                setErrorMessage(error?.data?.message || 'Failed to accept invitation. The link may have expired or is invalid.');
                toast.error(error?.data?.message || 'Failed to accept invitation.');
            }
        };

        verify();
    }, [tenantId, acceptInvitation, navigate]);

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-4">
            <div className="bg-white p-8 rounded-2xl shadow-sm text-center max-w-md w-full">
                {status === 'verifying' && (
                    <>
                        <div className="w-16 h-16 border-4 border-[#002E62] border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
                        <h2 className="text-2xl font-semibold text-[#0F172A] mb-2">Verifying Invitation</h2>
                        <p className="text-[#64748B]">Please wait while we verify your acceptance...</p>
                    </>
                )}
                {status === 'success' && (
                    <>
                        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-semibold text-[#0F172A] mb-2">Invitation Accepted!</h2>
                        <p className="text-[#64748B] mb-6">You have successfully accepted the tenant invitation.</p>
                        <button
                            onClick={() => navigate('/auth/login')}
                            className="w-full py-3 px-4 bg-[#002E62] text-white rounded-xl font-medium hover:bg-[#002E62]/90 transition-colors"
                        >
                            Go to Login
                        </button>
                    </>
                )}
                {status === 'error' && (
                    <>
                        <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-semibold text-[#0F172A] mb-2">Verification Failed</h2>
                        <p className="text-[#64748B] mb-6">{errorMessage}</p>
                        <button
                            onClick={() => navigate('/')}
                            className="w-full py-3 px-4 bg-[#F1F5F9] text-[#0F172A] rounded-xl font-medium hover:bg-[#E2E8F0] transition-colors"
                        >
                            Return to Home
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default VerifyTenantAcceptance;
