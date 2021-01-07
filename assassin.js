class Assassin extends Character {
  constructor(name = 'Carl', hp = 6, dmg = 6, mana = 20, status, hidden = false, target = null) {
    super(name, hp, dmg, mana, status);
    this.hidden = hidden;
    this.target = target;
  }

  takeDamage(takenDmg) {
    if (this.hidden) {
      console.log(`${this.name} is hidden in the shadow, thus becoming untouchable...`);
      return;
    }
    this.hp -= takenDmg;
    if (this.hp <= 0) this.hp = 0;
  }
  
  specialSkill(victim) {
    if (this.mana >= 20) {
      this.mana -= 20;
      this.hidden = true;
      this.target = victim;
      console.log(`${this.name} uses Shadow hit and hides in shadows...`);
    } else if (this.hidden) {
      this.shadowHit();
    } else {
      console.log("You don't possess enough mana for this !");
    }
  }

  shadowHit() {
    this.hidden = false;
    if (this.target.status === 'loser') {
      console.log('Your target died in the meantime, you were too slow!');
    } else {
      this.dealDamage(this.target, 7);
      console.log(`${this.target.name} has been stabbed in the back by ${this.name}, and lost 7 hp!`);
      if (this.target.hp === 0) {
        this.target.status = 'loser';
        this.mana += 20;
        console.log(`${this.name} killed ${this.target.name} and recovers 20 mana points!`);
      } else {
        this.hp -= 7;
        console.log(`As its victim didn't die, ${this.name} lost 7 hp because of shame!`);
        if (this.hp <= 0) {
          this.died();
        }

      }
    }
    this.target = null;
  }

}
