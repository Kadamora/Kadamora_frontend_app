import React, { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface DeclineReasonPromptProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (reason: string) => void;
  isLoading?: boolean;
}

const modalRoot = document.getElementById('modal-root')!;

const DeclineReasonPrompt: React.FC<DeclineReasonPromptProps> = ({
  open,
  onClose,
  onSubmit,
  isLoading = false,
}) => {
  const [mounted, setMounted] = useState(false);
  const [reason, setReason] = useState("");

  useEffect(() => {
    if (open) {
      const t = requestAnimationFrame(() => setMounted(true));
      return () => cancelAnimationFrame(t);
    } else {
      setMounted(false);
      setReason(""); // Reset reason when closed
    }
  }, [open]);

  const handleSubmit = useCallback(() => {
    if (reason.trim()) {
      onSubmit(reason);
    }
  }, [reason, onSubmit]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#101828]/50 blur-[2px]"
        onClick={onClose}
      />

      {/* Modal */}
      <div className={`relative z-10 w-full max-w-md bg-white rounded-2xl shadow-xl px-6 py-6 flex flex-col transition-all duration-300 ${
            mounted ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}>
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
            <div className="flex items-center gap-2">
                <h3 className="text-[18px] font-semibold text-[#002A54]">
                    Decline Reason
                </h3>
                <div className="group relative flex items-center justify-center">
                     <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-400 cursor-help">
                        <path d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M8 8V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M8 5H8.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        Please provide a reason for declining this agent.
                    </div>
                </div>
            </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="mb-6">
            <label className="block text-[13px] font-semibold text-[#002A54] mb-2">
                Decline Reason
            </label>
            <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full h-32 px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#002A54]/20 focus:border-[#002A54] resize-none transition-all"
                placeholder="Type reason here..."
            />
        </div>

        {/* Footer */}
        <div className="flex justify-start">
            <button
            onClick={handleSubmit}
            disabled={!reason.trim() || isLoading}
            className="bg-[#002A54] hover:bg-[#013463] text-white text-[14px] font-medium rounded-lg px-6 py-2.5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
            {isLoading ? (
                <>
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                </>
            ) : (
                "Send"
            )}
            </button>
        </div>
      </div>
    </div>,
    modalRoot
  );
};

export default DeclineReasonPrompt;
