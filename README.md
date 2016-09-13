# Wizard's Tower
This is a fairly simple programming game partially inspired by the tabletop game "Bang".

## The Game
The game works as follows:

There are N participants. Each participant has two attributes:

* Class (Public): Either Apprentice or Wizard. The wizard has a +20% chance to cast all spells
* Team (Private): Either Wizard, Assassin, or Demon

Play proceeds in a random order, although once set during the first turn the order never changes.

After 50 turns, the winner is decided:

* If the wizard is alive, Team Wizard wins. Dead apprentices still get credit.
* If the wizard is dead and at least one assassin is alive, Team Assassin wins. Dead assasins still get credit.
* If there is only one participant left, and they're a demon, they win. Dead demons never get credit.

## Creating New Controllers
Controllers receive a call to "turn" on each turn. It has a single argument, which is the 0-based turn number.

From this function they should return an object with two fields: "spell", which is the spell they want to cast, and target, which is the target of the spell's name (or null, if the spell targets ALL)

They also get a list of automatic globals passed into their VM:

* SPELLS: A list of all spells and their attributes
* PARTICIPANTS: All the participants in the current game, in turn order
* PARTICIPANT_MAP: Map keyed off the participants' names
* ME: Public fields for this particular participant
* MY_TEAM: The team this participant is on (Either WIZARD, ASSASSIN, or DEMON)