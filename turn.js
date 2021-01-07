class Turn {
  constructor(number, characters) {
    this.number = number;
    this.characters = characters;
  }

  startTurn() {
    console.log(`It's turn ${this.number}`);
  }

  displayVictimChoice(character) {
    return `Turn n°${this.number}\n${character.role} ${character.name}, who will you slay?\n\n- Select the target by typing the number associated to its name in the list displayed in the console,\n- Type 'w' to watch the stats of the remaining players\n- Type 'i' to get informations on your character's special skill`;
  }

  victimChoice(currentCharacter) {
    let potentialVictims = [ ...this.characters ];
    const assassinIndex = potentialVictims.indexOf(potentialVictims.find((character) => character instanceof Assassin));
    if (potentialVictims[assassinIndex].hidden) potentialVictims.splice(assassinIndex, 1);
    const currentCharacterIndex = potentialVictims.indexOf(currentCharacter);
    potentialVictims.splice(currentCharacterIndex, 1);
    potentialVictims = potentialVictims.filter((character) => character.status === 'playing');

    console.log("Below, the list of the potential victims of your wrath :");
    for (let i = 0; i < potentialVictims.length; i++) {
      console.log(`${i} - ${potentialVictims[i].name} (${potentialVictims[i].role}, hp left: ${potentialVictims[i].hp} )`);
    }

    let choice = prompt(`${this.displayVictimChoice(currentCharacter)}`);
    while (true) {
      if (choice === 'w') {
        this.watchStats();
        choice = prompt(`The stats has been displayed in the console!\n\n${this.displayVictimChoice(currentCharacter)}`);
      } else if (choice === 'i') {
        currentCharacter.displaySpecialSkillInfo();
        choice = prompt(`The special skill info has been displayed in the console!\n\n${this.displayVictimChoice(currentCharacter)}`);
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
    return `Turn n°${this.number}\n${character.role} ${character.name}, what will you do?\n\n- Type 'a' to attack\n- Type 's' to use the special skill\n- Type 'w' to watch the stats of the remaining players\n- Type 'i' to get informations on your character's special skill`;
  }
  
  isAssassinHidden(character) {
    return character instanceof Assassin && character.hidden;
  }

  actionChoice(character) {
    if (this.isAssassinHidden(character)) {
      character.shadowHit();
      alert(`Check your console to see what ${character.name} did!`);
      return;
    }
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
          if (character.isSpecialSkillConditionsRespected()) {
            if (character instanceof Monk) {
              character.specialSkill();
            } else {
              const victim = this.victimChoice(character);
              character.specialSkill(victim);
              victim.isKilled(character);
            }
            return;
          } else {
            character.displaySpecialSkillConditionsViolated();
            choice = prompt(`${this.displayActionChoice(character)}`);
          }
          break;
        case 'w':
          this.watchStats();
          choice = prompt(`The stats has been displayed in the console!\n\n${this.displayActionChoice(character)}`);
          break;
        case 'i':
          character.displaySpecialSkillInfo();
          choice = prompt(`The special skill info has been displayed in the console!\n\n${this.displayActionChoice(character)}`);
          break;
        default:
          choice = prompt(`You entered a wrong input, please try again! I'll repeat :\n\n${this.displayActionChoice(character)}`);
      }
    }
  }

  decrementBonusTurn(character) {
    if (character.bonusTurn > 0) character.bonusTurn -= 1;
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
        this.decrementBonusTurn(character);
        this.actionChoice(character);
      } else {
        console.log(`OOPS : ${character.name} is dead and can't play.`);
      }
    }, this);
  }
}
