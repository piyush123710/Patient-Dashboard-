import React from 'react';

export const LoadingSkeleton: React.FC = () => {
  return (
    <div className="w-full space-y-6 animate-pulse">
      {/* Chart Skeleton */}
      <div className="bg-white rounded-2xl p-6 shadow-xs border border-gray-100 h-96 flex flex-col justify-between">
        <div className="h-6 bg-gray-200 rounded w-48" />
        <div className="h-60 bg-gray-100 rounded-xl w-full" />
        <div className="grid grid-cols-3 gap-4 pt-4">
          <div className="h-24 bg-gray-100 rounded-xl" />
          <div className="h-24 bg-gray-100 rounded-xl" />
          <div className="h-24 bg-gray-100 rounded-xl" />
        </div>
      </div>

      {/* Table Skeleton */}
      <div className="bg-white rounded-2xl p-6 shadow-xs border border-gray-100 space-y-4">
        <div className="h-6 bg-gray-200 rounded w-40" />
        <div className="h-10 bg-gray-100 rounded-xl w-full" />
        <div className="h-10 bg-gray-100 rounded-xl w-full" />
        <div className="h-10 bg-gray-100 rounded-xl w-full" />
      </div>
    </div>
  );
};
