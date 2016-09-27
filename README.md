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

# Recent Result:
<pre>
WIZARD+WIZARD+./controllers/wizard/basic.js+: 1349
WIZARD+WIZARD+./controllers/wizard/healself.js+: 145
APPRENTICE+WIZARD+./controllers/apprentice/inverse_shark.js+: 497
APPRENTICE+WIZARD+./controllers/apprentice/shark.js+: 487
APPRENTICE+WIZARD+./controllers/apprentice/basic.js+: 479
APPRENTICE+WIZARD+./controllers/apprentice/aggressive.js+: 452
APPRENTICE+ASSASSIN+./controllers/assassin/noattackwizard.js+: 889
APPRENTICE+ASSASSIN+./controllers/assassin/assistor.js+: 661
APPRENTICE+ASSASSIN+./controllers/assassin/basic.js+: 649
APPRENTICE+ASSASSIN+./controllers/assassin/waiter.js+: 590
APPRENTICE+ASSASSIN+./controllers/assassin/delayed_action.js+: 479
APPRENTICE+DEMON+./controllers/demon/noattackwizard.js+: 1400
APPRENTICE+DEMON+./controllers/demon/basic.js+: 695
</pre>

# Recent Result (No Draw Rule, Only Peacekeepers)
<pre>
WIZARD+WIZARD+./controllers/wizard/peacekeeper.js+: 2738
APPRENTICE+WIZARD+./controllers/apprentice/ln_peacekeeper.js+: 3628
APPRENTICE+ASSASSIN+./controllers/assassin/basic.js+: 707
APPRENTICE+ASSASSIN+./controllers/assassin/waiter.js+: 542
APPRENTICE+ASSASSIN+./controllers/assassin/assistor.js+: 464
APPRENTICE+ASSASSIN+./controllers/assassin/ln_noattackwizard.js+: 405
APPRENTICE+ASSASSIN+./controllers/assassin/delayed_action.js+: 327
APPRENTICE+DEMON+./controllers/demon/basic.js+: 594
APPRENTICE+DEMON+./controllers/demon/noattackwizard.js+: 412
</pre>

# Recent Result (Draw Rule, Only Peacekeepers)
<pre>
WIZARD+WIZARD+./controllers/wizard/peacekeeper.js+: 2196
APPRENTICE+WIZARD+./controllers/apprentice/ln_peacekeeper.js+: 2863
APPRENTICE+ASSASSIN+./controllers/assassin/basic.js+: 738
APPRENTICE+ASSASSIN+./controllers/assassin/waiter.js+: 549
APPRENTICE+ASSASSIN+./controllers/assassin/assistor.js+: 436
APPRENTICE+ASSASSIN+./controllers/assassin/ln_noattackwizard.js+: 402
APPRENTICE+ASSASSIN+./controllers/assassin/delayed_action.js+: 311
APPRENTICE+DEMON+./controllers/demon/basic.js+: 539
APPRENTICE+DEMON+./controllers/demon/noattackwizard.js+: 446
</pre>