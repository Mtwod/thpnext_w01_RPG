class Paladin extends Character {
  constructor(name = 'Ulder', hp = 16, dmg = 3, mana = 160, status, role = 'Paladin') {
    super(name, hp, dmg, mana, status, role);
  }

  isSpecialSkillConditionsRespected() {
    return this.mana >= 40;
  }

  displaySpecialSkillConditionsViolated() {
    alert("You don't possess enough mana for this!");
  }

  displaySpecialSkillInfo() {
    console.log("Healing Lighting (40 mana points): inflict 4 of damage while healing himself of 5 hp.");
  }


  specialSkill(victim) {
    this.mana -= 40;
    this.hp += 5;
    this.dealDamage(victim, 4);
    console.log(`${this.name} uses Healing Lightning against ${victim.name}, dealing 4 damage points and heals himself for 5 HP !`);
  }
}
