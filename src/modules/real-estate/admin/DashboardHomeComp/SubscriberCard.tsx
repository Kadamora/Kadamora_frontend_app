import React from 'react';

export interface Subscriber {
  id: number;
  name: string;
  role: string;
  date: string;
  logo: string;
  logoText?: string;
}

interface SubscriberCardProps {
  subscriber: Subscriber;
}

const SubscriberCard: React.FC<SubscriberCardProps> = ({ subscriber }) => {
  return (
    <div className="flex items-center gap-4 py-4">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl overflow-hidden bg-[#F8FAFC] border border-[#E9EEF2]">
        {subscriber.logo ? (
          <img
            src={subscriber.logo}
            alt={subscriber.name}
            className="h-full w-full object-cover p-2"
          />
        ) : (
          <div className="flex flex-col items-center justify-center">
             <span className="text-xl font-bold text-[#091E42] text-center leading-[0.8]">
              {subscriber.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-[17px] font-bold text-[#091E42] mb-0.5">{subscriber.name}</h4>
        <p className="text-sm font-medium text-[#505F79]">{subscriber.role}</p>
      </div>
      <div className="bg-[#F1F5F9] px-4 py-2.5 rounded-xl">
        <span className="text-sm font-bold text-[#64748B] whitespace-nowrap">
          {subscriber.date}
        </span>
      </div>
    </div>
  );
};

export default SubscriberCard;
