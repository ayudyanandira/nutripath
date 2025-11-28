const pool = require('../models/db');

// Lihat semua user
async function getAllUsers(req, res) {
    try {
        const result = await pool.query('SELECT id, email, plan_status, role, is_verified FROM users');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Tandai nutritionist sebagai verified
async function verifyNutritionist(req, res) {
    const { userId } = req.body;
    try {
        await pool.query('UPDATE users SET is_verified=true WHERE id=$1 AND role=$2', [userId, 'nutritionist']);
        res.json({ message: 'Nutritionist verified' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// CRUD diet plan (admin)
async function updateDietPlan(req, res) {
    const { id, plan_type, bmi_category, content } = req.body;
    try {
        await pool.query(
            'UPDATE diet_plans SET plan_type=$1, bmi_category=$2, content=$3 WHERE id=$4',
            [plan_type, bmi_category, content, id]
        );
        res.json({ message: 'Diet plan updated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function deleteDietPlan(req, res) {
    const { id } = req.body;
    try {
        await pool.query('DELETE FROM diet_plans WHERE id=$1', [id]);
        res.json({ message: 'Diet plan deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = { getAllUsers, verifyNutritionist, updateDietPlan, deleteDietPlan };
