// src/pages/Profile.jsx
import PageHeader from "../components/PageHeader";

const dummyUser = {
  name: "Ayudya",
  email: "ayu@example.com",
  age: 21,
  height: 160,
  weight: 55,
  plan: "Premium",
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
  const bmi = calculateBmi(dummyUser.weight, dummyUser.height);
  const bmiLabel = getBmiLabel(bmi);

  return (
    <div className="max-w-5xl space-y-6">
      <PageHeader
        title="Profile"
        subtitle="Lihat ringkasan profil, data kesehatan dasar, dan fokus kesehatan kamu saat ini."
      />

      {/* Baris atas: profil & genetic risk */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Personal info */}
        <div className="md:col-span-2 bg-white rounded-xl shadow-sm border border-slate-100 p-5 md:p-6 space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-sm font-semibold text-slate-900 mb-1">
                Personal Info
              </h2>
              <p className="text-sm text-slate-700">
                {dummyUser.name} &bull; {dummyUser.age} tahun
              </p>
              <p className="text-sm text-slate-500">{dummyUser.email}</p>
            </div>

            <button
              type="button"
              className="inline-flex items-center rounded-full border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
              onClick={() =>
                alert("Fitur edit profil akan dihubungkan ke form nanti.")
              }
            >
              Edit profil
            </button>
          </div>

          <div className="h-px bg-slate-100" />

          <div className="flex flex-wrap gap-6 text-sm">
            <div>
              <p className="text-xs text-slate-500">Height</p>
              <p className="font-semibold text-slate-800">
                {dummyUser.height} cm
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-500">Weight</p>
              <p className="font-semibold text-slate-800">
                {dummyUser.weight} kg
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-500">BMI</p>
              <p className="font-semibold text-slate-800">
                {bmi || "-"}{" "}
                <span className="text-xs font-normal text-slate-500">
                  ({bmiLabel})
                </span>
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-500">Plan</p>
              <p className="font-semibold text-emerald-600">
                {dummyUser.plan}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-500">Last check-in</p>
              <p className="font-semibold text-slate-800">
                {dummyUser.lastCheckIn}
              </p>
            </div>
          </div>
        </div>

        {/* Genetic risk */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5 md:p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-sm font-semibold text-slate-900 mb-2">
              Genetic Risk Summary
            </h2>
            <p className="text-xs text-slate-600 mb-3">
              Data ini masih dummy. Nantinya akan diisi dari hasil analisis
              genetik dan riwayat keluarga kamu.
            </p>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium">
              {dummyUser.geneticRisk}
            </span>
          </div>

          <p className="mt-4 text-[11px] text-slate-400">
            Catatan: informasi risiko tidak digunakan untuk diagnosis, hanya
            sebagai panduan personalisasi diet plan.
          </p>
        </div>
      </div>

      {/* Baris bawah: goals & quick summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Goals & habits */}
        <div className="md:col-span-2 bg-white rounded-xl shadow-sm border border-slate-100 p-5 md:p-6 space-y-4">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-sm font-semibold text-slate-900">
              Current Health Focus
            </h2>
            <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-medium text-emerald-700">
              Mode demo &mdash; data masih statis
            </span>
          </div>

          <p className="text-xs text-slate-600">
            Berikut beberapa fokus utama yang akan dipakai NutriPath untuk
            menyesuaikan diet plan kamu.
          </p>

          <ul className="space-y-2 text-sm text-slate-700 list-disc list-inside">
            {dummyUser.goals.map((goal) => (
              <li key={goal}>{goal}</li>
            ))}
          </ul>

          <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
            <span className="inline-flex items-center rounded-full bg-sky-50 px-2.5 py-1 text-sky-700">
              • Sleep 7–8 jam
            </span>
            <span className="inline-flex items-center rounded-full bg-amber-50 px-2.5 py-1 text-amber-700">
              • Kurangi minuman manis
            </span>
            <span className="inline-flex items-center rounded-full bg-violet-50 px-2.5 py-1 text-violet-700">
              • Tambah sayur &amp; serat
            </span>
          </div>
        </div>

        {/* Quick summary card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5 md:p-6 space-y-4">
          <h2 className="text-sm font-semibold text-slate-900">
            Quick Summary
          </h2>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Profile completeness</span>
              <span className="font-semibold text-slate-900">70%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Diet plan status</span>
              <span className="font-semibold text-emerald-600">
                Active &middot; {dummyUser.plan}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Risk monitoring</span>
              <span className="font-semibold text-sky-700">
                Normal &mdash; check weekly
              </span>
            </div>
          </div>

          <button
            type="button"
            className="mt-3 w-full rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
            onClick={() =>
              alert("Nanti diarahkan ke wizard lengkapi profil / questionnaire.")
            }
          >
            Lengkapi data profil & kesehatan
          </button>
        </div>
      </div>
    </div>
  );
}
