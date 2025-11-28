const express = require('express');
const router = express.Router();
const { getAllUsers, verifyNutritionist, updateDietPlan, deleteDietPlan } = require('../controllers/adminController');
const authenticateToken = require('../middlewares/auth');
const adminAuth = require('../middlewares/adminAuth');

// Semua route admin harus login + role admin
router.use(authenticateToken, adminAuth);

router.get('/users', getAllUsers);
router.post('/verify-nutritionist', verifyNutritionist);
router.put('/diet-plan', updateDietPlan);
router.delete('/diet-plan', deleteDietPlan);

module.exports = router;
