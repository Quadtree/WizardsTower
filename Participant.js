"use strict";

const vm = require("vm");
const SpellType = require("./SpellType.js");

const SPELLS = {
    "Flame Arrow": new SpellType("Flame Arrow", 0.7, 1, "SINGLE", null),
    "Flame Wave": new SpellType("Flame Wave", 0.3, 1, "ALL", null),
    "Heal": new SpellType("Heal", 0.2, 1, "SINGLE", null),
};

class Participant
{
    constructor(controllerType, name, logger){
        this._vm = controllerType.createVM();

        vm.runInContext("const SPELLS = " + JSON.stringify(SPELLS), this._vm, {timeout: 25});

        this.hp = 4;
        this.charClass = controllerType.charClass;
        this.team = controllerType.team;
        this.name = name;
        this.controllerType = controllerType;
        this.spellCastLog = [];
        this._logger = logger;
    }

    turn(participants, turnNumber){
        let cleanedList = [];

        for (let p of participants){
            let cleaned = {};
            cleaned.hp = p.hp;
            cleaned.charClass = p.charClass;
            cleaned.team = p.hp > 0 ? null : p.team;
            cleaned.name = p.name;

            cleaned.spellCastLog = p.spellCastLog;

            cleanedList.push(cleaned);
        }
        let action = null;
        try {
            action = JSON.parse(JSON.stringify(vm.runInContext("turn(" + JSON.stringify(this) + "," + JSON.stringify(cleanedList) + "," + turnNumber + ");", this._vm, {timeout: 5})));
        } catch(ex){
            console.log("Error in brain: " + JSON.stringify(ex));
        }

        if (action && action.spell && typeof(action.spell) == "string"){
            let spell = null;
            let target = null;

            if (SPELLS[action.spell]) spell = SPELLS[action.spell];
            
            if (action.target){
                for (let p of participants){
                    if (p.name == action.target){
                        target = p;
                    }
                }
                if (!target) logger.log("WARNING: Attempt to cast at invalid target " + action.target);
            }

            if (spell)
                SPELLS[action.spell].cast(this, target, participants, turnNumber, this._logger);
            else
                logger.log("WARNING: Attempt to cast non-existant spell " + action.spell);
        }
        
    }
}

module.exports = Participant;