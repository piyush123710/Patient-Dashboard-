import React, { useState } from 'react';
import { Calendar, Phone, ShieldCheck, UserCheck } from 'lucide-react';
import { Patient } from '../types/patient';

interface PatientProfileProps {
  patient: Patient | null;
}

export const PatientProfile: React.FC<PatientProfileProps> = ({ patient }) => {
  const [showModal, setShowModal] = useState(false);

  if (!patient) return null;

  // Format date of birth e.g. "08/23/1996" -> "August 23, 1996"
  const formatDateOfBirth = (dobStr: string) => {
    try {
      const parts = dobStr.split('/');
      if (parts.length === 3) {
        const monthIndex = parseInt(parts[0], 10) - 1;
        const day = parseInt(parts[1], 10);
        const year = parseInt(parts[2], 10);
        const date = new Date(year, monthIndex, day);
        return date.toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        });
      }
      return dobStr;
    } catch {
      return dobStr;
    }
  };

  const infoItems = [
    {
      icon: (
        <div className="w-10 h-10 rounded-full bg-[#F6F7F8] flex items-center justify-center shrink-0">
          <Calendar className="w-5 h-5 text-[#072635]" />
        </div>
      ),
      label: 'Date Of Birth',
      value: formatDateOfBirth(patient.date_of_birth),
    },
    {
      icon: (
        <div className="w-10 h-10 rounded-full bg-[#F6F7F8] flex items-center justify-center shrink-0">
          {patient.gender.toLowerCase() === 'female' ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#072635" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="9" r="6" />
              <path d="M12 15v7" />
              <path d="M9 19h6" />
            </svg>
          ) : (
            <UserCheck className="w-5 h-5 text-[#072635]" />
          )}
        </div>
      ),
      label: 'Gender',
      value: patient.gender,
    },
    {
      icon: (
        <div className="w-10 h-10 rounded-full bg-[#F6F7F8] flex items-center justify-center shrink-0">
          <Phone className="w-5 h-5 text-[#072635]" />
        </div>
      ),
      label: 'Contact Info.',
      value: patient.phone_number,
    },
    {
      icon: (
        <div className="w-10 h-10 rounded-full bg-[#F6F7F8] flex items-center justify-center shrink-0">
          <Phone className="w-5 h-5 text-[#072635]" />
        </div>
      ),
      label: 'Emergency Contacts',
      value: patient.emergency_contact,
    },
    {
      icon: (
        <div className="w-10 h-10 rounded-full bg-[#F6F7F8] flex items-center justify-center shrink-0">
          <ShieldCheck className="w-5 h-5 text-[#072635]" />
        </div>
      ),
      label: 'Insurance Provider',
      value: patient.insurance_type,
    },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-xs border border-gray-100 flex flex-col items-center">
      {/* Patient Avatar */}
      <img
        src={patient.profile_picture}
        alt={patient.name}
        className="w-48 h-48 rounded-full object-cover mb-4 border-2 border-gray-100 shadow-2xs"
        onError={(e) => {
          (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
            patient.name
          )}&background=01F0D0&color=072635&size=200`;
        }}
      />

      {/* Patient Name */}
      <h3 className="text-2xl font-extrabold text-[#072635] text-center mb-6">
        {patient.name}
      </h3>

      {/* Detail Fields List */}
      <div className="w-full space-y-5 mb-8">
        {infoItems.map((item, idx) => (
          <div key={idx} className="flex items-center gap-4">
            {item.icon}
            <div className="flex flex-col">
              <span className="text-xs text-[#707070] font-medium">{item.label}</span>
              <span className="text-sm font-bold text-[#072635]">{item.value}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Show All Information Button */}
      <button
        onClick={() => setShowModal(true)}
        className="w-full py-3.5 px-6 bg-[#01F0D0] hover:bg-[#00D8BB] text-[#072635] text-sm font-bold rounded-full transition-all shadow-xs"
      >
        Show All Information
      </button>

      {/* Comprehensive Medical Info Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-[#072635] text-xl font-bold p-2"
            >
              ✕
            </button>
            <div className="flex items-center gap-4 mb-4 border-b pb-4 border-gray-100">
              <img
                src={patient.profile_picture}
                alt={patient.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h4 className="text-xl font-bold text-[#072635]">{patient.name}</h4>
                <p className="text-xs text-[#707070]">{patient.gender}, {patient.age} years old</p>
              </div>
            </div>

            <div className="space-y-4 text-sm text-[#072635]">
              <div className="bg-[#F6F7F8] p-4 rounded-xl space-y-2">
                <h5 className="font-bold border-b border-gray-200 pb-1">Patient Specifications</h5>
                <p><strong className="font-semibold">Date of Birth:</strong> {formatDateOfBirth(patient.date_of_birth)}</p>
                <p><strong className="font-semibold">Phone:</strong> {patient.phone_number}</p>
                <p><strong className="font-semibold">Emergency Contact:</strong> {patient.emergency_contact}</p>
                <p><strong className="font-semibold">Insurance:</strong> {patient.insurance_type}</p>
              </div>

              <div className="bg-[#F6F7F8] p-4 rounded-xl space-y-2">
                <h5 className="font-bold border-b border-gray-200 pb-1">Recent Diagnostics Count</h5>
                <p><strong className="font-semibold">Diagnostic Entries:</strong> {patient.diagnostic_list.length} records</p>
                <p><strong className="font-semibold">Lab Reports:</strong> {patient.lab_results.length} files</p>
                <p><strong className="font-semibold">History Duration:</strong> {patient.diagnosis_history.length} months</p>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="py-2.5 px-5 bg-[#072635] text-white rounded-full text-sm font-bold hover:bg-[#072635]/90 transition-colors"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
