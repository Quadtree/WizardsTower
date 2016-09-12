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
                logger.log(caster.getLongName() + " casts " + this.name + " on " + (target ? target.getLongName() : "everyone"));
                if (target){
                    this._effect(target, logger);
                } else {
                    for (let p of participants){
                        this._effect(p, logger);
                    }
                }

                success = true;
            } else {
                logger.log(caster.getLongName() + " miscasts " + this.name + " on " + (target ? target.getLongName() : "everyone") + ", the spell fizzles and has no effect");
                success = false;
            }
        }

        caster.spellCastLog.push(new SpellCastLogEntry(this.name, turnNumber, target ? target.name : null, success));

        return success;
    }

    _effect(target, logger){
        if (this.damage > 0){
            target.hp -= this.damage;
            if (target.hp > 4) target.hp = 4;
            logger.log(target.getLongName() + " takes " + this.damage + " damage, " + target.hp + " left");
        } else if (target.hp > 0){
            target.hp -= this.damage;
            if (target.hp > 4) target.hp = 4;
            logger.log(target.getLongName() + " is healed for " + -this.damage + " damage, " + target.hp + " left");
        } else {
            logger.log(target.getLongName() + " is dead and cannot be healed");
        }
    }
}

module.exports = SpellType;