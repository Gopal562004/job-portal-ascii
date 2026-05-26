const Candidate = require('../models/Candidate');
const { sendHRNotification, sendInterviewEmail, sendRejectionEmail, sendSelectionEmail } = require('../services/emailService');

// Submit Application (Public)
exports.apply = async (req, res) => {
  try {
    const data = req.body;

    // Parse JSON strings from FormData
    if (typeof data.education === 'string') {
      data.education = JSON.parse(data.education);
    }
    if (typeof data.familyMembers === 'string') {
      data.familyMembers = JSON.parse(data.familyMembers);
    }
    if (typeof data.address === 'string') {
      data.address = JSON.parse(data.address);
    }

    // Filter out completely empty/blank items from education array
    if (Array.isArray(data.education)) {
      data.education = data.education.filter(edu => 
        edu && Object.values(edu).some(val => val !== null && val !== undefined && String(val).trim() !== '')
      );
    }

    // Filter out completely empty/blank items from familyMembers array
    if (Array.isArray(data.familyMembers)) {
      data.familyMembers = data.familyMembers.filter(member => 
        member && Object.values(member).some(val => val !== null && val !== undefined && String(val).trim() !== '')
      );
    }

    // Handle resume file
    if (req.file) {
      data.resumeUrl = `/uploads/${req.file.filename}`;
      data.resumeOriginalName = req.file.originalname;
    }

    const candidate = await Candidate.create(data);

    // Send HR notification email (non-blocking)
    sendHRNotification(candidate).catch(err => {
      console.error('Failed to send HR notification:', err);
    });

    res.status(201).json({
      message: 'Application submitted successfully!',
      candidateId: candidate._id,
    });
  } catch (error) {
    console.error('Apply error:', error);
    res.status(500).json({ message: 'Failed to submit application.', error: error.message });
  }
};

// Get All Candidates (Admin)
exports.getAllCandidates = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = '',
      status = '',
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = req.query;

    const query = {};

    // Search filter
    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { position: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
      ];
    }

    // Status filter
    if (status) {
      query.status = status;
    }

    const sort = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };

    const candidates = await Candidate.find(query)
      .select('fullName email phone position status createdAt')
      .sort(sort)
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    const total = await Candidate.countDocuments(query);

    res.json({
      candidates,
      totalPages: Math.ceil(total / parseInt(limit)),
      currentPage: parseInt(page),
      total,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

// Get Single Candidate (Admin)
exports.getCandidate = async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);

    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found.' });
    }

    res.json(candidate);
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

// Schedule Interview (Admin)
exports.scheduleInterview = async (req, res) => {
  try {
    const { date, time, mode, meetingLink, description } = req.body;

    const candidate = await Candidate.findById(req.params.id);
    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found.' });
    }

    candidate.interviewDetails = { date, time, mode, meetingLink, description };
    candidate.status = 'Interview Scheduled';
    await candidate.save();

    // Send interview email to candidate
    sendInterviewEmail(candidate, candidate.interviewDetails).catch(err => {
      console.error('Failed to send interview email:', err);
    });

    res.json({ message: 'Interview scheduled successfully.', candidate });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

// Update Candidate Status (Admin)
exports.updateStatus = async (req, res) => {
  try {
    const { status, rejectionReason } = req.body;

    if (!['Pending', 'Interview Scheduled', 'Selected', 'Rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status.' });
    }

    const candidate = await Candidate.findById(req.params.id);
    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found.' });
    }

    candidate.status = status;

    if (status === 'Rejected') {
      candidate.rejectionReason = rejectionReason || '';
      sendRejectionEmail(candidate, rejectionReason).catch(err => {
        console.error('Failed to send rejection email:', err);
      });
    }

    if (status === 'Selected') {
      sendSelectionEmail(candidate).catch(err => {
        console.error('Failed to send selection email:', err);
      });
    }

    await candidate.save();

    res.json({ message: `Candidate status updated to ${status}.`, candidate });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

// Delete Candidate (Admin)
exports.deleteCandidate = async (req, res) => {
  try {
    const candidate = await Candidate.findByIdAndDelete(req.params.id);
    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found.' });
    }

    res.json({ message: 'Candidate deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};
