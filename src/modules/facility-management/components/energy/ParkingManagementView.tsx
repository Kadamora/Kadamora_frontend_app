import { useState, useRef, useEffect } from 'react';
import {
    FiZap,
    FiDollarSign,
    FiAlertTriangle,
    FiTrendingUp,
    FiMoreHorizontal,
    FiCheck,
    FiChevronDown,
    FiPlus,
    FiCopy,
} from 'react-icons/fi';
import Modal from '@shared/components/Modal/Modal';
import { mockParkingSlots } from '../../data/energyParkingMock';
import type { ParkingSlotItem } from '../../types/energyParking';
import { showSuccessToast, showWarningToast } from '@shared/components/Toast/Toast';

export default function ParkingManagementView() {
    const [slots, setSlots] = useState<ParkingSlotItem[]>(mockParkingSlots);

    // Modal Visibility States
    const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);
    const [isCreateSlotModalOpen, setIsCreateSlotModalOpen] = useState(false);
    const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
    const [isOpenedFromReserve, setIsOpenedFromReserve] = useState(false);

    // Reserve Slot Form States (Images 2 & 3)
    const [selectedUnit, setSelectedUnit] = useState('');
    const [selectedSlot, setSelectedSlot] = useState('');
    const [dateRange, setDateRange] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [isSlotDropdownOpen, setIsSlotDropdownOpen] = useState(false);
    const slotDropdownRef = useRef<HTMLDivElement>(null);

    // Create Slot Form States (Image 4)
    const [newSlotName, setNewSlotName] = useState('');
    const [newSlotDesc, setNewSlotDesc] = useState('');

    // Access Code State (Image 5)
    const [generatedCode, setGeneratedCode] = useState('KADSLOT#123');
    const [hasCopied, setHasCopied] = useState(false);

    // Close slot dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                slotDropdownRef.current &&
                !slotDropdownRef.current.contains(event.target as Node)
            ) {
                setIsSlotDropdownOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Metric Calculations
    const totalSlotsCount = slots.length;
    const availableSlotsCount = slots.filter((s) => s.status === 'Available').length;
    const occupiedSlotsCount = slots.filter(
        (s) => s.status === 'Occupied' || s.status === 'Assigned'
    ).length;
    const occupancyRate = Math.round((occupiedSlotsCount / (totalSlotsCount || 1)) * 100);

    const metricsData = [
        {
            title: 'Total Slots',
            value: totalSlotsCount.toString().padStart(2, '0'),
            icon: 'lightning' as const,
        },
        {
            title: 'Available',
            value: availableSlotsCount.toString().padStart(2, '0'),
            icon: 'dollar' as const,
        },
        {
            title: 'Occupied',
            value: occupiedSlotsCount.toString().padStart(2, '0'),
            icon: 'warning' as const,
        },
        {
            title: 'Occupancy Rate',
            value: `${occupancyRate}%`,
            icon: 'chart' as const,
        },
    ];

    const renderMetricIcon = (icon: 'lightning' | 'dollar' | 'warning' | 'chart') => {
        switch (icon) {
            case 'lightning':
                return (
                    <div className="h-10 w-10 rounded-full bg-[#E0F7FA] text-[#00BCD4] flex items-center justify-center shrink-0">
                        <FiZap className="h-5 w-5 text-[#00BCD4]" />
                    </div>
                );
            case 'dollar':
                return (
                    <div className="h-10 w-10 rounded-full bg-[#EDFCF4] text-[#12B76A] flex items-center justify-center shrink-0">
                        <FiDollarSign className="h-5 w-5 text-[#12B76A]" />
                    </div>
                );
            case 'warning':
                return (
                    <div className="h-10 w-10 rounded-full bg-[#FEF7EC] text-[#F79009] flex items-center justify-center shrink-0">
                        <FiAlertTriangle className="h-5 w-5 text-[#F79009]" />
                    </div>
                );
            case 'chart':
                return (
                    <div className="h-10 w-10 rounded-full bg-[#F0F6FF] text-[#0062D2] flex items-center justify-center shrink-0">
                        <FiTrendingUp className="h-5 w-5 text-[#0062D2]" />
                    </div>
                );
        }
    };

    const renderBadge = (status: ParkingSlotItem['status']) => {
        switch (status) {
            case 'Available':
                return (
                    <span className="inline-block px-3 py-1 rounded-md text-xs font-semibold bg-[#EDFCF4] text-[#12B76A] border border-[#A6F4C5]">
                        Available
                    </span>
                );
            case 'Occupied':
                return (
                    <span className="inline-block px-3 py-1 rounded-md text-xs font-semibold bg-[#FEF7EC] text-[#F79009] border border-[#FEDF89]">
                        Occupied
                    </span>
                );
            case 'Assigned':
                return (
                    <span className="inline-block px-3 py-1 rounded-md text-xs font-semibold bg-[#F0F6FF] text-[#0062D2] border border-[#CCE3FD]">
                        Assigned
                    </span>
                );
        }
    };

    // Handler: Open Assign Slot modal
    const handleOpenAssign = (slotNum?: string) => {
        if (slotNum) {
            setSelectedSlot(slotNum);
        } else {
            const firstAvailable = slots.find((s) => s.status === 'Available');
            setSelectedSlot(firstAvailable ? firstAvailable.slotNumber : '');
        }
        setSelectedUnit('');
        setDateRange('');
        setStartTime('');
        setEndTime('');
        setIsSlotDropdownOpen(false);
        setIsReserveModalOpen(true);
    };

    // Handler: Reserve Slot Submit (Image 2 -> Image 5)
    const handleReserveSlotSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedSlot) {
            showWarningToast('Select Slot', 'Please select a parking slot to reserve.');
            return;
        }

        // Update slot in list
        setSlots((prev) =>
            prev.map((s) =>
                s.slotNumber === selectedSlot
                    ? {
                          ...s,
                          status: 'Assigned',
                          assignedTo: selectedUnit || 'Resident Unit',
                          vehiclePlate: 'KAD-9201',
                      }
                    : s
            )
        );

        // Generate code
        const codeNum = Math.floor(100 + Math.random() * 900);
        const code = `KADSLOT#${codeNum}`;
        setGeneratedCode(code);

        // Close Reserve modal and Open Generate Code modal (Image 5)
        setIsReserveModalOpen(false);
        setIsCodeModalOpen(true);
        showSuccessToast('Slot Assigned', `Slot ${selectedSlot} has been successfully assigned.`);
    };

    // Handler: Open Create Slot Modal from Slot dropdown or Header (Image 3 -> Image 4)
    const handleOpenCreateSlot = (fromReserve = false) => {
        setIsOpenedFromReserve(fromReserve);
        setIsSlotDropdownOpen(false);
        if (fromReserve) {
            setIsReserveModalOpen(false);
        }
        setNewSlotName('');
        setNewSlotDesc('');
        setIsCreateSlotModalOpen(true);
    };

    // Handler: Create Slot Submit (Image 4)
    const handleCreateSlotSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!newSlotName.trim()) {
            showWarningToast('Slot Name Required', 'Please enter a slot name.');
            return;
        }

        const slotCode = newSlotName.trim().toUpperCase();
        const createdSlot: ParkingSlotItem = {
            id: `slot-${Date.now()}`,
            slotNumber: slotCode,
            description:
                newSlotDesc.trim() ||
                'Lorem ipsum dolor sit amet consectetur. Nibh odio egestas tortor lorem laoreet eu volutpat.',
            status: 'Available',
        };

        setSlots((prev) => [...prev, createdSlot]);
        showSuccessToast('Slot Created', `Slot ${slotCode} has been added successfully.`);

        setIsCreateSlotModalOpen(false);
        setNewSlotName('');
        setNewSlotDesc('');

        // If user came from Reserve Slot dropdown, return to Reserve Slot modal with new slot selected
        if (isOpenedFromReserve) {
            setSelectedSlot(slotCode);
            setIsReserveModalOpen(true);
        }
    };

    // Handler: Copy Generated Access Code (Image 5)
    const handleCopyCode = async () => {
        try {
            await navigator.clipboard.writeText(generatedCode);
            setHasCopied(true);
            showSuccessToast('Code Copied', 'Access code copied to clipboard.');
            setTimeout(() => setHasCopied(false), 2500);
        } catch {
            showSuccessToast('Code Copied', 'Access code copied.');
        }
    };

    return (
        <div className="space-y-6">
            {/* 1. ROW OF 4 STAT CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                {metricsData.map((metric, i) => (
                    <div
                        key={i}
                        className="bg-white rounded-2xl border border-[#BED3EB] p-4 sm:p-5 shadow-xs flex items-center gap-3.5"
                    >
                        {renderMetricIcon(metric.icon)}
                        <div>
                            <span className="text-xs text-[#71717A] font-medium block">
                                {metric.title}
                            </span>
                            <h4 className="text-xl sm:text-2xl font-bold text-[#002E62]">
                                {metric.value}
                            </h4>
                        </div>
                    </div>
                ))}
            </div>

            {/* 2. MAIN CARD: Parking Layout */}
            <div className="bg-white rounded-2xl border border-[#BED3EB] p-6 shadow-xs space-y-5">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h3 className="text-base sm:text-lg font-bold text-[#002E62]">
                            Parking Layout
                        </h3>
                        <p className="text-xs text-[#71717A] mt-0.5">
                            Real-time parking slot status
                        </p>
                    </div>

                    <div className="flex items-center gap-2.5">
                        <button
                            type="button"
                            onClick={() => handleOpenAssign()}
                            className="border border-[#CCE3FD] text-[#002E62] hover:bg-[#F3F9FF] rounded-lg px-4 py-2 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                            <FiCheck className="h-3.5 w-3.5" />
                            <span>Assign Slot</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => handleOpenCreateSlot(false)}
                            className="bg-[#002E62] hover:bg-[#002047] text-white rounded-lg px-4 py-2 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                        >
                            <FiPlus className="h-3.5 w-3.5" />
                            <span>+ Add New Slot</span>
                        </button>
                    </div>
                </div>

                {/* Slot Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {slots.map((slot) => (
                        <div
                            key={slot.id}
                            onClick={() => {
                                if (slot.status === 'Available') {
                                    handleOpenAssign(slot.slotNumber);
                                }
                            }}
                            className={`rounded-2xl border border-[#BED3EB] bg-white p-5 space-y-3.5 shadow-xs flex flex-col justify-between transition-all ${
                                slot.status === 'Available'
                                    ? 'hover:border-[#002E62] hover:shadow-md cursor-pointer'
                                    : ''
                            }`}
                        >
                            <div className="space-y-2.5">
                                <div className="flex items-center justify-between">
                                    <h4 className="text-base font-bold text-[#002E62]">
                                        {slot.slotNumber}
                                    </h4>
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (slot.status === 'Available') {
                                                handleOpenAssign(slot.slotNumber);
                                            }
                                        }}
                                        className="text-[#71717A] hover:text-[#002E62] p-1 rounded transition-colors"
                                    >
                                        <FiMoreHorizontal className="h-4 w-4" />
                                    </button>
                                </div>

                                <p className="text-xs text-[#71717A] leading-relaxed">
                                    {slot.description}
                                </p>
                            </div>

                            <div className="flex items-center justify-between pt-1">
                                {renderBadge(slot.status)}
                                {slot.assignedTo && (
                                    <span className="text-[11px] text-[#71717A] font-medium truncate max-w-[140px]">
                                        {slot.assignedTo}
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* MODAL 1: Reserve Slot Modal (Image 2 & Image 3) */}
            <Modal
                isOpen={isReserveModalOpen}
                onClose={() => setIsReserveModalOpen(false)}
                title="Reserve Slot"
                maxWidth="max-w-[480px]"
            >
                <form onSubmit={handleReserveSlotSubmit} className="space-y-4 pt-1">
                    {/* Unit */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-[#002E62] block">
                            Unit
                        </label>
                        <div className="relative">
                            <select
                                value={selectedUnit}
                                onChange={(e) => setSelectedUnit(e.target.value)}
                                required
                                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E0E8F2] bg-[#F7F9FC] text-xs text-[#091E42] focus:outline-none focus:ring-1 focus:ring-[#002E62] focus:bg-white transition-all appearance-none cursor-pointer pr-10"
                            >
                                <option value="" disabled>
                                    Select Unit
                                </option>
                                <option value="Unit 101 - Block A">Unit 101 - Block A</option>
                                <option value="Unit 102 - Block A">Unit 102 - Block A</option>
                                <option value="Unit 201 - Block B">Unit 201 - Block B</option>
                                <option value="Unit 202 - Block B">Unit 202 - Block B</option>
                                <option value="Unit 301 - Block C">Unit 301 - Block C</option>
                                <option value="Penthouse Suite 01">Penthouse Suite 01</option>
                                <option value="Villa 04">Villa 04</option>
                            </select>
                            <FiChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#71717A] pointer-events-none" />
                        </div>
                    </div>

                    {/* Slot (with Popover Dropdown matching Image 3) */}
                    <div className="space-y-1.5" ref={slotDropdownRef}>
                        <label className="text-xs font-semibold text-[#002E62] block">
                            Slot
                        </label>
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => setIsSlotDropdownOpen((prev) => !prev)}
                                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E0E8F2] bg-[#F7F9FC] text-xs text-left text-[#091E42] focus:outline-none focus:ring-1 focus:ring-[#002E62] focus:bg-white transition-all flex items-center justify-between cursor-pointer"
                            >
                                <span className={selectedSlot ? 'text-[#091E42]' : 'text-[#71717A]'}>
                                    {selectedSlot || 'Select slot'}
                                </span>
                                <FiChevronDown
                                    className={`h-4 w-4 text-[#71717A] transition-transform ${
                                        isSlotDropdownOpen ? 'rotate-180' : ''
                                    }`}
                                />
                            </button>

                            {/* Dropdown Menu (Image 3) */}
                            {isSlotDropdownOpen && (
                                <div className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-[#E0E8F2] rounded-xl shadow-xl z-30 py-1 max-h-56 overflow-y-auto animate-[fadeIn_.15s_ease-out]">
                                    {slots
                                        .filter((s) => s.status === 'Available')
                                        .map((s) => (
                                            <div
                                                key={s.id}
                                                onClick={() => {
                                                    setSelectedSlot(s.slotNumber);
                                                    setIsSlotDropdownOpen(false);
                                                }}
                                                className={`px-4 py-2.5 text-xs cursor-pointer font-medium transition-colors ${
                                                    selectedSlot === s.slotNumber
                                                        ? 'bg-[#F0F6FF] text-[#002E62] font-semibold'
                                                        : 'text-[#091E42] hover:bg-[#F8FAFC]'
                                                }`}
                                            >
                                                {s.slotNumber}
                                            </div>
                                        ))}

                                    {/* + Add New Space Action (Image 3) */}
                                    <div
                                        onClick={() => handleOpenCreateSlot(true)}
                                        className="border-t border-[#F1F5F9] px-4 py-2.5 text-xs text-[#0062D2] hover:bg-[#F0F6FF] cursor-pointer font-semibold flex items-center gap-1.5 transition-colors"
                                    >
                                        <FiPlus className="h-3.5 w-3.5" />
                                        <span>+ Add New Space</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Date Range */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-[#002E62] block">
                            Date Range
                        </label>
                        <div className="relative">
                            <input
                                type="date"
                                value={dateRange}
                                onChange={(e) => setDateRange(e.target.value)}
                                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E0E8F2] bg-[#F7F9FC] text-xs text-[#091E42] placeholder-[#71717A] focus:outline-none focus:ring-1 focus:ring-[#002E62] focus:bg-white transition-all cursor-pointer"
                                placeholder="Select date"
                            />
                        </div>
                    </div>

                    {/* Start Time & End Time */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        {/* Start Time */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-[#002E62] block">
                                Start Time
                            </label>
                            <div className="relative">
                                <input
                                    type="time"
                                    value={startTime}
                                    onChange={(e) => setStartTime(e.target.value)}
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E0E8F2] bg-[#F7F9FC] text-xs text-[#091E42] focus:outline-none focus:ring-1 focus:ring-[#002E62] focus:bg-white transition-all cursor-pointer"
                                    placeholder="Select Date"
                                />
                            </div>
                        </div>

                        {/* End Time */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-[#002E62] block">
                                End Time
                            </label>
                            <div className="relative">
                                <input
                                    type="time"
                                    value={endTime}
                                    onChange={(e) => setEndTime(e.target.value)}
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E0E8F2] bg-[#F7F9FC] text-xs text-[#091E42] focus:outline-none focus:ring-1 focus:ring-[#002E62] focus:bg-white transition-all cursor-pointer"
                                    placeholder="Select Time"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Bottom Button (Image 2) */}
                    <div className="pt-2">
                        <button
                            type="submit"
                            className="bg-[#002E62] hover:bg-[#002047] text-white px-6 py-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer shadow-xs"
                        >
                            Reserve Slot
                        </button>
                    </div>
                </form>
            </Modal>

            {/* MODAL 2: Create Slot Modal (Image 4) */}
            <Modal
                isOpen={isCreateSlotModalOpen}
                onClose={() => {
                    setIsCreateSlotModalOpen(false);
                    if (isOpenedFromReserve) {
                        setIsReserveModalOpen(true);
                    }
                }}
                title="Reserve Slot"
                maxWidth="max-w-[480px]"
            >
                <form onSubmit={handleCreateSlotSubmit} className="space-y-4 pt-1">
                    {/* Slot Name */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-[#002E62] block">
                            Slot Name
                        </label>
                        <input
                            type="text"
                            required
                            value={newSlotName}
                            onChange={(e) => setNewSlotName(e.target.value)}
                            placeholder="Enter slot name"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-[#E0E8F2] bg-[#F7F9FC] text-xs text-[#091E42] placeholder-[#71717A] focus:outline-none focus:ring-1 focus:ring-[#002E62] focus:bg-white transition-all"
                        />
                    </div>

                    {/* Description */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-[#002E62] block">
                            Description
                        </label>
                        <textarea
                            rows={4}
                            value={newSlotDesc}
                            onChange={(e) => setNewSlotDesc(e.target.value)}
                            placeholder="Enter description here"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-[#E0E8F2] bg-[#F7F9FC] text-xs text-[#091E42] placeholder-[#71717A] focus:outline-none focus:ring-1 focus:ring-[#002E62] focus:bg-white resize-none transition-all"
                        />
                    </div>

                    {/* Bottom Button (Image 4) */}
                    <div className="pt-2">
                        <button
                            type="submit"
                            className="bg-[#002E62] hover:bg-[#002047] text-white px-6 py-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer shadow-xs"
                        >
                            Create Slot
                        </button>
                    </div>
                </form>
            </Modal>

            {/* MODAL 3: Generate Code Modal (Image 5) */}
            <Modal
                isOpen={isCodeModalOpen}
                onClose={() => setIsCodeModalOpen(false)}
                title="Generate Code"
                maxWidth="max-w-[440px]"
            >
                <div className="py-6 flex flex-col items-center justify-center text-center space-y-5">
                    {/* Subheading */}
                    <h4 className="text-sm sm:text-base font-bold text-[#002E62]">
                        Access Code Generated
                    </h4>

                    {/* Code Display with Copy Button (Image 5) */}
                    <div className="flex items-center justify-center gap-2.5">
                        <span className="text-2xl sm:text-3xl font-extrabold tracking-wider text-[#002E62] font-mono">
                            {generatedCode}
                        </span>
                        <button
                            type="button"
                            onClick={handleCopyCode}
                            title="Copy code"
                            className="p-1.5 rounded-lg hover:bg-[#F0F6FF] text-[#002E62] transition-colors cursor-pointer"
                        >
                            {hasCopied ? (
                                <FiCheck className="h-5 w-5 text-[#12B76A]" />
                            ) : (
                                <FiCopy className="h-5 w-5 text-[#002E62]" />
                            )}
                        </button>
                    </div>

                    {/* Done Button (Image 5) */}
                    <div className="pt-2">
                        <button
                            type="button"
                            onClick={() => setIsCodeModalOpen(false)}
                            className="bg-[#002E62] hover:bg-[#002047] text-white px-8 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors cursor-pointer shadow-xs"
                        >
                            Done
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
