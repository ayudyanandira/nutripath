const pool = require('../models/db');

// Create progress
async function createProgress(req, res) {
    const userId = req.user.id;
    const { date, weight, activity, diet_note } = req.body;
    try {
        await pool.query(
            'INSERT INTO progress (user_id, date, weight, activity, diet_note, points) VALUES ($1,$2,$3,$4,$5,10)',
            [userId, date, weight, activity, diet_note]
        );
        res.json({ message: 'Progress added, +10 NutriPoints' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Get progress
async function getProgress(req, res) {
    const userId = req.user.id;
    try {
        const result = await pool.query('SELECT * FROM progress WHERE user_id=$1 ORDER BY date DESC', [userId]);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = { createProgress, getProgress };
