  'use strict';

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  };
  
  // Calculate the attack value based on modifiers
  const calculateAttack = (character) => {
    const attack = character.attackModifier.split('+').reduce((acc,modifier) => {
        let calc=0;
        const [percentage, stat] = modifier.trim().split(' of ');
        const decimal = parseFloat(percentage)/100;
  
        if(stat === 'dexterity'){
          calc = character.dexterity * decimal
        }else if(stat === 'intelligence'){
          calc=character.intelligence * decimal
        }else if(stat === 'strength'){
          calc=character.strength * decimal
        }
  
        return acc+=calc;
      },0);

    return getRandomInt(attack);
  };
  
  // Calculate speed value based on modifiers
  const calculateSpeed = (character) => { 
    const speed = character.speedModifier.split('+').reduce((acc,modifier) => {
      let calc=0;
      const [percentage, stat] = modifier.trim().split(' of ');
      const decimal = parseFloat(percentage)/100;

      if(stat === 'dexterity'){
        calc = character.dexterity * decimal
      }else if(stat === 'intelligence'){
        calc=character.intelligence * decimal
      }else if(stat === 'strength'){
        calc=character.strength * decimal
      }

      return acc+=calc;
    },0);
   
    return getRandomInt(speed);
  };
  
  // Battle logic
  const battle = (characterX, characterY) => {
    let log = [];
    let round = 1;

    // Battle starts
    log.push(`Battle between ${characterX.name} (${characterX.job}) - ${characterX.currentLife} HP and ${characterY.name} (${characterY.job}) - ${characterY.currentLife} HP begins!`);
  
    // Continue until one of the characters is dead
    while (characterX.currentLife > 0 && characterY.currentLife > 0) {
      let firstAttacker, secondAttacker;
      
      // Determine who goes first based on speed
      const charXSpeed = calculateSpeed(characterX);
      const charYSpeed = calculateSpeed(characterY);
  
      if (charXSpeed > charYSpeed) {
        firstAttacker = characterX;
        secondAttacker = characterY;
        log.push(`${characterX.name} ${charXSpeed} speed was faster than ${characterY.name} ${charYSpeed} speed and will begin this round.`);
      } else if (charYSpeed > charXSpeed) {
        firstAttacker = characterY;
        secondAttacker = characterX;
        log.push(`${characterY.name} ${charYSpeed} speed was faster than ${characterX.name} ${charXSpeed} speed and will begin this round.`);
      } else {
        continue; // Redraw round in case of a draw in speed
      }
  
      // First attacker attacks
      let damage = calculateAttack(firstAttacker);
      secondAttacker.currentLife = Math.max(0, secondAttacker.currentLife - damage);
      log.push(`${firstAttacker.name} attacks ${secondAttacker.name} for ${damage}, ${secondAttacker.name} has ${secondAttacker.currentLife} HP remaining.`);
  
      // Check if second attacker is dead
      if (secondAttacker.currentLife === 0) {
        log.push(`${firstAttacker.name} wins the battle! ${firstAttacker.name} still has ${firstAttacker.currentLife} HP remaining!`);
        secondAttacker.status = "dead";
        break;
      }
  
      // Second attacker attacks
      damage = calculateAttack(secondAttacker);
      firstAttacker.currentLife = Math.max(0, firstAttacker.currentLife - damage);
      log.push(`${secondAttacker.name} attacks ${firstAttacker.name} for ${damage}, ${firstAttacker.name} has ${firstAttacker.currentLife} HP remaining.`);
  
      // Check if first attacker is dead
      if (firstAttacker.currentLife === 0) {
        log.push(`${secondAttacker.name} wins the battle! ${secondAttacker.name} still has ${secondAttacker.currentLife} HP remaining!`);
        firstAttacker.status = "dead";
        break;
      }
  
      round++;
    }
  
    return log;
  };
  
  module.exports = {
    battle,
    // Export these only for testing purposes
    test: {
        calculateAttack,
        calculateSpeed,
    }
  };