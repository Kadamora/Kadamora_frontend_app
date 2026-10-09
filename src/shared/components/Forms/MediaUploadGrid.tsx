import React, { useRef } from 'react';
import { FiX, FiPlus } from 'react-icons/fi';
import Label from './Label';
import FileDropzone from './FileDropzone';

export interface MediaUploadGridProps {
    label?: string;
    previews: string[];
    onAddFiles: (files: File[]) => void;
    onRemoveImage: (index: number) => void;
    required?: boolean;
    helperText?: string;
    maxFiles?: number;
}

export default function MediaUploadGrid({
    label = 'Upload Media',
    previews,
    onAddFiles,
    onRemoveImage,
    required = false,
    helperText = '· You can rearrange the images by dragging them. The image in the first position will appear as the thumbnail.',
    maxFiles = 10,
}: MediaUploadGridProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const selectedFiles = Array.from(e.target.files);
            onAddFiles(selectedFiles);
            e.target.value = '';
        }
    };

    return (
        <div className="space-y-2 w-full">
            {label && <Label required={required}>{label}</Label>}

            {/* Empty state – full-width drag-and-drop zone */}
            {previews.length === 0 ? (
                <FileDropzone
                    accept="image/*"
                    multiple
                    onFiles={onAddFiles}
                />
            ) : (
                /* Grid of uploaded thumbnails + add-tile */
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                    {/* Uploaded Thumbnail Cards with Top-Right Circular Red Delete Badge */}
                    {previews.map((src, index) => (
                        <div
                            key={index}
                            className="relative aspect-video rounded-xl overflow-hidden bg-slate-100 border border-slate-200 group shadow-2xs"
                        >
                            <img
                                src={src}
                                alt={`Upload preview ${index + 1}`}
                                className="w-full h-full object-cover"
                            />

                            {/* Top-Right Circular Red Delete Badge (exact match to screenshot) */}
                            <button
                                type="button"
                                onClick={() => onRemoveImage(index)}
                                className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-white border border-red-200 text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center transition-colors cursor-pointer shadow-xs"
                                title="Remove image"
                            >
                                <FiX className="h-3 w-3 stroke-[2.5]" />
                            </button>
                        </div>
                    ))}

                    {/* Add Image Tile */}
                    {previews.length < maxFiles && (
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            className="aspect-video rounded-xl border-2 border-dashed border-slate-200 bg-[#F8FAFC] hover:bg-slate-100/70 hover:border-[#002E62]/40 transition-colors flex flex-col items-center justify-center cursor-pointer text-slate-400 p-2"
                        >
                            <FiPlus className="h-5 w-5 text-slate-400 mb-1" />
                            <span className="text-[11px] font-semibold text-slate-500">Add Image</span>
                        </div>
                    )}
                </div>
            )}

            {/* Hidden File Input (used by the "Add Image" tile when images exist) */}
            <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
            />

            {/* Drag & Rearrange Helper Subtext (exact match to screenshot) */}
            {helperText && (
                <p className="text-[10px] text-[#52525B] leading-relaxed font-normal pt-1">
                    {helperText}
                </p>
            )}
        </div>
    );
}

