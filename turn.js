class Turn {
  constructor(number, characters) {
    this.number = number;
    this.characters = characters;
  }

  startTurn() {
    console.log(`It's turn ${this.number}`);
  }

  displayVictimChoice(character) {
    return `Turn n°${this.number}\n${character.name}, who will you slay?\n\nSelect the target by typing the number associated to its name in the list displayed in the console,\nor type 'w' to watch the stats of the remaining players.`;
  }

  victimChoice(currentCharacter) {
    let potentialVictims = [ ...this.characters ];
    const currentCharacterIndex = potentialVictims.indexOf(currentCharacter);
    potentialVictims.splice(currentCharacterIndex, 1);
    potentialVictims = potentialVictims.filter((character) => character.status === 'playing');

    console.log("Below, the list of the potential victims of your wrath :");
    for (let i = 0; i < potentialVictims.length; i++) {
      console.log(`${i} - ${potentialVictims[i].name}`);
    }

    let choice = prompt(`${this.displayVictimChoice(currentCharacter)}`);
    while (true) {
      if (choice === 'w') {
        this.watchStats();
        choice = prompt(`The stats has been displayed in the console!\n\n${this.displayVictimChoice(currentCharacter)}`);
      } else if (choice === null || choice === '' || choice.match(/\D/)) {
        choice = prompt(`You entered a wrong input, please try again! I'll repeat :\n\n${this.displayVictimChoice(currentCharacter)}`);
      } else if (choice >= 0 && choice < potentialVictims.length) {
        choice = parseInt(choice);
        return potentialVictims[choice];
      } else {
        choice = prompt(`You entered a wrong input, please try again! I'll repeat :\n\n${this.displayVictimChoice(currentCharacter)}`);
      }
    }
  }

  displayActionChoice(character) {
    return `Turn n°${this.number}\n${character.name}, what will you do?\n\n- Type 'a' to attack\n- Type 's' to use the special skill\n- Type 'w' to watch the stats of the remaining players`;
  }

  actionChoice(character) {
    let choice = prompt(`${this.displayActionChoice(character)}`);
    while (true) {
      switch (choice) {
        case 'a':
          const victim = this.victimChoice(character);
          character.dealDamage(victim);
          console.log(`${character.name} deals ${character.dmg} damages to ${victim.name}. ${victim.name} has now ${victim.hp} health points left.`);
          victim.isKilled(character);
          return;
        case 's':
          if (character instanceof Monk) {
            character.specialSkill();
          } else {
            character.specialSkill(this.victimChoice(character));
          }
          return;
        case 'w':
          this.watchStats();
          choice = prompt(`The stats has been displayed in the console!\n\n${this.displayActionChoice(character)}`);
          break;
        default:
          choice = prompt(`You entered a wrong input, please try again! I'll repeat :\n\n${this.displayActionChoice(character)}`);
      }
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

  perform() {
    this.startTurn();
    this.characters.forEach(function (character) {
      if (character.status == 'playing') {
        console.log(`It's time for ${character.name} to play.`);
        this.actionChoice(character);
      } else {
        console.log(`OOPS : ${character.name} is dead and can't play.`);
      }
    }, this);
  }
}
