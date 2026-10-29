import { FiMoreHorizontal } from 'react-icons/fi';
import type { CommercialMaintenanceRequest } from '../../types/commercialFacilities';

interface MaintenanceRequestsTableProps {
    requests: CommercialMaintenanceRequest[];
    onCreateRequest: () => void;
    onViewAction?: (request: CommercialMaintenanceRequest) => void;
}

export default function MaintenanceRequestsTable({
    requests,
    onCreateRequest,
    onViewAction,
}: MaintenanceRequestsTableProps) {
    const renderStatusBadge = (status: CommercialMaintenanceRequest['status']) => {
        if (status === 'Assigned') {
            return (
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#EDFCF4] text-[#12B76A] border border-[#A6F4C5]">
                    Assigned
                </span>
            );
        }
        return (
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#E6F4FB] text-[#0EA5E9] border border-[#BAE6FD]">
                Pending
            </span>
        );
    };

    return (
        <div className="bg-white rounded-2xl border border-[#BED3EB] p-5 sm:p-6 shadow-xs space-y-5">
            {/* Table Header Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h3 className="text-base sm:text-lg font-bold text-[#002E62]">
                        Active Maintenance Requests
                    </h3>
                    <p className="text-xs text-[#71717A] mt-0.5">
                        Track and manage all maintenance and service requests
                    </p>
                </div>

                <button
                    type="button"
                    onClick={onCreateRequest}
                    className="bg-[#002E62] hover:bg-[#002047] text-white px-5 py-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer shadow-xs self-start sm:self-auto shrink-0"
                >
                    Create Request
                </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                    <thead>
                        <tr className="border-b border-[#F0F2F5] text-[#71717A] font-semibold">
                            <th className="py-3 px-3">ID</th>
                            <th className="py-3 px-3">REQUEST TITLE</th>
                            <th className="py-3 px-3">PROPERTY</th>
                            <th className="py-3 px-3">FULL NAME</th>
                            <th className="py-3 px-3">REQUEST TYPE</th>
                            <th className="py-3 px-3">REQUEST DATE</th>
                            <th className="py-3 px-3">REQUEST STATUS</th>
                            <th className="py-3 px-3 text-center">ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map((req, idx) => (
                            <tr
                                key={req.id}
                                className={`transition-colors ${
                                    idx % 2 === 0 ? 'bg-[#F9FAFC]' : 'bg-white'
                                } hover:bg-[#F0F6FF]/60`}
                            >
                                <td className="py-3.5 px-3 text-[#71717A] font-medium">{req.id}</td>
                                <td className="py-3.5 px-3 font-bold text-[#002E62]">{req.title}</td>
                                <td className="py-3.5 px-3 text-[#52525B]">{req.property}</td>
                                <td className="py-3.5 px-3 text-[#52525B]">{req.fullName}</td>
                                <td className="py-3.5 px-3 text-[#52525B]">{req.requestType}</td>
                                <td className="py-3.5 px-3 text-[#71717A]">{req.requestDate}</td>
                                <td className="py-3.5 px-3">{renderStatusBadge(req.status)}</td>
                                <td className="py-3.5 px-3 text-center">
                                    <button
                                        type="button"
                                        onClick={() => onViewAction?.(req)}
                                        className="h-7 w-7 rounded-full border border-[#E2E8F0] text-[#71717A] hover:text-[#002E62] hover:bg-slate-100 inline-flex items-center justify-center transition-colors cursor-pointer"
                                        aria-label="Actions"
                                    >
                                        <FiMoreHorizontal className="h-4 w-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
