"use strict";

const vm = require("vm");

class Participant
{
    constructor(controllerType, name, logger){
        this._vm = controllerType.createVM();
        this.hp = 4;
        this.charClass = controllerType.charClass;
        this.team = controllerType.team;
        this.name = name;
        this.spellCastLog = [];
        this._logger = logger;
    }

    turn(participants, turnNumber){
        let cleanedList = {};

        for (let p of participants){
            let cleaned = {};
            cleaned.hp = p.hp;
            cleaned.charClass = p.charClass;
            cleaned.team = p.team;
            cleaned.name = p.name;

            cleaned.spellCastLog = p.spellCastLog;

            cleanedList[p.name] = cleaned;
        }

        let action = JSON.parse(JSON.stringify(vm.runInContext("turn('" + this.name + "'," + JSON.stringify(cleanedList) + "," + turnNumber + ");", this._vm)));

        if (action.spell && typeof(action.spell) == "string"){
            this_.logger.log(this.name + " casts " + action.spell);
        }
    }
}

module.exports = Participant;