const express = require("express");
const router = express.Router();
const authenticateToken = require("../middlewares/auth");
const pool = require("../models/db");

router.get("/", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;

    // USER
    const userResult = await pool.query(
      `SELECT name, plan_status FROM users WHERE id = $1`,
      [userId]
    );

    // PROFILE
    const profileResult = await pool.query(
      `SELECT age, weight, height FROM profiles WHERE user_id = $1`,
      [userId]
    );

    // DAILY PROGRESS (REAL, SESUAI DB)
    const progressResult = await pool.query(
      `SELECT calories_consumed, steps
       FROM daily_progress
       WHERE user_id = $1 AND date = CURRENT_DATE`,
      [userId]
    );

    // DIET HARI INI
    const dietResult = await pool.query(
      `SELECT meal_time AS time, menu, calories
       FROM user_diet_daily
       WHERE user_id = $1 AND date = CURRENT_DATE
       ORDER BY meal_time`,
      [userId]
    );

    const user = userResult.rows[0];
    const profile = profileResult.rows[0] || {};
    const progress = progressResult.rows[0] || { calories_consumed: 0, steps: 0 };

    // BMI REAL
    const bmi =
      profile.weight && profile.height
        ? Number((profile.weight / Math.pow(profile.height / 100, 2)).toFixed(1))
        : null;

    res.json({
      profile: {
        name: user.name,
        age: profile.age,
        height: profile.height,
        weight: profile.weight,
        bmi,
        plan_status: user.plan_status
      },
      progress: {
        calories_consumed: progress.calories_consumed,
        steps: progress.steps
      },
      diet_today: dietResult.rows
    });

  } catch (err) {
    console.error("🔥 DASHBOARD ERROR:", err);
    res.status(500).json({
      message: "Dashboard error",
      error: err.message
    });
  }
});

module.exports = router;
