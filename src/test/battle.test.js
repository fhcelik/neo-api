const { battle, test:{calculateAttack, calculateSpeed}} = require('../facade/battle');

// Mocked data for test cases
const warrior = {
  name: 'Warrior',
  job: 'Warrior',
  strength: 10,
  dexterity: 5,
  intelligence: 5,
  currentLife: 20,
  attackModifier: '80% of strength + 20% of dexterity',
  speedModifier: '60% of dexterity + 20% of intelligence',
  status: 'alive',
};

const thief = {
  name: 'Thief',
  job: 'Thief',
  strength: 4,
  dexterity: 10,
  intelligence: 4,
  currentLife: 15,
  attackModifier: '25% of strength + 100% of dexterity',
  speedModifier: '80% of dexterity',
  status: 'alive',
};

const mage = {
  name: 'Mage',
  job: 'Mage',
  strength: 5,
  dexterity: 6,
  intelligence: 10,
  currentLife: 12,
  attackModifier: '20% of strength + 120% of intelligence',
  speedModifier: '40% of dexterity + 10% of strength',
  status: 'alive',
};

describe('Battle System Tests', () => {
  
  test('should calculate attack value correctly for Warrior', () => {
    
    const attackValue = calculateAttack(warrior); 
    expect(attackValue).toBeLessThanOrEqual(10 * 0.8 + 5 * 0.2); // Maximum attack value based on the modifiers
  });

  test('should calculate speed value correctly for Thief', () => {
    
    const speedValue = calculateSpeed(thief);
    expect(speedValue).toBeLessThanOrEqual(10 * 0.8); // Maximum speed value based on modifiers
  });

  test('should run battle and return log', () => {
    const battleLog = battle(warrior, thief);

    // Check if battle log contains key information about the battle
    expect(battleLog[0]).toMatch(/Battle between Warrior \(Warrior\) - 20 HP and Thief \(Thief\) - 15 HP begins!/);

    // Check if battle log contains a win declaration
    expect(battleLog.some(logEntry => logEntry.match(/wins the battle!/))).toBe(true);
  });

  test('should end battle with one character dead', () => {
    const battleLog = battle(warrior, thief);

    // Check if the battle log contains the death of one character
    const characterDeath = battleLog.some(logEntry => logEntry.includes('0 HP'));

    expect(characterDeath).toBe(true); // One character should have 0 HP
  });
});
