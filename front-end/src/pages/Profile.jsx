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
        <div className="md:col-span-2 bg-white rounded-xl shadow-sm border border-slate-100 p-5 md:p-6 transition duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-200/40 p-5 md:p-6 space-y-4">
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

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {/* Height */}
            <div className="p-3 rounded-xl bg-gradient-to-b from-emerald-50 to-emerald-200 text-emerald-800 border border-white
                flex flex-col items-center justify-center text-center">
              <p className="text-xs opacity-80">Height</p>
              <p className="text-lg font-bold mt-1">
                {dummyUser.height} cm
              </p>
            </div>

            {/* Weight */}
            <div className="p-3 rounded-xl bg-gradient-to-b from-emerald-50 to-emerald-200 text-emerald-800 border border-white
                flex flex-col items-center justify-center text-center">
              <p className="text-xs opacity-80">Weight</p>
              <p className="text-lg font-bold mt-1">
                {dummyUser.weight} kg
              </p>
            </div>

            {/* BMI */}
            <div className="p-3 rounded-xl bg-gradient-to-b from-emerald-50 to-emerald-200 text-emerald-800 border border-white
                flex flex-col items-center justify-center text-center">
              <p className="text-xs opacity-80">BMI</p>
              <p className="text-lg font-bold mt-1">
                {bmi || "-"}{" "}
                <span className="text-xs font-normal opacity-80">({bmiLabel})</span>
              </p>
            </div>

            {/* Plan */}
            <div className="p-3 rounded-xl bg-gradient-to-b from-emerald-50 to-emerald-200 text-emerald-800 border border-white
                flex flex-col items-center justify-center text-center">
              <p className="text-xs opacity-80">Plan</p>
              <p className="text-lg font-bold mt-1">
                {dummyUser.plan}
              </p>
            </div>

            {/* Last check-in */}
            <div className="p-3 rounded-xl bg-gradient-to-b from-emerald-50 to-emerald-200 text-emerald-800 border border-white
                flex flex-col items-center justify-center text-center">
              <p className="text-xs opacity-80">Last check-in</p>
              <p className="text-lg font-bold mt-1">
                {dummyUser.lastCheckIn}
              </p>
            </div>
          </div>
        </div>

        {/* Genetic risk */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5 md:p-6 transition duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-200/40 p-5 md:p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900 mb-2">
              Genetic Risk Summary
            </h2>
            <p className="text-xs text-slate-600 mb-3">
              Data ini masih dummy. Nantinya akan diisi dari hasil analisis
              genetik dan riwayat keluarga kamu.
            </p>
            {/* Centered badge */}
            <div className="w-full flex justify-center mt-4">
              <span className="mt-3 inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-br from-emerald-50 to-emerald-200 text-emerald-700 text-lg font-semibold">
              {dummyUser.geneticRisk}
              </span>
            </div>
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
        <div className="md:col-span-2 bg-white rounded-xl shadow-sm border border-slate-100 p-5 md:p-6 transition duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-200/40 p-5 md:p-6 space-y-4">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-lg font-semibold text-slate-900">
              Current Health Focus
            </h2>

            <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-0.5 text-xs font-medium text-emerald-700">
              Demo mode
            </span>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            Berikut beberapa fokus utama yang akan dipakai NutriPath untuk
            menyesuaikan diet plan kamu.
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
          </div>
        </div>

{/* Quick summary card */}
<div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5 md:p-6 transition duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-200/40 space-y-5">

  {/* Header */}
  <h2 className="text-lg font-semibold text-slate-900">
    Quick Summary
  </h2>

  <div className="space-y-5 text-sm">

    {/* Profile completeness — with bar */}
    <div className="space-y-2">
      <div className="flex items-center justify-between text-medium text-slate-500">
        <span>Profile completeness</span>
        <span className="font-semibold text-slate-900">70%</span>
      </div>

      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-sky-400 to-sky-600 rounded-full transition-all"
          style={{ width: "70%" }}
        />
      </div>
    </div>

    {/* Diet plan status */}
    <div className="flex items-center justify-between">
      <span className="text-slate-500">Diet plan status</span>
      <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-medium text-xs">
        Active · {dummyUser.plan}
      </span>
    </div>

    {/* Risk monitoring */}
    <div className="flex items-center justify-between">
      <span className="text-slate-500">Risk monitoring</span>
      <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-sky-50 text-sky-700 font-medium text-xs">
        Normal — check weekly
      </span>
    </div>
  </div>

  {/* CTA */}
  <button
    type="button"
    className="w-full bg-emerald-600 text-white rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-emerald-100 hover:text-emerald-800 hover:border-emerald-800 transition"
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
