// backend/controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { generateAccessToken, generateRefreshToken, verifyToken } = require('../utils/jwtUtils');

exports.signup = async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ username, password: hashedPassword });
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error in user signup' });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (user && (await bcrypt.compare(password, user.password))) {
            const accessToken = generateAccessToken(user);
            const refreshToken = generateRefreshToken(user);
            res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, path: '/api/auth/refresh' });
            res.status(200).json({ accessToken });
        } else {
            res.status(400).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error in user login' });
    }
};

exports.refreshToken = (req, res) => {
    const { refreshToken } = req.cookies;
    if (!refreshToken) return res.sendStatus(403);

    const decoded = verifyToken(refreshToken, process.env.JWT_REFRESH_SECRET);
    if (!decoded) return res.sendStatus(403);

    const user = { _id: decoded.id };
    const newAccessToken = generateAccessToken(user);
    res.status(200).json({ accessToken: newAccessToken });
};

exports.logout = (req, res) => {
    res.clearCookie('refreshToken', { path: '/api/auth/refresh' });
    res.status(200).json({ message: 'Logged out successfully' });
};