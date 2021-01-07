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

  watchStats() {
    this.characters.filter((character) => character.status == 'playing').forEach((character) => this.displayCharacterStats(character), this);
  }
  
  isContinuing() {
    return this.turnLeft > 0 && this.characters.filter((character) => character.status === 'playing').length > 1;
  }

  winningPlayers() {
    const maxHp = this.characters.map((character) => character.hp).reduce((accumulator, currentCharacterHp) => Math.max(accumulator, currentCharacterHp));
    const winners = this.characters.filter((character) => character.hp === maxHp);
    return winners;
  }

  displayWinners(winners) {
    let winnersList = '';
    winners.forEach((winner) => {
      winnersList += `${winner.name}, `;
    });
    return winnersList;
  }

  displayEnd(winners) {
    if (winners.length === 1) {
      console.log(`Congratulations ${winners[0].name}, you are victorious!`);
    } else if (winners.length > 1) {
      console.log(`WOW! We have more than one winner! Congratulations ${this.displayWinners(winners)}you won this game!`);
    } else {
      console.log('Oops, we have a problem here!');
    }
  }
  
  end() {
    console.clear();
    this.displayEnd(this.winningPlayers());
    console.log("Thanks for playing!");
  }

  perform() {
    this.watchStats();
    let remainingCharacters = this.characters.filter((character) => character.status == 'playing');
    while (this.isContinuing()) {
      const turn = new Turn(11 - this.turnLeft, remainingCharacters);
      turn.perform();
      this.turnLeft -= 1;
      remainingCharacters = remainingCharacters.filter((character) => character.status == 'playing');
    }
    this.end();
  }
}
