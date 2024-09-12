'use strict';

const {jobs, characters} = require('./constants');

// Create a character
const createCharacter = (req, res) => { 
  const { name, job } = req.body;

  if (!/^[a-zA-Z_]{4,15}$/.test(name)) { 
    return res.status(400).json({ error: 'Invalid name format.' });
  }
  if (!jobs[job]) {
    return res.status(400).json({ error: 'Invalid job selection.' });
  }
  if (characters.find(char => char.name === name)) {
    return res.status(400).json({ error: 'Character with this name already exists.' });
  }

  const newCharacter = {
    name,
    job,
    status: "alive",  // New characters are alive by default
    currentLife: jobs[job].health, // Current life is initialized to max life (health)
    maxLife: jobs[job].health,     // Max life (health)
    ...jobs[job]
  };
  characters.push(newCharacter);
  res.status(201).json(newCharacter);
};

// List all characters
const getAllCharacters = (req, res) => {
    const characterList = characters.map(char => ({
      name: char.name,
      job: char.job,
      status: char.status
    }));
    res.json(characterList);
  };

// Get a specific character
const getCharacterDetails = (req, res) => {
    const { name } = req.params;
    const character = characters.find(char => char.name === name);

    if (!character) {
        return res.status(404).json({ error: 'Character not found.' });
    }

    const characterDetails = {
        name: character.name,
        job: character.job,
        currentLife: character.currentLife, // Current life points
        maxLife: character.maxLife,         // Max life points
        stats: {
            strength: character.strength,
            dexterity: character.dexterity,
            intelligence: character.intelligence,
        },
        battleModifiers: {
            attack: character.attackModifier,
            speed: character.speedModifier
        }
    };

    res.json(characterDetails);
};

module.exports = {
  createCharacter,
  getAllCharacters,
  getCharacterDetails
};