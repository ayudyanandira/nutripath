const express = require('express');
const router = express.Router();

const authenticateToken = require('../middlewares/auth');
const pool = require("../models/db");
const getContract = require("../utils/blockchain");

router.post("/upgrade", authenticateToken, async (req, res) => {
    try {

        const contract = getContract();
        const userId = req.user.id; // ✅ dari JWT
        const { walletAddress } = req.body;

        // 1️⃣ Simpan order dulu (pending)
        const orderResult = await pool.query(
            `INSERT INTO orders (user_id, plan_type, amount)
             VALUES ($1, 'Premium', 100000)
             RETURNING id`,
            [userId]
        );

        const orderId = orderResult.rows[0].id;

        // 2️⃣ Simpan ke blockchain
        const tx = await contract.storePayment(
            100000,
            `Upgrade Premium user ${userId}`
        );
        await tx.wait();

        // 3️⃣ Update order
        await pool.query(
            `UPDATE orders
             SET status='SUCCESS', onchain_tx_hash=$1
             WHERE id=$2`,
            [tx.hash, orderId]
        );

        // 4️⃣ Update user jadi premium
        await pool.query(
            `UPDATE users
             SET plan_status='Premium', wallet_address=$1
             WHERE id=$2`,
            [walletAddress, userId]
        );

        res.json({
            success: true,
            plan: "Premium",
            txHash: tx.hash
        });

    } catch (err) {
        console.error("Upgrade error:", err);
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

module.exports = router;
