import React, { useState, useEffect, useRef } from 'react';
import Input from '@components/forms/Input';
// import Select from '@components/forms/Select';
import { useUpdateAgentProfileMutation } from '@store/api/agentSettings.api';
import { useUploadFilesMutation } from '@store/api/upload.api';
import ChangePasswordModal from './ChangePasswordModal';
import { Loader2, Camera } from 'lucide-react';

interface ProfileSettingsProps {
    user: any;
    isLoading?: boolean;
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({ user, isLoading }) => {
    const [firstName, setFirstName] = useState(user?.firstName || '');
    const [lastName, setLastName] = useState(user?.lastName || '');
    const [email, setEmail] = useState(user?.email || '');
    const [phone, setPhone] = useState(user?.phoneNumber || '');
    // const [stateVal, setStateVal] = useState(user?.state || '');
    const [imgUrl, setImgUrl] = useState(user?.imgUrl || '');
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [updateProfile, { isLoading: isSaving }] = useUpdateAgentProfileMutation();
    const [uploadFiles, { isLoading: isUploading }] = useUploadFilesMutation();

    // Sync state when API data arrives
    useEffect(() => {
        if (user) {
            setFirstName(user.firstName || '');
            setLastName(user.lastName || '');
            setEmail(user.email || '');
            setPhone(user.phoneNumber || '');
            // setStateVal(user.state || '');
            setImgUrl(user.imgUrl || '');
        }
    }, [user]);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('files', file);

        try {
            const res = await uploadFiles(formData).unwrap();
            if (res.data.urls && res.data.urls.length > 0) {
                setImgUrl(res.data.urls[0]);
            }
        } catch (err) {
            console.error('Failed to upload image:', err);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await updateProfile({ 
                firstName, 
                lastName, 
                // email, 
                phoneNumber: phone, 
                imgUrl 
            }).unwrap();
        } catch (err) {
            console.error('Failed to save profile:', err);
        }
    };

    const initials = `${firstName[0] || ''}${lastName[0] || ''}`.toUpperCase();
    const fullName = `${firstName} ${lastName}`;

    return (
        <div className="w-full bg-white rounded-xl shadow-sm border border-[#E4E7EC] overflow-hidden">
            {/* Banner Section */}
            <div className="relative w-full h-[120px] bg-[#002E62] overflow-hidden">
                {/* Decorative background pattern (CSS approximation) */}
                <div 
                    className="absolute inset-0 opacity-20 pointer-events-none"
                    style={{ 
                        backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 1px)`, 
                        backgroundSize: '24px 24px' 
                    }}
                />
                <div className="absolute inset-0 flex items-center justify-between px-8 z-10">
                    <div className="flex items-center gap-4">
                        <div className="relative group">
                            {imgUrl ? (
                                <img 
                                    src={imgUrl} 
                                    alt={fullName} 
                                    className="w-[70px] h-[70px] rounded-full object-cover border-4 border-white/20"
                                />
                            ) : (
                                <div className="w-[70px] h-[70px] rounded-full bg-[#E6F0F9] text-[#002E62] text-[24px] font-bold flex items-center justify-center border-4 border-white/20">
                                    {initials}
                                </div>
                            )}
                            {isUploading && (
                                <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 text-white">
                                    <Loader2 className="w-6 h-6 animate-spin" />
                                </div>
                            )}
                        </div>
                        <div className="text-white">
                            <h2 className="text-[20px] font-bold">{fullName}</h2>
                            <p className="text-[14px] opacity-90">{email}</p>
                        </div>
                    </div>
                    <div>
                        <input 
                            type="file" 
                            ref={fileInputRef}
                            className="hidden" 
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                        <button 
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={isUploading}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white text-[#002E62] font-bold text-[14px] hover:bg-[#F8FAFC] transition-all shadow-sm disabled:opacity-70"
                        >
                            {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Camera className="w-4 h-4" />}
                            {isUploading ? 'Uploading...' : 'Upload Profile'}
                        </button>
                    </div>
                </div>
            </div>

            <div className="p-8">
                {/* Personal Details Form */}
                <div className="mb-10">
                    <h3 className="text-[14px] font-bold text-[#002E62] tracking-wider uppercase mb-5">
                        PERSONAL DETAILS
                    </h3>
                    <form className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                        <Input
                            title="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <Input
                                title="Phone Number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                            {/* State commented out as requested
                            <Select
                                title="State"
                                options={stateOptions}
                                value={stateVal}
                                onChange={(val: string) => setStateVal(val)}
                            />
                            */}
                        </div>
                        <div className="pt-2">
                            <button
                                type="button"
                                onClick={handleSave}
                                disabled={isSaving || isLoading}
                                className="px-6 py-2.5 rounded-lg bg-[#002E62] text-white font-semibold text-[15px] hover:bg-[#003d82] transition-colors disabled:opacity-60"
                            >
                                {isSaving ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </form>
                </div>

                <hr className="border-[#E4E7EC] mb-10" />

                {/* Update Password */}
                <div>
                    <h3 className="text-[14px] font-bold text-[#002E62] tracking-wider uppercase mb-5">
                        UPDATE PASSWORD
                    </h3>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <p className="text-[#64748B] text-[14.5px] max-w-xl leading-relaxed">
                            To change your password, click the button and follow the prompts to enter your current and new password.
                        </p>
                        <button
                            type="button"
                            onClick={() => setIsPasswordModalOpen(true)}
                            className="px-6 py-2.5 rounded-lg border border-[#0A66B2] text-[#0A66B2] font-semibold text-[14px] hover:bg-[#F0F7FF] transition-colors whitespace-nowrap"
                        >
                            Change Password
                        </button>
                    </div>
                </div>
            </div>

            <ChangePasswordModal 
                isOpen={isPasswordModalOpen}
                onClose={() => setIsPasswordModalOpen(false)}
            />
        </div>
    );
};

export default ProfileSettings;
