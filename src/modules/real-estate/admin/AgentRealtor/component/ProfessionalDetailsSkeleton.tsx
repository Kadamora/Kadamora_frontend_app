import React from 'react';

const SkeletonBlock = ({ className }: { className: string }) => (
  <div className={`animate-pulse bg-[#E4E7EC] rounded ${className}`} />
);

const StepProgressSkeleton = () => (
  <aside className="w-105 min-w-105 h-full hidden md:block p-8">
    <ol className="flex flex-col gap-8">
      {[1, 2].map((i) => (
        <li key={i} className="flex items-start gap-6">
          {/* Bullet */}
          <div className="flex flex-col items-center mt-1">
            <SkeletonBlock className="h-6 w-6 rounded-full" />
            {i !== 2 && <SkeletonBlock className="w-0.5 h-20 mt-1" />}
          </div>

          {/* Text */}
          <div className="space-y-3 pt-1">
            <SkeletonBlock className="h-4 w-44" />
            <SkeletonBlock className="h-3 w-72" />
          </div>
        </li>
      ))}
    </ol>
  </aside>
);
const ProfessionalDetailsSkeleton: React.FC = () => {
  return (
    <div className="w-full overflow-hidden flex flex-col md:flex-row">
      {/* Sidebar */}
      <StepProgressSkeleton />

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-white border border-[#EDF1F5] rounded-md">
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-8 border-b border-[#EDF1F5]">
          <SkeletonBlock className="h-4 w-48" />
          <SkeletonBlock className="h-8 w-8 rounded-full" />
        </div>

        {/* Mobile Header */}
        <div className="md:hidden p-6 border-b border-gray-100 flex justify-between">
          <SkeletonBlock className="h-4 w-40" />
          <SkeletonBlock className="h-4 w-10" />
        </div>

        {/* Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2].map((col) => (
              <div key={col} className="space-y-6">
                {[1, 2, 3, 4].map((row) => (
                  <div key={row} className="space-y-2">
                    <SkeletonBlock className="h-3 w-40" />
                    <SkeletonBlock className="h-4 w-64" />
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Bio Section */}
          <div className="mt-6 space-y-2">
            <SkeletonBlock className="h-3 w-24" />
            <SkeletonBlock className="h-3 w-full" />
            <SkeletonBlock className="h-3 w-11/12" />
            <SkeletonBlock className="h-3 w-9/12" />
          </div>

          {/* Action Buttons */}
          <div className="mt-8 pt-8 flex gap-4">
            <SkeletonBlock className="h-10 w-28 rounded-lg" />
            <SkeletonBlock className="h-10 w-28 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalDetailsSkeleton;