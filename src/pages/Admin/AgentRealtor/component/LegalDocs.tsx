import CloseButton from '@pages/Dashboard/PropertyListing/Home/components/OnboardingAgent/components/CloseButton';
import React, { useState } from 'react';
import StepProgress from './StepProgress';
import DocumentPreviewModal from './DocumentPreviewModal';

interface Documents {
  id: string;
  governmentId: string[];
  businessCertificate: string[];
  proofOfAddress: string[];
  status: 'uploaded' | 'verified' | 'rejected';
  rejectionReason: string | null;
  reviewedAt: string | null;
  uploadedAt: string;
}

interface LegalDocsProps {
  documents: Documents;
  current: number;
  onClose: () => void;
  onApprove: () => void;
  onDecline: () => void;
  onPrev?: () => void;
}

const LegalDocs: React.FC<LegalDocsProps> = ({
  documents,
  current,
  onClose,
  onApprove,
  onDecline,
}) => {
    const [previewOpen, setPreviewOpen] = useState(false);
const [previewImage, setPreviewImage] = useState<string | null>(null);
const [previewTitle, setPreviewTitle] = useState('');
const openPreview = (url: string, title: string) => {
  setPreviewImage(url);
  setPreviewTitle(title);
  setPreviewOpen(true);
};
  // Check if documents are empty or null
  const hasDocuments = documents ;
   console.log('Documents:', documents);
  console.log('Has documents:', hasDocuments);

  if (!hasDocuments) {
    return (
      <div className="w-full overflow-hidden flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="hidden md:block p-8">
          <StepProgress current={current} />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col bg-white border border-[#EDF1F5] rounded-md">
          {/* Header */}
          <div className="h-16 flex items-center justify-between px-8 border-b border-[#EDF1F5]">
            <h3 className="font-semibold text-secondary">Verification And Legal Documents</h3>
            <CloseButton onClick={onClose} />
          </div>

          {/* Mobile Header */}
          <div className="md:hidden p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-secondary">Verification And Legal Documents</h3>
              <span className="text-sm text-[#64748B] font-medium">{current}/2</span>
            </div>
          </div>

          {/* Empty State Content */}
          <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
            <div className="w-24 h-24 mb-6 flex items-center justify-center rounded-full bg-gray-50">
              <svg 
                className="w-12 h-12 text-gray-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                />
              </svg>
            </div>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No Documents Uploaded
            </h3>
            
            <p className="text-gray-500 max-w-md mb-8">
              This agent has not uploaded any verification or legal documents yet. 
              They need to upload required documents for verification.
            </p>

            {/* Requirements List */}
            <div className="w-full max-w-md bg-gray-50 rounded-lg p-6 mb-8 text-left">
              <h4 className="font-medium text-gray-700 mb-3">Required Documents:</h4>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-gray-400 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm text-gray-600">Government Issued ID</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-gray-400 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm text-gray-600">Business Certificate</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-gray-400 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm text-gray-600">Proof of Address/Utility Bill</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="w-full overflow-hidden flex flex-col md:flex-row">
            {/* Sidebar */}
            <div className="hidden md:block p-8">
                <StepProgress current={current} />
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col bg-white border border-[#EDF1F5] rounded-md">
                {/* Header */}
                <div className="h-16 flex items-center justify-between px-8 border-b border-[#EDF1F5]">
                    <h3 className="font-semibold text-secondary">Verification And Legal Documents</h3>
                    <CloseButton onClick={onClose} />
                </div>

                {/* Mobile Header */}
                <div className="md:hidden p-6 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-secondary">Verification And Legal Documents</h3>
                        <span className="text-sm text-[#64748B] font-medium">{current}/2</span>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col justify-between p-6 overflow-y-auto min-h-[calc(90vh-200px)]">
                    {/* Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Left Column */}
                        <div className="space-y-6">
                            <div>
                                <div className="text-[13px] leading-[1.55] tracking-[0.2px] text-[#3F3F46]">
                                    <span>Government Issued ID</span>
                                </div>
                                <p className=" font-semibold text-secondary my-1">Uploaded_GovernmentIssuedID.pdf</p>
                                <button
                                    onClick={() => openPreview(documents.governmentId[0], 'Government Issued ID')}
                                    className="text-blue-500 underline"
                                    aria-label="Documentpreview "
                                >
                                    View
                                </button>
                            </div>

                            <div>
                                <div className="text-[13px] leading-[1.55] tracking-[0.2px] text-[#3F3F46] ">
                                    <span>Proof Of Address/Utility Bill</span>
                                </div>
                                <p className=" font-semibold text-secondary my-1">
                                    Uploaded_ProofOfAddress.pdf
                                </p>
                                <button
                                    onClick={() => openPreview(documents.proofOfAddress[0], 'Proof Of Address/Utility Bill')}
                                    className="text-blue-500 underline"
                                >
                                    View
                                </button>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-6">
                            <div>
                                <div className="text-[13px] leading-[1.55] tracking-[0.2px] text-[#3F3F46] ">
                                    <span>Business Certificate</span>
                                </div>
                                <p className=" font-semibold text-secondary my-1">Uploaded_BusinessCertificate.pdf</p>
                                <button
                                    onClick={() => openPreview(documents.businessCertificate[0], 'Business Certificate')}
                                    className="text-blue-500 underline"
                                >
                                    View
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-8 pt-8 flex justify-start gap-4">
                        <button
                            onClick={onApprove}
                            className="flex items-center justify-center gap-2 px-4 py-2 bg-[#0073F1] text-[14px] text-white rounded-lg font-medium hover:bg-[#0073F1]/80 transition"
                        >
                            Approve
                        </button>

                        <button
                            onClick={onDecline}
                            className="flex items-center justify-center gap-2 px-4 py-2 text-white text-[14px] rounded-lg font-medium bg-[#F21B60] hover:bg-[#F21B60]/80 transition"
                        >
                            Decline
                        </button>
                    </div>
                </div>
            </div>
            <DocumentPreviewModal 
                open={previewOpen} 
                imageUrl={previewImage} 
                title={previewTitle} 
                onClose={() => setPreviewOpen(false)}
            />
        </div>
  );
};

export default LegalDocs;