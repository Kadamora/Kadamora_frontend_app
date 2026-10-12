import React from 'react';

export interface HTButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** The variant of the button */
    variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'success';
    /** The size of the button */
    size?: 'sm' | 'md' | 'lg';
    /** Optional icon to render before the text */
    icon?: React.ReactNode;
    /** If true, the button will take up the full width of its container */
    fullWidth?: boolean;
}

export default function HTButton({
    variant = 'primary',
    size = 'md',
    icon,
    fullWidth = false,
    className = '',
    children,
    ...props
}: HTButtonProps) {
    const baseStyles = 'inline-flex items-center justify-center gap-2 font-medium transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
        primary: 'bg-[#002E62] hover:bg-[#072440] text-white shadow-sm',
        secondary: 'bg-[#CCE3FD] hover:bg-[#b5d6fa] text-[#002E62]',
        outline: 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 shadow-2xs',
        danger: 'bg-rose-600 hover:bg-rose-700 text-white shadow-sm',
        success: 'bg-[#EDFCF4] hover:bg-[#dbfae8] text-[#002E62] border border-[#43CC88] shadow-2xs',
    };

    const sizes = {
        sm: 'px-3 py-1.5 text-xs rounded-full',
        md: 'px-5 py-2.5 text-sm rounded-lg',
        lg: 'px-8 py-3.5 text-base rounded-xl',
    };

    const widthClass = fullWidth ? 'w-full' : '';

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
            {...props}
        >
            {icon && <span className="flex-shrink-0">{icon}</span>}
            {children}
        </button>
    );
}
