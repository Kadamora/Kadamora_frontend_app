import { FiCheckCircle } from 'react-icons/fi';

export interface FreeServicesCardProps {
    title?: string;
    description?: string;
    services?: string[];
    className?: string;
}

export default function FreeServicesCard({
    title = 'Free Services',
    description = 'Subscribe to exactly what you need. Manage your space, book services, or build projects—all in one place',
    services = [
        'Hospitality and Tours',
        'Procurement and Supply',
        'Property listing for sale/rent/short stay lease',
        'Equipment listing for rent & sale',
        'Equipment services and spare parts sales',
        'Professional services',
    ],
    className = '',
}: FreeServicesCardProps) {
    return (
        <div
            className={`relative bg-white rounded-2xl p-6 sm:p-7 border border-[#E2E8F0] shadow-2xs overflow-hidden ${className}`}
        >
            {/* Green left accent border bar */}
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#12B76A] rounded-r-md" />

            <div className="pl-2">
                <h2 className="text-base sm:text-lg font-bold text-[#002E62]">
                    {title}
                </h2>
                <p className="text-xs sm:text-sm text-[#71717A] mt-1 mb-5 leading-relaxed">
                    {description}
                </p>

                <div className="space-y-3">
                    {services.map((service, index) => (
                        <div key={index} className="flex items-center gap-3">
                            <FiCheckCircle className="h-4 w-4 text-[#12B76A] shrink-0" />
                            <span className="text-xs sm:text-sm font-medium text-[#1E293B]">
                                {service}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
