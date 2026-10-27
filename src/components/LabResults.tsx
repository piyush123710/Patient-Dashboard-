import React, { useState } from 'react';
import { Download, Check } from 'lucide-react';

interface LabResultsProps {
  labResults?: string[];
}

export const LabResults: React.FC<LabResultsProps> = ({ labResults = [] }) => {
  const [downloadingIndex, setDownloadingIndex] = useState<number | null>(null);
  const [downloadedIndices, setDownloadedIndices] = useState<number[]>([]);

  const handleDownload = (resultName: string, index: number) => {
    setDownloadingIndex(index);
    
    // Simulate downloading the lab report file gracefully
    setTimeout(() => {
      const element = document.createElement('a');
      const file = new Blob([`Lab Result Report for ${resultName}\nGenerated: ${new Date().toISOString()}`], {
        type: 'text/plain',
      });
      element.href = URL.createObjectURL(file);
      element.download = `${resultName.replace(/\s+/g, '_')}_Report.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);

      setDownloadingIndex(null);
      setDownloadedIndices((prev) => [...prev, index]);
    }, 600);
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-xs border border-gray-100 mt-8">
      <h2 className="text-2xl font-extrabold text-[#072635] mb-4">Lab Results</h2>

      <div className="space-y-1 max-h-[240px] overflow-y-auto custom-scrollbar pr-1">
        {labResults.length === 0 ? (
          <p className="text-sm text-[#707070] py-4 text-center">No lab results available.</p>
        ) : (
          labResults.map((result, index) => {
            const isDownloading = downloadingIndex === index;
            const isDownloaded = downloadedIndices.includes(index);

            return (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-[#F6F7F8] transition-colors group"
              >
                <span className="text-sm font-semibold text-[#072635]">
                  {result}
                </span>

                <button
                  onClick={() => handleDownload(result, index)}
                  disabled={isDownloading}
                  className="p-2 text-[#072635] hover:bg-gray-200/60 rounded-full transition-colors relative"
                  title={`Download ${result}`}
                  aria-label={`Download ${result}`}
                >
                  {isDownloading ? (
                    <div className="w-5 h-5 border-2 border-[#072635] border-t-transparent rounded-full animate-spin" />
                  ) : isDownloaded ? (
                    <Check className="w-5 h-5 text-emerald-600 stroke-[2.5]" />
                  ) : (
                    <Download className="w-5 h-5 stroke-[2]" />
                  )}
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
