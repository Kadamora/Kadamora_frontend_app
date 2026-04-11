
import Input from '@components/forms/Input';
import Select from '@components/forms/Select';
import Textarea from '@components/forms/Textarea';
import React, { useState } from 'react';
import { useCreateAnnouncementMutation } from '../../../../../store/api/announcement.api';
import { useGetManagedPropertiesQuery } from '@store/api/propertyMgt.api';


interface CreateAnnouncementModalProps {
    open: boolean;
    onClose: () => void;
}

const CreateAnnouncementModal: React.FC<CreateAnnouncementModalProps> = ({ open, onClose }) => {
    const [propertyId, setPropertyId] = useState('');
    // const [unit, setUnit] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [propertyType, setPropertyType] = useState('residential');
    const [url, setUrl] = useState('');
    // const [file, setFile] = useState<File | null>(null);

    const [createAnnouncement, { isLoading }] = useCreateAnnouncementMutation();
    const { data: propertiesData } = useGetManagedPropertiesQuery(undefined, { skip: !open });
    const propertiesOptions = propertiesData?.data?.map((p: any) => ({
        label: p.name,
        value: p.id
    })) || [];

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-8 animate-[fadeIn_.25s_ease] relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 h-8 w-8 flex items-center justify-center rounded-full border border-[#E2E8F0] text-[#64748B] hover:bg-[#F1F5F9] focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#94A3B8]"
                    aria-label="Close"
                >
                    <svg
                        viewBox="0 0 24 24"
                        className="h-4 w-4"
                        stroke="currentColor"
                        strokeWidth={2}
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>
                <h2 className="text-lg font-semibold mb-6">Announcement</h2>
                <form
                    className="space-y-4"
                    onSubmit={async (e) => {
                        e.preventDefault();
                        const payload = {
                            title,
                            content,
                            propertyId,
                            propertyType,
                            url
                        };

                        try {
                            await createAnnouncement(payload).unwrap();
                            onClose();
                        } catch (err) {
                            console.error('Failed to create announcement', err);
                        }
                    }}
                >
                    <div className="flex gap-4">
                        <Select
                            title="Property"
                            name="propertyId"
                            placeholder="Select property"
                            options={propertiesOptions}
                            value={propertyId}
                            onChange={setPropertyId}
                            required
                            className="flex-1"
                        />
                        <Select
                            title="Property Type"
                            name="propertyType"
                            placeholder="Select Type"
                            options={[
                                { label: 'Residential', value: 'residential' },
                                { label: 'Commercial', value: 'commercial' },
                            ]}
                            value={propertyType}
                            onChange={(val) => setPropertyType(val)}
                            required
                            className="flex-1"
                        />
                        {/* <Select
                            title="Unit"
                            name="unit"
                            placeholder="Select Unit"
                            options={unitOptions}
                            value={unit}
                            onChange={setUnit}
                            required
                            className="flex-1"
                        /> */}
                    </div>
                    <Input
                        title="Announcement Title"
                        name="title"
                        placeholder="Enter message title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <div>
                        <label className="block text-sm font-semibold mb-2">Message</label>
                        <Textarea
                            name="message"
                            placeholder="Enter Message Here"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            rows={5}
                            required
                            className="resize-none"
                        />
                    </div>
                    <Input
                        title="URL (optional)"
                        name="url"
                        placeholder="Enter URL"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                    {/* <div>
                        <label className="block text-sm font-semibold mb-2">Upload File</label>
                        <label className="block border-2 border-dashed border-[#E0DEF7] rounded-lg p-6 text-center cursor-pointer text-[#64748B] hover:bg-[#F6F6FB] transition-colors">
                            <input
                                type="file"
                                className="hidden"
                                onChange={(e) => setFile(e.target.files?.[0] || null)}
                            />
                            {file ? (
                                file.name
                            ) : (
                                <span className="flex flex-col items-center gap-2">
                                    <svg width="32" height="32" fill="none" viewBox="0 0 32 32">
                                        <path
                                            d="M16 21.333V10.667M16 10.667l-4 4M16 10.667l4 4"
                                            stroke="#64748B"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <rect
                                            x="5.333"
                                            y="5.333"
                                            width="21.333"
                                            height="21.333"
                                            rx="2.667"
                                            stroke="#E0DEF7"
                                            strokeWidth="2"
                                        />
                                    </svg>
                                    Drag and drop or select file to upload
                                </span>
                            )}
                        </label>
                    </div> */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="mt-4 w-full py-3 rounded-lg bg-[#002E62] text-white font-semibold text-[15px] hover:bg-[#002E62]/90 transition-colors disabled:opacity-50"
                    >
                        {isLoading ? 'Sending...' : 'Send Announcement'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateAnnouncementModal;
