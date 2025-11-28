const pool = require('../models/db');

async function adminAuth(req, res, next) {
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });

    try {
        const result = await pool.query('SELECT role FROM users WHERE id=$1', [req.user.id]);
        if (result.rows[0].role !== 'admin') {
            return res.status(403).json({ message: 'Forbidden, admin only' });
        }
        next();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = adminAuth;
