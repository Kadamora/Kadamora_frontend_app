import React, { useState, useEffect, useCallback, useRef } from 'react';
import CloseButton from '@pages/Dashboard/PropertyListing/Home/components/OnboardingAgent/components/CloseButton';
import Input from '@components/forms/Input';
import Select from '@components/forms/Select';
import Textarea from '@components/forms/Textarea';
import { useCreateMaintenanceMutation, useGetManagedPropertiesQuery } from '@store/api/propertyMgt.api';
import { useUploadFilesMutation } from '@store/api/upload.api';

interface AddMaintenanceModalProps {
    open: boolean;
    onClose: () => void;
}

const priorityOptions = [
    { label: 'Low', value: 'Low' },
    { label: 'Medium', value: 'Medium' },
    { label: 'High', value: 'High' },
];

const AddMaintenanceModal: React.FC<AddMaintenanceModalProps> = ({ open, onClose }) => {
    const [propertyId, setPropertyId] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState<'Low' | 'Medium' | 'High'>('Low');
    
    // File upload state
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [createMaintenance, { isLoading: isSubmitting }] = useCreateMaintenanceMutation();
    const [uploadFiles] = useUploadFilesMutation();
    const { data: propertiesData } = useGetManagedPropertiesQuery(undefined, { skip: !open });

    const propertiesOptions = propertiesData?.data?.map((p: any) => ({
        label: p.name,
        value: p.id,
    })) || [];

    const resetForm = useCallback(() => {
        setPropertyId('');
        setTitle('');
        setDescription('');
        setPriority('Low');
        setSelectedFiles([]);
        setUploadError(null);
        setIsUploading(false);
    }, []);

    const handleClose = useCallback(() => {
        onClose();
        setTimeout(resetForm, 300);
    }, [onClose, resetForm]);

    useEffect(() => {
        if (!open) return;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        const handler = (event: KeyboardEvent) => {
            if (event.key === 'Escape') handleClose();
        };
        window.addEventListener('keydown', handler);
        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener('keydown', handler);
        };
    }, [open, handleClose]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length > 0) {
            setSelectedFiles((prev) => [...prev, ...files]);
            setUploadError(null);
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        const files = Array.from(e.dataTransfer.files || []);
        if (files.length > 0) {
            setSelectedFiles((prev) => [...prev, ...files]);
            setUploadError(null);
        }
    };

    const removeFile = (index: number) => {
        setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    };

    if (!open) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!propertyId) return;

        try {
            setIsUploading(true);
            setUploadError(null);

            let uploadedUrls: string[] = [];

            // Step 1: Upload files to CDN if any are selected
            if (selectedFiles.length > 0) {
                const formData = new FormData();
                selectedFiles.forEach((file) => {
                    formData.append('files', file);
                });
                const uploadRes = await uploadFiles(formData).unwrap();
                uploadedUrls = uploadRes.data.urls;
            }

            // Step 2: Submit maintenance request with the returned URLs
            await createMaintenance({
                propertyId,
                title,
                description,
                priority,
                imageUrls: uploadedUrls,
            }).unwrap();

            handleClose();
        } catch (error: any) {
            setUploadError(error?.data?.message || 'Failed to submit request. Please try again.');
            console.error('Failed to create maintenance request:', error);
        } finally {
            setIsUploading(false);
        }
    };

    const isBusy = isUploading || isSubmitting;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4">
            <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}`}</style>
            <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden animate-[fadeIn_.25s_ease] p-8">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-[22px] font-bold text-[#001731]">New Maintenance Request</h2>
                    <CloseButton onClick={handleClose} />
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Property */}
                    <Select
                        title="Property"
                        name="propertyId"
                        placeholder="Select property"
                        options={propertiesOptions}
                        value={propertyId}
                        onChange={setPropertyId}
                        required
                    />

                    {/* Title */}
                    <Input
                        title="Issue Title"
                        name="title"
                        placeholder="e.g. Leaking bathroom faucet"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-semibold mb-2 text-[#002E62]">Description</label>
                        <Textarea
                            name="description"
                            placeholder="Describe the issue in detail..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={3}
                            required
                            className="resize-none"
                        />
                    </div>

                    {/* Priority */}
                    <Select
                        title="Priority"
                        name="priority"
                        placeholder="Select priority"
                        options={priorityOptions}
                        value={priority}
                        onChange={(val) => setPriority(val as 'Low' | 'Medium' | 'High')}
                        required
                    />

                    {/* Image Upload Area */}
                    <div>
                        <label className="block text-sm font-semibold mb-2 text-[#002E62]">
                            Proof Images (Optional)
                        </label>
                        <label
                            className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-colors ${selectedFiles.length > 0 ? 'border-[#002E62] bg-[#F0F7FF]' : 'border-[#E0DEF7] bg-[#FAFAFE] hover:bg-[#F6F6FB]'} ${uploadError ? 'border-red-400 bg-red-50' : ''}`}
                            onDrop={handleDrop}
                            onDragOver={(e) => e.preventDefault()}
                        >
                            <input
                                ref={fileInputRef}
                                type="file"
                                className="hidden"
                                accept="image/*"
                                multiple
                                onChange={handleFileChange}
                            />
                            <div className="flex flex-col items-center gap-2 text-[#64748B]">
                                <svg width="32" height="32" fill="none" viewBox="0 0 36 36">
                                    <path d="M18 24V13M18 13l-5 5M18 13l5 5" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <rect x="6" y="6" width="24" height="24" rx="3" stroke="#CBD5E1" strokeWidth="2" />
                                </svg>
                                <span className="text-sm font-medium">Drag & drop or <span className="text-[#0A66B2] underline">browse</span></span>
                                <span className="text-xs text-[#94A3B8]">PNG, JPG, JPEG supported</span>
                            </div>
                        </label>

                        {/* Selected Files List */}
                        {selectedFiles.length > 0 && (
                            <div className="mt-3 space-y-2">
                                {selectedFiles.map((file, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-2 pl-3 bg-gray-50 rounded-lg border border-gray-100">
                                        <div className="flex items-center gap-2 min-w-0">
                                            <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#64748B] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2}>
                                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                                <circle cx="8.5" cy="8.5" r="1.5" />
                                                <polyline points="21 15 16 10 5 21" />
                                            </svg>
                                            <span className="text-xs font-medium text-[#002E62] truncate">{file.name}</span>
                                            <span className="text-[10px] text-[#94A3B8]">({(file.size / 1024).toFixed(0)} KB)</span>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => removeFile(idx)}
                                            className="p-1 hover:bg-red-50 text-red-400 rounded-md transition-colors"
                                        >
                                            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
                                                <path d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        {uploadError && (
                            <p className="mt-2 text-xs text-red-500 flex items-center gap-1">
                                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 flex-shrink-0" fill="currentColor">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                                </svg>
                                {uploadError}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isBusy}
                        className="w-full py-4 rounded-xl bg-[#002E62] text-white font-bold text-[15px] hover:bg-[#003d82] transition-all shadow-lg shadow-blue-900/10 disabled:opacity-50 flex items-center justify-center gap-2 mt-2"
                    >
                        {isBusy ? (
                            <>
                                <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                {isUploading ? 'Uploading files...' : 'Submitting request...'}
                            </>
                        ) : (
                            'Submit Maintenance Request'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddMaintenanceModal;
