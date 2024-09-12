'use strict';

const {jobs} = require('./constants');

// List all jobs
const getJobs = (req, res) => {
    res.json(jobs);
};

module.exports = {
    getJobs
};