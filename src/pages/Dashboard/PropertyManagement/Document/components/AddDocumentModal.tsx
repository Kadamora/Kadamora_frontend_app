
import Input from '@components/forms/Input';
import Select from '@components/forms/Select';
import React, { useState, useRef } from 'react';
import { useUploadDocumentMutation, useGetManagedPropertiesQuery } from '@store/api/propertyMgt.api';
import { useUploadFilesMutation } from '@store/api/upload.api';

interface AddDocumentModalProps {
    open: boolean;
    onClose: () => void;
}

const AddDocumentModal: React.FC<AddDocumentModalProps> = ({ open, onClose }) => {
    const [propertyId, setPropertyId] = useState('');
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('Legal');
    const [relatedToLabel, setRelatedToLabel] = useState('');
    const [status, setStatus] = useState('Active');

    // File upload state
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [uploadDocument, { isLoading: isSubmitting }] = useUploadDocumentMutation();
    const [uploadFiles] = useUploadFilesMutation();
    const { data: propertiesData } = useGetManagedPropertiesQuery(undefined, { skip: !open });

    const propertiesOptions = propertiesData?.data?.map((p: any) => ({
        label: p.name,
        value: p.id,
    })) || [];

    const categories = [
        { label: 'Legal', value: 'Legal' },
        { label: 'Property', value: 'Property' },
        { label: 'Maintenance', value: 'Maintenance' },
        { label: 'Personal', value: 'Personal' },
        { label: 'Financial', value: 'Financial' },
    ];

    const statuses = [
        { label: 'Active', value: 'Active' },
        { label: 'Pending', value: 'Pending' },
        { label: 'Approved', value: 'Approved' },
        { label: 'Expired', value: 'Expired' },
        { label: 'Issued', value: 'Issued' },
    ];

    const resetForm = () => {
        setPropertyId('');
        setTitle('');
        setCategory('Legal');
        setRelatedToLabel('');
        setStatus('Active');
        setSelectedFile(null);
        setUploadError(null);
    };

    if (!open) return null;

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            setUploadError(null);
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        const file = e.dataTransfer.files?.[0];
        if (file) {
            setSelectedFile(file);
            setUploadError(null);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedFile) {
            setUploadError('Please select a file to upload.');
            return;
        }

        try {
            setIsUploading(true);
            setUploadError(null);

            // Step 1: Upload file to CDN via the /api/v1/upload endpoint
            const formData = new FormData();
            formData.append('files', selectedFile);
            const uploadRes = await uploadFiles(formData).unwrap();
            const fileUrl = uploadRes.data.urls[0];

            // Step 2: Submit document with the returned URL
            await uploadDocument({
                propertyId,
                title,
                category,
                relatedToLabel,
                fileUrl,
                status,
            }).unwrap();

            onClose();
            resetForm();
        } catch (error: any) {
            setUploadError(error?.data?.message || 'Upload failed. Please try again.');
            console.error('Failed to upload document:', error);
        } finally {
            setIsUploading(false);
        }
    };

    const isBusy = isUploading || isSubmitting;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl p-8 relative">
                {/* Close Button */}
                <button
                    type="button"
                    onClick={() => { onClose(); resetForm(); }}
                    className="absolute top-5 right-5 h-8 w-8 flex items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-100 transition-colors"
                >
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <h2 className="text-xl font-bold text-[#002E62] mb-6 flex items-center gap-2">
                    Upload New Document
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <Select
                        title="Property"
                        name="propertyId"
                        placeholder="Select Property"
                        options={propertiesOptions}
                        value={propertyId}
                        onChange={setPropertyId}
                        required
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            title="Document Title"
                            name="title"
                            placeholder="e.g. Lease Agreement"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                        <Select
                            title="Category"
                            name="category"
                            placeholder="Select Category"
                            options={categories}
                            value={category}
                            onChange={setCategory}
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            title="Related To (Label)"
                            name="relatedToLabel"
                            placeholder="e.g. John Smith - Unit A12"
                            value={relatedToLabel}
                            onChange={(e) => setRelatedToLabel(e.target.value)}
                            required
                        />
                        <Select
                            title="Initial Status"
                            name="status"
                            placeholder="Select Status"
                            options={statuses}
                            value={status}
                            onChange={setStatus}
                            required
                        />
                    </div>

                    {/* File Upload Area */}
                    <div>
                        <label className="block text-sm font-semibold mb-2 text-[#002E62]">
                            Document File <span className="text-red-500">*</span>
                        </label>
                        <label
                            className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${selectedFile ? 'border-[#002E62] bg-[#F0F7FF]' : 'border-[#E0DEF7] bg-[#FAFAFE] hover:bg-[#F6F6FB]'} ${uploadError ? 'border-red-400 bg-red-50' : ''}`}
                            onDrop={handleDrop}
                            onDragOver={(e) => e.preventDefault()}
                        >
                            <input
                                ref={fileInputRef}
                                type="file"
                                className="hidden"
                                accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg"
                                onChange={handleFileChange}
                            />
                            {selectedFile ? (
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-lg bg-[#002E62]/10 flex items-center justify-center flex-shrink-0">
                                        <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#002E62]" fill="none" stroke="currentColor" strokeWidth={2}>
                                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                            <polyline points="14 2 14 8 20 8" />
                                        </svg>
                                    </div>
                                    <div className="text-left min-w-0">
                                        <div className="text-sm font-semibold text-[#002E62] truncate">{selectedFile.name}</div>
                                        <div className="text-xs text-[#64748B]">{(selectedFile.size / 1024).toFixed(1)} KB — click to change</div>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center gap-2 text-[#64748B]">
                                    <svg width="36" height="36" fill="none" viewBox="0 0 36 36">
                                        <path d="M18 24V13M18 13l-5 5M18 13l5 5" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <rect x="6" y="6" width="24" height="24" rx="3" stroke="#CBD5E1" strokeWidth="2" />
                                    </svg>
                                    <span className="text-sm font-medium">Drag & drop or <span className="text-[#0A66B2] underline">browse file</span></span>
                                    <span className="text-xs text-[#94A3B8]">PDF, Word, Excel, PNG, JPG supported</span>
                                </div>
                            )}
                        </label>
                        {uploadError && (
                            <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 flex-shrink-0" fill="currentColor">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                                </svg>
                                {uploadError}
                            </p>
                        )}
                    </div>

                    <div className="pt-2 flex gap-3">
                        <button
                            type="button"
                            onClick={() => { onClose(); resetForm(); }}
                            disabled={isBusy}
                            className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isBusy}
                            className="flex-[2] py-3 px-4 bg-[#002E62] text-white font-bold rounded-xl hover:bg-[#003d82] transition-colors shadow-lg shadow-blue-900/10 disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {isBusy ? (
                                <>
                                    <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    {isUploading ? 'Uploading file...' : 'Saving...'}
                                </>
                            ) : (
                                'Upload Document'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddDocumentModal;
