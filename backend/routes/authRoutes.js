// backend/routes/authRoutes.js
const express = require('express');
const { signup, login, refreshToken, logout } = require('../controllers/authController');
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/refresh', refreshToken);
router.post('/logout', logout);

module.exports = router;