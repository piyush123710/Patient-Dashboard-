import React, { useState } from 'react';
import { Search, MoreHorizontal } from 'lucide-react';
import { Patient } from '../types/patient';

interface PatientsSidebarProps {
  patients: Patient[];
  selectedPatient: Patient | null;
  onSelectPatient: (patient: Patient) => void;
  isLoading?: boolean;
}

export const PatientsSidebar: React.FC<PatientsSidebarProps> = ({
  patients,
  selectedPatient,
  onSelectPatient,
  isLoading = false,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchInput, setShowSearchInput] = useState(false);

  const filteredPatients = patients.filter((patient) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    return (
      patient.name.toLowerCase().includes(query) ||
      patient.gender.toLowerCase().includes(query) ||
      patient.age.toString().includes(query)
    );
  });

  return (
    <aside className="bg-white rounded-2xl p-5 shadow-xs border border-gray-100 flex flex-col h-full max-h-[1050px] w-full">
      {/* Sidebar Header */}
      <div className="flex items-center justify-between mb-4 px-1">
        <h2 className="text-2xl font-extrabold text-[#072635]">Patients</h2>
        <button
          onClick={() => setShowSearchInput(!showSearchInput)}
          className="p-2 text-[#072635] hover:bg-gray-100 rounded-full transition-colors"
          title="Search Patients"
          aria-label="Search Patients"
        >
          <Search className="w-5 h-5 stroke-[2.2]" />
        </button>
      </div>

      {/* Search Input Bar */}
      {showSearchInput && (
        <div className="mb-4 transition-all">
          <div className="relative flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, gender..."
              className="w-full py-2 pl-9 pr-4 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#01F0D0] text-[#072635]"
              autoFocus
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 pointer-events-none" />
          </div>
        </div>
      )}

      {/* Patients List */}
      <div className="flex-1 overflow-y-auto space-y-1.5 pr-1 custom-scrollbar">
        {isLoading ? (
          // Skeleton loading rows
          Array.from({ length: 8 }).map((_, idx) => (
            <div key={idx} className="flex items-center gap-3 p-3 rounded-xl animate-pulse">
              <div className="w-12 h-12 bg-gray-200 rounded-full shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
              </div>
            </div>
          ))
        ) : filteredPatients.length === 0 ? (
          <div className="text-center py-8 text-sm text-[#707070]">
            No patients found matching "{searchQuery}"
          </div>
        ) : (
          filteredPatients.map((patient) => {
            const isSelected = selectedPatient?.name === patient.name;
            return (
              <div
                key={patient.name}
                onClick={() => onSelectPatient(patient)}
                className={`group flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-[#D8FCF7]'
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={patient.profile_picture}
                    alt={patient.name}
                    className="w-12 h-12 rounded-full object-cover shrink-0 border border-gray-100"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        patient.name
                      )}&background=01F0D0&color=072635`;
                    }}
                  />
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm font-bold text-[#072635] truncate">
                      {patient.name}
                    </span>
                    <span className="text-xs text-[#707070] font-medium truncate">
                      {patient.gender}, {patient.age}
                    </span>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="p-1.5 text-[#072635] hover:bg-white/60 rounded-full transition-colors opacity-70 group-hover:opacity-100"
                  title="Patient options"
                  aria-label="Patient options"
                >
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            );
          })
        )}
      </div>
    </aside>
  );
};
