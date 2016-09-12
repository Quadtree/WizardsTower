let wizardsName = null;

function turn(me, participants, turnNumber){
    if (wizardsName === null){
        for (let p of participants){
            if (p.charClass == "WIZARD"){
                wizardsName = p.name;
                break;
            }
        }
    }

    let potentialTargets = [];
    let wizardIsAlive = false;

    for (let p of participants){
        if (p.name == me.name) continue;
        if (p.hp <= 0) continue;

        potentialTargets.push(p.name);

        if (p.name == wizardsName && p.hp > 0) wizardIsAlive = true;
    }
    if (wizardIsAlive){
        return {
            spell: "Flame Arrow",
            target: wizardsName,
        };
    } else {
        if (potentialTargets.length > 0){
            return {
                spell: "Flame Arrow",
                target: potentialTargets[Math.floor(Math.random() * potentialTargets.length)]
            };
        }
        return {};
    }
}