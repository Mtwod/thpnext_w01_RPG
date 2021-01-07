class Monk extends Character {
  constructor(name = 'Moana', hp = 8, dmg = 2, mana = 200, status, role = 'Monk') {
    super(name, hp, dmg, mana, status, role);
  }

  isSpecialSkillConditionsRespected() {
    return this.mana >= 25;
  }

  displaySpecialSkillConditionsViolated() {
    alert("You don't possess enough mana for this!");
  }
  
  displaySpecialSkillInfo() {
    console.log("Heal (25 mana points): heal yourself of 8 hp");
  }

  specialSkill() {
    this.mana -= 25;
    this.hp += 8;
    console.log(`${this.name} heals himself for 8HP and has now ${this.hp} HP !`);
  }
}
