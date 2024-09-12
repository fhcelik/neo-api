const request = require('supertest');
const express = require('express');
const { createCharacter, getAllCharacters, getCharacterDetails } = require('../controllers/characterController');
const { characters } = require('../controllers/constants');

// Set up a mock Express app
const app = express();
app.use(express.json()); // To handle JSON requests

// Define routes for each endpoint
app.post('/characters', createCharacter);
app.get('/all-characters', getAllCharacters);
app.get('/characters/:name/details', getCharacterDetails);

describe('Character API Tests', () => {

  // Reset characters array before each test
  beforeEach(() => {
    characters.length = 0; // Reset the characters array to an empty state
  });

  // Test for character creation
  test('should create a new character with valid name and job', async () => {
    const newCharacter = {
      name: 'hero',
      job: 'Warrior'
    };

    const res = await request(app)
      .post('/characters')
      .send(newCharacter);

    expect(res.status).toBe(201);
    expect(res.body.name).toBe('hero');
    expect(res.body.job).toBe('Warrior');
    expect(res.body.status).toBe('alive');
    //expect(res.body.currentLife).toBeGreaterThan(0); // Assuming currentLife comes from job's health
  });

  // Test for invalid name
  test('should return 400 if the name format is invalid', async () => {
    const newCharacter = {
      name: 'Invalid!',
      job: 'Warrior'
    };

    const res = await request(app)
      .post('/characters')
      .send(newCharacter);

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'Invalid name format.' });
  });

  // Test for invalid job
  test('should return 400 if the job is invalid', async () => {
    const newCharacter = {
      name: 'ValidName',
      job: 'InvalidJob'
    };

    const res = await request(app)
      .post('/characters')
      .send(newCharacter);

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'Invalid job selection.' });
  });

  // Test for duplicate character name
  test('should return 400 if a character with the same name already exists', async () => {
    const newCharacter = {
      name: 'DuplicateName',
      job: 'Mage'
    };

    // Create the first character
    await request(app).post('/characters').send(newCharacter);

    // Try to create another character with the same name
    const res = await request(app)
      .post('/characters')
      .send(newCharacter);

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'Character with this name already exists.' });
  });

  // Test for listing all characters
  test('should list all characters', async () => {
    const char1 = { name: 'Char', job: 'Warrior' };

    await request(app).post('/characters').send(char1);

    const res = await request(app).get('/all-characters');

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0]).toHaveProperty('name', 'Char');
  });

  // Test for getting character details
  test('should return the details of a specific character', async () => {
    const newCharacter = {
      name: 'DetailChar',
      job: 'Mage'
    };

    await request(app).post('/characters').send(newCharacter);

    const res = await request(app).get(`/characters/DetailChar/details`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('name', 'DetailChar');
    expect(res.body).toHaveProperty('job', 'Mage');
    expect(res.body).toHaveProperty('currentLife');
    expect(res.body).toHaveProperty('maxLife');
    expect(res.body.stats).toHaveProperty('strength');
    expect(res.body.stats).toHaveProperty('dexterity');
    expect(res.body.stats).toHaveProperty('intelligence');
    expect(res.body.battleModifiers).toHaveProperty('attack');
    expect(res.body.battleModifiers).toHaveProperty('speed');
  });

  // Test for a character not found
  test('should return 404 if the character is not found', async () => {
    const res = await request(app).get('/characters/unknownChar/details');

    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: 'Character not found.' });
  });
});
