import { useState } from 'react';
import {
    FiDownload,
    FiChevronDown,
    FiBold,
    FiItalic,
    FiUnderline,
    FiList,
    FiAlignLeft,
    FiAlignCenter,
    FiAlignRight,
} from 'react-icons/fi';
import { mockGeneratedReports } from '../../data/energyParkingMock';
import type { GeneratedReportItem } from '../../types/energyParking';
import { showSuccessToast } from '@shared/components/Toast/Toast';

export default function EnergyReportsView() {
    const [reportsList, setReportsList] = useState<GeneratedReportItem[]>(mockGeneratedReports);
    const [showCreateForm, setShowCreateForm] = useState(false);

    // Form states
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [reportType, setReportType] = useState('');
    const [remarks, setRemarks] = useState('');

    // Editor formatting states
    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);
    const [isUnderline, setIsUnderline] = useState(false);
    const [textCase, setTextCase] = useState<'normal' | 'uppercase' | 'capitalize'>('normal');
    const [textAlign, setTextAlign] = useState<'left' | 'center' | 'right'>('left');

    const handleDownloadSingle = (reportTitle: string) => {
        showSuccessToast('Download Started', `Downloading ${reportTitle}...`);
    };

    const handleDownloadAll = () => {
        showSuccessToast('Downloading All', 'Bundling all generated reports into a ZIP archive...');
    };

    const handleSaveReport = (e: React.FormEvent) => {
        e.preventDefault();

        const typeLabel = reportType || 'Monthly Energy Report';
        const formattedDate = new Date().toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        });

        const newReport: GeneratedReportItem = {
            id: `rep-${Date.now()}`,
            title: `${typeLabel} - ${new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`,
            generatedDate: formattedDate,
            type: reportType.includes('Quarterly')
                ? 'Quarterly'
                : reportType.includes('Biannually')
                ? 'Biannually'
                : reportType.includes('Annually')
                ? 'Annually'
                : 'Monthly',
            period: `${startDate || 'Current'} to ${endDate || 'Present'}`,
            fileSize: '3.4 MB',
        };

        setReportsList((prev) => [newReport, ...prev]);
        showSuccessToast(
            'Report Generated',
            `${newReport.title} has been generated and saved successfully.`
        );

        // Reset form
        setStartDate('');
        setEndDate('');
        setReportType('');
        setRemarks('');
        setShowCreateForm(false);
    };

    const toggleTextCase = () => {
        setTextCase((prev) =>
            prev === 'normal' ? 'uppercase' : prev === 'uppercase' ? 'capitalize' : 'normal'
        );
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* 1. LEFT CARD: Generated Reports List (Image 1) */}
                <div className="lg:col-span-6 xl:col-span-7 bg-white rounded-2xl border border-[#BED3EB] p-5 sm:p-6 shadow-xs space-y-4">
                    {/* Header */}
                    <div className="flex items-center justify-between gap-3 pb-2">
                        <div>
                            <h3 className="text-base sm:text-lg font-bold text-[#002E62]">
                                Generated Reports
                            </h3>
                            <p className="text-xs text-[#71717A] mt-0.5">
                                Download or view your generated reports
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={handleDownloadAll}
                            className="bg-[#002E62] hover:bg-[#002047] text-white px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 shadow-xs"
                        >
                            <FiDownload className="h-3.5 w-3.5" />
                            <span>Download All</span>
                        </button>
                    </div>

                    {/* Report Rows */}
                    <div className="divide-y divide-[#F1F5F9]">
                        {reportsList.map((report) => (
                            <div
                                key={report.id}
                                className="py-3.5 flex items-center justify-between gap-3 first:pt-1 last:pb-1"
                            >
                                <div className="space-y-0.5">
                                    <h4 className="text-xs sm:text-sm font-bold text-[#002E62]">
                                        {report.title}
                                    </h4>
                                    <p className="text-[11px] text-[#71717A]">
                                        Generated on {report.generatedDate}
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => handleDownloadSingle(report.title)}
                                    className="border border-[#CCE3FD] text-[#0062D2] hover:bg-[#F3F9FF] rounded-lg px-3.5 py-1.5 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                                >
                                    <FiDownload className="h-3 w-3" />
                                    <span>Download</span>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 2. RIGHT CARD: Either Callout Card OR Generate Reports Form (Image 1) */}
                <div className="lg:col-span-6 xl:col-span-5">
                    {!showCreateForm ? (
                        /* Initial Callout Card */
                        <div className="bg-white rounded-2xl border border-[#BED3EB] p-6 shadow-xs relative overflow-hidden flex flex-col justify-between min-h-[300px]">
                            <div className="space-y-3 z-10 max-w-[260px] sm:max-w-[280px]">
                                <h3 className="text-base sm:text-lg font-bold text-[#002E62]">
                                    Generate Reports
                                </h3>
                                <p className="text-xs text-[#71717A] leading-relaxed">
                                    Easily generate detailed reports by selecting a start and end
                                    date, and choosing your preferred report type either Generator or
                                    Grid.
                                </p>

                                <div className="pt-2">
                                    <button
                                        type="button"
                                        onClick={() => setShowCreateForm(true)}
                                        className="bg-[#002E62] hover:bg-[#002047] text-white px-5 py-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer shadow-xs"
                                    >
                                        Create Report
                                    </button>
                                </div>
                            </div>

                            {/* Right Graphic/Illustration */}
                            <div className="absolute right-3 bottom-3 sm:right-5 sm:bottom-4 w-36 sm:w-44 h-36 sm:h-44 pointer-events-none select-none">
                                <svg
                                    viewBox="0 0 200 200"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-full h-full"
                                >
                                    <circle cx="140" cy="110" r="75" fill="#E6F4FB" />
                                    <rect
                                        x="135"
                                        y="70"
                                        width="55"
                                        height="95"
                                        rx="8"
                                        fill="#FFFFFF"
                                        stroke="#60A5FA"
                                        strokeWidth="2.5"
                                    />
                                    <rect
                                        x="142"
                                        y="80"
                                        width="41"
                                        height="6"
                                        rx="3"
                                        fill="#BFDBFE"
                                    />
                                    <rect
                                        x="142"
                                        y="92"
                                        width="41"
                                        height="28"
                                        rx="4"
                                        fill="#3B82F6"
                                        opacity="0.85"
                                    />
                                    <rect
                                        x="142"
                                        y="126"
                                        width="30"
                                        height="4"
                                        rx="2"
                                        fill="#93C5FD"
                                    />
                                    <rect
                                        x="142"
                                        y="134"
                                        width="22"
                                        height="4"
                                        rx="2"
                                        fill="#BFDBFE"
                                    />
                                    <rect
                                        x="100"
                                        y="45"
                                        width="70"
                                        height="50"
                                        rx="6"
                                        fill="#F1F5F9"
                                        stroke="#CBD5E1"
                                        strokeWidth="2"
                                    />
                                    <line
                                        x1="100"
                                        y1="58"
                                        x2="170"
                                        y2="58"
                                        stroke="#CBD5E1"
                                        strokeWidth="2"
                                    />
                                    <circle cx="95" cy="88" r="14" fill="#3B2621" />
                                    <path
                                        d="M82 110 C82 98, 108 98, 108 110 L115 160 C115 165, 80 165, 78 160 Z"
                                        fill="#22C55E"
                                    />
                                    <path
                                        d="M102 118 L138 128 L132 142 L98 128 Z"
                                        fill="#22C55E"
                                    />
                                    <rect
                                        x="126"
                                        y="120"
                                        width="22"
                                        height="30"
                                        rx="3"
                                        fill="#1E293B"
                                        transform="rotate(8 126 120)"
                                    />
                                    <circle cx="92" cy="85" r="9" fill="#D97706" opacity="0.3" />
                                </svg>
                            </div>
                        </div>
                    ) : (
                        /* Generate Reports Form matching Image 1 exactly */
                        <div className="bg-white rounded-2xl border border-[#BED3EB] p-5 sm:p-6 shadow-xs space-y-4 animate-[fadeIn_.2s_ease-out]">
                            <div className="flex items-center justify-between">
                                <h3 className="text-base sm:text-lg font-bold text-[#002E62]">
                                    Generate Reports
                                </h3>
                                <button
                                    type="button"
                                    onClick={() => setShowCreateForm(false)}
                                    className="text-xs text-[#71717A] hover:text-[#002E62] transition-colors cursor-pointer font-medium"
                                >
                                    Cancel
                                </button>
                            </div>

                            <form onSubmit={handleSaveReport} className="space-y-4">
                                {/* Row 1: Start Date and End Date */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                    {/* Start Date */}
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-[#002E62] block">
                                            Start Date
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="date"
                                                value={startDate}
                                                onChange={(e) => setStartDate(e.target.value)}
                                                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E0E8F2] bg-[#F7F9FC] text-xs text-[#091E42] placeholder-[#71717A] focus:outline-none focus:ring-1 focus:ring-[#002E62] focus:bg-white transition-all cursor-pointer"
                                                placeholder="Select Date"
                                            />
                                        </div>
                                    </div>

                                    {/* End Date */}
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-[#002E62] block">
                                            End Date
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="date"
                                                value={endDate}
                                                onChange={(e) => setEndDate(e.target.value)}
                                                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E0E8F2] bg-[#F7F9FC] text-xs text-[#091E42] placeholder-[#71717A] focus:outline-none focus:ring-1 focus:ring-[#002E62] focus:bg-white transition-all cursor-pointer"
                                                placeholder="Select Date"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Row 2: Report Type */}
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-[#002E62] block">
                                        Report Type
                                    </label>
                                    <div className="relative">
                                        <select
                                            value={reportType}
                                            onChange={(e) => setReportType(e.target.value)}
                                            required
                                            className="w-full px-3.5 py-2.5 rounded-xl border border-[#E0E8F2] bg-[#F7F9FC] text-xs text-[#091E42] focus:outline-none focus:ring-1 focus:ring-[#002E62] focus:bg-white transition-all appearance-none cursor-pointer pr-10"
                                        >
                                            <option value="" disabled>
                                                Select Type
                                            </option>
                                            <option value="Monthly Energy Report">
                                                Monthly Energy Report
                                            </option>
                                            <option value="Quarterly Energy Report">
                                                Quarterly Energy Report
                                            </option>
                                            <option value="Biannually Energy Report">
                                                Biannually Energy Report
                                            </option>
                                            <option value="Annually Energy Report">
                                                Annually Energy Report
                                            </option>
                                            <option value="Generator Usage Report">
                                                Generator Usage Report
                                            </option>
                                            <option value="Grid Energy Report">
                                                Grid Energy Report
                                            </option>
                                            <option value="Combined Energy Audit">
                                                Combined Energy Audit
                                            </option>
                                        </select>
                                        <FiChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#71717A] pointer-events-none" />
                                    </div>
                                </div>

                                {/* Row 3: Remarks Rich Text Editor Box (Image 1) */}
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-[#002E62] block">
                                        Remarks
                                    </label>
                                    <div className="border border-[#E0E8F2] rounded-xl overflow-hidden bg-white focus-within:ring-1 focus-within:ring-[#002E62] transition-all">
                                        {/* Editor Toolbar matching Image 1 */}
                                        <div className="bg-[#F8FAFC] border-b border-[#E0E8F2] px-3 py-2 flex items-center gap-3 text-[#475467] select-none flex-wrap">
                                            {/* Bold */}
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

                                            {/* Italic */}
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

                                            {/* Underline */}
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

                                            {/* Aa (Typography) */}
                                            <button
                                                type="button"
                                                onClick={toggleTextCase}
                                                className={`px-1.5 py-0.5 rounded hover:bg-slate-200 text-xs font-semibold transition-colors ${
                                                    textCase !== 'normal'
                                                        ? 'bg-slate-200 text-[#002E62]'
                                                        : ''
                                                }`}
                                                title="Text Case"
                                            >
                                                <span className="text-[11px] font-semibold">Aa</span>
                                            </button>

                                            <div className="h-4 w-px bg-[#E2E8F0]" />

                                            {/* Bullet List */}
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setRemarks((prev) =>
                                                        prev ? `${prev}\n• ` : '• '
                                                    );
                                                }}
                                                className="p-1 rounded hover:bg-slate-200 text-xs transition-colors"
                                                title="Bullet List"
                                            >
                                                <FiList className="h-3.5 w-3.5" />
                                            </button>

                                            {/* Numbered List */}
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setRemarks((prev) =>
                                                        prev ? `${prev}\n1. ` : '1. '
                                                    );
                                                }}
                                                className="p-1 rounded hover:bg-slate-200 text-xs font-semibold transition-colors flex items-center gap-0.5"
                                                title="Numbered List"
                                            >
                                                <span className="text-[10px]">1.</span>
                                                <FiList className="h-3 w-3" />
                                            </button>

                                            <div className="h-4 w-px bg-[#E2E8F0]" />

                                            {/* Align Left */}
                                            <button
                                                type="button"
                                                onClick={() => setTextAlign('left')}
                                                className={`p-1 rounded hover:bg-slate-200 text-xs transition-colors ${
                                                    textAlign === 'left'
                                                        ? 'bg-slate-200 text-[#002E62]'
                                                        : ''
                                                }`}
                                                title="Align Left"
                                            >
                                                <FiAlignLeft className="h-3.5 w-3.5" />
                                            </button>

                                            {/* Align Center */}
                                            <button
                                                type="button"
                                                onClick={() => setTextAlign('center')}
                                                className={`p-1 rounded hover:bg-slate-200 text-xs transition-colors ${
                                                    textAlign === 'center'
                                                        ? 'bg-slate-200 text-[#002E62]'
                                                        : ''
                                                }`}
                                                title="Align Center"
                                            >
                                                <FiAlignCenter className="h-3.5 w-3.5" />
                                            </button>

                                            {/* Align Right */}
                                            <button
                                                type="button"
                                                onClick={() => setTextAlign('right')}
                                                className={`p-1 rounded hover:bg-slate-200 text-xs transition-colors ${
                                                    textAlign === 'right'
                                                        ? 'bg-slate-200 text-[#002E62]'
                                                        : ''
                                                }`}
                                                title="Align Right"
                                            >
                                                <FiAlignRight className="h-3.5 w-3.5" />
                                            </button>
                                        </div>

                                        {/* Textarea */}
                                        <textarea
                                            rows={4}
                                            value={remarks}
                                            onChange={(e) => setRemarks(e.target.value)}
                                            placeholder="Enter remarks"
                                            style={{
                                                fontWeight: isBold ? 'bold' : 'normal',
                                                fontStyle: isItalic ? 'italic' : 'normal',
                                                textDecoration: isUnderline ? 'underline' : 'none',
                                                textTransform: textCase,
                                                textAlign: textAlign,
                                            }}
                                            className="w-full p-3.5 text-xs text-[#091E42] placeholder-[#94A3B8] focus:outline-none min-h-[110px] bg-transparent resize-none"
                                        />
                                    </div>
                                </div>

                                {/* Row 4: Save Report Button (Image 1) */}
                                <div className="pt-2 flex items-center gap-3">
                                    <button
                                        type="submit"
                                        className="bg-[#002E62] hover:bg-[#002047] text-white px-6 py-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer shadow-xs"
                                    >
                                        Save Report
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
