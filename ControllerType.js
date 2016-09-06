"use strict";

const vm = require("vm");
const fs = require("fs");

class ControllerType
{
    constructor(file){
        this.file = file;

        this._script = new vm.Script('"use strict";\n' + fs.readFileSync(file));

        let tempVM = this.createVM();

        this.allowedRoles = tempVM.getAllowedRoles.apply(null);
    }

    createVM(){
        let sandbox = {};
        this._script.runInNewContext(sandbox, {timeout: 20});
        return sandbox;
    }
}