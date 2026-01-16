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
  iconBgClass = "bg-emerald-light"
}) => {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-[#E4E7EC] bg-card p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${iconBgClass}`}>
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <div className="flex-1">
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="text-2xl font-bold text-navy">{value}</p>
      </div>
      <button className="text-muted-foreground hover:text-primary transition-colors">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" transform="rotate(-45 10 10)"/>
        </svg>
      </button>
    </div>
  );
};

export default StatCard;
