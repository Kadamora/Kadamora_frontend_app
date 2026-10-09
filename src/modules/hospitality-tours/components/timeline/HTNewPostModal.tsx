import React, { useState } from 'react';
import { FiX } from 'react-icons/fi';
import Input from '@shared/components/Forms/Input';
import Select from '@shared/components/Forms/Select';
import Label from '@shared/components/Forms/Label';
import RichTextEditor from '@shared/components/Forms/RichTextEditor';
import MediaUploadGrid from '@shared/components/Forms/MediaUploadGrid';
import type { TimelinePost } from '../../types';

interface HTNewPostModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmitPost?: (newPost: Partial<TimelinePost>) => void;
}

const MODULE_OPTIONS = [
    { value: 'hospitality-tours', label: 'Hospitality & Tours' },
    { value: 'events-festivals', label: 'Events & Festivals' },
    { value: 'cities-destinations', label: 'Cities & Destinations' },
    { value: 'real-estate', label: 'Real Estate' },
];

export default function HTNewPostModal({
    isOpen,
    onClose,
    onSubmitPost,
}: HTNewPostModalProps) {
    const [title, setTitle] = useState('');
    const [module, setModule] = useState('');
    const [content, setContent] = useState('');
    const [eventLink, setEventLink] = useState('');
    const [previews, setPreviews] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) return null;

    const handleAddFiles = (files: File[]) => {
        const newPreviewUrls = files.map((file) => URL.createObjectURL(file));
        setPreviews((prev) => [...prev, ...newPreviewUrls]);
    };

    const handleRemoveImage = (index: number) => {
        setPreviews((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const newPost: Partial<TimelinePost> = {
            id: `post-${Date.now()}`,
            title: title || 'New Timeline Post',
            channel: 'Events TV',
            category: 'Events',
            coverUrl: previews[0] || 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80',
            views: 100,
            postedAgo: 'Just now',
            description: content,
            durationLabel: '20:08',
        };

        if (onSubmitPost) {
            onSubmitPost(newPost);
        }

        setTimeout(() => {
            setIsSubmitting(false);
            onClose();
        }, 300);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-fade-in">
            <div
                className="bg-white rounded-3xl shadow-xl w-full max-w-xl max-h-[90vh] flex flex-col overflow-hidden animate-scale-in"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Modal Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-white">
                    <h2 className="text-xl font-bold text-[#002E62]">New Post</h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="w-8 h-8 rounded-full bg-[#EBF3FF] hover:bg-[#DBEAFE] text-slate-500 hover:text-[#002E62] flex items-center justify-center transition-colors cursor-pointer"
                        title="Close modal"
                    >
                        <FiX className="h-4 w-4 stroke-[2.5]" />
                    </button>
                </div>

                {/* Modal Form Scrollable Content */}
                <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 flex-1 hide-scrollbar">
                    {/* Title */}
                    <div className="space-y-1.5">
                        <Label>Title</Label>
                        <Input
                            placeholder="Enter ticket title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    {/* Module Select */}
                    <div className="space-y-1.5">
                        <Label>Module</Label>
                        <Select
                            placeholder="Select post module"
                            value={module}
                            options={MODULE_OPTIONS}
                            onChange={(val) => setModule(val)}
                        />
                    </div>

                    {/* Content RichTextEditor */}
                    <RichTextEditor
                        label="Content"
                        placeholder="Enter Message Here"
                        value={content}
                        onChange={setContent}
                        rows={4}
                    />

                    {/* Upload Media Grid */}
                    <MediaUploadGrid
                        label="Upload Media"
                        previews={previews}
                        onAddFiles={handleAddFiles}
                        onRemoveImage={handleRemoveImage}
                        helperText="· You can rearrange the images by dragging them. The image in the first position will appear as the thumbnail."
                    />

                    {/* Event Link (youtube) */}
                    <div className="space-y-1.5">
                        <Label>Event Link ( youtube )</Label>
                        <Input
                            placeholder="Paste link here"
                            value={eventLink}
                            onChange={(e) => setEventLink(e.target.value)}
                        />
                    </div>

                    {/* Submit Action Button */}
                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-7 py-3 bg-[#002E62] hover:bg-[#072440] text-white text-sm font-bold rounded-xl transition-colors cursor-pointer shadow-2xs disabled:opacity-50"
                        >
                            {isSubmitting ? 'Posting...' : 'Add Post'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
