import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import ProfessionalDetails from './ProfessionalDetails';
import LegalDocs from './LegalDocs';
import { useApproveAgentMutation, useRejectAgentMutation } from '@store/api/admin.api';
import SuccessPrompt from './SuccessPrompt';
import { useGetAdminAgentByIdQuery } from '@store/api/admin.api';
import ProfessionalDetailsSkeleton from './ProfessionalDetailsSkeleton';
import DeclineReasonPrompt from './DeclineReasonPrompt';

// interface Documents {
//   id: string;
//   governmentId: string[];
//   businessCertificate: string[];
//   proofOfAddress: string[];
//   status: 'uploaded' | 'verified' | 'rejected';
//   rejectionReason: string | null;
//   reviewedAt: string | null;
//   uploadedAt: string;
// }

// interface AgentDetails {
//   id: string;
//   companyName: string;
//   position: string;
//   location: string;
//   registrationNumber: string;
//   yearsOfExperience: number;
//   website: string;
//   bio: string;
//   email: string;
//   phone: string;
//   registrationDate: string;
//   status: 'pending' | 'verified' | 'rejected';
//   documents: Documents | null;
// }

const NewAgentDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [renderedStep, setRenderedStep] = useState(step);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showDeclinePrompt, setShowDeclinePrompt] = useState(false);
  const prevStepRef = useRef(step);
  const direction = step > prevStepRef.current ? 'forward' : 'back';

  const [approveAgent, { isLoading: isApproving }] = useApproveAgentMutation();
  const [rejectAgent, { isLoading: isRejecting }] = useRejectAgentMutation();

  const {
  data: agent,
  isLoading,
  isError,
  refetch,
} = useGetAdminAgentByIdQuery(id!, {
  skip: !id,
});
  // Handle step transitions with animation
  useEffect(() => {
    if (step === renderedStep) return;
    const timeout = setTimeout(() => {
      setRenderedStep(step);
      prevStepRef.current = step;
    }, 280);
    return () => clearTimeout(timeout);
  }, [step, renderedStep]);

  const handleClose = useCallback(() => {
    navigate('/admin/agents');
  }, [navigate]);

  const handleNext = useCallback(() => {
    setStep(prev => Math.min(prev + 1, 2)); 
  }, []);

  const handlePrev = useCallback(() => {
    setStep(prev => Math.max(prev - 1, 1)); 
  }, []);

  const handleApprove = useCallback(async () => {
    if(!id) return

    try{
      await approveAgent(id).unwrap()
      refetch()
      if(step === 1){
        setShowSuccess(true)
      }else if(step === 2){
        setShowSuccess(true)
      }
    }catch(err: any){
      console.log("Error approving agent", err)
    }
  }, [id, step, approveAgent, refetch]);

  const handleDecline = useCallback(() => {
    setShowDeclinePrompt(true);
  }, []);

  // const handleConfirmDecline = useCallback(async (rejectionReason: string) => {
  //   if(!id) return

  //   try{
  //     await rejectAgent({ agentId: id, rejectionReason }).unwrap()
  //     refetch()
  //     setShowDeclinePrompt(false)
  //     navigate('/admin/agents')
  //   }catch(err: any){
  //     console.log("Error rejecting agent", err)
  //   }
  // }, [navigate, id, rejectAgent, refetch]);

  const handleConfirmDecline = async (reason: string) => {
  if (!id || typeof id !== "string") return;

  console.log({
  agentId: id,
  rejectionReason: reason,
  agentIdType: typeof id,
});
  await rejectAgent({
    agentId: id,
    rejectionReason: reason,
  }).unwrap();
};

  const handleSuccessDone = useCallback(() => {
    setShowSuccess(false)
    if(step === 1){
      setStep(2)
    }else if(step === 2){
      navigate('/admin/agents')
    }
  }, [step, navigate])


  if (isLoading) {
  return (
    <ProfessionalDetailsSkeleton />
  );
}

  if (!agent || isError) {
    return (
      <div className="p-6">
        <div className="bg-white rounded-2xl border border-[#E4E7EC] p-8 text-center">
          <h2 className="text-xl font-semibold text-secondary">Agent not found</h2>
          <p className="text-gray-500 mt-2">The agent you're looking for doesn't exist.</p>
          {/* <button
            onClick={() => navigate('/admin/agents')}
            className="mt-4 px-4 py-2 bg-secondary text-white rounded-lg hover:opacity-90 transition"
          >
            Back to Agents
          </button> */}
          <div className="flex gap-3 justify-center mt-4">
          <button
            onClick={() => refetch()}
            className="px-4 py-2 border rounded-lg"
          >
            Retry
          </button>
          <button
            onClick={() => navigate('/admin/agents')}
            className="px-4 py-2 bg-secondary text-white rounded-lg hover:opacity-90 transition"
          >
            Back to Agents
          </button>
        </div>
        </div>
      </div>
    );
  }

  const StepNode = () => {
    const commonProps = {
      onClose: handleClose,
      onApprove: handleApprove,
      onDecline: handleDecline,
      isApproving,
      isRejecting,
    };
    switch (renderedStep) {
      case 1:
        return <ProfessionalDetails {...commonProps} agent={agent?.data} current={1} onNext={handleNext} />;
      case 2:
        return  agent?.data?.documents ? (
        <LegalDocs
          documents={agent?.data?.documents}
          current={2}
          onPrev={handlePrev}
          onClose={handleClose}
          onApprove={handleApprove}
          onDecline={handleDecline}
        />
      ) : null;
      default:
        return null;
    }
  };

  return (
    <div className="flex items-center justify-center px-4">
      <style>{`
                @keyframes stepInFwd {0%{opacity:0;transform:translateY(16px) scale(.96);}100%{opacity:1;transform:translateY(0) scale(1);} }
                @keyframes stepOutFwd {0%{opacity:1;transform:translateY(0) scale(1);}100%{opacity:0;transform:translateY(-12px) scale(.97);} }
                @keyframes stepInBack {0%{opacity:0;transform:translateY(-16px) scale(.96);}100%{opacity:1;transform:translateY(0) scale(1);} }
                @keyframes stepOutBack {0%{opacity:1;transform:translateY(0) scale(1);}100%{opacity:0;transform:translateY(12px) scale(.97);} }
            `}</style>
      <div
        key={renderedStep}
        className={`relative w-full max-w-[100vw] flex justify-center will-change-transform animate-[${direction === 'forward' ? 'stepInFwd' : 'stepInBack'}_.28s_cubic-bezier(.4,0,.2,1)]`}
      >
        <StepNode />
      </div>
      {/* {showSuccess && ( */}
          <SuccessPrompt done={handleSuccessDone} open={showSuccess} onClose={handleClose} />
      {/* )} */}
      <DeclineReasonPrompt 
        open={showDeclinePrompt} 
        onClose={() => setShowDeclinePrompt(false)} 
        onSubmit={handleConfirmDecline}
        isLoading={isRejecting}
      />
    </div>
  );
};

export default NewAgentDetailsPage;