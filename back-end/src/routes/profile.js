const express = require('express');
const router = express.Router();
const { updateProfile, getProfile } = require('../controllers/profileController');
const authenticateToken = require('../middlewares/auth');

router.get('/', authenticateToken, getProfile);
router.post('/', authenticateToken, updateProfile);

module.exports = router;


