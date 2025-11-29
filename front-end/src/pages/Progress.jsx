// src/pages/Progress.jsx
import PageHeader from "../components/PageHeader";

const dummyProgressHistory = [
  { date: "2025-11-01", weight: 56, steps: 6000, calories: 1900 },
  { date: "2025-11-08", weight: 55.5, steps: 7500, calories: 1800 },
  { date: "2025-11-15", weight: 55, steps: 8200, calories: 1750 },
];

export default function Progress() {
  return (
    <div className="max-w-4xl">
      <PageHeader
        title="Progress"
        subtitle="Lihat perubahan berat badan, langkah, dan kalori kamu dari waktu ke waktu."
      />

      <p className="text-xs text-slate-500 mb-4">
        Data di bawah ini masih dummy, nantinya akan diambil dari endpoint{" "}
        <code>/progress</code>.
      </p>

      <div className="bg-white rounded-xl shadow-sm p-5">
        <table className="w-full text-sm text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="py-2 font-semibold text-slate-700">Date</th>
              <th className="py-2 font-semibold text-slate-700">
                Weight (kg)
              </th>
              <th className="py-2 font-semibold text-slate-700">Steps</th>
              <th className="py-2 font-semibold text-slate-700">
                Calories
              </th>
            </tr>
          </thead>
          <tbody>
            {dummyProgressHistory.map((row) => (
              <tr
                key={row.date}
                className="border-b border-slate-100 last:border-0"
              >
                <td className="py-2 text-slate-700">{row.date}</td>
                <td className="py-2 text-slate-700">{row.weight}</td>
                <td className="py-2 text-slate-700">{row.steps}</td>
                <td className="py-2 text-slate-700">{row.calories}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
