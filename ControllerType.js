"use strict";

const vm = require("vm");
const fs = require("fs");

class ControllerType
{
    constructor(file, charClass, team){
        this.charClass = charClass;
        this.team = team;
        this.file = file;
        this.wins = 0;
        this._script = new vm.Script('"use strict";\n' + fs.readFileSync(file));
    }

    createVM(){
        let sandbox = {};
        this._script.runInNewContext(sandbox, {timeout: 20});
        return sandbox;
    }
}

module.exports = ControllerType;