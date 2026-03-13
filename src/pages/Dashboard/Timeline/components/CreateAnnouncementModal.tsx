import React, { useState } from 'react';
import Modal from '@components/cards/timeline/Modal';
import { useCreateAnnouncementMutation } from '../../../../store/api/timeline.api';

interface CreateAnnouncementModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const CreateAnnouncementModal: React.FC<CreateAnnouncementModalProps> = ({ isOpen, onClose }) => {
    const [createAnnouncement, { isLoading }] = useCreateAnnouncementMutation();
    const [priority, setPriority] = useState('high');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [images, setImages] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const [isClosing, setIsClosing] = useState(false);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsClosing(false);
            onClose();
        }, 200);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            setImages((prev) => [...prev, ...newFiles]);
            
            const newPreviews = newFiles.map(file => URL.createObjectURL(file));
            setPreviews((prev) => [...prev, ...newPreviews]);
        }
    };

    const removeImage = (index: number) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
        setPreviews((prev) => {
            URL.revokeObjectURL(prev[index]);
            return prev.filter((_, i) => i !== index);
        });
    };

    const handleSubmit = async () => {
        if (!title || !content || !priority) return;

        try {
            const formData = new FormData();
            formData.append('priority', priority);
            formData.append('title', title);
            formData.append('content', content);
            images.forEach((image) => {
                formData.append('images', image);
            });

            await createAnnouncement(formData).unwrap();
            
            // cleanup previews
            previews.forEach(url => URL.revokeObjectURL(url));
            
            // Reset state
            setTitle('');
            setContent('');
            setPriority('high');
            setImages([]);
            setPreviews([]);
            
            handleClose();
        } catch (error) {
            console.error('Failed to create announcement:', error);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            isClosing={isClosing}
            onClose={handleClose}
            title="New Announcement"
            maxWidth="max-w-3xl"
            height="max-h-[90vh]"
        >
            <div className="p-6 space-y-6">
                 {/* Priority */}
                 <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#172B4D]">Priority <span className="text-red-500">*</span></label>
                    <select 
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-[#F9FAFB] text-gray-500 outline-none focus:border-blue-500 transition-colors appearance-none"
                    >
                        <option value="urgent">Urgent</option>
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                    </select>
                </div>

                {/* Title */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#172B4D]">Title <span className="text-red-500">*</span></label>
                    <input
                        type="text"
                        placeholder="Enter title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-[#F9FAFB] text-gray-900 placeholder:text-gray-500 outline-none focus:border-blue-500 transition-colors"
                    />
                </div>

                {/* Content */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#172B4D]">Content <span className="text-red-500">*</span></label>
                    <div className="border border-gray-200 rounded-xl overflow-hidden">
                        {/* Toolbar */}
                        <div className="border-b border-gray-200 bg-white p-2 flex gap-4">
                            <button className="p-1 hover:bg-gray-100 rounded text-gray-600 font-serif">B</button>
                            <button className="p-1 hover:bg-gray-100 rounded text-gray-600 italic font-serif">I</button>
                            <button className="p-1 hover:bg-gray-100 rounded text-gray-600 underline font-serif">U</button>
                            <div className="w-px h-6 bg-gray-200 my-auto"></div>
                            <button className="p-1 hover:bg-gray-100 rounded text-gray-600">Aa</button>
                        </div>
                        <textarea
                            placeholder="Enter Message Here"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full h-32 p-4 bg-[#F9FAFB] placeholder:text-gray-500 outline-none resize-none"
                        ></textarea>
                    </div>
                </div>

                {/* Upload Media */}
                 <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#172B4D]">Upload Media</label>
                    <div className="grid grid-cols-3 gap-4">
                        {previews.map((src, i) => (
                             <div key={i} className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden group border border-gray-200">
                                <img 
                                    src={src} 
                                    className="w-full h-full object-cover" 
                                    alt="preview"
                                />
                                <button 
                                    onClick={() => removeImage(i)}
                                    className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-sm hover:bg-gray-100 cursor-pointer"
                                >
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                </button>
                             </div>
                        ))}
                        <div 
                            className="aspect-video bg-[#F9FAFB] rounded-lg border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 mb-2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                            <span className="text-xs text-gray-500">Add Image</span>
                        </div>
                    </div>
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        className="hidden" 
                        multiple 
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                    <p className="text-xs text-gray-500 mt-2">Upload up to 10 images.</p>
                </div>

                <div className="pt-4">
                    <button 
                        onClick={handleSubmit}
                        disabled={isLoading || !title || !content}
                        className="px-6 py-3 bg-[#091E42] text-white rounded-lg font-medium hover:bg-[#172B4D] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Posting...' : 'Add Announcement'}
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default CreateAnnouncementModal;
