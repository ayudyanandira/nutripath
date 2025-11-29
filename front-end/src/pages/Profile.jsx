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
};

export default function Profile() {
  return (
    <div className="max-w-4xl">
      <PageHeader
        title="Profile"
        subtitle="Lihat ringkasan profil dan data kesehatan dasar kamu."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Basic info */}
        <div className="md:col-span-2 bg-white rounded-xl shadow-sm p-5 space-y-4">
          <div>
            <h2 className="text-sm font-semibold text-slate-900 mb-1">
              Personal Info
            </h2>
            <p className="text-sm text-slate-700">
              {dummyUser.name} &bull; {dummyUser.age} tahun
            </p>
            <p className="text-sm text-slate-500">{dummyUser.email}</p>
          </div>

          <div className="flex gap-6 text-sm">
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
              <p className="text-xs text-slate-500">Plan</p>
              <p className="font-semibold text-emerald-600">
                {dummyUser.plan}
              </p>
            </div>
          </div>
        </div>

        {/* Genetic risk */}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <h2 className="text-sm font-semibold text-slate-900 mb-2">
            Genetic Risk Summary
          </h2>
          <p className="text-xs text-slate-600 mb-3">
            Data ini masih dummy, nanti akan diisi dari hasil analisis genetik.
          </p>
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium">
            {dummyUser.geneticRisk}
          </span>
        </div>
      </div>
    </div>
  );
}
