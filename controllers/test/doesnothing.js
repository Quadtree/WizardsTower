function turn(myName, participants, turnNumber){
    return {
        spell: "Flame Arrow",
        target: "C" + Math.floor(Math.random() * 3),
    };
}