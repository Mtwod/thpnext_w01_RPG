class Berzerker extends Character {
  constructor(name = 'Drazen', hp = 8, dmg = 4, mana = 0, status, role = 'Berzerker') {
    super(name, hp, dmg, mana, status, role);
  }

  isSpecialSkillConditionsRespected() {
    return this.hp > 1;
  }

  displaySpecialSkillConditionsViolated() {
    alert("You don't possess enough health points for this!");
  }

  displaySpecialSkillInfo() {
    console.log("Rage: add +1 damage to each of your attacks for the rest of the game, but it will strip you of 1 hp in exchange");
  }

  specialSkill(victim) {
    this.hp -= 1;
    this.dmg += 1;
    this.dealDamage(victim, this.dmg);
    console.log(`${this.name} uses Rage! His attacks are now fiercer and its victim is ${victim.name} ! Dealing ${this.dmg} damage points!`);
  }
}
