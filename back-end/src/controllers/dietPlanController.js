const pool = require('../models/db');

// Get plans
async function getDietPlans(req, res) {
    const { type } = req.query; // Free / Premium
    try {
        const result = await pool.query('SELECT * FROM diet_plans WHERE plan_type=$1', [type || 'Free']);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Admin: Create plan
async function createDietPlan(req, res) {
    const { plan_type, bmi_category, content } = req.body;
    try {
        await pool.query('INSERT INTO diet_plans (plan_type, bmi_category, content) VALUES ($1,$2,$3)',
            [plan_type, bmi_category, content]
        );
        res.json({ message: 'Diet plan created' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = { getDietPlans, createDietPlan };
