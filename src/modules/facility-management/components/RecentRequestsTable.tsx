import type { MaintenanceRequest } from '../types/propertyManagement';
import Table, { type Column } from '@shared/components/Table/Table';
import StatusBadge from '@shared/components/Tag/StatusBadge';
import ContextMenu from '@shared/components/ContextMenu/ContextMenu';
import { FiMoreHorizontal, FiEye, FiUserCheck } from 'react-icons/fi';

export interface RecentRequestsTableProps {
    requests: MaintenanceRequest[];
    onViewDetails: (request: MaintenanceRequest) => void;
    onAssign: (request: MaintenanceRequest) => void;
}

export default function RecentRequestsTable({
    requests,
    onViewDetails,
    onAssign,
}: RecentRequestsTableProps) {
    const columns: Column<MaintenanceRequest>[] = [
        {
            key: 'id',
            label: 'ID',
            cellClassName: 'text-sm text-[#52525B] py-4 px-4',
            render: (val) => val,
        },
        {
            key: 'title',
            label: 'REQUEST NAME',
            cellClassName: 'text-sm font-semibold text-[#091E42] py-4 px-4',
            render: (val) => val,
        },
        {
            key: 'unit',
            label: 'UNIT NAME',
            cellClassName: 'text-sm text-[#52525B] py-4 px-4',
            render: (val) => val,
        },
        {
            key: 'tenantName',
            label: 'FULL NAME',
            cellClassName: 'text-sm text-[#52525B] py-4 px-4',
            render: (val) => val,
        },
        {
            key: 'serviceType',
            label: 'REQUEST TYPE',
            cellClassName: 'text-sm text-[#52525B] py-4 px-4',
            render: (val) => val,
        },
        {
            key: 'raisedOn',
            label: 'REQUEST DATE',
            cellClassName: 'text-sm text-[#52525B] py-4 px-4',
            render: (val) => val,
        },
        {
            key: 'status',
            label: 'STATUS',
            cellClassName: 'py-4 px-4',
            render: (_, item) => {
                const isAssigned =
                    item.status === 'Assigned' ||
                    item.status === 'In- Progress' ||
                    Boolean(item.assignedTo);
                const statusText = isAssigned ? 'Assigned' : 'Pending';

                if (!isAssigned) {
                    return (
                        <span className="inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-medium border transition-colors bg-[#F0FCFF] text-[#09AACD] border-[#D7F8FE]">
                            {statusText}
                        </span>
                    );
                }

                return <StatusBadge status={statusText} />;
            },
        },
        {
            key: 'action',
            label: 'ACTION',
            align: 'center',
            cellClassName: 'py-4 px-4 text-center',
            render: (_, item) => (
                <div className="flex justify-center">
                    <ContextMenu
                        trigger={
                            <button
                                type="button"
                                className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 text-slate-400 hover:text-slate-700 hover:border-gray-300 transition-colors cursor-pointer"
                                aria-label="Actions"
                            >
                                <FiMoreHorizontal className="h-4 w-4" />
                            </button>
                        }
                        align="right"
                        items={[
                            {
                                label: 'View Request',
                                icon: <FiEye className="h-4 w-4 text-[#093154]" />,
                                onClick: () => onViewDetails(item),
                            },
                            {
                                label: 'Assign Request',
                                icon: <FiUserCheck className="h-4 w-4 text-[#093154]" />,
                                onClick: () => onAssign(item),
                            },
                        ]}
                    />
                </div>
            ),
        },
    ];

    return (
        <div className="bg-white border border-[#E4E7EC] rounded-xl shadow-xs overflow-hidden">
            <Table
                columns={columns}
                data={requests}
                showPagination={false}
                emptyText="No maintenance requests found"
                headerRowClassName="bg-[#F8FAFC] border-b border-[#E4E7EC] text-[11px] font-semibold text-[#667085] tracking-wider uppercase"
                rowClassName="border-b border-[#F2F4F7] hover:bg-[#F9FAFB] transition-colors"
            />
        </div>
    );
}
