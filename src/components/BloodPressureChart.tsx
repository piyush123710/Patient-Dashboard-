import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { ChevronDown, ArrowUp, ArrowDown } from 'lucide-react';
import { DiagnosisHistoryEntry } from '../types/patient';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface BloodPressureChartProps {
  history: DiagnosisHistoryEntry[];
}

export const BloodPressureChart: React.FC<BloodPressureChartProps> = ({ history = [] }) => {
  const [timeRange, setTimeRange] = useState<'6months' | '12months' | 'all'>('6months');

  // Filter and format history entries
  // The API returns entries in reverse chronological order (March 2024 first, Oct 2023 later)
  const slicedHistory = React.useMemo(() => {
    let count = 6;
    if (timeRange === '12months') count = 12;
    if (timeRange === 'all') count = history.length;
    
    // Take recent N entries and reverse them for left-to-right timeline display
    const slice = history.slice(0, Math.min(count, history.length));
    return [...slice].reverse();
  }, [history, timeRange]);

  // Latest entry in selected window for side metrics
  const latestEntry = history.length > 0 ? history[0] : null;

  const labels = slicedHistory.map((entry) => `${entry.month.substring(0, 3)}, ${entry.year}`);
  const systolicData = slicedHistory.map((entry) => entry.blood_pressure.systolic.value);
  const diastolicData = slicedHistory.map((entry) => entry.blood_pressure.diastolic.value);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Systolic',
        data: systolicData,
        borderColor: '#E66FD2',
        backgroundColor: '#E66FD2',
        pointBackgroundColor: '#E66FD2',
        pointBorderColor: '#FFFFFF',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
        tension: 0.4, // Smooth curved line matching Adobe XD
        borderWidth: 2,
      },
      {
        label: 'Diastolic',
        data: diastolicData,
        borderColor: '#8C6FE6',
        backgroundColor: '#8C6FE6',
        pointBackgroundColor: '#8C6FE6',
        pointBorderColor: '#FFFFFF',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
        tension: 0.4,
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // We use custom side metrics panel matching Adobe XD
      },
      tooltip: {
        backgroundColor: '#072635',
        titleFont: { family: 'Manrope', size: 12, weight: 700 },
        bodyFont: { family: 'Manrope', size: 12 },
        padding: 10,
        cornerRadius: 8,
        displayColors: true,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: { family: 'Manrope', size: 12, weight: 500 },
          color: '#072635',
        },
      },
      y: {
        min: 60,
        max: 180,
        grid: {
          color: 'rgba(203, 200, 212, 0.4)',
        },
        ticks: {
          stepSize: 20,
          font: { family: 'Manrope', size: 12, weight: 500 },
          color: '#072635',
        },
      },
    },
  };

  const systolicLevel = latestEntry?.blood_pressure.systolic.levels || 'Normal';
  const diastolicLevel = latestEntry?.blood_pressure.diastolic.levels || 'Normal';

  return (
    <div className="bg-[#F4F0FE] rounded-2xl p-4 sm:p-5 flex flex-col lg:flex-row gap-6">
      {/* Left Column: Line Graph */}
      <div className="flex-1 flex flex-col min-h-[260px]">
        {/* Header with Title and Dropdown */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-[#072635]">Blood Pressure</h3>
          <div className="relative inline-block">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value as any)}
              className="appearance-none bg-transparent pr-6 text-sm font-medium text-[#072635] focus:outline-none cursor-pointer"
            >
              <option value="6months">Last 6 months</option>
              <option value="12months">Last 12 months</option>
              <option value="all">All records</option>
            </select>
            <ChevronDown className="w-4 h-4 text-[#072635] absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Chart Canvas */}
        <div className="flex-1 min-h-[220px] w-full relative">
          <Line data={chartData} options={chartOptions as any} />
        </div>
      </div>

      {/* Right Column: Systolic & Diastolic Summary Panel */}
      <div className="w-full lg:w-48 flex flex-col justify-center space-y-4 shrink-0 border-t lg:border-t-0 lg:border-l border-[#CBC8D4]/40 pt-4 lg:pt-0 lg:pl-6">
        {/* Systolic Item */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-3 h-3 rounded-full bg-[#E66FD2] inline-block" />
            <span className="text-sm font-bold text-[#072635]">Systolic</span>
          </div>
          <div className="text-2xl font-extrabold text-[#072635] tracking-tight">
            {latestEntry?.blood_pressure.systolic.value ?? 160}
          </div>
          <div className="flex items-center gap-1.5 mt-1 text-xs text-[#072635]">
            {systolicLevel.toLowerCase().includes('higher') ? (
              <ArrowUp className="w-3.5 h-3.5 text-[#072635] stroke-[3]" />
            ) : systolicLevel.toLowerCase().includes('lower') ? (
              <ArrowDown className="w-3.5 h-3.5 text-[#072635] stroke-[3]" />
            ) : null}
            <span className="font-normal">{systolicLevel}</span>
          </div>
        </div>

        <div className="h-px bg-[#CBC8D4]/50 my-1" />

        {/* Diastolic Item */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-3 h-3 rounded-full bg-[#8C6FE6] inline-block" />
            <span className="text-sm font-bold text-[#072635]">Diastolic</span>
          </div>
          <div className="text-2xl font-extrabold text-[#072635] tracking-tight">
            {latestEntry?.blood_pressure.diastolic.value ?? 78}
          </div>
          <div className="flex items-center gap-1.5 mt-1 text-xs text-[#072635]">
            {diastolicLevel.toLowerCase().includes('lower') ? (
              <ArrowDown className="w-3.5 h-3.5 text-[#072635] stroke-[3]" />
            ) : diastolicLevel.toLowerCase().includes('higher') ? (
              <ArrowUp className="w-3.5 h-3.5 text-[#072635] stroke-[3]" />
            ) : null}
            <span className="font-normal">{diastolicLevel}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
