"use strict";

const vm = require("vm");
const fs = require("fs");
const SpellType = require("./SpellType.js");

class ControllerType
{
    constructor(file, charClass, team, genes){
        if (typeof(genes) == "undefined"){
            genes = [];
            for (let i=0;i<10;++i){
                genes.push(1);
            }
        }

        this.file = file;
        this.charClass = charClass;
        this.team = team;
        this.file = file;
        this.wins = 0;
        this.genes = JSON.parse(JSON.stringify(genes));

        // add in random mutations
        for (let k in this.genes){
            this.genes[k] += Math.random() * 0.1 - 0.05;
        }

        let code = '"use strict";\n' +
            "const SPELLS = " + JSON.stringify(SpellType.prototype.SPELLS) + ";\n" + 
            "const GENES = " + JSON.stringify(this.genes) + ";\n" +
            fs.readFileSync(file);

        let oldCode = null;

        do {
            oldCode = code;
            code = code.replace(/^include\s*\(\s*['"]([^'"]+)['"]\s*\);?/gm, function(all, fileName){
                if (/(apprentice|assassin|demon|test|wizard)\/[a-z0-9A-Z_-]+\.js/.exec(fileName)){
                    return fs.readFileSync(__dirname + "/controllers/" + fileName);
                } else {
                    throw "Unable to load include file " + fileName;
                }
            });
        } while(code != oldCode);

        this._script = new vm.Script(code);
    }

    createVM(){
        let sandbox = {};
        this._script.runInNewContext(sandbox);
        return sandbox;
    }

    getLongName(){
        if (this._longNameCache) return this._longNameCache;
        let geneTextParts = [];
        for (let g of this.genes) geneTextParts.push(g.toFixed(2));

        this._longNameCache = this.charClass + "+" + this.team + "+" + this.file + "+" + geneTextParts.join("|");

        return this._longNameCache;
    }
}

module.exports = ControllerType;