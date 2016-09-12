let wizardsName = null;

function turn(myName, participants, turnNumber){
    if (wizardsName === null){
        for (let p of participants){
            if (p.charClass == "WIZARD"){
                wizardsName = p.name;
                break;
            }
        }
    }

    return {
        spell: "Flame Arrow",
        target: wizardsName,
    };
}