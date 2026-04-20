import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import CardMenuItem from '../../../../components/cards/card/CardMenuItem';
import DeleteConfirmationModal from '../../../../components/cards/card/DeleteConfirmationModal';
import { Eye, Download } from 'lucide-react';

import StatusTag from './StatusTag';
import Input from '@components/forms/Input';
import Select from '@components/forms/Select';
import Table, { type TableHeader } from '@components/ui/Table/Table';
import { useGetAllDocumentsQuery } from '@store/api/propertyMgt.api';
import DocumentDetailsPanel from './components/DocumentDetailsPanel';

const TableSkeleton = () => (
    <div className="animate-pulse w-full mt-4">
        <div className="h-12 bg-gray-100 rounded-t-xl border-b border-gray-200 w-full mb-2" />
        {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center justify-between py-4 px-2 border-b border-gray-50">
                <div className="flex items-center gap-3 w-1/3">
                    <div className="h-8 w-8 bg-gray-200 rounded" />
                    <div className="h-4 bg-gray-200 rounded w-2/3" />
                </div>
                <div className="h-4 bg-gray-100 rounded w-1/6" />
                <div className="h-4 bg-gray-100 rounded w-1/6" />
                <div className="h-6 bg-gray-200 rounded-full w-16" />
            </div>
        ))}
    </div>
);

// Map the API response to a flat display shape
function mapDocument(doc: any, idx: number) {
    return {
        id: doc.id,
        sn: String(idx + 1).padStart(2, '0'),
        name: doc.title,
        category: doc.category,
        related: doc.relatedToLabel || (doc.property?.name ?? '—'),
        date: doc.uploadDate
            ? new Date(doc.uploadDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
            : new Date(doc.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
        status: doc.status,
        fileUrl: doc.fileUrl,
        property: doc.property?.name ?? '—',
    };
}

const DocumentPage: React.FC = () => {
    const [category, setCategory] = useState('');
    const [status, setStatus] = useState('');
    const [search, setSearch] = useState('');

    const [openMenuFor, setOpenMenuFor] = useState<any>(null);
    const [menuPos, setMenuPos] = useState({ top: 0, right: 0 });
    const menuRef = useRef<HTMLDivElement | null>(null);

    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [selectedDoc, setSelectedDoc] = useState<any>(null);
    // const [ setDeleteCandidate] = useState<string | null>(null);

    const { data: allDocumentsData, isLoading } = useGetAllDocumentsQuery();
    const rawDocuments: any[] = allDocumentsData?.data || [];
    const documents = rawDocuments.map(mapDocument);

    // close menu on outside click / Escape
    useEffect(() => {
        if (!openMenuFor) return;

        const handleOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setOpenMenuFor(null);
            }
        };

        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setOpenMenuFor(null);
        };

        window.addEventListener('mousedown', handleOutside);
        window.addEventListener('keydown', handleKey);
        return () => {
            window.removeEventListener('mousedown', handleOutside);
            window.removeEventListener('keydown', handleKey);
        };
    }, [openMenuFor]);

    const handleConfirmDelete = () => {
        setShowDeleteConfirm(false);
        // setDeleteCandidate(null);
    };

    // View: open slide-in details panel
    const handleView = (doc: any) => {
        setSelectedDoc(doc);
        setOpenMenuFor(null);
    };

    // Download: trigger browser download
    const handleDownload = async (doc: any) => {
        if (!doc.fileUrl) return;
        setOpenMenuFor(null);

        // If it's a Cloudinary URL, we can use the fl_attachment flag to force download
        if (doc.fileUrl.includes('cloudinary.com')) {
            const parts = doc.fileUrl.split('/upload/');
            if (parts.length === 2) {
                const downloadUrl = `${parts[0]}/upload/fl_attachment/${parts[1]}`;
                window.open(downloadUrl, '_blank');
                return;
            }
        }

        // Fallback or generic download via blob
        try {
            const response = await fetch(doc.fileUrl);
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            const ext = doc.fileUrl.split('.').pop()?.split('?')[0] || 'file';
            a.download = `${doc.name}.${ext}`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Download failed:', error);
            window.open(doc.fileUrl, '_blank');
        }
    };

    // Build unique filter options from live data
    const categoryOptions = [
        { label: 'All Categories', value: '' },
        ...Array.from(new Set(documents.map((d) => d.category))).map((c) => ({ label: c, value: c })),
    ];
    const statusOptions = [
        { label: 'All Status', value: '' },
        ...Array.from(new Set(documents.map((d) => d.status))).map((s) => ({ label: s, value: s })),
    ];

    const filteredDocuments = documents.filter((d) => {
        const matchCategory = category ? d.category === category : true;
        const matchStatus = status ? d.status === status : true;
        const matchSearch = search
            ? d.name.toLowerCase().includes(search.toLowerCase()) ||
              d.related.toLowerCase().includes(search.toLowerCase()) ||
              d.property.toLowerCase().includes(search.toLowerCase())
            : true;
        return matchCategory && matchStatus && matchSearch;
    });

    return (
        <div className="pb-10">
            <DocumentDetailsPanel
                isOpen={!!selectedDoc}
                onClose={() => setSelectedDoc(null)}
                document={selectedDoc}
                onDownload={handleDownload}
            />
            <div className="mb-6 mt-4 max-w-300 mx-auto">
                <div className="mt-8 rounded-xl border border-[#E8F4F8] bg-white p-6 shadow-sm">
                    <div className="flex flex-col gap-3 mb-6 sm:flex-row sm:items-center">
                        <Select
                            title="Category"
                            options={categoryOptions}
                            value={category}
                            onChange={setCategory}
                            containerClassName="min-w-[160px]"
                        />

                        <Select
                            title="Status"
                            options={statusOptions}
                            value={status}
                            onChange={setStatus}
                            containerClassName="min-w-[140px]"
                        />

                        <div className="relative flex-1 max-w-xs mt-5.5">
                            <svg
                                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#98A2B3]"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.2-5.2" />
                                <circle cx="11" cy="11" r="7" />
                            </svg>
                            <Input
                                title={undefined}
                                className="pl-12 pr-4 py-2 text-[14px]"
                                containerClassName="w-full"
                                placeholder="Search ..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>

                    {isLoading ? (
                        <TableSkeleton />
                    ) : (
                        <Table
                            className="text-[14px]"
                            responsive="stack"
                            renderCard={(d: any) => (
                                <div className="grid grid-cols-2 gap-3 items-start p-4 border-b border-gray-50 last:border-b-0">
                                    <div className="col-span-2 flex items-center gap-3">
                                        <span className="h-8 w-8 rounded bg-blue-50 flex items-center justify-center flex-shrink-0">
                                            <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#002E62]" fill="none" stroke="currentColor" strokeWidth={2}>
                                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                                <polyline points="14 2 14 8 20 8" />
                                            </svg>
                                        </span>
                                        <div className="flex-1 min-w-0">
                                            <div className="font-semibold text-[#0A2D50] text-[15px] truncate">{d.name}</div>
                                            <div className="text-[13px] text-[#64748B] truncate">{d.related}</div>
                                        </div>
                                    </div>

                                    <div className="text-[13px] text-[#374151]">
                                        <div className="font-medium text-sm">Category</div>
                                        <div className="text-[#475467]">{d.category}</div>
                                    </div>
                                    <div className="text-[13px] text-[#374151]">
                                        <div className="font-medium text-sm">Property</div>
                                        <div className="text-[#475467]">{d.property}</div>
                                    </div>
                                    <div className="text-[13px] text-[#374151]">
                                        <div className="font-medium text-sm">Uploaded</div>
                                        <div className="text-[#475467]">{d.date}</div>
                                    </div>

                                    <div className="col-span-1 text-[13px] text-[#374151]">
                                        <div className="font-medium text-sm">Status</div>
                                        <div className="mt-1 inline-block">
                                            <StatusTag status={d.status as any} />
                                        </div>
                                    </div>
                                    <div className="col-span-1 text-right">
                                        <div className="inline-block">
                                            <button
                                                aria-haspopup="menu"
                                                aria-expanded={openMenuFor?.id === d.id}
                                                onClick={(e) => {
                                                    const rect = e.currentTarget.getBoundingClientRect();
                                                    setMenuPos({ top: rect.bottom + window.scrollY, right: window.innerWidth - rect.right });
                                                    setOpenMenuFor(openMenuFor?.id === d.id ? null : d);
                                                }}
                                                className="inline-flex items-center justify-center rounded-full text-[#98A2B3] p-2 hover:bg-gray-100 transition-colors"
                                            >
                                                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                                                    <circle cx="12" cy="12" r="1.5" />
                                                    <circle cx="19" cy="12" r="1.5" />
                                                    <circle cx="5" cy="12" r="1.5" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                            headers={
                                [
                                    { key: 'sn', label: 'S/N' },
                                    { key: 'document', label: 'DOCUMENT' },
                                    { key: 'category', label: 'CATEGORY' },
                                    { key: 'related', label: 'RELATED TO' },
                                    { key: 'date', label: 'UPLOAD DATE' },
                                    { key: 'status', label: 'STATUS' },
                                    { key: 'action', label: 'ACTION' },
                                ] as TableHeader[]
                            }
                            items={filteredDocuments}
                            renderRow={(d: any, idx: number) => (
                                <tr
                                    key={d.id}
                                    className={idx % 2 === 0 ? 'bg-white text-[#3F3F46]' : 'bg-[#F3F5F5] text-[#3F3F46]'}
                                >
                                    <td className="px-3 py-2">{d.sn}</td>
                                    <td className="px-3 py-2">
                                        <div className="flex items-center gap-2">
                                            <span className="h-7 w-7 rounded bg-blue-50 flex items-center justify-center flex-shrink-0">
                                                <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#002E62]" fill="none" stroke="currentColor" strokeWidth={2}>
                                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                                    <polyline points="14 2 14 8 20 8" />
                                                </svg>
                                            </span>
                                            <div className="min-w-0">
                                                <div className="font-medium truncate">{d.name}</div>
                                                <div className="text-[12px] text-[#64748B] truncate">{d.property}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-3 py-2">{d.category}</td>
                                    <td className="px-3 py-2">{d.related}</td>
                                    <td className="px-3 py-2">{d.date}</td>
                                    <td className="px-3 py-2">
                                        <StatusTag status={d.status as any} />
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        <div className="relative inline-block">
                                            <button
                                                aria-haspopup="menu"
                                                aria-expanded={openMenuFor?.id === d.id}
                                                onClick={(e) => {
                                                    const rect = e.currentTarget.getBoundingClientRect();
                                                    setMenuPos({ top: rect.bottom + window.scrollY, right: window.innerWidth - rect.right });
                                                    setOpenMenuFor(openMenuFor?.id === d.id ? null : d);
                                                }}
                                                className="inline-flex items-center justify-center rounded-full text-[#98A2B3] p-1 hover:bg-gray-100 transition-colors"
                                            >
                                                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                                                    <circle cx="12" cy="12" r="1.5" />
                                                    <circle cx="19" cy="12" r="1.5" />
                                                    <circle cx="5" cy="12" r="1.5" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )}
                            start={filteredDocuments.length ? 1 : 0}
                            end={filteredDocuments.length}
                            total={documents.length}
                        />
                    )}

                    {!isLoading && documents.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-16 text-[#71717A]">
                            <svg className="h-12 w-12 mb-3 text-[#CBD5E1]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                <polyline points="14 2 14 8 20 8" />
                            </svg>
                            <p className="text-[14px] font-medium">No documents found</p>
                            <p className="text-[12px] mt-1">Upload a document using the button above.</p>
                        </div>
                    )}

                    <DeleteConfirmationModal
                        isOpen={showDeleteConfirm}
                        title="Delete Document"
                        message="Are you sure you want to delete this document? This action cannot be undone."
                        onConfirm={handleConfirmDelete}
                        onClose={() => setShowDeleteConfirm(false)}
                    />
                </div>
            </div>

            {openMenuFor && createPortal(
                <div
                    ref={menuRef}
                    role="menu"
                    aria-orientation="vertical"
                    style={{ position: 'absolute', top: menuPos.top + 8, right: menuPos.right }}
                    className="w-44 bg-white border border-[#E6EEF7] rounded-xl shadow-lg ring-1 ring-black/5 py-2 z-[9999] overflow-hidden"
                >
                    <CardMenuItem
                        label="View"
                        icon={<Eye className="w-[18px] h-[18px] text-[#475467]" />}
                        onActivate={() => handleView(openMenuFor)}
                        className="text-[#0A2D50] hover:bg-[#F1F9FF]"
                    />
                    <CardMenuItem
                        label="Download"
                        icon={<Download className="w-[18px] h-[18px] text-[#475467]" />}
                        onActivate={() => handleDownload(openMenuFor)}
                        className="text-[#0A2D50] hover:bg-[#F1F9FF]"
                    />
                </div>,
                document.body
            )}
        </div>
    );
};

export default DocumentPage;
