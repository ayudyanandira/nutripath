const axios = require('axios');
const pool = require('../models/db');
require('dotenv').config();
const { recordPaymentOnChain } = require('../utils/blockchain'); // ⬅ tambah ini

// Buat order
async function createPayment(req, res) {
    const { plan_type, user_id, amount } = req.body;

    const order = await pool.query(
        'INSERT INTO orders (user_id, plan_type, amount, status) VALUES ($1,$2,$3,$4) RETURNING *',
        [user_id, plan_type, amount, 'PENDING']
    );

    try {
        const snapResponse = await axios.post(
            'https://api.sandbox.midtrans.com/v2/charge',
            {
                transaction_details: { 
                    order_id: order.rows[0].id, 
                    gross_amount: amount 
                },
                payment_type: 'bank_transfer'
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${Buffer
                        .from(process.env.MIDTRANS_SERVER_KEY + ':')
                        .toString('base64')}`
                }
            }
        );

        res.json({ 
            snap_token: snapResponse.data.token, 
            redirect_url: snapResponse.data.redirect_url 
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Webhook Midtrans
async function paymentNotify(req, res) {
    const { order_id, status_code, gross_amount } = req.body;

    if (status_code === '200') {
        // 1. Update DB
        const order = await pool.query(
            'UPDATE orders SET status=$1 WHERE id=$2 RETURNING *',
            ['SUCCESS', order_id]
        );

        const data = order.rows[0];

        // 2. Kirim ke blockchain
        try {
            const txHash = await recordPaymentOnChain(
                "0x0000000000000000000000000000000000000001", // wallet dummy atau nanti dari profile user
                data.id.toString(),
                data.amount
            );

            // 3. Simpan tx hash ke DB
            await pool.query(
                "UPDATE orders SET onchain_tx_hash=$1 WHERE id=$2",
                [txHash, data.id]
            );

            console.log("On-chain TX:", txHash);

        } catch (err) {
            console.error("Blockchain error:", err);
        }

        return res.json({ 
            message: "Payment success and stored on blockchain" 
        });
    }

    return res.json({ message: "Payment failed or pending" });
}

module.exports = { createPayment, paymentNotify };
