import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'reject' | 'danger' | 'success' | 'green';
    size?: 'sm' | 'md' | 'lg';
    icon?: React.ReactNode;
    fullWidth?: boolean;
    /** Optional custom background color (Tailwind class like `bg-[#00A63E]` or CSS color like `#00A63E`) */
    bgColor?: string;
}

export default function Button({
    variant = 'primary',
    size = 'md',
    icon,
    fullWidth = false,
    bgColor,
    className = '',
    style,
    children,
    ...props
}: ButtonProps) {
    const baseStyles =
        'inline-flex items-center justify-center gap-2 font-medium transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
        primary: 'bg-[#002E62] hover:bg-[#072440] text-white shadow-sm',
        secondary: 'bg-[#CCE3FD] hover:bg-[#b5d6fa] text-[#002E62]',
        outline: 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 shadow-2xs',
        reject: 'border border-[#004493] bg-white text-[#002E62] hover:bg-slate-50 shadow-2xs',
        danger: 'bg-rose-600 hover:bg-rose-700 text-white shadow-sm',
        success: 'bg-[#EDFCF4] hover:bg-[#dbfae8] text-[#002E62] border border-[#43CC88] shadow-2xs',
        green: 'bg-[#00A63E] hover:bg-[#008f35] text-white shadow-sm',
    };

    const sizes = {
        sm: 'px-3 py-1.5 text-xs rounded-full',
        md: 'px-5 py-2.5 text-sm rounded-lg',
        lg: 'px-8 py-3.5 text-base rounded-xl',
    };

    const widthClass = fullWidth ? 'w-full' : '';

    const isTailwindBg = Boolean(bgColor && bgColor.startsWith('bg-'));
    const isCssBg = Boolean(bgColor && !bgColor.startsWith('bg-'));
    const hasCustomBg = /\bbg-/.test(className) || Boolean(bgColor);
    const hasCustomHoverBg = /\bhover:bg-/.test(className) || Boolean(bgColor && /\bhover:bg-/.test(bgColor));

    const variantStyles = hasCustomBg
        ? variants[variant]
              .replace(/\bbg-\S+/g, '')
              .replace(/\bhover:bg-\S+/g, hasCustomHoverBg ? '' : 'hover:opacity-90')
              .trim()
        : variants[variant];

    const customBgClass = isTailwindBg ? bgColor : '';
    const mergedStyle = isCssBg ? { backgroundColor: bgColor, ...style } : style;

    return (
        <button
            className={`${baseStyles} ${variantStyles} ${sizes[size]} ${widthClass} ${customBgClass} ${className}`.trim()}
            style={mergedStyle}
            {...props}
        >
            {icon && <span className="flex-shrink-0">{icon}</span>}
            {children}
        </button>
    );
}
