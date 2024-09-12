const jobs = {
    Warrior: { health: 20, strength: 10, dexterity: 5, intelligence: 5, attackModifier:"80% of strength + 20% of dexterity", speedModifier:"60% of dexterity + 20% of intelligence" },
    Thief: { health: 15, strength: 4, dexterity: 10, intelligence: 4, attackModifier:"25% of strength + 100% of dexterity", speedModifier:"80% of dexterity" },
    Mage: { health: 12, strength: 5, dexterity: 6, intelligence: 10, attackModifier:"20% of strength + 20% of dexterity + 120% of intelligence", speedModifier:"40% of dexterity + 10% of strength" },
  };

  const characters = [{
    "name": "small_warrior",
    "job": "Warrior",
    "status": "alive",
    "currentLife": 20,
    "maxLife": 20,
    "health": 20,
    "strength": 10,
    "dexterity": 5,
    "intelligence": 5,
    "attackModifier": "80% of strength + 20% of dexterity",
    "speedModifier": "60% of dexterity + 20% of intelligence"
},
{
    "name": "big_thief",
    "job": "Thief",
    "status": "alive",
    "currentLife": 15,
    "maxLife": 15,
    "health": 15,
    "strength": 4,
    "dexterity": 10,
    "intelligence": 4,
    "attackModifier": "25% of strength + 100% of dexterity",
    "speedModifier": "80% of dexterity"
}];

module.exports={
    jobs,
    characters
}