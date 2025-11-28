const express = require('express');
const router = express.Router();
const { createProgress, getProgress } = require('../controllers/progressController');
const authenticateToken = require('../middlewares/auth');

router.get('/', authenticateToken, getProgress);
router.post('/', authenticateToken, createProgress);

module.exports = router;
