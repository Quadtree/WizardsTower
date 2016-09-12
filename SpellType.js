"use strict";

class SpellType
{
    constructor(name, successChance, damage, targetMode, special){
        this.name = name;
        this.successChance = successChance;
        this.damage = damage;
        this.targetMode = targetMode;
        this.special = special;
    }

    cast(caster, target, participants, logger){

        if (this.targetMode == "SELF") target = caster;
        if (this.targetMode == "ALL") target = null;
        if (this.targetMode == "SINGLE" && !target){
            logger.log(caster.name + " needs a target to cast " + this.name);
            return false;
        }

        let effectiveSuccessChance = this.successChance;

        if (caster.charClass == "WIZARD") effectiveSuccessChance += 0.2;

        if (Math.random() <= effectiveSuccessChance){
            logger.log(caster.name + " casts " + this.name + " on " + (target ? target.name : "everyone"));
            if (target){
                logger.log(target.name + " takes " + this.damage + " damage, " + target.hp + " left");
                target.hp -= this.damage;
            } else {
                for (let p of participants){
                    logger.log(p.name + " takes " + this.damage + " damage, " + p.hp + " left");
                    p.hp -= this.damage;
                }
            }

            return true;
        } else {
            logger.log(caster.name + " miscasts " + this.name + " on " + (target ? target.name : "everyone") + ", the spell fizzles and has no effect");
            return false;
        }
    }
}

module.exports = SpellType;