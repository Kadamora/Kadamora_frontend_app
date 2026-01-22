import React, { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface SuccessPromptProps {
  open: boolean;
  onClose: () => void;
  done: () => void;
}

const modalRoot = document.getElementById('modal-root')!
const SuccessPrompt: React.FC<SuccessPromptProps> = ({
  open,
  onClose,
  done,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (open) {
      const t = requestAnimationFrame(() => setMounted(true));
      return () => cancelAnimationFrame(t);
    } else {
      setMounted(false);
    }
  }, [open]);

  const handleDone = useCallback(() => {
    done();
  }, [done]);

  if (!open) return null;

  return createPortal (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#101828]/50 blur-[2px]"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-xl px-10 py-12 text-center flex flex-col items-center justify-center">
        <div
          className={`mx-auto mb-8 h-24 w-24 relative flex items-center justify-center rounded-full bg-[#E6F9F0] transition-all duration-500 ease-out ${
            mounted ? "opacity-100 scale-100" : "opacity-0 scale-75"
          }`}
        >
          {/* Ripple layers */}
          <span className="absolute inset-0 rounded-full bg-[#16A34A]/20 animate-ping" />
          <span className="absolute inset-0 rounded-full bg-[#16A34A]/10 animate-ping delay-200" />

          <img
            src="/assets/icons/success.svg"
            alt="Success icon"
            className={`h-24 w-24 relative z-10 drop-shadow-sm transition-transform duration-700 ease-out ${
              mounted ? "scale-100" : "scale-50"
            }`}
          />
        </div>

        <h3 className="text-[18px] font-semibold text-[#001731] mb-3">
          Approved Successfully!
        </h3>

        <p className="leading-relaxed text-[#595959] w-full mx-auto mb-8">
          Your details have been successfully approved.
        </p>

        <button
          onClick={handleDone}
          className="bg-[#002A54] hover:bg-[#013463] text-white w-37.5 text-[13px] font-semibold rounded-md px-8 py-3 inline-flex align-center"
        >
          Done
        </button>
      </div>
    </div>,
    modalRoot
  );
};

export default SuccessPrompt;
