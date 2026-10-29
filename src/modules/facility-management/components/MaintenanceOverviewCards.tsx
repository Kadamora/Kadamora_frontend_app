import { FiList, FiTool, FiCalendar, FiCheckCircle } from 'react-icons/fi';

export interface MaintenanceOverviewCardsProps {
    activeStatus: 'Pending' | 'In- Progress' | 'Scheduled' | 'Completed';
    onSelectStatus: (status: 'Pending' | 'In- Progress' | 'Scheduled' | 'Completed') => void;
    counts: {
        pending: string;
        inProgress: string;
        scheduled: string;
        completed: string;
    };
}

export default function MaintenanceOverviewCards({
    onSelectStatus,
    counts,
}: MaintenanceOverviewCardsProps) {
    const cards = [
        {
            status: 'Pending' as const,
            label: 'Pending',
            value: counts.pending,
            iconBg: 'bg-[#E0F2FE]',
            iconColor: 'text-[#0284C7]',
            icon: <FiList className="h-5 w-5 text-[#0284C7]" />,
        },
        {
            status: 'In- Progress' as const,
            label: 'In- Progress',
            value: counts.inProgress,
            iconBg: 'bg-[#E6F6EE]',
            iconColor: 'text-[#12B76A]',
            icon: <FiTool className="h-5 w-5 text-[#12B76A]" />,
        },
        {
            status: 'Scheduled' as const,
            label: 'Scheduled',
            value: counts.scheduled,
            iconBg: 'bg-[#EFF6FF]',
            iconColor: 'text-[#3B82F6]',
            icon: <FiCalendar className="h-5 w-5 text-[#3B82F6]" />,
        },
        {
            status: 'Completed' as const,
            label: 'Completed',
            value: counts.completed,
            iconBg: 'bg-[#FEF3C7]',
            iconColor: 'text-[#D97706]',
            icon: <FiCheckCircle className="h-5 w-5 text-[#D97706]" />,
        },
    ];

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {cards.map((card) => {
                return (
                    <div
                        key={card.status}
                        onClick={() => onSelectStatus(card.status)}
                        className={`rounded-lg border border-[#E4E4E7] p-4 sm:p-5 flex  gap-4 transition-all cursor-pointer`}
                    >
                        <div
                            className={`h-12 w-12 rounded-full ${card.iconBg} flex items-center justify-center shrink-0`}
                        >
                            {card.icon}
                        </div>
                        <div>
                            <span className="block text-xs font-medium text-[#64748B]">
                                {card.label}
                            </span>
                            <span className="block text-xl font-semibold text-[#091E42]">
                                {card.value}
                            </span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
