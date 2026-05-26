const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const {
  apply,
  getAllCandidates,
  getCandidate,
  scheduleInterview,
  updateStatus,
  deleteCandidate,
} = require('../controllers/candidateController');

// Public route
router.post('/apply', upload.single('resume'), apply);

// Admin protected routes
router.get('/', auth, getAllCandidates);
router.get('/:id', auth, getCandidate);
router.put('/:id/interview', auth, scheduleInterview);
router.put('/:id/status', auth, updateStatus);
router.delete('/:id', auth, deleteCandidate);

module.exports = router;
