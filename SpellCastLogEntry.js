"use strict";

class SpellCastLogEntry
{
    constructor(spellName, turnNumber, target, successful){
        this.spellName = spellName;
        this.turnNumber = turnNumber;
        this.target = target;
        this.successful = successful;
    }
}

module.exports = SpellCastLogEntry;