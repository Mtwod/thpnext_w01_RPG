class Assassin extends Character {
  constructor(name = 'Carl', hp = 6, dmg = 6, mana = 20, status, hidden = false) {
    super(name, hp, dmg, mana, status);
    this.hidden = hidden;
  }

  takeDamage(takenDmg) {
    this.hp -= takenDmg;
    if (this.hp <= 0) this.hp = 0;
  }

  specialSkill(victim) {
    if (this.mana >= 20) {
      this.mana -= 20;
      this.dealDamage(victim, 5);
      this.defense = 2;
      console.log(`${this.name} uses his special attack Dark Vision on ${victim.name} and deals 5 damage points! His defense rises by 2 until next turn.`);
    } else {
      console.log("You don't possess enough mana for this !");
    }
  }
}
