import React, { useState } from 'react';
import Modal from '@components/cards/timeline/Modal';

interface CreatePostModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({ isOpen, onClose }) => {
    const [isClosing, setIsClosing] = useState(false);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsClosing(false);
            onClose();
        }, 200);
    };

    return (
        <Modal
            isOpen={isOpen}
            isClosing={isClosing}
            onClose={handleClose}
            title="New Post"
            maxWidth="max-w-3xl"
            height="h-auto"
        >
            <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Post Type */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-[#172B4D]">Post Type</label>
                        <select className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-[#F9FAFB] text-gray-500 outline-none focus:border-blue-500 transition-colors appearance-none">
                            <option>Select post type</option>
                            <option>General</option>
                            <option>Update</option>
                        </select>
                    </div>

                    {/* Module */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-[#172B4D]">Module</label>
                        <select className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-[#F9FAFB] text-gray-500 outline-none focus:border-blue-500 transition-colors appearance-none">
                            <option>Select post module</option>
                            <option>Property</option>
                            <option>Community</option>
                        </select>
                    </div>
                </div>

                {/* Title */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#172B4D]">Title</label>
                    <input
                        type="text"
                        placeholder="Enter ticket title"
                        className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-[#F9FAFB] text-gray-900 placeholder:text-gray-500 outline-none focus:border-blue-500 transition-colors"
                    />
                </div>

                {/* Content */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#172B4D]">Content</label>
                    <div className="border border-gray-200 rounded-xl overflow-hidden">
                        {/* Toolbar */}
                        <div className="border-b border-gray-200 bg-white p-2 flex gap-4">
                            <button className="p-1 hover:bg-gray-100 rounded text-gray-600 font-serif">B</button>
                            <button className="p-1 hover:bg-gray-100 rounded text-gray-600 italic font-serif">I</button>
                            <button className="p-1 hover:bg-gray-100 rounded text-gray-600 underline font-serif">U</button>
                            <div className="w-px h-6 bg-gray-200 my-auto"></div>
                            <button className="p-1 hover:bg-gray-100 rounded text-gray-600">Aa</button>
                            <button className="p-1 hover:bg-gray-100 rounded text-gray-600">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
                            </button>
                             <button className="p-1 hover:bg-gray-100 rounded text-gray-600">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
                            </button>
                        </div>
                        <textarea
                            placeholder="Enter Message Here"
                            className="w-full h-32 p-4 bg-[#F9FAFB] placeholder:text-gray-500 outline-none resize-none"
                        ></textarea>
                    </div>
                </div>

                {/* Upload Media */}
                 <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#172B4D]">Upload Media</label>
                    <div className="grid grid-cols-3 gap-4">
                        {[1, 2, 3].map((i) => (
                             <div key={i} className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden group border border-gray-200">
                                <img 
                                    src={`https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=400`} 
                                    className="w-full h-full object-cover" 
                                    alt="preview"
                                />
                                <button className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-sm hover:bg-gray-100">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                </button>
                             </div>
                        ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">You can rearrange the images by dragging them. The image in the first position will appear as the thumbnail.</p>
                </div>

                <div className="pt-4">
                    <button className="px-6 py-3 bg-[#091E42] text-white rounded-lg font-medium hover:bg-[#172B4D] transition-colors">
                        Add Post
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default CreatePostModal;
