import React, { useRef } from 'react';
import { FiUploadCloud } from 'react-icons/fi';

export interface FileDropzoneProps {
    /** Text label shown above the dropzone */
    label?: string;
    /** Smaller subtitle below the main text */
    subtitle?: string;
    /** Accepted file types for the hidden input */
    accept?: string;
    /** Allow selecting multiple files at once */
    multiple?: boolean;
    /** Callback with the selected / dropped files */
    onFiles: (files: File[]) => void;
    /** Extra CSS classes on the outer wrapper */
    className?: string;
}

/**
 * Reusable drag-and-drop / click-to-browse file upload zone.
 *
 * Shows a dashed-border area with an upload icon and
 * "Drag and drop or select file to upload" prompt.
 */
export default function FileDropzone({
    label,
    subtitle,
    accept = 'image/*',
    multiple = false,
    onFiles,
    className = '',
}: FileDropzoneProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const files = Array.from(e.dataTransfer.files);
        if (files.length) onFiles(files);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files ?? []);
        if (files.length) onFiles(files);
        // Reset so the same file can be re-selected
        e.target.value = '';
    };

    return (
        <div className={className}>
            {label && (
                <p className="block mb-1 text-[#002E62] font-semibold text-[15px]">
                    {label}
                </p>
            )}

            <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                onClick={() => inputRef.current?.click()}
                className="w-full flex flex-col items-center justify-center gap-2 py-10 border border-dashed border-[#E0DEF7] rounded-xl bg-[#F7F7FD] hover:bg-[#F0F4FF] hover:border-[#002E62]/40 transition-all cursor-pointer group"
            >
                <FiUploadCloud className="h-7 w-7 text-[#94A3B8] group-hover:text-[#002E62] transition-colors" />
                <span className="text-sm font-medium text-[#52525B] group-hover:text-[#002E62] transition-colors">
                    Drag and drop or select file to upload
                </span>
                {subtitle && (
                    <span className="text-xs text-[#94A3B8]">{subtitle}</span>
                )}
            </div>

            <input
                ref={inputRef}
                type="file"
                accept={accept}
                multiple={multiple}
                className="hidden"
                onChange={handleChange}
            />
        </div>
    );
}
