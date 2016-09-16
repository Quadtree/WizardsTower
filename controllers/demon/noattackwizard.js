
function turn(turnNumber){
    let potentialTargets = [];

    let isWizardAlive = null;

    for (let p of PARTICIPANTS){
        if (p.name == ME.name) continue;
        if (p.hp <= 0) continue;
        if (p.charClass == "WIZARD") continue;

        potentialTargets.push(p.name);
    }
    if (potentialTargets.length > 0){
        return {
            spell: "Flame Arrow",
            target: potentialTargets[Math.floor(Math.random() * potentialTargets.length)]
        };
    }

    return {};
}