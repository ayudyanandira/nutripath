const pool = require('../models/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();

// Register
async function register(req, res) {
    const { email, password } = req.body;
    try {
        const hashed = await bcrypt.hash(password, 10);
        const result = await pool.query(
            'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email, plan_status',
            [email, hashed]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Login
async function login(req, res) {
    const { email, password } = req.body;
    try {
        const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (user.rows.length === 0) return res.status(400).json({ message: 'User not found' });

        const valid = await bcrypt.compare(password, user.rows[0].password_hash);
        if (!valid) return res.status(400).json({ message: 'Wrong password' });

        const token = jwt.sign({ id: user.rows[0].id, email }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = { register, login };
