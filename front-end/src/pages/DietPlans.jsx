// src/pages/DietPlans.jsx
import PageHeader from "../components/PageHeader";

const dummyDietPlans = [
  {
    day: "Monday",
    note: "Fokus high protein + whole grains.",
    meals: [
      "Breakfast: Oatmeal + Greek yogurt + berries",
      "Lunch: Grilled chicken salad + brown rice",
      "Dinner: Salmon, veggies, quinoa",
      "Snack: Almonds + apple",
    ],
  },
  {
    day: "Tuesday",
    note: "Lebih banyak sayur & buah.",
    meals: [
      "Breakfast: Smoothie bowl (banana, spinach, chia seeds)",
      "Lunch: Tempe + mixed veggies + brown rice",
      "Dinner: Tuna salad with olive oil",
      "Snack: Yogurt + strawberries",
    ],
  },
];

export default function DietPlans() {
  return (
    <div className="max-w-4xl">
      <PageHeader
        title="Diet Plans"
        subtitle="Rencana makan harian yang dipersonalisasi (saat ini masih dummy)."
      />

      <p className="text-xs text-slate-500 mb-4">
        Ke depan, data di sini akan diambil dari endpoint <code>/diet-plans</code>.
      </p>

      <div className="space-y-4">
        {dummyDietPlans.map((plan) => (
          <div
            key={plan.day}
            className="bg-white rounded-xl shadow-sm p-5"
          >
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-semibold text-slate-900">
                {plan.day}
              </h2>
              <p className="text-xs text-slate-500">{plan.note}</p>
            </div>

            <ul className="mt-2 space-y-1">
              {plan.meals.map((meal) => (
                <li
                  key={meal}
                  className="text-sm text-slate-700"
                >
                  {meal}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
