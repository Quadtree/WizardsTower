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

        this._script = new vm.Script(
            '"use strict";\n' +
            "const SPELLS = " + JSON.stringify(SpellType.prototype.SPELLS) + ";\n" + 
            "const GENES = " + JSON.stringify(this.genes) + ";\n" +
            fs.readFileSync(file)
        );
    }

    createVM(){
        let sandbox = {};
        this._script.runInNewContext(sandbox);
        return sandbox;
    }

    getLongName(){
        let geneTextParts = [];
        for (let g of this.genes) geneTextParts.push(g.toFixed(2));

        return this.charClass + "+" + this.team + "+" + this.file + "+" + geneTextParts.join("|");
    }
}

module.exports = ControllerType;