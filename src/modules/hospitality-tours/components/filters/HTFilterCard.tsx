import type { ReactNode } from 'react';

interface HTFilterCardProps {
    title: string;
    children: ReactNode;
    className?: string;
}

export default function HTFilterCard({
    title,
    children,
    className = '',
}: HTFilterCardProps) {
    return (
        <section
            className={`overflow-hidden rounded-xl border border-[#CFE2FF] bg-white ${className}`}
        >
            {/* Card Header */}
            <div className="flex min-h-[40px] items-center bg-[#F3F4F9] px-3.5">
                <h3 className="text-[12px] font-semibold leading-none text-[#091E42]">
                    {title}
                </h3>
            </div>

            {/* Card Content */}
            <div className="px-3.5 py-3.5">
                {children}
            </div>
        </section>
    );
}