import { useState } from 'react';
import ProfileBanner from '@shared/components/Settings/ProfileBanner';
import ChangePasswordModal from '@shared/components/Settings/ChangePasswordModal';
import Input from '@shared/components/Forms/Input';
import Select from '@shared/components/Forms/Select';
import { showSuccessToast } from '@shared/components/Toast/Toast';
import { initialPersonalDetails, stateOptions } from '../../data/settingsMock';
import type { PersonalDetailsData } from '../../types/settings';

export default function FMProfileTabView() {
    const [personalDetails, setPersonalDetails] =
        useState<PersonalDetailsData>(initialPersonalDetails);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

    const handleSavePersonalDetails = (e: React.FormEvent) => {
        e.preventDefault();
        showSuccessToast('Profile Saved', 'Your personal details have been updated successfully.');
    };

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header Profile Banner */}
            <ProfileBanner
                initials="CM"
                name="Charles Micheal"
                email="Charlesjames@gmail.com"
                onUpload={() =>
                    showSuccessToast('Upload Triggered', 'Select an image to update your profile photo.')
                }
            />

            {/* Section 1: PERSONAL DETAILS */}
            <div className="bg-white border border-[#BED3EB] rounded-2xl p-6 sm:p-8 shadow-2xs space-y-6">
                <h3 className="text-xs sm:text-sm font-bold text-[#002E62] uppercase tracking-wider">
                    PERSONAL DETAILS
                </h3>

                <form onSubmit={handleSavePersonalDetails} className="space-y-5">
                    {/* First & Last Name */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <Input
                            title="First Name"
                            value={personalDetails.firstName}
                            onChange={(e) =>
                                setPersonalDetails((prev) => ({
                                    ...prev,
                                    firstName: e.target.value,
                                }))
                            }
                        />
                        <Input
                            title="Last Name"
                            value={personalDetails.lastName}
                            onChange={(e) =>
                                setPersonalDetails((prev) => ({
                                    ...prev,
                                    lastName: e.target.value,
                                }))
                            }
                        />
                    </div>

                    {/* Email */}
                    <Input
                        title="Email"
                        type="email"
                        value={personalDetails.email}
                        onChange={(e) =>
                            setPersonalDetails((prev) => ({
                                ...prev,
                                email: e.target.value,
                            }))
                        }
                    />

                    {/* Phone & State */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <Input
                            title="Phone Number"
                            value={personalDetails.phone}
                            onChange={(e) =>
                                setPersonalDetails((prev) => ({
                                    ...prev,
                                    phone: e.target.value,
                                }))
                            }
                        />
                        <Select
                            title="State"
                            value={personalDetails.state}
                            options={stateOptions}
                            onChange={(val) =>
                                setPersonalDetails((prev) => ({
                                    ...prev,
                                    state: val,
                                }))
                            }
                        />
                    </div>

                    {/* Submit Button */}
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

            {/* Section 2: UPDATE PASSWORD */}
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
                        className="px-5 py-2.5 border border-[#BFDBFE] bg-[#EBF3FF] hover:bg-[#DBEAFE] text-[#002E62] font-bold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer whitespace-nowrap self-start sm:self-auto shadow-2xs"
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
