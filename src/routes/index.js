'use strict';

const express = require('express');
const router = express.Router();
const { createCharacter,  getAllCharacters, getCharacterDetails } = require('../controllers/characterController');
const {startBattle} = require('../controllers/battleController')
const {getJobs} = require('../controllers/jobsController')

// Route for creating a character
router.post('/characters', createCharacter);
// Route for listing all jobs
router.get('/jobs', getJobs);
// Route for listing all characters
router.get('/all-characters', getAllCharacters);
// Route for getting details of a specific character
router.get('/characters/:name/details', getCharacterDetails);
// Route for starting the battle
router.post('/battle', startBattle);

module.exports = router;