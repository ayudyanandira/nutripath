// src/pages/DietPlans.jsx
import { useState } from "react";
import PageHeader from "../components/PageHeader";

const dummyPlans = [
  {
    day: "Monday",
    focus: "Fokus high protein + whole grains.",
    type: "Premium",
    meals: {
      Breakfast: "Oatmeal + Greek yogurt + berries",
      Lunch: "Grilled chicken salad + brown rice",
      Dinner: "Salmon, veggies, quinoa",
      Snack: "Almonds + apple",
    },
  },
  {
    day: "Tuesday",
    focus: "Lebih banyak sayur & buah.",
    type: "Free",
    meals: {
      Breakfast: "Smoothie bowl (banana, spinach, chia seeds)",
      Lunch: "Tempe + mixed veggies + brown rice",
      Dinner: "Tuna salad with olive oil",
      Snack: "Yogurt + strawberries",
    },
  },
  {
    day: "Wednesday",
    focus: "Low sugar, high fiber.",
    type: "Premium",
    meals: {
      Breakfast: "Whole grain toast + avocado + egg",
      Lunch: "Chicken breast + roasted veggies",
      Dinner: "Vegetable soup + whole grain bread",
      Snack: "Carrot sticks + hummus",
    },
  },
  {
    day: "Thursday",
    focus: "Plant-based friendly.",
    type: "Free",
    meals: {
      Breakfast: "Overnight oats + chia + banana",
      Lunch: "Tahu tumis sayur + nasi merah",
      Dinner: "Lentil curry + brown rice",
      Snack: "Mixed nuts + orange",
    },
  },
];

const planFilters = ["All", "Free", "Premium"];

export default function DietPlans() {
  const [selectedFilter, setSelectedFilter] = useState("All");

  const filteredPlans =
    selectedFilter === "All"
      ? dummyPlans
      : dummyPlans.filter((p) => p.type === selectedFilter);

  return (
    <div className="max-w-6xl space-y-6">
      <PageHeader
        title="Diet Plans"
        subtitle="Rencana makan harian yang dipersonalisasi (saat ini masih dummy)."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Kolom kiri: daftar plan */}
        <section className="lg:col-span-2 space-y-4">
          {/* Info kecil + filter */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs text-slate-500">
              Ke depan, data di sini akan diambil dari endpoint{" "}
              <span className="font-mono text-[11px] bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100">
                /diet-plans
              </span>{" "}
              sesuai profil dan risiko kesehatanmu.
            </p>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-500">Filter plan:</span>
              <div className="inline-flex rounded-full bg-slate-50 p-1">
                {planFilters.map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setSelectedFilter(f)}
                    className={[
                      "px-3 py-1 rounded-full transition text-xs font-medium",
                      selectedFilter === f
                        ? "bg-white text-emerald-700 shadow-sm border border-emerald-100"
                        : "text-slate-600 hover:bg-white/70",
                    ].join(" ")}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Cards rencana makan */}
          <div className="space-y-4">
            {filteredPlans.map((plan) => (
              <article
                key={plan.day}
                className="bg-white/90 rounded-2xl border border-emerald-50 shadow-[0_18px_45px_rgba(16,185,129,0.08)] backdrop-blur-sm p-5 md:p-6 space-y-3 transition-transform duration-150 hover:-translate-y-[2px]"
              >
                <header className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-sm font-semibold text-slate-900">
                      {plan.day}
                    </h2>
                    <p className="text-xs text-slate-500">{plan.focus}</p>
                  </div>
                  <span
                    className={[
                      "inline-flex items-center rounded-full px-3 py-1 text-[11px] font-medium",
                      plan.type === "Premium"
                        ? "bg-amber-50 text-amber-700 border border-amber-100"
                        : "bg-emerald-50 text-emerald-700 border border-emerald-100",
                    ].join(" ")}
                  >
                    {plan.type} plan
                  </span>
                </header>

                <div className="h-px bg-slate-100" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-sm">
                  {Object.entries(plan.meals).map(([label, value]) => (
                    <div key={label}>
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                        {label}
                      </p>
                      <p className="text-sm text-slate-800">{value}</p>
                    </div>
                  ))}
                </div>
              </article>
            ))}

            {/* Placeholder "coming soon" */}
            <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50/60 px-5 py-4 text-xs text-slate-500">
              Rencana untuk hari lain (Friday–Sunday) akan diisi otomatis
              berdasarkan preferensi dan jadwal aktivitas kamu. Di mode demo,
              kita tampilkan 4 hari sebagai contoh.
            </div>
          </div>
        </section>

        {/* Kolom kanan: panel motivasi / tips */}
        <aside className="space-y-4">
          {/* Motivasi harian */}
          <div className="bg-white/90 rounded-2xl shadow-md border border-emerald-50 p-5 md:p-6 backdrop-blur-sm">
            <h2 className="text-sm font-semibold text-slate-900 mb-2">
              Today&apos;s Motivation
            </h2>
            <p className="text-sm text-slate-700 mb-3">
              Perubahan kecil yang konsisten jauh lebih kuat daripada diet
              ekstrem yang cuma bertahan seminggu.
            </p>
            <ul className="space-y-1.5 text-xs text-slate-600">
              <li>• Pilih satu kebiasaan sehat saja untuk dijaga hari ini.</li>
              <li>• Minum air putih sebelum makan besar.</li>
              <li>
                • Kalau lapar malam, pilih snack tinggi protein, bukan makanan
                manis.
              </li>
            </ul>
            <button
              type="button"
              onClick={() =>
                alert(
                  "Nanti dihubungkan ke halaman tips & edukasi nutrisi ya."
                )
              }
              className="mt-4 inline-flex items-center rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white hover:bg-emerald-700"
            >
              Lihat tips menjaga konsistensi
            </button>
          </div>

          {/* Progress kepatuhan plan */}
          <div className="bg-white/90 rounded-2xl shadow-md border border-slate-100 p-5 md:p-6 backdrop-blur-sm space-y-3">
            <h2 className="text-sm font-semibold text-slate-900">
              Plan adherence (demo)
            </h2>
            <p className="text-xs text-slate-600">
              Nanti bagian ini akan menunjukkan seberapa sering kamu mengikuti
              rencana makan dibandingkan yang direkomendasikan.
            </p>

            <div className="mt-2">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-slate-500">Minggu ini</span>
                <span className="font-semibold text-emerald-700">60%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full w-[60%] bg-emerald-500 rounded-full" />
              </div>
            </div>

            <ul className="text-[11px] text-slate-500 space-y-1">
              <li>• Target awal: capai 70% konsistensi.</li>
              <li>• Tandai hari-hari yang berhasil di halaman Progress.</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
