import React from 'react';
import { DiagnosisHistoryEntry } from '../types/patient';
import { BloodPressureChart } from './BloodPressureChart';
import { VitalsCards } from './VitalsCards';

interface DiagnosisHistoryProps {
  history?: DiagnosisHistoryEntry[];
}

export const DiagnosisHistory: React.FC<DiagnosisHistoryProps> = ({ history = [] }) => {
  const latestEntry = history.length > 0 ? history[0] : null;

  return (
    <section className="bg-white rounded-2xl p-6 shadow-xs border border-gray-100 mb-8">
      <h2 className="text-2xl font-extrabold text-[#072635] mb-6">Diagnosis History</h2>
      
      {/* Chart Section */}
      <BloodPressureChart history={history} />

      {/* Vitals Cards */}
      <VitalsCards latestEntry={latestEntry} />
    </section>
  );
};
