import OnboardingAgentFlowModal from '@pages/Dashboard/PropertyListing/Home/components/OnboardingAgent/OnboardingAgentFlowModal';
import { useCallback, useState } from 'react';
import { Link } from 'react-router';
import { Eye, Search } from 'lucide-react';
import { useGetAdminAgentQuery } from '@store/api/admin.api';

type TabType = 'new' | 'verified';

export interface Agent {
    id: string;
    agencyCompanyName: string;
    position: string;
    areaOfOperation: string;
    registrationLicenseNumber: string;
    yearsOfExperience: number;
    status: 'pending' | 'verified' | 'rejected';
}

interface AgentsTableContentProps {
    activeTab: TabType;
}

function AgentsTableContent({ activeTab }: AgentsTableContentProps) {
    const { data: adminAgentData, isLoading, isFetching } = useGetAdminAgentQuery()
    const allAgents = adminAgentData?.data ?? [];
    const filteredAgents = allAgents.filter((agent: Agent) => {
        if (activeTab === 'new') return agent.status !== 'verified';
        if (activeTab === 'verified') return agent.status === 'verified';
        return true;
    });

    const isEmpty = !isLoading && filteredAgents.length === 0;
    // Skeleton row component
    const SkeletonRow = () => (
        <tr className="animate-pulse">
            {[...Array(6)].map((_, i) => (
                <td key={i} className="px-6 py-4">
                    <div
                        className={`h-5 bg-gray-200 rounded ${i === 0 ? 'w-40' : i === 5 ? 'w-8 h-8 mx-auto' : 'w-24'
                            }`}
                    />
                </td>
            ))}
        </tr>
    );
    return (
        <div className="bg-white rounded-2xl border border-[#E4E7EC] mt-8">
            <div className="flex items-center justify-between px-6 py-4 ">
                <h3 className="text-sm font-Medium">AGENTS / REALTORS</h3>
                <div className='relative flex items-center gap-2'>
                    <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-[#D0D5DD]' />
                    <input
                        placeholder="Search"
                        className="border border-[#D0D5DD] rounded-lg px-3 py-2 pl-10 text-sm w-[260px] focus:outline-none"
                    />
                </div>
            </div>


            <div className="min-h-[320px] relative">
                {isLoading || isFetching ? (
                    <table className="w-full text-sm">
                        <thead className="text-left text-[#667085]">
                            <tr>
                                <th className="pl-6 pr-2 py-4">Company Name</th>
                                <th>Position</th>
                                <th>Location of Operation</th>
                                <th>Registration Number</th>
                                <th>Years of Experience</th>
                                <th className="text-center pl-2 pr-6 py-4">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[...Array(6)].map((_, i) => (
                                <SkeletonRow key={i} />
                            ))}
                        </tbody>
                    </table>
                ) : isEmpty ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-10">
                        <h4 className="text-3xl font-semibold text-secondary mb-2">
                            No {activeTab === 'new' ? 'new applications' : 'verified agents'} yet
                        </h4>
                        <p className="text-sm text-[#667085] max-w-md">
                            {activeTab === 'new'
                                ? "When new agents apply, they'll appear here for review."
                                : "Verified agents will show up here once approved."}
                        </p>
                    </div>
                ) : (
                    <table className="w-full text-sm">
                        <thead className="text-left text-[#667085] sticky top-0">
                            <tr>
                                <th className="pl-6 pr-2 py-4">Company Name</th>
                                <th className="px-2 py-4">Position</th>
                                <th className="px-2 py-4">Location of Operation</th>
                                <th className="px-2 py-4">Registration Number</th>
                                <th className="px-2 py-4">Years of Experience</th>
                                <th className="text-center pl-2 pr-6 py-4">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAgents.map((agent: Agent, idx: number) => (
                                <tr
                                    key={agent.id}
                                    className={`text-[#667085]
                    hover:bg-emerald-50/40 transition-colors
                    ${idx % 2 === 0 ? 'bg-gray-100' : 'bg-white'}
                  `}
                                >
                                    <td className="pl-6 pr-2 py-4 font-medium ">
                                        {agent.agencyCompanyName}
                                    </td>
                                    <td className="capitalize ">{agent.position.replace('_', ' ')}</td>
                                    <td className="px-2 py-4">{agent.areaOfOperation}</td>
                                    <td className="px-2 py-4">{agent.registrationLicenseNumber}</td>
                                    <td className="px-2 py-4">
                                        {agent.yearsOfExperience.toString().padStart(2, '0')}
                                    </td>
                                    <td className="text-center pl-2 pr-6">
                                        <Link
                                            to={`/admin/agents/${agent.id}`}
                                            className="inline-flex items-center justify-center h-8 w-8 rounded-full hover:bg-emerald-100 transition-colors"
                                            aria-label="View agent details"
                                        >
                                            <Eye className="h-4 w-4 text-emerald-700" />
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

        </div>
    );
}

export default function AdminAgentRealtor() {
    const [activeTab, setActiveTab] = useState<TabType>('new');
    const [onboardingOpen, setOnboardingOpen] = useState(false);
    const [onboardingStep, setOnboardingStep] = useState(1);

    const openOnboardingFlow = useCallback(() => {
        setOnboardingStep(1);
        setOnboardingOpen(true);
    }, []);

    return (
        <div className="p-6">
            <div>
                <h1 className="text-3xl font-semibold text-secondary">Agents / Realtors</h1>
                <p className="text-gray-600 mt-2">Here's what's happening with your business today</p>
            </div>
            <div className="flex justify-between my-6 bg-white p-2">
                {/* Tabs */}
                <div className="flex items-center gap-3 ">
                    <button
                        onClick={() => setActiveTab('new')}
                        className={`px-4 h-11 rounded-lg text-sm font-semibold transition
            ${activeTab === 'new'
                                ? 'bg-blue-50 text-secondary font-semibold border border-blue-200'
                                : 'border border-[#E4E7EC] text-[#667085] hover:bg-gray-50'
                            }
          `}
                    >
                        New Application
                    </button>

                    <button
                        onClick={() => setActiveTab('verified')}
                        className={`px-4 h-11 rounded-lg text-sm font-semibold transition
            ${activeTab === 'verified'
                                ? 'bg-blue-50 text-secondary font-semibold border border-blue-200'
                                : 'border border-[#E4E7EC] text-[#667085] hover:bg-gray-50'
                            }
          `}
                    >
                        Verified Agents
                    </button>
                </div>
                {/* Add New Agent */}
                <button
                    onClick={() => openOnboardingFlow()}
                    className="h-11 px-5 rounded-lg bg-secondary text-white text-sm font-medium hover:opacity-90 transition"
                >
                    Add New Agent
                </button>
            </div>
            {activeTab === 'new' && <AgentsTableContent activeTab={activeTab} />}
            {activeTab === 'verified' && <AgentsTableContent activeTab={activeTab} />}
            <OnboardingAgentFlowModal
                open={onboardingOpen}
                step={onboardingStep}
                goTo={setOnboardingStep}
                onClose={() => setOnboardingOpen(false)}
            />
        </div>
    );
}
