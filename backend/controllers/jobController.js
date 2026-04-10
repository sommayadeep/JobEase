const Job = require('../models/Job');

// Get all jobs
const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, jobs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create job
const createJob = async (req, res) => {
  try {
    const { workerCount, workType, location, date } = req.body;
    
    if (!workerCount || !workType || !location || !date) {
      return res.status(400).json({ success: false, message: 'All fields required' });
    }

    const job = await Job.create({ workerCount, workType, location, date });
    res.status(201).json({ success: true, job });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Update job
const updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const { workerCount, workType, location, date } = req.body;

    const job = await Job.findByIdAndUpdate(
      id, 
      { workerCount, workType, location, date },
      { new: true, runValidators: true }
    );

    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    res.status(200).json({ success: true, job });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete job
const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findByIdAndDelete(id);

    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    res.status(200).json({ success: true, message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllJobs,
  createJob,
  updateJob,
  deleteJob
};

