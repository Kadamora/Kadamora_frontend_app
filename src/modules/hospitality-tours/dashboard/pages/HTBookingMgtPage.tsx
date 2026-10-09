import React from 'react';

export default function HTBookingMgtPage() {
    return (
        <div className="min-h-[75vh] flex flex-col items-center justify-center p-4 text-center animate-fade-in">
            {/* Empty State Illustration */}
            <img
                src="/assets/icons/bookMgt-empty.svg"
                alt="No booking at the moment"
                className="w-56 sm:w-64 md:w-72 h-auto mb-6 object-contain"
            />

            {/* Title */}
            <h2 className="text-xl sm:text-2xl font-bold text-[#002E62] mb-2">
                No booking at the moment
            </h2>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm text-[#71717A] max-w-md leading-relaxed">
                Lorem ipsum dolor sit amet consectetur. Maecenas vel orci aliquet a
                turpis amet mauris orci. Orci vitae congue morbi aliquam.
            </p>
        </div>
    );
}
