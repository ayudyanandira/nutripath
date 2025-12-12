// src/pages/Dashboard.jsx

const dummyProfile = {
  name: "Ayudya",
  age: 21,
  height: 160,
  weight: 55,
  geneticRisk: "Diabetes - Low Risk",
  planStatus: "Premium",
};

const dummyDietToday = [
  {
    time: "Breakfast",
    menu: "Oatmeal + Greek yogurt + berries",
    calories: 350,
  },
  {
    time: "Lunch",
    menu: "Grilled chicken salad + brown rice",
    calories: 550,
  },
  {
    time: "Dinner",
    menu: "Salmon, veggies, quinoa",
    calories: 500,
  },
  {
    time: "Snack",
    menu: "Almonds + apple",
    calories: 200,
  },
];

const dummyProgress = {
  caloriesTarget: 1800,
  caloriesConsumed: 1200,
  stepsTarget: 8000,
  stepsCurrent: 5000,
};

export default function Dashboard() {
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

  return (
    <div className="max-w-6xl mx-auto py-6 space-y-6">
      {/* Header atas */}
      <header className="mb-6 bg-gradient-to-r from-emerald-500 to-emerald-700 text-white p-6 rounded-2xl shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-80">Welcome back,</p>
            <h1 className="text-3xl font-bold">{dummyProfile.name} 👋</h1>
            <p className="text-xs opacity-70 mt-1">
              Personalized dashboard for your nutrition journey
            </p>
          </div>

          {/* Avatar circle */}
          <div className="w-14 h-14 bg-white/30 rounded-full flex items-center justify-center text-xl font-bold backdrop-blur">
            A
          </div>
        </div>
      </header>

      {/* Row 1: Profile + Summary + Upgrade */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Profile card */}
        <div className="bg-white rounded-2xl shadow-md p-6 border border-slate-100 space-y-3 md:col-span-1 transition duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-200/40">
          <h2 className="text-base font-semibold text-slate-900">
            Profile Overview
          </h2>
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
            <p className="text-xs text-slate-500 mb-1">
              Genetic Risk Summary
            </p>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
              {dummyProfile.geneticRisk}
            </span>
          </div>
        </div>

        {/* Today summary */}
        <div className="bg-white rounded-2xl shadow-md p-6 border border-slate-100 space-y-3 md:col-span-1 transition duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-200/40">
          <h2 className="text-base font-semibold text-slate-900">
            Today&apos;s Summary
          </h2>
          <p className="text-sm text-slate-600">
            Calories target:{" "}
            <span className="font-semibold">
              {dummyProgress.caloriesTarget} kcal
            </span>
          </p>
          <p className="text-sm text-slate-600">
            Steps target:{" "}
            <span className="font-semibold">
              {dummyProgress.stepsTarget} steps
            </span>
          </p>

          <div className="space-y-2 mt-2">
            {/* Calories bar */}
            <div className="text-xs text-slate-500 flex justify-between">
              <span>
                Calories – {dummyProgress.caloriesConsumed} /{" "}
                {dummyProgress.caloriesTarget}
              </span>
              <span>{caloriesPercent}%</span>
            </div>
            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
              <div
                style={{ width: `${caloriesPercent}%` }}
                className="h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full transition-all"
              ></div>
            </div>

            {/* Steps bar */}
            <div className="text-xs text-slate-500 flex justify-between mt-2">
              <span>
                Steps – {dummyProgress.stepsCurrent} /{" "}
                {dummyProgress.stepsTarget}
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
        </div>

        {/* Upgrade card */}
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 text-white rounded-2xl shadow-lg p-6 border border-slate-100 flex flex-col justify-between md:col-span-1 transition duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-200/40">
          <div>
            <h2 className="text-base font-semibold mb-2">Upgrade Your Plan</h2>
            <p className="text-sm text-slate-200">
              Dapatkan rekomendasi diet lebih detail, analisis risiko genetik
              lanjutan, dan tracking progress yang lebih lengkap.
            </p>
          </div>
          <button className="mt-4 w-full bg-white text-slate-900 py-2.5 rounded-lg text-sm font-semibold hover:bg-slate-100">
            Go Premium
          </button>
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
              (Data masih dummy, nanti ditarik dari API)
            </p>
          </div>

          <div className="divide-y divide-slate-100">
            {dummyDietToday.map((item) => (
              <div
                key={item.time}
                className="flex justify-between items-center p-3 mb-2 rounded-xl 50 hover bg-gradient-to-r from-emerald-50 to-emerald-100/60 hover:from-emerald-100 hover:to-emerald-200 transition duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-200/40"
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
          </div>
        </div>

        {/* Quick progress note */}
        <div className="bg-white rounded-2xl shadow-md p-6 border border-slate-100 space-y-3 transition duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-200/40">
          <h2 className="text-base font-semibold text-slate-900">
            Quick Progress Note
          </h2>
          <p className="text-xs text-slate-500">
            Form ini nanti disambung ke endpoint <code>/progress</code>.
          </p>

          <input
            className="border rounded-lg w-full px-3 py-2 text-sm"
            placeholder="Kalori hari ini (mis. 1800)"
          />
          <input
            className="border rounded-lg w-full px-3 py-2 text-sm"
            placeholder="Langkah (mis. 5000)"
          />
          <button className="w-full bg-emerald-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-slate-800">
            Simpan progress (dummy)
          </button>
        </div>
      </section>
    </div>
  );
}