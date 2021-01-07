class Fighter extends Character {
  constructor(name = 'Grace', hp = 12, dmg = 4, mana = 40, status, defense = 2) {
    super(name, hp, dmg, mana, status);
    this.defense = defense;
  }

  takeDamage(attacker, takenDmg) {
    if (this.bonusTurn > 0) {
      takenDmg -= this.defense;
      if (takenDmg < 0) takenDmg = 0;
    }
    this.hp -= takenDmg;
    this.isKilled(attacker);
  }

  specialSkill(victim) {
    if (this.mana >= 20) {
      this.mana -= 20;
      this.dealDamage(victim, 5);
      this.bonusTurn += 1;
      console.log(`${this.name} uses his special attack Dark Vision on ${victim.name} and deals 5 damage points! His defense rises by 2 until next turn.`);
    } else {
      console.log("You don't possess enough mana for this !");
    }
  }
}
