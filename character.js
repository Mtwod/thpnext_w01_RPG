class Character {
  constructor(name, hp, dmg, mana, status = 'playing') {
    this.name = name;
    this.hp = hp;
    this.dmg = dmg;
    this.mana = mana;
    this.status = status;
  }

  takeDamage(attacker, takenDmg) {
    this.hp -= takenDmg;
    this.isDead(attacker);
  }

  isDead(attacker) {
    if (this.hp <= 0) {
      this.hp = 0;
      this.status = 'loser';
      console.log(`${this.name} vient de trépasser !`);
      attacker.mana += 20;
      console.log(`${attacker.name} récupère donc 20 points de mana !`)
    }
  }

  dealDamage(victim, givenDmg = this.dmg) {
    if (victim.status != 'loser') {
      victim.takeDamage(this, givenDmg);
    }
  }

} 
