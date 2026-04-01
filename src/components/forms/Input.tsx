import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    title?: string;
    containerClassName?: string;
    leftIcon?: React.ReactNode;
}

export default function Input({ title, containerClassName = '', className = '', leftIcon, ...props }: InputProps) {
    return (
        <div className={containerClassName}>
            {title && (
                <label htmlFor={props.id} className="block mb-1 text-[#002E62] font-semibold text-[15px]">
                    {title}
                    {props.required && <span className="text-red-500 ml-0.5">*</span>}
                </label>
            )}
            <div className="relative">
                {/* ICON */}
                {leftIcon && (
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        {leftIcon}
                    </span>
                )}
                <input
                // className={`w-full px-4 py-3 border border-[#E0DEF7] rounded-lg focus:ring-2 focus:ring-[#002E62]/70 focus:border-transparent outline-none transition-colors bg-[#F7F7FD] focus:bg-white placeholder-[#52525B] text-[14px] font-medium ${className}`}
                className={`w-full py-3 border border-[#E0DEF7] rounded-lg focus:ring-2 focus:ring-[#002E62]/70 focus:border-transparent outline-none transition-colors  focus:bg-white placeholder-[#52525B] text-[14px] font-medium ${leftIcon ? "pl-8 pr-4" : "px-4" } ${className}`}
                {...props}
            />
            </div>
        </div>
    );
}
