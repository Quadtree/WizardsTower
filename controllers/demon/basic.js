
function turn(me, participants, turnNumber){
    let targetName = me.name;

    while(targetName == me.name){
        targetName = participants[Math.floor(Math.random() * participants.length)].name;
    }
    
    return {
        spell: "Flame Arrow",
        target: targetName
    };
}