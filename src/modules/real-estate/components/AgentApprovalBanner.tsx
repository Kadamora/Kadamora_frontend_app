import React from 'react';
import { ShieldAlert, AlertCircle, Clock, UploadCloud } from 'lucide-react';

interface AgentApprovalBannerProps {
    explanation: string | null;
    isUnderReview?: boolean;
    isApproved?: boolean;
    onUploadDocs?: () => void;
    className?: string;
    compact?: boolean;
}

export const AgentApprovalBanner: React.FC<AgentApprovalBannerProps> = ({
    explanation,
    isUnderReview = false,
    isApproved = false,
    onUploadDocs,
    className = '',
    compact = false,
}) => {
    if (isApproved || !explanation) return null;

    if (compact) {
        return (
            <div
                className={`flex items-center justify-between gap-2 rounded-lg border px-3 py-2 text-xs ${
                    isUnderReview
                        ? 'border-blue-200 bg-blue-50 text-blue-900'
                        : 'border-amber-200 bg-amber-50 text-amber-900'
                } ${className}`}
            >
                <div className="flex items-center gap-1.5 min-w-0">
                    {isUnderReview ? (
                        <Clock className="h-4 w-4 shrink-0 text-blue-600" />
                    ) : (
                        <AlertCircle className="h-4 w-4 shrink-0 text-amber-600" />
                    )}
                    <span className="truncate">{explanation}</span>
                </div>
                {onUploadDocs && !isUnderReview && (
                    <button
                        type="button"
                        onClick={onUploadDocs}
                        className="inline-flex items-center gap-1 shrink-0 font-semibold underline hover:opacity-80 transition-opacity"
                    >
                        Upload Documents
                    </button>
                )}
            </div>
        );
    }

    return (
        <div
            className={`rounded-xl border p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                isUnderReview
                    ? 'border-blue-200 bg-[#F0F7FF] text-[#002E62]'
                    : 'border-amber-200 bg-[#FFFBEB] text-[#92400E]'
            } ${className}`}
        >
            <div className="flex items-start sm:items-center gap-3">
                <div
                    className={`p-2 rounded-lg shrink-0 ${
                        isUnderReview ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'
                    }`}
                >
                    {isUnderReview ? (
                        <Clock className="h-5 w-5" />
                    ) : (
                        <ShieldAlert className="h-5 w-5" />
                    )}
                </div>
                <div>
                    <h4 className="font-semibold text-sm leading-snug">
                        {isUnderReview
                            ? 'Verification Under Review'
                            : 'Agent Verification Required'}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-700 mt-0.5 leading-relaxed">
                        {explanation}
                    </p>
                </div>
            </div>

            {onUploadDocs && (
                <div className="shrink-0 flex items-center gap-2 self-start sm:self-center">
                    <button
                        type="button"
                        onClick={onUploadDocs}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-lg text-white bg-[#002E62] hover:bg-[#00244D] transition-colors shadow-sm"
                    >
                        <UploadCloud className="h-4 w-4" />
                        <span>Upload Documents</span>
                    </button>
                </div>
            )}
        </div>
    );
};

export default AgentApprovalBanner;
