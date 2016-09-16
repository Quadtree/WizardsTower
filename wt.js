"use strict";

let startTime = new Date();
console.log("Starting at " + startTime);

const Participant = require("./Participant.js");
const ControllerType = require("./ControllerType.js");
const Pool = require("./Pool.js");
const GroupPool = require("./GroupPool.js");
const fs = require("fs");

const argv = require("minimist")(process.argv.slice(2));

let nullLogger = {log: function(){}};

function runSimulation(controllerTypes, logger){
    let participants = [];

    let n = 0;

    for (let c of controllerTypes){
        participants.push(new Participant(c, "C" + (n++), logger));
    }

    for (let turnNumber=0;turnNumber<50;turnNumber++){
        logger.log("Turn " + turnNumber);
        for (let p of participants){
            if (p.hp > 0) p.turn(participants, turnNumber);
        }
    }

    let isWizardAlive = false;
    let areAssassinsAlive = false;
    let numDemonsAlive = 0;
    let numAlive = 0;

    for (let p of participants){
        if (p.hp > 0){
            if (p.charClass == "WIZARD") isWizardAlive = true;
            if (p.charClass == "APPRENTICE" && p.team == "ASSASSIN") areAssassinsAlive = true;
            if (p.team == "DEMON") numDemonsAlive++;
            numAlive++;
        }
    }

    // the last living demon wins
    if (numAlive == 0){
        logger.log("Everyone is dead, so nobody wins!");
    } else if (numAlive == 1 && numDemonsAlive == 1){
        logger.log("A demon has won!");
        for (let p of participants){
            if (p.hp > 0){ p.controllerType.wins++; logger.log(p.name + " scores a point"); }
        }
    } else if(isWizardAlive){
        logger.log("Team Wizard has won!");
        for (let p of participants){
            if (p.team == "WIZARD"){ p.controllerType.wins++; logger.log(p.name + " scores a point"); }
        }
    } else if (areAssassinsAlive){
        logger.log("Team Assassin has won!");
        for (let p of participants){
            if (p.team == "ASSASSIN"){ p.controllerType.wins++; logger.log(p.name + " scores a point"); }
        }
    } else {
        logger.log("Nobody wins!");
    }
}

const iterations = parseInt(argv.iterations) ? parseInt(argv.iterations) : 1;
const generations = parseInt(argv.generations) ? parseInt(argv.generations) : 1;
const debug = argv.debug == true;

let initialGenes = [];

if (argv.generations > 1){
    for (let i=0;i<10;++i){
        initialGenes.push(1);
    }
}

function getAllControllersInDir(path, charClass, team, initialGenes){
    let ret = [];

    for (let file of fs.readdirSync(path)){
        ret.push(new ControllerType(path + "/" + file, charClass, team, initialGenes));
    }

    return ret;
}

let pools = [
    new GroupPool([
        new Pool(getAllControllersInDir("./controllers/wizard", "WIZARD", "WIZARD", initialGenes)),
        new Pool(getAllControllersInDir("./controllers/apprentice", "APPRENTICE", "WIZARD", initialGenes))
    ]),
    new Pool(getAllControllersInDir("./controllers/assassin", "APPRENTICE", "ASSASSIN", initialGenes)),
    new Pool(getAllControllersInDir("./controllers/demon", "APPRENTICE", "DEMON", initialGenes)),
];

for (let generation=0;generation<generations;++generation){
    
    console.log("Starting generation " + generation);

    for (let pool of pools){
        pool.cull(10);
        if (argv.generations > 1) pool.grow(30);
    }


    for (let i=0;i<iterations;++i){

        let controllerTypes;
        let itr = 0;

        while(true){
            controllerTypes = [];
            for (let j=0;j<6;++j) controllerTypes.push(pools[Math.floor(Math.random() * pools.length)].select());
            
            let hasWizard = false;
            for (let p of controllerTypes){
                if (p.charClass == "WIZARD"){
                    hasWizard = true;
                    break;
                }
            }
            if (hasWizard) break;
            if (++itr > 10000) throw "Too many iterations. ABORT! " + JSON.stringify(controllerTypes) + "\n\n" + JSON.stringify(pools);
        }

        try {
            runSimulation(controllerTypes, debug ? console : nullLogger);
        } catch(ex){
            console.warn("Iteration " + i + " crashed!: " + ex);
        }
    }

    for (let pool of pools){
        pool.cull(30);
        for (let ct of pool.getAll()){
            console.log(ct.getLongName() + ": " + ct.wins);
            ct.wins=0;
        }
    }
}

let finishTime = new Date();
console.log("Finished at " + finishTime + ", took " + ((finishTime.getTime() - startTime.getTime()) / 1000) + " seconds");