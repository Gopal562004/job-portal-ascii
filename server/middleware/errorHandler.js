const errorHandler = (err, req, res, next) => {
  console.error('Error:', err.message);

  // Multer errors
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({
      message: 'File size too large. Maximum 5MB allowed.',
    });
  }

  if (err.message && err.message.includes('Invalid file type')) {
    return res.status(400).json({
      message: err.message,
    });
  }

  // Mongoose validation errors
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({
      message: 'Validation Error',
      errors: messages,
    });
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    return res.status(400).json({
      message: 'Duplicate field value entered.',
    });
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ message: 'Invalid token.' });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({ message: 'Token expired.' });
  }

  // Default error
  res.status(err.statusCode || 500).json({
    message: err.message || 'Internal Server Error',
  });
};

module.exports = errorHandler;
