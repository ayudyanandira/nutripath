const express = require('express');
const router = express.Router();
const { getDietPlans, createDietPlan } = require('../controllers/dietPlanController');
const authenticateToken = require('../middlewares/auth');

// User: get diet plans
router.get('/', authenticateToken, getDietPlans);

// Admin: create diet plan
router.post('/', authenticateToken, createDietPlan);

module.exports = router;
