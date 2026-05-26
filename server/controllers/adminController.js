const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const Candidate = require('../models/Candidate');
const { sendOTPEmail } = require('../services/emailService');

// Admin Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.json({
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

// Get Dashboard Stats
exports.getDashboardStats = async (req, res) => {
  try {
    const [total, pending, interviewScheduled, selected, rejected] = await Promise.all([
      Candidate.countDocuments(),
      Candidate.countDocuments({ status: 'Pending' }),
      Candidate.countDocuments({ status: 'Interview Scheduled' }),
      Candidate.countDocuments({ status: 'Selected' }),
      Candidate.countDocuments({ status: 'Rejected' }),
    ]);

    res.json({
      total,
      pending,
      interviewScheduled,
      selected,
      rejected,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

// Get Admin Profile
exports.getProfile = async (req, res) => {
  try {
    res.json(req.admin);
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

// Forgot Password - Send OTP
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required.' });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: 'No account with this email address exists.' });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Set OTP and expiration (10 minutes)
    admin.resetOtp = otp;
    admin.resetOtpExpires = Date.now() + 10 * 60 * 1000;
    await admin.save();

    // Send email
    const emailSent = await sendOTPEmail(admin.email, admin.name, otp);
    if (!emailSent) {
      return res.status(500).json({ message: 'Failed to send OTP email. Please try again later.' });
    }

    res.json({ message: 'OTP sent to your email.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

// Verify OTP
exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: 'Email and OTP are required.' });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: 'Admin account not found.' });
    }

    if (admin.resetOtp !== otp || admin.resetOtpExpires < Date.now()) {
      return res.status(400).json({ message: 'Invalid or expired OTP.' });
    }

    res.json({ message: 'OTP verified successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

// Reset Password
exports.resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return res.status(400).json({ message: 'Email, OTP, and new password are required.' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long.' });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: 'Admin account not found.' });
    }

    if (admin.resetOtp !== otp || admin.resetOtpExpires < Date.now()) {
      return res.status(400).json({ message: 'Invalid or expired OTP.' });
    }

    // Set new password (the model pre-save hook will hash it automatically!)
    admin.password = newPassword;
    admin.resetOtp = undefined;
    admin.resetOtpExpires = undefined;
    await admin.save();

    res.json({ message: 'Password reset successful. You can now login.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};
