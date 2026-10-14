import { useMemo, useCallback } from 'react';
import { useGetAgentProfileQuery, type AgentProfile } from '@modules/real-estate/api/propertyAgent.api';

export function useAgentStatus() {
    const {
        data: profileResponse,
        isLoading,
        isFetching,
        isError,
        error,
        refetch,
    } = useGetAgentProfileQuery();

    // Backend responses may wrap the profile in .data or return it directly
    const agentProfile: AgentProfile | null = useMemo(() => {
        if (!profileResponse) return null;
        return (profileResponse as any).data || profileResponse;
    }, [profileResponse]);

    const isNotFound = useMemo(() => {
        return (
            isError &&
            typeof error === 'object' &&
            error !== null &&
            'status' in error &&
            (error as any).status === 404
        );
    }, [isError, error]);

    const normalizedStatus = useMemo(() => {
        const raw = agentProfile?.status || agentProfile?.verificationStatus;
        if (!raw || typeof raw !== 'string') return null;
        return raw.trim().toLowerCase();
    }, [agentProfile?.status, agentProfile?.verificationStatus]);

    const hasUploadedDocs = useMemo(() => {
        if (!agentProfile?.documents) return false;
        const docs = agentProfile.documents as any;
        const hasGovId = Array.isArray(docs.governmentId) && docs.governmentId.length > 0;
        const hasBizCert = Array.isArray(docs.businessCertificate) && docs.businessCertificate.length > 0;
        const hasProof = Array.isArray(docs.proofOfAddress || docs.proofOdAddress) && (docs.proofOfAddress || docs.proofOdAddress).length > 0;
        return Boolean(hasGovId || hasBizCert || hasProof);
    }, [agentProfile?.documents]);

    const isApproved = useMemo(() => {
        if (!agentProfile) return false;
        if (agentProfile.isVerified === true) return true;
        if (normalizedStatus === 'approved') return true;
        return false;
    }, [agentProfile, normalizedStatus]);

    const isUnderReview = normalizedStatus === 'under_review';
    const isPending = normalizedStatus === 'pending';
    const isRejected = normalizedStatus === 'rejected';
    const isSuspended = normalizedStatus === 'suspended';
    const isUnregistered = isNotFound || (!isLoading && !agentProfile);

    // Human-friendly explanation for UI banners and tooltips
    const explanation = useMemo(() => {
        if (isLoading) return 'Checking agent verification status...';
        if (isApproved) return null;
        if (isUnderReview) {
            return 'Your agent account is not yet verified. Please wait for admin approval.';
        }
        if (isPending) {
            if (hasUploadedDocs) {
                return 'Your agent account is not yet verified. Please wait for admin approval.';
            }
            return 'Your agent account is pending verification. Please upload required documents to get approved.';
        }
        if (isRejected) {
            return agentProfile?.rejectionReason
                ? `Your verification was rejected: ${agentProfile.rejectionReason}. Please re-upload documents.`
                : 'Your agent verification was rejected. Please re-upload your verification documents.';
        }
        if (isSuspended) {
            return 'Your agent account is suspended. Please contact support.';
        }
        return 'Only verified agents can perform this action. Complete your agent verification to proceed.';
    }, [isLoading, isApproved, isUnderReview, isPending, hasUploadedDocs, isRejected, isSuspended, agentProfile?.rejectionReason]);

    const determineOnboardingEntryStep = useCallback((): number => {
        if (!agentProfile) return 0;
        if (isApproved) return 0;
        if (isUnderReview || (isPending && hasUploadedDocs)) return 0;

        const hasProfessionalDetails = Boolean(
            agentProfile.agencyCompanyName &&
            agentProfile.position &&
            agentProfile.registrationLicenseNumber
        );
        if (!hasProfessionalDetails) return 1;
        if (!hasUploadedDocs) return 2;
        return 0;
    }, [agentProfile, isApproved, isUnderReview, isPending, hasUploadedDocs]);

    return {
        agentProfile,
        isLoading,
        isFetching,
        isError,
        error,
        isApproved,
        isUnderReview,
        isPending,
        isRejected,
        isSuspended,
        isUnregistered,
        hasUploadedDocs,
        explanation,
        determineOnboardingEntryStep,
        refetch,
    };
}
