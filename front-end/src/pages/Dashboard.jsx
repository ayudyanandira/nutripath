// src/pages/Dashboard.jsx
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const dummyProfile = {
  name: "Ayudya",
  age: 21,
  height: 160,
  weight: 55,
  geneticRisk: "Diabetes - Low Risk",
  // UBAH INI UNTUK TEST ROLE:
  // "Free" | "Premium"
  planStatus: "Free",
};

const dummyDietToday = [
  { time: "Breakfast", menu: "Oatmeal + Greek yogurt + berries", calories: 350 },
  { time: "Lunch", menu: "Grilled chicken salad + brown rice", calories: 550 },
  { time: "Dinner", menu: "Salmon, veggies, quinoa", calories: 500 },
  { time: "Snack", menu: "Almonds + apple", calories: 200 },
];

const dummyProgress = {
  caloriesTarget: 1800,
  caloriesConsumed: 1200,
  stepsTarget: 8000,
  stepsCurrent: 5000,
};

export default function Dashboard() {
  // "dashboard" | "expert"
  const [view, setView] = useState("dashboard");

  const isPremium = useMemo(
    () => String(dummyProfile.planStatus).toLowerCase() === "premium",
    []
  );

  const caloriesPercent = Math.min(
    100,
    Math.round(
      (dummyProgress.caloriesConsumed / dummyProgress.caloriesTarget) * 100
    )
  );
  const stepsPercent = Math.min(
    100,
    Math.round((dummyProgress.stepsCurrent / dummyProgress.stepsTarget) * 100)
  );

  // FREE: kita batasi diet plan (contoh: hanya 2 item tampil, sisanya locked)
  const visibleDietItems = isPremium ? dummyDietToday : dummyDietToday.slice(0, 2);
  const lockedDietItems = isPremium ? [] : dummyDietToday.slice(2);

  const navigate = useNavigate();
  // ---------------------------
  // VIEW: KONSUL EXPERT (UI-only)
  // ---------------------------
  if (view === "expert") {
    return (
      <div className="max-w-6xl mx-auto py-6 space-y-6">
        {/* Top bar */}
        <header className="flex items-center justify-between">
          <button
            onClick={() => setView("dashboard")}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-slate-900"
          >
            <span className="text-lg leading-none">&lt;</span>
            Kembali
          </button>

          <span
            className={`text-xs font-semibold px-3 py-1 rounded-full border ${
              isPremium
                ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                : "bg-slate-50 text-slate-700 border-slate-200"
            }`}
          >
            Plan: {isPremium ? "Premium" : "Free"}
          </span>
        </header>

        {/* Page header */}
        <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-6">
          <h1 className="text-2xl font-bold text-slate-900">Konsul Expert</h1>
          <p className="text-sm text-slate-600 mt-1">
            Halaman ini UI-only (belum ada backend). Kamu bisa lihat simulasi alur konsultasi.
          </p>

          {!isPremium && (
            <div className="mt-4 p-4 rounded-xl border border-amber-200 bg-amber-50">
              <p className="text-sm text-amber-900 font-semibold">
                Mode Free: ini hanya preview.
              </p>
              <p className="text-xs text-amber-800 mt-1">
                Untuk akses konsultasi penuh, upgrade ke Premium.
              </p>
              <button
                onClick={() => navigate("/go-premium")}
                className="mt-3 inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-semibold bg-slate-900 text-white hover:bg-slate-800"
              >
                Upgrade ke Premium
              </button>
            </div>
          )}
        </div>

        {/* Topics */}
        <section className="bg-white rounded-2xl shadow-md border border-slate-100 p-6">
          <h2 className="text-base font-semibold text-slate-900">Pilih Topik</h2>
          <p className="text-xs text-slate-500 mt-1">Dummy chips untuk tampilan UI.</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {[
              "Turun berat badan",
              "Gula darah",
              "Meal prep",
              "Pola makan seimbang",
              "Naik massa otot",
              "Kebiasaan sehat",
            ].map((t) => (
              <span
                key={t}
                className="px-3 py-1.5 rounded-full text-xs font-semibold border border-slate-200 bg-slate-50 text-slate-700"
              >
                {t}
              </span>
            ))}
          </div>
        </section>

        {/* Expert list */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              name: "Dr. Nadia, M.Gz",
              spec: "Weight management",
              rating: "4.9",
              slots: "Hari ini • 2 slot",
            },
            {
              name: "Ayu Putri, S.Gz",
              spec: "Gula darah & lifestyle",
              rating: "4.8",
              slots: "Besok • 4 slot",
            },
            {
              name: "Raka, S.Gz",
              spec: "Meal planning",
              rating: "4.7",
              slots: "Hari ini • 1 slot",
            },
          ].map((e) => (
            <div
              key={e.name}
              className="bg-white rounded-2xl shadow-md border border-slate-100 p-6 space-y-3 transition duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-200/40"
            >
              <div>
                <p className="font-semibold text-slate-900">{e.name}</p>
                <p className="text-sm text-slate-600">{e.spec}</p>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-600">
                <span>Rating: <span className="font-semibold">{e.rating}</span></span>
                <span>{e.slots}</span>
              </div>

              <button
                onClick={() => {
                  if (!isPremium) {
                    alert("Free mode: upgrade untuk mulai konsultasi (dummy).");
                    return;
                  }
                  alert("Mulai konsultasi (dummy UI).");
                }}
                className={`w-full py-2.5 rounded-lg text-sm font-semibold ${
                  isPremium
                    ? "bg-emerald-600 text-white hover:bg-emerald-700"
                    : "bg-slate-200 text-slate-600 hover:bg-slate-300"
                }`}
              >
                {isPremium ? "Mulai Konsultasi (demo)" : "Mulai Konsultasi (locked)"}
              </button>
            </div>
          ))}
        </section>

        {/* Preview panel */}
        <section className="bg-white rounded-2xl shadow-md border border-slate-100 p-6">
          <h2 className="text-base font-semibold text-slate-900">Preview Sesi</h2>
          <p className="text-xs text-slate-500 mt-1">
            Tampilan simulasi chat / booking. Tidak tersambung ke backend.
          </p>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-slate-200 p-4 bg-slate-50">
              <p className="text-sm font-semibold text-slate-900">Chat Preview</p>
              <div className="mt-3 space-y-2">
                <div className="max-w-[85%] rounded-xl bg-white border border-slate-200 p-3 text-sm text-slate-700">
                  Baik. Kita mulai dari target kalori dan pola makan harian kamu.
                </div>
                <div className="ml-auto max-w-[85%] rounded-xl bg-emerald-600 p-3 text-sm text-white">
                  Halo, saya ingin menurunkan berat badan dengan aman.
                </div>
              </div>

              <input
                disabled
                className="mt-4 w-full border rounded-lg px-3 py-2 text-sm bg-white"
                placeholder="Input chat (disabled - demo)"
              />
            </div>

            <div className="rounded-2xl border border-slate-200 p-4 bg-slate-50">
              <p className="text-sm font-semibold text-slate-900">Booking Preview</p>
              <p className="text-xs text-slate-600 mt-1">
                Pilih jadwal (dummy).
              </p>

              <div className="mt-3 space-y-2">
                {["10:00", "13:30", "16:00"].map((t) => (
                  <label
                    key={t}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200 text-sm text-slate-700"
                  >
                    <input type="radio" name="slot" disabled />
                    Slot {t}
                  </label>
                ))}
              </div>

              <button
                onClick={() => {
                  if (!isPremium) {
                    alert("Free mode: upgrade untuk booking (dummy).");
                    return;
                  }
                  alert("Booking dikonfirmasi (dummy UI).");
                }}
                className={`mt-4 w-full py-2.5 rounded-lg text-sm font-semibold ${
                  isPremium
                    ? "bg-slate-900 text-white hover:bg-slate-800"
                    : "bg-slate-200 text-slate-600 hover:bg-slate-300"
                }`}
              >
                {isPremium ? "Konfirmasi Booking (demo)" : "Konfirmasi (locked)"}
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // ---------------------------
  // VIEW: DASHBOARD
  // ---------------------------
  return (
    <div className="max-w-6xl mx-auto py-6 space-y-6">
    {/* Header atas */}
    <motion.header
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="mb-6 bg-gradient-to-r from-emerald-500 to-emerald-700 text-white p-6 rounded-2xl shadow-sm"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm opacity-80">Welcome back,</p>

          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold">
              {dummyProfile.name} 👋
            </h1>

            <span
              className={`text-xs font-semibold px-3 py-1 rounded-full border ${
                isPremium
                  ? "bg-white/15 text-white border-white/25"
                  : "bg-white/10 text-white border-white/20"
              }`}
            >
              {isPremium ? "Premium" : "Free"}
            </span>
          </div>

          <p className="text-xs opacity-70 mt-1">
            Personalized dashboard for your nutrition journey
          </p>
        </div>

        {/* Avatar circle */}
        <div className="w-14 h-14 bg-white/30 rounded-full flex items-center justify-center text-xl font-bold backdrop-blur">
          {dummyProfile.name?.[0]?.toUpperCase() || "U"}
        </div>
      </div>
    </motion.header>

      {/* Row 1: Profile + Summary + Plan Card */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Profile card */}
        <div className="bg-white rounded-2xl shadow-md p-6 border border-slate-100 space-y-3 md:col-span-1 transition duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-200/40">
          <h2 className="text-base font-semibold text-slate-900">Profile Overview</h2>
          <p className="text-sm text-slate-600">
            {dummyProfile.name}, {dummyProfile.age} years
          </p>

          <div className="flex gap-6 text-sm text-slate-700">
            <div>
              <p className="text-xs text-slate-500">Height</p>
              <p className="font-semibold">{dummyProfile.height} cm</p>
            </div>
            <div>
              <p className="text-xs text-slate-500">Weight</p>
              <p className="font-semibold">{dummyProfile.weight} kg</p>
            </div>
          </div>

          <div className="mt-2">
            <p className="text-xs text-slate-500 mb-1">Genetic Risk Summary</p>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
              {dummyProfile.geneticRisk}
            </span>

            {isPremium && (
              <p className="text-xs text-slate-500 mt-2">
                Premium insight (demo): fokus stabilisasi gula darah & pola makan konsisten.
              </p>
            )}

            {!isPremium && (
              <p className="text-xs text-slate-500 mt-2">
                Detail insight tersedia di Premium.
              </p>
            )}
          </div>
        </div>

        {/* Today summary */}
        <div className="bg-white rounded-2xl shadow-md p-6 border border-slate-100 space-y-3 md:col-span-1 transition duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-200/40">
          <h2 className="text-base font-semibold text-slate-900">Today&apos;s Summary</h2>

          <p className="text-sm text-slate-600">
            Calories target:{" "}
            <span className="font-semibold">{dummyProgress.caloriesTarget} kcal</span>
          </p>
          <p className="text-sm text-slate-600">
            Steps target:{" "}
            <span className="font-semibold">{dummyProgress.stepsTarget} steps</span>
          </p>

          <div className="space-y-2 mt-2">
            {/* Calories bar */}
            <div className="text-xs text-slate-500 flex justify-between">
              <span>
                Calories – {dummyProgress.caloriesConsumed} / {dummyProgress.caloriesTarget}
              </span>
              <span>{caloriesPercent}%</span>
            </div>
            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
              <div
                style={{ width: `${caloriesPercent}%` }}
                className="h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full transition-all"
              />
            </div>

            {/* Steps bar */}
            <div className="text-xs text-slate-500 flex justify-between mt-2">
              <span>
                Steps – {dummyProgress.stepsCurrent} / {dummyProgress.stepsTarget}
              </span>
              <span>{stepsPercent}%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-sky-400 to-sky-600"
                style={{ width: `${stepsPercent}%` }}
              />
            </div>
          </div>

          {isPremium ? (
            <p className="text-xs text-slate-500 pt-2">
              Premium insight (demo): sisa{" "}
              <span className="font-semibold">
                {Math.max(0, dummyProgress.caloriesTarget - dummyProgress.caloriesConsumed)}
              </span>{" "}
              kcal hari ini.
            </p>
          ) : (
            <p className="text-xs text-slate-500 pt-2">
              Insight detail tersedia untuk Premium.
            </p>
          )}
        </div>

        {/* Plan card: Free => Upgrade, Premium => Premium Active */}
        {!isPremium ? (
          <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 text-white rounded-2xl shadow-lg p-6 border border-slate-100 flex flex-col justify-between md:col-span-1 transition duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-200/40">
            <div>
              <h2 className="text-base font-semibold mb-2">Upgrade Your Plan</h2>
              <p className="text-sm text-slate-200">
                Dapatkan rekomendasi diet lebih detail, analisis risiko genetik lanjutan,
                dan tracking progress yang lebih lengkap.
              </p>
            </div>
            <button
              onClick={() => navigate("/go-premium")}
              className="mt-4 w-full bg-white text-slate-900 py-2.5 rounded-lg text-sm font-semibold hover:bg-slate-100"
            >
              Go Premium
            </button>
          </div>
        ) : (
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl shadow-lg p-6 border border-slate-100 flex flex-col justify-between md:col-span-1 transition duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-200/40">
            <div>
              <h2 className="text-base font-semibold mb-2">Premium Active</h2>
              <p className="text-sm text-slate-200">
                Akses penuh: diet plan lebih lengkap, insight risiko, dan fitur lanjutan.
              </p>
              <ul className="mt-3 text-xs text-slate-200 list-disc pl-4 space-y-1">
                <li>Diet plan lebih detail (demo)</li>
                <li>Insight & rekomendasi (demo)</li>
                <li>Konsul Expert (UI-only)</li>
              </ul>
            </div>
            <button
              onClick={() => setView("expert")}
              className="mt-4 w-full bg-white text-slate-900 py-2.5 rounded-lg text-sm font-semibold hover:bg-slate-100"
            >
              Konsul Expert
            </button>
          </div>
        )}
      </section>

      {/* Row 1.5: Konsul Expert card (always visible, beda copy) */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 bg-white rounded-2xl shadow-md p-6 border border-slate-100 flex items-center justify-between gap-4 transition duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-200/40">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-semibold text-slate-900">Konsul Expert</h2>
              <span
                className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
                  isPremium
                    ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                    : "bg-amber-50 text-amber-800 border-amber-200"
                }`}
              >
                {isPremium ? "Available" : "Preview"}
              </span>
            </div>
            <p className="text-sm text-slate-600 mt-1">
              {isPremium
                ? "Konsultasi dengan ahli gizi (simulasi UI)."
                : "Lihat preview fitur konsultasi. Upgrade untuk akses penuh."}
            </p>
          </div>

          <button
            onClick={() => setView("expert")}
            className={`shrink-0 px-4 py-2.5 rounded-lg text-sm font-semibold ${
              isPremium
                ? "bg-emerald-600 text-white hover:bg-emerald-700"
                : "bg-slate-900 text-white hover:bg-slate-800"
            }`}
          >
            Konsul Expert
          </button>
        </div>

        {/* Small helper card */}
        <div className="bg-white rounded-2xl shadow-md p-6 border border-slate-100 space-y-2 transition duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-200/40">
          <h3 className="text-sm font-semibold text-slate-900">Today&apos;s Tip</h3>
          <p className="text-sm text-slate-600">
            Perubahan kecil yang konsisten lebih kuat daripada diet ekstrem.
          </p>
          <p className="text-xs text-slate-500">
            {isPremium ? "Premium: tips disesuaikan (demo)." : "Free: tips umum."}
          </p>
        </div>
      </section>

      {/* Row 2: Diet plan + quick progress form */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Diet plan list */}
        <div className="md:col-span-2 bg-white rounded-2xl shadow-md p-6 border border-slate-100 transition duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-200/40">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-base font-semibold text-slate-900">
              Today&apos;s Diet Plan
            </h2>
            <p className="text-xs text-slate-500">
              (Data dummy, nanti bisa ditarik dari API)
            </p>
          </div>

          <div className="divide-y divide-slate-100">
            {visibleDietItems.map((item) => (
              <div
                key={item.time}
                className="flex justify-between items-center p-3 mb-2 rounded-xl bg-gradient-to-r from-emerald-50 to-emerald-100/60 hover:from-emerald-100 hover:to-emerald-200 transition duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-200/40"
              >
                <div>
                  <p className="font-semibold text-slate-800">{item.time}</p>
                  <p className="text-sm text-slate-600">{item.menu}</p>
                </div>
                <span className="text-sm font-semibold text-slate-700">
                  {item.calories} kcal
                </span>
              </div>
            ))}

            {/* Locked items for Free */}
            {!isPremium && lockedDietItems.length > 0 && (
              <div className="pt-2 space-y-2">
                {lockedDietItems.map((item) => (
                  <div
                    key={item.time}
                    className="flex justify-between items-center p-3 rounded-xl border border-slate-200 bg-slate-50 opacity-80"
                  >
                    <div>
                      <p className="font-semibold text-slate-700">
                        {item.time}{" "}
                        <span className="ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800">
                          Premium only
                        </span>
                      </p>
                      <p className="text-sm text-slate-500 blur-[3px] select-none">
                        {item.menu}
                      </p>
                    </div>
                    <span className="text-sm font-semibold text-slate-500 blur-[3px] select-none">
                      {item.calories} kcal
                    </span>
                  </div>
                ))}

                <button
                  onClick={() => navigate("/go-premium")}
                  className="w-full mt-2 bg-slate-900 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-slate-800"
                >
                  Buka rencana lengkap (Premium)
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Quick progress note */}
        <div className="bg-white rounded-2xl shadow-md p-6 border border-slate-100 space-y-3 transition duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-200/40">
          <h2 className="text-base font-semibold text-slate-900">Quick Progress Note</h2>

          <p className="text-xs text-slate-500">
            {isPremium
              ? "Premium: progress disimpan ke log (demo UI)."
              : "Free: catatan cepat (demo UI)."}
          </p>

          <input
            className="border rounded-lg w-full px-3 py-2 text-sm"
            placeholder="Kalori hari ini (mis. 1800)"
          />
          <input
            className="border rounded-lg w-full px-3 py-2 text-sm"
            placeholder="Langkah (mis. 5000)"
          />

          <button
            onClick={() =>
              alert(isPremium ? "Progress tersimpan (demo)." : "Tersimpan (demo).")
            }
            className={`w-full py-2.5 rounded-lg text-sm font-semibold ${
              isPremium
                ? "bg-emerald-600 text-white hover:bg-emerald-700"
                : "bg-slate-900 text-white hover:bg-slate-800"
            }`}
          >
            {isPremium ? "Simpan progress" : "Simpan (demo)"}
          </button>

          {!isPremium && (
            <div className="pt-2 text-xs text-slate-500">
              Ingin analisis progress & insight mingguan? Upgrade ke Premium.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
