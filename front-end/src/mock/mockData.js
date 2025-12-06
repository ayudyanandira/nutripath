// src/mock/mockData.js

// ==== PROFILE / USER ====
export const mockProfile = {
  name: "Ayudya",
  age: 21,
  height: 160,
  weight: 55,
  planStatus: "Premium",
  email: "ayu@example.com",
  geneticRisk: "Diabetes - Low Risk",
};

// ==== DASHBOARD TODAY ====
export const mockDashboardSummary = {
  caloriesTarget: 1800,
  caloriesConsumed: 1200,
  stepsTarget: 8000,
  stepsCurrent: 5000,
};

export const mockDietToday = [
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

// ==== DIET PLANS PAGE ====
export const mockWeeklyDietPlans = [
  {
    day: "Monday",
    note: "Fokus high protein + whole grains.",
    meals: {
      breakfast: "Oatmeal + Greek yogurt + berries",
      lunch: "Grilled chicken salad + brown rice",
      dinner: "Salmon, veggies, quinoa",
      snack: "Almonds + apple",
    },
  },
  {
    day: "Tuesday",
    note: "Lebih banyak sayur & buah.",
    meals: {
      breakfast: "Smoothie bowl (banana, spinach, chia seeds)",
      lunch: "Tempe + mixed veggies + brown rice",
      dinner: "Tuna salad with olive oil",
      snack: "Yogurt + strawberries",
    },
  },
];

// ==== PROGRESS PAGE ====
export const mockProgressList = [
  {
    date: "2025-11-01",
    weight: 56,
    steps: 6000,
    calories: 1900,
  },
  {
    date: "2025-11-08",
    weight: 55.5,
    steps: 7500,
    calories: 1800,
  },
  {
    date: "2025-11-15",
    weight: 55,
    steps: 8200,
    calories: 1750,
  },
];
