// src/pages/Dashboard.jsx
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const caloriesPercent = Math.min(
    100,
    Math.round(
      (dummyProgress.caloriesConsumed / dummyProgress.caloriesTarget) * 100
    )
  );
  const stepsPercent = Math.min(
    100,
    Math.round(
      (dummyProgress.stepsCurrent / dummyProgress.stepsTarget) * 100
    )
  );

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Top bar */}
      <header className="w-full bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">NutriPath</h1>
          <p className="text-sm text-slate-500">
            Personalized nutrition dashboard
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right text-sm">
            <p className="font-semibold text-slate-800">
              {dummyProfile.name}
            </p>
            <p className="text-xs text-slate-500">
              Plan: {dummyProfile.planStatus}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm rounded-lg border border-slate-300 hover:bg-slate-100"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="px-6 py-6 max-w-6xl mx-auto space-y-6">
        {/* Row 1: Profile + Risk + Upgrade */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Profile card */}
          <div className="bg-white rounded-xl shadow-sm p-5 space-y-3">
            <h2 className="text-base font-semibold text-slate-900">
              Profile Overview
            </h2>
            <p className="text-sm text-slate-600">
              {dummyProfile.name}, {dummyProfile.age} years
            </p>

            <div className="flex gap-4 text-sm text-slate-700">
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

          {/* Today summary card */}
          <div className="bg-white rounded-xl shadow-sm p-5 space-y-3">
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

            {/* Progress bars */}
            <div className="space-y-2 mt-2">
              <div className="text-xs text-slate-500 flex justify-between">
                <span>
                  Calories – {dummyProgress.caloriesConsumed} /{" "}
                  {dummyProgress.caloriesTarget}
                </span>
                <span>{caloriesPercent}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div
                  className="h-2 rounded-full bg-amber-500"
                  style={{ width: `${caloriesPercent}%` }}
                />
              </div>

              <div className="text-xs text-slate-500 flex justify-between mt-2">
                <span>
                  Steps – {dummyProgress.stepsCurrent} /{" "}
                  {dummyProgress.stepsTarget}
                </span>
                <span>{stepsPercent}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div
                  className="h-2 rounded-full bg-sky-500"
                  style={{ width: `${stepsPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Upgrade card */}
          <div className="bg-slate-900 text-white rounded-xl shadow-sm p-5 flex flex-col justify-between">
            <div>
              <h2 className="text-base font-semibold mb-2">
                Upgrade Your Plan
              </h2>
              <p className="text-sm text-slate-200">
                Dapatkan rekomendasi diet lebih detail, analisis risiko
                genetik lanjutan, dan tracking progress yang lebih lengkap.
              </p>
            </div>
            <button className="mt-4 w-full bg-white text-slate-900 py-2.5 rounded-lg text-sm font-semibold hover:bg-slate-100">
              Go Premium
            </button>
          </div>
        </section>

        {/* Row 2: Diet plan + progress log */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Diet plan */}
          <div className="md:col-span-2 bg-white rounded-xl shadow-sm p-5">
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
                  className="flex items-start justify-between py-3"
                >
                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      {item.time}
                    </p>
                    <p className="text-sm text-slate-600">{item.menu}</p>
                  </div>
                  <p className="text-sm font-medium text-slate-700">
                    {item.calories} kcal
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick add progress */}
          <div className="bg-white rounded-xl shadow-sm p-5 space-y-3">
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
            <button className="w-full bg-slate-900 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-slate-800">
              Simpan progress (dummy)
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
