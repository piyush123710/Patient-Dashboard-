import React from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { DiagnosisHistoryEntry } from '../types/patient';

interface VitalsCardsProps {
  latestEntry?: DiagnosisHistoryEntry | null;
}

export const VitalsCards: React.FC<VitalsCardsProps> = ({ latestEntry }) => {
  const respRate = latestEntry?.respiratory_rate.value ?? 20;
  const respLevel = latestEntry?.respiratory_rate.levels ?? 'Normal';

  const temp = latestEntry?.temperature.value ?? 98.6;
  const tempLevel = latestEntry?.temperature.levels ?? 'Normal';

  const heartRate = latestEntry?.heart_rate.value ?? 78;
  const heartLevel = latestEntry?.heart_rate.levels ?? 'Lower than Average';

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
      {/* 1. Respiratory Rate Card */}
      <div className="bg-[#E0F3FA] rounded-2xl p-4 flex flex-col justify-between">
        <div>
          <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center mb-3 shadow-2xs">
            {/* Lungs Icon SVG */}
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 10V28" stroke="#072635" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M14 13C10 13 8 16 8 21C8 26 10 29 14 29C16 29 17 27 17 25V15C17 13.5 15.5 13 14 13Z" fill="#072635" opacity="0.15" stroke="#072635" strokeWidth="2" />
              <path d="M26 13C30 13 32 16 32 21C32 26 30 29 26 29C24 29 23 27 23 25V15C23 13.5 24.5 13 26 13Z" fill="#072635" opacity="0.15" stroke="#072635" strokeWidth="2" />
            </svg>
          </div>
          <span className="text-sm font-semibold text-[#072635]">Respiratory Rate</span>
          <div className="text-3xl font-extrabold text-[#072635] mt-1 tracking-tight">
            {respRate} <span className="text-sm font-normal">bpm</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 mt-4 text-xs text-[#072635]">
          {respLevel.toLowerCase().includes('lower') ? (
            <ArrowDown className="w-3.5 h-3.5 stroke-[3]" />
          ) : respLevel.toLowerCase().includes('higher') ? (
            <ArrowUp className="w-3.5 h-3.5 stroke-[3]" />
          ) : null}
          <span className="font-medium">{respLevel}</span>
        </div>
      </div>

      {/* 2. Temperature Card */}
      <div className="bg-[#FFE6E9] rounded-2xl p-4 flex flex-col justify-between">
        <div>
          <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center mb-3 shadow-2xs">
            {/* Thermometer Icon SVG */}
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 25V13C20 11.3431 18.6569 10 17 10C15.3431 10 14 11.3431 14 13V25C12.3431 26.3431 12 28.5 13.5 30.5C15 32.5 19 32.5 20.5 30.5C22 28.5 21.6569 26.3431 20 25Z" fill="#FF5668" opacity="0.2" stroke="#FF5668" strokeWidth="2" />
              <circle cx="17" cy="27" r="3" fill="#FF5668" />
              <path d="M17 16V24" stroke="#FF5668" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <span className="text-sm font-semibold text-[#072635]">Temperature</span>
          <div className="text-3xl font-extrabold text-[#072635] mt-1 tracking-tight">
            {temp} <span className="text-sm font-normal">°F</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 mt-4 text-xs text-[#072635]">
          {tempLevel.toLowerCase().includes('lower') ? (
            <ArrowDown className="w-3.5 h-3.5 stroke-[3]" />
          ) : tempLevel.toLowerCase().includes('higher') ? (
            <ArrowUp className="w-3.5 h-3.5 stroke-[3]" />
          ) : null}
          <span className="font-medium">{tempLevel}</span>
        </div>
      </div>

      {/* 3. Heart Rate Card */}
      <div className="bg-[#FFE6F1] rounded-2xl p-4 flex flex-col justify-between">
        <div>
          <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center mb-3 shadow-2xs">
            {/* Heart Pulse Icon SVG */}
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 18C12 14 15 12 18.5 14.5L20 16L21.5 14.5C25 12 28 14 28 18C28 23 20 28 20 28C20 28 12 23 12 18Z" fill="#E66FD2" opacity="0.2" stroke="#E66FD2" strokeWidth="2" />
              <path d="M14 20H17L18.5 17L20.5 23L22 19L23 20H26" stroke="#E66FD2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="text-sm font-semibold text-[#072635]">Heart Rate</span>
          <div className="text-3xl font-extrabold text-[#072635] mt-1 tracking-tight">
            {heartRate} <span className="text-sm font-normal">bpm</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 mt-4 text-xs text-[#072635]">
          {heartLevel.toLowerCase().includes('lower') ? (
            <ArrowDown className="w-3.5 h-3.5 stroke-[3]" />
          ) : heartLevel.toLowerCase().includes('higher') ? (
            <ArrowUp className="w-3.5 h-3.5 stroke-[3]" />
          ) : null}
          <span className="font-medium">{heartLevel}</span>
        </div>
      </div>
    </div>
  );
};
