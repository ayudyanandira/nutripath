const pool = require('../models/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();

// ================== REGISTER ==================
async function register(req, res) {
    const { name, email, password } = req.body;

    // Validasi backend (WAJIB)
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Name, email, dan password wajib diisi' });
    }

    try {
        const hashed = await bcrypt.hash(password, 10);

        const result = await pool.query(
            `INSERT INTO users (name, email, password_hash)
             VALUES ($1, $2, $3)
             RETURNING id, name, email, plan_status`,
            [name, email, hashed]
        );

        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('REGISTER ERROR:', err);
        res.status(500).json({ error: err.message });
    }
}

// ================== LOGIN ==================
async function login(req, res) {
    const { email, password } = req.body;

    try {
        const user = await pool.query(
            'SELECT id, name, email, password_hash FROM users WHERE email = $1',
            [email]
        );

        if (user.rows.length === 0) {
            return res.status(400).json({ message: 'User not found' });
        }

        const valid = await bcrypt.compare(password, user.rows[0].password_hash);
        if (!valid) {
            return res.status(400).json({ message: 'Wrong password' });
        }

        const token = jwt.sign(
            {
                id: user.rows[0].id,
                email: user.rows[0].email,
                name: user.rows[0].name
            },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.json({ token });
    } catch (err) {
        console.error('LOGIN ERROR:', err);
        res.status(500).json({ error: err.message });
    }
}

module.exports = { register, login };
