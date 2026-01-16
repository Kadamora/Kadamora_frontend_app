import CloseButton from '@pages/Dashboard/PropertyListing/Home/components/OnboardingAgent/components/CloseButton';
import React from 'react';
import StepProgress from './StepProgress';

interface AgentDetails {
    id: string;
    agencyCompanyName: string;
    position: string;
    areaOfOperation: string;
    registrationLicenseNumber: string;
    yearsOfExperience: number;
    linkedinProfile
: number;
    website: string;
    bio: string;
    email: string;
    phone: string;
    registrationDate: string;
    status: 'pending' | 'verified' | 'rejected';
}

interface ProfessionalDetailsProps {
    agent: AgentDetails;
    current: number;
    onClose: () => void;
    onApprove: () => void;
    onDecline: () => void;
    onNext: () => void;
}

const ProfessionalDetails: React.FC<ProfessionalDetailsProps> = ({
    agent,
    current,
    onClose,
    onApprove,
    onDecline
}) => {
    return (
        <div className="w-full overflow-hidden flex flex-col md:flex-row">
            {/* Sidebar */}
            <div className="hidden md:block p-8">
                <StepProgress current={current} />
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col bg-white border border-[#EDF1F5] rounded-md">
                {/* Header */}
                <div className="h-16 flex items-center justify-between px-8 border-b border-[#EDF1F5]">
                    <h3 className="font-semibold text-secondary">Professional Details</h3>
                    <CloseButton onClick={onClose} />
                </div>

                {/* Mobile Header */}
                <div className="md:hidden p-6 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-secondary">Professional Details</h3>
                        <span className="text-sm text-[#64748B] font-medium">{current}/2</span>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-6 overflow-y-auto">

                    {/* Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Left Column */}
                        <div className="space-y-6">
                            <div>
                                <div className="text-[13px] leading-[1.55] tracking-[0.2px] text-[#3F3F46] mb-2">
                                    <span>Agency/Company Name</span>
                                </div>
                                <p className=" font-semibold text-secondary">{agent.agencyCompanyName}</p>
                            </div>

                            <div>
                                <div className="text-[13px] leading-[1.55] tracking-[0.2px] text-[#3F3F46] mb-2">
                                    <span>Years Of Experience in Real Estate</span>
                                </div>
                                <p className=" font-semibold text-secondary">
                                    {agent.yearsOfExperience.toString().padStart(2, '0')}
                                </p>
                            </div>

                            <div>
                                <div className="text-[13px] leading-[1.55] tracking-[0.2px] text-[#3F3F46] mb-2">
                                    <span>Registration Number</span>
                                </div>
                                <p className=" font-semibold text-secondary">{agent.registrationLicenseNumber}</p>
                            </div>

                            <div>
                                <div className="text-[13px] leading-[1.55] tracking-[0.2px] text-[#3F3F46] mb-2">
                                    <span>Website URL</span>
                                </div>
                                <a
                                    href={`https://${agent.website}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className=" font-semibold text-secondary hover:text-emerald-600 transition"
                                >
                                    {agent.website || "N/A"}
                                </a>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-6">
                            <div>
                                <div className="text-[13px] leading-[1.55] tracking-[0.2px] text-[#3F3F46] mb-2">
                                    <span>Position</span>
                                </div>
                                <p className=" font-semibold text-secondary capitalize">{agent.position.replace('_', ' ')}</p>
                            </div>

                            <div>
                                <div className="text-[13px] leading-[1.55] tracking-[0.2px] text-[#3F3F46] mb-2">
                                    <span>Area/ Location Of Operation</span>
                                </div>
                                <p className=" font-semibold text-secondary">{agent.areaOfOperation}</p>
                            </div>

                            <div>
                                <div className="text-[13px] leading-[1.55] tracking-[0.2px] text-[#3F3F46] mb-2">
                                    <span>Linkedin URL</span>
                                </div>
                                <p className=" font-semibold text-secondary">{agent.linkedinProfile
 || "N/A"}</p>
                            </div>
                        </div>
                    </div>

                    {/* Bio Section */}
                    <div className="mt-6">
                        <div className="text-[13px] leading-[1.55] tracking-[0.2px] text-[#3F3F46] mb-2">
                            <span>Bio</span>
                        </div>
                        <p className="text-[13px] leading-[1.55] tracking-[0.2px] text-[#3F3F46]">{agent.bio || "N/A"}</p>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-8 pt-8 flex justify-start gap-4">
                        <button
                            onClick={onApprove}
                            className="flex items-center justify-center gap-2 px-4 py-2 bg-[#0073F1] text-[14px] text-white rounded-lg font-medium hover:bg-[#0073F1]/80 transition"
                        >
                            Approve
                        </button>

                        <button
                            onClick={onDecline}
                            className="flex items-center justify-center gap-2 px-4 py-2 text-white text-[14px] rounded-lg font-medium bg-[#F21B60] hover:bg-[#F21B60]/80 transition"
                        >
                            Decline
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfessionalDetails;