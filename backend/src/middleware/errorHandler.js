const errorHandler = (err, req, res, next) => {
  // Validation error
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: 'Validation Error'
    });
  }

  // Duplicate key error
  if (err.code === 11000) {
    return res.status(400).json({
      success: false,
      message: 'Email already exists'
    });
  }

  // Default error
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
};

module.exports = errorHandler;
