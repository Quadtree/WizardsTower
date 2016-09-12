"use strict";

let Participant = require("./Participant.js");
let ControllerType = require("./ControllerType.js");

function runSimulation(controllerTypes, logger){
    let participants = [];

    let n = 0;

    for (let c of controllerTypes){
        participants.push(new Participant(c, "C" + (n++), logger));
    }

    for (let turnNumber=0;turnNumber<50;turnNumber++){
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
    if (numAlive == 1 && numDemonsAlive == 1){
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
    }
}

let controllerTypes = [];

controllerTypes.push(new ControllerType("./controllers/test/doesnothing.js", "WIZARD", "WIZARD"));
controllerTypes.push(new ControllerType("./controllers/test/doesnothing.js", "APPRENTICE", "WIZARD"));
controllerTypes.push(new ControllerType("./controllers/test/doesnothing.js", "APPRENTICE", "ASSASSIN"));
controllerTypes.push(new ControllerType("./controllers/test/doesnothing.js", "APPRENTICE", "DEMON"));

runSimulation(controllerTypes, console);