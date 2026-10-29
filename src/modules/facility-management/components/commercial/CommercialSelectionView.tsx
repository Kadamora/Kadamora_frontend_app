import { FiArrowUpRight, FiHome, FiTool, FiShield, FiUsers } from 'react-icons/fi';
import type { CommercialSection } from '../../types/commercialFacilities';

interface CommercialSelectionViewProps {
    onSelectSection: (section: CommercialSection) => void;
}

export default function CommercialSelectionView({ onSelectSection }: CommercialSelectionViewProps) {
    const cards = [
        {
            id: 'workspace-leasing' as CommercialSection,
            title: 'Workspace Leasing',
            description:
                'Lorem ipsum dolor sit amet consectetur. Nibh odio egestas tortor lorem laoreet eu volutpat.',
            icon: FiHome,
            iconBg: 'bg-[#E0F7FA]',
            iconColor: 'text-[#00BCD4]',
        },
        {
            id: 'corporate-maintenance' as CommercialSection,
            title: 'Corporate Maintenance',
            description:
                'Adipiscing odio erat ac ridiculus imperdiet. Ut morbi tortor non fringilla nec urna. Purus eu erat nunc nisl.',
            icon: FiTool,
            iconBg: 'bg-[#EDFCF4]',
            iconColor: 'text-[#12B76A]',
        },
        {
            id: 'enhanced-security' as CommercialSection,
            title: 'Enhanced Security',
            description:
                'Ut morbi tortor non fringilla nec urna. Purus eu erat nunc nisl. Massa commodo in sed mattis.',
            icon: FiShield,
            iconBg: 'bg-[#FEE4E2]',
            iconColor: 'text-[#F04438]',
        },
        {
            id: 'tenant-management' as CommercialSection,
            title: 'Corporate Tenant Management',
            description:
                'Adipiscing odio erat ac ridiculus imperdiet. Ut morbi tortor non fringilla nec urna.',
            icon: FiUsers,
            iconBg: 'bg-[#FEF7EC]',
            iconColor: 'text-[#F79009]',
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
            {cards.map((card) => {
                const Icon = card.icon;
                return (
                    <div
                        key={card.id}
                        onClick={() => onSelectSection(card.id)}
                        className="group relative bg-white border border-[#BED3EB] rounded-2xl p-6 sm:p-7 hover:shadow-md hover:border-[#96BEEB] transition-all cursor-pointer space-y-4 flex flex-col justify-between"
                    >
                        <div className="flex items-start justify-between">
                            <div
                                className={`h-12 w-12 rounded-full ${card.iconBg} ${card.iconColor} flex items-center justify-center shrink-0`}
                            >
                                <Icon className={`h-6 w-6 ${card.iconColor}`} />
                            </div>
                            <FiArrowUpRight className="h-5 w-5 text-[#71717A] group-hover:text-[#002E62] transition-colors" />
                        </div>

                        <div className="space-y-2">
                            <h3 className="text-lg sm:text-xl font-bold text-[#002E62]">
                                {card.title}
                            </h3>
                            <p className="text-xs sm:text-sm text-[#71717A] leading-relaxed">
                                {card.description}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
