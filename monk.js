class Monk extends Character {
  constructor(name = 'Moana', hp = 8, dmg = 2, mana = 200, status) {
    super(name, hp, dmg, mana, status);
  }

  takeDamage(attacker, takenDmg) {
    this.hp -= takenDmg;
    this.isDead(attacker);
  }

  heal() {
    if (this.mana >= 25) {
      this.mana -= 25;
      this.hp += 8;
      console.log(`${this.name} se soigne de 8 HP !`);
    }
  }
}
