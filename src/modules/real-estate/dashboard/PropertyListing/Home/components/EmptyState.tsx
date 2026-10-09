import React from 'react';

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  actionLabel,
  onAction,
}) => {
  return (
    <div className="col-span-full flex flex-col items-center justify-center  px-6 py-14 text-center h-fit">
      

      <h4 className="text-lg font-semibold text-[#002E62]">{title}</h4>
      <p className="mt-2 max-w-md text-sm text-gray-500">
        {description}
      </p>

      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="mt-6 rounded-xl bg-[#002E62] px-6 py-3 text-sm font-semibold text-white shadow hover:opacity-90 active:scale-95 transition"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
