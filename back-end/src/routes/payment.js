const express = require('express');
const router = express.Router();
const { createPayment, paymentNotify } = require('../controllers/paymentController');
const authenticateToken = require('../middlewares/auth');

router.post('/create', authenticateToken, createPayment);
router.post('/notify-gateway', paymentNotify); // webhook dari Midtrans/Xendit

module.exports = router;
