import React from 'react';
import { DiagnosticItem } from '../types/patient';

interface DiagnosticListProps {
  items?: DiagnosticItem[];
}

export const DiagnosticList: React.FC<DiagnosticListProps> = ({ items = [] }) => {
  return (
    <section className="bg-white rounded-2xl p-6 shadow-xs border border-gray-100">
      <h2 className="text-2xl font-extrabold text-[#072635] mb-5">Diagnostic List</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#F6F7F8] text-[#072635] text-sm font-bold rounded-xl overflow-hidden">
              <th className="py-3.5 px-4 rounded-l-xl w-1/4">Problem/Diagnosis</th>
              <th className="py-3.5 px-4 w-1/2">Description</th>
              <th className="py-3.5 px-4 rounded-r-xl w-1/4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {items.length === 0 ? (
              <tr>
                <td colSpan={3} className="py-6 text-center text-sm text-[#707070]">
                  No diagnostic records available.
                </td>
              </tr>
            ) : (
              items.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50/60 transition-colors">
                  <td className="py-4 px-4 text-sm font-bold text-[#072635]">
                    {item.name}
                  </td>
                  <td className="py-4 px-4 text-sm text-[#072635] font-normal leading-relaxed">
                    {item.description}
                  </td>
                  <td className="py-4 px-4 text-sm text-[#072635] font-normal">
                    <span className="inline-block py-1 px-3 rounded-full text-xs font-semibold bg-gray-100 text-[#072635]">
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};
