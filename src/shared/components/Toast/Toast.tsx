import toast, { type Toast as ToastType } from 'react-hot-toast';
import { FaCheck } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';

export interface ToastProps {
    title: string;
    message?: string;
    type?: 'success' | 'error' | 'info';
    t?: ToastType;
}

export const CustomToast: React.FC<ToastProps> = ({
    title,
    message,
    type = 'success',
    t,
}) => {
    return (
        <div
            className={`flex items-center gap-3 bg-[#1C242B] text-white px-4 py-3.5 rounded-2xl shadow-[0_12px_32px_rgba(0,0,0,0.45)] border border-white/10 max-w-sm w-full transition-all duration-300 ${
                t?.visible ? 'animate-enter' : 'animate-leave'
            }`}
        >
            {/* Left circular badge */}
            <div className="flex-shrink-0">
                {type === 'success' ? (
                    <div className="w-10 h-10 rounded-full bg-[#0E3A2E] flex items-center justify-center">
                        <div className="w-6 h-6 rounded-full bg-[#00E587] flex items-center justify-center text-[#1C242B]">
                            <FaCheck className="w-3 h-3 stroke-[2.5]" />
                        </div>
                    </div>
                ) : (
                    <div className="w-10 h-10 rounded-full bg-red-950/60 flex items-center justify-center">
                        <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center text-white font-bold text-xs">
                            <IoClose className="w-4 h-4" />
                        </div>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
                <h4 className="text-white font-semibold text-[15px] leading-tight">
                    {title}
                </h4>
                {message && (
                    <p className="text-gray-300 text-xs sm:text-sm mt-0.5 leading-snug font-normal">
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
};

/**
 * Show a success toast matching the Kadamora design system
 */
export const showSuccessToast = (title: string, message?: string) => {
    return toast.custom(
        (t) => <CustomToast title={title} message={message} type="success" t={t} />,
        { duration: 4000 }
    );
};

/**
 * Show an error toast matching the Kadamora design system
 */
export const showErrorToast = (title: string, message?: string) => {
    return toast.custom(
        (t) => <CustomToast title={title} message={message} type="error" t={t} />,
        { duration: 4000 }
    );
};

export default CustomToast;
