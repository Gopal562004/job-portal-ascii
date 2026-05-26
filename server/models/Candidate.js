const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
  degree: { type: String, required: true },
  college: { type: String, default: '' },
  university: { type: String, default: '' },
  year: { type: String, default: '' },
  percentage: { type: String, default: '' },
}, { _id: false });

const familyMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  relation: { type: String, default: '' },
  occupation: { type: String, default: '' },
  contactNumber: { type: String, default: '' },
}, { _id: false });

const interviewDetailsSchema = new mongoose.Schema({
  date: { type: String },
  time: { type: String },
  mode: { type: String },
  meetingLink: { type: String },
  description: { type: String },
}, { _id: false });

const candidateSchema = new mongoose.Schema({
  // Personal Information
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true,
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
  },
  position: {
    type: String,
    required: [true, 'Position is required'],
    trim: true,
  },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-', ''],
    default: '',
  },
  dateOfBirth: {
    type: Date,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other', ''],
    default: '',
  },

  // Address
  address: {
    addressLine: { type: String, default: '' },
    city: { type: String, default: '' },
    state: { type: String, default: '' },
    pincode: { type: String, default: '' },
  },

  // Education (dynamic array)
  education: [educationSchema],

  // Family Members (dynamic array)
  familyMembers: [familyMemberSchema],

  // Professional Information
  skills: { type: String, default: '' },
  experience: { type: String, default: '' },
  currentCompany: { type: String, default: '' },
  expectedSalary: { type: String, default: '' },
  noticePeriod: { type: String, default: '' },

  // Resume
  resumeUrl: { type: String, default: '' },
  resumeOriginalName: { type: String, default: '' },

  // Self Description
  description: { type: String, default: '' },

  // Application Status
  status: {
    type: String,
    enum: ['Pending', 'Interview Scheduled', 'Selected', 'Rejected'],
    default: 'Pending',
  },

  // Interview Details
  interviewDetails: interviewDetailsSchema,

  // Rejection Reason
  rejectionReason: { type: String, default: '' },

}, {
  timestamps: true,
});

// Index for search
candidateSchema.index({ fullName: 'text', email: 'text', position: 'text' });

module.exports = mongoose.model('Candidate', candidateSchema);
