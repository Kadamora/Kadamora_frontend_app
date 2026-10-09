import React from 'react';

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
    text?: string;
    required?: boolean;
    containerClassName?: string;
}

export default function Label({
    text,
    children,
    required,
    className = '',
    containerClassName = '',
    ...props
}: LabelProps) {
    const content = text || children;

    if (!content) return null;

    return (
        <div className={containerClassName}>
            <label
                className={`block mb-1 text-[#002E62] font-semibold text-[15px] ${className}`}
                {...props}
            >
                {content}
                {required && <span className="text-red-500 ml-0.5">*</span>}
            </label>
        </div>
    );
}
