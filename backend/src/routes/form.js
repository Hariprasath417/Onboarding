const express = require('express');
const FormEntry = require('../models/FormEntry');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/form
// @desc    Get user's form entry
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    let formEntry = await FormEntry.findOne({ userId: req.user.uuid });
    
    if (!formEntry) {
      // Create new form entry if it doesn't exist
      formEntry = new FormEntry({ userId: req.user.uuid });
      await formEntry.save();
    }

    res.json({
      success: true,
      formEntry: {
        id: formEntry._id,
        userId: formEntry.userId,
        steps: formEntry.steps,
        completed: formEntry.completed,
        completedAt: formEntry.completedAt,
        createdAt: formEntry.createdAt,
        updatedAt: formEntry.updatedAt
      }
    });
  } catch (error) {
    console.error('Get form error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/form/step/:stepNumber
// @desc    Get specific step data
// @access  Private
router.get('/step/:stepNumber', auth, async (req, res) => {
  try {
    const stepNumber = parseInt(req.params.stepNumber);
    
    if (stepNumber < 1 || stepNumber > 8) {
      return res.status(400).json({
        success: false,
        message: 'Step number must be between 1 and 8'
      });
    }

    let formEntry = await FormEntry.findOne({ userId: req.user.uuid });
    
    if (!formEntry) {
      formEntry = new FormEntry({ userId: req.user.uuid });
      await formEntry.save();
    }

    const stepData = formEntry.steps[stepNumber] || {};

    res.json({
      success: true,
      stepNumber,
      data: stepData
    });
  } catch (error) {
    console.error('Get step error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/form/step
// @desc    Update step data
// @access  Private
router.post('/step', auth, async (req, res) => {
  try {
    const { stepNumber, data } = req.body;

    // Basic validation
    if (!stepNumber || stepNumber < 1 || stepNumber > 8) {
      return res.status(400).json({
        success: false,
        message: 'Step number must be between 1 and 8'
      });
    }

    if (!data || typeof data !== 'object') {
      return res.status(400).json({
        success: false,
        message: 'Data must be an object'
      });
    }

    // Find or create form entry
    let formEntry = await FormEntry.findOne({ userId: req.user.uuid });
    
    if (!formEntry) {
      formEntry = new FormEntry({ userId: req.user.uuid });
    }

    // Merge new data with existing step data instead of replacing
    const existingStepData = formEntry.steps[stepNumber] || {};
    formEntry.steps[stepNumber] = {
      ...existingStepData,
      ...data
    };
    
    // Mark steps as modified so Mongoose saves it
    formEntry.markModified('steps');
    await formEntry.save();

    res.json({
      success: true,
      message: 'Step data saved successfully',
      stepNumber,
      data: formEntry.steps[stepNumber]
    });
  } catch (error) {
    console.error('Update step error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
});

// @route   POST /api/form/submit
// @desc    Submit final form
// @access  Private
router.post('/submit', auth, async (req, res) => {
  try {
    let formEntry = await FormEntry.findOne({ userId: req.user.uuid });
    
    if (!formEntry) {
      return res.status(404).json({
        success: false,
        message: 'Form entry not found'
      });
    }

    // Mark as completed
    formEntry.completed = true;
    formEntry.completedAt = new Date();
    await formEntry.save();

    res.json({
      success: true,
      message: 'Form submitted successfully',
      formEntry: {
        id: formEntry._id,
        userId: formEntry.userId,
        steps: formEntry.steps,
        completed: formEntry.completed,
        completedAt: formEntry.completedAt
      }
    });
  } catch (error) {
    console.error('Submit form error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
});

module.exports = router;
