# Patient Dashboard — Jessica Taylor (TechCare)

A responsive, single-page Patient Dashboard built for Coalition Technologies Front-End Developer Assessment following the Adobe XD reference design.

## Features & Implementation

1. **Patient Information & Profile (Jessica Taylor)**
   - Name, Profile Image, Age, Gender, Date of Birth (`08/23/1996` formatted to `August 23, 1996`), Phone Number, Emergency Contact, and Insurance Provider dynamically fetched from API.
   - Interactive "Show All Information" modal with comprehensive details.

2. **Patient Navigation Sidebar**
   - Scrollable list of patients retrieved from the REST API.
   - Real-time search filter by patient name, age, or gender.
   - Active highlight styling (`#D8FCF7` / `#01F0D0`) for selected patient (Jessica Taylor by default).

3. **Blood Pressure Visualization (Chart.js)**
   - Interactive Chart.js line graph displaying historical Systolic (`#E66FD2`) and Diastolic (`#8C6FE6`) values over time with curved bezier lines.
   - Filter dropdown (Last 6 months / Last 12 months / All time).
   - Side summary cards showing current Systolic & Diastolic readings, arrow indicators, and status levels (`Higher than Average`, `Lower than Average`).

4. **Vital Signs Cards**
   - **Respiratory Rate**: `20 bpm` (`Normal`) on light blue surface (`#E0F3FA`).
   - **Temperature**: `98.6°F` (`Normal`) on light pink surface (`#FFE6E9`).
   - **Heart Rate**: `78 bpm` (`Lower than Average`) on soft rose surface (`#FFE6F1`).

5. **Diagnosis History & Diagnostic List**
   - Table displaying problem name (e.g., Hypertension, Type 2 Diabetes, Asthma), description, and status tags (`Under Observation`, `Cured`, `Inactive`, `Untreated`).

6. **Diagnostic Results & Lab Reports**
   - List of downloadable lab reports (Blood Tests, CT Scans, Radiology Reports, X-Rays) with dynamic download simulation.

7. **REST API & Error Handling**
   - Connects to `https://fedskillstest.coalitiontechnologies.workers.dev` via HTTP GET.
   - Uses dynamic Basic Authentication (`btoa('coalition:skills-test')`).
   - Handles loading skeletons, network errors, and retry actions safely.

## Tech Stack

- **Framework**: React 19 + TypeScript
- **Styling**: Tailwind CSS v4 + Custom CSS
- **Visualization**: Chart.js + react-chartjs-2
- **Icons**: Lucide React + Inline Vector SVGs
- **HTTP Client**: Native Fetch API with dynamic Basic Auth encoding

## Setup & Running

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Build production bundle
npm run build
```
