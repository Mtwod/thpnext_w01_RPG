class Assassin extends Character {
  constructor(name = 'Carl', hp = 6, dmg = 6, mana = 20, status, role = 'Assassin', hidden = false, target = null) {
    super(name, hp, dmg, mana, status, role);
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

  isSpecialSkillConditionsRespected() {
    return this.mana >= 20;
  }

  displaySpecialSkillConditionsViolated() {
    alert("You don't possess enough mana for this!");
  }

  displaySpecialSkillInfo() {
    console.log("Shadow Hit (20 mana points): choose a target then hide in the shadows, thus becoming invincible. At next turn, you will deal 7 damage points to your target, but BEWARE! If your target is still alive, you will lose 7 hp...");
  }
  
  specialSkill(victim) {
    this.mana -= 20;
    this.hidden = true;
    this.target = victim;
    console.log(`${this.name} uses Shadow hit and hides in shadows...`);
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
