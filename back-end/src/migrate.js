const pool = require('./src/models/db');

async function migrate() {
    try {
        // Users
        await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password_hash VARCHAR(255) NOT NULL,
            plan_status VARCHAR(20) DEFAULT 'Free',
            wallet_address VARCHAR(255),
            role VARCHAR(20) DEFAULT 'user',
            is_verified BOOLEAN DEFAULT false,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );`);

        // Profiles
        await pool.query(`
        CREATE TABLE IF NOT EXISTS profiles (
            id SERIAL PRIMARY KEY,
            user_id INT REFERENCES users(id) ON DELETE CASCADE,
            name VARCHAR(255), -- tambahkan juga name di profile
            age INT,
            gender VARCHAR(10),
            weight FLOAT,
            height FLOAT,
            family_history JSONB,
            risk_json_encrypted TEXT,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );`);

        // Progress
        await pool.query(`
        CREATE TABLE IF NOT EXISTS progress (
            id SERIAL PRIMARY KEY,
            user_id INT REFERENCES users(id) ON DELETE CASCADE,
            date DATE,
            weight FLOAT,
            activity TEXT,
            diet_note TEXT,
            points INT DEFAULT 0
        );`);

        // Diet Plans
        await pool.query(`
        CREATE TABLE IF NOT EXISTS diet_plans (
            id SERIAL PRIMARY KEY,
            plan_type VARCHAR(20),
            bmi_category VARCHAR(20),
            content TEXT
        );`);

        // Orders
        await pool.query(`
        CREATE TABLE IF NOT EXISTS orders (
            id SERIAL PRIMARY KEY,
            user_id INT REFERENCES users(id),
            plan_type VARCHAR(20),
            amount NUMERIC(10,2),
            status VARCHAR(20) DEFAULT 'PENDING',
            onchain_tx_hash VARCHAR(255),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );`);

        console.log('✅ Migration completed!');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

migrate();
