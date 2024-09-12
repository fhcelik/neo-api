const request = require('supertest');
const express = require('express');
const { startBattle } = require('../controllers/battleController');
const { characters } = require('../controllers/constants');

// Set up a mock Express app
const app = express();
app.use(express.json()); // For parsing JSON requests

// Define a route for the battle
app.post('/startBattle', startBattle);

describe('Battle API Tests', () => {

  // Test for successful battle initiation
  test('should return battle log when both characters exist', async () => {
    // Create mock request data
    const battleData = {
      characterXName: characters[0].name, // Assume a character exists in the array
      characterYName: characters[1].name  // Assume another character exists in the array
    };

    // Send a POST request to the battle endpoint
    const res = await request(app)
      .post('/startBattle')
      .send(battleData);

    // Check that the response contains the battle log
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('battleLog');
    expect(Array.isArray(res.body.battleLog)).toBe(true);
    expect(res.body.battleLog.length).toBeGreaterThan(0);
  });

  // Test for a missing character scenario
  test('should return 404 if one or both characters are not found', async () => {
    const battleData = {
      characterXName: 'UnknownCharacter',
      characterYName: characters[0].name
    };

    const res = await request(app)
      .post('/startBattle')
      .send(battleData);

    // Expecting 404 status code for character not found
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: 'One or both characters not found.' });
  });

  // Test for missing body parameters
  test('should return 404 if character names are missing in the request body', async () => {
    const res = await request(app)
      .post('/startBattle')
      .send({});

    // Expecting 404 status code because character names are missing
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: 'One or both characters not found.' });
  });
});
