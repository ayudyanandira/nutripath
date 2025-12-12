// src/pages/Progress.jsx
import PageHeader from "../components/PageHeader";

const progressData = [
  { date: "2025-11-01", weight: 56, steps: 6000, calories: 1900 },
  { date: "2025-11-08", weight: 55.5, steps: 7500, calories: 1800 },
  { date: "2025-11-15", weight: 55, steps: 8200, calories: 1750 },
];

// ---- helper untuk ngolah data sederhana di frontend ----
function getSummary(data) {
  if (!data.length) return null;

  const first = data[0];
  const last = data[data.length - 1];

  const totalSteps = data.reduce((sum, d) => sum + d.steps, 0);
  const avgSteps = Math.round(totalSteps / data.length);

  const weightChange = +(first.weight - last.weight).toFixed(1); // turun = positif
  const caloriesTarget = 1850;

  const goodDays = data.filter(
    (d) => d.steps >= 7000 && d.calories <= caloriesTarget
  ).length;
  const adherence = Math.round((goodDays / data.length) * 100);

  return {
    first,
    last,
    avgSteps,
    weightChange,
    adherence,
    goodDays,
    totalDays: data.length,
  };
}

const summary = getSummary(progressData);

export default function Progress() {
  return (
    <div className="max-w-6xl space-y-6">
      <PageHeader
        title="Progress"
        subtitle="Lihat perubahan berat badan, langkah, dan kalori kamu dari waktu ke waktu."
      />

      {/* Info kecil mode demo */}
      <p className="text-xs text-slate-500">
        Data di bawah ini masih dummy, nantinya akan diambil dari endpoint{" "}
        <span className="font-mono text-[11px] bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100">
          /progress
        </span>{" "}
        berdasarkan log harian kamu.
      </p>

      {/* Ringkasan atas */}
      {summary && (
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card berat badan */}
          <div className="bg-white/90 rounded-2xl border border-emerald-50 shadow-[0_18px_45px_rgba(16,185,129,0.08)] backdrop-blur-sm p-4 md:p-5 flex flex-col justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Weight trend
              </p>
              <p className="mt-1 text-2xl font-semibold text-slate-900">
                {summary.last.weight}
                <span className="text-sm font-normal text-slate-500 ml-1">
                  kg
                </span>
              </p>
              <p
                className={[
                  "mt-1 text-xs font-medium",
                  summary.weightChange > 0
                    ? "text-emerald-600"
                    : summary.weightChange < 0
                    ? "text-rose-600"
                    : "text-slate-500",
                ].join(" ")}
              >
                {summary.weightChange > 0 &&
                  `Turun ${summary.weightChange} kg sejak ${summary.first.date}`}
                {summary.weightChange < 0 &&
                  `Naik ${Math.abs(summary.weightChange)} kg`}
                {summary.weightChange === 0 && "Stabil sejak pengukuran awal"}
              </p>
            </div>
            <p className="mt-3 text-[11px] text-slate-500">
              Target jangka panjang bukan turun drastis, tapi stabil di kisaran
              sehat.
            </p>
          </div>

          {/* Card steps */}
          <div className="bg-white/90 rounded-2xl border border-slate-100 shadow-md backdrop-blur-sm p-4 md:p-5 flex flex-col justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Activity
              </p>
              <p className="mt-1 text-2xl font-semibold text-slate-900">
                {summary.avgSteps.toLocaleString()}
                <span className="text-sm font-normal text-slate-500 ml-1">
                  steps / day
                </span>
              </p>

              <div className="mt-3">
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className="text-slate-500">Weekly target</span>
                  <span className="text-slate-500">7,000</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full bg-sky-500 rounded-full"
                    style={{
                      width: `${Math.min(
                        100,
                        Math.round((summary.avgSteps / 7000) * 100)
                      )}%`,
                    }}
                  />
                </div>
              </div>
            </div>
            <p className="mt-3 text-[11px] text-slate-500">
              Di atas 7.000 langkah/hari sudah bagus. Tambah sedikit intensitas
              kalau mau percepat penurunan berat badan.
            </p>
          </div>

          {/* Card konsistensi */}
          <div className="bg-white/90 rounded-2xl border border-slate-100 shadow-md backdrop-blur-sm p-4 md:p-5 flex flex-col justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Consistency
              </p>
              <p className="mt-1 text-2xl font-semibold text-slate-900">
                {summary.adherence}%
              </p>
              <p className="mt-1 text-xs text-slate-600">
                {summary.goodDays} dari {summary.totalDays} hari dengan langkah
                &ge; 7.000 dan kalori sekitar 1.850 kkal.
              </p>
            </div>
            <p className="mt-3 text-[11px] text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-lg px-3 py-2">
              Konsistensi di atas 60% sudah on track. Fokus naikkan perlahan ke
              70–80% tanpa merasa tersiksa.
            </p>
          </div>
        </section>
      )}

      {/* Log detail */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tabel progress */}
        <div className="lg:col-span-2">
          <div className="bg-white/90 rounded-2xl border border-slate-100 shadow-md backdrop-blur-sm overflow-hidden">
            <div className="px-5 pt-4 pb-2 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-slate-900">
                Progress log
              </h2>
              <span className="text-[11px] text-slate-500">
                Log mingguan &mdash; nantinya bisa diganti harian
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 text-xs text-slate-500 uppercase tracking-wide">
                    <th className="text-left px-5 py-2.5">Date</th>
                    <th className="text-right px-5 py-2.5">Weight (kg)</th>
                    <th className="text-right px-5 py-2.5">Steps</th>
                    <th className="text-right px-5 py-2.5">Calories</th>
                  </tr>
                </thead>
                <tbody>
                  {progressData.map((row, idx) => (
                    <tr
                      key={row.date}
                      className={
                        idx % 2 === 0 ? "bg-white" : "bg-slate-50/60"
                      }
                    >
                      <td className="px-5 py-2.5 text-slate-800 text-sm">
                        {row.date}
                      </td>
                      <td className="px-5 py-2.5 text-right text-slate-800">
                        {row.weight}
                      </td>
                      <td className="px-5 py-2.5 text-right text-slate-800">
                          {row.steps.toLocaleString()}
                      </td>
                      <td className="px-5 py-2.5 text-right text-slate-800">
                        {row.calories}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Small wins / tips */}
        <aside className="space-y-4">
          <div className="bg-white/90 rounded-2xl border border-emerald-50 shadow-md backdrop-blur-sm p-5 space-y-2">
            <h2 className="text-sm font-semibold text-slate-900">
              Small wins minggu ini
            </h2>
            <p className="text-xs text-slate-600">
              NutriPath menyorot beberapa hal positif dari data kamu.
            </p>
            <ul className="mt-1 space-y-1.5 text-xs text-slate-700">
              <li>• Berat turun secara bertahap, tanpa lonjakan ekstrem.</li>
              <li>
                • Rata-rata langkah sudah mendekati <b>7.500 langkah/hari</b>.
              </li>
              <li>
                • Asupan kalori konsisten di sekitar{" "}
                <b>1.750–1.900 kkal/hari</b>.
              </li>
            </ul>
          </div>

          <div className="bg-white/90 rounded-2xl border border-slate-100 shadow-md backdrop-blur-sm p-5 space-y-3 text-xs text-slate-600">
            <h2 className="text-sm font-semibold text-slate-900">
              Next focus (demo)
            </h2>
            <p>
              Untuk minggu berikutnya, coba pilih satu hal kecil untuk
              ditingkatkan:
            </p>
            <ul className="space-y-1.5">
              <li>• Tambah 500–1.000 langkah per hari.</li>
              <li>• Sisipkan 1 porsi sayur ekstra di makan siang.</li>
              <li>• Minimal 2 hari tanpa minuman manis.</li>
            </ul>
          </div>
        </aside>
      </section>
    </div>
  );
}
