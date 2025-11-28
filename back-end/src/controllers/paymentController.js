const axios = require('axios');
const pool = require('../models/db');
require('dotenv').config();

// Buat order
async function createPayment(req, res) {
    const { plan_type, user_id, amount } = req.body;

    // Simpan order PENDING di DB
    const order = await pool.query(
        'INSERT INTO orders (user_id, plan_type, amount, status) VALUES ($1,$2,$3,$4) RETURNING *',
        [user_id, plan_type, amount, 'PENDING']
    );

    // Panggil Midtrans Snap API
    try {
        const snapResponse = await axios.post('https://api.sandbox.midtrans.com/v2/charge', {
            transaction_details: { order_id: order.rows[0].id, gross_amount: amount },
            payment_type: 'bank_transfer'
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${Buffer.from(process.env.MIDTRANS_SERVER_KEY + ':').toString('base64')}`
            }
        });

        res.json({ snap_token: snapResponse.data.token, redirect_url: snapResponse.data.redirect_url });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Webhook notifikasi dari payment gateway
async function paymentNotify(req, res) {
    const { order_id, status_code } = req.body;

    if (status_code === '200') {
        // Update DB
        const order = await pool.query(
            'UPDATE orders SET status=$1 WHERE id=$2 RETURNING *',
            ['SUCCESS', order_id]
        );

        // Panggil blockchain untuk audit (lihat step 13)
        // await recordPaymentOnChain(order.rows[0]);

        res.json({ message: 'Payment success and recorded' });
    } else {
        res.json({ message: 'Payment failed or pending' });
    }
}

module.exports = { createPayment, paymentNotify };
