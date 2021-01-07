class Game {
  constructor(turnLeft = 10, characters) {
    this.turnLeft = turnLeft;
    this.characters = this.charactersCreation();
  }
  
  charactersCreation() {
    const fighter = new Fighter();
    console.log(`The fighter ${fighter.name} has entered the arena!`);
    console.log(fighter);
    const monk = new Monk();
    console.log(`The monk ${monk.name} has entered the arena!`);
    console.log(monk);
    const berzerker = new Berzerker();
    console.log(`The berzerker ${berzerker.name} has entered the arena!`);
    console.log(berzerker);
    const paladin = new Paladin();
    console.log(`The paladin ${paladin.name} has entered the arena!`);
    console.log(paladin);
    const assassin = new Assassin();
    console.log(`The assassin ${assassin.name} has entered the arena!`);
    console.log(assassin);
    return [fighter, monk, berzerker, paladin, assassin];
  }

  newTurn() {
    this.turnLeft -= 1;
    if (this.turnLeft == 0) {
      end();
    } else {
      new Turn(this.characters)
    }
  }

  displayCharacterStats(character) {
    if (character.status === 'loser') {
      console.log(`${character.name} is dead.`);
    } else {
      console.log(`Name : ${character.name}\nHP : ${character.hp}\nDamage : ${character.dmg}\nMana : ${character.mana}\n`);
    }
  }

  displayStats() {
    console.log(this);
    this.characters.forEach((character) => this.displayCharacterStats(character), this);
  }
  
  isContinuing() {
    return this.turnLeft > 0 && this.characters.filter((character) => character.status === 'playing').length > 1;
  }

  winningPlayers() {
    const maxHp = this.characters.reduce((maxHp, currentCharacter) => Math.max(maxHp, currentCharacter.hp));
    const winners = this.characters.filter((character) => character.hp === maxHp);
    return winners;
  }

  displayEnd(winners) {
    if (winners.length === 0) {
      console.log(`Congratulations ${winners[0].name}, you are victorious!`);
    } else if (winners.length > 0) {
      console.log(`WOW! We have more than one winner! Congratulations ${winners.forEach((winner) => `${winner.name}, `)}you won this game!`);
    } else {
      console.log('Oops, we have a problem here!');
    }
  }
  
  end() {
    console.clear();
    this.displayEnd(this.winningPlayers());
    console.log("Thanks for playing!");
  }

  watchStats() {
    this.characters.forEach((character) => {
      this.displayStats(character);
    });
  }

  perform() {
    this.displayStats();
    while (this.isContinuing()) {
      const turn = new Turn(11 - this.turnLeft, this.characters);
      turn.perform();
    }
    this.end();
  }
}
