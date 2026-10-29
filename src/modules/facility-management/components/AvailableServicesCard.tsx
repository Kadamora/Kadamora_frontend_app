import React from 'react';
import { FiChevronRight } from 'react-icons/fi';
import type { ServiceType } from '../types/propertyManagement';

export interface AvailableServicesCardProps {
    selectedService: ServiceType | 'All';
    onSelectService: (service: ServiceType) => void;
}

interface ServiceItem {
    id: ServiceType;
    title: string;
    description: string;
    icon: React.ReactNode;
    bubbleBg?: string;
    bubbleColor?: string;
}

const SERVICES: ServiceItem[] = [
    {
        id: 'Plumbing',
        title: 'Plumbing',
        description: 'Installation, repair, and upkeep of water supply, drainage, and waste systems for homes',
        icon: <img src="/assets/icons/PMPlumbing.svg" alt="Plumbing" className="h-10 w-10 shrink-0" />,
        bubbleBg: 'bg-[#E8F1FD]',
        bubbleColor: 'text-[#2563EB]',
    },
    {
        id: 'Electrical',
        title: 'Electrical',
        description: 'Installation, repair, and maintenance of electrical systems and electrical wiring for homes',
        icon: <img src="/assets/icons/PMElectrical.svg" alt="Electrical" className="h-10 w-10 shrink-0" />,
        bubbleBg: 'bg-[#E6F4FB]',
        bubbleColor: 'text-[#0EA5E9]',
    },
    {
        id: 'HVAC',
        title: 'HVAC',
        description: 'Installation, repair, and maintenance of heating, ventilation, and AC systems for home',
        icon: <img src="/assets/icons/PMHvac.svg" alt="HVAC" className="h-10 w-10 shrink-0" />,
        bubbleBg: 'bg-[#E6F6EE]',
        bubbleColor: 'text-[#12B76A]',
    },
    {
        id: 'General Maintenance',
        title: 'General Maintenance',
        description: 'Installation, repair, and maintenance of heating, ventilation, and AC systems for homes',
        icon: <img src="/assets/icons/PMGeneral.svg" alt="General Maintenance" className="h-10 w-10 shrink-0" />,
        bubbleBg: 'bg-[#FDECF3]',
        bubbleColor: 'text-[#EC4899]',
    },
];

export default function AvailableServicesCard({
    selectedService,
    onSelectService,
}: AvailableServicesCardProps) {
    return (
        <section className="bg-white border border-[#E4E4E7] rounded-lg p-4 sm:p-5 shadow-xs">
            <div className="mb-4">
                <h3 className="text-base sm:text-lg font-bold text-[#093154]">Available Services</h3>
                <p className="text-xs text-[#6B7280] mt-0.5">
                    Click on a service to view it available request or log request
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {SERVICES.map((s) => {
                    const isSelected = selectedService === s.id;
                    return (
                        <div
                            key={s.id}
                            onClick={() => onSelectService(s.id)}
                            className={`rounded-lg border p-4 transition-all cursor-pointer group flex flex-col justify-between hover:shadow-md hover:-translate-y-0.5 ${
                                isSelected
                                    ? 'border-[#002E62] bg-[#F4F8FC] ring-2 ring-[#002E62]/10'
                                    : 'border-[#E4E4E7] bg-white hover:border-[#BED3EB]'
                            }`}
                        >
                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <span className="shrink-0 flex items-center justify-center">
                                        {s.icon}
                                    </span>
                                    <FiChevronRight className="h-4 w-4 text-[#002E62] group-hover:text-[#093154] group-hover:translate-x-0.5 transition-all" />
                                </div>
                                <h4 className="text-sm font-semibold text-[#52525B] mb-1.5">{s.title}</h4>
                                <p className="text-xs text-[#71717A] leading-relaxed line-clamp-3">
                                    {s.description}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
