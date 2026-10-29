import { useState } from 'react';
import Modal from '@shared/components/Modal/Modal';
import Button from '@shared/components/Button/Button';

export interface CustomerAddress {
    line1: string;
    state: string;
    phone: string;
    note?: string;
}

export interface ConfirmOrderModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    subtotal: number;
    shipping: number;
    total: number;
    itemsCount: number;
}

const defaultAddress: CustomerAddress = {
    line1: 'Gbagalape living faith',
    state: 'Federal Capital Territory - ABUJA-KARU',
    phone: '+234 8101831001',
    note: 'Felis sed amet eget aliquam cursus placerat.',
};

export default function ConfirmOrderModal({
    isOpen,
    onClose,
    onConfirm,
    subtotal,
    shipping,
    total,
    itemsCount,
}: ConfirmOrderModalProps) {
    const [address, setAddress] = useState<CustomerAddress>(defaultAddress);
    const [isEditingAddress, setIsEditingAddress] = useState(false);
    const [editedLine1, setEditedLine1] = useState(address.line1);
    const [editedState, setEditedState] = useState(address.state);
    const [editedPhone, setEditedPhone] = useState(address.phone);

    const handleSaveAddress = () => {
        setAddress((prev) => ({
            ...prev,
            line1: editedLine1,
            state: editedState,
            phone: editedPhone,
        }));
        setIsEditingAddress(false);
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Confirm Order"
            maxWidth="max-w-[560px]"
            className="p-6 sm:p-7"
        >
            <div className="space-y-5">
                {/* 1. Customer Address Card */}
                <div className="rounded-2xl border border-[#CCE3FD] bg-white p-5 space-y-2">
                    <div className="flex items-center justify-between gap-3">
                        <h4 className="text-base sm:text-lg font-bold text-[#002E62]">
                            Customer Address
                        </h4>
                        <button
                            type="button"
                            onClick={() => setIsEditingAddress((prev) => !prev)}
                            className="text-xs sm:text-sm font-semibold text-[#0062D2] hover:underline cursor-pointer"
                        >
                            {isEditingAddress ? 'Cancel' : 'Change Address'}
                        </button>
                    </div>

                    <p className="text-xs text-[#71717A]">
                        {address.note || 'Felis sed amet eget aliquam cursus placerat.'}
                    </p>

                    {isEditingAddress ? (
                        <div className="pt-2 space-y-2 text-xs">
                            <input
                                type="text"
                                value={editedLine1}
                                onChange={(e) => setEditedLine1(e.target.value)}
                                placeholder="Address line"
                                className="w-full px-3 py-2 border border-[#CCE3FD] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#002E62]"
                            />
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                <input
                                    type="text"
                                    value={editedState}
                                    onChange={(e) => setEditedState(e.target.value)}
                                    placeholder="State / Region"
                                    className="w-full px-3 py-2 border border-[#CCE3FD] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#002E62]"
                                />
                                <input
                                    type="text"
                                    value={editedPhone}
                                    onChange={(e) => setEditedPhone(e.target.value)}
                                    placeholder="Phone number"
                                    className="w-full px-3 py-2 border border-[#CCE3FD] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#002E62]"
                                />
                            </div>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleSaveAddress}
                                className="px-3 py-1.5 text-xs font-semibold rounded-md"
                            >
                                Update Address
                            </Button>
                        </div>
                    ) : (
                        <p className="text-xs sm:text-[13px] font-medium text-[#091E42] pt-1">
                            {address.line1} | {address.state} | {address.phone}
                        </p>
                    )}
                </div>

                {/* 2. Order Summary Card */}
                <div className="rounded-2xl border border-[#CCE3FD] bg-white p-5 space-y-3">
                    <div className="space-y-0.5">
                        <h4 className="text-base sm:text-lg font-bold text-[#002E62]">
                            Order Summary
                        </h4>
                        <p className="text-xs text-[#71717A]">
                            Detailed summary of items in my cart
                        </p>
                    </div>

                    <div className="text-xs italic text-[#71717A] pt-1">
                        {itemsCount} {itemsCount === 1 ? 'item' : 'items'} in total
                    </div>

                    <div className="space-y-2.5 pt-1 text-xs sm:text-sm">
                        <div className="flex items-center justify-between text-[#52525B] pt-2 border-t border-[#F0F2F5]">
                            <span>Sub-total</span>
                            <span className="font-bold text-[#002E62]">
                                ₦{subtotal.toFixed(2)}
                            </span>
                        </div>

                        <div className="flex items-center justify-between text-[#52525B] pt-2 border-t border-[#F0F2F5]">
                            <span>Shipping</span>
                            <span className="font-bold text-[#002E62]">
                                ₦ {shipping.toFixed(2)}
                            </span>
                        </div>

                        <div className="flex items-center justify-between text-[#52525B] pt-2 border-t border-[#F0F2F5]">
                            <span className="font-medium">Total</span>
                            <span className="font-bold text-sm sm:text-base text-[#002E62]">
                                ₦{total.toFixed(2)}
                            </span>
                        </div>
                    </div>
                </div>

                {/* 3. Bottom Action & Terms Notice */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                    <button
                        type="button"
                        onClick={onConfirm}
                        className="bg-[#002E62] hover:bg-[#002047] text-white px-6 py-3 rounded-lg text-xs sm:text-sm font-semibold transition-colors cursor-pointer shadow-xs text-center shrink-0"
                    >
                        Confirm Order Now
                    </button>

                    <p className="text-[11px] sm:text-xs text-[#52525B] leading-relaxed">
                        By proceeding, you are automatically accepting the{' '}
                        <a
                            href="#terms"
                            onClick={(e) => e.preventDefault()}
                            className="text-[#12B76A] font-semibold hover:underline cursor-pointer"
                        >
                            Terms & Conditions
                        </a>
                    </p>
                </div>
            </div>
        </Modal>
    );
}
