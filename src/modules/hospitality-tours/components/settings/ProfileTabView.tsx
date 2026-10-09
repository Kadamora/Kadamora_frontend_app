import React, { useState } from 'react';
import Input from '@shared/components/Forms/Input';
import Select from '@shared/components/Forms/Select';
import ChangePasswordModal from './ChangePasswordModal';

const STATE_OPTIONS = [
    { label: 'Lagos', value: 'Lagos' },
    { label: 'Abuja', value: 'Abuja' },
    { label: 'Ogun', value: 'Ogun' },
    { label: 'Oyo', value: 'Oyo' },
    { label: 'Rivers', value: 'Rivers' },
];

const BANK_OPTIONS = [
    { label: 'WEMA BANK', value: 'WEMA BANK' },
    { label: 'Access Bank', value: 'Access Bank' },
    { label: 'GTBank', value: 'GTBank' },
    { label: 'Zenith Bank', value: 'Zenith Bank' },
    { label: 'First Bank', value: 'First Bank' },
];

export default function ProfileTabView() {
    // Personal Details State
    const [firstName, setFirstName] = useState('Charles');
    const [lastName, setLastName] = useState('Micheal');
    const [phone, setPhone] = useState('+1 634 2263');
    const [email, setEmail] = useState('charlesMicheal@gmail.com');

    // Business Details State
    const [businessName, setBusinessName] = useState('Event MTV');
    const [businessPhone, setBusinessPhone] = useState('+1 634 2263');
    const [businessEmail, setBusinessEmail] = useState('charlesMicheal@gmail.com');
    const [address, setAddress] = useState('17 Dunsin bolaji street, off maryland');
    const [stateVal, setStateVal] = useState('Lagos');

    // Bank Details State
    const [accountName, setAccountName] = useState('Event MTV');
    const [bankName, setBankName] = useState('WEMA BANK');
    const [accountNumber, setAccountNumber] = useState('015119521001');

    // Password Modal State
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header Profile Banner Card */}
            <div className="relative w-full rounded-2xl bg-[#002E62] p-6 sm:p-8 overflow-hidden text-white shadow-2xs">
                {/* Decorative Geometric Pattern Background Overlay */}
                <div
                    className="absolute inset-0 opacity-15 pointer-events-none"
                    style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 1px)`,
                        backgroundSize: '20px 20px',
                    }}
                />

                <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        {/* Avatar Circle Logo */}
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#EBF3FF] border-2 border-white/30 flex items-center justify-center shrink-0 shadow-xs">
                            <span className="text-xl sm:text-2xl font-extrabold text-[#002E62]">EM</span>
                        </div>
                        <div>
                            <h2 className="text-lg sm:text-xl font-bold text-white leading-snug">Event MTV</h2>
                            <p className="text-xs sm:text-sm text-white/80">businessevent@gmail.com</p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() => alert('Profile image upload triggered')}
                        className="px-5 py-2.5 bg-white hover:bg-slate-100 text-[#002E62] font-bold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer shadow-xs self-start sm:self-auto"
                    >
                        Upload Profile
                    </button>
                </div>
            </div>

            {/* Section 1: PERSONAL DETAILS */}
            <div className="bg-white border border-[#BED3EB] rounded-2xl p-6 sm:p-8 shadow-2xs space-y-6">
                <h3 className="text-xs sm:text-sm font-bold text-[#002E62] uppercase tracking-wider">
                    PERSONAL DETAILS
                </h3>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        alert('Personal details saved!');
                    }}
                    className="space-y-5"
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <Input
                            title="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <Input
                            title="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <Input
                            title="Phone Number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        <Input
                            title="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="pt-2">
                        <button
                            type="submit"
                            className="px-6 py-2.5 bg-[#002E62] hover:bg-[#072440] text-white font-bold text-xs sm:text-sm rounded-lg transition-colors cursor-pointer shadow-2xs"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>

            {/* Section 2: BUSINESS DETAILS */}
            <div className="bg-white border border-[#BED3EB] rounded-2xl p-6 sm:p-8 shadow-2xs space-y-6">
                <h3 className="text-xs sm:text-sm font-bold text-[#002E62] uppercase tracking-wider">
                    BUSINESS DETAILS
                </h3>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        alert('Business details saved!');
                    }}
                    className="space-y-5"
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <Input
                            title="Business Name"
                            value={businessName}
                            onChange={(e) => setBusinessName(e.target.value)}
                        />
                        <Input
                            title="Phone Number"
                            value={businessPhone}
                            onChange={(e) => setBusinessPhone(e.target.value)}
                        />
                    </div>

                    <Input
                        title="Business Email"
                        type="email"
                        value={businessEmail}
                        onChange={(e) => setBusinessEmail(e.target.value)}
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-5">
                        <div className="sm:col-span-8">
                            <Input
                                title="Address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>
                        <div className="sm:col-span-4">
                            <Select
                                title="State"
                                value={stateVal}
                                options={STATE_OPTIONS}
                                onChange={(val) => setStateVal(val)}
                            />
                        </div>
                    </div>

                    <div className="pt-2">
                        <button
                            type="submit"
                            className="px-6 py-2.5 bg-[#002E62] hover:bg-[#072440] text-white font-bold text-xs sm:text-sm rounded-lg transition-colors cursor-pointer shadow-2xs"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>

            {/* Section 3: BANK DETAILS */}
            <div className="bg-white border border-[#BED3EB] rounded-2xl p-6 sm:p-8 shadow-2xs space-y-6">
                <h3 className="text-xs sm:text-sm font-bold text-[#002E62] uppercase tracking-wider">
                    BANK DETAILS
                </h3>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        alert('Bank details saved!');
                    }}
                    className="space-y-5"
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <Input
                            title="Account Name"
                            value={accountName}
                            onChange={(e) => setAccountName(e.target.value)}
                        />
                        <Select
                            title="Bank Name"
                            value={bankName}
                            options={BANK_OPTIONS}
                            onChange={(val) => setBankName(val)}
                        />
                    </div>

                    <Input
                        title="Account Number"
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                    />

                    <div className="pt-2">
                        <button
                            type="submit"
                            className="px-6 py-2.5 bg-[#002E62] hover:bg-[#072440] text-white font-bold text-xs sm:text-sm rounded-lg transition-colors cursor-pointer shadow-2xs"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>

            {/* Section 4: UPDATE PASSWORD */}
            <div className="bg-white border border-[#BED3EB] rounded-2xl p-6 sm:p-8 shadow-2xs space-y-4">
                <h3 className="text-xs sm:text-sm font-bold text-[#002E62] uppercase tracking-wider">
                    UPDATE PASSWORD
                </h3>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <p className="text-xs sm:text-sm text-[#64748B] max-w-xl leading-relaxed">
                        To change your password, click the button and follow the prompts to enter your current and new password.
                    </p>

                    <button
                        type="button"
                        onClick={() => setIsPasswordModalOpen(true)}
                        className="px-5 py-2.5 border border-[#BFDBFE] bg-[#EBF3FF] hover:bg-[#DBEAFE] text-[#002E62] font-bold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer whitespace-nowrap self-start sm:self-auto"
                    >
                        Change Password
                    </button>
                </div>
            </div>

            {/* Change Password Modal */}
            <ChangePasswordModal
                isOpen={isPasswordModalOpen}
                onClose={() => setIsPasswordModalOpen(false)}
            />
        </div>
    );
}
