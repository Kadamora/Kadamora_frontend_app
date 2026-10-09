import React from 'react';
import { FiInfo, FiArrowDownLeft, FiArrowUpRight } from 'react-icons/fi';
import { HiArrowTrendingUp } from 'react-icons/hi2';
import HTButton from '../HTButton';

interface HTPaymentOverviewCardProps {
    balance?: number;
    currency?: string;
    trendAmount?: number;
    trendPercent?: number;
    dateLabel?: string;
    onDepositClick: () => void;
    onWithdrawClick: () => void;
    className?: string;
}

export default function HTPaymentOverviewCard({
    balance = 98370.80,
    currency = 'NGN',
    trendAmount = 347.32,
    trendPercent = 6.3,
    dateLabel = 'July 10, 2025',
    onDepositClick,
    onWithdrawClick,
    className = '',
}: HTPaymentOverviewCardProps) {
    const formattedBalance = `${currency} ${balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    return (
        <div className={` rounded-[12px] bg-white border border-[#E4E4E7] p-4 sm:p-6 relative ${className}`}>
            {/* Top Row: Title + Date Badge */}
            <div className="flex items-center justify-between gap-4 flex-wrap pb-4">
                <div className="flex items-center gap-1.5 text-sm font-medium text-[#11263C]">
                    <span>Payment Overview</span>
                    <FiInfo className="h-4 w-4 text-[#D0D1D2] cursor-pointer" />
                </div>

                <div className="bg-[#0B57D0] text-white text-xs font-semibold px-4 py-1.5 rounded-md shadow-2xs">
                    {dateLabel}
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2 ">
                {/* Left: Balance & CTAs */}
                <div className="lg:col-span-5 space-y-5">
                    <div>
                        <span className="text-sm font-medium uppercase text-[#737574] block mb-1">
                            BALANCE
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-semibold text-[#132E4E] tracking-tight">
                            {formattedBalance}
                        </h2>
                        <div className="flex items-center gap-1.5 text-xs text-[#00A63E] mt-2">
                            <HiArrowTrendingUp className="h-4 w-4 " />
                            <span>+ ₦{trendAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })} ({trendPercent}%)</span>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-wrap items-center gap-3 pt-2">
                        {/* Deposit Money */}
                        <HTButton
                            type="button"
                            onClick={onDepositClick}
                            variant="primary"
                            size="md"
                            icon={<FiArrowDownLeft className="h-4 w-4" />}
                            className="text-xs sm:text-sm font-semibold rounded-[8px] whitespace-nowrap shadow-2xs"
                        >
                            Deposit Money
                        </HTButton>

                        {/* Withdraw Money */}
                        <HTButton
                            type="button"
                            onClick={onWithdrawClick}
                            variant="success"
                            size="md"
                            icon={<FiArrowUpRight className="h-4 w-4" />}
                            className="text-xs sm:text-sm font-semibold rounded-[8px] whitespace-nowrap"
                        >
                            Withdraw Money
                        </HTButton>
                    </div>
                </div>

                {/* Right: Line Chart Area */}
                <div className="lg:col-span-7 h-48 sm:h-56 relative flex items-center">
                    <svg
                        className="w-full h-full overflow-visible"
                        viewBox="0 0 500 200"
                        preserveAspectRatio="none"
                    >
                        <defs>
                            <linearGradient id="walletChartGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.12" />
                                <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.0" />
                            </linearGradient>
                        </defs>

                        {/* Grid lines and labels */}
                        {/* $40k */}
                        <text x="0" y="55" fill="#94A3B8" fontSize="11" fontWeight="400">
                            $40k
                        </text>
                        <line
                            x1="35"
                            y1="50"
                            x2="480"
                            y2="50"
                            stroke="#E2E8F0"
                            strokeWidth="1"
                            strokeDasharray="4 4"
                        />

                        {/* $20k */}
                        <text x="0" y="115" fill="#94A3B8" fontSize="11" fontWeight="400">
                            $20k
                        </text>
                        <line
                            x1="35"
                            y1="110"
                            x2="480"
                            y2="110"
                            stroke="#E2E8F0"
                            strokeWidth="1"
                            strokeDasharray="4 4"
                        />

                        {/* $10k */}
                        <text x="0" y="175" fill="#94A3B8" fontSize="11" fontWeight="400">
                            $10k
                        </text>
                        <line
                            x1="35"
                            y1="170"
                            x2="480"
                            y2="170"
                            stroke="#E2E8F0"
                            strokeWidth="1"
                            strokeDasharray="4 4"
                        />

                        {/* Stepped Chart Area fill */}
                        <path
                            d="M 35 170 L 130 50 L 300 50 L 300 15 L 480 15 L 480 170 Z"
                            fill="url(#walletChartGradient)"
                        />

                        {/* Stepped Chart Stroke Line */}
                        <path
                            d="M 35 170 L 130 50 L 300 50 L 300 15 L 480 15"
                            fill="none"
                            stroke="#2563EB"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />

                        {/* Endpoint active node at top right */}
                        <circle cx="480" cy="15" r="8" fill="#93C5FD" fillOpacity="0.6" />
                        <circle cx="480" cy="15" r="4" fill="#2563EB" />
                    </svg>
                </div>
            </div>
        </div>
    );
}
