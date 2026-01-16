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
    <div className="flex items-center gap-4 py-3">
      <div className="flex h-12 w-12 items-center justify-center rounded-lg overflow-hidden bg-muted">
        {subscriber.logo ? (
          <img
            src={subscriber.logo}
            alt={subscriber.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="text-xs font-semibold text-primary uppercase">
            {subscriber.logoText || subscriber.name.slice(0, 2)}
          </span>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-navy truncate">{subscriber.name}</h4>
        <p className="text-sm text-muted-foreground truncate">{subscriber.role}</p>
      </div>
      <span className="text-xs text-muted-foreground whitespace-nowrap">
        {subscriber.date}
      </span>
    </div>
  );
};

export default SubscriberCard;
