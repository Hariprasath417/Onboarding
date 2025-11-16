const mongoose = require('mongoose');

const formEntrySchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  steps: {
    type: Object,
    default: {}
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

// Index for efficient queries by userId
formEntrySchema.index({ userId: 1 });

module.exports = mongoose.model('FormEntry', formEntrySchema);
