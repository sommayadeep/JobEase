const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  workerCount: {
    type: Number,
    required: true,
    min: 1
  },
  workType: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Job', jobSchema);

