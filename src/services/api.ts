import { Patient } from '../types/patient';

const API_URL = 'https://fedskillstest.coalitiontechnologies.workers.dev';
const AUTH_USERNAME = 'coalition';
const AUTH_PASSWORD = 'skills-test';

export async function fetchPatients(): Promise<Patient[]> {
  const credentials = btoa(`${AUTH_USERNAME}:${AUTH_PASSWORD}`);
  const response = await fetch(API_URL, {
    method: 'GET',
    headers: {
      'Authorization': `Basic ${credentials}`,
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch patient data: HTTP ${response.status}`);
  }

  const data: Patient[] = await response.json();
  return data;
}

export function findJessicaTaylor(patients: Patient[]): Patient | undefined {
  return patients.find(p => p.name.trim().toLowerCase() === 'jessica taylor');
}
