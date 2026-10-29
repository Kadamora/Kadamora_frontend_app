import { useState, useRef } from 'react';
import {
    FiChevronDown,
    FiUpload,
    FiBold,
    FiItalic,
    FiUnderline,
    FiList,
    FiAlignLeft,
    FiAlignCenter,
    FiAlignRight,
    FiFile,
    FiX,
} from 'react-icons/fi';
import Modal from '@shared/components/Modal/Modal';
import type { CustomizationRequestItem } from '../../../types/commercialFacilities';
import { showSuccessToast, showWarningToast } from '@shared/components/Toast/Toast';

interface NewCustomizationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (newRequest: CustomizationRequestItem) => void;
}

export default function NewCustomizationModal({
    isOpen,
    onClose,
    onSubmit,
}: NewCustomizationModalProps) {
    const [service, setService] = useState('');
    const [unit, setUnit] = useState('');
    const [property, setProperty] = useState('');
    const [priority, setPriority] = useState<'High' | 'Medium' | 'Low'>('High');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [files, setFiles] = useState<File[]>([]);

    // Rich text toolbar formatting states
    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);
    const [isUnderline, setIsUnderline] = useState(false);
    const [textCase, setTextCase] = useState<'normal' | 'uppercase' | 'capitalize'>('normal');
    const [textAlign, setTextAlign] = useState<'left' | 'center' | 'right'>('left');

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFiles(Array.from(e.target.files));
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            setFiles(Array.from(e.dataTransfer.files));
        }
    };

    const toggleTextCase = () => {
        setTextCase((prev) =>
            prev === 'normal' ? 'uppercase' : prev === 'uppercase' ? 'capitalize' : 'normal'
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!title.trim()) {
            showWarningToast('Title Required', 'Please enter a customization ticket title.');
            return;
        }

        const dateStr = new Date().toLocaleDateString('en-US', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        });

        const createdItem: CustomizationRequestItem = {
            id: `cust-${Date.now()}`,
            title: title.trim(),
            priority,
            status: 'Pending',
            description:
                description.trim() ||
                'Lorem ipsum dolor sit amet consectetur. Nibh odio egestas tortor lorem laoreet eu volutpat.',
            raisedOn: dateStr,
            availableTime: '09:00 AM - 06:00 PM',
            tenantName: 'Charles John',
            tenantProperty: property || 'Modern Office Suite A',
            serviceType: service || 'Electrical',
            imageUrl:
                'https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=800&q=80',
        };

        onSubmit(createdItem);
        showSuccessToast(
            'Customization Logged',
            `"${createdItem.title}" has been submitted successfully.`
        );

        // Reset
        setTitle('');
        setService('');
        setUnit('');
        setProperty('');
        setDescription('');
        setFiles([]);
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="New Customization For Corporate Facility"
            maxWidth="max-w-[560px]"
        >
            <form onSubmit={handleSubmit} className="space-y-4 pt-1">
                {/* Row 1: Service & Unit */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-[#002E62] block">
                            Service
                        </label>
                        <div className="relative">
                            <select
                                value={service}
                                onChange={(e) => setService(e.target.value)}
                                required
                                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E0E8F2] bg-[#F7F9FC] text-xs text-[#091E42] focus:outline-none focus:ring-1 focus:ring-[#002E62] focus:bg-white transition-all appearance-none cursor-pointer pr-10"
                            >
                                <option value="" disabled>
                                    Select service type
                                </option>
                                <option value="Electrical">Electrical</option>
                                <option value="Interior Fit-out">Interior Fit-out</option>
                                <option value="HVAC Modification">HVAC Modification</option>
                                <option value="Plumbing">Plumbing</option>
                                <option value="Networking / IT Cabling">Networking / IT Cabling</option>
                                <option value="Painting / Partitions">Painting / Partitions</option>
                            </select>
                            <FiChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#71717A] pointer-events-none" />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-[#002E62] block">
                            Unit
                        </label>
                        <div className="relative">
                            <select
                                value={unit}
                                onChange={(e) => setUnit(e.target.value)}
                                required
                                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E0E8F2] bg-[#F7F9FC] text-xs text-[#091E42] focus:outline-none focus:ring-1 focus:ring-[#002E62] focus:bg-white transition-all appearance-none cursor-pointer pr-10"
                            >
                                <option value="" disabled>
                                    Select Unit
                                </option>
                                <option value="Conference Room A">Conference Room A</option>
                                <option value="Main Executive Suite">Main Executive Suite</option>
                                <option value="West Wing Bay 2">West Wing Bay 2</option>
                                <option value="Private Office 104">Private Office 104</option>
                                <option value="Basement Parking Zone 1">Basement Parking Zone 1</option>
                            </select>
                            <FiChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#71717A] pointer-events-none" />
                        </div>
                    </div>
                </div>

                {/* Row 2: Property & Priority */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-[#002E62] block">
                            Property
                        </label>
                        <div className="relative">
                            <select
                                value={property}
                                onChange={(e) => setProperty(e.target.value)}
                                required
                                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E0E8F2] bg-[#F7F9FC] text-xs text-[#091E42] focus:outline-none focus:ring-1 focus:ring-[#002E62] focus:bg-white transition-all appearance-none cursor-pointer pr-10"
                            >
                                <option value="" disabled>
                                    Select Property
                                </option>
                                <option value="Modern Office Suite A">Modern Office Suite A</option>
                                <option value="Executive Conference Center">Executive Conference Center</option>
                                <option value="Industrial Warehouse B">Industrial Warehouse B</option>
                            </select>
                            <FiChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#71717A] pointer-events-none" />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-[#002E62] block">
                            Priority
                        </label>
                        <div className="relative">
                            <select
                                value={priority}
                                onChange={(e) =>
                                    setPriority(e.target.value as 'High' | 'Medium' | 'Low')
                                }
                                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E0E8F2] bg-[#F7F9FC] text-xs text-[#091E42] focus:outline-none focus:ring-1 focus:ring-[#002E62] focus:bg-white transition-all appearance-none cursor-pointer pr-10"
                            >
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </select>
                            <FiChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#71717A] pointer-events-none" />
                        </div>
                    </div>
                </div>

                {/* Row 3: Customization Title */}
                <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#002E62] block">
                        Customization Title
                    </label>
                    <input
                        type="text"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter customization ticket title"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E0E8F2] bg-[#F7F9FC] text-xs text-[#091E42] placeholder-[#71717A] focus:outline-none focus:ring-1 focus:ring-[#002E62] focus:bg-white transition-all"
                    />
                </div>

                {/* Row 4: Description with Rich Text Toolbar */}
                <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#002E62] block">
                        Description
                    </label>
                    <div className="border border-[#E0E8F2] rounded-xl overflow-hidden bg-white focus-within:ring-1 focus-within:ring-[#002E62] transition-all">
                        {/* Editor Toolbar matching Image 4 */}
                        <div className="bg-[#F8FAFC] border-b border-[#E0E8F2] px-3 py-2 flex items-center gap-3 text-[#475467] select-none flex-wrap">
                            <button
                                type="button"
                                onClick={() => setIsBold(!isBold)}
                                className={`p-1 rounded hover:bg-slate-200 text-xs font-bold transition-colors ${
                                    isBold ? 'bg-slate-200 text-[#002E62]' : ''
                                }`}
                                title="Bold"
                            >
                                <FiBold className="h-3.5 w-3.5" />
                            </button>

                            <button
                                type="button"
                                onClick={() => setIsItalic(!isItalic)}
                                className={`p-1 rounded hover:bg-slate-200 text-xs italic transition-colors ${
                                    isItalic ? 'bg-slate-200 text-[#002E62]' : ''
                                }`}
                                title="Italic"
                            >
                                <FiItalic className="h-3.5 w-3.5" />
                            </button>

                            <button
                                type="button"
                                onClick={() => setIsUnderline(!isUnderline)}
                                className={`p-1 rounded hover:bg-slate-200 text-xs underline transition-colors ${
                                    isUnderline ? 'bg-slate-200 text-[#002E62]' : ''
                                }`}
                                title="Underline"
                            >
                                <FiUnderline className="h-3.5 w-3.5" />
                            </button>

                            <button
                                type="button"
                                onClick={toggleTextCase}
                                className={`px-1.5 py-0.5 rounded hover:bg-slate-200 text-xs font-semibold transition-colors ${
                                    textCase !== 'normal' ? 'bg-slate-200 text-[#002E62]' : ''
                                }`}
                                title="Text Case"
                            >
                                <span className="text-[11px] font-semibold">Aa</span>
                            </button>

                            <div className="h-4 w-px bg-[#E2E8F0]" />

                            <button
                                type="button"
                                onClick={() => setDescription((prev) => (prev ? `${prev}\n• ` : '• '))}
                                className="p-1 rounded hover:bg-slate-200 text-xs transition-colors"
                                title="Bullet List"
                            >
                                <FiList className="h-3.5 w-3.5" />
                            </button>

                            <button
                                type="button"
                                onClick={() => setDescription((prev) => (prev ? `${prev}\n1. ` : '1. '))}
                                className="p-1 rounded hover:bg-slate-200 text-xs font-semibold transition-colors flex items-center gap-0.5"
                                title="Numbered List"
                            >
                                <span className="text-[10px]">1.</span>
                                <FiList className="h-3 w-3" />
                            </button>

                            <div className="h-4 w-px bg-[#E2E8F0]" />

                            <button
                                type="button"
                                onClick={() => setTextAlign('left')}
                                className={`p-1 rounded hover:bg-slate-200 text-xs transition-colors ${
                                    textAlign === 'left' ? 'bg-slate-200 text-[#002E62]' : ''
                                }`}
                                title="Align Left"
                            >
                                <FiAlignLeft className="h-3.5 w-3.5" />
                            </button>

                            <button
                                type="button"
                                onClick={() => setTextAlign('center')}
                                className={`p-1 rounded hover:bg-slate-200 text-xs transition-colors ${
                                    textAlign === 'center' ? 'bg-slate-200 text-[#002E62]' : ''
                                }`}
                                title="Align Center"
                            >
                                <FiAlignCenter className="h-3.5 w-3.5" />
                            </button>

                            <button
                                type="button"
                                onClick={() => setTextAlign('right')}
                                className={`p-1 rounded hover:bg-slate-200 text-xs transition-colors ${
                                    textAlign === 'right' ? 'bg-slate-200 text-[#002E62]' : ''
                                }`}
                                title="Align Right"
                            >
                                <FiAlignRight className="h-3.5 w-3.5" />
                            </button>
                        </div>

                        <textarea
                            rows={3}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter Message Here"
                            style={{
                                fontWeight: isBold ? 'bold' : 'normal',
                                fontStyle: isItalic ? 'italic' : 'normal',
                                textDecoration: isUnderline ? 'underline' : 'none',
                                textTransform: textCase,
                                textAlign: textAlign,
                            }}
                            className="w-full p-3.5 text-xs text-[#091E42] placeholder-[#94A3B8] focus:outline-none min-h-[90px] bg-transparent resize-none"
                        />
                    </div>
                </div>

                {/* Row 5: Upload File */}
                <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#002E62] block">
                        Upload File
                    </label>
                    <div
                        onClick={() => fileInputRef.current?.click()}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={handleDrop}
                        className="border-2 border-dashed border-[#D9E3F0] rounded-xl bg-[#F8FAFC] p-5 text-center cursor-pointer hover:border-[#96BEEB] hover:bg-[#F0F6FF]/40 transition-all flex flex-col items-center justify-center space-y-2"
                    >
                        <input
                            ref={fileInputRef}
                            type="file"
                            multiple
                            onChange={handleFileChange}
                            className="hidden"
                        />
                        <div className="h-9 w-9 rounded-full bg-white shadow-xs flex items-center justify-center text-[#71717A]">
                            <FiUpload className="h-4 w-4 text-[#71717A]" />
                        </div>
                        <p className="text-xs text-[#71717A]">
                            Drag and drop or select file to upload
                        </p>

                        {files.length > 0 && (
                            <div className="flex flex-wrap gap-2 pt-1" onClick={(e) => e.stopPropagation()}>
                                {files.map((file, i) => (
                                    <span
                                        key={i}
                                        className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-[#E2E8F0] rounded-md text-[11px] text-[#091E42]"
                                    >
                                        <FiFile className="h-3 w-3 text-[#002E62]" />
                                        <span className="truncate max-w-[120px]">{file.name}</span>
                                        <button
                                            type="button"
                                            onClick={() => setFiles(files.filter((_, idx) => idx !== i))}
                                            className="text-gray-400 hover:text-red-500"
                                        >
                                            <FiX className="h-3 w-3" />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Action Button */}
                <div className="pt-2">
                    <button
                        type="submit"
                        className="bg-[#002E62] hover:bg-[#002047] text-white px-6 py-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer shadow-xs"
                    >
                        Send Request
                    </button>
                </div>
            </form>
        </Modal>
    );
}
