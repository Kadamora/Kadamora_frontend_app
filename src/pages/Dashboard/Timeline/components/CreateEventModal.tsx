import React, { useState } from 'react';
import Modal from '@components/cards/timeline/Modal';

interface CreateEventModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const CreateEventModal: React.FC<CreateEventModalProps> = ({ isOpen, onClose }) => {
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
            title="New Event"
            maxWidth="max-w-3xl"
            height="h-auto"
        >
            <div className="p-6 space-y-6">
                {/* Title */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#172B4D]">Title</label>
                    <input
                        type="text"
                        placeholder="Enter ticket title"
                        className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-[#F9FAFB] text-gray-900 placeholder:text-gray-500 outline-none focus:border-blue-500 transition-colors"
                    />
                </div>

                 {/* Location */}
                 <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#172B4D]">Location</label>
                    <input
                        type="text"
                        placeholder="Enter ticket title" 
                        className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-[#F9FAFB] text-gray-900 placeholder:text-gray-500 outline-none focus:border-blue-500 transition-colors"
                    />
                </div>

                 {/* Maximum Attendees */}
                 <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#172B4D]">Maximum Attendees</label>
                    <input
                        type="number"
                        placeholder="Enter maximum attendee"
                        className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-[#F9FAFB] text-gray-900 placeholder:text-gray-500 outline-none focus:border-blue-500 transition-colors"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     {/* Date */}
                     <div className="space-y-2">
                        <label className="text-sm font-semibold text-[#172B4D]">Date</label>
                         <select className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-[#F9FAFB] text-gray-500 outline-none focus:border-blue-500 transition-colors appearance-none">
                            <option>Select Date</option>
                        </select>
                    </div>

                    {/* Time */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-[#172B4D]">Time</label>
                        <select className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-[#F9FAFB] text-gray-500 outline-none focus:border-blue-500 transition-colors appearance-none">
                            <option>Select Time</option>
                        </select>
                    </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#172B4D]">Description</label>
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

                {/* Upload File */}
                 <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#172B4D]">Upload File</label>
                    <div className="border-2 border-dashed border-[#DADDF1] rounded-xl bg-[#F9FAFB] h-32 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 mb-2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                        <span className="text-sm text-gray-500">Drag and drop or select file to upload</span>
                    </div>
                </div>

                <div className="pt-4">
                    <button className="px-6 py-3 bg-[#091E42] text-white rounded-lg font-medium hover:bg-[#172B4D] transition-colors">
                        Add Event
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default CreateEventModal;
