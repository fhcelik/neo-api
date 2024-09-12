const request = require('supertest');
const express = require('express');
const { getJobs } = require('../controllers/jobsController');
const { jobs } = require('../controllers/constants');

// Set up a mock Express app
const app = express();

// Define route for the endpoint
app.get('/jobs', getJobs);

describe('Job API Tests', () => {

  // Test for listing all jobs
  test('should list all available jobs', async () => {
    const res = await request(app).get('/jobs');

    expect(res.status).toBe(200);
    expect(res.body).toEqual(jobs);
    expect(res.body).toHaveProperty('Warrior');
    expect(res.body).toHaveProperty('Thief');
    expect(res.body).toHaveProperty('Mage');
  });

});
