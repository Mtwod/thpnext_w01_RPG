class Turn {
  constructor(number, characters) {
    this.number = number;
    this.characters = characters;
  }

  startTurn() {
    console.log(`It's turn ${this.number}`);
  }

  victimChoice(currentCharacter) {
    let potentialVictims = [ ...this.characters ];
    const currentCharacterIndex = potentialVictims.indexOf(currentCharacter);
    potentialVictims.splice(currentCharacterIndex, 1);

    console.log("Below, the list of the potential victims of your wrath :");
    for (let i = 0; i < potentialVictims.length; i++) {
      console.log(`${i} - ${potentialVictims[i].name}`);
    }

    let choice = prompt("Select the target by typing the number associated to its name in the list above.");
    while (true) {
      if (choice >= 0 && choice < potentialVictims.length) {
        choice = parseInt(choice);
        return potentialVictims[choice];
      } else {
        choice = prompt("You entered a wrong input, please try again!");
      }
    }
  }

  actionChoice(character) {
    let choice = prompt("Type 'a' to attack or 's' to use the special skill");
    while (true) {
      if (choice === 'a') {
        const victim = this.victimChoice(character);
        character.dealDamage(victim);
        console.log(`${character.name} deals ${character.dmg} damages to ${victim.name}. ${victim.name} has now ${victim.hp} health points left.`);
        return ;
      } 
      else if (choice === 's') {
        if (character instanceof Monk) {
          character.specialSkill();
          return;
        } else {
          character.specialSkill(this.victimChoice(character));
          return;
        }
      }
      else {
        choice = prompt("You entered a wrong input, please try again!");
      }
    }
  }

  perform() {
    this.startTurn();
    this.characters.forEach(function (character) {
      console.log(`It's time for ${character.name} to play.`);
      this.actionChoice(character);
    }, this);
  }
}
