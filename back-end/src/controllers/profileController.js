const pool = require('../models/db');
const CryptoJS = require('crypto-js');

require('dotenv').config();

// Update Profile
async function updateProfile(req, res) {
    const userId = req.user.id;
    const { age, gender, weight, height, family_history } = req.body;

    // Simple risk calculation (mock)
    let bmi = weight / ((height / 100) ** 2);
    let risk = { diabetes: 'Medium', obesity: 'Low' };
    if (bmi >= 30) risk.obesity = 'High';

    // Encrypt risk
    const encryptedRisk = CryptoJS.AES.encrypt(JSON.stringify(risk), process.env.AES_SECRET).toString();

    try {
        const exists = await pool.query('SELECT * FROM profiles WHERE user_id=$1', [userId]);
        if (exists.rows.length > 0) {
            await pool.query(
                'UPDATE profiles SET age=$1, gender=$2, weight=$3, height=$4, family_history=$5, risk_json_encrypted=$6, updated_at=NOW() WHERE user_id=$7',
                [age, gender, weight, height, JSON.stringify(family_history), encryptedRisk, userId]
            );
        } else {
            await pool.query(
                'INSERT INTO profiles (user_id, age, gender, weight, height, family_history, risk_json_encrypted) VALUES ($1,$2,$3,$4,$5,$6,$7)',
                [userId, age, gender, weight, height, JSON.stringify(family_history), encryptedRisk]
            );
        }
        res.json({ message: 'Profile updated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Get Profile
async function getProfile(req, res) {
    const userId = req.user.id;
    try {
        const result = await pool.query('SELECT * FROM profiles WHERE user_id=$1', [userId]);
        if (result.rows.length === 0) return res.status(404).json({ message: 'Profile not found' });

        // Decrypt risk
        let profile = result.rows[0];
        let decrypted = CryptoJS.AES.decrypt(profile.risk_json_encrypted, process.env.AES_SECRET).toString(CryptoJS.enc.Utf8);
        profile.risk = JSON.parse(decrypted);
        delete profile.risk_json_encrypted;

        res.json(profile);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = { updateProfile, getProfile };
