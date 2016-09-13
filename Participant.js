"use strict";

const vm = require("vm");
const SpellType = require("./SpellType.js");



class Participant
{
    constructor(controllerType, name, logger){
        this._vm = controllerType.createVM();

        this.hp = 4;
        this.charClass = controllerType.charClass;
        this.team = controllerType.team;
        this.name = name;
        this.controllerType = controllerType;
        this.spellCastLog = [];
        this._logger = logger;
        this._cleanedList = null;

        this.public = {};
        Object.defineProperties(this.public, {
            hp: {get: () => { return this.hp; }},
            charClass: {get: () => { return this.charClass; }},
            team: {get: () => { return p.hp > 0 ? null : this.team; }},
            name: {get: () => { return this.name; }},
            spellCastLog: {get: () => { return this.spellCastLog; }},
        });
    }

    turn(participants, turnNumber){
        const SPELLS = SpellType.prototype.SPELLS;

        if (this._cleanedList === null){
            this._cleanedList = [];
            for (let p of participants){
                this._cleanedList.push(p.public);
            }
        }
        let action = null;
        try {
            action = this._vm.turn.call(null, this.public, this._cleanedList, turnNumber, this.team);
        } catch(ex){
            console.log(this.controllerType.getLongName() + ": Error in brain: " + ex);
        }

        if (typeof(action) != "object") action = {};

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
                if (!target) this._logger.log("WARNING: Attempt to cast at invalid target " + action.target);
            }

            if (spell)
                SPELLS[action.spell].cast(this, target, participants, turnNumber, this._logger);
            else
                this._logger.log("WARNING: Attempt to cast non-existant spell " + action.spell);
        }
        
    }

    getLongName(){
        return this.name + " (" + this.controllerType.getLongName() + ")";
    }
}

module.exports = Participant;