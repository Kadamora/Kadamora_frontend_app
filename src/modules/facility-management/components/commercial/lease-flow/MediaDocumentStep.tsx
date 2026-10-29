import { useState, useRef } from 'react';
import { FiInfo, FiUpload, FiX, FiPlus } from 'react-icons/fi';
import type { LeasePropertyFormData } from '../../../types/commercialFacilities';

interface MediaDocumentStepProps {
    formData: LeasePropertyFormData;
    onChange: (updated: Partial<LeasePropertyFormData>) => void;
    onPrevious: () => void;
    onSubmit: () => void;
}

const PROPERTY_DOCUMENTS = [
    'Certificate of Occupancy (C of O)',
    'Right of Occupancy (R of O)',
    'Receipt of Purchase / Sale Agreement',
    'Building Plan Approval',
    'Survey Plan',
];

const DEFAULT_PHOTOS = [
    'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=600&q=80',
];

export default function MediaDocumentStep({
    formData,
    onChange,
    onPrevious,
    onSubmit,
}: MediaDocumentStepProps) {
    const [photos, setPhotos] = useState<string[]>(
        formData.photos.length > 0 ? formData.photos : DEFAULT_PHOTOS
    );
    const [videoName, setVideoName] = useState<string | undefined>(formData.videoFileName);

    const videoInputRef = useRef<HTMLInputElement>(null);
    const photoInputRef = useRef<HTMLInputElement>(null);

    const toggleDocument = (doc: string) => {
        const current = [...formData.documents];
        const idx = current.indexOf(doc);
        if (idx > -1) {
            current.splice(idx, 1);
        } else {
            current.push(doc);
        }
        onChange({ documents: current });
    };

    const handleRemovePhoto = (index: number) => {
        const updated = photos.filter((_, idx) => idx !== index);
        setPhotos(updated);
        onChange({ photos: updated });
    };

    const handleAddPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const url = URL.createObjectURL(e.target.files[0]);
            const updated = [...photos, url];
            setPhotos(updated);
            onChange({ photos: updated });
        }
    };

    const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const name = e.target.files[0].name;
            setVideoName(name);
            onChange({ videoFileName: name });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5 pt-1">
            {/* Note Alert Callout Box (Image 4) */}
            <div className="bg-[#EFF8FF] border border-[#B8DAFF] rounded-xl p-4 text-xs text-[#004085] flex items-start gap-2.5">
                <FiInfo className="h-4 w-4 text-[#0062D2] shrink-0 mt-0.5" />
                <div className="space-y-0.5 leading-relaxed">
                    <p className="font-bold text-[#002E62]">Note:</p>
                    <p className="text-[#344054]">
                        Supported upload formats include PDF, Word, JPEG, JPG, MP4, PNG and PPT files, Each file not exceeding 2MB.
                    </p>
                </div>
            </div>

            {/* Upload Property Document */}
            <div className="space-y-2">
                <label className="text-xs font-semibold text-[#002E62] block">
                    Upload Property Document
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {PROPERTY_DOCUMENTS.map((doc) => {
                        const isChecked = formData.documents.includes(doc);
                        return (
                            <label
                                key={doc}
                                className="flex items-center gap-2.5 text-xs text-[#091E42] cursor-pointer select-none"
                            >
                                <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={() => toggleDocument(doc)}
                                    className="h-4 w-4 rounded border-[#D1D5DB] text-[#12B76A] focus:ring-[#12B76A] accent-[#12B76A]"
                                />
                                <span>{doc}</span>
                            </label>
                        );
                    })}
                </div>
            </div>

            {/* Upload Photos Section (Image 4) */}
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-[#002E62] block">
                        Upload Photos
                    </label>
                    <button
                        type="button"
                        onClick={() => photoInputRef.current?.click()}
                        className="text-xs text-[#0062D2] hover:text-[#002E62] font-semibold flex items-center gap-1 cursor-pointer"
                    >
                        <FiPlus className="h-3.5 w-3.5" />
                        <span>Add Photo</span>
                    </button>
                    <input
                        ref={photoInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleAddPhoto}
                        className="hidden"
                    />
                </div>

                {/* Previews grid matching Image 4 */}
                <div className="grid grid-cols-3 gap-3">
                    {photos.map((photoUrl, idx) => (
                        <div
                            key={idx}
                            className="relative h-24 sm:h-28 rounded-xl overflow-hidden border border-[#E2E8F0] bg-slate-100 group"
                        >
                            <img
                                src={photoUrl}
                                alt={`Property preview ${idx + 1}`}
                                className="w-full h-full object-cover"
                            />

                            {/* Red Close Badge */}
                            <button
                                type="button"
                                onClick={() => handleRemovePhoto(idx)}
                                aria-label="Remove photo"
                                className="absolute top-1.5 right-1.5 h-5 w-5 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors shadow-xs cursor-pointer"
                            >
                                <FiX className="h-3 w-3 stroke-[3]" />
                            </button>
                        </div>
                    ))}
                </div>

                <p className="text-[11px] text-[#71717A] italic leading-normal">
                    • You can rearrange the images by dragging them. The image in the first position will appear as the thumbnail.
                </p>
            </div>

            {/* Upload Video Section (Image 4) */}
            <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#002E62] block">
                    Upload Video
                </label>
                <div
                    onClick={() => videoInputRef.current?.click()}
                    className="border-2 border-dashed border-[#D9E3F0] rounded-xl bg-[#F8FAFC] p-5 text-center cursor-pointer hover:border-[#96BEEB] hover:bg-[#F0F6FF]/40 transition-all flex flex-col items-center justify-center space-y-2"
                >
                    <input
                        ref={videoInputRef}
                        type="file"
                        accept="video/mp4,video/*"
                        onChange={handleVideoChange}
                        className="hidden"
                    />
                    <div className="h-8 w-8 rounded-full bg-white shadow-xs flex items-center justify-center text-[#71717A]">
                        <FiUpload className="h-4 w-4 text-[#71717A]" />
                    </div>
                    <p className="text-xs text-[#71717A]">
                        {videoName ? (
                            <span className="font-semibold text-[#002E62]">{videoName}</span>
                        ) : (
                            'Drag and drop or select file to upload'
                        )}
                    </p>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-3">
                <button
                    type="button"
                    onClick={onPrevious}
                    className="bg-[#E6F4FB] hover:bg-[#D4EDFA] text-[#0062D2] px-6 py-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                >
                    Previous
                </button>
                <button
                    type="submit"
                    className="bg-[#002E62] hover:bg-[#002047] text-white px-7 py-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer shadow-xs"
                >
                    Submit
                </button>
            </div>
        </form>
    );
}
