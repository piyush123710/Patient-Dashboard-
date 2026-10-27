/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback } from 'react';
import { Patient } from './types/patient';
import { fetchPatients, findJessicaTaylor } from './services/api';
import { Header } from './components/Header';
import { PatientsSidebar } from './components/PatientsSidebar';
import { DiagnosisHistory } from './components/DiagnosisHistory';
import { DiagnosticList } from './components/DiagnosticList';
import { PatientProfile } from './components/PatientProfile';
import { LabResults } from './components/LabResults';
import { LoadingSkeleton } from './components/LoadingSkeleton';
import { ErrorState } from './components/ErrorState';

export default function App() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [activeTab, setActiveTab] = useState('Patients');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchPatients();
      setPatients(data);

      // Locate Jessica Taylor specifically as required by instructions
      const jessica = findJessicaTaylor(data);
      if (jessica) {
        setSelectedPatient(jessica);
      } else if (data.length > 0) {
        setSelectedPatient(data[0]);
      }
    } catch (err: any) {
      console.error('API Error:', err);
      setError(err?.message || 'Failed to connect to Patient Data API.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <div className="min-h-screen bg-[#F6F7F8] flex flex-col pb-8">
      {/* Top Header Navigation */}
      <Header activeTab={activeTab} onSelectTab={setActiveTab} />

      {/* Main Container Layout */}
      <main className="flex-1 px-4 max-w-[1600px] mx-auto w-full">
        {error ? (
          <ErrorState message={error} onRetry={loadData} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Column 1: Left Patients Sidebar (3 Cols on Desktop) */}
            <div className="lg:col-span-3 xl:col-span-3 h-[calc(100vh-120px)] min-h-[700px] sticky top-4">
              <PatientsSidebar
                patients={patients}
                selectedPatient={selectedPatient}
                onSelectPatient={(patient) => setSelectedPatient(patient)}
                isLoading={isLoading}
              />
            </div>

            {/* Column 2: Center Content - Diagnosis History & Diagnostics List (6 Cols on Desktop) */}
            <div className="lg:col-span-6 xl:col-span-6 space-y-6">
              {isLoading || !selectedPatient ? (
                <LoadingSkeleton />
              ) : (
                <>
                  <DiagnosisHistory history={selectedPatient.diagnosis_history} />
                  <DiagnosticList items={selectedPatient.diagnostic_list} />
                </>
              )}
            </div>

            {/* Column 3: Right Patient Profile & Lab Results (3 Cols on Desktop) */}
            <div className="lg:col-span-3 xl:col-span-3 space-y-6">
              {isLoading || !selectedPatient ? (
                <div className="bg-white rounded-2xl p-6 h-96 animate-pulse" />
              ) : (
                <>
                  <PatientProfile patient={selectedPatient} />
                  <LabResults labResults={selectedPatient.lab_results} />
                </>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
