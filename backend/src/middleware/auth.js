const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization');
    
    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'No token provided' 
      });
    }

    // Remove 'Bearer ' if present
    const tokenValue = token.replace('Bearer ', '');
    
    const decoded = jwt.verify(tokenValue, process.env.JWT_SECRET);
    const user = await User.findOne({ uuid: decoded.userId });
    
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ 
      success: false, 
      message: 'Invalid token' 
    });
  }
};

module.exports = auth;
