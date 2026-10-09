import {
    FiList,
    FiAlignLeft,
    FiAlignCenter,
    FiAlignRight,
} from 'react-icons/fi';
import Label from './Label';

export interface RichTextEditorProps {
    label?: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    rows?: number;
    required?: boolean;
    error?: string;
}

export default function RichTextEditor({
    label,
    value,
    onChange,
    placeholder = 'Enter Message Here',
    rows = 4,
    required = false,
    error,
}: RichTextEditorProps) {
    return (
        <div className="space-y-1.5 w-full">
            {label && <Label required={required}>{label}</Label>}

            <div
                className={`border rounded-xl overflow-hidden bg-[#F8FAFC] transition-colors ${
                    error ? 'border-red-400' : 'border-[#E4E4E7] focus-within:border-[#002E62]'
                }`}
            >
                {/* Formatting Toolbar */}
                <div className="border-b border-[#E4E4E7] bg-white px-3 py-2 flex items-center gap-3 overflow-x-auto text-slate-600">
                    <button
                        type="button"
                        className="p-1 hover:bg-slate-100 rounded font-serif font-extrabold text-sm text-[#002E62] transition-colors cursor-pointer"
                        title="Bold"
                    >
                        B
                    </button>
                    <button
                        type="button"
                        className="p-1 hover:bg-slate-100 rounded italic font-serif text-sm text-[#002E62] transition-colors cursor-pointer"
                        title="Italic"
                    >
                        I
                    </button>
                    <button
                        type="button"
                        className="p-1 hover:bg-slate-100 rounded underline font-serif text-sm text-[#002E62] transition-colors cursor-pointer"
                        title="Underline"
                    >
                        U
                    </button>

                    <div className="w-px h-5 bg-slate-200" />

                    <button
                        type="button"
                        className="p-1 hover:bg-slate-100 rounded font-sans text-xs font-semibold text-[#002E62] transition-colors cursor-pointer"
                        title="Font Size"
                    >
                        Aa
                    </button>

                    <div className="w-px h-5 bg-slate-200" />

                    <button
                        type="button"
                        className="p-1 hover:bg-slate-100 rounded text-slate-600 hover:text-[#002E62] transition-colors cursor-pointer"
                        title="List"
                    >
                        <FiList className="h-4 w-4" />
                    </button>

                    <button
                        type="button"
                        className="p-1 hover:bg-slate-100 rounded text-slate-600 hover:text-[#002E62] transition-colors cursor-pointer"
                        title="Align Left"
                    >
                        <FiAlignLeft className="h-4 w-4" />
                    </button>
                    <button
                        type="button"
                        className="p-1 hover:bg-slate-100 rounded text-slate-600 hover:text-[#002E62] transition-colors cursor-pointer"
                        title="Align Center"
                    >
                        <FiAlignCenter className="h-4 w-4" />
                    </button>
                    <button
                        type="button"
                        className="p-1 hover:bg-slate-100 rounded text-slate-600 hover:text-[#002E62] transition-colors cursor-pointer"
                        title="Align Right"
                    >
                        <FiAlignRight className="h-4 w-4" />
                    </button>
                </div>

                {/* Textarea Input */}
                <textarea
                    rows={rows}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className="w-full p-4 bg-[#F8FAFC] text-slate-800 text-xs sm:text-sm placeholder:text-slate-400 outline-none resize-none leading-relaxed"
                />
            </div>

            {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
        </div>
    );
}
