import Modal from '@shared/components/Modal/Modal';
import { FiUsers, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import type { AccessControlLogItem } from '../../../types/commercialFacilities';

interface AccessControlLogsModalProps {
    isOpen: boolean;
    onClose: () => void;
    logs: AccessControlLogItem[];
}

export default function AccessControlLogsModal({
    isOpen,
    onClose,
    logs,
}: AccessControlLogsModalProps) {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={
                <div className="flex items-center gap-2.5">
                    <div className="h-9 w-9 rounded-full bg-[#F3E8FF] text-[#9333EA] flex items-center justify-center">
                        <FiUsers className="w-4 h-4" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-[#002E62]">
                            Access Control Logs
                        </h3>
                        <p className="text-xs text-[#71717A] font-normal">
                            Monitor building access, turnstile credentials, and entry/exit records
                        </p>
                    </div>
                </div>
            }
            maxWidth="max-w-[680px]"
        >
            <div className="overflow-x-auto pt-2">
                <table className="w-full text-left border-collapse text-xs">
                    <thead>
                        <tr className="border-b border-[#F0F2F5] text-[11px] font-bold text-[#71717A] uppercase tracking-wider">
                            <th className="py-2.5 px-3">Person / Badge</th>
                            <th className="py-2.5 px-3">Role</th>
                            <th className="py-2.5 px-3">Access Point</th>
                            <th className="py-2.5 px-3">Timestamp</th>
                            <th className="py-2.5 px-3 text-center">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F0F2F5]">
                        {logs.map((log) => (
                            <tr key={log.id} className="hover:bg-[#F9FAFC] transition-colors">
                                <td className="py-3 px-3">
                                    <div className="font-bold text-[#18181B]">{log.userName}</div>
                                    <div className="text-[10px] text-[#71717A] font-mono">{log.badgeId}</div>
                                </td>
                                <td className="py-3 px-3">
                                    <span
                                        className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                                            log.userRole === 'Tenant'
                                                ? 'bg-[#E0F2FE] text-[#0284C7]'
                                                : log.userRole === 'Staff'
                                                ? 'bg-[#DCFCE7] text-[#16A34A]'
                                                : 'bg-[#FEF3C7] text-[#D97706]'
                                        }`}
                                    >
                                        {log.userRole}
                                    </span>
                                </td>
                                <td className="py-3 px-3 text-[#52525B]">
                                    <div className="font-medium text-[#18181B]">{log.accessPoint}</div>
                                    <div className="text-[10px] text-[#71717A]">{log.property}</div>
                                </td>
                                <td className="py-3 px-3 text-[#71717A] font-medium">
                                    {log.timestamp}
                                </td>
                                <td className="py-3 px-3 text-center">
                                    {log.status === 'Granted' ? (
                                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#12B76A] bg-[#ECFDF3] border border-[#ABEFC6] px-2.5 py-0.5 rounded-full">
                                            <FiCheckCircle className="w-3 h-3" />
                                            Granted
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#F04438] bg-[#FEF3F2] border border-[#FECDCA] px-2.5 py-0.5 rounded-full">
                                            <FiXCircle className="w-3 h-3" />
                                            Denied
                                        </span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Modal>
    );
}
