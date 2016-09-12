"use strict";

const SpellCastLogEntry = require("./SpellCastLogEntry.js");

class SpellType
{
    constructor(name, successChance, damage, targetMode, special){
        this.name = name;
        this.successChance = successChance;
        this.damage = damage;
        this.targetMode = targetMode;
        this.special = special;
    }

    cast(caster, target, participants, turnNumber, logger){
        let success = null;

        if (this.targetMode == "SELF") target = caster;
        if (this.targetMode == "ALL") target = null;
        if (this.targetMode == "SINGLE" && !target){
            logger.log(caster.name + " needs a target to cast " + this.name);
            success = false;
        }
        if (success === null){
            let effectiveSuccessChance = this.successChance;

            if (caster.charClass == "WIZARD") effectiveSuccessChance += 0.2;

            if (Math.random() <= effectiveSuccessChance){
                logger.log(caster.name + " casts " + this.name + " on " + (target ? target.name : "everyone"));
                if (target){
                    target.hp -= this.damage;
                    if (target.hp > 4) target.hp = 4;
                    logger.log(target.name + " takes " + this.damage + " damage, " + target.hp + " left");
                } else {
                    for (let p of participants){
                        p.hp -= this.damage;
                        if (target.hp > 4) target.hp = 4;
                        logger.log(p.name + " takes " + this.damage + " damage, " + p.hp + " left");
                    }
                }

                success = true;
            } else {
                logger.log(caster.name + " miscasts " + this.name + " on " + (target ? target.name : "everyone") + ", the spell fizzles and has no effect");
                success = false;
            }
        }

        caster.spellCastLog.push(new SpellCastLogEntry(this.name, turnNumber, target ? target.name : null, success));

        return success;
    }
}

module.exports = SpellType;