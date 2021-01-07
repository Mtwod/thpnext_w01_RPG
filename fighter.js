class Fighter extends Character {
  constructor(name = 'Grace', hp = 12, dmg = 4, mana = 40, status, role = 'Fighter', defense = 2) {
    super(name, hp, dmg, mana, status, role);
    this.defense = defense;
  }

  takeDamage(takenDmg) {
    if (this.bonusTurn > 0) {
      takenDmg -= this.defense;
      if (takenDmg < 0) takenDmg = 0;
    }
    this.hp -= takenDmg;
    if (this.hp <= 0) this.hp = 0;
  }

  isSpecialSkillConditionsRespected() {
    return this.mana >= 20;
  }

  displaySpecialSkillConditionsViolated() {
    alert("You don't possess enough mana for this!");
  }

  displaySpecialSkillInfo() {
    console.log("Dark Vision (20 mana points): deal 5 damage to your target and increase your defense by 2 until next turn.");
  }

  specialSkill(victim) {
    this.mana -= 20;
    this.dealDamage(victim, 5);
    this.bonusTurn += 1;
    console.log(`${this.name} uses special attack Dark Vision on ${victim.name} and deals 5 damage points! Defense rises by 2 until next turn.`);
  }
}
