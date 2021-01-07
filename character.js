class Character {
  constructor(name, hp, dmg, mana, status = 'playing', bonusTurn = 0) {
    this.name = name;
    this.hp = hp;
    this.dmg = dmg;
    this.mana = mana;
    this.status = status;
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

  dealDamage(victim, givenDmg = this.dmg) {
    if (victim.status == 'loser') {
      console.log("You're attacking a corpse, shame on you!");
    } else {
      victim.takeDamage(givenDmg);
    }
  }
} 
