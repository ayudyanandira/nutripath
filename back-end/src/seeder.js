const pool = require('./models/db');
const bcrypt = require('bcrypt');
const CryptoJS = require('crypto-js');
require('dotenv').config();

async function seed() {
    try {
        // =========================
        // Admin
        // =========================
        const adminPass = await bcrypt.hash('admin123', 10);
        await pool.query(`
            INSERT INTO users (name, email, password_hash, plan_status, role)
            VALUES ('Admin', 'admin@example.com', $1, 'Premium', 'admin')
            ON CONFLICT (email) DO NOTHING
        `, [adminPass]);

        // =========================
        // Dummy User
        // =========================
        const hashedPassword = await bcrypt.hash('password123', 10);
        const userRes = await pool.query(`
            INSERT INTO users (name, email, password_hash, plan_status)
            VALUES ('User One', 'user1@example.com', $1, 'Free')
            ON CONFLICT (email) DO NOTHING
            RETURNING id
        `, [hashedPassword]);

        let userId;
        if (userRes.rows.length > 0) {
            userId = userRes.rows[0].id;
        } else {
            const existingUser = await pool.query(`SELECT id FROM users WHERE email='user1@example.com'`);
            userId = existingUser.rows[0].id;
        }

        // Profile
        const risk = { diabetes: 'Medium', obesity: 'Low' };
        const encryptedRisk = CryptoJS.AES.encrypt(JSON.stringify(risk), process.env.AES_SECRET).toString();

        await pool.query(`
            INSERT INTO profiles (user_id, name, age, gender, weight, height, family_history, risk_json_encrypted)
            VALUES ($1, 'User One', 30, 'Male', 70, 170, $2, $3)
            ON CONFLICT DO NOTHING
        `, [userId, JSON.stringify({ diabetes: true, hypertension: false }), encryptedRisk]);

        // Progress
        await pool.query(`
            INSERT INTO progress (user_id, date, weight, activity, diet_note, points)
            VALUES ($1, NOW(), 70, 'Running 30min', 'Ate healthy', 10)
            ON CONFLICT DO NOTHING
        `, [userId]);

        // Diet Plans
        await pool.query(`
            INSERT INTO diet_plans (plan_type, bmi_category, content)
            VALUES 
            ('Free', 'Normal', 'General guideline for normal BMI'),
            ('Premium', 'Overweight', 'Detailed weekly plan with meal schedule')
            ON CONFLICT DO NOTHING
        `);

        console.log('✅ Seeder completed!');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

seed();
