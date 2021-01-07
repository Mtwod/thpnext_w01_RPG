class Berzerker extends Character {
  constructor(name = 'Drazen', hp = 8, dmg = 4, mana = 0, status) {
    super(name, hp, dmg, mana, status);
  }

  specialSkill(victim) {
    this.hp -= 1;
    this.dmg += 1;
    this.dealDamage(victim, this.dmg);
    console.log(`${this.name} uses Rage! His attacks are now fiercer and its victim is ${victim.name} ! Dealing ${this.dmg} damage points!`);
  }
}
