const express = require('express');
const { getAllJobs, createJob, updateJob, deleteJob } = require('../controllers/jobController');

const router = express.Router();

router.route('/')
  .get(getAllJobs)
  .post(createJob);

router.route('/:id')
  .put(updateJob)
  .delete(deleteJob);

module.exports = router;

