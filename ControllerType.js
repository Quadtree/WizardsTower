"use strict";

const vm = require("vm");
const fs = require("fs");
const SpellType = require("./SpellType.js");

class ControllerType
{
    constructor(file, charClass, team){
        this.file = file;
        this.charClass = charClass;
        this.team = team;
        this.file = file;
        this.wins = 0;
        this._script = new vm.Script('"use strict";\nconst SPELLS = ' + JSON.stringify(SpellType.prototype.SPELLS) + ";\n" + fs.readFileSync(file));
    }

    createVM(){
        let sandbox = {};
        this._script.runInNewContext(sandbox);
        return sandbox;
    }

    getLongName(){
        return this.charClass + "+" + this.team + "+" + this.file;
    }
}

module.exports = ControllerType;