// src/pages/DietPlans.jsx
import { useMemo, useState } from "react";
import PageHeader from "../components/PageHeader";

/**
 * Dummy user plan:
 * UBAH jadi "Free" untuk melihat mode Free.
 */
const dummyUser = {
  plan: "Free", // "Free" | "Premium"
};

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
  // "plans" | "consistency"
  const [view, setView] = useState("plans");

  const isPremiumUser = useMemo(
    () => String(dummyUser.plan).toLowerCase() === "premium",
    []
  );

  const filteredPlans =
    selectedFilter === "All"
      ? dummyPlans
      : dummyPlans.filter((p) => p.type === selectedFilter);

  // -----------------------------
  // VIEW: CONSISTENCY PAGE (UI)
  // -----------------------------
  if (view === "consistency") {
    return (
      <div className="max-w-6xl space-y-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setView("plans")}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-slate-900"
          >
            <span className="text-lg leading-none">&lt;</span>
            Kembali
          </button>

          <span
            className={`ml-auto inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold border ${
              isPremiumUser
                ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                : "bg-slate-50 text-slate-700 border-slate-200"
            }`}
          >
            Plan: {isPremiumUser ? "Premium" : "Free"}
          </span>
        </div>

        <PageHeader
          title="Menjaga Konsistensi"
          subtitle="Tips sederhana agar kamu tetap on track (UI-only, dummy)."
        />

        {/* Motivational quote */}
        <div className="bg-white rounded-2xl border border-emerald-50 shadow-md p-6">
          <p className="text-sm text-slate-600 mb-2">Kutipan motivasi</p>
          <blockquote className="text-lg font-semibold text-slate-900 leading-snug">
            “Konsistensi mengalahkan intensitas. Sedikit demi sedikit, tapi rutin.”
          </blockquote>
          <p className="text-xs text-slate-500 mt-2">
            — NutriPath (demo)
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: checklist & tactics */}
          <section className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-3">
              <h2 className="text-base font-semibold text-slate-900">
                Strategi cepat (5–10 menit)
              </h2>
              <ul className="text-sm text-slate-700 space-y-2">
                <li className="flex gap-2">
                  <span className="text-emerald-600">•</span>
                  <span>
                    Pilih <span className="font-semibold">1 kebiasaan</span> saja untuk dijaga hari ini (contoh: minum air sebelum makan).
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-600">•</span>
                  <span>
                    Siapkan <span className="font-semibold">snack aman</span> (protein/serat) supaya tidak impulsif.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-600">•</span>
                  <span>
                    Pakai aturan <span className="font-semibold">“cukup baik”</span>: tidak perlu sempurna, yang penting jalan terus.
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
              <h2 className="text-base font-semibold text-slate-900">
                Checklist harian (demo)
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                {[
                  "Minum air 6–8 gelas",
                  "Makan sayur minimal 1 porsi",
                  "Jalan kaki 20 menit",
                  "Protein di 1 kali makan",
                  "Tidur minimal 7 jam",
                  "Kurangi minuman manis",
                ].map((item) => (
                  <label
                    key={item}
                    className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 bg-slate-50"
                  >
                    <input type="checkbox" />
                    <span className="text-slate-800">{item}</span>
                  </label>
                ))}
              </div>

              <div className="flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => alert("Tersimpan (dummy UI).")}
                  className="px-4 py-2.5 rounded-lg text-sm font-semibold bg-emerald-600 text-white hover:bg-emerald-700"
                >
                  Simpan checklist (dummy)
                </button>
              </div>

              {!isPremiumUser && (
                <p className="text-xs text-slate-500">
                  Free: checklist ini tetap bisa dipakai (UI). Premium nanti dapat analisis kebiasaan lebih detail (demo).
                </p>
              )}
            </div>
          </section>

          {/* Right: mini plan / reminder */}
          <aside className="space-y-4">
            <div className="bg-white rounded-2xl border border-emerald-50 shadow-md p-6">
              <h2 className="text-sm font-semibold text-slate-900">
                Mini-plan hari ini
              </h2>
              <p className="text-xs text-slate-600 mt-2">
                Target kecil yang realistis lebih mudah dijaga.
              </p>

              <div className="mt-4 space-y-3 text-sm">
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100">
                  <p className="text-xs font-semibold text-emerald-800">Target #1</p>
                  <p className="text-emerald-900 font-semibold">
                    Tambah 1 porsi sayur di makan siang
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-sky-50 border border-sky-100">
                  <p className="text-xs font-semibold text-sky-800">Target #2</p>
                  <p className="text-sky-900 font-semibold">
                    Jalan kaki 10–15 menit setelah makan
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => alert("Reminder/Notifikasi (dummy UI).")}
                className="mt-4 w-full rounded-lg bg-slate-900 px-3 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
              >
                Set reminder (dummy)
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <h2 className="text-sm font-semibold text-slate-900">
                Catatan kecil
              </h2>
              <p className="text-xs text-slate-600 mt-2">
                Kalau kamu “melenceng” hari ini, bukan gagal. Itu hanya satu data point.
                Besok lanjut lagi.
              </p>
            </div>
          </aside>
        </div>
      </div>
    );
  }

  // -----------------------------
  // VIEW: DIET PLANS (MAIN)
  // -----------------------------
  return (
    <div className="max-w-6xl space-y-6">
      <PageHeader
        title="Diet Plans"
        subtitle="Rencana makan harian yang dipersonalisasi (saat ini masih dummy)."
      />

      {/* Free vs Premium banner */}
      {!isPremiumUser ? (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 flex items-start justify-between gap-4">
          <div>
            <p className="font-semibold text-amber-900">Free Plan</p>
            <p className="text-sm text-amber-800 mt-1">
              Kamu bisa akses rencana Free. Rencana Premium akan tampil sebagai preview (locked).
            </p>
          </div>
          <button
            type="button"
            className="shrink-0 inline-flex items-center rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
            onClick={() => alert("Go Premium page masih dikerjakan (dummy).")}
          >
            Upgrade
          </button>
        </div>
      ) : (
        <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-5 flex items-start justify-between gap-4">
          <div>
            <p className="font-semibold text-emerald-900">Premium Active</p>
            <p className="text-sm text-emerald-800 mt-1">
              Kamu dapat akses rencana Free + Premium (demo).
            </p>
          </div>
          <span className="shrink-0 inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold border border-emerald-200 text-emerald-800">
            Full access
          </span>
        </div>
      )}

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
            {filteredPlans.map((plan) => {
              const isPremiumPlan = plan.type === "Premium";
              const isLocked = !isPremiumUser && isPremiumPlan;

              return (
                <article
                  key={plan.day}
                  className={[
                    "bg-white/90 rounded-2xl border shadow-[0_18px_45px_rgba(16,185,129,0.08)] backdrop-blur-sm p-5 md:p-6 space-y-3 transition-transform duration-150 hover:-translate-y-[2px]",
                    isPremiumPlan ? "border-amber-100" : "border-emerald-50",
                  ].join(" ")}
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
                        "inline-flex items-center rounded-full px-3 py-1 text-[11px] font-medium border",
                        isPremiumPlan
                          ? "bg-amber-50 text-amber-700 border-amber-100"
                          : "bg-emerald-50 text-emerald-700 border-emerald-100",
                      ].join(" ")}
                    >
                      {plan.type} plan
                    </span>
                  </header>

                  <div className="h-px bg-slate-100" />

                  {/* Meals */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-sm">
                    {Object.entries(plan.meals).map(([label, value]) => (
                      <div key={label} className={isLocked ? "select-none" : ""}>
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                          {label}
                        </p>

                        {/* Lock/blur only for Free user on Premium plans */}
                        <p
                          className={[
                            "text-sm text-slate-800",
                            isLocked ? "blur-[3px] opacity-70" : "",
                          ].join(" ")}
                        >
                          {value}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Locked footer */}
                  {isLocked && (
                    <div className="pt-2">
                      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 flex items-start justify-between gap-4">
                        <div>
                          <p className="text-sm font-semibold text-amber-900">
                            Premium only
                          </p>
                          <p className="text-xs text-amber-800 mt-1">
                            Upgrade untuk melihat detail rencana Premium.
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            alert("Go Premium page masih dikerjakan (dummy).")
                          }
                          className="shrink-0 inline-flex items-center rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white hover:bg-slate-800"
                        >
                          Upgrade
                        </button>
                      </div>
                    </div>
                  )}
                </article>
              );
            })}

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
              Perubahan kecil yang konsisten jauh lebih kuat daripada diet ekstrem
              yang cuma bertahan seminggu.
            </p>

            <ul className="space-y-1.5 text-xs text-slate-600">
              <li>• Pilih satu kebiasaan sehat saja untuk dijaga hari ini.</li>
              <li>• Minum air putih sebelum makan besar.</li>
              <li>• Kalau lapar malam, pilih snack tinggi protein, bukan makanan manis.</li>
            </ul>

            <button
              type="button"
              onClick={() => setView("consistency")}
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
              Nanti bagian ini akan menunjukkan seberapa sering kamu mengikuti rencana makan
              dibandingkan yang direkomendasikan.
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
              {!isPremiumUser && (
                <li>• Premium: nanti dapat insight konsistensi yang lebih detail (demo).</li>
              )}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
