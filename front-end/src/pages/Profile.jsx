// src/pages/Profile.jsx
import { useMemo, useState } from "react";
import PageHeader from "../components/PageHeader";

const dummyUser = {
  name: "Ayudya",
  email: "ayu@example.com",
  age: 21,
  height: 160,
  weight: 55,
  plan: "Premium", // UBAH: "Free" | "Premium"
  geneticRisk: "Diabetes - Low Risk",
  lastCheckIn: "2 hari lalu",
  goals: [
    "Menjaga berat badan di kisaran sehat",
    "Menstabilkan gula darah",
    "Menambah aktivitas fisik ringan 3x/minggu",
  ],
};

function calculateBmi(weight, heightCm) {
  const h = heightCm / 100;
  if (!h) return null;
  const bmi = weight / (h * h);
  return bmi.toFixed(1);
}

function getBmiLabel(bmi) {
  if (!bmi) return "-";
  const value = parseFloat(bmi);
  if (value < 18.5) return "Underweight";
  if (value < 23) return "Normal";
  if (value < 27.5) return "Overweight";
  return "Obese";
}

export default function Profile() {
  // "profile" | "edit" | "complete"
  const [view, setView] = useState("profile");

  const isPremium = useMemo(
    () => String(dummyUser.plan).toLowerCase() === "premium",
    []
  );

  const bmi = calculateBmi(dummyUser.weight, dummyUser.height);
  const bmiLabel = getBmiLabel(bmi);

  // Dummy completeness (boleh kamu ubah)
  const profileCompleteness = isPremium ? 70 : 45;

  // -----------------------------
  // VIEW: EDIT PROFILE (UI ONLY)
  // -----------------------------
  if (view === "edit") {
    return (
      <div className="max-w-5xl space-y-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setView("profile")}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-slate-900"
          >
            <span className="text-lg leading-none">&lt;</span>
            Kembali
          </button>
        </div>

        <PageHeader
          title="Edit Profile"
          subtitle="UI-only (dummy). Nanti field ini bisa disambungkan ke backend."
        />

        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5 md:p-6 space-y-5">
          {!isPremium && (
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
              <p className="text-sm font-semibold text-amber-900">
                Free Plan
              </p>
              <p className="text-xs text-amber-800 mt-1">
                Kamu tetap bisa edit data dasar. Insight lanjutan & rekomendasi personal tersedia di Premium.
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Nama" defaultValue={dummyUser.name} placeholder="Nama" />
            <Field label="Email" defaultValue={dummyUser.email} placeholder="Email" />
            <Field label="Umur" defaultValue={dummyUser.age} placeholder="Umur" />
            <Field label="Tinggi (cm)" defaultValue={dummyUser.height} placeholder="Tinggi" />
            <Field label="Berat (kg)" defaultValue={dummyUser.weight} placeholder="Berat" />
            <Field label="Plan" defaultValue={dummyUser.plan} placeholder="Free / Premium" disabled />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setView("profile")}
              className="px-4 py-2.5 rounded-lg text-sm font-semibold border border-slate-200 text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => alert("Tersimpan (dummy UI).")}
              className="px-4 py-2.5 rounded-lg text-sm font-semibold bg-emerald-600 text-white hover:bg-emerald-700"
            >
              Save changes (dummy)
            </button>
          </div>
        </div>
      </div>
    );
  }

  // -----------------------------------------
  // VIEW: COMPLETE PROFILE & HEALTH (UI ONLY)
  // -----------------------------------------
  if (view === "complete") {
    return (
      <div className="max-w-5xl space-y-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setView("profile")}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-slate-900"
          >
            <span className="text-lg leading-none">&lt;</span>
            Kembali
          </button>
        </div>

        <PageHeader
          title="Lengkapi Data Profil & Kesehatan"
          subtitle="UI-only (dummy). Ini simulasi wizard/questionnaire untuk melengkapi data."
        />

        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5 md:p-6 space-y-6">
          {!isPremium && (
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-900">
                Mode Free: data akan dipakai untuk ringkasan umum.
              </p>
              <p className="text-xs text-slate-600 mt-1">
                Premium bisa mendapatkan rekomendasi yang lebih detail (tetap dummy untuk sekarang).
              </p>
            </div>
          )}

          {/* Wizard-like sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SelectField
              label="Tujuan utama"
              options={[
                "Turun berat badan",
                "Naik massa otot",
                "Menjaga berat badan",
                "Kontrol gula darah",
              ]}
            />
            <SelectField
              label="Level aktivitas"
              options={["Rendah", "Sedang", "Tinggi"]}
            />
            <SelectField
              label="Preferensi diet"
              options={["Tidak ada", "Vegetarian", "Vegan", "Halal", "Low sugar"]}
            />
            <SelectField
              label="Frekuensi olahraga"
              options={["0x/minggu", "1–2x/minggu", "3–4x/minggu", "5x+/minggu"]}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Jam tidur rata-rata" placeholder="Mis. 7" />
            <Field label="Minum air per hari (gelas)" placeholder="Mis. 8" />
          </div>

          <div className="space-y-2">
            <p className="text-sm font-semibold text-slate-900">Catatan kesehatan (opsional)</p>
            <textarea
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm min-h-[100px]"
              placeholder="Mis. alergi makanan, riwayat keluarga, dll."
            />
            <p className="text-xs text-slate-500">
              (Dummy) Nanti bisa dipakai untuk personalisasi diet plan.
            </p>
          </div>

          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setView("profile")}
              className="px-4 py-2.5 rounded-lg text-sm font-semibold border border-slate-200 text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => alert("Data tersimpan (dummy UI).")}
              className="px-4 py-2.5 rounded-lg text-sm font-semibold bg-emerald-600 text-white hover:bg-emerald-700"
            >
              Simpan (dummy)
            </button>
          </div>
        </div>
      </div>
    );
  }

  // -----------------------------
  // VIEW: PROFILE (MAIN)
  // -----------------------------
  return (
    <div className="max-w-5xl space-y-6">
      <PageHeader
        title="Profile"
        subtitle="Lihat ringkasan profil, data kesehatan dasar, dan fokus kesehatan kamu saat ini."
      />

      {/* FREE banner (UI-only) */}
      {!isPremium && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 flex items-start justify-between gap-4">
          <div>
            <p className="font-semibold text-amber-900">Free Plan</p>
            <p className="text-sm text-amber-800 mt-1">
              Beberapa insight dan detail rekomendasi hanya tersedia untuk Premium.
            </p>
          </div>
          <button
            type="button"
            className="shrink-0 inline-flex items-center rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
            onClick={() => alert("Go Premium page masih dikerjakan (dummy).")}
          >
            Go Premium
          </button>
        </div>
      )}

      {/* Baris atas: profil & genetic risk */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Personal info */}
        <div className="md:col-span-2 bg-white rounded-xl shadow-sm border border-slate-100 p-5 md:p-6 transition duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-200/40 space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-900 mb-1">
                Personal Info
              </h2>
              <p className="text-sm text-slate-700">
                {dummyUser.name} &bull; {dummyUser.age} tahun
              </p>
              <p className="text-sm text-slate-500">{dummyUser.email}</p>
            </div>

            <div className="flex items-center gap-2">
              <span
                className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold border ${
                  isPremium
                    ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                    : "bg-slate-50 text-slate-700 border-slate-200"
                }`}
              >
                {isPremium ? "Premium" : "Free"}
              </span>

              <button
                type="button"
                className="inline-flex items-center rounded-full border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
                onClick={() => setView("edit")}
              >
                Edit profil
              </button>
            </div>
          </div>

          <div className="h-px bg-slate-100" />

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <StatCard label="Height" value={`${dummyUser.height} cm`} />
            <StatCard label="Weight" value={`${dummyUser.weight} kg`} />
            <StatCard
              label="BMI"
              value={
                <>
                  {bmi || "-"}{" "}
                  <span className="text-xs font-normal opacity-80">
                    ({bmiLabel})
                  </span>
                </>
              }
            />
            <StatCard label="Plan" value={dummyUser.plan} />
            <StatCard label="Last check-in" value={dummyUser.lastCheckIn} />
          </div>
        </div>

        {/* Genetic risk */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5 md:p-6 transition duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-200/40 flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900 mb-2">
              Genetic Risk Summary
            </h2>
            <p className="text-xs text-slate-600 mb-3">
              Data ini masih dummy. Nantinya akan diisi dari hasil analisis genetik dan riwayat keluarga kamu.
            </p>

            <div className="w-full flex justify-center mt-4">
              <span className="mt-3 inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-br from-emerald-50 to-emerald-200 text-emerald-700 text-lg font-semibold">
                {dummyUser.geneticRisk}
              </span>
            </div>

            {/* Premium-only detail (UI) */}
            {isPremium ? (
              <div className="mt-4 p-3 rounded-xl border border-emerald-100 bg-emerald-50">
                <p className="text-xs font-semibold text-emerald-800">
                  Premium insight (demo)
                </p>
                <p className="text-xs text-emerald-800 mt-1">
                  Rekomendasi fokus: kurangi gula tambahan, tambah serat, dan cek konsistensi pola makan.
                </p>
              </div>
            ) : (
              <div className="mt-4 p-3 rounded-xl border border-slate-200 bg-slate-50">
                <p className="text-xs text-slate-700">
                  Detail insight tersedia untuk Premium.
                </p>
              </div>
            )}
          </div>

          <p className="mt-4 text-[11px] text-slate-400">
            Catatan: informasi risiko tidak digunakan untuk diagnosis, hanya sebagai panduan personalisasi diet plan.
          </p>
        </div>
      </div>

      {/* Baris bawah: goals & quick summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Goals & habits */}
        <div className="md:col-span-2 bg-white rounded-xl shadow-sm border border-slate-100 p-5 md:p-6 transition duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-200/40 space-y-4">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-lg font-semibold text-slate-900">
              Current Health Focus
            </h2>

            <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-0.5 text-xs font-medium text-emerald-700">
              Demo mode
            </span>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            Berikut beberapa fokus utama yang akan dipakai NutriPath untuk menyesuaikan diet plan kamu.
          </p>

          <ul className="space-y-2 text-sm text-slate-700">
            {dummyUser.goals.map((goal) => (
              <li key={goal} className="flex gap-2">
                <span className="text-emerald-600">•</span>
                <span>{goal}</span>
              </li>
            ))}
          </ul>

          <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
            <span className="inline-flex items-center rounded-full bg-sky-50 px-2.5 py-1 text-sky-700 font-semibold">
              • Sleep 7–8 jam
            </span>
            <span className="inline-flex items-center rounded-full bg-amber-50 px-2.5 py-1 text-amber-700 font-semibold">
              • Kurangi minuman manis
            </span>
            <span className="inline-flex items-center rounded-full bg-violet-50 px-2.5 py-1 text-violet-700 font-semibold">
              • Tambah sayur &amp; serat
            </span>

            {/* Premium-only tag */}
            {isPremium && (
              <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-emerald-700 font-semibold">
                • Insight personal (Premium)
              </span>
            )}
          </div>
        </div>

        {/* Quick summary card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5 md:p-6 transition duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-200/40 space-y-5">
          <h2 className="text-lg font-semibold text-slate-900">Quick Summary</h2>

          <div className="space-y-5 text-sm">
            {/* Profile completeness — with bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-medium text-slate-500">
                <span>Profile completeness</span>
                <span className="font-semibold text-slate-900">
                  {profileCompleteness}%
                </span>
              </div>

              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-sky-400 to-sky-600 rounded-full transition-all"
                  style={{ width: `${profileCompleteness}%` }}
                />
              </div>

              {!isPremium && (
                <p className="text-xs text-slate-500">
                  Free: lengkapi data untuk ringkasan yang lebih akurat.
                </p>
              )}
              {isPremium && (
                <p className="text-xs text-slate-500">
                  Premium: data lengkap membantu personalisasi diet plan (demo).
                </p>
              )}
            </div>

            {/* Diet plan status */}
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Diet plan status</span>
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded-md font-medium text-xs ${
                  isPremium
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-slate-50 text-slate-700"
                }`}
              >
                {isPremium ? "Active · Premium" : "Limited · Free"}
              </span>
            </div>

            {/* Risk monitoring */}
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Risk monitoring</span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-sky-50 text-sky-700 font-medium text-xs">
                {isPremium ? "Normal — check weekly" : "Basic — check monthly"}
              </span>
            </div>
          </div>

          {/* CTA */}
          <button
            type="button"
            className="w-full bg-emerald-600 text-white rounded-lg px-3 py-2.5 text-sm font-semibold hover:bg-emerald-700 transition"
            onClick={() => setView("complete")}
          >
            Lengkapi data profil & kesehatan
          </button>

          {!isPremium && (
            <p className="text-xs text-slate-500">
              Kamu tetap bisa isi form ini meski Free (dummy UI).
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------ Small UI helpers (still in 1 file) ------------------ */

function StatCard({ label, value }) {
  return (
    <div className="p-3 rounded-xl bg-gradient-to-b from-emerald-50 to-emerald-200 text-emerald-800 border border-white flex flex-col items-center justify-center text-center">
      <p className="text-xs opacity-80">{label}</p>
      <p className="text-lg font-bold mt-1">{value}</p>
    </div>
  );
}

function Field({ label, defaultValue, placeholder, disabled = false }) {
  return (
    <label className="space-y-1">
      <span className="text-sm font-semibold text-slate-900">{label}</span>
      <input
        disabled={disabled}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className={`w-full border rounded-lg px-3 py-2 text-sm ${
          disabled
            ? "bg-slate-100 border-slate-200 text-slate-500"
            : "bg-white border-slate-200"
        }`}
      />
    </label>
  );
}

function SelectField({ label, options }) {
  return (
    <label className="space-y-1">
      <span className="text-sm font-semibold text-slate-900">{label}</span>
      <select className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white">
        <option value="">Pilih...</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}
