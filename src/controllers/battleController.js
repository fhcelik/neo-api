'use strict';

const {battle} = require('../facade/battle');
const {characters} = require('./constants');

  // Start a battle 
  const startBattle = (req, res) => {
    const { characterXName, characterYName } = req.body;
  
    const characterX = characters.find(char => char.name === characterXName);
    const characterY = characters.find(char => char.name === characterYName);
  
    if (!characterX || !characterY) {
      return res.status(404).json({ error: 'One or both characters not found.' });
    }
  
    const battleLog = battle(characterX, characterY);
    res.json({ battleLog });
  };
  
  module.exports = {
    startBattle
  };