const express = require('express');
const { body, validationResult } = require('express-validator');
const FormEntry = require('../models/FormEntry');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/form
// @desc    Get user's form entry
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    let formEntry = await FormEntry.findOne({ userId: req.user._id });
    
    if (!formEntry) {
      // Create new form entry if it doesn't exist
      formEntry = new FormEntry({ userId: req.user._id });
      await formEntry.save();
    }

    res.json({
      success: true,
      formEntry: {
        id: formEntry._id,
        userId: formEntry.userId,
        steps: Object.fromEntries(formEntry.steps),
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

    let formEntry = await FormEntry.findOne({ userId: req.user._id });
    
    if (!formEntry) {
      formEntry = new FormEntry({ userId: req.user._id });
      await formEntry.save();
    }

    const stepData = formEntry.getStep(stepNumber);

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
router.post('/step', [
  auth,
  body('stepNumber')
    .isInt({ min: 1, max: 8 })
    .withMessage('Step number must be between 1 and 8'),
  body('data')
    .isObject()
    .withMessage('Data must be an object')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { stepNumber, data } = req.body;

    // Find or create form entry
    let formEntry = await FormEntry.findOne({ userId: req.user._id });
    
    if (!formEntry) {
      formEntry = new FormEntry({ userId: req.user._id });
    }

    // Update step data
    await formEntry.updateStep(stepNumber, data);

    res.json({
      success: true,
      message: 'Step data saved successfully',
      stepNumber,
      data: formEntry.getStep(stepNumber)
    });
  } catch (error) {
    console.error('Update step error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/form/submit
// @desc    Submit final form
// @access  Private
router.post('/submit', auth, async (req, res) => {
  try {
    let formEntry = await FormEntry.findOne({ userId: req.user._id });
    
    if (!formEntry) {
      return res.status(404).json({
        success: false,
        message: 'Form entry not found'
      });
    }

    // Mark as completed
    await formEntry.markCompleted();

    res.json({
      success: true,
      message: 'Form submitted successfully',
      formEntry: {
        id: formEntry._id,
        userId: formEntry.userId,
        steps: Object.fromEntries(formEntry.steps),
        completed: formEntry.completed,
        completedAt: formEntry.completedAt
      }
    });
  } catch (error) {
    console.error('Submit form error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;
