class Game {
  constructor(turnLeft = 10) {
    this.turnLeft = turnLeft;
    this.charactersCreation();
  }
  
  charactersCreation() {
    let fighter = new Fighter();
    console.log(`The fighter ${fighter.name} has entered the arena!`);
    console.log(fighter);
    let monk = new Monk();
    console.log(`The monk ${monk.name} has entered the arena!`);
    console.log(monk);
    let berzerker = new Berzerker();
    console.log(`The berzerker ${berzerker.name} has entered the arena!`);
    console.log(berzerker);
    let paladin = new Paladin();
    console.log(`The paladin ${paladin.name} has entered the arena!`);
    console.log(paladin);
    let assassin = new Assassin();
    console.log(`The assassin ${assassin.name} has entered the arena!`);
    console.log(assassin);
    this.characters = [fighter, monk, berzerker, paladin, assassin];
  }

  newTurn() {
    this.turnLeft -= 1;
    if (this.turnLeft == 0) {
      end();
    } else {
      new Turn(this.characters)
    }
  }

  end() {
    console.clear();
    // TODO: add winner
    console.log("Thanks for playing!")
  }

  perform() {
    new Turn(11 - this.turnLeft, this.characters);
  }
}