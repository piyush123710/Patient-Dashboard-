import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  message = 'Failed to load patient data from API.',
  onRetry,
}) => {
  return (
    <div className="bg-white rounded-2xl p-12 text-center shadow-xs border border-gray-100 max-w-xl mx-auto my-12">
      <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
        <AlertCircle className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-bold text-[#072635] mb-2">Data Load Error</h3>
      <p className="text-sm text-[#707070] mb-6 leading-relaxed">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#01F0D0] hover:bg-[#00D8BB] text-[#072635] font-bold text-sm rounded-full transition-all shadow-xs"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Try Again</span>
        </button>
      )}
    </div>
  );
};
