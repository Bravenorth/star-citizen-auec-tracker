// src/components/AUECTable.tsx
'use client';

interface AUECTableProps {
  data: { [key: string]: number };
}

export default function AUECTable({ data }: AUECTableProps) {
  return (
    <div className="overflow-x-auto mt-8">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 bg-gray-100 border-b">Mois</th>
            <th className="py-2 px-4 bg-gray-100 border-b">AUEC</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(data).map(([month, auec]) => (
            <tr key={month} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b text-center">{month}</td>
              <td className="py-2 px-4 border-b text-center">{auec}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
