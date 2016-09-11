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
}

let controllerTypes = [];

controllerTypes.push(new ControllerType("./controllers/test/doesnothing.js", "WIZARD", "WIZARD"));
controllerTypes.push(new ControllerType("./controllers/test/doesnothing.js", "APPRENTICE", "WIZARD"));
controllerTypes.push(new ControllerType("./controllers/test/doesnothing.js", "APPRENTICE", "ASSASSIN"));
controllerTypes.push(new ControllerType("./controllers/test/doesnothing.js", "APPRENTICE", "DEMON"));

runSimulation(controllerTypes, console);