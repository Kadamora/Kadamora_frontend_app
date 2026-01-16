import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { FaTimes } from 'react-icons/fa';

interface DocumentPreviewModalProps {
  open: boolean;
  imageUrl: string | null;
  title: string;
  onClose: () => void;
}

const modalRoot = document.getElementById('modal-root')!
const DocumentPreviewModal: React.FC<DocumentPreviewModalProps> = ({
  open,
  imageUrl,
  title,
  onClose,
}) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  // Lock body scroll + ESC handling
  useEffect(() => {
    if (!open) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', onKey);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  if (!open || !imageUrl) return null;

  return createPortal (
    <div className={`fixed inset-0 z-50 h-[100vh] ${open ? "" : "pointer-events-none"}`} role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-[#101828] transition-opacity duration-300 ${
          open ? "opacity-40" : "opacity-0"
        }`}
      />

      {/* Modal */}
        <aside
          ref={modalRef}
            className={`absolute right-0 top-0 flex h-full w-full max-w-160 flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`} 
        role="dialog"
        aria-modal="true"
        aria-label="Documentpreview"
         >
          {/* Header */}
          <header className="flex items-center justify-between px-6 py-4 border-b border-[#E4E7EC]">
            <h3 className="text-[16px] font-medium text-[#111827]">
              {title}
            </h3>
            <button
              onClick={onClose}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full hover:bg-[#F2F4F7] text-[#667085] focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
              aria-label="Close preview"
            >
              <FaTimes size={14} />
            </button>
          </header>

          {/* Image */}
          <div className="p-6 flex items-center justify-center bg-[#F9FAFB]">
            <img
              src={imageUrl}
              alt={title}
              className="max-h-[70vh] w-auto rounded-md object-contain"
            />
          </div>
        </aside>
    </div>,
    modalRoot
  );
};

export default DocumentPreviewModal;
