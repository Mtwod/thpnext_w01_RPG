class Fighter extends Character {
  constructor(name = 'Grace', hp = 12, dmg = 4, mana = 40, status, defense = 0) {
    super(name, hp, dmg, mana, status);
    this.defense = defense;
  }

  takeDamage(attacker, takenDmg) {
    if (takenDmg - this.defense < 0) takenDmg = 0;
    this.hp -= takenDmg;
    this.isDead(attacker);
  }

  darkVision(victim) {
    if (this.mana >= 20) {
      this.mana -= 20;
      this.dealDamage(victim, 5);
      this.defense = 2;
      console.log(`${this.name} utilise l'attaque spéciale Dark Vision sur ${victim.name} et lui inflige 5 points de dégât ! Sa défense augmente jusqu'au prochain tour.`);
    }
  }
}
