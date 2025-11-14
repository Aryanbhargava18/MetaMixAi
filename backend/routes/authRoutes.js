const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

function sendError(res, status, message) {
  return res.status(status).json({ message });
}

/* Signup */
router.post('/signup', async (req, res) => {
  try {
    console.log('📥 Signup request:', req.body);

    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return sendError(res, 400, 'All fields (username, email, password) are required');
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return sendError(res, 400, 'Email already registered');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    console.log('✅ New user saved:', { id: newUser._id, email: newUser.email });
    return res.status(201).json({ message: 'User registered successfully!' });
  } catch (err) {
    console.error('❌ SIGNUP ERROR:', err);
    return sendError(res, 500, 'Internal server error');
  }
});

/* Login */
router.post('/login', async (req, res) => {
  try {
    console.log('📥 Login request:', req.body);

    const { email, password } = req.body;
    if (!email || !password) return sendError(res, 400, 'Email and password required');

    const user = await User.findOne({ email });
    if (!user) return sendError(res, 400, 'Invalid credentials');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return sendError(res, 400, 'Invalid credentials');

    if (!process.env.JWT_SECRET) {
      console.error('❌ JWT_SECRET missing!');
      return sendError(res, 500, 'Server config error (JWT secret missing)');
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.json({
      message: 'Login successful',
      token,
      user: { id: user._id, username: user.username, email: user.email }
    });
  } catch (err) {
    console.error('❌ LOGIN ERROR:', err);
    return sendError(res, 500, 'Internal server error');
  }
});

/* Get current logged-in user */
router.get('/me', async (req, res) => {
  try {
    const auth = req.headers.authorization;

    if (!auth) return sendError(res, 401, "No token provided");

    const token = auth.split(" ")[1];
    if (!token) return sendError(res, 401, "Invalid token");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) return sendError(res, 404, "User not found");

    return res.json({ user });
  } catch (err) {
    console.error("❌ ME FETCH ERROR:", err);
    return sendError(res, 500, "Internal server error");
  }
});


module.exports = router;
