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

        if (turnNumber == 0){
            this._vm.PARTICIPANTS = [];
            this._vm.PARTICIPANT_MAP = {};
            this._vm.TEAM_COUNTS = {};
            this._vm.ME = this.public;
            this._vm.MY_TEAM = this.team;

            if (typeof(this._vm.GENES) != "array") this._vm.GENES = [];
            while(this._vm.GENES.length < 10) this._vm.GENES.push(1);

            for (let p of participants){
                this._vm.PARTICIPANTS.push(p.public);
                this._vm.PARTICIPANT_MAP[p.public.name] = p.public;

                if (typeof(this._vm.TEAM_COUNTS[p.team]) == "undefined") this._vm.TEAM_COUNTS[p.team] = 0;
                this._vm.TEAM_COUNTS[p.team]++;
            }
        }

        let action = null;
        try {
            action = this._vm.turn.call(null, turnNumber);
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