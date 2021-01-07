class Character {
  constructor(name, hp, dmg, mana, status = 'playing', role = '', bonusTurn = 0) {
    this.name = name;
    this.hp = hp;
    this.dmg = dmg;
    this.mana = mana;
    this.status = status;
    this.role = role;
    this.bonusTurn = bonusTurn;
  }

  takeDamage(takenDmg) {
    this.hp -= takenDmg;
    if (this.hp <= 0) this.hp = 0;
  }

  isKilled(attacker) {
    if (this.hp === 0) {
      this.died();
      attacker.mana += 20;
      console.log(`${attacker.name} recovers 20 mana points!`);
    }
  }

  died() {
    this.status = 'loser';
    console.log(`${this.name} just perished!`);
  }

  isDead() {
    return this.status === 'loser';
  }

  displayAttackingDeadMessage() {
    console.log("You're attacking a corpse, shame on you!");
  }

  dealDamage(victim, givenDmg = this.dmg) {
    if (victim.isDead()) {
      this.displayAttackingDeadMessage();
    } else {
      victim.takeDamage(givenDmg);
    }
  }
} 
