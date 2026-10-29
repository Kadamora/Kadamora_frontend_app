import { useState } from 'react';
import Modal from '@shared/components/Modal/Modal';
import { showSuccessToast } from '@shared/components/Toast/Toast';

interface LeasePropertyModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function LeasePropertyModal({ isOpen, onClose }: LeasePropertyModalProps) {
    const [propertyName, setPropertyName] = useState('Modern Office Suite A');
    const [companyName, setCompanyName] = useState('');
    const [duration, setDuration] = useState('1 Year');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        showSuccessToast('Lease Application Initiated', `Application submitted for ${propertyName}.`);
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Lease Commercial Property"
            maxWidth="max-w-[480px]"
        >
            <form onSubmit={handleSubmit} className="space-y-4 pt-1">
                <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#002E62] block">Select Workspace</label>
                    <select
                        value={propertyName}
                        onChange={(e) => setPropertyName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E0E8F2] bg-[#F7F9FC] text-xs text-[#091E42] focus:outline-none focus:ring-1 focus:ring-[#002E62]"
                    >
                        <option value="Modern Office Suite A">Modern Office Suite A (₦ 22,999,732.00)</option>
                        <option value="Executive Conference Center">Executive Conference Center (₦ 22,999,732.00)</option>
                        <option value="Industrial Warehouse B">Industrial Warehouse B (₦ 22,999,732.00)</option>
                    </select>
                </div>

                <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#002E62] block">Company / Tenant Name</label>
                    <input
                        type="text"
                        required
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="e.g. Acme Corporation Ltd"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E0E8F2] bg-[#F7F9FC] text-xs text-[#091E42] focus:outline-none focus:ring-1 focus:ring-[#002E62]"
                    />
                </div>

                <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#002E62] block">Lease Term</label>
                    <select
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E0E8F2] bg-[#F7F9FC] text-xs text-[#091E42] focus:outline-none focus:ring-1 focus:ring-[#002E62]"
                    >
                        <option value="6 Months">6 Months</option>
                        <option value="1 Year">1 Year</option>
                        <option value="2 Years">2 Years</option>
                        <option value="3 Years">3 Years</option>
                    </select>
                </div>

                <div className="pt-2">
                    <button
                        type="submit"
                        className="bg-[#002E62] hover:bg-[#002047] text-white px-6 py-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer shadow-xs"
                    >
                        Submit Lease Request
                    </button>
                </div>
            </form>
        </Modal>
    );
}
