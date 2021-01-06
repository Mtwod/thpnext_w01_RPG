class Monk extends Character {
  constructor(name = 'Moana', hp = 8, dmg = 2, mana = 200, status) {
    super(name, hp, dmg, mana, status);
  }

  specialSkill() {
    if (this.mana >= 25) {
      this.mana -= 25;
      this.hp += 8;
      console.log(`${this.name} heals himself and gains 8 HP !`);
    } else {
      console.log("You don't possess enough mana for this !");
    }
  }
}
