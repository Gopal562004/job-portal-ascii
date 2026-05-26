const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { 
  login, 
  getDashboardStats, 
  getProfile,
  forgotPassword,
  verifyOTP,
  resetPassword
} = require('../controllers/adminController');

// Public
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/verify-otp', verifyOTP);
router.post('/reset-password', resetPassword);

// Protected
router.get('/profile', auth, getProfile);
router.get('/dashboard', auth, getDashboardStats);

module.exports = router;
