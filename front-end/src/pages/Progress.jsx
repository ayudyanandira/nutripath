// src/pages/Progress.jsx
import { useMemo, useState } from "react";
import PageHeader from "../components/PageHeader";
import { useNavigate } from "react-router-dom";

/**
 * Dummy user plan:
 * UBAH jadi "Free" untuk melihat lock Next Focus & Weekly Challenge.
 */
const dummyUser = {
  plan: "Free", // "Free" | "Premium"
};

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
    caloriesTarget,
  };
}

const summary = getSummary(progressData);

export default function Progress() {
  // "progress" | "challenge"
  const [view, setView] = useState("progress");

  const isPremium = useMemo(
    () => String(dummyUser.plan).toLowerCase() === "premium",
    []
  );

  // Gate: jangan biarkan Free masuk ke view challenge (UI-only)
  if (view === "challenge" && !isPremium) {
    setView("progress");
  }

  const navigate = useNavigate();

  // -----------------------------
  // VIEW: CHALLENGE PAGE (Premium only)
  // -----------------------------
  if (view === "challenge") {
    return (
      <div className="max-w-6xl space-y-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setView("progress")}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-slate-900"
          >
            <span className="text-lg leading-none">&lt;</span>
            Kembali
          </button>

          <span className="ml-auto inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold border bg-emerald-50 text-emerald-700 border-emerald-100">
            Plan: Premium
          </span>
        </div>

        <PageHeader
          title="Weekly Challenge"
          subtitle="Tantangan sederhana untuk membantu kamu konsisten (UI-only, dummy)."
        />

        {/* Quote */}
        <div className="bg-white rounded-2xl border border-emerald-50 shadow-md p-6">
          <p className="text-sm text-slate-600 mb-2">Kutipan motivasi</p>
          <blockquote className="text-lg font-semibold text-slate-900 leading-snug">
            “Progres itu tidak harus cepat. Yang penting tidak berhenti.”
          </blockquote>
          <p className="text-xs text-slate-500 mt-2">— NutriPath (demo)</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left */}
          <section className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-3">
              <h2 className="text-base font-semibold text-slate-900">
                Pilih 1 challenge untuk 7 hari ke depan
              </h2>
              <p className="text-sm text-slate-600">
                Tujuannya kecil, jelas, dan realistis.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                {[
                  { title: "Tambah langkah", desc: "Tambah 800 langkah/hari" },
                  { title: "No sugary drinks", desc: "2 hari tanpa minuman manis" },
                  { title: "Protein snack", desc: "1 snack tinggi protein/hari" },
                  { title: "Sayur ekstra", desc: "Tambah 1 porsi sayur di siang" },
                ].map((c) => (
                  <label
                    key={c.title}
                    className="flex items-start gap-3 p-4 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-white transition"
                  >
                    <input type="radio" name="challenge" className="mt-1" />
                    <div>
                      <p className="font-semibold text-slate-900">{c.title}</p>
                      <p className="text-xs text-slate-600 mt-1">{c.desc}</p>
                    </div>
                  </label>
                ))}
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => alert("Challenge disimpan (dummy UI).")}
                  className="px-4 py-2.5 rounded-lg text-sm font-semibold bg-emerald-600 text-white hover:bg-emerald-700"
                >
                  Mulai challenge (dummy)
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-3">
              <h2 className="text-base font-semibold text-slate-900">
                Tracker (demo)
              </h2>
              <p className="text-sm text-slate-600">
                Centang hari yang berhasil. Ini masih UI saja.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                {["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"].map(
                  (d) => (
                    <label
                      key={d}
                      className="flex items-center gap-2 p-3 rounded-xl border border-slate-200 bg-slate-50"
                    >
                      <input type="checkbox" />
                      <span className="text-slate-800">{d}</span>
                    </label>
                  )
                )}
              </div>

              <div className="flex items-center justify-end">
                <button
                  type="button"
                  onClick={() => alert("Progress challenge tersimpan (dummy).")}
                  className="px-4 py-2.5 rounded-lg text-sm font-semibold bg-slate-900 text-white hover:bg-slate-800"
                >
                  Simpan tracker (dummy)
                </button>
              </div>
            </div>
          </section>

          {/* Right */}
          <aside className="space-y-4">
            <div className="bg-white rounded-2xl border border-emerald-50 shadow-md p-6">
              <h2 className="text-sm font-semibold text-slate-900">
                Rekomendasi kecil (demo)
              </h2>
              <p className="text-xs text-slate-600 mt-2">
                Kalau kamu ingin mulai yang paling mudah:
              </p>

              <div className="mt-3 space-y-2">
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100">
                  <p className="text-xs font-semibold text-emerald-800">
                    Suggestion
                  </p>
                  <p className="text-sm font-semibold text-emerald-900">
                    Tambah 10 menit jalan kaki setelah makan
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-sky-50 border border-sky-100">
                  <p className="text-xs font-semibold text-sky-800">Reminder</p>
                  <p className="text-sm font-semibold text-sky-900">
                    Siapkan botol minum di meja kerja
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => alert("Reminder (dummy UI).")}
                className="mt-4 w-full rounded-lg bg-emerald-600 px-3 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
              >
                Set reminder (dummy)
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <h2 className="text-sm font-semibold text-slate-900">Catatan</h2>
              <p className="text-xs text-slate-600 mt-2">
                Jangan menunggu mood bagus. Mulai dari satu langkah kecil.
              </p>
            </div>
          </aside>
        </div>
      </div>
    );
  }

  // -----------------------------
  // VIEW: MAIN PROGRESS PAGE
  // -----------------------------
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

      {/* Weekly Challenge: Premium-only */}
      {isPremium ? (
        <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-5 flex items-start justify-between gap-4">
          <div>
            <p className="font-semibold text-emerald-900">Weekly Challenge</p>
            <p className="text-sm text-emerald-800 mt-1">
              Pilih tantangan kecil untuk 7 hari agar konsistensi naik.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setView("challenge")}
            className="shrink-0 inline-flex items-center rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            Buka challenge
          </button>
        </div>
      ) : (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <p className="font-semibold text-amber-900">Weekly Challenge</p>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-white/60 text-amber-900 border border-amber-200">
                Premium
              </span>
            </div>
            <p className="text-sm text-amber-800 mt-1">
              Fitur challenge hanya tersedia untuk Premium.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate("/go-premium")}
            className="shrink-0 inline-flex items-center rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Upgrade
          </button>
        </div>
      )}

      {/* Ringkasan atas */}
      {summary && (
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Weight */}
          <div className="bg-white/90 rounded-2xl border border-emerald-50 shadow-[0_18px_45px_rgba(16,185,129,0.08)] backdrop-blur-sm p-4 md:p-5 flex flex-col justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Weight trend
              </p>
              <p className="mt-1 text-2xl font-semibold text-slate-900">
                {summary.last.weight}
                <span className="text-sm font-normal text-slate-500 ml-1">kg</span>
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
              Target jangka panjang bukan turun drastis, tapi stabil di kisaran sehat.
            </p>
          </div>

          {/* Activity */}
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

          {/* Consistency */}
          <div className="bg-white/90 rounded-2xl border border-slate-100 shadow-md backdrop-blur-sm p-4 md:p-5 flex flex-col justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Consistency
              </p>
              <p className="mt-1 text-2xl font-semibold text-slate-900">
                {summary.adherence}%
              </p>
              <p className="mt-1 text-xs text-slate-600">
                {summary.goodDays} dari {summary.totalDays} hari dengan langkah ≥ 7.000
                dan kalori sekitar {summary.caloriesTarget.toLocaleString()} kkal.
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
              <h2 className="text-sm font-semibold text-slate-900">Progress log</h2>
              <span className="text-[11px] text-slate-500">
                Log mingguan — nantinya bisa diganti harian
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
                      className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/60"}
                    >
                      <td className="px-5 py-2.5 text-slate-800 text-sm">{row.date}</td>
                      <td className="px-5 py-2.5 text-right text-slate-800">{row.weight}</td>
                      <td className="px-5 py-2.5 text-right text-slate-800">
                        {row.steps.toLocaleString()}
                      </td>
                      <td className="px-5 py-2.5 text-right text-slate-800">{row.calories}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Kolom kanan atas: Small wins */}
        <aside className="space-y-4">
          <div className="bg-white/90 rounded-2xl border border-emerald-50 shadow-md backdrop-blur-sm p-5 space-y-2">
            <h2 className="text-sm font-semibold text-slate-900">Small wins minggu ini</h2>
            <p className="text-xs text-slate-600">
              NutriPath menyorot beberapa hal positif dari data kamu.
            </p>
            <ul className="mt-1 space-y-1.5 text-xs text-slate-700">
              <li>• Berat turun secara bertahap, tanpa lonjakan ekstrem.</li>
              <li>• Rata-rata langkah sudah mendekati <b>7.500 langkah/hari</b>.</li>
              <li>
                • Asupan kalori konsisten di sekitar <b>1.750–1.900 kkal/hari</b>.
              </li>
            </ul>
          </div>
        </aside>

        {/* ROW BAWAH: Next focus full-width (agar kiri tidak kosong) */}
        <div className="lg:col-span-3">
          {!isPremium ? (
            <div className="bg-white/90 rounded-2xl border border-slate-100 shadow-md backdrop-blur-sm p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-sm font-semibold text-slate-900">
                    Next focus (Premium)
                  </h2>
                  <p className="text-xs text-slate-600 mt-1">
                    Rekomendasi fokus mingguan tersedia untuk Premium.
                  </p>
                </div>

                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                  Locked
                </span>
              </div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3 select-none">
                {[
                  "Tambah 500–1.000 langkah per hari",
                  "Sisipkan 1 porsi sayur ekstra di makan siang",
                  "Minimal 2 hari tanpa minuman manis",
                ].map((txt, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-2xl border border-slate-200 bg-slate-50"
                  >
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                      Focus #{i + 1}
                    </p>
                    <p className="mt-1 text-sm text-slate-800 blur-[3px] opacity-70">
                      {txt}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
                <p className="text-xs text-slate-500">
                  Upgrade untuk membuka rekomendasi fokus mingguan yang lebih personal.
                </p>
                <button
                  type="button"
                  onClick={() => navigate("/go-premium")}
                  className="md:w-auto w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
                >
                  Upgrade untuk buka Next focus
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl shadow-md border border-slate-100 p-6 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-sm font-semibold">Next focus (Premium)</h2>
                  <p className="text-xs text-white/80 mt-1">
                    Fokus minggu depan berdasarkan pola langkah & kalori kamu.
                  </p>
                </div>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-white/10 border border-white/15">
                  Personalized (demo)
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {[
                  "Tambah +700 langkah/hari (target mingguan bertahap)",
                  "Tambah 1 porsi sayur di makan siang (serat naik)",
                  "2 hari tanpa minuman manis (reset cravings)",
                ].map((txt, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-white/10 border border-white/15">
                    <p className="text-[11px] font-semibold text-white/70 uppercase tracking-wide">
                      Focus #{i + 1}
                    </p>
                    <p className="mt-1 text-sm font-semibold">{txt}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 gap-2">
                <button
                  type="button"
                  onClick={() => alert("Diset sebagai fokus minggu ini (dummy).")}
                  className="w-full rounded-lg bg-white text-slate-900 px-3 py-2.5 text-sm font-semibold hover:bg-slate-100"
                >
                  Set sebagai fokus minggu ini (dummy)
                </button>
                
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
