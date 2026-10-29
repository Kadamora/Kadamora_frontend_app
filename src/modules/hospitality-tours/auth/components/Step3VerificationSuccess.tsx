import verifiedSvg from '../assets/svg/verified.svg';

export interface Step3VerificationSuccessProps {
    onProceed: () => void;
    title?: string;
    subtitle?: string;
}

export default function Step3VerificationSuccess({
    onProceed,
    title = "Account Verify Successfully",
    subtitle = "Your email has been verified. Your account is now active and ready to use",
}: Step3VerificationSuccessProps) {
    return (
        <div className="w-full max-w-md mx-auto">
            {/* Verified Icon */}
            <div className="flex  mb-6">
                <img
                    src={verifiedSvg}
                    alt="Account Verified"
                    className="w-16 h-16 sm:w-[70px] sm:h-[70px] object-contain"
                />
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-secondary">
                {title}
            </h2>
            <p className="text-gray-500 mt-2 text-sm sm:text-base max-w-xs ">
                {subtitle}
            </p>

            <div className="mt-8 flex j">
                <button
                    type="button"
                    onClick={onProceed}
                    className="bg-[#002D62] text-white px-10 py-3 rounded-xl font-medium hover:bg-[#002550] transition-colors shadow-sm"
                >
                    Proceed
                </button>
            </div>
        </div>
    );
}
