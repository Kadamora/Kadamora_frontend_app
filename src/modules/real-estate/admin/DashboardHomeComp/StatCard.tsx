import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  iconBgClass?: string;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon: Icon,
  iconBgClass = "bg-[#E5F1FF]" // Default to light blue for Total Earning
}) => {
  return (
    <div className="flex items-center gap-4 rounded-3xl border border-[#E9EEF2] bg-white p-6 shadow-[0px_1px_2px_rgba(16,24,40,0.05)] transition-all hover:shadow-md relative overflow-hidden group">
      <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${iconBgClass}`}>
        <Icon className="h-6 w-6 text-[#0061FF]" />
      </div>
      <div className="flex-1">
        <p className="text-[15px] font-medium text-[#505F79] mb-1">{title}</p>
        <p className="text-3xl font-bold text-[#091E42]">{value}</p>
      </div>
      <div className="absolute top-5 right-5 text-[#98A2B3] group-hover:text-[#0061FF] transition-colors">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  );
};

export default StatCard;
