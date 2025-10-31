const mongoose = require('mongoose');

const formEntrySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  steps: {
    type: Map,
    of: mongoose.Schema.Types.Mixed,
    default: new Map()
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

// Index for efficient queries
formEntrySchema.index({ userId: 1 });

// Method to update step data
formEntrySchema.methods.updateStep = function(stepNumber, data) {
  this.steps.set(stepNumber.toString(), data);
  this.markModified('steps');
  return this.save();
};

// Method to get step data
formEntrySchema.methods.getStep = function(stepNumber) {
  return this.steps.get(stepNumber.toString()) || {};
};

// Method to mark as completed
formEntrySchema.methods.markCompleted = function() {
  this.completed = true;
  this.completedAt = new Date();
  return this.save();
};

module.exports = mongoose.model('FormEntry', formEntrySchema);
