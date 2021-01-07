class Paladin extends Character {
  constructor(name = 'Ulder', hp = 16, dmg = 3, mana = 160, status) {
    super(name, hp, dmg, mana, status);
  }

  specialSkill(victim) {
    if (this.mana >= 40) {
      this.mana -= 40;
      this.hp += 5;
      this.dealDamage(victim, 4);
      console.log(`${this.name} uses Healing Lightning against ${victim.name}, dealing 4 damage points and heals himself for 5 HP !`);
    } else {
      console.log("You don't possess enough mana for this !");
    }
  }
}
