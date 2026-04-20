import React, { useEffect } from 'react';
import StatusTag, { type DocStatus } from '../StatusTag';
import { Download, FileText, Calendar, Tag, Building2, Link2 } from 'lucide-react';

interface DocumentItem {
    id: string;
    sn: string;
    name: string;
    category: string;
    related: string;
    date: string;
    status: string;
    fileUrl: string;
    property: string;
}

interface DocumentDetailsPanelProps {
    isOpen: boolean;
    onClose: () => void;
    document?: DocumentItem;
    onDownload?: (doc: DocumentItem) => void;
}

const DocumentDetailsPanel: React.FC<DocumentDetailsPanelProps> = ({ isOpen, onClose, document, onDownload }) => {
    // Lock body scroll when open
    useEffect(() => {
        if (isOpen) {
            const original = window.document.body.style.overflow;
            window.document.body.style.overflow = 'hidden';
            return () => {
                window.document.body.style.overflow = original;
            };
        }
    }, [isOpen]);

    // Close on Escape key
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [isOpen, onClose]);

    if (!isOpen || !document) return null;

    const isPdf = document.fileUrl?.toLowerCase().includes('.pdf') ||
                  document.fileUrl?.toLowerCase().includes('/pdf');
    const isImage = /\.(png|jpe?g|gif|webp|svg)(\?|$)/i.test(document.fileUrl ?? '');

    return (
        <div className="fixed inset-0 z-50 flex items-stretch justify-end">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"
                onClick={onClose}
            />

            {/* Slide panel */}
            <div className="relative w-full sm:max-w-[500px] xl:max-w-[580px] h-full bg-white overflow-auto shadow-2xl animate-fade-slide-in-right">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 sticky top-0 bg-white z-10 border-b border-[#CCE3FD]">
                    <h3 className="text-lg font-semibold text-[#0A2D50]">Document Details</h3>
                    <button
                        title="Close"
                        aria-label="Close details panel"
                        className="w-8 h-8 rounded-full border border-[#D4D4D8] flex items-center justify-center hover:bg-gray-100 transition-colors"
                        onClick={onClose}
                    >
                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <line x1="6" y1="6" x2="18" y2="18" strokeWidth="2" strokeLinecap="round" />
                            <line x1="6" y1="18" x2="18" y2="6" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 flex flex-col gap-6">

                    {/* Preview Area */}
                    <div className="w-full rounded-xl overflow-hidden border border-[#E8F0F6] bg-[#F8FCFF] min-h-[200px] flex items-center justify-center">
                        {isImage ? (
                            <img
                                src={document.fileUrl}
                                alt={document.name}
                                className="w-full max-h-[300px] object-contain rounded-xl"
                            />
                        ) : isPdf ? (
                            <iframe
                                src={document.fileUrl}
                                title={document.name}
                                className="w-full h-[320px] rounded-xl border-0"
                            />
                        ) : (
                            <div className="flex flex-col items-center gap-3 py-10 text-[#94A3B8]">
                                <FileText className="w-16 h-16 text-[#CBD5E1]" />
                                <span className="text-[14px]">No preview available</span>
                            </div>
                        )}
                    </div>

                    {/* Document Name & Status */}
                    <div className="flex items-start justify-between gap-4">
                        <h4 className="text-[20px] font-semibold text-[#0A2D50] leading-snug">{document.name}</h4>
                        <StatusTag status={document.status as DocStatus} />
                    </div>

                    {/* Meta Info */}
                    <div className="rounded-xl border border-[#E8F0F6] bg-[#F8FCFF] divide-y divide-[#EBF2F8]">
                        <div className="flex items-center gap-4 px-5 py-4">
                            <span className="w-9 h-9 rounded-full bg-[#E6F1FE] flex items-center justify-center flex-shrink-0">
                                <Tag className="w-4 h-4 text-[#0A66B2]" />
                            </span>
                            <div>
                                <div className="text-[12px] text-[#94A3B8]">Category</div>
                                <div className="text-[15px] font-medium text-[#0A2D50]">{document.category}</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 px-5 py-4">
                            <span className="w-9 h-9 rounded-full bg-[#E6F1FE] flex items-center justify-center flex-shrink-0">
                                <Building2 className="w-4 h-4 text-[#0A66B2]" />
                            </span>
                            <div>
                                <div className="text-[12px] text-[#94A3B8]">Property</div>
                                <div className="text-[15px] font-medium text-[#0A2D50]">{document.property}</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 px-5 py-4">
                            <span className="w-9 h-9 rounded-full bg-[#E6F1FE] flex items-center justify-center flex-shrink-0">
                                <Link2 className="w-4 h-4 text-[#0A66B2]" />
                            </span>
                            <div>
                                <div className="text-[12px] text-[#94A3B8]">Related To</div>
                                <div className="text-[15px] font-medium text-[#0A2D50]">{document.related}</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 px-5 py-4">
                            <span className="w-9 h-9 rounded-full bg-[#E6F1FE] flex items-center justify-center flex-shrink-0">
                                <Calendar className="w-4 h-4 text-[#0A66B2]" />
                            </span>
                            <div>
                                <div className="text-[12px] text-[#94A3B8]">Upload Date</div>
                                <div className="text-[15px] font-medium text-[#0A2D50]">{document.date}</div>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-2">
                        {onDownload && (
                            <button
                                onClick={() => onDownload(document)}
                                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#002E62] text-white font-semibold text-[14px] hover:bg-[#001f45] transition-colors"
                            >
                                <Download className="w-4 h-4" />
                                Download
                            </button>
                        )}
                        {document.fileUrl && (
                            <button
                                onClick={() => window.open(document.fileUrl, '_blank', 'noopener,noreferrer')}
                                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-[#CCE3FD] bg-[#F1F9FF] text-[#0A66B2] font-semibold text-[14px] hover:bg-[#E6F1FE] transition-colors"
                            >
                                <FileText className="w-4 h-4" />
                                Open in New Tab
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DocumentDetailsPanel;
